/**
 * ORIGEM PERSONALIZADOS RS — Main Application Orchestrator (js/main.js)
 * Coordinates initialization of Visuals, Catalog/Sections, Icons, and Animations,
 * plus Navbar state, Mobile Menu, Smooth Anchor Navigation, and Floating WhatsApp UI.
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

    // Active section spy for navbar links
    var sectionIds = [
      'hero-section',
      'diferenciais-section',
      'catalogo-section',
      'simulador-section',
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

  function bootstrapApp() {
    // 1. Initialize Visual Assets (Logo & Hero 3D/SVG Product Showcase)
    safeCall('OrigemVisuals.init', function () {
      if (window.OrigemVisuals && typeof window.OrigemVisuals.init === 'function') {
        window.OrigemVisuals.init();
      }
    });

    // 2. Initialize Dynamic Sections & Catalog (Bento Grid, Quote Simulator, Instagram Portfolio, FAQ, Footer)
    safeCall('OrigemCatalog.init', function () {
      if (window.OrigemCatalog && typeof window.OrigemCatalog.init === 'function') {
        window.OrigemCatalog.init();
      }
    });

    // 3. Render Lucide Icons across static + dynamically injected DOM
    safeCall('lucide.createIcons', function () {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });

    // 4. Initialize Navbar, Smooth Anchors, and Floating WhatsApp
    safeCall('NavbarAndNavigation', initNavbarAndNavigation);
    safeCall('FloatingWhatsApp', initFloatingWhatsApp);

    // 5. Initialize GSAP / Lenis / Canvas / 3D Tilt Animations
    safeCall('OrigemAnimations.init', function () {
      if (window.OrigemAnimations && typeof window.OrigemAnimations.init === 'function') {
        window.OrigemAnimations.init();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApp);
  } else {
    bootstrapApp();
  }
})();
