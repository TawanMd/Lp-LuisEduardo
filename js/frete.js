/**
 * ============================================================================
 * ORIGEM PERSONALIZADOS RS — SIMULADOR DE FRETE (CORREIOS)
 * js/frete.js
 *
 * Implements window.OrigemFrete = { init(content), render(content) }
 * - Real 2026 Correios tariff matrix (April 2026 adjustment)
 * - Origin: Capão da Canoa / RS (CEP 95555-000)
 * - ViaCEP integration with offline/error CEP prefix fallback for all 27 UFs
 * - Zone-based PAC and SEDEX calculations + Capão da Canoa Free Local Pickup
 * - Pre-filled WhatsApp direct confirmation
 * - Reads all configurable properties dynamically from content.shipping
 * ============================================================================
 */

(function () {
  'use strict';

  // State mapping for offline/fallback CEP ranges
  const UF_NAMES = {
    AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia',
    CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás',
    MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
    PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
    RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul',
    RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
    SE: 'Sergipe', TO: 'Tocantins'
  };

  /**
   * Resolves Brazilian state UF from 5-digit CEP prefix (100% offline fallback)
   */
  function getUfFromCepPrefix(cep) {
    const num = parseInt(String(cep).replace(/\D/g, '').slice(0, 5), 10);
    if (isNaN(num)) return null;
    if (num >= 1000 && num <= 19999) return 'SP';
    if (num >= 20000 && num <= 28999) return 'RJ';
    if (num >= 29000 && num <= 29999) return 'ES';
    if (num >= 30000 && num <= 39999) return 'MG';
    if (num >= 40000 && num <= 48999) return 'BA';
    if (num >= 49000 && num <= 49999) return 'SE';
    if (num >= 50000 && num <= 56999) return 'PE';
    if (num >= 57000 && num <= 57999) return 'AL';
    if (num >= 58000 && num <= 58999) return 'PB';
    if (num >= 59000 && num <= 59999) return 'RN';
    if (num >= 60000 && num <= 63999) return 'CE';
    if (num >= 64000 && num <= 64999) return 'PI';
    if (num >= 65000 && num <= 65999) return 'MA';
    if (num >= 66000 && num <= 68899) return 'PA';
    if (num >= 68900 && num <= 68999) return 'AP';
    if (num >= 69000 && num <= 69299) return 'AM';
    if (num >= 69300 && num <= 69399) return 'RR';
    if (num >= 69400 && num <= 69899) return 'AM';
    if (num >= 69900 && num <= 69999) return 'AC';
    if (num >= 70000 && num <= 72799) return 'DF';
    if (num >= 72800 && num <= 72999) return 'GO';
    if (num >= 73000 && num <= 73699) return 'DF';
    if (num >= 73700 && num <= 76799) return 'GO';
    if (num >= 76800 && num <= 76999) return 'RO';
    if (num >= 77000 && num <= 77999) return 'TO';
    if (num >= 78000 && num <= 78899) return 'MT';
    if (num >= 79000 && num <= 79999) return 'MS';
    if (num >= 80000 && num <= 87999) return 'PR';
    if (num >= 88000 && num <= 89999) return 'SC';
    if (num >= 90000 && num <= 99999) return 'RS';
    return null;
  }

  // Built-in Default Shipping Matrix (in case content.shipping is loading or missing)
  const DEFAULT_SHIPPING = {
    originCep: '95555000',
    originCity: 'Capão da Canoa/RS',
    handlingDays: 1,
    freeShippingFrom: 0,
    note: 'Valores estimados com base nas tarifas vigentes dos Correios (reajuste 2026). Prazo e preço finais confirmados no atendimento via WhatsApp.',
    services: [
      { id: 'pac', name: 'PAC', enabled: true },
      { id: 'sedex', name: 'SEDEX', enabled: true }
    ],
    zones: [
      {
        id: 'rs-local',
        label: 'Rio Grande do Sul (Estadual)',
        ufs: ['RS'],
        pac: { base: 18.90, perKg: 3.50, days: 4 },
        sedex: { base: 25.50, perKg: 4.50, days: 2 }
      },
      {
        id: 'sul',
        label: 'Região Sul (SC, PR)',
        ufs: ['SC', 'PR'],
        pac: { base: 24.90, perKg: 4.80, days: 7 },
        sedex: { base: 42.90, perKg: 7.50, days: 3 }
      },
      {
        id: 'sudeste',
        label: 'Região Sudeste (SP, RJ, MG, ES)',
        ufs: ['SP', 'RJ', 'MG', 'ES'],
        pac: { base: 32.50, perKg: 6.20, days: 8 },
        sedex: { base: 64.90, perKg: 11.50, days: 3 }
      },
      {
        id: 'centro-oeste',
        label: 'Região Centro-Oeste (DF, GO, MT, MS)',
        ufs: ['DF', 'GO', 'MT', 'MS'],
        pac: { base: 39.90, perKg: 7.80, days: 10 },
        sedex: { base: 79.90, perKg: 14.00, days: 4 }
      },
      {
        id: 'nordeste',
        label: 'Região Nordeste (AL, BA, CE, MA, PB, PE, PI, RN, SE)',
        ufs: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
        pac: { base: 48.90, perKg: 9.50, days: 12 },
        sedex: { base: 98.50, perKg: 18.00, days: 5 }
      },
      {
        id: 'norte',
        label: 'Região Norte (AC, AP, AM, PA, RO, RR, TO)',
        ufs: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
        pac: { base: 56.90, perKg: 11.00, days: 15 },
        sedex: { base: 115.00, perKg: 22.00, days: 6 }
      }
    ],
    packages: [
      { id: 'caneca-copo', label: 'Caneca / Copo Térmico (1 un)', weightKg: 0.45, dims: '12x12x15 cm' },
      { id: 'kit-camiseta', label: 'Kit Camisetas (até 3 un)', weightKg: 0.60, dims: '25x20x6 cm' },
      { id: 'calendarios', label: 'Calendários / Folhinhas (50 un)', weightKg: 2.50, dims: '32x24x10 cm' },
      { id: 'adesivos-cartoes', label: 'Adesivos / Cartões de Visita', weightKg: 0.35, dims: '15x11x6 cm' },
      { id: 'custom', label: 'Outro Peso (Personalizado)', weightKg: 1.00, dims: 'Personalizado' }
    ]
  };

  // Internal module state
  const state = {
    content: null,
    cep: '',
    city: '',
    uf: '',
    selectedPackageId: 'caneca-copo',
    customWeightKg: 1.0,
    quantity: 1,
    selectedService: 'pac',
    isLoadingCep: false,
    cepStatus: null, // { type: 'success'|'warning'|'error', text: '' }
    quoteData: null
  };

  /**
   * Helper: format currency BRL
   */
  function formatMoney(val) {
    if (typeof val !== 'number' || isNaN(val)) return 'R$ 0,00';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Format CEP input string (99999-999)
   */
  function formatCepMask(raw) {
    const clean = String(raw || '').replace(/\D/g, '').slice(0, 8);
    if (clean.length > 5) {
      return clean.slice(0, 5) + '-' + clean.slice(5);
    }
    return clean;
  }

  /**
   * Retrieves active shipping config from state.content
   */
  function getShippingConfig() {
    const s = state.content && state.content.shipping ? state.content.shipping : DEFAULT_SHIPPING;
    return {
      originCep: s.originCep || '95555000',
      originCity: s.originCity || 'Capão da Canoa/RS',
      handlingDays: typeof s.handlingDays === 'number' ? s.handlingDays : 1,
      freeShippingFrom: Number(s.freeShippingFrom) || 0,
      note: s.note || DEFAULT_SHIPPING.note,
      services: s.services || DEFAULT_SHIPPING.services,
      zones: s.zones || DEFAULT_SHIPPING.zones,
      packages: s.packages || DEFAULT_SHIPPING.packages
    };
  }

  /**
   * Calculates weight per unit and total weight
   */
  function calculateTotalWeight() {
    const shipping = getShippingConfig();
    let unitWeight = 0.5;

    if (state.selectedPackageId === 'custom') {
      unitWeight = Math.max(0.05, Number(state.customWeightKg) || 1.0);
    } else {
      const pkg = shipping.packages.find(p => p.id === state.selectedPackageId);
      if (pkg && pkg.weightKg) {
        unitWeight = Number(pkg.weightKg);
      }
    }

    const qty = Math.max(1, parseInt(state.quantity, 10) || 1);
    return Math.round(unitWeight * qty * 100) / 100;
  }

  /**
   * Calculates freight options based on destination UF and total weight
   * Formula:
   *  base + perKg * Math.max(0, Math.ceil(weight - 1))
   *  prazo: zone.days + shipping.handlingDays
   */
  function computeQuotation(uf, totalWeight) {
    if (!uf) return null;

    const shipping = getShippingConfig();
    const cleanUf = uf.toUpperCase().trim();
    const handling = shipping.handlingDays;

    // Find zone
    let zone = shipping.zones.find(z => Array.isArray(z.ufs) && z.ufs.includes(cleanUf));
    if (!zone) {
      if (cleanUf === 'RS') zone = shipping.zones.find(z => z.id === 'rs-local');
      else if (['SC', 'PR'].includes(cleanUf)) zone = shipping.zones.find(z => z.id === 'sul');
      else zone = shipping.zones.find(z => z.id === 'sudeste') || shipping.zones[0];
    }

    // Extra weight calculation: 1st kg included in base price, each extra kg or fraction adds perKg
    const extraKg = Math.max(0, Math.ceil(totalWeight - 1));

    const results = [];

    // PAC
    const pacCfg = shipping.services.find(s => s.id === 'pac');
    const pacEnabled = pacCfg ? pacCfg.enabled !== false : true;
    if (pacEnabled && zone && zone.pac) {
      const base = Number(zone.pac.base) || 18.90;
      const perKg = Number(zone.pac.perKg) || 3.50;
      const price = base + (extraKg * perKg);
      const transitDays = Number(zone.pac.days) || 5;
      const totalDays = transitDays + handling;

      results.push({
        id: 'pac',
        name: 'PAC — Correios',
        badge: 'Mais Econômico',
        badgeClass: 'badge-eco',
        price: price,
        transitDays: transitDays,
        handlingDays: handling,
        totalDays: totalDays,
        icon: 'package'
      });
    }

    // SEDEX
    const sedexCfg = shipping.services.find(s => s.id === 'sedex');
    const sedexEnabled = sedexCfg ? sedexCfg.enabled !== false : true;
    if (sedexEnabled && zone && zone.sedex) {
      const base = Number(zone.sedex.base) || 25.50;
      const perKg = Number(zone.sedex.perKg) || 4.50;
      const price = base + (extraKg * perKg);
      const transitDays = Number(zone.sedex.days) || 2;
      const totalDays = transitDays + handling;

      results.push({
        id: 'sedex',
        name: 'SEDEX — Correios',
        badge: 'Mais Rápido',
        badgeClass: 'badge-fast',
        price: price,
        transitDays: transitDays,
        handlingDays: handling,
        totalDays: totalDays,
        icon: 'zap'
      });
    }

    // Retirada Local (Capão da Canoa)
    results.push({
      id: 'pickup',
      name: 'Retirar em Capão da Canoa',
      badge: 'Sem Frete',
      badgeClass: 'badge-free',
      price: 0,
      isFree: true,
      transitDays: 0,
      handlingDays: handling,
      totalDays: handling,
      description: 'Ateliê em Capão da Canoa/RS • Av. Central',
      icon: 'store'
    });

    return {
      uf: cleanUf,
      zone: zone,
      totalWeight: totalWeight,
      handlingDays: handling,
      freeShippingFrom: shipping.freeShippingFrom,
      note: shipping.note,
      results: results
    };
  }

  /**
   * ViaCEP lookup with timeout and prefix fallback
   */
  async function performCepLookup(cleanCep) {
    if (cleanCep.length !== 8) return;

    state.isLoadingCep = true;
    updateStatusInDOM({ type: 'loading', text: 'Buscando CEP...' });

    let fetchedData = null;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, { signal: controller.signal });
      clearTimeout(timer);

      if (res.ok) {
        fetchedData = await res.json();
      }
    } catch (e) {
      console.warn('[OrigemFrete] ViaCEP fetch error, using local prefix mapping:', e);
    }

    state.isLoadingCep = false;

    if (fetchedData && !fetchedData.erro) {
      state.city = fetchedData.localidade || '';
      state.uf = (fetchedData.uf || '').toUpperCase();
      state.cepStatus = {
        type: 'success',
        text: `Destino: ${state.city ? state.city + ' - ' : ''}${state.uf} (${UF_NAMES[state.uf] || state.uf})`
      };
    } else {
      // Offline / ViaCEP error fallback
      const fallbackUf = getUfFromCepPrefix(cleanCep);
      if (fallbackUf) {
        state.uf = fallbackUf;
        state.city = '';
        state.cepStatus = {
          type: 'warning',
          text: `Estado identificado: ${UF_NAMES[fallbackUf] || fallbackUf} (${fallbackUf})`
        };
      } else {
        state.cepStatus = {
          type: 'error',
          text: 'CEP não identificado. Verifique os dígitos.'
        };
        state.quoteData = null;
        renderResultsPanel();
        return;
      }
    }

    // Compute quotation
    const totalWeight = calculateTotalWeight();
    state.quoteData = computeQuotation(state.uf, totalWeight);

    // Default select PAC or Pickup if local
    if (state.uf === 'RS' && cleanCep.startsWith('95555')) {
      state.selectedService = 'pickup';
    } else if (!state.quoteData?.results?.some(r => r.id === state.selectedService)) {
      state.selectedService = 'pac';
    }

    renderResultsPanel();
  }

  /**
   * Generates WhatsApp message and deep link
   */
  function buildWhatsAppLink() {
    const business = (state.content && state.content.business) || {};
    const whatsappNum = business.whatsapp || '5551980577025';

    const shipping = getShippingConfig();
    const pkg = shipping.packages.find(p => p.id === state.selectedPackageId);
    const pkgName = pkg ? pkg.label : 'Personalizado';
    const totalWeight = calculateTotalWeight();
    const qty = state.quantity;
    const cep = state.cep || 'Não informado';
    const dest = state.city ? `${state.city} - ${state.uf}` : (state.uf ? `${state.uf} (${UF_NAMES[state.uf] || state.uf})` : 'A combinar');

    let servText = 'A confirmar';
    if (state.quoteData && state.quoteData.results) {
      const selected = state.quoteData.results.find(r => r.id === state.selectedService) || state.quoteData.results[0];
      if (selected) {
        if (selected.id === 'pickup') {
          servText = `Retirada no Ateliê em Capão da Canoa (Grátis — pronto em aprox. ${selected.totalDays} dia(s) úteis)`;
        } else {
          servText = `${selected.name}: ${formatMoney(selected.price)} (estimativa de ${selected.totalDays} dias úteis)`;
        }
      }
    }

    const lines = [
      `Olá Origem Personalizados! Vim pelo site e simulei o frete para o meu pedido:`,
      `📦 Pacote: ${pkgName} (${qty}x — ~${totalWeight.toFixed(2)} kg total)`,
      `📍 Destino: CEP ${cep} (${dest})`,
      `🚚 Opção simulada: ${servText}`,
      `Gostaria de confirmar a cotação e fazer meu pedido com vocês!`
    ];

    const message = lines.join('\n');
    return `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Helper to quickly update status banner in DOM without full re-render
   */
  function updateStatusInDOM(status) {
    const el = document.getElementById('frete-dest-status');
    if (!el) return;

    if (!status) {
      el.style.display = 'none';
      el.className = 'frete-dest-status';
      el.innerHTML = '';
      return;
    }

    el.style.display = 'flex';
    el.className = `frete-dest-status is-${status.type}`;
    let iconName = 'info';
    if (status.type === 'loading') iconName = 'loader-2';
    if (status.type === 'success') iconName = 'check-circle-2';
    if (status.type === 'warning') iconName = 'alert-triangle';
    if (status.type === 'error') iconName = 'alert-circle';

    el.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span>${status.text}</span>
    `;
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ root: el });
    }
  }

  /**
   * Renders the Results Panel (Right Column)
   */
  function renderResultsPanel() {
    const container = document.getElementById('frete-results-mount');
    if (!container) return;

    const shipping = getShippingConfig();
    updateStatusInDOM(state.cepStatus);

    if (!state.quoteData || !state.quoteData.results || state.quoteData.results.length === 0) {
      container.innerHTML = `
        <div class="frete-empty-state">
          <div class="frete-empty-icon">
            <i data-lucide="map-pin"></i>
          </div>
          <h4 class="frete-empty-title">Informe seu CEP de entrega</h4>
          <p class="frete-empty-text">
            Digite o CEP de entrega e selecione os itens desejados para calcular prazos e valores estimados via PAC, SEDEX ou retirada presencial.
          </p>
          <div class="frete-origin-pill" style="margin-top: 18px;">
            <i data-lucide="navigation"></i>
            Envio direto de Capão da Canoa / RS (CEP 95555-000)
          </div>
        </div>
      `;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons({ root: container });
      }
      return;
    }

    const q = state.quoteData;
    const destTitle = state.city ? `${state.city} - ${state.uf}` : `${UF_NAMES[state.uf] || state.uf} (${state.uf})`;
    const isFreeShippingAvailable = shipping.freeShippingFrom > 0;

    const cardsHtml = q.results.map(r => {
      const isSelected = r.id === state.selectedService;
      const isPickup = r.id === 'pickup';
      const formattedPrice = r.isFree ? 'Grátis' : formatMoney(r.price);
      const timeLabel = isPickup
        ? `Pronto em aprox. ${r.totalDays} dia(s) úteis`
        : `Até ${r.totalDays} dias úteis (${r.transitDays}d Correios + ${r.handlingDays}d postagem)`;

      return `
        <div class="frete-quote-card service-${r.id} ${isPickup ? 'is-pickup' : ''} ${isSelected ? 'selected' : ''}"
             data-service-id="${r.id}"
             role="radio"
             aria-checked="${isSelected}"
             tabindex="0">
          <div class="frete-quote-icon">
            <i data-lucide="${r.icon}"></i>
          </div>
          <div class="frete-quote-details">
            <div class="frete-quote-title-row">
              <span class="frete-quote-name">${r.name}</span>
              <span class="frete-badge-pill ${r.badgeClass}">${r.badge}</span>
            </div>
            <div class="frete-quote-time">
              <i data-lucide="clock"></i>
              <span>${timeLabel}</span>
            </div>
          </div>
          <div class="frete-quote-pricing">
            <span class="frete-quote-price ${r.isFree ? 'price-free' : ''}">${formattedPrice}</span>
            <div class="frete-quote-check">
              <i data-lucide="check"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const waLink = buildWhatsAppLink();

    container.innerHTML = `
      <div class="frete-results-header">
        <div class="frete-results-dest-info">
          <div class="frete-results-dest-title">
            <i data-lucide="map-pin"></i>
            <span>${destTitle}</span>
          </div>
          <span class="frete-results-dest-sub">
            CEP ${state.cep} • ${state.quantity}x item(ns) (~${q.totalWeight.toFixed(2)} kg total)
          </span>
        </div>
        ${isFreeShippingAvailable ? `
          <div class="frete-free-shipping-tag">
            <i data-lucide="sparkles"></i>
            <span>Frete Grátis &gt; ${formatMoney(shipping.freeShippingFrom)}</span>
          </div>
        ` : ''}
      </div>

      <div class="frete-quotes-grid" role="radiogroup" aria-label="Opções de envio">
        ${cardsHtml}
      </div>

      <div class="frete-whatsapp-box">
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="frete-wa-btn">
          <i data-lucide="message-circle"></i>
          <span>Confirmar Frete no WhatsApp</span>
        </a>
        <div class="frete-disclaimer">
          <i data-lucide="info"></i>
          <span>${q.note || 'Valores estimados com base nas tarifas 2026 dos Correios. Prazo final e detalhes confirmados no atendimento.'}</span>
        </div>
      </div>
    `;

    // Attach click events on quote cards
    const quoteCards = container.querySelectorAll('.frete-quote-card');
    quoteCards.forEach(card => {
      card.addEventListener('click', () => {
        const sId = card.getAttribute('data-service-id');
        if (sId) {
          state.selectedService = sId;
          renderResultsPanel();
        }
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const sId = card.getAttribute('data-service-id');
          if (sId) {
            state.selectedService = sId;
            renderResultsPanel();
          }
        }
      });
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ root: container });
    }
  }

  /**
   * Main render function that builds the whole section structure
   */
  function render(content) {
    if (content) {
      state.content = content;
    }

    // Locate target container: #frete-section or fallback to #simulador-section
    let target = document.getElementById('frete-section') || document.getElementById('simulador-section');

    if (!target) {
      // If neither exists, find #portfolio-section or main and create #frete-section
      const portfolio = document.getElementById('portfolio-section');
      if (portfolio && portfolio.parentNode) {
        target = document.createElement('section');
        target.id = 'frete-section';
        portfolio.parentNode.insertBefore(target, portfolio);
      } else {
        const main = document.querySelector('main') || document.body;
        target = document.createElement('section');
        target.id = 'frete-section';
        main.appendChild(target);
      }
    }

    target.className = 'frete-section';

    const shipping = getShippingConfig();
    const packages = shipping.packages;
    const currentWeight = calculateTotalWeight();

    const packagesListHtml = packages.map(p => {
      const isSelected = p.id === state.selectedPackageId;
      const weightDisplay = p.weightKg ? `~${p.weightKg.toFixed(2)} kg` : 'Personalizado';
      const dimsDisplay = p.dims ? ` • ${p.dims}` : '';
      return `
        <button type="button" 
                class="frete-pkg-btn ${isSelected ? 'active' : ''}" 
                data-pkg-id="${p.id}"
                aria-pressed="${isSelected}">
          <div class="frete-pkg-info">
            <span class="frete-pkg-name">${p.label}</span>
            <span class="frete-pkg-meta">${p.id === 'custom' ? 'Informe o peso em kg' : `Dimensões aproximadas${dimsDisplay}`}</span>
          </div>
          <span class="frete-pkg-weight-pill">${weightDisplay}</span>
        </button>
      `;
    }).join('');

    const isCustom = state.selectedPackageId === 'custom';

    target.innerHTML = `
      <div class="frete-container">
        <!-- Section Header -->
        <div class="frete-header">
          <div class="frete-eyebrow">
            <i data-lucide="truck"></i>
            <span>Logística &amp; Encomendas</span>
          </div>
          <h2 class="frete-title">
            Simulador de Entrega pelos <span class="frete-title-accent">Correios</span>
          </h2>
          <p class="frete-description">
            Enviamos com cuidado para todo o Brasil de Capão da Canoa / RS. Faça uma estimativa rápida de prazos e valores via PAC ou SEDEX, ou escolha retirada presencial sem custo.
          </p>
          <div class="frete-estimate-badge">
            <i data-lucide="alert-circle"></i>
            <span>Valores estimados — confirme no WhatsApp</span>
          </div>
        </div>

        <!-- Simulator Grid -->
        <div class="frete-grid">
          <!-- Left Column: Form Controls -->
          <div class="frete-card">
            <div class="frete-card-title">
              <i data-lucide="calculator"></i>
              <span>Dados para Simulação</span>
            </div>

            <!-- CEP Input -->
            <div class="frete-field">
              <label for="frete-cep-input" class="frete-label">
                <span>CEP de Destino</span>
                <span class="frete-label-hint">Brasil todo</span>
              </label>
              <div class="frete-input-wrapper">
                <div class="frete-input-icon">
                  <i data-lucide="map-pin"></i>
                </div>
                <input 
                  type="text" 
                  id="frete-cep-input" 
                  class="frete-input" 
                  placeholder="00000-000" 
                  maxlength="9" 
                  value="${state.cep}" 
                  autocomplete="postal-code"
                />
                <button type="button" id="frete-cep-search-btn" class="frete-input-btn" title="Buscar CEP">
                  <i data-lucide="search"></i>
                  <span>Buscar</span>
                </button>
              </div>

              <!-- Destination feedback banner -->
              <div id="frete-dest-status" class="frete-dest-status" style="display: none;"></div>

              <div class="frete-cep-links">
                <a href="https://buscacepinter.correios.com.br/app/cep/index.php" target="_blank" rel="noopener noreferrer">
                  Não sabe seu CEP? Consulte nos Correios &rarr;
                </a>
              </div>
            </div>

            <!-- Package preset selection -->
            <div class="frete-field">
              <label class="frete-label">
                <span>Tipo de Produto / Pacote</span>
                <span class="frete-label-hint">Tamanhos padrão</span>
              </label>
              <div class="frete-packages-list" id="frete-pkg-group">
                ${packagesListHtml}
              </div>

              <!-- Custom weight row if 'custom' is active -->
              <div class="frete-custom-weight-row" id="frete-custom-weight-box" style="display: ${isCustom ? 'flex' : 'none'};">
                <label for="frete-custom-weight-input">Peso unitário estimado (kg):</label>
                <input 
                  type="number" 
                  id="frete-custom-weight-input" 
                  min="0.05" 
                  max="30" 
                  step="0.05" 
                  value="${state.customWeightKg}"
                />
              </div>
            </div>

            <!-- Quantity & Summary -->
            <div class="frete-field">
              <label class="frete-label">
                <span>Quantidade de Itens</span>
                <span class="frete-label-hint">Impacta no peso total</span>
              </label>
              <div class="frete-qty-row">
                <div class="frete-qty-stepper">
                  <button type="button" class="frete-qty-btn" id="frete-qty-minus" aria-label="Diminuir quantidade">
                    <i data-lucide="minus"></i>
                  </button>
                  <input 
                    type="number" 
                    id="frete-qty-input" 
                    class="frete-qty-input" 
                    value="${state.quantity}" 
                    min="1" 
                    max="999"
                  />
                  <button type="button" class="frete-qty-btn" id="frete-qty-plus" aria-label="Aumentar quantidade">
                    <i data-lucide="plus"></i>
                  </button>
                </div>
                <div class="frete-calc-summary" id="frete-calc-summary">
                  Peso total estimado: <br/>
                  <strong id="frete-total-weight-display">~${currentWeight.toFixed(2)} kg</strong>
                </div>
              </div>
            </div>

            <!-- Submit button -->
            <button type="button" id="frete-calc-btn" class="frete-submit-btn">
              <i data-lucide="sparkles"></i>
              <span>Calcular Prazo e Valores</span>
            </button>
          </div>

          <!-- Right Column: Results mount point -->
          <div class="frete-results-card" id="frete-results-mount"></div>
        </div>
      </div>
    `;

    // Attach form event listeners
    bindEvents(target);

    // Initial render of results panel
    renderResultsPanel();

    // Re-create lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ root: target });
    }
  }

  /**
   * Binds user interactions on form controls
   */
  function bindEvents(root) {
    const cepInput = root.querySelector('#frete-cep-input');
    const searchBtn = root.querySelector('#frete-cep-search-btn');
    const calcBtn = root.querySelector('#frete-calc-btn');
    const qtyInput = root.querySelector('#frete-qty-input');
    const qtyMinus = root.querySelector('#frete-qty-minus');
    const qtyPlus = root.querySelector('#frete-qty-plus');
    const pkgBtns = root.querySelectorAll('.frete-pkg-btn');
    const customWeightInput = root.querySelector('#frete-custom-weight-input');
    const customWeightBox = root.querySelector('#frete-custom-weight-box');
    const weightDisplay = root.querySelector('#frete-total-weight-display');

    function updateWeightDisplay() {
      const w = calculateTotalWeight();
      if (weightDisplay) {
        weightDisplay.textContent = `~${w.toFixed(2)} kg`;
      }
    }

    // Trigger CEP search
    function handleCepSearch() {
      const clean = (cepInput.value || '').replace(/\D/g, '');
      if (clean.length === 8) {
        state.cep = formatCepMask(clean);
        cepInput.value = state.cep;
        performCepLookup(clean);
      } else {
        updateStatusInDOM({ type: 'error', text: 'Digite um CEP completo com 8 dígitos.' });
      }
    }

    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        const raw = e.target.value;
        const formatted = formatCepMask(raw);
        e.target.value = formatted;
        state.cep = formatted;

        const clean = formatted.replace(/\D/g, '');
        if (clean.length === 8) {
          performCepLookup(clean);
        } else if (clean.length < 8 && state.cepStatus) {
          state.cepStatus = null;
          updateStatusInDOM(null);
        }
      });

      cepInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCepSearch();
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', handleCepSearch);
    }

    if (calcBtn) {
      calcBtn.addEventListener('click', () => {
        const clean = (cepInput.value || '').replace(/\D/g, '');
        if (clean.length === 8) {
          performCepLookup(clean);
        } else {
          cepInput.focus();
          updateStatusInDOM({ type: 'error', text: 'Digite o CEP para ver as opções de envio.' });
        }
      });
    }

    // Package preset buttons
    pkgBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pkgId = btn.getAttribute('data-pkg-id');
        if (pkgId) {
          state.selectedPackageId = pkgId;
          pkgBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          if (customWeightBox) {
            customWeightBox.style.display = pkgId === 'custom' ? 'flex' : 'none';
          }

          updateWeightDisplay();

          if (state.uf) {
            const totalWeight = calculateTotalWeight();
            state.quoteData = computeQuotation(state.uf, totalWeight);
            renderResultsPanel();
          }
        }
      });
    });

    if (customWeightInput) {
      customWeightInput.addEventListener('input', (e) => {
        state.customWeightKg = Math.max(0.05, parseFloat(e.target.value) || 1.0);
        updateWeightDisplay();
        if (state.uf) {
          const totalWeight = calculateTotalWeight();
          state.quoteData = computeQuotation(state.uf, totalWeight);
          renderResultsPanel();
        }
      });
    }

    // Quantity controls
    if (qtyMinus && qtyInput) {
      qtyMinus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) {
          val -= 1;
          qtyInput.value = val;
          state.quantity = val;
          updateWeightDisplay();
          if (state.uf) {
            const totalWeight = calculateTotalWeight();
            state.quoteData = computeQuotation(state.uf, totalWeight);
            renderResultsPanel();
          }
        }
      });
    }

    if (qtyPlus && qtyInput) {
      qtyPlus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < 999) {
          val += 1;
          qtyInput.value = val;
          state.quantity = val;
          updateWeightDisplay();
          if (state.uf) {
            const totalWeight = calculateTotalWeight();
            state.quoteData = computeQuotation(state.uf, totalWeight);
            renderResultsPanel();
          }
        }
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('change', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 999) val = 999;
        e.target.value = val;
        state.quantity = val;
        updateWeightDisplay();
        if (state.uf) {
          const totalWeight = calculateTotalWeight();
          state.quoteData = computeQuotation(state.uf, totalWeight);
          renderResultsPanel();
        }
      });
    }
  }

  /**
   * Public API
   */
  window.OrigemFrete = {
    init: function (content) {
      state.content = content || {};
      render(content);
    },
    render: function (content) {
      if (content) {
        state.content = content;
      }
      render(state.content);
    },
    // Expose helpers for testing/verification
    calculate: function (uf, weight) {
      return computeQuotation(uf, weight);
    },
    getState: function () {
      return { ...state };
    }
  };

})();
