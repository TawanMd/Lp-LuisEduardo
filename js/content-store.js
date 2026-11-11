/**
 * Origem Personalizados RS - Content Store Layer
 * Single Source of Truth for site content.
 * Manages loading default data/content.json, overlaying changes from IndexedDB (or localStorage fallback),
 * and notifying subscribers via 'origem:content' CustomEvent.
 */
(function () {
  'use strict';

  const DB_NAME = 'origem_cms_db';
  const DB_VERSION = 1;
  const STORE_NAME = 'cms_store';
  const STORAGE_KEY = 'origem-content-v1';

  // Embedded defaults in case fetch('data/content.json') fails (e.g. file:// protocol or offline)
  const DEFAULT_CONTENT = {
    version: 1,
    business: {
      name: "Origem Personalizados RS",
      slogan: "Sua ideia, nossa criação!",
      tagline: "Impressos feitos para deixar sua marca.",
      whatsapp: "5551980577025",
      whatsappDisplay: "(51) 98057-7025",
      whatsappLink: "https://wa.me/message/L34PQGHRXEMLM1",
      email: "origempersonalizadosrs@gmail.com",
      instagram: "origempersonalizadosrs",
      city: "Capão da Canoa - RS",
      cep: "95555-000"
    },
    hero: {
      badge: "Capão da Canoa • RS | Gráfica Rápida & Personalizados",
      title: "Sua ideia, nossa criação.",
      titleAccent: "Impressos feitos para deixar sua marca.",
      subtitle: "Personalizamos ideias e criamos conexões! Do presente único ao lote corporativo: copos térmicos gravados a laser, calendários 2027, uniformes, papelaria gráfica, adesivos e fachadas com criação de arte exclusiva e acabamento impecável para empresas, eventos e famílias."
    },
    categories: [
      { id: "brindes", label: "Brindes & Térmicos" },
      { id: "grafica", label: "Gráfica & Calendários" },
      { id: "comunicacao", label: "Comunicação Visual" },
      { id: "vestuario", label: "Vestuário & Eventos" },
      { id: "decoracao", label: "Decoração & Capachos" }
    ],
    products: [
      {
        id: "copos-termicos",
        name: "Copos Térmicos & Canecas Personalizadas",
        category: "brindes",
        description: "Copos térmicos em inox com tampa e gravação a laser permanente para empresas, CTGs, festas e presentes, além de canecas de cerâmica, polímero e chopp personalizadas com alta definição.",
        badge: "Mais Pedido",
        priceFrom: "",
        image: "",
        artId: "copos-termicos",
        visible: true,
        order: 1
      },
      {
        id: "calendarios-2027",
        name: "Calendários 2027 (Mesa Wire-o & Parede)",
        category: "grafica",
        description: "Seu cliente lembrará de você todos os dias do ano! Ideal para brindes corporativos de fim de ano. Modelos de mesa com acabamento Wire-O e de parede personalizados com sua marca e contatos.",
        badge: "Temporada 2027",
        priceFrom: "",
        image: "",
        artId: "calendarios-2027",
        visible: true,
        order: 2
      },
      {
        id: "camisetas-uniformes",
        name: "Camisetas, Moletons & Bonés",
        category: "vestuario",
        description: "Uniformes profissionais que passam credibilidade para sua equipe, camisetas promocionais para eventos, linha especial \"Natal da Família\", moletons e bonés em dry-fit ou algodão.",
        badge: "Equipes & Família",
        priceFrom: "",
        image: "",
        artId: "camisetas-uniformes",
        visible: true,
        order: 3
      },
      {
        id: "cartoes-papelaria",
        name: "Cartões de Visita, Panfletos, Pastas & Recibos",
        category: "grafica",
        description: "Papelaria corporativa completa para fortalecer sua identidade: cartões de visita premium, panfletos, pastas com bolsa, tags para confecções, blocos de pedidos, recibos e cadernos.",
        badge: "Papelaria Completa",
        priceFrom: "",
        image: "",
        artId: "cartoes-papelaria",
        visible: true,
        order: 4
      },
      {
        id: "adesivos-rotulos",
        name: "Adesivos Vinílicos & Rótulos Recortados",
        category: "comunicacao",
        description: "Adesivos em vinil impermeável à prova d’água com recorte eletrônico de alta precisão para embalagens, doces, gastronomia, veículos, copos e vitrines comerciais.",
        badge: "À Prova D'Água",
        priceFrom: "",
        image: "",
        artId: "adesivos-rotulos",
        visible: true,
        order: 5
      },
      {
        id: "banners-windbanner",
        name: "WindBanners, Banners, Lonas & Placas de Fachada",
        category: "comunicacao",
        description: "Destaque sua loja em Capão da Canoa e em todo o Litoral Norte! WindBanners completos, banners promocionais, lonas e placas de fachada com alta resistência ao sol e vento.",
        badge: "Destaque Litoral",
        priceFrom: "",
        image: "",
        artId: "banners-windbanner",
        visible: true,
        order: 6
      },
      {
        id: "tapetes-capachos",
        name: "Tapetes Capachos Personalizados",
        category: "decoracao",
        description: "Receba seus clientes com impacto desde a porta de entrada! Capachos vinílicos vulcanizados antiderrapantes com a logo da sua empresa ou frases para condomínios e residências.",
        badge: "Vulcanizado Premium",
        priceFrom: "",
        image: "",
        artId: "tapetes-capachos",
        visible: true,
        order: 7
      },
      {
        id: "quadros-azulejos",
        name: "Quadrinhos Decorativos & Azulejos com Foto",
        category: "decoracao",
        description: "Decore com estilo e personalidade! Transforme seus espaços ou dê um presente emocionante com quadrinhos decorativos e azulejos personalizados com foto, frase ou homenagem.",
        badge: "Presente Inesquecível",
        priceFrom: "",
        image: "",
        artId: "quadros-azulejos",
        visible: true,
        order: 8
      },
      {
        id: "canecas-chaveiros",
        name: "Mouse Pads, Chaveirinhos & Toalhas Personalizadas",
        category: "brindes",
        description: "Brindes corporativos criativos e úteis para ações promocionais, Outubro Rosa, Novembro Azul, feiras, kits de boas-vindas e lembranças personalizadas que encantam.",
        badge: "Kits & Campanhas",
        priceFrom: "",
        image: "",
        artId: "canecas-chaveiros",
        visible: true,
        order: 9
      }
    ],
    instagramPosts: [
      {
        id: "post-1",
        shortcode: "DfmaEPEtQD8",
        url: "https://www.instagram.com/p/DfmaEPEtQD8/",
        caption: "Copos térmicos Novembro Azul",
        visible: true
      },
      {
        id: "post-2",
        shortcode: "DfmaCIzPuLf",
        url: "https://www.instagram.com/p/DfmaCIzPuLf/",
        caption: "Copos gravados CTG",
        visible: true
      },
      {
        id: "post-3",
        shortcode: "Dfk-COvp8Qw",
        url: "https://www.instagram.com/p/Dfk-COvp8Qw/",
        caption: "Calendários 2027 Wire-o",
        visible: true
      },
      {
        id: "post-4",
        shortcode: "DfVTSI-pG4g",
        url: "https://www.instagram.com/p/DfVTSI-pG4g/",
        caption: "Camisetas Natal da Família",
        visible: true
      },
      {
        id: "post-5",
        shortcode: "DfVTQElpFY3",
        url: "https://www.instagram.com/p/DfVTQElpFY3/",
        caption: "Catálogo de produtos",
        visible: true
      },
      {
        id: "post-6",
        shortcode: "DfX_YGqpABQ",
        url: "https://www.instagram.com/p/DfX_YGqpABQ/",
        caption: "Mouse pads e brindes para empresas",
        visible: true
      },
      {
        id: "post-7",
        shortcode: "DfX_U3hJbwb",
        url: "https://www.instagram.com/p/DfX_U3hJbwb/",
        caption: "Adesivos vinílicos à prova d'água",
        visible: true
      },
      {
        id: "post-8",
        shortcode: "DfSUQY9JjpX",
        url: "https://www.instagram.com/p/DfSUQY9JjpX/",
        caption: "Tapetes capachos personalizados",
        visible: true
      },
      {
        id: "post-9",
        shortcode: "Dc6gLzWpWYS",
        url: "https://www.instagram.com/p/Dc6gLzWpWYS/",
        caption: "Quadrinhos decorativos e azulejos",
        visible: true
      },
      {
        id: "post-10",
        shortcode: "Dd3-UBURttx",
        url: "https://www.instagram.com/p/Dd3-UBURttx/",
        caption: "WindBanners e comunicação visual",
        visible: true
      }
    ],
    shipping: {
      originCep: "95555000",
      originCity: "Capão da Canoa/RS",
      handlingDays: 1,
      freeShippingFrom: 0,
      note: "Valores estimados com base nas tarifas vigentes dos Correios (reajuste 2026). Prazo e preço finais confirmados no atendimento via WhatsApp.",
      services: [
        { id: "pac", name: "PAC", enabled: true },
        { id: "sedex", name: "SEDEX", enabled: true }
      ],
      zones: [
        {
          id: "rs-local",
          label: "Rio Grande do Sul (Estadual)",
          ufs: ["RS"],
          pac: { base: 18.90, perKg: 3.50, days: 4 },
          sedex: { base: 25.50, perKg: 4.50, days: 2 }
        },
        {
          id: "sul",
          label: "Região Sul (SC, PR)",
          ufs: ["SC", "PR"],
          pac: { base: 24.90, perKg: 4.80, days: 7 },
          sedex: { base: 42.90, perKg: 7.50, days: 3 }
        },
        {
          id: "sudeste",
          label: "Região Sudeste (SP, RJ, MG, ES)",
          ufs: ["SP", "RJ", "MG", "ES"],
          pac: { base: 32.50, perKg: 6.20, days: 8 },
          sedex: { base: 64.90, perKg: 11.50, days: 3 }
        },
        {
          id: "centro-oeste",
          label: "Região Centro-Oeste (DF, GO, MT, MS)",
          ufs: ["DF", "GO", "MT", "MS"],
          pac: { base: 39.90, perKg: 7.80, days: 10 },
          sedex: { base: 79.90, perKg: 14.00, days: 4 }
        },
        {
          id: "nordeste",
          label: "Região Nordeste (AL, BA, CE, MA, PB, PE, PI, RN, SE)",
          ufs: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
          pac: { base: 48.90, perKg: 9.50, days: 12 },
          sedex: { base: 98.50, perKg: 18.00, days: 5 }
        },
        {
          id: "norte",
          label: "Região Norte (AC, AP, AM, PA, RO, RR, TO)",
          ufs: ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
          pac: { base: 56.90, perKg: 11.00, days: 15 },
          sedex: { base: 115.00, perKg: 22.00, days: 6 }
        }
      ],
      packages: [
        { id: "caneca-copo", label: "Caneca / Copo Térmico (1 un)", weightKg: 0.45, dims: "12x12x15 cm" },
        { id: "kit-camiseta", label: "Kit Camisetas (até 3 un)", weightKg: 0.60, dims: "25x20x6 cm" },
        { id: "calendarios", label: "Calendários / Folhinhas (50 un)", weightKg: 2.50, dims: "32x24x10 cm" },
        { id: "adesivos-cartoes", label: "Adesivos / Cartões de Visita", weightKg: 0.35, dims: "15x11x6 cm" },
        { id: "custom", label: "Outro Peso (Personalizado)", weightKg: 1.00, dims: "Personalizado" }
      ]
    }
  };

  let activeContent = null;
  let baseDefaults = DEFAULT_CONTENT;

  function openIDB() {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return reject(new Error('IndexedDB not supported'));
      }
      const req = window.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function () {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = function () {
        resolve(req.result);
      };
      req.onerror = function () {
        reject(req.error || new Error('Failed to open IndexedDB'));
      };
    });
  }

  async function getStoredCopy() {
    try {
      const db = await openIDB();
      const val = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(STORAGE_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
      if (val) return val;
    } catch (e) {
      // IndexedDB failed or not allowed, continue to localStorage
    }

    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {
      // LocalStorage unavailable
    }
    return null;
  }

  async function setStoredCopy(val) {
    let savedInIDB = false;
    try {
      const db = await openIDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(val, STORAGE_KEY);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
      savedInIDB = true;
    } catch (e) {
      console.warn('[OrigemStore] IndexedDB write error, falling back to localStorage:', e);
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
      }
    } catch (e) {
      if (!savedInIDB) {
        throw new Error('Could not persist to IndexedDB or localStorage');
      }
    }
  }

  async function clearStoredCopy() {
    try {
      const db = await openIDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(STORAGE_KEY);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      // Ignore
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      // Ignore
    }
  }

  function mergeContent(defaults, saved) {
    if (!saved || typeof saved !== 'object') {
      return JSON.parse(JSON.stringify(defaults));
    }
    const merged = JSON.parse(JSON.stringify(defaults));

    if (saved.version) merged.version = saved.version;

    if (saved.business && typeof saved.business === 'object') {
      merged.business = Object.assign({}, merged.business, saved.business);
    }
    if (saved.hero && typeof saved.hero === 'object') {
      merged.hero = Object.assign({}, merged.hero, saved.hero);
    }
    if (Array.isArray(saved.categories)) {
      merged.categories = saved.categories;
    }
    if (Array.isArray(saved.products)) {
      merged.products = saved.products;
    }
    if (Array.isArray(saved.instagramPosts)) {
      merged.instagramPosts = saved.instagramPosts;
    }
    if (saved.shipping && typeof saved.shipping === 'object') {
      merged.shipping = Object.assign({}, merged.shipping, saved.shipping);
      if (Array.isArray(saved.shipping.services)) merged.shipping.services = saved.shipping.services;
      if (Array.isArray(saved.shipping.zones)) merged.shipping.zones = saved.shipping.zones;
      if (Array.isArray(saved.shipping.packages)) merged.shipping.packages = saved.shipping.packages;
    }

    return merged;
  }

  async function loadInitialContent() {
    let defaults = DEFAULT_CONTENT;
    try {
      // Find relative path whether called from / or from /admin.html
      const jsonUrl = 'data/content.json';
      const res = await fetch(jsonUrl, { cache: 'no-cache' });
      if (res.ok) {
        const fetched = await res.json();
        if (fetched && typeof fetched === 'object') {
          defaults = fetched;
        }
      }
    } catch (e) {
      console.warn('[OrigemStore] fetch("data/content.json") unavailable, using embedded defaults.', e);
    }

    baseDefaults = defaults;
    const saved = await getStoredCopy();
    activeContent = mergeContent(baseDefaults, saved);
    return activeContent;
  }

  function notifyChange() {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('origem:content', {
        detail: JSON.parse(JSON.stringify(activeContent))
      });
      window.dispatchEvent(event);
    }
  }

  const readyPromise = loadInitialContent();

  const OrigemStore = {
    ready: readyPromise,

    get() {
      if (!activeContent) {
        return JSON.parse(JSON.stringify(baseDefaults));
      }
      return JSON.parse(JSON.stringify(activeContent));
    },

    async save(newContent) {
      if (!newContent || typeof newContent !== 'object') {
        throw new Error('Invalid content object passed to OrigemStore.save()');
      }
      const toSave = JSON.parse(JSON.stringify(newContent));
      activeContent = toSave;
      await setStoredCopy(toSave);
      notifyChange();
      return OrigemStore.get();
    },

    async reset() {
      await clearStoredCopy();
      activeContent = JSON.parse(JSON.stringify(baseDefaults));
      notifyChange();
      return OrigemStore.get();
    },

    exportJSON() {
      return JSON.stringify(OrigemStore.get(), null, 2);
    },

    async importJSON(objOrString) {
      let parsed = objOrString;
      if (typeof objOrString === 'string') {
        try {
          parsed = JSON.parse(objOrString);
        } catch (e) {
          throw new Error('Arquivo JSON inválido: ' + e.message);
        }
      }
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Estrutura de dados inválida no JSON importado.');
      }
      return await OrigemStore.save(parsed);
    },

    onChange(callback) {
      if (typeof callback !== 'function') return () => {};
      const handler = (e) => {
        callback(e.detail || OrigemStore.get());
      };
      window.addEventListener('origem:content', handler);
      return () => {
        window.removeEventListener('origem:content', handler);
      };
    }
  };

  window.OrigemStore = OrigemStore;
})();
