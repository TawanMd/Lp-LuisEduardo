/**
 * ============================================================================
 * ORIGEM PERSONALIZADOS RS — Dynamic Sections & Interactive Catalog Module
 * Owned by: sections-catalog (js/sections-catalog.js)
 * Exposes: window.OrigemCatalog = { init, render, products, filterTabs }
 * Renders & binds:
 *   1. #catalogo-section (Bento Grid from content.categories & content.products)
 *   2. #simulador-section (Interactive 3-Step Quote Configurator + Live WA Preview)
 *   3. #portfolio-section (Official Real Instagram Embeds & Direct Profile Links)
 *   4. #como-funciona-section (4-Step Process Timeline & Interactive FAQ Accordion)
 *   5. #cta-final-section & #footer-section (Final CTA & Footer + Área do Proprietário)
 * ============================================================================
 */
(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     DEFAULT CONTENT FALLBACKS (Conforms strictly to Round 2 Schema)
     -------------------------------------------------------------------------- */
  const DEFAULT_BUSINESS = {
    name: 'Origem Personalizados RS',
    slogan: 'Sua ideia, nossa criação!',
    tagline: 'Impressos feitos para deixar sua marca.',
    whatsapp: '5551980577025',
    whatsappDisplay: '(51) 98057-7025',
    whatsappLink: 'https://wa.me/message/L34PQGHRXEMLM1',
    email: 'origempersonalizadosrs@gmail.com',
    instagram: 'origempersonalizadosrs',
    city: 'Capão da Canoa - RS',
    cep: '95555-000'
  };

  const DEFAULT_CATEGORIES = [
    { id: 'todos', label: 'Todos', icon: 'layout-grid' },
    { id: 'brindes', label: 'Brindes & Térmicos', icon: 'cup-soda' },
    { id: 'grafica', label: 'Gráfica & Calendários', icon: 'calendar-days' },
    { id: 'comunicacao', label: 'Comunicação Visual', icon: 'flag' },
    { id: 'vestuario', label: 'Vestuário & Eventos', icon: 'shirt' },
    { id: 'decoracao', label: 'Decoração & Capachos', icon: 'frame' }
  ];

  const DEFAULT_PRODUCTS = [
    {
      id: 'copos-termicos',
      name: 'Copos Térmicos & Canecas Personalizadas',
      category: 'brindes',
      simulatorCategory: 'Brindes/Copos/Canecas',
      badge: 'Mais Pedido',
      badgeStyle: 'amber',
      priceFrom: '',
      image: '',
      artId: 'copos-termicos',
      bentoWide: true,
      visible: true,
      order: 1,
      description:
        'Copos térmicos em inox com tampa e gravação a laser permanente para empresas, CTGs, festas e presentes, além de canecas de cerâmica, polímero e chopp personalizadas com alta definição.',
      specs: ['Inox Gravado a Laser', 'Canecas Cerâmica & Polímero', 'Empresas, CTGs & Festas']
    },
    {
      id: 'calendarios-2027',
      name: 'Calendários 2027 (Mesa Wire-o & Parede)',
      category: 'grafica',
      simulatorCategory: 'Materiais Gráficos/Calendários',
      badge: 'Temporada 2027',
      badgeStyle: 'amber',
      priceFrom: '',
      image: '',
      artId: 'calendarios-2027',
      bentoWide: true,
      visible: true,
      order: 2,
      description:
        'Seu cliente lembrará de você todos os dias do ano! Ideal para brindes corporativos de fim de ano. Modelos de mesa com acabamento Wire-O e de parede personalizados com sua marca e contatos.',
      specs: ['Mesa com Wire-O', 'Folhinhas de Parede', 'Brinde de Fim de Ano']
    },
    {
      id: 'camisetas-uniformes',
      name: 'Camisetas, Moletons & Bonés',
      category: 'vestuario',
      simulatorCategory: 'Camisetas/Uniformes',
      badge: 'Equipes & Família',
      badgeStyle: 'sage',
      priceFrom: '',
      image: '',
      artId: 'camisetas-uniformes',
      bentoWide: false,
      visible: true,
      order: 3,
      description:
        'Uniformes profissionais que passam credibilidade para sua equipe, camisetas promocionais para eventos, linha especial "Natal da Família", moletons e bonés em dry-fit ou algodão.',
      specs: ['Uniformes Profissionais', 'Natal da Família & Eventos', 'Dry-Fit, Algodão & Moletom']
    },
    {
      id: 'cartoes-papelaria',
      name: 'Cartões de Visita, Panfletos, Pastas & Recibos',
      category: 'grafica',
      simulatorCategory: 'Materiais Gráficos/Calendários',
      badge: 'Papelaria Completa',
      badgeStyle: 'sage',
      priceFrom: '',
      image: '',
      artId: 'cartoes-papelaria',
      bentoWide: false,
      visible: true,
      order: 4,
      description:
        'Papelaria corporativa completa para fortalecer sua identidade: cartões de visita premium, panfletos, pastas com bolsa, tags para confecções, blocos de pedidos, recibos e cadernos.',
      specs: ['Cartões & Panfletos', 'Tags para Confecções', 'Pastas, Blocos & Cadernos']
    },
    {
      id: 'adesivos-rotulos',
      name: 'Adesivos Vinílicos & Rótulos Recortados',
      category: 'comunicacao',
      simulatorCategory: 'Adesivos/Banners/Fachada',
      badge: "À Prova D'Água",
      badgeStyle: 'sage',
      priceFrom: '',
      image: '',
      artId: 'adesivos-rotulos',
      bentoWide: false,
      visible: true,
      order: 5,
      description:
        'Adesivos em vinil impermeável à prova d’água com recorte eletrônico de alta precisão para embalagens, doces, gastronomia, veículos, copos e vitrines comerciais.',
      specs: ['Recorte Eletrônico', 'Vinil Impermeável', 'Rótulos, Carros & Vitrines']
    },
    {
      id: 'banners-windbanner',
      name: 'WindBanners, Banners, Lonas & Placas de Fachada',
      category: 'comunicacao',
      simulatorCategory: 'Adesivos/Banners/Fachada',
      badge: 'Destaque Litoral',
      badgeStyle: 'amber',
      priceFrom: '',
      image: '',
      artId: 'banners-windbanner',
      bentoWide: false,
      visible: true,
      order: 6,
      description:
        'Destaque sua loja em Capão da Canoa e em todo o Litoral Norte! WindBanners completos, banners promocionais, lonas e placas de fachada com alta resistência ao sol e vento.',
      specs: ['WindBanner Completo', 'Banners & Lonas', 'Placas de Fachada']
    },
    {
      id: 'tapetes-capachos',
      name: 'Tapetes Capachos Personalizados',
      category: 'decoracao',
      simulatorCategory: 'Capachos/Decoração',
      badge: 'Vulcanizado Premium',
      badgeStyle: 'sage',
      priceFrom: '',
      image: '',
      artId: 'tapetes-capachos',
      bentoWide: false,
      visible: true,
      order: 7,
      description:
        'Receba seus clientes com impacto desde a porta de entrada! Capachos vinílicos vulcanizados antiderrapantes com a logo da sua empresa ou frases para condomínios e residências.',
      specs: ['Fibra Vinílica Vulcanizada', 'Antiderrapante & Lavável', 'Comércios & Condomínios']
    },
    {
      id: 'quadros-azulejos',
      name: 'Quadrinhos Decorativos & Azulejos com Foto',
      category: 'decoracao',
      simulatorCategory: 'Capachos/Decoração',
      badge: 'Presente Inesquecível',
      badgeStyle: 'sage',
      priceFrom: '',
      image: '',
      artId: 'quadros-azulejos',
      bentoWide: false,
      visible: true,
      order: 8,
      description:
        'Decore com estilo e personalidade! Transforme seus espaços ou dê um presente emocionante com quadrinhos decorativos e azulejos personalizados com foto, frase ou homenagem.',
      specs: ['Quadros Decorativos', 'Azulejos com Suporte', 'Presentes & Memórias']
    },
    {
      id: 'canecas-chaveiros',
      name: 'Mouse Pads, Chaveirinhos & Toalhas Personalizadas',
      category: 'brindes',
      simulatorCategory: 'Brindes/Copos/Canecas',
      badge: 'Kits & Campanhas',
      badgeStyle: 'amber',
      priceFrom: '',
      image: '',
      artId: 'canecas-chaveiros',
      bentoWide: false,
      visible: true,
      order: 9,
      description:
        'Brindes corporativos criativos e úteis para ações promocionais, Outubro Rosa, Novembro Azul, feiras, kits de boas-vindas e lembranças personalizadas que encantam.',
      specs: ['Mouse Pads & Chaveiros', 'Toalhas Personalizadas', 'Campanhas & Eventos']
    }
  ];

  const DEFAULT_INSTAGRAM_POSTS = [
    { id: 'post-1', url: 'https://www.instagram.com/p/DfmaEPEtQD8/', caption: 'Copos térmicos inox com gravação a laser permanente', visible: true },
    { id: 'post-2', url: 'https://www.instagram.com/p/DfmaCIzPuLf/', caption: 'Copos e canecas personalizados para eventos e empresas', visible: true },
    { id: 'post-3', url: 'https://www.instagram.com/p/Dfk-COvp8Qw/', caption: 'Linha de Calendários 2027 com acabamento Wire-O e parede', visible: true },
    { id: 'post-4', url: 'https://www.instagram.com/p/DfVTSI-pG4g/', caption: 'Camisetas personalizadas para equipes e uniformes', visible: true },
    { id: 'post-5', url: 'https://www.instagram.com/p/DfVTQElpFY3/', caption: 'Adesivos vinílicos impermeáveis e rótulos recortados', visible: true },
    { id: 'post-6', url: 'https://www.instagram.com/p/DfX_YGqpABQ/', caption: 'Tapetes capachos vulcanizados e comunicação visual', visible: true },
    { id: 'post-7', url: 'https://www.instagram.com/p/DfX_U3hJbwb/', caption: 'Kits de brindes corporativos e presentes especiais', visible: true },
    { id: 'post-8', url: 'https://www.instagram.com/p/DfSUQY9JjpX/', caption: 'Personalizados para datas comemorativas e empresas', visible: true },
    { id: 'post-9', url: 'https://www.instagram.com/p/Dc6gLzWpWYS/', caption: 'Produção da Origem Personalizados em Capão da Canoa', visible: true },
    { id: 'post-10', url: 'https://www.instagram.com/p/Dd3-UBURttx/', caption: 'Impressos de alta qualidade para deixar sua marca', visible: true }
  ];

  const DEFAULT_CONTENT = {
    business: DEFAULT_BUSINESS,
    categories: DEFAULT_CATEGORIES,
    products: DEFAULT_PRODUCTS,
    instagramPosts: DEFAULT_INSTAGRAM_POSTS
  };

  /* --------------------------------------------------------------------------
     FALLBACK BESPOKE SVG ARTWORK LIBRARY
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
        <path d="M74 26H146L138 174C137.5 178 134 180 130 180H90C86 180 82.5 178 82 174L74 26Z" fill="url(#cupBody)" stroke="#8FAF85" stroke-width="1.5"/>
        <rect x="71" y="20" width="78" height="14" rx="4" fill="url(#steelRim)"/>
        <rect x="78" y="13" width="64" height="8" rx="3" fill="#1E3524" stroke="#A2C59D" stroke-width="1"/>
        <circle cx="110" cy="96" r="24" fill="none" stroke="#D4A359" stroke-width="1.6" stroke-dasharray="3 2"/>
        <circle cx="110" cy="96" r="19" fill="rgba(212,163,89,0.12)" stroke="#E2B875" stroke-width="1"/>
        <text x="110" y="95" text-anchor="middle" fill="#F0CFA0" font-family="Georgia, serif" font-size="7.5" font-weight="700" letter-spacing="1">ORIGEM</text>
        <text x="110" y="104" text-anchor="middle" fill="#D4A359" font-family="sans-serif" font-size="4.8" font-weight="700">LASER INOX</text>
        <path d="M225 96H242C249 96 254 102 254 110V136C254 144 249 150 242 150H225" stroke="#F7F9F5" stroke-width="6" stroke-linecap="round"/>
        <rect x="164" y="82" width="66" height="88" rx="10" fill="url(#mugGrad)" stroke="#F7F9F5" stroke-width="1.5"/>
        <circle cx="197" cy="126" r="18" fill="#F7F9F5"/>
        <text x="197" y="129" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="7.5" font-weight="700">SUA LOGO</text>
      </svg>`,

    'calendarios-2027': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calendários 2027 Personalizados">
        <ellipse cx="140" cy="182" rx="95" ry="10" fill="rgba(0,0,0,0.32)"/>
        <path d="M52 168L70 42H210L228 168H52Z" fill="#1E3524" stroke="#8FAF85" stroke-width="1.5"/>
        <rect x="64" y="44" width="152" height="114" rx="8" fill="#F7F9F5"/>
        <path d="M64 52C64 47.5817 67.5817 44 72 44H208C212.418 44 216 47.5817 216 52V78H64V52Z" fill="#8FAF85"/>
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
        <path d="M98 34L60 56L74 88L98 76V170H182V76L206 88L220 56L182 34C172 48 158 54 140 54C122 54 108 48 98 34Z" fill="#8FAF85" stroke="#F7F9F5" stroke-width="2" stroke-linejoin="round"/>
        <path d="M114 38C122 48 158 48 166 38" stroke="#142418" stroke-width="3" stroke-linecap="round"/>
        <circle cx="140" cy="102" r="26" fill="#142418" stroke="#D4A359" stroke-width="1.5"/>
        <text x="140" y="100" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="8.5" font-weight="700" letter-spacing="1">ORIGEM</text>
        <text x="140" y="111" text-anchor="middle" fill="#A2C59D" font-family="sans-serif" font-size="5.5" font-weight="700">UNIFORMES &amp; EVENTOS</text>
        <rect x="112" y="138" width="56" height="14" rx="7" fill="#F7F9F5"/>
        <text x="140" y="147.5" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6.5" font-weight="800">ALGODÃO &amp; DRY-FIT</text>
      </svg>`,

    'cartoes-papelaria': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartões de Visita, Panfletos e Papelaria">
        <ellipse cx="140" cy="182" rx="95" ry="9" fill="rgba(0,0,0,0.32)"/>
        <rect x="52" y="34" width="110" height="132" rx="8" transform="rotate(-6 52 34)" fill="#EDF2EA" stroke="#8FAF85" stroke-width="1.5"/>
        <rect x="64" y="48" width="84" height="14" rx="4" transform="rotate(-6 64 48)" fill="#8FAF85"/>
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
        <rect x="58" y="28" width="164" height="140" rx="14" fill="#F7F9F5" stroke="#8FAF85" stroke-width="1.5" stroke-dasharray="5 4"/>
        <circle cx="115" cy="96" r="40" fill="#8FAF85" stroke="#142418" stroke-width="2"/>
        <circle cx="115" cy="96" r="33" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-dasharray="3 2"/>
        <text x="115" y="94" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="11" font-weight="700">ORIGEM</text>
        <text x="115" y="106" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6" font-weight="800">VINIL À PROVA D'ÁGUA</text>
        <rect x="164" y="56" width="44" height="44" rx="10" fill="#142418" stroke="#D4A359" stroke-width="1.5"/>
        <text x="186" y="81" text-anchor="middle" fill="#D4A359" font-family="sans-serif" font-size="7" font-weight="800">RÓTULOS</text>
        <rect x="164" y="110" width="44" height="38" rx="8" fill="#D4A359"/>
        <text x="186" y="132" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="7" font-weight="800">RECORTE</text>
      </svg>`,

    'banners-windbanner': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WindBanners, Banners, Lonas e Placas de Fachada">
        <ellipse cx="140" cy="182" rx="95" ry="9" fill="rgba(0,0,0,0.32)"/>
        <path d="M78 172V28C78 22 126 18 128 54C130 90 124 126 78 144" fill="#8FAF85" stroke="#F7F9F5" stroke-width="2"/>
        <line x1="78" y1="24" x2="78" y2="174" stroke="#D4A359" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="62" y="170" width="32" height="7" rx="3.5" fill="#D4A359"/>
        <text x="103" y="86" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="7.5" font-weight="800" transform="rotate(-90 103 86)">WINDBANNER</text>
        <rect x="142" y="48" width="88" height="114" rx="8" fill="#142418" stroke="#A2C59D" stroke-width="1.8"/>
        <rect x="152" y="60" width="68" height="32" rx="5" fill="#8FAF85"/>
        <text x="186" y="79" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="9" font-weight="700">FACHADA</text>
        <text x="186" y="114" text-anchor="middle" fill="#F7F9F5" font-family="sans-serif" font-size="7.5" font-weight="700">LONAS &amp; PLACAS</text>
        <text x="186" y="128" text-anchor="middle" fill="#D4A359" font-family="sans-serif" font-size="6.5" font-weight="700">ALTA RESISTÊNCIA</text>
      </svg>`,

    'tapetes-capachos': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tapetes Capachos Personalizados">
        <ellipse cx="140" cy="178" rx="105" ry="12" fill="rgba(0,0,0,0.35)"/>
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
        <rect x="56" y="32" width="96" height="124" rx="6" fill="#D4A359" stroke="#F7F9F5" stroke-width="1.5"/>
        <rect x="65" y="41" width="78" height="106" rx="3" fill="#F7F9F5"/>
        <circle cx="104" cy="82" r="22" fill="#8FAF85"/>
        <path d="M74 134L94 108L112 124L124 112L136 134H74Z" fill="#1E3524"/>
        <rect x="138" y="64" width="88" height="88" rx="8" fill="#FFFFFF" stroke="#8FAF85" stroke-width="2.5"/>
        <rect x="148" y="74" width="68" height="54" rx="4" fill="#EDF2EA"/>
        <text x="182" y="102" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="8.5" font-weight="700">SUA FOTO</text>
        <text x="182" y="114" text-anchor="middle" fill="#8FAF85" font-family="sans-serif" font-size="6" font-weight="800">AZULEJO &amp; QUADRO</text>
        <path d="M156 152L148 166M208 152L216 166" stroke="#D4A359" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`,

    'canecas-chaveiros': `
      <svg viewBox="0 0 280 200" width="240" height="172" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mouse Pads, Chaveirinhos e Toalhas Personalizadas">
        <ellipse cx="140" cy="182" rx="95" ry="9" fill="rgba(0,0,0,0.32)"/>
        <rect x="52" y="54" width="110" height="96" rx="14" fill="#142418" stroke="#8FAF85" stroke-width="2"/>
        <circle cx="107" cy="102" r="24" fill="#8FAF85"/>
        <text x="107" y="105" text-anchor="middle" fill="#142418" font-family="Georgia, serif" font-size="7.5" font-weight="700">MOUSE PAD</text>
        <rect x="150" y="42" width="78" height="56" rx="8" fill="#F7F9F5" stroke="#A2C59D" stroke-width="1.5"/>
        <rect x="150" y="72" width="78" height="14" fill="#8FAF85"/>
        <text x="189" y="82" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6.5" font-weight="800">TOALHA BORDADA/SUBL.</text>
        <circle cx="188" cy="122" r="10" stroke="#D4A359" stroke-width="3"/>
        <rect x="168" y="132" width="40" height="36" rx="8" fill="#D4A359"/>
        <text x="188" y="153" text-anchor="middle" fill="#142418" font-family="sans-serif" font-size="6.5" font-weight="800">CHAVEIRO</text>
      </svg>`
  };

  /* --------------------------------------------------------------------------
     SIMULATOR PRESETS & HOW IT WORKS / FAQ DATA
     -------------------------------------------------------------------------- */
  const SIM_STEP_1_ITEMS = [
    {
      id: 'Brindes/Copos/Canecas',
      label: 'Brindes, Copos & Canecas',
      sub: 'Copos térmicos inox, canecas, mouse pads, chaveiros e toalhas',
      icon: 'cup-soda',
      matchKeys: ['brindes', 'copo', 'caneca', 'termic', 'mousepad', 'chaveiro', 'toalha']
    },
    {
      id: 'Materiais Gráficos/Calendários',
      label: 'Gráfica & Calendários 2027',
      sub: 'Calendários mesa/parede, cartões, panfletos, pastas e blocos',
      icon: 'calendar-days',
      matchKeys: ['grafica', 'calendario', 'cartao', 'panfleto', 'pasta', 'recibo']
    },
    {
      id: 'Camisetas/Uniformes',
      label: 'Camisetas & Uniformes',
      sub: 'Camisetas para empresas, eventos, Natal da família e moletons',
      icon: 'shirt',
      matchKeys: ['vestuario', 'camiseta', 'uniforme', 'moleton', 'bone']
    },
    {
      id: 'Adesivos/Banners/Fachada',
      label: 'Adesivos, Banners & Fachada',
      sub: 'Adesivos vinílicos, rótulos, WindBanners, lonas e placas',
      icon: 'flag',
      matchKeys: ['comunicacao', 'adesivo', 'rotulo', 'banner', 'windbanner', 'lona', 'placa', 'fachada']
    },
    {
      id: 'Capachos/Decoração',
      label: 'Capachos & Decoração',
      sub: 'Tapetes capachos com logo, quadrinhos e azulejos com foto',
      icon: 'layers',
      matchKeys: ['decoracao', 'capacho', 'tapete', 'quadro', 'azulejo']
    },
    {
      id: 'Outro/Vários itens',
      label: 'Outro / Vários Itens (Kit)',
      sub: 'Quero montar um pacote com diferentes produtos personalizados',
      icon: 'package-plus',
      matchKeys: ['outro', 'kit']
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

  const HOW_IT_WORKS_STEPS = [
    {
      number: '01',
      icon: 'message-circle',
      title: 'Chame no WhatsApp com sua ideia',
      desc: 'Conte o que você deseja personalizar e a quantidade aproximada. Mesmo que você ainda não tenha logotipo ou arquivo aberto, nós ajudamos em tudo!',
      pill: 'Atendimento direto e rápido'
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
      desc: 'Com a arte aprovada, seu pedido entra em produção utilizando gravação a laser permanente, impressão digital HD ou sublimação.',
      pill: 'Acabamento durável'
    },
    {
      number: '04',
      icon: 'truck',
      title: 'Retirada em Capão da Canoa ou Entrega',
      desc: 'Você pode retirar em Capão da Canoa - RS ou receber com rapidez em todo o Litoral Norte e Rio Grande do Sul.',
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
        'Nosso prazo varia conforme o produto e a quantidade escolhida — informamos o prazo exato no seu orçamento pelo WhatsApp. Aceitamos PIX, cartões e condições facilitadas para pedidos empresariais.'
    },
    {
      question: 'A gravação dos copos térmicos e os adesivos saem na água?',
      answer:
        'Não saem! Nos copos térmicos de inox utilizamos gravação a laser permanente (não descasca nem desbota). E nossos adesivos vinílicos e banners são produzidos em material impermeável de alta durabilidade, resistentes à água e ao sol.'
    }
  ];

  /* --------------------------------------------------------------------------
     HELPERS
     -------------------------------------------------------------------------- */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeStr(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function buildWhatsAppUrl(message, business) {
    const rawNumber = business && business.whatsapp ? String(business.whatsapp) : DEFAULT_BUSINESS.whatsapp;
    const phoneDigits = rawNumber.replace(/\D/g, '') || '5551980577025';
    return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message || '')}`;
  }

  function getWhatsAppDirectLink(business) {
    return (business && business.whatsappLink) || DEFAULT_BUSINESS.whatsappLink;
  }

  function getInstagramUrl(business) {
    const handle = (business && business.instagram ? String(business.instagram).replace(/^@/, '') : '') || DEFAULT_BUSINESS.instagram;
    return `https://www.instagram.com/${handle}/`;
  }

  function formatPrice(val) {
    if (!val || typeof val !== 'string' || val.trim() === '') return '';
    const trimmed = val.trim();
    if (/^r\$/i.test(trimmed)) return trimmed;
    return `R$ ${trimmed}`;
  }

  function getInstagramShortcode(urlOrCode) {
    if (!urlOrCode) return '';
    const str = String(urlOrCode).trim();
    if (/^[A-Za-z0-9_-]{9,15}$/.test(str)) {
      return str;
    }
    const match = str.match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i);
    if (match && match[1]) {
      return match[1];
    }
    return '';
  }

  function getProductVisualMarkup(artId, fallbackId) {
    try {
      if (window.OrigemVisuals && typeof window.OrigemVisuals.getProductArt === 'function') {
        const externalArt = window.OrigemVisuals.getProductArt(artId || fallbackId);
        if (externalArt && typeof externalArt === 'string' && externalArt.trim().length > 0) {
          return externalArt;
        }
      }
    } catch (err) {
      console.warn('[OrigemCatalog] Fallback SVG used for', artId, err);
    }
    return (
      FALLBACK_PRODUCT_SVGS[artId] ||
      FALLBACK_PRODUCT_SVGS[fallbackId] ||
      FALLBACK_PRODUCT_SVGS['copos-termicos']
    );
  }

  function matchesCategory(productCategory, filterId, filterLabel) {
    if (!filterId || filterId === 'todos' || filterId === 'Todos') return true;
    const pCat = normalizeStr(productCategory);
    const fId = normalizeStr(filterId);
    const fLbl = normalizeStr(filterLabel);
    return (
      pCat === fId ||
      pCat === fLbl ||
      pCat.includes(fId) ||
      fId.includes(pCat) ||
      (fLbl && pCat.includes(fLbl))
    );
  }

  function getSimCategoryForProduct(product) {
    if (product.simulatorCategory) return product.simulatorCategory;
    const searchTarget = normalizeStr(
      (product.category || '') + ' ' + (product.id || '') + ' ' + (product.name || '')
    );
    for (const opt of SIM_STEP_1_ITEMS) {
      if (opt.matchKeys && opt.matchKeys.some((k) => searchTarget.includes(k))) {
        return opt.id;
      }
    }
    return SIM_STEP_1_ITEMS[0].id;
  }

  /* --------------------------------------------------------------------------
     STATE & ACTIVE CONTENT HOLDER
     -------------------------------------------------------------------------- */
  let currentContent = null;

  /* --------------------------------------------------------------------------
     SECTION 1: #catalogo-section
     -------------------------------------------------------------------------- */
  function renderCatalogoSection(content) {
    const container = document.getElementById('catalogo-section');
    if (!container) return;

    const business = content.business || DEFAULT_BUSINESS;

    // Filter only visible products and sort by order
    const rawProducts = Array.isArray(content.products) && content.products.length > 0
      ? content.products
      : DEFAULT_PRODUCTS;

    const visibleProducts = rawProducts
      .filter((p) => p.visible !== false)
      .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));

    // Resolve categories
    const rawCategories = Array.isArray(content.categories) && content.categories.length > 0
      ? content.categories
      : DEFAULT_CATEGORIES;

    const hasTodos = rawCategories.some((c) => normalizeStr(c.id) === 'todos');
    const categories = hasTodos
      ? rawCategories
      : [{ id: 'todos', label: 'Todos', icon: 'layout-grid' }, ...rawCategories];

    const categoryIconMap = {
      todos: 'layout-grid',
      brindes: 'cup-soda',
      grafica: 'calendar-days',
      comunicacao: 'flag',
      vestuario: 'shirt',
      decoracao: 'frame'
    };

    const getCategoryCount = (cat) => {
      if (normalizeStr(cat.id) === 'todos') return visibleProducts.length;
      return visibleProducts.filter((p) => matchesCategory(p.category, cat.id, cat.label)).length;
    };

    const filterTabsHtml = categories
      .map((tab, idx) => {
        const count = getCategoryCount(tab);
        const icon = tab.icon || categoryIconMap[normalizeStr(tab.id)] || 'tag';
        const activeClass = idx === 0 ? 'is-active' : '';
        return `
          <button
            type="button"
            class="filter-pill catalog-tab ${activeClass}"
            data-filter="${escapeHtml(tab.id)}"
            data-filter-label="${escapeHtml(tab.label)}"
            role="tab"
            aria-selected="${idx === 0 ? 'true' : 'false'}"
          >
            <i data-lucide="${icon}"></i>
            <span>${escapeHtml(tab.label)}</span>
            <span class="filter-pill-count">${count}</span>
          </button>
        `;
      })
      .join('');

    const cardsHtml = visibleProducts
      .map((item, idx) => {
        const wideClass = item.bentoWide || idx < 2 ? 'bento-wide' : '';
        const badgeClass = item.badgeStyle === 'sage' ? 'badge-sage' : '';
        const simPreselect = getSimCategoryForProduct(item);

        const waMsg = `Olá Origem Personalizados! Vim pelo site e gostaria de fazer um orçamento de ${item.name || 'personalizados'}.`;
        const waHref = buildWhatsAppUrl(waMsg, business);

        // Visual: real photo or fallback SVG
        const hasPhoto = Boolean(item.image && typeof item.image === 'string' && item.image.trim() !== '');

        const visualHtml = hasPhoto
          ? `
            <div class="catalog-card-photo-wrap">
              <img
                src="${escapeHtml(item.image)}"
                alt="${escapeHtml(item.name || '')} - Origem Personalizados RS"
                class="catalog-product-photo"
                loading="lazy"
                data-fallback-art="${escapeHtml(item.artId || item.id)}"
              />
            </div>
          `
          : `
            <div class="catalog-art-canvas">
              ${getProductVisualMarkup(item.artId || item.id)}
            </div>
          `;

        // Price badge (only if priceFrom is non-empty)
        const formattedPrice = formatPrice(item.priceFrom);
        const priceHtml = formattedPrice
          ? `
            <div class="catalog-price-tag">
              <span class="catalog-price-prefix">A partir de</span>
              <strong class="catalog-price-amount">${escapeHtml(formattedPrice)}</strong>
            </div>
          `
          : '';

        // Specs chips
        const specs = Array.isArray(item.specs) ? item.specs : [];
        const specsHtml = specs
          .map(
            (spec) => `
            <span class="catalog-spec-chip">
              <i data-lucide="check"></i>
              <span>${escapeHtml(spec)}</span>
            </span>`
          )
          .join('');

        return `
          <article
            class="catalog-card bento-card ${wideClass}"
            data-category="${escapeHtml(item.category || '')}"
            data-product-id="${escapeHtml(item.id)}"
          >
            <span class="fx-crop-mark tl" aria-hidden="true"></span>
            <span class="fx-crop-mark br" aria-hidden="true"></span>

            <div class="catalog-card-visual">
              <div class="catalog-card-badges">
                <span class="catalog-category-tag">${escapeHtml(item.category || 'Personalizados')}</span>
                ${
                  item.badge
                    ? `<span class="catalog-badge-highlight ${badgeClass}">${escapeHtml(item.badge)}</span>`
                    : ''
                }
              </div>
              ${visualHtml}
            </div>

            <div class="catalog-card-body">
              <h3 class="catalog-card-title">${escapeHtml(item.name || item.title || '')}</h3>
              <p class="catalog-card-desc">${escapeHtml(item.description || '')}</p>
              ${priceHtml}

              ${specsHtml ? `<div class="catalog-specs-list">${specsHtml}</div>` : ''}

              <div class="catalog-card-actions">
                <a
                  href="${waHref}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-catalog-wa btn-magnetic"
                  aria-label="Orçar ${escapeHtml(item.name || '')} no WhatsApp"
                >
                  <i data-lucide="message-circle"></i>
                  <span>Orçar no WhatsApp</span>
                </a>
                <button
                  type="button"
                  class="btn-catalog-sim"
                  data-sim-preselect="${escapeHtml(simPreselect)}"
                  title="Simular pedido deste item no configurador"
                  aria-label="Simular ${escapeHtml(item.name || '')} no configurador"
                >
                  <i data-lucide="sliders-horizontal"></i>
                </button>
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
              <h3>Procurando algum personalizado sob medida ou pacote empresarial?</h3>
              <p>Fazemos tags, sacolas, cadernos corporativos, brindes para eventos e projetos especiais em Capão da Canoa e região.</p>
            </div>
          </div>
          <a
            href="${buildWhatsAppUrl('Olá Origem Personalizados! Vim pelo site e gostaria de consultar um item personalizado sob medida.', business)}"
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

    // Robust Photo Error Fallback
    const photoImgs = container.querySelectorAll('.catalog-product-photo');
    photoImgs.forEach((img) => {
      const handleImageError = () => {
        const wrap = img.parentElement;
        if (!wrap || wrap.dataset.fallbackApplied === 'true') return;
        wrap.dataset.fallbackApplied = 'true';
        wrap.className = 'catalog-art-canvas';
        const artKey = img.getAttribute('data-fallback-art') || 'copos-termicos';
        wrap.innerHTML = getProductVisualMarkup(artKey);
      };
      img.addEventListener('error', handleImageError);
      if (img.complete && img.naturalWidth === 0) {
        handleImageError();
      }
    });

    // Bind Filter Tabs Interactivity
    const filterButtons = container.querySelectorAll('.filter-pill');
    const gridEl = container.querySelector('#catalog-bento-grid');
    const cards = container.querySelectorAll('.catalog-card');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedId = btn.getAttribute('data-filter') || 'todos';
        const selectedLabel = btn.getAttribute('data-filter-label') || '';

        filterButtons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        const isAll = normalizeStr(selectedId) === 'todos';
        if (gridEl) {
          gridEl.classList.toggle('is-filtered', !isAll);
        }

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          const matches = matchesCategory(cardCat, selectedId, selectedLabel);

          if (matches) {
            card.classList.remove('is-hidden');
            card.classList.remove('fx-filtering-in');
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

    // Bind quick "Simular este item" buttons
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
     SECTION 2: #simulador-section (3-Step Configurator)
     -------------------------------------------------------------------------- */
  function renderSimuladorSection(content) {
    const container = document.getElementById('simulador-section');
    if (!container) return;

    const business = content.business || DEFAULT_BUSINESS;
    const directWaLink = getWhatsAppDirectLink(business);

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
              data-value="${escapeHtml(item.id)}"
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
              <span class="sim-option-label">${escapeHtml(item.label)}</span>
              <span class="sim-option-sub">${escapeHtml(item.sub)}</span>
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
                  <span class="sim-qty-chip-label">Sugestões rápidas:</span>
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
                <h3>${escapeHtml(business.name)}</h3>
                <span><i data-lucide="check-circle-2"></i> Atendimento Direto • ${escapeHtml(business.whatsappDisplay)}</span>
              </div>
            </div>

            <div class="sim-whatsapp-window">
              <div class="sim-wa-label">
                <span>Prévia em tempo real da mensagem</span>
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
              href="${buildWhatsAppUrl('Olá Origem Personalizados!', business)}"
              id="sim-whatsapp-submit"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-sim-submit btn-magnetic"
            >
              <i data-lucide="send"></i>
              <span>Enviar Pedido para o WhatsApp da Origem</span>
            </a>

            <a
              href="${directWaLink}"
              target="_blank"
              rel="noopener noreferrer"
              class="sim-direct-link"
            >
              <i data-lucide="external-link"></i>
              <span>Prefere falar direto? Abrir link do WhatsApp</span>
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
        submitLink.setAttribute('href', buildWhatsAppUrl(fullMessage, business));
      }

      if (summaryPillsEl) {
        summaryPillsEl.innerHTML = `
          <span class="sim-summary-pill">${escapeHtml(state.step1)}</span>
          <span class="sim-summary-pill">${escapeHtml(state.step2)}</span>
          <span class="sim-summary-pill">${escapeHtml(state.step3)}</span>
        `;
      }
    }

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
     SECTION 3: #portfolio-section (Official Real Instagram Embeds)
     -------------------------------------------------------------------------- */
  function renderPortfolioSection(content) {
    const container = document.getElementById('portfolio-section');
    if (!container) return;

    const business = content.business || DEFAULT_BUSINESS;
    const igHandle = (business.instagram || 'origempersonalizadosrs').replace(/^@/, '');
    const igProfileUrl = `https://www.instagram.com/${igHandle}/`;

    const rawPosts = Array.isArray(content.instagramPosts) && content.instagramPosts.length > 0
      ? content.instagramPosts
      : DEFAULT_INSTAGRAM_POSTS;

    const visiblePosts = rawPosts.filter((p) => p.visible !== false);

    // Initial limit: show 6 max by default, with option to load all
    const INITIAL_LIMIT = 6;
    let showingAll = false;

    function buildPostCardHtml(post) {
      const shortcode = getInstagramShortcode(post.url || post.id);
      const postUrl = shortcode ? `https://www.instagram.com/p/${shortcode}/` : igProfileUrl;
      const captionText = post.caption || 'Trabalho realizado pela Origem Personalizados RS';
      const waMsg = `Olá Origem! Vi a publicação (${captionText}) no site e gostaria de um orçamento similar.`;
      const waHref = buildWhatsAppUrl(waMsg, business);

      return `
        <article class="portfolio-card ig-card" data-post-id="${escapeHtml(post.id || shortcode)}">
          <span class="fx-crop-mark tl" aria-hidden="true"></span>
          <span class="fx-crop-mark br" aria-hidden="true"></span>

          <div class="ig-embed-frame-wrap">
            <!-- Fallback Tile (Visible while loading or if iframe fails/blocked) -->
            <div class="ig-fallback-tile">
              <div class="ig-fallback-icon-wrap">
                <i data-lucide="instagram"></i>
              </div>
              <h4 class="ig-fallback-title">Publicação no Instagram</h4>
              <p class="ig-fallback-caption">${escapeHtml(captionText)}</p>
              <a
                href="${postUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="ig-fallback-btn"
              >
                <i data-lucide="instagram"></i>
                <span>Ver no Instagram</span>
                <i data-lucide="arrow-up-right"></i>
              </a>
            </div>

            <!-- Official Instagram Embed -->
            ${
              shortcode
                ? `
                <iframe
                  src="https://www.instagram.com/p/${shortcode}/embed/"
                  class="ig-embed-iframe"
                  title="Post do Instagram @${igHandle} - ${escapeHtml(captionText)}"
                  loading="lazy"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                ></iframe>
              `
                : ''
            }
          </div>

          <div class="ig-card-footer">
            <div class="ig-card-caption-line">
              <p class="ig-card-caption" title="${escapeHtml(captionText)}">
                ${escapeHtml(captionText)}
              </p>
            </div>
            <div class="ig-card-actions">
              <a
                href="${waHref}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ig-card-wa"
                title="Orçar item similar no WhatsApp"
              >
                <i data-lucide="message-circle"></i>
                <span>Orçar similar</span>
              </a>
              <a
                href="${postUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ig-card-ext"
                aria-label="Abrir post original no Instagram"
                title="Abrir no Instagram"
              >
                <i data-lucide="arrow-up-right"></i>
              </a>
            </div>
          </div>
        </article>
      `;
    }

    function renderGridContent() {
      const postsToRender = showingAll ? visiblePosts : visiblePosts.slice(0, INITIAL_LIMIT);
      const cardsHtml = postsToRender.map(buildPostCardHtml).join('');
      const hasMore = visiblePosts.length > INITIAL_LIMIT;

      container.innerHTML = `
        <div class="container">
          <div class="section-header">
            <span class="section-eyebrow">
              <i data-lucide="camera"></i>
              Portfólio Real • Instagram Oficial
            </span>
            <h2 class="section-title">
              Acompanhe nossa produção em <span class="text-serif-accent">Capão da Canoa • RS</span>
            </h2>
            <p class="section-description">
              Confira os trabalhos reais que saem todos os dias do nosso ateliê para clientes de todo o Rio Grande do Sul.
            </p>
          </div>

          <!-- Clean Profile Header Card -->
          <div class="ig-profile-card">
            <div class="ig-profile-left">
              <a href="${igProfileUrl}" target="_blank" rel="noopener noreferrer" class="ig-avatar-ring" aria-label="Instagram @${igHandle}">
                <div class="ig-avatar-inner">
                  <img src="assets/logo-origem.svg" alt="Logo Origem Personalizados RS" />
                </div>
              </a>
              <div class="ig-profile-info">
                <div class="ig-handle-row">
                  <span class="ig-handle-name">@${igHandle}</span>
                  <span class="ig-verified-pill">
                    <i data-lucide="map-pin"></i>
                    ${escapeHtml(business.city || 'Capão da Canoa • RS')}
                  </span>
                </div>
                <p class="ig-bio-text">
                  <strong>${escapeHtml(business.name)}</strong> • ${escapeHtml(business.slogan || 'Sua ideia, nossa criação!')} ${escapeHtml(business.tagline || 'Impressos feitos para deixar sua marca.')}
                </p>
              </div>
            </div>

            <div class="ig-profile-actions">
              <a
                href="${igProfileUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ig-follow btn-magnetic"
              >
                <i data-lucide="instagram"></i>
                <span>Seguir no Instagram</span>
                <i data-lucide="arrow-up-right"></i>
              </a>
            </div>
          </div>

          <!-- Responsive Grid of Real Instagram Posts -->
          <div class="portfolio-grid" id="portfolio-grid">
            ${cardsHtml}
          </div>

          <!-- Bottom Actions -->
          <div class="portfolio-footer-actions">
            ${
              hasMore && !showingAll
                ? `
                <button type="button" class="btn btn-outline-dark btn-lg" id="btn-ig-load-all">
                  <i data-lucide="grid"></i>
                  <span>Ver todas as publicações (${visiblePosts.length})</span>
                </button>
              `
                : ''
            }
            <a
              href="${igProfileUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary btn-lg btn-magnetic"
            >
              <i data-lucide="instagram"></i>
              <span>Ver perfil completo no Instagram @${igHandle}</span>
              <i data-lucide="arrow-up-right"></i>
            </a>
          </div>
        </div>
      `;

      // Bind Load All button if present
      const loadAllBtn = container.querySelector('#btn-ig-load-all');
      if (loadAllBtn) {
        loadAllBtn.addEventListener('click', () => {
          showingAll = true;
          renderGridContent();
          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }
          if (window.OrigemAnimations && typeof window.OrigemAnimations.refresh === 'function') {
            window.OrigemAnimations.refresh();
          }
        });
      }
    }

    renderGridContent();
  }

  /* --------------------------------------------------------------------------
     SECTION 4: #como-funciona-section (4 Steps + FAQ)
     -------------------------------------------------------------------------- */
  function renderComoFuncionaSection(content) {
    const container = document.getElementById('como-funciona-section');
    if (!container) return;

    const business = content.business || DEFAULT_BUSINESS;

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

        <div class="steps-timeline-grid">
          ${stepsHtml}
        </div>

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
              href="${buildWhatsAppUrl('Olá Origem Personalizados! Vim pelo site e gostaria de tirar uma dúvida sobre personalizados.', business)}"
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
     SECTION 5: #cta-final-section & #footer-section
     -------------------------------------------------------------------------- */
  function renderCtaAndFooter(content) {
    const ctaContainer = document.getElementById('cta-final-section');
    const footerContainer = document.getElementById('footer-section');

    const business = content.business || DEFAULT_BUSINESS;
    const directWaLink = getWhatsAppDirectLink(business);
    const igProfileUrl = getInstagramUrl(business);
    const igHandle = (business.instagram || 'origempersonalizadosrs').replace(/^@/, '');

    if (ctaContainer) {
      ctaContainer.innerHTML = `
        <div class="container">
          <div class="cta-final-box cta-banner">
            <div class="cta-final-content">
              <span class="cta-final-badge">
                <i data-lucide="sparkles"></i>
                <span>${escapeHtml(business.slogan || 'Sua ideia, nossa criação!')} • ${escapeHtml(business.city || 'Capão da Canoa – RS')}</span>
              </span>
              <h2 class="cta-final-title">
                Pronto para transformar sua ideia em <span class="text-serif-accent">impressos e brindes que deixam sua marca?</span>
              </h2>
              <p class="cta-final-desc">
                Chame agora no WhatsApp da <strong>${escapeHtml(business.name)}</strong>! Solicite seu orçamento sem compromisso, receba sugestões para o seu negócio ou presente e aprove sua arte digital antes de produzir.
              </p>

              <div class="cta-final-actions cta-actions">
                <a
                  href="${buildWhatsAppUrl('Olá Origem Personalizados RS! Vim pelo site e quero fazer um orçamento.', business)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-cta-wa btn-magnetic"
                >
                  <i data-lucide="message-circle"></i>
                  <span>Falar no WhatsApp ${escapeHtml(business.whatsappDisplay)}</span>
                </a>

                <a
                  href="${directWaLink}"
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
                href="${buildWhatsAppUrl('Olá Origem Personalizados RS! Gostaria de atendimento pelo WhatsApp.', business)}"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-contact-row"
              >
                <div class="cta-contact-icon">
                  <i data-lucide="phone-call"></i>
                </div>
                <div class="cta-contact-info">
                  <small>WhatsApp Comercial &amp; Orçamentos</small>
                  <strong>${escapeHtml(business.whatsappDisplay)}</strong>
                </div>
              </a>

              <a
                href="${igProfileUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-contact-row"
              >
                <div class="cta-contact-icon">
                  <i data-lucide="instagram"></i>
                </div>
                <div class="cta-contact-info">
                  <small>Siga nosso Portfólio Diário</small>
                  <strong>@${igHandle}</strong>
                </div>
              </a>

              <a
                href="mailto:${escapeHtml(business.email)}"
                class="cta-contact-row"
              >
                <div class="cta-contact-icon">
                  <i data-lucide="mail"></i>
                </div>
                <div class="cta-contact-info">
                  <small>Envio de Arquivos &amp; E-mail</small>
                  <strong>${escapeHtml(business.email)}</strong>
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
                  <span class="footer-brand-name">${escapeHtml(business.name)}</span>
                  <span class="footer-brand-sub">${escapeHtml(business.tagline || 'Impressos feitos para deixar sua marca.')}</span>
                </div>
              </a>
              <p class="footer-slogan-text">
                Personalizamos ideias, criamos conexões! Gráfica rápida, criação de arte, brindes corporativos, copos térmicos, calendários 2027, uniformes e comunicação visual.
              </p>
              <span class="footer-location-badge">
                <i data-lucide="map-pin"></i>
                <span>${escapeHtml(business.city || 'Capão da Canoa – RS')} • Atendemos Litoral Norte e todo o RS</span>
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
                    <a href="${buildWhatsAppUrl('Olá Origem Personalizados RS! Vim pelo site.', business)}" target="_blank" rel="noopener noreferrer">${escapeHtml(business.whatsappDisplay)}</a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <i data-lucide="mail"></i>
                  <div>
                    <strong>E-mail:</strong><br />
                    <a href="mailto:${escapeHtml(business.email)}">${escapeHtml(business.email)}</a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <i data-lucide="instagram"></i>
                  <div>
                    <strong>Instagram:</strong><br />
                    <a href="${igProfileUrl}" target="_blank" rel="noopener noreferrer">@${igHandle}</a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <i data-lucide="map-pin"></i>
                  <div>
                    <strong>Localização:</strong><br />
                    <span>${escapeHtml(business.city || 'Capão da Canoa – RS')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom-bar">
            <span>&copy; ${currentYear} ${escapeHtml(business.name)}. Todos os direitos reservados.</span>
            <span>${escapeHtml(business.slogan || 'Sua ideia, nossa criação!')} • ${escapeHtml(business.city || 'Capão da Canoa - RS')}</span>
            <a href="admin.html" class="footer-admin-link" title="Área restrita de gerenciamento">
              <i data-lucide="shield-check"></i>
              <span>Área do proprietário</span>
            </a>
          </div>
        </div>
      `;
    }
  }

  /* --------------------------------------------------------------------------
     RENDER ORCHESTRATOR
     -------------------------------------------------------------------------- */
  function render(content) {
    if (content) {
      currentContent = content;
    } else if (!currentContent) {
      currentContent =
        (window.OrigemStore && typeof window.OrigemStore.get === 'function'
          ? window.OrigemStore.get()
          : null) || DEFAULT_CONTENT;
    }

    renderCatalogoSection(currentContent);
    renderSimuladorSection(currentContent);
    renderPortfolioSection(currentContent);
    renderComoFuncionaSection(currentContent);
    renderCtaAndFooter(currentContent);

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
    if (window.OrigemAnimations && typeof window.OrigemAnimations.refresh === 'function') {
      window.OrigemAnimations.refresh();
    }
  }

  function init(content) {
    render(content);
  }

  // Auto-subscribe to Store updates
  window.addEventListener('origem:content', function (e) {
    if (e && e.detail) {
      render(e.detail);
    }
  });

  if (window.OrigemStore) {
    if (typeof window.OrigemStore.onChange === 'function') {
      window.OrigemStore.onChange(function (c) {
        render(c);
      });
    }
    if (window.OrigemStore.ready && typeof window.OrigemStore.ready.then === 'function') {
      window.OrigemStore.ready.then(function (c) {
        render(c);
      }).catch(function () {});
    }
  }

  /* --------------------------------------------------------------------------
     PUBLIC MODULE INTERFACE
     -------------------------------------------------------------------------- */
  window.OrigemCatalog = {
    init,
    render,
    get products() {
      const src = currentContent || DEFAULT_CONTENT;
      return (src.products || []).filter((p) => p.visible !== false);
    },
    get filterTabs() {
      const src = currentContent || DEFAULT_CONTENT;
      return src.categories || DEFAULT_CATEGORIES;
    }
  };
})();
