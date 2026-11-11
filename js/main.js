/**
 * ORIGEM PERSONALIZADOS RS — Main Application Orchestrator (js/main.js)
 * Coordinates initialization of Content Store, Visuals, Catalog/Sections, Frete Simulator,
 * Icons, and Animations, plus Navbar state, Mobile Menu, Smooth Anchor Navigation,
 * and Live Dynamic Content Binding.
 */

(function () {
  'use strict';

  function safeCall(label, fn) {
    try {
      if (typeof fn === 'function') {
        fn();
      }
    } catch (err) {
      console.error('[OrigemMain] Error initializing ' + label + ':', err);
    }
  }

  /**
   * Binds dynamic business & hero texts to DOM elements
   * so owner edits in the Admin Panel reflect immediately on the site.
   */
  function updateDomFromContent(content) {
    if (!content) return;

    var b = content.business || {};
    var h = content.hero || {};

    var phone = String(b.whatsapp || '5551980577025').replace(/\D/g, '');
    var waUrl = b.whatsappLink || ('https://wa.me/' + phone + '?text=' + encodeURIComponent('Olá! Vim pelo site da Origem Personalizados RS e gostaria de fazer um orçamento.'));
    var igHandle = String(b.instagram || 'origempersonalizadosrs').replace(/^@/, '');
    var igUrl = 'https://www.instagram.com/' + igHandle + '/';

    // 1. Hero text fields
    var badgeEl = document.getElementById('hero-badge-text');
    if (badgeEl && h.badge) badgeEl.textContent = h.badge;

    var titleEl = document.getElementById('hero-title-text');
    if (titleEl && h.title) titleEl.textContent = h.title;

    var accentEl = document.getElementById('hero-accent-text');
    if (accentEl && h.titleAccent) accentEl.textContent = h.titleAccent;

    var subtitleEl = document.getElementById('hero-subtitle-text');
    if (subtitleEl && h.subtitle) subtitleEl.textContent = h.subtitle;

    // 2. Hero WhatsApp CTA
    var heroWaBtn = document.getElementById('hero-wa-btn');
    if (heroWaBtn) heroWaBtn.href = waUrl;

    // 3. Navbar WhatsApp & Instagram
    var navWaBtn = document.getElementById('navbar-wa-btn');
    if (navWaBtn) navWaBtn.href = waUrl;

    var navIgBtn = document.getElementById('navbar-ig-btn');
    if (navIgBtn) navIgBtn.href = igUrl;

    var navIgHandle = document.getElementById('navbar-ig-handle');
    if (navIgHandle) navIgHandle.textContent = '@' + igHandle;

    // 4. Floating WhatsApp widget
    var floatWaBtn = document.getElementById('wa-float-btn');
    if (floatWaBtn) floatWaBtn.href = waUrl;

    var tooltipLink = document.getElementById('wa-tooltip-link');
    if (tooltipLink) tooltipLink.href = waUrl;

    var tooltipTitle = document.getElementById('wa-tooltip-title');
    if (tooltipTitle && b.name) tooltipTitle.textContent = b.name;
  }

  function initNavbarAndNavigation() {
    var navbar = document.getElementById('navbar');
    var mobileToggle = document.getElementById('mobile-menu-toggle');
    var navLinks = document.querySelectorAll('#navbar-menu .nav-link');

    // Sticky navbar scroll state
    function updateNavbarScroll() {
      if (!navbar) return;
      if (window.scrollY > 28) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', updateNavbarScroll, { passive: true });
    updateNavbarScroll();

    // Mobile menu toggle
    if (mobileToggle && navbar) {
      mobileToggle.addEventListener('click', function () {
        var isOpen = navbar.classList.toggle('menu-open');
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Close mobile menu and smooth-scroll on in-page anchor click
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      if (navbar && navbar.classList.contains('menu-open')) {
        navbar.classList.remove('menu-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }

      var navOffset = navbar ? navbar.offsetHeight : 76;
      var elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      var offsetPosition = Math.max(0, elementPosition - navOffset + 4);

      if (window.OrigemAnimations && window.OrigemAnimations.lenis) {
        window.OrigemAnimations.lenis.scrollTo(targetEl, { offset: -navOffset });
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });

    // Active section spy for navbar links (including #frete-section)
    var sectionIds = [
      'hero-section',
      'diferenciais-section',
      'catalogo-section',
      'simulador-section',
      'frete-section',
      'portfolio-section',
      'como-funciona-section'
    ];

    function updateActiveNavLink() {
      var scrollPos = window.scrollY + 180;
      var currentId = 'hero-section';

      for (var i = 0; i < sectionIds.length; i++) {
        var sec = document.getElementById(sectionIds[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          currentId = sectionIds[i];
        }
      }

      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === '#' + currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();
  }

  function initFloatingWhatsApp() {
    var tooltip = document.getElementById('wa-tooltip');
    var closeBtn = document.getElementById('wa-tooltip-close');

    if (closeBtn && tooltip) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        tooltip.classList.add('is-hidden');
      });
    }
  }

  async function bootstrapApp() {
    // 0. Await Content Store per round 2 shared contract #15
    var content = null;
    if (window.OrigemStore && window.OrigemStore.ready) {
      try {
        content = await window.OrigemStore.ready;
      } catch (err) {
        console.warn('[OrigemMain] OrigemStore.ready error:', err);
        content = (typeof window.OrigemStore.get === 'function') ? window.OrigemStore.get() : null;
      }
    } else if (window.OrigemStore && typeof window.OrigemStore.get === 'function') {
      content = window.OrigemStore.get();
    }

    // Bind dynamic hero & business info to DOM
    updateDomFromContent(content);

    // 1. Initialize Visual Assets (Logo & Hero 3D/SVG Product Showcase)
    safeCall('OrigemVisuals.init', function () {
      if (window.OrigemVisuals && typeof window.OrigemVisuals.init === 'function') {
        window.OrigemVisuals.init(content);
      }
    });

    // 2. Initialize Dynamic Sections & Catalog (Bento Grid, Quote Simulator, Instagram Portfolio, FAQ, Footer)
    safeCall('OrigemCatalog.init', function () {
      if (window.OrigemCatalog && typeof window.OrigemCatalog.init === 'function') {
        window.OrigemCatalog.init(content);
      }
    });

    // 3. Initialize Correios Shipping Simulator
    safeCall('OrigemFrete.init', function () {
      if (window.OrigemFrete && typeof window.OrigemFrete.init === 'function') {
        window.OrigemFrete.init(content);
      }
    });

    // 4. Render Lucide Icons across static + dynamically injected DOM
    safeCall('lucide.createIcons', function () {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });

    // 5. Initialize Navbar, Smooth Anchors, and Floating WhatsApp
    safeCall('NavbarAndNavigation', initNavbarAndNavigation);
    safeCall('FloatingWhatsApp', initFloatingWhatsApp);

    // 6. Initialize GSAP / Lenis / Canvas / 3D Tilt Animations
    safeCall('OrigemAnimations.init', function () {
      if (window.OrigemAnimations && typeof window.OrigemAnimations.init === 'function') {
        window.OrigemAnimations.init();
      }
    });

    // 7. Subscribe to live content updates (dispatched from admin or import)
    if (window.OrigemStore && typeof window.OrigemStore.onChange === 'function') {
      window.OrigemStore.onChange(function (updatedContent) {
        updateDomFromContent(updatedContent);

        if (window.OrigemVisuals && typeof window.OrigemVisuals.updateBusinessData === 'function') {
          window.OrigemVisuals.updateBusinessData(updatedContent);
        }

        if (window.OrigemCatalog) {
          if (typeof window.OrigemCatalog.render === 'function') {
            window.OrigemCatalog.render(updatedContent);
          } else if (typeof window.OrigemCatalog.init === 'function') {
            window.OrigemCatalog.init(updatedContent);
          }
        }

        if (window.OrigemFrete && typeof window.OrigemFrete.render === 'function') {
          window.OrigemFrete.render(updatedContent);
        }

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApp);
  } else {
    bootstrapApp();
  }
})();
