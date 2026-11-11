/**
 * ============================================================================
 * ORIGEM PERSONALIZADOS RS — Dynamic Sections & Interactive Catalog Module
 * Owned by: sections-catalog (js/sections-catalog.js)
 * Exposes: window.OrigemCatalog = { init }
 * Renders & binds:
 *   1. #catalogo-section (Bento Grid with 6 Filter Tabs & 9 Product Cards)
 *   2. #simulador-section (Interactive 3-Step Quote Configurator + Live WA Preview)
 *   3. #portfolio-section (@origempersonalizadosrs Highlights & 6 Real Showcase Posts)
 *   4. #como-funciona-section (4-Step Process Timeline & Interactive FAQ Accordion)
 *   5. #cta-final-section & #footer-section (High-Impact Final CTA & Full Footer)
 * ============================================================================
 */
(function () {
  'use strict';

  const WA_NUMBER = '5551980577025';
  const WA_DIRECT_LINK = 'https://wa.me/message/L34PQGHRXEMLM1';
  const IG_URL = 'https://www.instagram.com/origempersonalizadosrs/';
  const EMAIL_ADDRESS = 'origempersonalizadosrs@gmail.com';

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  /* --------------------------------------------------------------------------
     FALLBACK BESPOKE SVG ILLUSTRATIONS (Used if OrigemVisuals.getProductArt
     is not yet loaded or as rich fallback artwork)
     -------------------------------------------------------------------------- */
  const FALLBACK_PRODUCT_SVGS = {
    'copos-termicos': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Copos Térmicos e Canecas Personalizadas">
        <defs>
          <linearGradient id="cupBody" x1="65" y1="25" x2="155" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#2C3E30"/>
            <stop offset="50%" stop-color="#152218"/>
            <stop offset="100%" stop-color="#0B130D"/>
          </linearGradient>
          <linearGradient id="steelRim" x1="65" y1="20" x2="155" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#E6ECE8"/>
            <stop offset="50%" stop-color="#9FB0A4"/>
            <stop offset="100%" stop-color="#DAE2DC"/>
          </linearGradient>
          <linearGradient id="mugGrad" x1="165" y1="75" x2="245" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#8FAF85"/>
            <stop offset="100%" stop-color="#5B7E53"/>
          </linearGradient>
        </defs>
        <ellipse cx="140" cy="182" rx="95" ry="10" fill="rgba(0,0,0,0.35)"/>
        <!-- Thermal Tumbler -->
        <path d="M74 26H146L138 174C137.5 178 134 180 130 180H90C86 180 82.5 178 82 174L74 26Z" fill="url(#cupBody)" stroke="#8FAF85" stroke-width="1.5"/>
        <rect x="71" y="20" width="78" height="14" rx="4" fill="url(#steelRim)"/>
        <rect x="78" y="13" width="64" height="8" rx="3" fill="#1E3524" stroke="#A2C59D" stroke-width="1"/>
        <!-- Laser Engraved Emblem -->
        <circle cx="110" cy="96" r="24" fill="none" stroke="#D4A359" stroke-width="1.6" stroke-dasharray="3 2"/>
        <circle cx="110" cy="96" r="19" fill="rgba(212,163,89,0.12)" stroke="#E2B875" stroke-width="1"/>
        <text x="110" y="95" text-anchor="middle" fill="#F0CFA0" font-family="Georgia, serif" font-size="7.5" font-weight="700" letter-spacing="1">ORIGEM</text>
        <text x="110" y="104" text-anchor="middle" fill="#D4A359" font-family="sans-serif" font-size="4.8" font-weight="700">LASER INOX</text>
        <!-- Ceramic Mug -->
        <path d="M225 96H242C249 96 254 102 254 110V136C254 144 249 150 242 150H225" stroke="#F7F9F5" stroke-width="6" stroke-linecap="round"/>
        <rect x="164" y="82" width="66" height="88" rx="10" fill="url(#mugGrad)" stroke="#F7F9F5" stroke-width="1.5"/>
        <circle cx="197" cy="126" r="18" fill="#F7F9F5"/>
        <text x="197" y="129" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="7.5" font-weight="700">SUA LOGO</text>
      </svg>`,

    'calendarios-2027': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calendários 2027 Personalizados">
        <ellipse cx="140" cy="182" rx="95" ry="10" fill="rgba(0,0,0,0.32)"/>
        <!-- Desk Calendar Base Tent -->
        <path d="M52 168L70 42H210L228 168H52Z" fill="#1E3524" stroke="#8FAF85" stroke-width="1.5"/>
        <rect x="64" y="44" width="152" height="114" rx="8" fill="#F7F9F5"/>
        <!-- Top Header Banner -->
        <path d="M64 52C64 47.5817 67.5817 44 72 44H208C212.418 44 216 47.5817 216 52V78H64V52Z" fill="#8FAF85"/>
        <!-- Wire-O Rings -->
        <g fill="#D4A359">
          <rect x="78" y="36" width="5" height="14" rx="2.5"/>
          <rect x="98" y="36" width="5" height="14" rx="2.5"/>
          <rect x="118" y="36" width="5" height="14" rx="2.5"/>
          <rect x="138" y="36" width="5" height="14" rx="2.5"/>
          <rect x="158" y="36" width="5" height="14" rx="2.5"/>
          <rect x="178" y="36" width="5" height="14" rx="2.5"/>
          <rect x="198" y="36" width="5" height="14" rx="2.5"/>
        </g>
        <text x="140" y="66" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="15" font-weight="700" letter-spacing="1.5">CALENDÁRIO 2027</text>
        <!-- Calendar Grid -->
        <rect x="76" y="88" width="52" height="56" rx="6" fill="#EDF2EA" stroke="#8FAF85" stroke-width="1"/>
        <text x="102" y="114" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="16" font-weight="800">2027</text>
        <text x="102" y="129" text-anchor="middle" fill="#3E5243" font-family="sans-serif" font-size="6.5" font-weight="700">365 DIAS COM VOCÊ</text>
        <g fill="#2A4732" opacity="0.75">
          <rect x="138" y="90" width="10" height="8" rx="2"/>
          <rect x="153" y="90" width="10" height="8" rx="2"/>
          <rect x="168" y="90" width="10" height="8" rx="2"/>
          <rect x="183" y="90" width="10" height="8" rx="2"/>
          <rect x="138" y="104" width="10" height="8" rx="2"/>
          <rect x="153" y="104" width="10" height="8" rx="2" fill="#D4A359"/>
          <rect x="168" y="104" width="10" height="8" rx="2"/>
          <rect x="183" y="104" width="10" height="8" rx="2"/>
          <rect x="138" y="118" width="10" height="8" rx="2"/>
          <rect x="153" y="118" width="10" height="8" rx="2"/>
          <rect x="168" y="118" width="10" height="8" rx="2"/>
          <rect x="183" y="118" width="10" height="8" rx="2"/>
        </g>
        <rect x="138" y="133" width="64" height="11" rx="4" fill="#142418"/>
        <text x="170" y="141" text-anchor="middle" fill="#F0CFA0" font-family="sans-serif" font-size="6" font-weight="700">SUA MARCA AQUI</text>
      </svg>`,

    'camisetas-uniformes': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camisetas, Moletons e Bonés Personalizados">
        <ellipse cx="140" cy="184" rx="90" ry="9" fill="rgba(0,0,0,0.32)"/>
        <!-- T-Shirt Silhouette -->
        <path d="M98 34L60 56L74 88L98 76V170H182V76L206 88L220 56L182 34C172 48 158 54 140 54C122 54 108 48 98 34Z" fill="#8FAF85" stroke="#F7F9F5" stroke-width="2" stroke-linejoin="round"/>
        <!-- Collar Detail -->
        <path d="M114 38C122 48 158 48 166 38" stroke="#142418" stroke-width="3" stroke-linecap="round"/>
        <!-- Custom Chest Print -->
        <circle cx="140" cy="102" r="26" fill="#142418" stroke="#D4A359" stroke-width="1.5"/>
        <text x="140" y="100" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="8.5" font-weight="700" letter-spacing="1">ORIGEM</text>
        <text x="140" y="111" text-anchor="middle" fill="#A2C59D" font-family="sans-serif" font-size="5.5" font-weight="700">UNIFORMES &amp; EVENTOS</text>
        <rect x="112" y="138" width="56" height="14" rx="7" fill="#F7F9F5"/>
        <text x="140" y="147.5" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6.5" font-weight="800">ALGODÃO &amp; DRY-FIT</text>
      </svg>`,

    'cartoes-papelaria': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartões de Visita, Panfletos e Papelaria">
        <ellipse cx="140" cy="182" rx="95" ry="9" fill="rgba(0,0,0,0.32)"/>
        <!-- Folder / Flyer Back -->
        <rect x="52" y="34" width="110" height="132" rx="8" transform="rotate(-6 52 34)" fill="#EDF2EA" stroke="#8FAF85" stroke-width="1.5"/>
        <rect x="64" y="48" width="84" height="14" rx="4" transform="rotate(-6 64 48)" fill="#8FAF85"/>
        <!-- Front Business Card Dark Luxury -->
        <rect x="96" y="76" width="142" height="86" rx="10" fill="#142418" stroke="#D4A359" stroke-width="1.8"/>
        <circle cx="132" cy="118" r="20" fill="#8FAF85"/>
        <text x="132" y="121" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="7.5" font-weight="700">ORIGEM</text>
        <rect x="162" y="102" width="58" height="7" rx="3.5" fill="#F7F9F5"/>
        <rect x="162" y="115" width="44" height="5" rx="2.5" fill="#A2C59D"/>
        <rect x="162" y="126" width="50" height="5" rx="2.5" fill="#D4A359"/>
      </svg>`,

    'adesivos-rotulos': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Adesivos Vinílicos e Rótulos Recortados">
        <ellipse cx="140" cy="182" rx="90" ry="9" fill="rgba(0,0,0,0.32)"/>
        <!-- Die-cut Sticker Sheet -->
        <rect x="58" y="28" width="164" height="140" rx="14" fill="#F7F9F5" stroke="#8FAF85" stroke-width="1.5" stroke-dasharray="5 4"/>
        <!-- Round Die-Cut Sticker with Peel -->
        <circle cx="115" cy="96" r="40" fill="#8FAF85" stroke="#142418" stroke-width="2"/>
        <circle cx="115" cy="96" r="33" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-dasharray="3 2"/>
        <text x="115" y="94" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="11" font-weight="700">ORIGEM</text>
        <text x="115" y="106" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6" font-weight="800">VINIL À PROVA D'ÁGUA</text>
        <!-- Badge Sticker -->
        <rect x="164" y="56" width="44" height="44" rx="10" fill="#142418" stroke="#D4A359" stroke-width="1.5"/>
        <text x="186" y="81" text-anchor="middle" fill="#D4A359" font-family="sans-serif" font-size="7" font-weight="800">RÓTULOS</text>
        <rect x="164" y="110" width="44" height="38" rx="8" fill="#D4A359"/>
        <text x="186" y="132" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="7" font-weight="800">RECORTE</text>
      </svg>`,

    'banners-windbanner': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WindBanners, Banners, Lonas e Placas de Fachada">
        <ellipse cx="140" cy="182" rx="95" ry="9" fill="rgba(0,0,0,0.32)"/>
        <!-- WindBanner Feather Flag -->
        <path d="M78 172V28C78 22 126 18 128 54C130 90 124 126 78 144" fill="#8FAF85" stroke="#F7F9F5" stroke-width="2"/>
        <line x1="78" y1="24" x2="78" y2="174" stroke="#D4A359" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="62" y="170" width="32" height="7" rx="3.5" fill="#D4A359"/>
        <text x="103" y="86" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="7.5" font-weight="800" transform="rotate(-90 103 86)">WINDBANNER</text>
        <!-- Storefront Sign / Lona -->
        <rect x="142" y="48" width="88" height="114" rx="8" fill="#142418" stroke="#A2C59D" stroke-width="1.8"/>
        <rect x="152" y="60" width="68" height="32" rx="5" fill="#8FAF85"/>
        <text x="186" y="79" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="9" font-weight="700">FACHADA</text>
        <text x="186" y="114" text-anchor="middle" fill="#F7F9F5" font-family="sans-serif" font-size="7.5" font-weight="700">LONAS &amp; PLACAS</text>
        <text x="186" y="128" text-anchor="middle" fill="#D4A359" font-family="sans-serif" font-size="6.5" font-weight="700">ALTA RESISTÊNCIA</text>
      </svg>`,

    'tapetes-capachos': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tapetes Capachos Personalizados">
        <ellipse cx="140" cy="178" rx="105" ry="12" fill="rgba(0,0,0,0.35)"/>
        <!-- Vulcanized Mat Perspective -->
        <polygon points="62,56 218,56 242,158 38,158" fill="#2A382E" stroke="#D4A359" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="72,66 208,66 226,148 54,148" fill="#142418" stroke="#8FAF85" stroke-width="1.2" stroke-dasharray="4 3"/>
        <circle cx="140" cy="104" r="24" fill="#8FAF85"/>
        <text x="140" y="102" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="8.5" font-weight="700">ORIGEM</text>
        <text x="140" y="112" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="5" font-weight="800">BEM-VINDO</text>
        <text x="140" y="140" text-anchor="middle" fill="#F0CFA0" font-family="sans-serif" font-size="7.5" font-weight="800" letter-spacing="1.5">CAPACHO VULCANIZADO</text>
      </svg>`,

    'quadros-azulejos': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quadrinhos Decorativos e Azulejos com Foto">
        <ellipse cx="140" cy="182" rx="95" ry="9" fill="rgba(0,0,0,0.32)"/>
        <!-- Decorative Wood Frame -->
        <rect x="56" y="32" width="96" height="124" rx="6" fill="#D4A359" stroke="#F7F9F5" stroke-width="1.5"/>
        <rect x="65" y="41" width="78" height="106" rx="3" fill="#F7F9F5"/>
        <circle cx="104" cy="82" r="22" fill="#8FAF85"/>
        <path d="M74 134L94 108L112 124L124 112L136 134H74Z" fill="#1E3524"/>
        <!-- Ceramic Tile on Stand -->
        <rect x="138" y="64" width="88" height="88" rx="8" fill="#FFFFFF" stroke="#8FAF85" stroke-width="2.5"/>
        <rect x="148" y="74" width="68" height="54" rx="4" fill="#EDF2EA"/>
        <text x="182" y="102" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="8.5" font-weight="700">SUA FOTO</text>
        <text x="182" y="114" text-anchor="middle" fill="#8FAF85" font-family="sans-serif" font-size="6" font-weight="800">AZULEJO &amp; QUADRO</text>
        <path d="M156 152L148 166M208 152L216 166" stroke="#D4A359" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`,

    'canecas-chaveiros': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mouse Pads, Chaveirinhos e Toalhas Personalizadas">
        <ellipse cx="140" cy="182" rx="95" ry="9" fill="rgba(0,0,0,0.32)"/>
        <!-- Mousepad -->
        <rect x="52" y="54" width="110" height="96" rx="14" fill="#142418" stroke="#8FAF85" stroke-width="2"/>
        <circle cx="107" cy="102" r="24" fill="#8FAF85"/>
        <text x="107" y="105" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="7.5" font-weight="700">MOUSE PAD</text>
        <!-- Custom Towel Folded -->
        <rect x="150" y="42" width="78" height="56" rx="8" fill="#F7F9F5" stroke="#A2C59D" stroke-width="1.5"/>
        <rect x="150" y="72" width="78" height="14" fill="#8FAF85"/>
        <text x="189" y="82" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6.5" font-weight="800">TOALHA BORDADA/SUBL.</text>
        <!-- Keychain -->
        <circle cx="188" cy="122" r="10" stroke="#D4A359" stroke-width="3"/>
        <rect x="168" y="132" width="40" height="36" rx="8" fill="#D4A359"/>
        <text x="188" y="153" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6.5" font-weight="800">CHAVEIRO</text>
      </svg>`
  };

  /* --------------------------------------------------------------------------
     1. CATALOG DATA (9 Detailed Products & 6 Filter Categories)
     -------------------------------------------------------------------------- */
  const FILTER_TABS = [
    { id: 'Todos', label: 'Todos', icon: 'layout-grid' },
    { id: 'Brindes & Térmicos', label: 'Brindes & Térmicos', icon: 'cup-soda' },
    { id: 'Gráfica & Calendários', label: 'Gráfica & Calendários', icon: 'calendar-days' },
    { id: 'Comunicação Visual', label: 'Comunicação Visual', icon: 'flag' },
    { id: 'Vestuário & Eventos', label: 'Vestuário & Eventos', icon: 'shirt' },
    { id: 'Decoração & Capachos', label: 'Decoração & Capachos', icon: 'frame' }
  ];

  const CATALOG_PRODUCTS = [
    {
      id: 'copos-termicos',
      title: 'Copos Térmicos & Canecas Personalizadas',
      category: 'Brindes & Térmicos',
      simulatorCategory: 'Brindes/Copos/Canecas',
      badge: 'Mais Pedido',
      badgeStyle: 'amber',
      bentoWide: true,
      description:
        'Copos térmicos em inox com tampa e gravação a laser permanente para empresas, CTGs, festas e presentes, além de canecas de cerâmica, polímero e chopp personalizadas com alta definição.',
      specs: ['Inox Gravado a Laser', 'Canecas Cerâmica & Polímero', 'Empresas, CTGs & Festas'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de fazer um orçamento de Copos Térmicos / Canecas Personalizadas.'
    },
    {
      id: 'calendarios-2027',
      title: 'Calendários 2027 (Mesa Wire-o & Parede)',
      category: 'Gráfica & Calendários',
      simulatorCategory: 'Materiais Gráficos/Calendários',
      badge: 'Temporada 2027',
      badgeStyle: 'amber',
      bentoWide: true,
      description:
        'Seu cliente lembrará de você todos os dias do ano! Ideal para brindes corporativos de fim de ano. Modelos de mesa com acabamento Wire-O e de parede personalizados com sua marca e contatos.',
      specs: ['Mesa com Wire-O', 'Folhinhas de Parede', 'Brinde de Fim de Ano'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e quero orçar a Linha de Calendários 2027 (Mesa Wire-o / Parede) com a minha marca.'
    },
    {
      id: 'camisetas-uniformes',
      title: 'Camisetas, Moletons & Bonés',
      category: 'Vestuário & Eventos',
      simulatorCategory: 'Camisetas/Uniformes',
      badge: 'Equipes & Família',
      badgeStyle: 'sage',
      bentoWide: false,
      description:
        'Uniformes profissionais que passam credibilidade para sua equipe, camisetas promocionais para eventos, linha especial "Natal da Família", moletons e bonés em dry-fit ou algodão.',
      specs: ['Uniformes Profissionais', 'Natal da Família & Eventos', 'Dry-Fit, Algodão & Moletom'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de orçar Camisetas, Moletons ou Uniformes Personalizados.'
    },
    {
      id: 'cartoes-papelaria',
      title: 'Cartões de Visita, Panfletos, Pastas & Recibos',
      category: 'Gráfica & Calendários',
      simulatorCategory: 'Materiais Gráficos/Calendários',
      badge: 'Papelaria Completa',
      badgeStyle: 'sage',
      bentoWide: false,
      description:
        'Papelaria corporativa completa para fortalecer sua identidade: cartões de visita premium, panfletos, pastas com bolsa, tags para confecções, blocos de pedidos, recibos e cadernos.',
      specs: ['Cartões & Panfletos', 'Tags para Confecções', 'Pastas, Blocos & Cadernos'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de um orçamento de Papelaria Gráfica (Cartões de Visita, Panfletos, Pastas ou Blocos).'
    },
    {
      id: 'adesivos-rotulos',
      title: 'Adesivos Vinílicos & Rótulos Recortados',
      category: 'Comunicação Visual',
      simulatorCategory: 'Adesivos/Banners/Fachada',
      badge: "À Prova D'Água",
      badgeStyle: 'sage',
      bentoWide: false,
      description:
        'Adesivos em vinil impermeável à prova d’água com recorte eletrônico de alta precisão para embalagens, doces, gastronomia, veículos, copos e vitrines comerciais.',
      specs: ['Recorte Eletrônico', 'Vinil Impermeável', 'Rótulos, Carros & Vitrines'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de orçar Adesivos Vinílicos e Rótulos Personalizados.'
    },
    {
      id: 'banners-windbanner',
      title: 'WindBanners, Banners, Lonas & Placas de Fachada',
      category: 'Comunicação Visual',
      simulatorCategory: 'Adesivos/Banners/Fachada',
      badge: 'Destaque Litoral',
      badgeStyle: 'amber',
      bentoWide: false,
      description:
        'Destaque sua loja em Capão da Canoa e em todo o Litoral Norte! WindBanners completos, banners promocionais, lonas e placas de fachada com alta resistência ao sol e vento.',
      specs: ['WindBanner Completo', 'Banners & Lonas', 'Placas de Fachada'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de orçar WindBanners, Banners ou Placas de Fachada para o meu negócio.'
    },
    {
      id: 'tapetes-capachos',
      title: 'Tapetes Capachos Personalizados',
      category: 'Decoração & Capachos',
      simulatorCategory: 'Capachos/Decoração',
      badge: 'Vulcanizado Premium',
      badgeStyle: 'sage',
      bentoWide: false,
      description:
        'Receba seus clientes com impacto desde a porta de entrada! Capachos vinílicos vulcanizados antiderrapantes com a logo da sua empresa ou frases para condomínios e residências.',
      specs: ['Fibra Vinílica Vulcanizada', 'Antiderrapante & Lavável', 'Comércios & Condomínios'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de orçar um Tapete Capacho Personalizado com a minha marca.'
    },
    {
      id: 'quadros-azulejos',
      title: 'Quadrinhos Decorativos & Azulejos com Foto',
      category: 'Decoração & Capachos',
      simulatorCategory: 'Capachos/Decoração',
      badge: 'Presente Inesquecível',
      badgeStyle: 'sage',
      bentoWide: false,
      description:
        'Decore com estilo e personalidade! Transforme seus espaços ou dê um presente emocionante com quadrinhos decorativos e azulejos personalizados com foto, frase ou homenagem.',
      specs: ['Quadros Decorativos', 'Azulejos com Suporte', 'Presentes & Memórias'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de orçar Quadrinhos Decorativos ou Azulejos Personalizados.'
    },
    {
      id: 'canecas-chaveiros',
      title: 'Mouse Pads, Chaveirinhos & Toalhas Personalizadas',
      category: 'Brindes & Térmicos',
      simulatorCategory: 'Brindes/Copos/Canecas',
      badge: 'Kits & Campanhas',
      badgeStyle: 'amber',
      bentoWide: false,
      description:
        'Brindes corporativos criativos e úteis para ações promocionais, Outubro Rosa, Novembro Azul, feiras, kits de boas-vindas e lembranças personalizadas que encantam.',
      specs: ['Mouse Pads & Chaveiros', 'Toalhas Personalizadas', 'Campanhas & Eventos'],
      waMessage:
        'Olá Origem Personalizados! Vim pelo site e gostaria de orçar Brindes Personalizados (Mouse Pads, Chaveirinhos ou Toalhas).'
    }
  ];

  /* --------------------------------------------------------------------------
     2. SIMULATOR OPTIONS DATA
     -------------------------------------------------------------------------- */
  const SIM_STEP_1_ITEMS = [
    {
      id: 'Brindes/Copos/Canecas',
      label: 'Brindes, Copos & Canecas',
      sub: 'Copos térmicos inox, canecas, mouse pads, chaveiros e toalhas',
      icon: 'cup-soda'
    },
    {
      id: 'Materiais Gráficos/Calendários',
      label: 'Gráfica & Calendários 2027',
      sub: 'Calendários mesa/parede, cartões, panfletos, pastas e blocos',
      icon: 'calendar-days'
    },
    {
      id: 'Camisetas/Uniformes',
      label: 'Camisetas & Uniformes',
      sub: 'Camisetas para empresas, eventos, Natal da família e moletons',
      icon: 'shirt'
    },
    {
      id: 'Adesivos/Banners/Fachada',
      label: 'Adesivos, Banners & Fachada',
      sub: 'Adesivos vinílicos, rótulos, WindBanners, lonas e placas',
      icon: 'flag'
    },
    {
      id: 'Capachos/Decoração',
      label: 'Capachos & Decoração',
      sub: 'Tapetes capachos com logo, quadrinhos e azulejos com foto',
      icon: 'layers'
    },
    {
      id: 'Outro/Vários itens',
      label: 'Outro / Vários Itens (Kit)',
      sub: 'Quero montar um pacote com diferentes produtos personalizados',
      icon: 'package-plus'
    }
  ];

  const SIM_STEP_2_AUDIENCE = [
    {
      id: 'Para minha Empresa / Comércio',
      label: 'Para minha Empresa / Comércio',
      sub: 'Divulgação, brindes de fim de ano, papelaria ou uniformes',
      icon: 'building-2'
    },
    {
      id: 'Para Presente / Família',
      label: 'Para Presente / Família',
      sub: 'Presente afetivo único, aniversário, Natal ou homenagem',
      icon: 'heart-handshake'
    },
    {
      id: 'Para Evento / CTG / Campanha',
      label: 'Para Evento / CTG / Campanha',
      sub: 'Festas, CTGs, Outubro Rosa, Novembro Azul, grupos e feiras',
      icon: 'users'
    }
  ];

  const SIM_STEP_3_ART = [
    {
      id: 'Já tenho a arte pronta',
      label: 'Já tenho a arte ou logotipo',
      sub: 'Posso enviar o arquivo ou logo pelo WhatsApp',
      icon: 'file-check-2'
    },
    {
      id: 'Tenho só a ideia / preciso que criem a arte',
      label: 'Tenho só a ideia (Criem a arte!)',
      sub: 'A equipe da Origem monta o layout e envia prévia para aprovar',
      icon: 'wand-sparkles'
    },
    {
      id: 'Quero ajuda para decidir',
      label: 'Quero ajuda para decidir',
      sub: 'Gostaria de ver sugestões de modelos e valores no WhatsApp',
      icon: 'help-circle'
    }
  ];

  /* --------------------------------------------------------------------------
     3. INSTAGRAM HIGHLIGHTS & PORTFOLIO SHOWCASE DATA
     -------------------------------------------------------------------------- */
  const IG_HIGHLIGHTS = [
    {
      id: 'Todos',
      label: 'Todos',
      icon: 'sparkles',
      desc: 'Mostrando todos os destaques e trabalhos reais produzidos pela Origem Personalizados RS.'
    },
    {
      id: 'Camisetas',
      label: 'Camisetas',
      icon: 'shirt',
      desc: 'Camisetas personalizadas para empresas, eventos, Natal da Família e moletons exclusivos.',
      waText: 'Olá! Vi o destaque de Camisetas no site e gostaria de fazer um orçamento.'
    },
    {
      id: 'Adesivos',
      label: 'Adesivos',
      icon: 'sticker',
      desc: 'Adesivos em vinil à prova d’água e rótulos recortados para embalagens, doces e vitrines.',
      waText: 'Olá! Vi o destaque de Adesivos no site e gostaria de fazer um orçamento.'
    },
    {
      id: 'Quadros',
      label: 'Quadros',
      icon: 'frame',
      desc: 'Quadrinhos decorativos e azulejos personalizados para transformar ambientes ou presentear.',
      waText: 'Olá! Vi o destaque de Quadros Decorativos no site e gostaria de fazer um orçamento.'
    },
    {
      id: 'Tapetes',
      label: 'Tapetes',
      icon: 'layers',
      desc: 'Tapetes capachos vulcanizados personalizados com a marca da sua empresa ou condomínio.',
      waText: 'Olá! Vi o destaque de Tapetes Capachos no site e gostaria de fazer um orçamento.'
    },
    {
      id: 'Toalhas',
      label: 'Toalhas',
      icon: 'gift',
      desc: 'Toalhas personalizadas, mouse pads e chaveirinhos para brindes e presentes especiais.',
      waText: 'Olá! Vi o destaque de Toalhas e Brindes no site e gostaria de fazer um orçamento.'
    },
    {
      id: 'Bandeira',
      label: 'Bandeira',
      icon: 'flag',
      desc: 'WindBanners, bandeiras, lonas e fachadas comerciais de alta resistência para o Litoral.',
      waText: 'Olá! Vi o destaque de WindBanners e Bandeiras no site e gostaria de fazer um orçamento.'
    },
    {
      id: 'Canecas',
      label: 'Canecas',
      icon: 'cup-soda',
      desc: 'Copos térmicos inox gravados a laser e canecas personalizadas para empresas, CTGs e festas.',
      waText: 'Olá! Vi o destaque de Copos Térmicos e Canecas no site e gostaria de fazer um orçamento.'
    }
  ];

  const DEFAULT_PORTFOLIO_ITEMS = [
    {
      id: 'post-novembro-azul',
      title: 'Copos Térmicos Personalizados — Campanha Novembro Azul',
      badge: 'Brindes Corporativos',
      type: 'Reel • Gravação Laser',
      highlights: ['Canecas', 'Toalhas'],
      image: 'assets/instagram/post-novembro-azul.jpg',
      fallbackArtId: 'copos-termicos',
      caption:
        'Copos térmicos azuis em inox personalizados com gravação de alta precisão para campanhas de conscientização, empresas e presentes especiais.',
      waMessage:
        'Olá! Vi os Copos Térmicos personalizados (estilo Novembro Azul) no portfólio do site e gostaria de um orçamento.'
    },
    {
      id: 'post-ctg-copos',
      title: 'Copos Gravados a Laser — CTG Chama Crioula & Eventos',
      badge: 'Tradição Gaúcha',
      type: 'Reel • Inox Premium',
      highlights: ['Canecas'],
      image: 'assets/instagram/post-ctg-copos.jpg',
      fallbackArtId: 'copos-termicos',
      caption:
        'Personalizamos ideias, criamos conexões! Copos térmicos pretos com gravação a laser permanente para CTGs, eventos tradicionalistas e empresas do RS.',
      waMessage:
        'Olá! Vi os Copos Térmicos gravados a laser do CTG no site e gostaria de orçar para meu evento/empresa.'
    },
    {
      id: 'post-calendarios-2027',
      title: 'Linha de Calendários 2027 — Mesa Wire-O & Parede',
      badge: 'Temporada 2027',
      type: 'Post • Gráfica Rápida',
      highlights: ['Adesivos'],
      image: 'assets/instagram/post-calendarios-2027.jpg',
      fallbackArtId: 'calendarios-2027',
      caption:
        'Seu cliente lembrará de você todos os dias do ano! Calendários 2027 com acabamento impecável para fidelizar clientes nas festas de fim de ano.',
      waMessage:
        'Olá! Vi a Linha de Calendários 2027 no portfólio do site e quero fazer um orçamento.'
    },
    {
      id: 'post-camisetas-natal',
      title: 'Camisetas Personalizadas — Natal da Família & Equipes',
      badge: 'Vestuário & Datas',
      type: 'Reel • Estamparia HD',
      highlights: ['Camisetas'],
      image: 'assets/instagram/post-camisetas-natal.jpg',
      fallbackArtId: 'camisetas-uniformes',
      caption:
        'Cores vibrantes e tecido super confortável! Fazemos camisetas temáticas para o Natal da Família, encontros, eventos e uniformes empresariais.',
      waMessage:
        'Olá! Vi as Camisetas Personalizadas no portfólio do site e gostaria de solicitar um orçamento.'
    },
    {
      id: 'post-kits-mousepad',
      title: 'Kits Corporativos: Mouse Pad, Moletons & Camisetas',
      badge: 'Kits & Presentes',
      type: 'Reel • Produção Origem',
      highlights: ['Camisetas', 'Toalhas', 'Canecas'],
      image: 'assets/instagram/post-kits-mousepad.jpg',
      fallbackArtId: 'canecas-chaveiros',
      caption:
        'Sua ideia, nossa criação! Montamos kits personalizados com mouse pad, moletons, camisetas, chaveirinhos e toalhas com a identidade do seu negócio.',
      waMessage:
        'Olá! Vi o Kit de Mouse Pad, Moletons e Camisetas no site e gostaria de orçar um kit personalizado.'
    },
    {
      id: 'post-catalogo-geral',
      title: 'Vitrine Completa: Capachos, Quadros, Banners & Gráfica',
      badge: 'Solução Completa',
      type: 'Destaque • Capão da Canoa',
      highlights: ['Adesivos', 'Quadros', 'Tapetes', 'Bandeira'],
      image: 'assets/instagram/post-catalogo-geral.jpg',
      fallbackArtId: 'tapetes-capachos',
      caption:
        'Impressos feitos para deixar sua marca: tapetes capachos vulcanizados, quadrinhos decorativos, WindBanners, adesivos vinílicos e papelaria completa.',
      waMessage:
        'Olá! Vi a vitrine completa da Origem Personalizados RS no site e gostaria de fazer um orçamento.'
    }
  ];

  /* --------------------------------------------------------------------------
     4. HOW IT WORKS STEPS & FAQ DATA
     -------------------------------------------------------------------------- */
  const HOW_IT_WORKS_STEPS = [
    {
      number: '01',
      icon: 'message-circle',
      title: 'Chame no WhatsApp com sua ideia',
      desc: 'Conte o que você deseja personalizar e a quantidade aproximada. Mesmo que você ainda não tenha logotipo ou arquivo aberto, nós ajudamos em tudo!',
      pill: 'Atendimento humano e rápido'
    },
    {
      number: '02',
      icon: 'palette',
      title: 'Criamos a arte e enviamos prévia',
      desc: 'Nossa equipe desenvolve um layout exclusivo para você e envia a amostra digital pelo WhatsApp para você conferir e aprovar antes de produzir.',
      pill: 'Segurança total no visual'
    },
    {
      number: '03',
      icon: 'printer',
      title: 'Produção caprichada em alta definição',
      desc: 'Com a arte aprovada, seu pedido entra em produção utilizando gravação a laser, impressão digital HD ou sublimação com rigoroso controle de qualidade.',
      pill: 'Acabamento premium'
    },
    {
      number: '04',
      icon: 'truck',
      title: 'Retirada em Capão da Canoa ou Entrega',
      desc: 'Seu pedido fica pronto rapidinho! Você pode retirar em Capão da Canoa - RS ou receber com agilidade em todo o Litoral Norte e Rio Grande do Sul.',
      pill: 'Capão da Canoa & Região'
    }
  ];

  const FAQ_ITEMS = [
    {
      question: 'Preciso ter a arte ou logotipo prontos para fazer meu pedido?',
      answer:
        'Não precisa! Esse é um dos nossos maiores diferenciais: você pode nos mandar apenas a sua ideia, foto, rascunho ou as cores da sua empresa pelo WhatsApp. Nossa equipe cria a arte personalizada e envia uma prévia digital para sua aprovação antes de iniciar a produção.'
    },
    {
      question: 'Vocês fazem poucas unidades (para presente) ou só atacado para empresas?',
      answer:
        'Atendemos os dois! Produzimos desde itens unitários ou pequenas quantidades para presentes afetivos (como canecas, copos térmicos, quadrinhos, azulejos e camisetas de família) até grandes lotes corporativos de calendários 2027, panfletos, uniformes e brindes para empresas e eventos.'
    },
    {
      question: 'Como funciona a entrega ou retirada em Capão da Canoa e região?',
      answer:
        'Estamos localizados em Capão da Canoa – RS! Você pode combinar a retirada local rápida ou solicitar entrega para Capão da Canoa, Xangri-Lá, Tramandaí, Osório, Torres e demais cidades do Litoral Norte e todo o Rio Grande do Sul.'
    },
    {
      question: 'Qual o prazo de produção e quais as formas de pagamento aceitas?',
      answer:
        'Nosso prazo é super ágil e varia conforme o produto e a quantidade escolhida — informamos o prazo exato já no seu orçamento pelo WhatsApp. Aceitamos PIX, cartões e condições facilitadas para pedidos empresariais.'
    },
    {
      question: 'A gravação dos copos térmicos e os adesivos saem na água?',
      answer:
        'Não saem! Nos copos térmicos de inox utilizamos gravação a laser permanente (não descasca nem desbota). E nossos adesivos vinílicos e banners são produzidos em material impermeável de alta durabilidade, resistentes à água e ao sol.'
    }
  ];

  /* --------------------------------------------------------------------------
     HELPER: Retrieve Product Artwork (OrigemVisuals or Bespoke SVG Fallback)
     -------------------------------------------------------------------------- */
  function getProductVisualMarkup(productId) {
    try {
      if (
        window.OrigemVisuals &&
        typeof window.OrigemVisuals.getProductArt === 'function'
      ) {
        const externalArt = window.OrigemVisuals.getProductArt(productId);
        if (externalArt && typeof externalArt === 'string' && externalArt.trim().length > 0) {
          return externalArt;
        }
      }
    } catch (err) {
      console.warn('[OrigemCatalog] Fallback SVG used for', productId, err);
    }
    return FALLBACK_PRODUCT_SVGS[productId] || FALLBACK_PRODUCT_SVGS['copos-termicos'];
  }

  /* --------------------------------------------------------------------------
     SECTION 1 RENDER & BIND: #catalogo-section
     -------------------------------------------------------------------------- */
  function renderCatalogoSection() {
    const container = document.getElementById('catalogo-section');
    if (!container) return;

    // Count items per filter
    const getCategoryCount = (catId) => {
      if (catId === 'Todos') return CATALOG_PRODUCTS.length;
      return CATALOG_PRODUCTS.filter((p) => p.category === catId).length;
    };

    const filterTabsHtml = FILTER_TABS.map((tab, idx) => {
      const count = getCategoryCount(tab.id);
      const activeClass = idx === 0 ? 'is-active' : '';
      return `
        <button
          type="button"
          class="filter-pill catalog-tab ${activeClass}"
          data-filter="${tab.id}"
          role="tab"
          aria-selected="${idx === 0 ? 'true' : 'false'}"
        >
          <i data-lucide="${tab.icon}"></i>
          <span>${tab.label}</span>
          <span class="filter-pill-count">${count}</span>
        </button>
      `;
    }).join('');

    const cardsHtml = CATALOG_PRODUCTS.map((item) => {
      const badgeClass = item.badgeStyle === 'sage' ? 'badge-sage' : '';
      const wideClass = item.bentoWide ? 'bento-wide' : '';
      const artHtml = getProductVisualMarkup(item.id);
      const waHref = buildWhatsAppUrl(item.waMessage);

      const specsHtml = item.specs
        .map(
          (spec) => `
          <span class="catalog-spec-chip">
            <i data-lucide="check"></i>
            <span>${spec}</span>
          </span>`
        )
        .join('');

      return `
        <article
          class="catalog-card bento-card ${wideClass}"
          data-category="${item.category}"
          data-product-id="${item.id}"
        >
          <span class="fx-crop-mark tl" aria-hidden="true"></span>
          <span class="fx-crop-mark br" aria-hidden="true"></span>

          <div class="catalog-card-visual">
            <div class="catalog-card-badges">
              <span class="catalog-category-tag">${item.category}</span>
              ${
                item.badge
                  ? `<span class="catalog-badge-highlight ${badgeClass}">${item.badge}</span>`
                  : ''
              }
            </div>
            <div class="catalog-art-canvas">
              ${artHtml}
            </div>
          </div>

          <div class="catalog-card-body">
            <h3 class="catalog-card-title">${item.title}</h3>
            <p class="catalog-card-desc">${item.description}</p>

            <div class="catalog-specs-list">
              ${specsHtml}
            </div>

            <div class="catalog-card-actions">
              <a
                href="${waHref}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-catalog-wa btn-magnetic"
                aria-label="Orçar ${item.title} no WhatsApp"
              >
                <i data-lucide="message-circle"></i>
                <span>Orçar este item no WhatsApp</span>
              </a>
              <button
                type="button"
                class="btn-catalog-sim"
                data-sim-preselect="${item.simulatorCategory}"
                title="Simular pedido deste item no configurador"
                aria-label="Simular ${item.title} no configurador"
              >
                <i data-lucide="sliders-horizontal"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    container.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i data-lucide="grid"></i>
            Vitrine Completa de Produtos • Origem Personalizados RS
          </span>
          <h2 class="section-title">
            Tudo para destacar sua marca ou criar um <span class="text-serif-accent">presente inesquecível</span>
          </h2>
          <p class="section-description">
            Explore nossas linhas de produtos personalizados. Clique em uma categoria para filtrar ou chame diretamente no WhatsApp para orçar o item escolhido.
          </p>
        </div>

        <div class="catalog-top-bar">
          <div class="catalog-filters" role="tablist" aria-label="Filtrar produtos por categoria">
            ${filterTabsHtml}
          </div>
        </div>

        <div class="catalog-bento-grid" id="catalog-bento-grid">
          ${cardsHtml}
        </div>

        <div class="catalog-bottom-banner">
          <div class="catalog-bottom-banner-text">
            <div class="catalog-bottom-icon">
              <i data-lucide="sparkles"></i>
            </div>
            <div>
              <h3>Procurando algum personalizado diferente ou pacote empresarial?</h3>
              <p>Fazemos tags, cadernos corporativos, sacolas, brindes para eventos e projetos sob medida em Capão da Canoa e região.</p>
            </div>
          </div>
          <a
            href="${buildWhatsAppUrl('Olá Origem Personalizados! Vim pelo site e gostaria de consultar um item personalizado sob medida.')}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-magnetic"
          >
            <i data-lucide="message-circle"></i>
            <span>Consultar Item Sob Medida</span>
          </a>
        </div>
      </div>
    `;

    // Bind Filter Tabs Interactivity
    const filterButtons = container.querySelectorAll('.filter-pill');
    const gridEl = container.querySelector('#catalog-bento-grid');
    const cards = container.querySelectorAll('.catalog-card');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedCategory = btn.getAttribute('data-filter') || 'Todos';

        filterButtons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        if (gridEl) {
          gridEl.classList.toggle('is-filtered', selectedCategory !== 'Todos');
        }

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          const matches = selectedCategory === 'Todos' || cardCat === selectedCategory;

          if (matches) {
            card.classList.remove('is-hidden');
            card.classList.remove('fx-filtering-in');
            // Trigger reflow for clean entrance animation
            void card.offsetWidth;
            card.classList.add('fx-filtering-in');
          } else {
            card.classList.add('is-hidden');
            card.classList.remove('fx-filtering-in');
          }
        });

        if (window.OrigemAnimations && typeof window.OrigemAnimations.refresh === 'function') {
          window.OrigemAnimations.refresh();
        }
      });
    });

    // Bind quick "Simular este item" buttons on cards
    const simPreselectBtns = container.querySelectorAll('[data-sim-preselect]');
    simPreselectBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const simCat = btn.getAttribute('data-sim-preselect');
        const simSection = document.getElementById('simulador-section');
        if (simCat && simSection) {
          const targetOption = simSection.querySelector(
            `.sim-option-card[data-step="1"][data-value="${simCat}"]`
          );
          if (targetOption) {
            targetOption.click();
          }
          simSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     SECTION 2 RENDER & BIND: #simulador-section (3-Step Visual Configurator)
     -------------------------------------------------------------------------- */
  function renderSimuladorSection() {
    const container = document.getElementById('simulador-section');
    if (!container) return;

    const state = {
      step1: 'Brindes/Copos/Canecas',
      step2: 'Para minha Empresa / Comércio',
      step3: 'Tenho só a ideia / preciso que criem a arte',
      clientName: '',
      quantity: ''
    };

    const renderOptionCards = (items, stepNum, selectedValue) =>
      items
        .map((item) => {
          const isSelected = item.id === selectedValue;
          return `
          <button
            type="button"
            class="sim-option-card ${isSelected ? 'is-selected' : ''}"
            data-step="${stepNum}"
            data-value="${item.id}"
            aria-pressed="${isSelected ? 'true' : 'false'}"
          >
            <div class="sim-option-top">
              <div class="sim-option-icon">
                <i data-lucide="${item.icon}"></i>
              </div>
              <div class="sim-option-check">
                <i data-lucide="check"></i>
              </div>
            </div>
            <span class="sim-option-label">${item.label}</span>
            <span class="sim-option-sub">${item.sub}</span>
          </button>
        `;
        })
        .join('');

    container.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i data-lucide="wand-sparkles"></i>
            Simulador Rápido de Orçamento • Super Fácil e Sem Compromisso
          </span>
          <h2 class="section-title">
            Monte seu pedido em <span class="text-serif-accent">3 cliques rápidos</span>
          </h2>
          <p class="section-description">
            Mesmo que você nunca tenha encomendado personalizados antes: escolha abaixo o que precisa e nós montamos a mensagem prontinha para o WhatsApp da Origem!
          </p>
        </div>

        <div class="simulator-layout">
          <!-- Left Column: 3 Interactive Steps -->
          <div class="simulator-steps-col">
            <!-- Passo 1 -->
            <div class="sim-step" data-step-box="1">
              <div class="sim-step-header">
                <span class="sim-step-badge">Passo 1 de 3</span>
                <h3 class="sim-step-title">O que você deseja personalizar?</h3>
                <span class="sim-step-hint">Toque para escolher</span>
              </div>
              <div class="sim-options-grid" role="group" aria-label="Passo 1: O que você deseja personalizar?">
                ${renderOptionCards(SIM_STEP_1_ITEMS, 1, state.step1)}
              </div>
            </div>

            <!-- Passo 2 -->
            <div class="sim-step" data-step-box="2">
              <div class="sim-step-header">
                <span class="sim-step-badge">Passo 2 de 3</span>
                <h3 class="sim-step-title">Para quem é o pedido?</h3>
                <span class="sim-step-hint">Objetivo do pedido</span>
              </div>
              <div class="sim-options-grid cols-3" role="group" aria-label="Passo 2: Para quem é o pedido?">
                ${renderOptionCards(SIM_STEP_2_AUDIENCE, 2, state.step2)}
              </div>
            </div>

            <!-- Passo 3 -->
            <div class="sim-step" data-step-box="3">
              <div class="sim-step-header">
                <span class="sim-step-badge">Passo 3 de 3</span>
                <h3 class="sim-step-title">Você já tem a arte ou logotipo?</h3>
                <span class="sim-step-hint">Criamos para você!</span>
              </div>
              <div class="sim-options-grid cols-3" role="group" aria-label="Passo 3: Você já tem a arte ou logotipo?">
                ${renderOptionCards(SIM_STEP_3_ART, 3, state.step3)}
              </div>

              <!-- Optional Name & Quantity Inputs -->
              <div class="sim-extra-fields">
                <div class="sim-field-group">
                  <label for="sim-input-name" class="sim-field-label">Seu nome ou nome da empresa (opcional)</label>
                  <input
                    type="text"
                    id="sim-input-name"
                    class="sim-input"
                    placeholder="Ex.: Maria / Padaria Central"
                    maxlength="60"
                  />
                </div>

                <div class="sim-field-group">
                  <label for="sim-input-qty" class="sim-field-label">Quantidade aproximada ou detalhe (opcional)</label>
                  <input
                    type="text"
                    id="sim-input-qty"
                    class="sim-input"
                    placeholder="Ex.: 20 unidades, cores, prazo..."
                    maxlength="80"
                  />
                </div>

                <div class="sim-qty-chips">
                  <span class="sim-qty-chip-label">Sugestões rápidas de quantidade:</span>
                  <button type="button" class="sim-qty-chip" data-qty="1 a 5 unidades (Presente)">1 a 5 un. (Presente)</button>
                  <button type="button" class="sim-qty-chip" data-qty="10 a 30 unidades">10 a 30 un.</button>
                  <button type="button" class="sim-qty-chip" data-qty="50 a 100+ unidades (Lote Empresarial)">50 a 100+ un.</button>
                  <button type="button" class="sim-qty-chip" data-qty="Ainda quero consultar quantidades">Ainda não sei</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Live WhatsApp Preview & Submit CTA -->
          <aside class="sim-preview-card" aria-label="Prévia da mensagem para o WhatsApp">
            <div class="sim-preview-header">
              <div class="sim-preview-avatar">
                <span>OP</span>
                <span class="sim-preview-online" aria-hidden="true"></span>
              </div>
              <div class="sim-preview-meta">
                <h3>Origem Personalizados RS</h3>
                <span><i data-lucide="check-circle-2"></i> Atendimento Direto • (51) 98057-7025</span>
              </div>
            </div>

            <div class="sim-whatsapp-window">
              <div class="sim-wa-label">
                <span>Prévia em tempo real da sua mensagem</span>
                <i data-lucide="smartphone"></i>
              </div>
              <div class="sim-wa-bubble" id="sim-message-preview"></div>
              <div class="sim-wa-time">
                <span>Pronto para enviar no WhatsApp</span>
                <i data-lucide="check-check"></i>
              </div>
            </div>

            <div class="sim-summary-pills" id="sim-summary-pills"></div>

            <a
              href="${ buildWhatsAppUrl('Olá Origem Personalizados!') }"
              id="sim-whatsapp-submit"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-sim-submit btn-magnetic"
            >
              <i data-lucide="send"></i>
              <span>Enviar Pedido para o WhatsApp da Origem</span>
            </a>

            <a
              href="${WA_DIRECT_LINK}"
              target="_blank"
              rel="noopener noreferrer"
              class="sim-direct-link"
            >
              <i data-lucide="external-link"></i>
              <span>Prefere falar direto? Abrir link oficial wa.me/message/L34PQGHRXEMLM1</span>
            </a>
          </aside>
        </div>
      </div>
    `;

    const previewEl = container.querySelector('#sim-message-preview');
    const summaryPillsEl = container.querySelector('#sim-summary-pills');
    const submitLink = container.querySelector('#sim-whatsapp-submit');
    const nameInput = container.querySelector('#sim-input-name');
    const qtyInput = container.querySelector('#sim-input-qty');
    const qtyChips = container.querySelectorAll('.sim-qty-chip');

    function updateSimulatorPreview() {
      const greeting = state.clientName.trim()
        ? `Olá equipe da Origem Personalizados RS! Meu nome é *${state.clientName.trim()}*.`
        : 'Olá equipe da Origem Personalizados RS! Vim pelo simulador do site.';

      const lines = [
        greeting,
        '',
        `• *O que desejo personalizar:* ${state.step1}`,
        `• *Finalidade do pedido:* ${state.step2}`,
        `• *Sobre a arte/logo:* ${state.step3}`
      ];

      if (state.quantity.trim()) {
        lines.push(`• *Quantidade / Detalhes:* ${state.quantity.trim()}`);
      }

      lines.push('', 'Podem me passar um orçamento e opções?');

      const fullMessage = lines.join('\n');

      if (previewEl) {
        previewEl.textContent = fullMessage;
      }

      if (submitLink) {
        submitLink.setAttribute('href', buildWhatsAppUrl(fullMessage));
      }

      if (summaryPillsEl) {
        summaryPillsEl.innerHTML = `
          <span class="sim-summary-pill">${state.step1}</span>
          <span class="sim-summary-pill">${state.step2}</span>
          <span class="sim-summary-pill">${state.step3}</span>
        `;
      }
    }

    // Bind option cards click
    const optionCards = container.querySelectorAll('.sim-option-card');
    optionCards.forEach((card) => {
      card.addEventListener('click', () => {
        const step = card.getAttribute('data-step');
        const value = card.getAttribute('data-value');
        if (!step || !value) return;

        state[`step${step}`] = value;

        const siblings = container.querySelectorAll(`.sim-option-card[data-step="${step}"]`);
        siblings.forEach((sib) => {
          const active = sib === card;
          sib.classList.toggle('is-selected', active);
          sib.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        updateSimulatorPreview();
      });
    });

    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        state.clientName = e.target.value || '';
        updateSimulatorPreview();
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('input', (e) => {
        state.quantity = e.target.value || '';
        qtyChips.forEach((c) => c.classList.remove('is-active'));
        updateSimulatorPreview();
      });
    }

    qtyChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-qty') || '';
        state.quantity = val;
        if (qtyInput) qtyInput.value = val;
        qtyChips.forEach((c) => c.classList.toggle('is-active', c === chip));
        updateSimulatorPreview();
      });
    });

    updateSimulatorPreview();
  }

  /* --------------------------------------------------------------------------
     SECTION 3 RENDER & BIND: #portfolio-section (Instagram Highlights & Posts)
     -------------------------------------------------------------------------- */
  function renderPortfolioSection() {
    const container = document.getElementById('portfolio-section');
    if (!container) return;

    // Merge with window.OrigemVisuals.instagramPosts if present, while keeping rich metadata
    const portfolioItems = DEFAULT_PORTFOLIO_ITEMS.map((item, idx) => {
      const extPost =
        window.OrigemVisuals &&
        Array.isArray(window.OrigemVisuals.instagramPosts) &&
        window.OrigemVisuals.instagramPosts[idx];
      return {
        ...item,
        image: (extPost && (extPost.localSrc || extPost.src || extPost.image)) || item.image
      };
    });

    const highlightsHtml = IG_HIGHLIGHTS.map((hl, idx) => {
      const activeClass = idx === 0 ? 'is-active' : '';
      return `
        <button
          type="button"
          class="story-highlight highlight-item ${activeClass}"
          data-highlight="${hl.id}"
          aria-pressed="${idx === 0 ? 'true' : 'false'}"
        >
          <span class="highlight-ring">
            <span class="highlight-inner">
              <i data-lucide="${hl.icon}"></i>
            </span>
          </span>
          <span class="highlight-title">${hl.label}</span>
        </button>
      `;
    }).join('');

    const cardsHtml = portfolioItems
      .map((post) => {
        const waHref = buildWhatsAppUrl(post.waMessage);
        const highlightsAttr = post.highlights.join(',');
        return `
        <article
          class="portfolio-card ig-card"
          data-highlights="${highlightsAttr}"
          data-post-id="${post.id}"
        >
          <span class="fx-crop-mark tl" aria-hidden="true"></span>
          <span class="fx-crop-mark br" aria-hidden="true"></span>

          <div class="portfolio-media-wrap">
            <img
              src="${post.image}"
              alt="${post.title} - Origem Personalizados RS"
              class="portfolio-img"
              loading="lazy"
              data-fallback-art="${post.fallbackArtId}"
            />
            <div class="portfolio-media-overlay">
              <div class="portfolio-top-badges">
                <span class="portfolio-tag-pill">${post.badge}</span>
                <span class="portfolio-reel-badge">
                  <i data-lucide="instagram"></i>
                  <span>${post.type}</span>
                </span>
              </div>
            </div>
          </div>

          <div class="portfolio-card-body">
            <h3 class="portfolio-card-title">${post.title}</h3>
            <p class="portfolio-card-caption">${post.caption}</p>

            <div class="portfolio-card-footer">
              <a
                href="${waHref}"
                target="_blank"
                rel="noopener noreferrer"
                class="portfolio-wa-link"
              >
                <i data-lucide="message-circle"></i>
                <span>Quero um igual no WhatsApp</span>
              </a>

              <a
                href="${IG_URL}"
                target="_blank"
                rel="noopener noreferrer"
                class="portfolio-ig-ext"
                aria-label="Ver no Instagram @origempersonalizadosrs"
              >
                <span>@origempersonalizadosrs</span>
                <i data-lucide="arrow-up-right"></i>
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    container.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i data-lucide="camera"></i>
            Portfólio Real &amp; Destaques do Instagram
          </span>
          <h2 class="section-title">
            Trabalhos reais que saem da nossa produção em <span class="text-serif-accent">Capão da Canoa • RS</span>
          </h2>
          <p class="section-description">
            Confira alguns dos projetos recentes publicados no nosso perfil oficial <strong>@origempersonalizadosrs</strong> e inspire-se para o seu pedido!
          </p>
        </div>

        <!-- Instagram Profile Header Card -->
        <div class="ig-profile-card ig-profile-header">
          <div class="ig-profile-left">
            <a href="${IG_URL}" target="_blank" rel="noopener noreferrer" class="ig-avatar-ring" aria-label="Instagram @origempersonalizadosrs">
              <div class="ig-avatar-inner">
                <img src="assets/logo-origem.svg" alt="Logo Origem Personalizados RS" />
              </div>
            </a>
            <div class="ig-profile-info">
              <div class="ig-handle-row">
                <span class="ig-handle-name">@origempersonalizadosrs</span>
                <span class="ig-verified-pill">
                  <i data-lucide="map-pin"></i>
                  Capão da Canoa • RS
                </span>
              </div>
              <p class="ig-bio-text">
                <strong>ORIGEM PERSONALIZADOS</strong> • Impressos feitos para deixar sua marca! Criação de Arte • Impressão Digital • Brindes, Copos Térmicos, Calendários 2027, Camisetas e Comunicação Visual.
              </p>
            </div>
          </div>

          <div class="ig-profile-actions">
            <a
              href="${IG_URL}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-ig-follow btn-magnetic"
            >
              <i data-lucide="instagram"></i>
              <span>Seguir @origempersonalizadosrs</span>
            </a>
          </div>
        </div>

        <!-- Story Highlights Row -->
        <div class="ig-highlights-wrapper">
          <div class="ig-highlights-label">
            <i data-lucide="sparkles"></i>
            <span>Destaques dos Stories — Toque em um destaque para filtrar:</span>
          </div>
          <div class="ig-highlights-row" role="toolbar" aria-label="Destaques do Instagram">
            ${highlightsHtml}
          </div>
        </div>

        <!-- Active Story Highlight Info Strip -->
        <div class="ig-active-story-banner" id="ig-active-story-banner">
          <div class="ig-story-banner-info">
            <i data-lucide="check-circle-2"></i>
            <span id="ig-story-banner-text">Destaque selecionado</span>
          </div>
          <div class="ig-story-banner-actions">
            <a
              href="${buildWhatsAppUrl('Olá! Vi os destaques no site da Origem Personalizados e quero fazer um orçamento.')}"
              id="ig-story-banner-wa"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
              style="padding: 0.45rem 0.95rem; font-size: 0.82rem;"
            >
              <i data-lucide="message-circle"></i>
              <span>Orçar este Destaque</span>
            </a>
            <button type="button" class="btn-story-reset" id="ig-story-reset-btn">
              Mostrar Todos
            </button>
          </div>
        </div>

        <!-- 6 Real Showcase Cards Grid -->
        <div class="portfolio-grid" id="portfolio-grid">
          ${cardsHtml}
        </div>
      </div>
    `;

    // Bulletproof Image Fallback Handler (Zero broken images guarantee)
    const images = container.querySelectorAll('.portfolio-img');
    images.forEach((img) => {
      const replaceWithSvgFallback = () => {
        const artId = img.getAttribute('data-fallback-art') || 'copos-termicos';
        const wrap = img.parentElement;
        if (!wrap || wrap.dataset.fallbackApplied === 'true') return;
        wrap.dataset.fallbackApplied = 'true';
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'portfolio-svg-fallback';
        fallbackDiv.innerHTML = getProductVisualMarkup(artId);
        img.replaceWith(fallbackDiv);
      };

      img.addEventListener('error', replaceWithSvgFallback);
      if (img.complete && img.naturalWidth === 0) {
        replaceWithSvgFallback();
      }
    });

    // Story Highlights Filter/Highlight Interactivity
    const highlightBtns = container.querySelectorAll('.story-highlight');
    const portfolioCards = container.querySelectorAll('.portfolio-card');
    const bannerEl = container.querySelector('#ig-active-story-banner');
    const bannerTextEl = container.querySelector('#ig-story-banner-text');
    const bannerWaEl = container.querySelector('#ig-story-banner-wa');
    const resetBtn = container.querySelector('#ig-story-reset-btn');

    function applyHighlightFilter(hlId) {
      const hlObj = IG_HIGHLIGHTS.find((h) => h.id === hlId) || IG_HIGHLIGHTS[0];

      highlightBtns.forEach((btn) => {
        const active = btn.getAttribute('data-highlight') === hlId;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      if (hlId === 'Todos') {
        if (bannerEl) bannerEl.classList.remove('is-visible');
        portfolioCards.forEach((card) => {
          card.classList.remove('is-dimmed', 'is-highlighted');
        });
      } else {
        if (bannerEl && bannerTextEl && bannerWaEl) {
          bannerTextEl.innerHTML = `<strong>Destaque ${hlObj.label}:</strong> ${hlObj.desc}`;
          bannerWaEl.setAttribute(
            'href',
            buildWhatsAppUrl(hlObj.waText || `Olá! Gostaria de orçar ${hlObj.label}.`)
          );
          bannerEl.classList.add('is-visible');
        }

        let firstMatched = null;
        portfolioCards.forEach((card) => {
          const tags = (card.getAttribute('data-highlights') || '').split(',');
          const isMatch = tags.includes(hlId);
          card.classList.toggle('is-highlighted', isMatch);
          card.classList.toggle('is-dimmed', !isMatch);
          if (isMatch && !firstMatched) {
            firstMatched = card;
          }
        });
      }
    }

    highlightBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const hlId = btn.getAttribute('data-highlight') || 'Todos';
        applyHighlightFilter(hlId);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => applyHighlightFilter('Todos'));
    }
  }

  /* --------------------------------------------------------------------------
     SECTION 4 RENDER & BIND: #como-funciona-section (4 Steps + FAQ Accordion)
     -------------------------------------------------------------------------- */
  function renderComoFuncionaSection() {
    const container = document.getElementById('como-funciona-section');
    if (!container) return;

    const stepsHtml = HOW_IT_WORKS_STEPS.map(
      (step) => `
      <article class="timeline-step step-card">
        <div class="timeline-step-top">
          <div class="timeline-step-icon">
            <i data-lucide="${step.icon}"></i>
          </div>
          <span class="timeline-step-number">${step.number}</span>
        </div>
        <h3 class="timeline-step-title">${step.title}</h3>
        <p class="timeline-step-desc">${step.desc}</p>
        <span class="timeline-step-pill">
          <i data-lucide="check-circle-2"></i>
          <span>${step.pill}</span>
        </span>
      </article>
    `
    ).join('');

    const faqHtml = FAQ_ITEMS.map((item, idx) => {
      const isOpen = idx === 0;
      return `
        <div class="faq-item accordion-item ${isOpen ? 'is-open' : ''}">
          <button
            type="button"
            class="faq-question-btn"
            aria-expanded="${isOpen ? 'true' : 'false'}"
          >
            <span>${item.question}</span>
            <span class="faq-icon-wrap" aria-hidden="true">
              <i data-lucide="chevron-down"></i>
            </span>
          </button>
          <div class="faq-answer-wrap" role="region">
            <div class="faq-answer-inner">
              ${item.answer}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i data-lucide="compass"></i>
            Passo a Passo Simples &amp; Sem Complicação
          </span>
          <h2 class="section-title">
            Como funciona encomendar na <span class="text-serif-accent">Origem Personalizados RS</span>
          </h2>
          <p class="section-description">
            Do primeiro "Oi" no WhatsApp até a entrega em mãos: cuidamos de cada detalhe para você ter uma experiência rápida, segura e transparente.
          </p>
        </div>

        <!-- 4 Steps Timeline -->
        <div class="steps-timeline-grid">
          ${stepsHtml}
        </div>

        <!-- FAQ Accordion Area -->
        <div class="faq-container">
          <div class="faq-intro-card faq-header">
            <span class="section-eyebrow">
              <i data-lucide="help-circle"></i>
              Dúvidas Frequentes
            </span>
            <h3 class="faq-intro-title">Ficou com alguma dúvida sobre prazos, arte ou quantidades?</h3>
            <p class="faq-intro-text">
              Respondemos ao lado as perguntas mais comuns de nossos clientes em Capão da Canoa e região. Se preferir, fale direto com a gente no WhatsApp!
            </p>
            <a
              href="${buildWhatsAppUrl('Olá Origem Personalizados! Vim pelo site e gostaria de tirar uma dúvida sobre personalizados.')}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary btn-magnetic"
            >
              <i data-lucide="message-circle"></i>
              <span>Tirar Dúvida no WhatsApp</span>
            </a>
          </div>

          <div class="faq-list" id="faq-accordion-list">
            ${faqHtml}
          </div>
        </div>
      </div>
    `;

    // Bind FAQ Accordion Interactivity
    const faqItems = container.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isCurrentlyOpen = item.classList.contains('is-open');

        faqItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isCurrentlyOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     SECTION 5 RENDER & BIND: #cta-final-section & #footer-section
     -------------------------------------------------------------------------- */
  function renderCtaAndFooter() {
    const ctaContainer = document.getElementById('cta-final-section');
    const footerContainer = document.getElementById('footer-section');

    if (ctaContainer) {
      ctaContainer.innerHTML = `
        <div class="container">
          <div class="cta-final-box cta-banner">
            <div class="cta-final-content">
              <span class="cta-final-badge">
                <i data-lucide="sparkles"></i>
                <span>Sua ideia, nossa criação • Capão da Canoa – RS</span>
              </span>
              <h2 class="cta-final-title">
                Pronto para transformar sua ideia em <span class="text-serif-accent">impressos e brindes que deixam sua marca?</span>
              </h2>
              <p class="cta-final-desc">
                Chame agora no WhatsApp da <strong>Origem Personalizados RS</strong>! Solicite seu orçamento sem compromisso, receba sugestões para o seu negócio ou presente e aprove sua arte digital antes de produzir.
              </p>

              <div class="cta-final-actions cta-actions">
                <a
                  href="${buildWhatsAppUrl('Olá Origem Personalizados RS! Vim pelo site e quero fazer um orçamento.')}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-cta-wa btn-magnetic"
                >
                  <i data-lucide="message-circle"></i>
                  <span>Falar no WhatsApp (51) 98057-7025</span>
                </a>

                <a
                  href="${WA_DIRECT_LINK}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-outline-light"
                >
                  <i data-lucide="external-link"></i>
                  <span>Link Direto do WhatsApp</span>
                </a>
              </div>
            </div>

            <div class="cta-final-card">
              <a
                href="${buildWhatsAppUrl('Olá Origem Personalizados RS! Gostaria de atendimento pelo WhatsApp.')}"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-contact-row"
              >
                <div class="cta-contact-icon">
                  <i data-lucide="phone-call"></i>
                </div>
                <div class="cta-contact-info">
                  <small>WhatsApp Comercial &amp; Orçamentos</small>
                  <strong>(51) 98057-7025</strong>
                </div>
              </a>

              <a
                href="${IG_URL}"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-contact-row"
              >
                <div class="cta-contact-icon">
                  <i data-lucide="instagram"></i>
                </div>
                <div class="cta-contact-info">
                  <small>Siga nosso Portfólio Diário</small>
                  <strong>@origempersonalizadosrs</strong>
                </div>
              </a>

              <a
                href="mailto:${EMAIL_ADDRESS}"
                class="cta-contact-row"
              >
                <div class="cta-contact-icon">
                  <i data-lucide="mail"></i>
                </div>
                <div class="cta-contact-info">
                  <small>Envio de Arquivos &amp; E-mail</small>
                  <strong>${EMAIL_ADDRESS}</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    if (footerContainer) {
      const currentYear = new Date().getFullYear();
      footerContainer.innerHTML = `
        <div class="container">
          <div class="footer-grid">
            <!-- Brand Column -->
            <div class="footer-brand-col">
              <a href="#hero-section" class="footer-brand-lockup">
                <img src="assets/logo-origem.svg" alt="Logo Origem Personalizados RS" />
                <div>
                  <span class="footer-brand-name">ORIGEM PERSONALIZADOS</span>
                  <span class="footer-brand-sub">Impressos feitos para deixar sua marca.</span>
                </div>
              </a>
              <p class="footer-slogan-text">
                Personalizamos ideias, criamos conexões! Gráfica rápida, criação de arte, brindes corporativos, copos térmicos, calendários 2027, uniformes e comunicação visual.
              </p>
              <span class="footer-location-badge">
                <i data-lucide="map-pin"></i>
                <span>Capão da Canoa – RS • Atendemos Litoral Norte e todo o RS</span>
              </span>
            </div>

            <!-- Navigation Column -->
            <div>
              <h4 class="footer-col-title">Navegação</h4>
              <ul class="footer-links-list">
                <li><a href="#hero-section"><i data-lucide="chevron-right"></i> Início</a></li>
                <li><a href="#diferenciais-section"><i data-lucide="chevron-right"></i> Nossos Diferenciais</a></li>
                <li><a href="#catalogo-section"><i data-lucide="chevron-right"></i> Catálogo de Produtos</a></li>
                <li><a href="#simulador-section"><i data-lucide="chevron-right"></i> Simulador de Orçamento</a></li>
                <li><a href="#portfolio-section"><i data-lucide="chevron-right"></i> Trabalhos no Instagram</a></li>
                <li><a href="#como-funciona-section"><i data-lucide="chevron-right"></i> Como Funciona &amp; FAQ</a></li>
              </ul>
            </div>

            <!-- Products Column -->
            <div>
              <h4 class="footer-col-title">Mais Pedidos</h4>
              <ul class="footer-links-list">
                <li><a href="#catalogo-section"><i data-lucide="chevron-right"></i> Copos Térmicos &amp; Canecas</a></li>
                <li><a href="#catalogo-section"><i data-lucide="chevron-right"></i> Calendários 2027</a></li>
                <li><a href="#catalogo-section"><i data-lucide="chevron-right"></i> Camisetas, Moletons &amp; Bonés</a></li>
                <li><a href="#catalogo-section"><i data-lucide="chevron-right"></i> Cartões, Panfletos &amp; Pastas</a></li>
                <li><a href="#catalogo-section"><i data-lucide="chevron-right"></i> Adesivos &amp; WindBanners</a></li>
                <li><a href="#catalogo-section"><i data-lucide="chevron-right"></i> Capachos &amp; Quadros</a></li>
              </ul>
            </div>

            <!-- Contact Column -->
            <div>
              <h4 class="footer-col-title">Contato Direto</h4>
              <ul class="footer-contact-list">
                <li class="footer-contact-item">
                  <i data-lucide="message-circle"></i>
                  <div>
                    <strong>WhatsApp:</strong><br />
                    <a href="${buildWhatsAppUrl('Olá Origem Personalizados RS! Vim pelo site.')}" target="_blank" rel="noopener noreferrer">(51) 98057-7025</a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <i data-lucide="mail"></i>
                  <div>
                    <strong>E-mail:</strong><br />
                    <a href="mailto:${EMAIL_ADDRESS}">${EMAIL_ADDRESS}</a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <i data-lucide="instagram"></i>
                  <div>
                    <strong>Instagram:</strong><br />
                    <a href="${IG_URL}" target="_blank" rel="noopener noreferrer">@origempersonalizadosrs</a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <i data-lucide="map-pin"></i>
                  <div>
                    <strong>Localização:</strong><br />
                    <span>Capão da Canoa – RS</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom-bar">
            <span>&copy; ${currentYear} Origem Personalizados RS (@origempersonalizadosrs). Todos os direitos reservados.</span>
            <span>Sua ideia, nossa criação! • Capão da Canoa / RS</span>
          </div>
        </div>
      `;
    }
  }

  /* --------------------------------------------------------------------------
     PUBLIC MODULE INITIALIZER: window.OrigemCatalog.init()
     -------------------------------------------------------------------------- */
  let isInitialized = false;

  function init() {
    if (isInitialized) return;
    isInitialized = true;

    renderCatalogoSection();
    renderSimuladorSection();
    renderPortfolioSection();
    renderComoFuncionaSection();
    renderCtaAndFooter();

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
    if (window.OrigemAnimations && typeof window.OrigemAnimations.refresh === 'function') {
      window.OrigemAnimations.refresh();
    }
  }

  window.OrigemCatalog = {
    init,
    products: CATALOG_PRODUCTS,
    filterTabs: FILTER_TABS
  };
})();
