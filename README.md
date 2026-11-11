# Origem Personalizados RS — Landing Page Oficial (`@origempersonalizadosrs`)

Landing Page institucional e comercial de alta performance desenvolvida para a **Origem Personalizados RS** (Capão da Canoa – RS), empresa especializada em **Impressão Digital, Personalização, Criação de Arte, Brindes Corporativos, Comunicação Visual e Papelaria Gráfica**.

> *"Sua ideia, nossa criação! Impressos feitos para deixar sua marca."*

---

## 📍 Dados Frequentes e Fatos Reais da Empresa

- **Razão / Nome:** Origem Personalizados RS (`ORIGEM PERSONALIZADOS`)
- **Cidade / Origem:** Capão da Canoa – RS (Atendimento presencial no Litoral Norte e envio para todo o RS e Brasil)
- **CEP de Origem:** `95555-000`
- **WhatsApp Oficial:** `(51) 98057-7025` — [Link Direto](https://wa.me/message/L34PQGHRXEMLM1)
- **E-mail:** `origempersonalizadosrs@gmail.com`
- **Instagram Oficial:** [`@origempersonalizadosrs`](https://www.instagram.com/origempersonalizadosrs/)
- **Identidade Visual:** Verde Sálvia (`#8FAF85`), Verde Floresta Profundo (`#142418`), Creme Quente (`#F7F9F5`) e Dourado Âmbar (`#D4A359`).

---

## 🚀 Como Executar o Projeto Localmente

O projeto é 100% estático (HTML5, CSS3 moderno, Vanilla JavaScript ES6+), sem dependência de Node.js, compilação ou bundlers pesados.

### 1. Iniciar servidor local HTTP:
Abra o terminal na pasta raiz do projeto e execute:

```bash
# Via Python 3 (recomendado)
python -m http.server 8080

# Ou em outra porta livre:
python -m http.server 8000
```

### 2. Acessar no navegador:
- **Site Principal:** [http://localhost:8080](http://localhost:8080) (ou `http://localhost:8080/index.html`)
- **Painel Administrativo:** [http://localhost:8080/admin.html](http://localhost:8080/admin.html)

---

## 🛠️ Painel Administrativo do Luiz (`/admin.html`)

O site conta com uma área administrativa exclusiva desenvolvida especialmente para o proprietário da gráfica (**Luiz**), com interface simples, botões grandes e termos em português claro.

### Acesso ao Painel:
- **URL:** `/admin.html`
- **Usuário:** `LUIZ` (não diferencia maiúsculas de minúsculas)
- **Senha:** *(Senha segura fornecida diretamente ao proprietário — não exposta publicamente neste repositório)*
- **Segurança:** Autenticação criptográfica no cliente via hash SHA-256 salgado com `crypto.subtle`. Bloqueio temporário automático após 5 tentativas incorretas consecutivas (cooldown de 60s) e sessão com expiração em 2 horas.

### Funcionalidades do Painel:
1. **Produtos:** Cadastrar novos itens, editar nome, descrição, categoria, badge promocional, visibilidade e reordenar. Permite upload de fotos reais diretamente do celular ou computador (com redimensionamento automático via Canvas para WebP/JPEG otimizado até 1200px).
2. **Fotos do Instagram:** Gerenciar os posts reais exibidos na vitrine, colando o link do Instagram, adicionando legendas e alternando a visibilidade.
3. **Frete (Correios):** Configurar dias de manuseio/despacho, frete grátis, ativar/desativar PAC e SEDEX, gerenciar faixas de preço por região/estado e pacotes pré-definidos.
4. **Dados da Empresa & Hero:** Editar WhatsApp, e-mail, Instagram, textos principais do Hero (título, destaque serifado e descrição).
5. **Publicar / Backup:**
   - **Salvamento Local Instantâneo:** Todas as edições feitas no painel são salvas imediatamente no navegador (IndexedDB `origem-content-v1` com fallback em `localStorage`).
   - **Fluxo de Publicação Global:** Para publicar as alterações permanentemente para todos os visitantes do site, o Luiz clica em **"Baixar content.json"** e salva/substitui o arquivo `data/content.json` no repositório. O site lê este arquivo como fonte padrão na inicialização.
   - **Restaurar Padrão:** Botão de um clique para limpar edições locais e redefinir o site para o conteúdo oficial de fábrica.

---

## 📦 Simulador de Frete Correios Integrado (`#frete-section`)

Seção dedicada para cálculo de envio direto de Capão da Canoa – RS para qualquer município do Brasil:
- **Tabela Oficial 2026:** Tarifas reais de PAC e SEDEX com base nas zonas e pesos dos Correios.
- **Consulta de CEP:** Integração com ViaCEP para preenchimento automático de Cidade/UF e tabela de contingência 100% offline cobrindo todos os 27 estados brasileiros por prefixo de CEP.
- **Retirada Local Grátis:** Opção para moradores e clientes de Capão da Canoa e Litoral Norte retirarem o pedido diretamente no balcão sem custos de frete.
- **Confirmação no WhatsApp:** Botão que abre o WhatsApp oficial com mensagem preenchida contendo os dados completos da cotação.

---

## 🎨 Destaques Visuais & Experiência de Uso

- **Hero Centralizado e Symmetrical:** Layout balanceado em 2 colunas para desktops e notebooks (1440px, 1280px, 1024px) com margens laterais idênticas, e empilhamento 100% centralizado em dispositivos móveis e tablets (768px, 390px) sem transbordamento horizontal.
- **Vitrine Interativa com Transição Calma:** Autoplay com rotação lenta (8 segundos por item), pausa ao passar o mouse ou focar pelo teclado, e abas de navegação direta.
- **Transparência e Fatos Reais:** Todas as métricas inventadas ou números fabricados foram removidos da página. Apenas dados e serviços reais da empresa são apresentados.
- **Marquee Ticker Contínuo:** Faixa de produtos em movimento contínuo e suave com pausa em hover.

---

## 📁 Estrutura de Arquivos

```text
├── index.html                 # Página principal da Landing Page
├── admin.html                 # Painel de controle do Luiz (área restrita)
├── README.md                  # Documentação completa do projeto
├── data/
│   └── content.json           # Fonte de dados centralizada do site
├── css/
│   ├── base.css               # Design system, tipografia, navbar, hero e diferenciais
│   ├── visuals.css            # Vitrine interativa de produtos e artes SVG
│   ├── sections-catalog.css   # Catálogo Bento Grid, simulador de orçamento, portfólio e FAQ
│   ├── frete.css              # Estilos do simulador de frete dos Correios
│   ├── admin.css              # Interface visual do painel administrativo
│   └── animations.css         # Animações GSAP, marquee ticker e micro-interações
├── js/
│   ├── content-store.js       # Camada de dados central (window.OrigemStore: IndexedDB/Eventos)
│   ├── product-visuals.js     # Artes vetoriais SVG e vitrine interativa
│   ├── sections-catalog.js    # Lógica do catálogo, simulador em 3 passos e portfólio
│   ├── frete.js               # Lógica de cálculo de frete Correios e integração ViaCEP
│   ├── admin.js               # Lógica de autenticação e CRUD do painel administrativo
│   ├── animations.js          # GSAP ScrollTrigger, Lenis smooth scroll e partículas
│   └── main.js                # Inicializador mestre e sincronização de dados
└── assets/
    ├── logo-origem.svg        # Logotipo vetorial oficial Origem Personalizados RS
    └── favicon.svg            # Favicon do site
```
