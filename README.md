# Origem Personalizados RS — Landing Page Oficial (`@origempersonalizadosrs`)

Landing Page interativa de alta conversão desenvolvida para a **Origem Personalizados RS** (Capão da Canoa – RS), especializada em **Impressão Digital, Personalização, Criação de Arte, Brindes Corporativos, Comunicação Visual e Papelaria Gráfica**.

> *"Sua ideia, nossa criação! Impressos feitos para deixar sua marca."*

---

## Dados Oficiais da Marca

- **Empresa:** Origem Personalizados RS (`ORIGEM PERSONALIZADOS`)
- **Localização:** Capão da Canoa – RS (Atendimento no Litoral Norte e envio para todo o RS)
- **WhatsApp:** `(51) 98057-7025` — [Link Direto](https://wa.me/message/L34PQGHRXEMLM1)
- **E-mail:** `origempersonalizadosrs@gmail.com`
- **Instagram:** [`@origempersonalizadosrs`](https://www.instagram.com/origempersonalizadosrs/)

---

## Principais Funcionalidades

1. **Hero Interativo com Vitrine 3D/SVG & Partículas em Canvas (`#hero-section`):**
   - Troca interativa de produtos-chefe (Copos Térmicos Inox Gravados a Laser, Calendários 2027 Wire-O, Kit Camisetas & Papelaria, WindBanners & Adesivos).
2. **Catálogo Bento Grid Filtrável (`#catalogo-section`):**
   - 9 categorias detalhadas com filtro instantâneo e botão de orçamento direto no WhatsApp com mensagem personalizada para cada item.
3. **Simulador Rápido de Orçamento em 3 Passos (`#simulador-section`):**
   - Pensado para facilitar o pedido de clientes leigos ou empresas: escolha o produto, a finalidade e se já possui arte pronta, gerando a mensagem pronta para o WhatsApp da Origem.
4. **Portfólio Real & Destaques do Instagram (`#portfolio-section`):**
   - Destaques interativos e vitrine dos trabalhos reais publicados no perfil `@origempersonalizadosrs`.
5. **Animações Premium (GSAP + ScrollTrigger + Lenis):**
   - Scroll suave, contadores animados, inclinação 3D com spotlight nos cards e botões magnéticos.

---

## Estrutura do Projeto

```text
├── index.html                 # Estrutura semântica principal e SEO/OpenGraph
├── css/
│   ├── base.css               # Design tokens, tipografia, navbar, hero, diferenciais
│   ├── visuals.css            # Estilos da vitrine 3D do hero e ilustrações de produtos
│   ├── sections-catalog.css   # Estilos do catálogo Bento, simulador, portfólio, FAQ e footer
│   └── animations.css         # Efeitos 3D tilt, spotlight, reveal states e micro-interações
├── js/
│   ├── product-visuals.js     # Logo vetorial, vitrine interativa do hero e artes SVG dos produtos
│   ├── sections-catalog.js    # Renderização e lógica do catálogo, simulador 3 passos, portfólio e FAQ
│   ├── animations.js          # Lenis smooth scroll, canvas de partículas, GSAP ScrollTrigger e 3D tilt
│   └── main.js                # Inicialização coordenada, menu mobile e navegação
└── assets/
    ├── logo-origem.svg        # Logotipo vetorial oficial Origem Personalizados
    ├── favicon.svg            # Favicon vetorial
    └── instagram/             # Imagens e artes de portfólio do Instagram @origempersonalizadosrs
```
