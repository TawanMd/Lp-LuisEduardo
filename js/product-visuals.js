/**
 * ============================================================================
 * ORIGEM PERSONALIZADOS RS — Product Visuals, Brand Logo & Hero 3D Showcase
 * Owned by: visual-assets (js/product-visuals.js)
 * Exposes: window.OrigemVisuals = { init, getProductArt, instagramPosts, getLogoSvg, switchHeroSlide }
 * ============================================================================
 */
(function () {
  'use strict';

  let currentWhatsAppNumber = '5551980577025';
  let currentInstagramUrl = 'https://www.instagram.com/origempersonalizadosrs/';
  const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/origempersonalizadosrs/';

  function updateBusinessData(content) {
    if (content && content.business) {
      if (content.business.whatsapp) {
        currentWhatsAppNumber = String(content.business.whatsapp).replace(/\D/g, '');
      }
      if (content.business.instagram) {
        currentInstagramUrl = `https://www.instagram.com/${String(content.business.instagram).replace(/^@/, '')}/`;
      }
    }
  }

  function buildWhatsAppUrl(text) {
    return `https://wa.me/${currentWhatsAppNumber}?text=${encodeURIComponent(text)}`;
  }

  /**
   * 1. VECTOR BRAND LOGO MARK (Circular Sage Green Badge — ORIGEM PERSONALIZADOS)
   */
  function getLogoSvg(size = 48) {
    return `
      <svg class="origem-brand-badge-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="Origem Personalizados RS">
        <defs>
          <linearGradient id="origemBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#9DBE93" />
            <stop offset="55%" stop-color="#8FAF85" />
            <stop offset="100%" stop-color="#76986C" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#origemBadgeGrad)" />
        <circle cx="100" cy="100" r="87" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.42" />
        <circle cx="100" cy="100" r="81" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.24" stroke-dasharray="4 4" />
        <g stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.6" fill="none" transform="translate(100, 50)">
          <line x1="-24" y1="0" x2="-7" y2="0" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" stroke="none" />
          <line x1="7" y1="0" x2="24" y2="0" />
        </g>
        <text x="100" y="106" text-anchor="middle" fill="#FFFFFF" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="700" letter-spacing="4">ORIGEM</text>
        <line x1="44" y1="119" x2="156" y2="119" stroke="#FFFFFF" stroke-width="1.3" stroke-opacity="0.5" />
        <text x="101.5" y="136" text-anchor="middle" fill="#F7F9F5" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10.5" font-weight="700" letter-spacing="3.2">PERSONALIZADOS</text>
        <text x="100" y="156" text-anchor="middle" fill="#E5EFE2" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="8" font-weight="600" letter-spacing="2">CAPÃO DA CANOA • RS</text>
      </svg>
    `.trim();
  }

  /**
   * 2. BESPOKE SVG ARTWORK LIBRARY FOR ALL 9 CATALOG CATEGORIES
   */
  const PRODUCT_ART_LIBRARY = {
    'copos-termicos': `
      <div class="origem-product-art" data-art="copos-termicos">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Copos Térmicos e Canecas Gravadas a Laser">
          <defs>
            <linearGradient id="ctBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#173021" />
              <stop offset="100%" stop-color="#0D1D13" />
            </linearGradient>
            <linearGradient id="ctSteel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B8C4CE" />
              <stop offset="30%" stop-color="#F1F5F8" />
              <stop offset="65%" stop-color="#9BA8B4" />
              <stop offset="100%" stop-color="#D4DEE6" />
            </linearGradient>
            <linearGradient id="ctBlackBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#1E2226" />
              <stop offset="28%" stop-color="#394047" />
              <stop offset="70%" stop-color="#171A1E" />
              <stop offset="100%" stop-color="#282D33" />
            </linearGradient>
            <linearGradient id="ctBlueBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#134585" />
              <stop offset="30%" stop-color="#296EC2" />
              <stop offset="75%" stop-color="#0E3466" />
              <stop offset="100%" stop-color="#1C56A3" />
            </linearGradient>
          </defs>
          <rect width="420" height="260" rx="18" fill="url(#ctBg)" />
          <circle cx="210" cy="130" r="105" fill="#8FAF85" opacity="0.1" />
          <circle cx="145" cy="115" r="70" fill="#296EC2" opacity="0.12" />

          <!-- Left Tumbler: Novembro Azul Corporate -->
          <g transform="translate(82, 34)">
            <ellipse cx="48" cy="194" rx="44" ry="8" fill="#07110A" opacity="0.65" />
            <rect x="6" y="0" width="84" height="14" rx="5" fill="#22282E" stroke="#525D68" stroke-width="1" />
            <rect x="10" y="14" width="76" height="14" fill="url(#ctSteel)" />
            <polygon points="10,28 86,28 79,176 17,176" fill="url(#ctBlueBody)" />
            <polygon points="17,176 79,176 76,192 20,192" fill="url(#ctSteel)" />
            <!-- Laser Engraved Emblem -->
            <circle cx="48" cy="96" r="24" fill="none" stroke="#E2ECF5" stroke-width="1.3" opacity="0.9" />
            <text x="48" y="94" text-anchor="middle" fill="#F1F5F8" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="800" letter-spacing="0.8">NOVEMBRO</text>
            <text x="48" y="104" text-anchor="middle" fill="#B8D8FF" font-family="Plus Jakarta Sans, sans-serif" font-size="6.8" font-weight="700">AZUL • RS</text>
          </g>

          <!-- Center/Right Main Tumbler: Matte Black Laser Engraved CTG / Corporate -->
          <g transform="translate(178, 20)">
            <ellipse cx="56" cy="212" rx="52" ry="9" fill="#07110A" opacity="0.75" />
            <rect x="6" y="0" width="100" height="16" rx="6" fill="#2A3036" stroke="#697582" stroke-width="1.2" />
            <rect x="10" y="16" width="92" height="16" fill="url(#ctSteel)" />
            <polygon points="10,32 102,32 93,192 19,192" fill="url(#ctBlackBody)" />
            <polygon points="19,192 93,192 89,210 23,210" fill="url(#ctSteel)" />
            <!-- Laser Sparkle Highlight -->
            <circle cx="56" cy="106" r="30" fill="none" stroke="url(#ctSteel)" stroke-width="1.6" />
            <circle cx="56" cy="106" r="25" fill="none" stroke="#D4A359" stroke-width="0.9" stroke-dasharray="2 2" />
            <text x="56" y="102" text-anchor="middle" fill="#F1F5F8" font-family="Playfair Display, Georgia, serif" font-size="9.5" font-weight="700" letter-spacing="1">ORIGEM</text>
            <text x="56" y="113" text-anchor="middle" fill="#D4A359" font-family="Plus Jakarta Sans, sans-serif" font-size="6.5" font-weight="700" letter-spacing="1.2">GRAVAÇÃO LASER</text>
            <text x="56" y="123" text-anchor="middle" fill="#C8DEC3" font-family="Plus Jakarta Sans, sans-serif" font-size="5.5" font-weight="600">CTG &amp; EMPRESAS</text>
          </g>

          <!-- Right Ceramic Personalized Mug -->
          <g transform="translate(292, 98)">
            <ellipse cx="44" cy="126" rx="40" ry="7" fill="#07110A" opacity="0.6" />
            <path d="M72,26 C94,26 94,86 72,86" fill="none" stroke="#F7F9F5" stroke-width="9" stroke-linecap="round" />
            <rect x="10" y="10" width="66" height="112" rx="10" fill="#F7F9F5" stroke="#DCE5D8" stroke-width="1.5" />
            <rect x="16" y="28" width="54" height="58" rx="6" fill="#8FAF85" opacity="0.22" />
            <circle cx="43" cy="57" r="18" fill="#8FAF85" />
            <text x="43" y="59" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, serif" font-size="7" font-weight="700">ORIGEM</text>
          </g>

          <!-- Floating Spec Badge -->
          <rect x="16" y="16" width="128" height="26" rx="13" fill="#142418" stroke="#8FAF85" stroke-width="1" />
          <circle cx="30" cy="29" r="4" fill="#D4A359" />
          <text x="84" y="33" text-anchor="middle" fill="#F7F9F5" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="700">Inox Gravado a Laser</text>
        </svg>
      </div>
    `,

    'calendarios-2027': `
      <div class="origem-product-art" data-art="calendarios-2027">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calendários 2027 de Mesa Wire-O e Parede">
          <defs>
            <linearGradient id="calBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1E3524" />
              <stop offset="100%" stop-color="#112016" />
            </linearGradient>
          </defs>
          <rect width="420" height="260" rx="18" fill="url(#calBg)" />
          <circle cx="320" cy="60" r="85" fill="#D4A359" opacity="0.12" />

          <!-- Desk Tent Base -->
          <polygon points="75,212 345,212 365,232 55,232" fill="#0B160E" opacity="0.65" />
          <polygon points="95,54 325,54 348,212 315,222 105,222 72,212" fill="#2A4732" stroke="#8FAF85" stroke-width="1.2" />

          <!-- Main White Calendar Card -->
          <rect x="88" y="56" width="244" height="154" rx="10" fill="#F7F9F5" stroke="#DCE5D8" stroke-width="1.5" />
          <!-- Top Sage Header -->
          <path d="M88,66 C88,60 92,56 98,56 L322,56 C328,56 332,60 332,66 L332,98 L88,98 Z" fill="#8FAF85" />

          <!-- Wire-O Metallic Binding Rings -->
          <g fill="#222823" stroke="#E5EFE2" stroke-width="1">
            <rect x="108" y="46" width="6" height="18" rx="3" />
            <rect x="134" y="46" width="6" height="18" rx="3" />
            <rect x="160" y="46" width="6" height="18" rx="3" />
            <rect x="186" y="46" width="6" height="18" rx="3" />
            <rect x="212" y="46" width="6" height="18" rx="3" />
            <rect x="238" y="46" width="6" height="18" rx="3" />
            <rect x="264" y="46" width="6" height="18" rx="3" />
            <rect x="290" y="46" width="6" height="18" rx="3" />
            <rect x="310" y="46" width="6" height="18" rx="3" />
          </g>

          <!-- Header Typography -->
          <text x="162" y="83" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, Georgia, serif" font-size="16" font-weight="700" letter-spacing="1">CALENDÁRIO 2027</text>
          <rect x="252" y="68" width="68" height="20" rx="10" fill="#142418" />
          <text x="286" y="81" text-anchor="middle" fill="#D4A359" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800">SUA MARCA</text>

          <!-- Calendar Days Grid -->
          <g font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="700" fill="#627567" text-anchor="middle">
            <text x="114" y="114">D</text><text x="144" y="114">S</text><text x="174" y="114">T</text>
            <text x="204" y="114">Q</text><text x="234" y="114">Q</text><text x="264" y="114">S</text><text x="294" y="114">S</text>
          </g>
          <g font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="700" fill="#142418" text-anchor="middle">
            <circle cx="144" cy="130" r="8" fill="#D4A359" />
            <text x="144" y="133" fill="#FFFFFF">1</text>
            <text x="174" y="133">2</text><text x="204" y="133">3</text><text x="234" y="133">4</text><text x="264" y="133">5</text><text x="294" y="133">6</text>
            <text x="114" y="150">7</text><text x="144" y="150">8</text><text x="174" y="150">9</text><text x="204" y="150">10</text>
            <circle cx="234" cy="147" r="8" fill="#8FAF85" />
            <text x="234" y="150" fill="#FFFFFF">11</text>
            <text x="264" y="150">12</text><text x="294" y="150">13</text>
            <text x="114" y="167">14</text><text x="144" y="167">15</text><text x="174" y="167">16</text><text x="204" y="167">17</text><text x="234" y="167">18</text><text x="264" y="167">19</text><text x="294" y="167">20</text>
          </g>

          <!-- Footer Brand Strip on Calendar -->
          <rect x="102" y="180" width="216" height="22" rx="6" fill="#EDF2EA" />
          <text x="210" y="194" text-anchor="middle" fill="#1E3524" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="700">365 dias divulgando sua empresa • Wire-O &amp; Parede</text>
        </svg>
      </div>
    `,

    'camisetas-uniformes': `
      <div class="origem-product-art" data-art="camisetas-uniformes">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camisetas, Moletons e Uniformes Personalizados">
          <defs>
            <linearGradient id="shirtBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#192E20" />
              <stop offset="100%" stop-color="#0F1C13" />
            </linearGradient>
          </defs>
          <rect width="420" height="260" rx="18" fill="url(#shirtBg)" />
          <circle cx="210" cy="130" r="95" fill="#8FAF85" opacity="0.1" />

          <!-- Secondary Festive Red Shirt (Natal da Familia / Eventos) -->
          <g transform="translate(215, 38) scale(0.84)">
            <path d="M55,15 L95,15 C102,28 118,28 125,15 L165,15 L205,58 L178,94 L152,74 L152,210 L68,210 L68,74 L42,94 L15,58 Z"
                  fill="#8B1E26" stroke="#D4A359" stroke-width="2" stroke-linejoin="round" />
            <circle cx="110" cy="102" r="28" fill="none" stroke="#F0CFA0" stroke-width="1.5" stroke-dasharray="3 2" />
            <text x="110" y="99" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, serif" font-size="10" font-weight="700">NATAL DA</text>
            <text x="110" y="112" text-anchor="middle" fill="#F0CFA0" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800">FAMÍLIA</text>
          </g>

          <!-- Primary Corporate / Uniform T-Shirt -->
          <g transform="translate(68, 26)">
            <path d="M55,15 L95,15 C102,28 118,28 125,15 L165,15 L205,58 L178,94 L152,74 L152,208 L68,208 L68,74 L42,94 L15,58 Z"
                  fill="#F7F9F5" stroke="#8FAF85" stroke-width="2.2" stroke-linejoin="round" />
            <!-- Collar Trim -->
            <path d="M92,16 C102,31 118,31 128,16" fill="none" stroke="#1E3524" stroke-width="3.5" />
            <!-- Chest Print Graphic -->
            <circle cx="110" cy="96" r="32" fill="#8FAF85" />
            <circle cx="110" cy="96" r="28" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.6" />
            <text x="110" y="95" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, Georgia, serif" font-size="11" font-weight="700" letter-spacing="1">ORIGEM</text>
            <text x="110" y="106" text-anchor="middle" fill="#F7F9F5" font-family="Plus Jakarta Sans, sans-serif" font-size="5.5" font-weight="700" letter-spacing="1.2">UNIFORMES &amp; EVENTOS</text>
            <rect x="82" y="142" width="56" height="16" rx="8" fill="#142418" />
            <text x="110" y="153" text-anchor="middle" fill="#D4A359" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="700">ALGODÃO &amp; DRY</text>
          </g>
        </svg>
      </div>
    `,

    'cartoes-papelaria': `
      <div class="origem-product-art" data-art="cartoes-papelaria">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartões de Visita, Panfletos, Pastas e Papelaria Corporativa">
          <rect width="420" height="260" rx="18" fill="#16291C" />
          <circle cx="90" cy="60" r="80" fill="#8FAF85" opacity="0.12" />

          <!-- Corporate Folder / Pasta Back Layer -->
          <g transform="translate(64, 32) rotate(-5)">
            <rect x="0" y="0" width="175" height="135" rx="10" fill="#2A4732" stroke="#8FAF85" stroke-width="1.5" />
            <rect x="16" y="18" width="76" height="8" rx="4" fill="#8FAF85" opacity="0.6" />
            <rect x="16" y="32" width="110" height="5" rx="2.5" fill="#C8DEC3" opacity="0.35" />
          </g>

          <!-- Floating Business Card Dark Premium -->
          <g transform="translate(155, 52) rotate(4)">
            <rect x="0" y="0" width="196" height="114" rx="12" fill="#101D14" stroke="#D4A359" stroke-width="1.8" />
            <circle cx="48" cy="57" r="26" fill="#8FAF85" />
            <text x="48" y="59" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, serif" font-size="9.5" font-weight="700">ORIGEM</text>
            <text x="92" y="46" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="11.5" font-weight="800">CARTÃO DE VISITA</text>
            <text x="92" y="62" fill="#D4A359" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="700">Verniz Localizado &amp; Laminação</text>
            <text x="92" y="82" fill="#BDD0B8" font-family="Plus Jakarta Sans, sans-serif" font-size="8" font-weight="500">(51) 98057-7025 • Capão da Canoa</text>
          </g>

          <!-- Front Light Business Card / Tag & Receipt -->
          <g transform="translate(92, 128) rotate(-2)">
            <rect x="0" y="0" width="188" height="102" rx="12" fill="#F7F9F5" stroke="#DCE5D8" stroke-width="1.5" />
            <rect x="0" y="0" width="188" height="24" rx="12" fill="#8FAF85" />
            <text x="94" y="16" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800" letter-spacing="1">PANFLETOS • TAGS • RECIBOS • PASTAS</text>
            <text x="94" y="54" text-anchor="middle" fill="#142418" font-family="Playfair Display, serif" font-size="13" font-weight="700">Papelaria Corporativa</text>
            <text x="94" y="74" text-anchor="middle" fill="#3E5243" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="600">Impressão Digital de Alta Definição</text>
          </g>
        </svg>
      </div>
    `,

    'adesivos-rotulos': `
      <div class="origem-product-art" data-art="adesivos-rotulos">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Adesivos Vinílicos e Rótulos Recortados à Prova d'Água">
          <rect width="420" height="260" rx="18" fill="#15271B" />
          <!-- Die-cut registration grid lines -->
          <g stroke="#8FAF85" stroke-opacity="0.14" stroke-width="1">
            <line x1="0" y1="65" x2="420" y2="65" /><line x1="0" y1="130" x2="420" y2="130" /><line x1="0" y1="195" x2="420" y2="195" />
            <line x1="105" y1="0" x2="105" y2="260" /><line x1="210" y1="0" x2="210" y2="260" /><line x1="315" y1="0" x2="315" y2="260" />
          </g>

          <!-- Center Die-Cut Sticker with Peel Effect -->
          <g transform="translate(135, 42)">
            <circle cx="75" cy="82" r="72" fill="#FFFFFF" />
            <circle cx="75" cy="82" r="65" fill="none" stroke="#D4A359" stroke-width="1.5" stroke-dasharray="5 3" />
            <circle cx="75" cy="82" r="58" fill="#8FAF85" />
            <text x="75" y="78" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, serif" font-size="18" font-weight="700" letter-spacing="2">ORIGEM</text>
            <text x="75" y="95" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="8" font-weight="800" letter-spacing="1.2">VINIL À PROVA D'ÁGUA</text>
            <text x="75" y="112" text-anchor="middle" fill="#F7F9F5" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="700">RECORTE ELETRÔNICO</text>
            <!-- Sticker Peel Fold -->
            <path d="M122,26 C135,42 142,58 147,76 L112,62 Z" fill="#DCE5D8" stroke="#8FAF85" stroke-width="1" />
          </g>

          <!-- Left Badge Sticker -->
          <g transform="translate(34, 88) rotate(-10)">
            <rect x="0" y="0" width="92" height="92" rx="22" fill="#F7F9F5" stroke="#8FAF85" stroke-width="3" />
            <rect x="8" y="8" width="76" height="76" rx="16" fill="#1E3524" />
            <text x="46" y="44" text-anchor="middle" fill="#D4A359" font-family="Plus Jakarta Sans, sans-serif" font-size="9" font-weight="800">RÓTULOS</text>
            <text x="46" y="58" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="8" font-weight="700">&amp; LACRES</text>
          </g>

          <!-- Right Waterproof Pill Sticker -->
          <g transform="translate(292, 95) rotate(8)">
            <rect x="0" y="0" width="98" height="84" rx="18" fill="#D4A359" stroke="#FFFFFF" stroke-width="3" />
            <text x="49" y="38" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="800">VITRINES</text>
            <text x="49" y="52" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="700">EMBALAGENS</text>
            <text x="49" y="66" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="800">ALTA FIXAÇÃO</text>
          </g>
        </svg>
      </div>
    `,

    'banners-windbanner': `
      <div class="origem-product-art" data-art="banners-windbanner">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WindBanners, Banners, Lonas e Placas de Fachada">
          <rect width="420" height="260" rx="18" fill="#132418" />
          <circle cx="290" cy="120" r="95" fill="#D4A359" opacity="0.1" />

          <!-- Storefront Sign / Placa de Fachada & Lona -->
          <g transform="translate(168, 42)">
            <rect x="0" y="0" width="218" height="156" rx="12" fill="#1E3524" stroke="#8FAF85" stroke-width="2" />
            <!-- Grommets (Ilhós) on Banner -->
            <circle cx="12" cy="12" r="4" fill="#D4A359" /><circle cx="206" cy="12" r="4" fill="#D4A359" />
            <circle cx="12" cy="144" r="4" fill="#D4A359" /><circle cx="206" cy="144" r="4" fill="#D4A359" />
            <rect x="18" y="22" width="182" height="54" rx="8" fill="#142418" stroke="#D4A359" stroke-width="1.5" />
            <text x="109" y="47" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, serif" font-size="14" font-weight="700" letter-spacing="1.5">FACHADAS &amp; LONAS</text>
            <text x="109" y="64" text-anchor="middle" fill="#D4A359" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="700">COMUNICAÇÃO VISUAL • LITORAL NORTE</text>
            <rect x="26" y="92" width="78" height="44" rx="8" fill="#8FAF85" />
            <text x="65" y="112" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800">PLACAS PVC</text>
            <text x="65" y="125" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="700">&amp; ACM</text>
            <rect x="114" y="92" width="78" height="44" rx="8" fill="#F7F9F5" />
            <text x="153" y="112" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800">BANNERS</text>
            <text x="153" y="125" text-anchor="middle" fill="#3E5243" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="700">ALTA DEFINIÇÃO</text>
          </g>

          <!-- Feather WindBanner Flag (Left) -->
          <g transform="translate(46, 20)">
            <!-- Base & Pole -->
            <ellipse cx="44" cy="216" rx="28" ry="7" fill="#2A3036" stroke="#8FAF85" stroke-width="1.5" />
            <line x1="22" y1="214" x2="22" y2="24" stroke="#DCE5D8" stroke-width="3" stroke-linecap="round" />
            <!-- Feather Flag Blade -->
            <path d="M22,22 C68,14 96,42 92,98 C89,144 68,176 22,190 Z" fill="#8FAF85" stroke="#F7F9F5" stroke-width="2" />
            <path d="M22,42 C58,38 78,58 76,98 C74,132 58,156 22,168 Z" fill="#142418" />
            <text x="48" y="96" text-anchor="middle" fill="#D4A359" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800" transform="rotate(-90 48 96)">WINDBANNER 2,5M</text>
          </g>
        </svg>
      </div>
    `,

    'tapetes-capachos': `
      <div class="origem-product-art" data-art="tapetes-capachos">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tapetes Capachos Vinílicos Personalizados">
          <rect width="420" height="260" rx="18" fill="#172A1E" />
          <!-- Perspective Floor Grid -->
          <polygon points="45,62 375,62 396,214 24,214" fill="#263B2C" stroke="#D4A359" stroke-width="2" />
          <polygon points="58,72 362,72 380,202 40,202" fill="#1B2D20" stroke="#8FAF85" stroke-width="1.5" stroke-dasharray="4 3" />

          <!-- Textured Vinyl Loop Pattern Simulation -->
          <circle cx="210" cy="126" r="36" fill="#8FAF85" />
          <circle cx="210" cy="126" r="31" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.7" />
          <text x="210" y="125" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, Georgia, serif" font-size="12" font-weight="700" letter-spacing="1.5">ORIGEM</text>
          <text x="210" y="137" text-anchor="middle" fill="#F7F9F5" font-family="Plus Jakarta Sans, sans-serif" font-size="5.5" font-weight="700" letter-spacing="1">PERSONALIZADOS</text>

          <text x="210" y="182" text-anchor="middle" fill="#F0CFA0" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" letter-spacing="2">BEM-VINDO • CAPACHOS VINÍLICOS</text>
          <text x="210" y="196" text-anchor="middle" fill="#BDD0B8" font-family="Plus Jakarta Sans, sans-serif" font-size="8" font-weight="600">Vulcanizados • Antiderrapantes • Empresas &amp; Condomínios</text>
        </svg>
      </div>
    `,

    'quadros-azulejos': `
      <div class="origem-product-art" data-art="quadros-azulejos">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quadrinhos Decorativos e Azulejos com Foto">
          <rect width="420" height="260" rx="18" fill="#182C1F" />
          <!-- Left Framed Wall Art -->
          <g transform="translate(56, 34)">
            <rect x="0" y="0" width="136" height="176" rx="8" fill="#D4A359" />
            <rect x="8" y="8" width="120" height="160" rx="4" fill="#F7F9F5" />
            <rect x="20" y="20" width="96" height="114" fill="#1E3524" />
            <!-- Botanical / Coastal Sun Art inside Frame -->
            <circle cx="68" cy="64" r="24" fill="#D4A359" opacity="0.85" />
            <path d="M20,104 Q48,88 68,102 T116,96 L116,134 L20,134 Z" fill="#8FAF85" />
            <text x="68" y="152" text-anchor="middle" fill="#142418" font-family="Playfair Display, serif" font-size="9.5" font-weight="700">Quadros Decorativos</text>
          </g>

          <!-- Right Glossy Ceramic Photo Tile on Wooden Stand -->
          <g transform="translate(216, 48)">
            <!-- Wooden Stand Feet -->
            <polygon points="34,154 52,154 44,174 26,174" fill="#D4A359" />
            <polygon points="104,154 122,154 130,174 112,174" fill="#D4A359" />
            <!-- Glossy Tile -->
            <rect x="12" y="12" width="132" height="144" rx="12" fill="#FFFFFF" stroke="#DCE5D8" stroke-width="2" />
            <rect x="22" y="22" width="112" height="96" rx="8" fill="#8FAF85" />
            <!-- Gloss Reflection Line -->
            <polygon points="22,22 72,22 22,72" fill="#FFFFFF" opacity="0.28" />
            <circle cx="78" cy="70" r="22" fill="#F7F9F5" />
            <path d="M78,80 C78,80 64,70 64,62 C64,57 68,54 73,54 C76,54 78,56 78,58 C78,56 80,54 83,54 C88,54 92,57 92,62 C92,70 78,80 78,80 Z" fill="#D4A359" />
            <text x="78" y="135" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="9" font-weight="800">AZULEJO COM FOTO</text>
            <text x="78" y="147" text-anchor="middle" fill="#627567" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="600">Com suporte incluso</text>
          </g>
        </svg>
      </div>
    `,

    'canecas-chaveiros': `
      <div class="origem-product-art" data-art="canecas-chaveiros">
        <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mouse Pads, Chaveirinhos e Toalhas Personalizadas">
          <rect width="420" height="260" rx="18" fill="#15281C" />

          <!-- Personalized Ergonomic Mouse Pad -->
          <g transform="translate(46, 36)">
            <rect x="0" y="0" width="164" height="186" rx="28" fill="#2A4732" stroke="#8FAF85" stroke-width="2" />
            <circle cx="82" cy="74" r="34" fill="#8FAF85" />
            <text x="82" y="73" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, serif" font-size="11" font-weight="700">ORIGEM</text>
            <text x="82" y="85" text-anchor="middle" fill="#142418" font-family="Plus Jakarta Sans, sans-serif" font-size="6" font-weight="800">MOUSE PAD</text>
            <ellipse cx="82" cy="148" rx="42" ry="20" fill="#1E3524" stroke="#D4A359" stroke-width="1.2" />
            <text x="82" y="151" text-anchor="middle" fill="#F0CFA0" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="700">BASE EMBORRACHADA</text>
          </g>

          <!-- Personalized Embroidered/Sublimated Towel (Toalha) -->
          <g transform="translate(232, 36)">
            <rect x="0" y="0" width="142" height="94" rx="10" fill="#F7F9F5" stroke="#DCE5D8" stroke-width="1.5" />
            <rect x="0" y="56" width="142" height="22" fill="#8FAF85" />
            <text x="71" y="70" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800" letter-spacing="1">TOALHAS PERSONALIZADAS</text>
            <text x="71" y="36" text-anchor="middle" fill="#142418" font-family="Playfair Display, serif" font-size="11" font-weight="700">Brindes &amp; Eventos</text>
          </g>

          <!-- Custom Keychains (Chaveirinhos Acrílico/Metal/Resina) -->
          <g transform="translate(236, 146)">
            <rect x="0" y="0" width="136" height="76" rx="14" fill="#1E3524" stroke="#D4A359" stroke-width="1.5" />
            <circle cx="34" cy="38" r="14" fill="none" stroke="#D4A359" stroke-width="3" />
            <circle cx="72" cy="38" r="22" fill="#8FAF85" stroke="#FFFFFF" stroke-width="1.5" />
            <line x1="48" y1="38" x2="50" y2="38" stroke="#D4A359" stroke-width="3" />
            <text x="72" y="41" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="800">CHAVEIROS</text>
          </g>
        </svg>
      </div>
    `
  };

  // Category ID aliases so any slug passed by sections-catalog resolves cleanly
  const PRODUCT_ART_ALIASES = {
    '1': 'copos-termicos',
    'copos': 'copos-termicos',
    'copo-termico': 'copos-termicos',
    'brindes-termicos': 'copos-termicos',
    '2': 'calendarios-2027',
    'calendarios': 'calendarios-2027',
    'calendario-2027': 'calendarios-2027',
    '3': 'camisetas-uniformes',
    'camisetas': 'camisetas-uniformes',
    'vestuario': 'camisetas-uniformes',
    'moletons': 'camisetas-uniformes',
    '4': 'cartoes-papelaria',
    'cartoes': 'cartoes-papelaria',
    'papelaria': 'cartoes-papelaria',
    'grafica': 'cartoes-papelaria',
    'materiais-graficos': 'cartoes-papelaria',
    '5': 'adesivos-rotulos',
    'adesivos': 'adesivos-rotulos',
    'rotulos': 'adesivos-rotulos',
    '6': 'banners-windbanner',
    'windbanner': 'banners-windbanner',
    'banners': 'banners-windbanner',
    'fachadas': 'banners-windbanner',
    'comunicacao-visual': 'banners-windbanner',
    '7': 'tapetes-capachos',
    'tapetes': 'tapetes-capachos',
    'capachos': 'tapetes-capachos',
    '8': 'quadros-azulejos',
    'quadros': 'quadros-azulejos',
    'azulejos': 'quadros-azulejos',
    'decoracao': 'quadros-azulejos',
    '9': 'canecas-chaveiros',
    'mousepad': 'canecas-chaveiros',
    'mousepads': 'canecas-chaveiros',
    'chaveiros': 'canecas-chaveiros',
    'toalhas': 'canecas-chaveiros',
    'brindes': 'canecas-chaveiros'
  };

  function getProductArt(productId) {
    const key = String(productId || '').trim().toLowerCase();
    const resolvedKey = PRODUCT_ART_LIBRARY[key] ? key : (PRODUCT_ART_ALIASES[key] || 'copos-termicos');
    return PRODUCT_ART_LIBRARY[resolvedKey] || PRODUCT_ART_LIBRARY['copos-termicos'];
  }

  /**
   * 3. CURATED INSTAGRAM PORTFOLIO ITEMS (Local Assets + Bulletproof SVG Fallbacks)
   */
  const instagramPosts = [
    {
      id: 'post-novembro-azul',
      title: 'Copos Térmicos Personalizados • Campanha Novembro Azul',
      subtitle: 'Gravação a laser permanente em inox para ações corporativas e saúde',
      caption: 'Copos térmicos azuis personalizados com gravação a laser de alta precisão para a campanha Novembro Azul e brindes empresariais.',
      category: 'Canecas',
      highlight: 'Canecas',
      tag: 'Brindes & Térmicos',
      badge: 'Reel em Destaque',
      type: 'reel',
      image: 'assets/instagram/post-novembro-azul.jpg',
      src: 'assets/instagram/post-novembro-azul.jpg',
      localImage: 'assets/instagram/post-novembro-azul.jpg',
      instagramUrl: INSTAGRAM_PROFILE_URL,
      url: INSTAGRAM_PROFILE_URL,
      whatsappText: 'Olá! Vi os Copos Térmicos personalizados (estilo campanha Novembro Azul / Corporativo) no site da Origem e gostaria de um orçamento!',
      svgArt: PRODUCT_ART_LIBRARY['copos-termicos']
    },
    {
      id: 'post-ctg-copos',
      title: 'Copos Térmicos Inox Gravados a Laser • CTG Chama Crioula',
      subtitle: 'Personalização com brasão gaúcho, nomes individuais e logotipos',
      caption: 'Tradição gaúcha marcada no inox! Copos térmicos pretos e inox gravados a laser para o CTG Chama Crioula, eventos e empresas do RS.',
      category: 'Canecas',
      highlight: 'Canecas',
      tag: 'Gravação a Laser',
      badge: 'Mais Pedido',
      type: 'reel',
      image: 'assets/instagram/post-ctg-copos.jpg',
      src: 'assets/instagram/post-ctg-copos.jpg',
      localImage: 'assets/instagram/post-ctg-copos.jpg',
      instagramUrl: INSTAGRAM_PROFILE_URL,
      url: INSTAGRAM_PROFILE_URL,
      whatsappText: 'Olá! Vi os Copos Térmicos Inox gravados a laser (CTG / Empresas) no site da Origem e gostaria de fazer um orçamento!',
      svgArt: PRODUCT_ART_LIBRARY['copos-termicos']
    },
    {
      id: 'post-calendarios-2027',
      title: 'Linha de Calendários 2027 • Mesa Wire-O & Parede',
      subtitle: 'Seu cliente lembrará de você todos os dias do ano!',
      caption: 'Antecipe seus brindes de fim de ano! Calendários 2027 de mesa com acabamento Wire-O e calendários de parede personalizados com a sua marca.',
      category: 'Adesivos',
      highlight: 'Adesivos',
      tag: 'Temporada 2027',
      badge: 'Temporada 2027',
      type: 'post',
      image: 'assets/instagram/post-calendarios-2027.webp',
      src: 'assets/instagram/post-calendarios-2027.webp',
      localImage: 'assets/instagram/post-calendarios-2027.jpg',
      fallbackImage: 'assets/instagram/post-calendarios-2027.jpg',
      instagramUrl: INSTAGRAM_PROFILE_URL,
      url: INSTAGRAM_PROFILE_URL,
      whatsappText: 'Olá! Quero fazer um orçamento de Calendários 2027 personalizados com a marca da minha empresa.',
      svgArt: PRODUCT_ART_LIBRARY['calendarios-2027']
    },
    {
      id: 'post-camisetas-natal',
      title: 'Camisetas Personalizadas • Natal da Família & Uniformes',
      subtitle: 'Estampas vibrantes em algodão e dry-fit para famílias, equipes e eventos',
      caption: 'Momentos especiais merecem camisetas exclusivas! Produzimos kits para Natal da Família, aniversários, eventos e uniformes profissionais.',
      category: 'Camisetas',
      highlight: 'Camisetas',
      tag: 'Vestuário & Eventos',
      badge: 'Criação Exclusiva',
      type: 'reel',
      image: 'assets/instagram/post-camisetas-natal.jpg',
      src: 'assets/instagram/post-camisetas-natal.jpg',
      localImage: 'assets/instagram/post-camisetas-natal.jpg',
      instagramUrl: INSTAGRAM_PROFILE_URL,
      url: INSTAGRAM_PROFILE_URL,
      whatsappText: 'Olá! Vi as Camisetas Personalizadas no site da Origem e gostaria de solicitar um orçamento!',
      svgArt: PRODUCT_ART_LIBRARY['camisetas-uniformes']
    },
    {
      id: 'post-kits-mousepad',
      title: 'Kits Corporativos: Moletons, Camisetas, Mouse Pads & Brindes',
      subtitle: 'Identidade visual completa para destacar sua equipe em Capão da Canoa e RS',
      caption: 'Do escritório ao atendimento: moletons personalizados, mouse pads ergonômicos, toalhas, chaveiros e calendários feitos sob medida.',
      category: 'Toalhas',
      highlight: 'Toalhas',
      tag: 'Kits Corporativos',
      badge: 'Empresas & Equipes',
      type: 'reel',
      image: 'assets/instagram/post-kits-mousepad.jpg',
      src: 'assets/instagram/post-kits-mousepad.jpg',
      localImage: 'assets/instagram/post-kits-mousepad.jpg',
      instagramUrl: INSTAGRAM_PROFILE_URL,
      url: INSTAGRAM_PROFILE_URL,
      whatsappText: 'Olá! Gostaria de orçar Kits Corporativos (camisetas/moletons, mouse pads e brindes) com a Origem Personalizados RS!',
      svgArt: PRODUCT_ART_LIBRARY['canecas-chaveiros']
    },
    {
      id: 'post-catalogo-geral',
      title: 'Vitrine Completa: Gráfica Rápida, Fachadas, Capachos & Quadros',
      subtitle: 'Materiais gráficos, WindBanners, tapetes vinílicos e decoração personalizada',
      caption: 'Impressos feitos para deixar sua marca! Cartões de visita, panfletos, adesivos, WindBanners, tapetes capachos e quadros decorativos.',
      category: 'Tapetes',
      highlight: 'Tapetes',
      tag: 'Solução Completa',
      badge: 'Capão da Canoa • RS',
      type: 'post',
      image: 'assets/instagram/post-catalogo-geral.jpg',
      src: 'assets/instagram/post-catalogo-geral.jpg',
      localImage: 'assets/instagram/post-catalogo-geral.jpg',
      instagramUrl: INSTAGRAM_PROFILE_URL,
      url: INSTAGRAM_PROFILE_URL,
      whatsappText: 'Olá! Vi o portfólio completo da Origem Personalizados RS no site e gostaria de fazer um orçamento!',
      svgArt: PRODUCT_ART_LIBRARY['banners-windbanner']
    }
  ];

  /**
   * 4. HERO INTERACTIVE 3D/LAYERED SHOWCASE STAGE (#hero-showcase-stage)
   */
  const HERO_SLIDES = [
    {
      id: 'copos',
      tabLabel: 'Copos Laser',
      tabIcon: '✦',
      badge: 'Campeão de Pedidos',
      chipLeft: 'Gravação a Laser 360°',
      chipRight: 'Unidade ou Atacado',
      title: 'Copos Térmicos Inox Gravados a Laser',
      desc: 'Personalização definitiva que não descasca: brasões de CTG, logotipos de empresas, nomes individuais e campanhas.',
      specs: ['Inox Parede Dupla', 'Arte Inclusa', 'Capão da Canoa • RS'],
      whatsappMsg: 'Olá! Gostaria de orçar Copos Térmicos personalizados gravados a laser com a Origem Personalizados RS.',
      artKey: 'copos-termicos'
    },
    {
      id: 'calendarios',
      tabLabel: 'Calendários 2027',
      tabIcon: '📅',
      badge: 'Temporada 2027',
      chipLeft: 'Mesa Wire-O & Parede',
      chipRight: '365 Dias na Mesa do Cliente',
      title: 'Calendários 2027 Personalizados',
      desc: 'Seu cliente lembrará de você todos os dias do ano! Modelos de mesa com garras Wire-O metálicas e parede.',
      specs: ['Papel Couchê Premium', 'Criamos o Layout', 'Lotes Flexíveis'],
      whatsappMsg: 'Olá! Quero fazer um orçamento de Calendários 2027 personalizados com a marca da minha empresa.',
      artKey: 'calendarios-2027'
    },
    {
      id: 'camisetas',
      tabLabel: 'Camisetas & Kits',
      tabIcon: '👕',
      badge: 'Uniformes & Família',
      chipLeft: 'Algodão & Dry-Fit',
      chipRight: 'Cartões & Papelaria',
      title: 'Camisetas, Moletons & Papelaria Gráfica',
      desc: 'Uniformes profissionais para sua equipe, camisetas temáticas para eventos/Natal da Família e cartões de visita.',
      specs: ['Estampa Alta Definição', 'Sem Pedido Mínimo Alto', 'Entrega Ágil'],
      whatsappMsg: 'Olá! Gostaria de orçar Camisetas / Uniformes e Materiais Gráficos na Origem Personalizados RS.',
      artKey: 'camisetas-uniformes'
    },
    {
      id: 'windbanner',
      tabLabel: 'WindBanner & Vinil',
      tabIcon: '🚩',
      badge: 'Comunicação Visual',
      chipLeft: 'Resistente ao Sol e Vento',
      chipRight: 'Adesivos à Prova d’Água',
      title: 'WindBanners, Fachadas & Adesivos Recortados',
      desc: 'Destaque seu comércio no Litoral Norte com WindBanners, lonas, placas, tapetes capachos e rótulos em vinil.',
      specs: ['Recorte Eletrônico', 'Alta Durabilidade', 'Instalação Fácil'],
      whatsappMsg: 'Olá! Quero orçar WindBanner / Fachada / Adesivos personalizados com a Origem Personalizados RS.',
      artKey: 'banners-windbanner'
    }
  ];

  let activeSlideIndex = 0;
  let autoRotateTimer = null;

  function renderHeroShowcase() {
    const stage = document.getElementById('hero-showcase-stage');
    if (!stage) return;

    const tabsHtml = HERO_SLIDES.map((s, idx) => `
      <button type="button"
              class="hv-tab-btn ${idx === 0 ? 'active' : ''}"
              data-hv-index="${idx}"
              aria-pressed="${idx === 0 ? 'true' : 'false'}">
        <span>${s.tabLabel}</span>
      </button>
    `).join('');

    const slidesHtml = HERO_SLIDES.map((s, idx) => `
      <div class="hv-slide ${idx === 0 ? 'active' : ''}" data-hv-slide="${idx}">
        <div class="hv-artwork-frame">
          <span class="hv-floating-chip hv-chip-top-left">${s.chipLeft}</span>
          <div class="hv-artwork-svg">${getProductArt(s.artKey)}</div>
          <span class="hv-floating-chip hv-chip-bottom-right">${s.chipRight}</span>
        </div>
      </div>
    `).join('');

    const dotsHtml = HERO_SLIDES.map((s, idx) => `
      <button type="button"
              class="hv-dot ${idx === 0 ? 'active' : ''}"
              data-hv-dot="${idx}"
              aria-label="Visualizar ${s.title}"></button>
    `).join('');

    const first = HERO_SLIDES[0];

    stage.innerHTML = `
      <div class="hv-showcase-shell">
        <div class="hv-stage-glow" aria-hidden="true"></div>

        <div class="hv-topbar">
          <span class="hv-studio-tag">
            <span class="hv-studio-dot"></span>
            Estúdio Criativo • Vitrine Interativa
          </span>
          <span class="hv-crop-badge" id="hv-active-badge">${first.badge}</span>
        </div>

        <div class="hv-switcher-tabs" role="tablist" aria-label="Alternar produto em destaque">
          ${tabsHtml}
        </div>

        <div class="hv-viewport">
          ${slidesHtml}
        </div>

        <div class="hv-meta-panel">
          <div class="hv-meta-header">
            <div>
              <h3 class="hv-meta-title" id="hv-meta-title">${first.title}</h3>
              <p class="hv-meta-desc" id="hv-meta-desc">${first.desc}</p>
            </div>
          </div>
          <div class="hv-meta-footer">
            <div class="hv-spec-list" id="hv-spec-list">
              ${first.specs.map((sp) => `<span class="hv-spec-pill">${sp}</span>`).join('')}
            </div>
            <a href="${buildWhatsAppUrl(first.whatsappMsg)}"
               target="_blank"
               rel="noopener noreferrer"
               class="hv-cta-link"
               id="hv-whatsapp-cta">
              <span>Orçar este item</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div class="hv-stage-dots" aria-label="Indicadores de vitrine">
          ${dotsHtml}
        </div>
      </div>
    `;

    // Bind Tab & Dot click events
    stage.querySelectorAll('[data-hv-index]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-hv-index'), 10);
        switchHeroSlide(idx, true);
      });
    });

    stage.querySelectorAll('[data-hv-dot]').forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-hv-dot'), 10);
        switchHeroSlide(idx, true);
      });
    });

    // Pause auto-rotation on hover/focus
    stage.addEventListener('mouseenter', stopAutoRotate);
    stage.addEventListener('mouseleave', startAutoRotate);
    stage.addEventListener('focusin', stopAutoRotate);
    stage.addEventListener('focusout', startAutoRotate);

    startAutoRotate();
  }

  function switchHeroSlide(index, userInitiated = false) {
    const stage = document.getElementById('hero-showcase-stage');
    if (!stage) return;

    const total = HERO_SLIDES.length;
    activeSlideIndex = ((index % total) + total) % total;
    const current = HERO_SLIDES[activeSlideIndex];

    stage.querySelectorAll('[data-hv-index]').forEach((btn, idx) => {
      const isActive = idx === activeSlideIndex;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    stage.querySelectorAll('[data-hv-slide]').forEach((slide, idx) => {
      slide.classList.toggle('active', idx === activeSlideIndex);
    });

    stage.querySelectorAll('[data-hv-dot]').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeSlideIndex);
    });

    const badgeEl = document.getElementById('hv-active-badge');
    const titleEl = document.getElementById('hv-meta-title');
    const descEl = document.getElementById('hv-meta-desc');
    const specsEl = document.getElementById('hv-spec-list');
    const ctaEl = document.getElementById('hv-whatsapp-cta');

    if (badgeEl) badgeEl.textContent = current.badge;
    if (titleEl) titleEl.textContent = current.title;
    if (descEl) descEl.textContent = current.desc;
    if (specsEl) {
      specsEl.innerHTML = current.specs.map((sp) => `<span class="hv-spec-pill">${sp}</span>`).join('');
    }
    if (ctaEl) {
      ctaEl.href = buildWhatsAppUrl(current.whatsappMsg);
    }

    if (userInitiated) {
      stopAutoRotate();
    }
  }

  function startAutoRotate() {
    stopAutoRotate();
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    // Slower, elegant autoplay per UX feedback: 8 seconds per slide
    autoRotateTimer = window.setInterval(() => {
      switchHeroSlide(activeSlideIndex + 1, false);
    }, 8000);
  }

  function stopAutoRotate() {
    if (autoRotateTimer) {
      window.clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  /**
   * 5. BULLETPROOF IMAGE FALLBACK GUARD
   * Ensures no <img> tag across the entire page can ever remain in a broken state.
   */
  function attachImageFallbackGuard() {
    const svgDataUri = 'data:image/svg+xml;utf8,' + encodeURIComponent(getLogoSvg(400));
    window.addEventListener(
      'error',
      (event) => {
        const target = event.target;
        if (target && target.tagName === 'IMG' && !target.dataset.origemFallbackApplied) {
          target.dataset.origemFallbackApplied = 'true';
          const fallbackAttr = target.getAttribute('data-fallback-src');
          target.src = fallbackAttr || 'assets/logo-origem.svg' || svgDataUri;
        }
      },
      true
    );
  }

  /**
   * 6. INITIALIZE BRAND LOGO & HERO SHOWCASE
   */
  function init(content) {
    if (content) {
      updateBusinessData(content);
    }

    attachImageFallbackGuard();

    const navLogoSlot = document.getElementById('brand-logo-nav');
    if (navLogoSlot) {
      navLogoSlot.innerHTML = getLogoSvg(46);
    }

    renderHeroShowcase();
  }

  // Expose public API
  window.OrigemVisuals = {
    init,
    updateBusinessData,
    getProductArt,
    instagramPosts,
    getLogoSvg,
    switchHeroSlide
  };
})();
