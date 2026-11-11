/**
 * ============================================================================
 * ORIGEM PERSONALIZADOS RS — Animations, Interactive Canvas, 3D Tilt & GSAP FX
 * Owned by: animations-fx (js/animations.js)
 * Exposes: window.OrigemAnimations = { init, refresh }
 * ============================================================================
 */
(function () {
  'use strict';

  const STATE = {
    initialized: false,
    reducedMotion: false,
    lenis: null,
    scrollVelocity: 0,
    heroCanvasCleanup: null,
    marqueeCleanup: null,
    boundTiltElements: new WeakSet(),
    boundMagneticElements: new WeakSet(),
    boundCounters: new WeakSet(),
    revealedElements: new WeakSet(),
    progressBar: null
  };

  /**
   * Detect prefers-reduced-motion
   */
  function checkReducedMotion() {
    if (typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Helper: Query unique elements matching any of the provided selectors inside a root
   */
  function queryAllUnique(root, selectors) {
    if (!root) return [];
    const seen = new Set();
    const result = [];
    selectors.forEach((sel) => {
      try {
        const nodes = root.querySelectorAll(sel);
        nodes.forEach((node) => {
          if (!seen.has(node)) {
            seen.add(node);
            result.push(node);
          }
        });
      } catch (_) {
        // Ignore invalid selector in fallback list
      }
    });
    return result;
  }

  /**
   * 1. SMOOTH SCROLLING (Lenis + GSAP ScrollTrigger Sync) & Top Scroll Progress Bar
   */
  function initSmoothScroll() {
    // Inject top scroll progress bar if not present
    if (!document.querySelector('.origem-scroll-progress')) {
      const progressWrap = document.createElement('div');
      progressWrap.className = 'origem-scroll-progress';
      progressWrap.setAttribute('aria-hidden', 'true');
      const bar = document.createElement('div');
      bar.className = 'origem-scroll-progress-bar';
      progressWrap.appendChild(bar);
      document.body.appendChild(progressWrap);
      STATE.progressBar = bar;
    } else {
      STATE.progressBar = document.querySelector('.origem-scroll-progress-bar');
    }

    const updateProgressBar = () => {
      if (!STATE.progressBar) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      STATE.progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();

    // Register GSAP ScrollTrigger if available
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    if (STATE.reducedMotion) {
      return;
    }

    // Initialize Lenis if CDN loaded
    if (typeof window.Lenis === 'function' && !STATE.lenis) {
      try {
        const lenis = new window.Lenis({
          duration: 1.12,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.5
        });

        STATE.lenis = lenis;

        lenis.on('scroll', (e) => {
          STATE.scrollVelocity = typeof e?.velocity === 'number' ? e.velocity : 0;
          if (window.ScrollTrigger) {
            window.ScrollTrigger.update();
          }
          updateProgressBar();
        });

        if (window.gsap && window.gsap.ticker) {
          window.gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          window.gsap.ticker.lagSmoothing(0);
        } else {
          const rafLoop = (time) => {
            lenis.raf(time);
            requestAnimationFrame(rafLoop);
          };
          requestAnimationFrame(rafLoop);
        }
      } catch (err) {
        console.warn('[OrigemAnimations] Lenis fallback to native scroll:', err);
      }
    } else {
      // Fallback velocity tracker when Lenis is unavailable
      let lastScrollY = window.scrollY;
      let lastTime = performance.now();
      window.addEventListener(
        'scroll',
        () => {
          const now = performance.now();
          const dt = Math.max(16, now - lastTime);
          const dy = window.scrollY - lastScrollY;
          STATE.scrollVelocity = (dy / dt) * 15;
          lastScrollY = window.scrollY;
          lastTime = now;
        },
        { passive: true }
      );
    }
  }

  /**
   * 2. INTERACTIVE HERO CANVAS (#hero-canvas)
   * Renders 60fps floating sage/mint/gold particles, glowing ambient orbs,
   * and subtle print registration marks (+ crop marks & target rings) that react to mouse movement.
   */
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const heroSection = document.getElementById('hero-section');
    if (!canvas || !heroSection) return;

    if (typeof STATE.heroCanvasCleanup === 'function') {
      STATE.heroCanvasCleanup();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = null;
    let isVisible = true;

    const mouse = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      px: 0,
      py: 0,
      active: false
    };

    // Detect whether hero has a dark or light background for optimal particle contrast
    const detectDarkTheme = () => {
      const bg = window.getComputedStyle(heroSection).backgroundColor || '';
      const match = bg.match(/\d+/g);
      if (match && match.length >= 3) {
        const lum = (0.299 * +match[0] + 0.587 * +match[1] + 0.114 * +match[2]) / 255;
        return lum < 0.45;
      }
      return true;
    };

    let isDarkHero = detectDarkTheme();

    // Brand colors: Sage #8FAF85, Mint #A2C59D, Soft Sage #9DBE93, Warm Gold #D4A359
    const PALETTE = [
      { r: 143, g: 175, b: 133 }, // #8FAF85
      { r: 157, g: 190, b: 147 }, // #9DBE93
      { r: 162, g: 197, b: 157 }, // #A2C59D
      { r: 212, g: 163, b: 89 }   // #D4A359
    ];

    const particles = [];
    const cropMarks = [];
    const glowOrbs = [];

    function resize() {
      const rect = heroSection.getBoundingClientRect();
      width = Math.max(300, rect.width || window.innerWidth);
      height = Math.max(400, rect.height || window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      isDarkHero = detectDarkTheme();
      seedEntities();
    }

    function seedEntities() {
      particles.length = 0;
      cropMarks.length = 0;
      glowOrbs.length = 0;

      const particleCount = width < 768 ? 22 : 40;
      const markCount = width < 768 ? 7 : 13;
      const orbCount = 3;

      // Ambient soft glowing orbs
      for (let i = 0; i < orbCount; i++) {
        const color = PALETTE[i % PALETTE.length];
        glowOrbs.push({
          x: width * (0.2 + i * 0.3),
          y: height * (0.25 + (i % 2) * 0.4),
          radius: Math.min(width, height) * (0.22 + i * 0.06),
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          color,
          alpha: isDarkHero ? 0.08 : 0.11,
          phase: i * 2.1
        });
      }

      // Organic floating particles (dots & tiny diamonds)
      for (let i = 0; i < particleCount; i++) {
        const color = PALETTE[i % PALETTE.length];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseVx: (Math.random() - 0.5) * 0.38,
          baseVy: -0.15 - Math.random() * 0.32,
          size: 1.6 + Math.random() * 2.8,
          color,
          alpha: (isDarkHero ? 0.24 : 0.32) + Math.random() * 0.28,
          depth: 0.3 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2
        });
      }

      // Subtle print registration marks (+ crosshairs & circle targets)
      for (let i = 0; i < markCount; i++) {
        const color = i % 4 === 0 ? PALETTE[3] : PALETTE[0];
        cropMarks.push({
          x: (width / (markCount + 1)) * (i + 1) + (Math.random() - 0.5) * 60,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.004,
          size: 5 + Math.random() * 4.5,
          hasRing: i % 3 === 0,
          color,
          alpha: isDarkHero ? 0.22 : 0.28,
          depth: 0.4 + Math.random() * 0.8
        });
      }
    }

    function drawFrame(now) {
      if (!isVisible) {
        rafId = null;
        return;
      }

      const t = now * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.px = mouse.x * width;
      mouse.py = mouse.y * height;

      const parallaxX = (mouse.x - 0.5) * 34;
      const parallaxY = (mouse.y - 0.5) * 34;

      // 1. Draw soft ambient glowing orbs
      for (let i = 0; i < glowOrbs.length; i++) {
        const orb = glowOrbs[i];
        orb.x += orb.vx + Math.sin(t * 0.4 + orb.phase) * 0.2;
        orb.y += orb.vy + Math.cos(t * 0.35 + orb.phase) * 0.2;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const ox = orb.x + parallaxX * 0.6;
        const oy = orb.y + parallaxY * 0.6;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
        grad.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${orb.alpha})`);
        grad.addColorStop(1, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw organic floating particles & gentle mouse repulsion
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.baseVx + Math.sin(t * 0.9 + p.phase) * 0.15;
        p.y += p.baseVy;

        if (p.y < -12) p.y = height + 12;
        if (p.y > height + 12) p.y = -12;
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        let drawX = p.x + parallaxX * p.depth;
        let drawY = p.y + parallaxY * p.depth;

        if (mouse.active) {
          const dx = drawX - mouse.px;
          const dy = drawY - mouse.py;
          const distSq = dx * dx + dy * dy;
          const maxRadius = 150;
          if (distSq < maxRadius * maxRadius && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxRadius) * 18 * p.depth;
            drawX += (dx / dist) * force;
            drawY += (dy / dist) * force;
          }
        }

        const pulseAlpha = p.alpha * (0.75 + 0.25 * Math.sin(t * 1.8 + p.phase));
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulseAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw subtle print registration crop marks (+) & target rings
      ctx.lineWidth = 1.15;
      for (let i = 0; i < cropMarks.length; i++) {
        const m = cropMarks[i];
        m.x += m.vx;
        m.y += m.vy;
        m.rotation += m.vRot;

        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;
        if (m.y < -20) m.y = height + 20;
        if (m.y > height + 20) m.y = -20;

        let mx = m.x + parallaxX * m.depth * 1.15;
        let my = m.y + parallaxY * m.depth * 1.15;

        let extraScale = 1;
        if (mouse.active) {
          const dx = mx - mouse.px;
          const dy = my - mouse.py;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 1) {
            const factor = 1 - dist / 160;
            mx += (dx / dist) * factor * 14;
            my += (dy / dist) * factor * 14;
            extraScale = 1 + factor * 0.35;
          }
        }

        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(m.rotation);
        ctx.scale(extraScale, extraScale);

        const s = m.size;
        ctx.strokeStyle = `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, ${m.alpha})`;
        ctx.beginPath();
        ctx.moveTo(-s, 0);
        ctx.lineTo(s, 0);
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s);
        ctx.stroke();

        if (m.hasRing) {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.62, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      if (!STATE.reducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    }

    const onPointerMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      mouse.targetX = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      mouse.targetY = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.targetX = 0.5;
      mouse.targetY = 0.5;
    };

    heroSection.addEventListener('pointermove', onPointerMove, { passive: true });
    heroSection.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    let intersectionObserver = null;
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !rafId && !STATE.reducedMotion) {
              rafId = requestAnimationFrame(drawFrame);
            }
          });
        },
        { threshold: 0.01 }
      );
      intersectionObserver.observe(heroSection);
    }

    resize();
    if (STATE.reducedMotion) {
      drawFrame(performance.now());
    } else {
      rafId = requestAnimationFrame(drawFrame);
    }

    STATE.heroCanvasCleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      heroSection.removeEventListener('pointermove', onPointerMove);
      heroSection.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
      if (intersectionObserver) intersectionObserver.disconnect();
    };
  }

  /**
   * Helper: Safely split text nodes inside an element into `.anim-word-wrap > .anim-word`
   * without destroying nested HTML tags (`<em>`, `<span>`, `<br>`, etc.)
   */
  function splitTextNodesIntoWords(element) {
    if (!element || element.dataset.wordsSplit === 'true') {
      return element ? Array.from(element.querySelectorAll('.anim-word')) : [];
    }
    element.dataset.wordsSplit = 'true';

    const wrapNodeWords = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text || !text.trim()) return;
        const frag = document.createDocumentFragment();
        const tokens = text.split(/(\s+)/);
        tokens.forEach((token) => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(token));
          } else {
            const outer = document.createElement('span');
            outer.className = 'anim-word-wrap';
            const inner = document.createElement('span');
            inner.className = 'anim-word';
            inner.textContent = token;
            outer.appendChild(inner);
            frag.appendChild(outer);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName !== 'SCRIPT' &&
        node.tagName !== 'STYLE' &&
        node.tagName !== 'SVG' &&
        !node.classList.contains('anim-word-wrap')
      ) {
        Array.from(node.childNodes).forEach(wrapNodeWords);
      }
    };

    Array.from(element.childNodes).forEach(wrapNodeWords);
    return Array.from(element.querySelectorAll('.anim-word'));
  }

  /**
   * 3. GSAP HERO ENTRANCE & SCROLLTRIGGER ORCHESTRATION
   */
  function initHeroEntrance() {
    const hero = document.getElementById('hero-section');
    if (!hero || STATE.reducedMotion || !window.gsap) return;
    if (hero.dataset.heroAnimated === 'true') return;
    hero.dataset.heroAnimated = 'true';

    const gsap = window.gsap;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Hero Badge
    const badge = queryAllUnique(hero, [
      '.hero-badge',
      '.badge-pill',
      '.eyebrow-badge',
      '[class*="badge"]'
    ]).filter((el) => !el.closest('#hero-showcase-stage'))[0];

    if (badge) {
      tl.fromTo(
        badge,
        { y: -18, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, clearProps: 'transform' },
        0.05
      );
    }

    // 2. Hero Headline Words Reveal
    const headline = hero.querySelector('h1, .hero-title, .hero-headline');
    if (headline) {
      const words = splitTextNodesIntoWords(headline);
      if (words.length > 0) {
        tl.fromTo(
          words,
          { yPercent: 110, opacity: 0, rotateZ: 1.5 },
          {
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 0.72,
            stagger: 0.038,
            ease: 'power4.out',
            clearProps: 'transform'
          },
          0.14
        );
      } else {
        tl.fromTo(
          headline,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, clearProps: 'transform' },
          0.14
        );
      }
    }

    // 3. Subtitle Fade-Up
    const subtitle = queryAllUnique(hero, [
      '.hero-subtitle',
      '.hero-description',
      '.hero-lead',
      '.hero-content > p',
      '.hero-copy > p',
      'h1 + p'
    ]).filter((el) => !el.closest('#hero-showcase-stage'))[0];

    if (subtitle) {
      tl.fromTo(
        subtitle,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.68, clearProps: 'transform' },
        0.38
      );
    }

    // 4. CTA Buttons Pop-In
    const ctas = queryAllUnique(hero, [
      '.hero-actions > *',
      '.hero-ctas > *',
      '.hero-buttons > *',
      '.hero-cta-group > *',
      'a.btn',
      'button.btn'
    ]).filter((el) => !el.closest('#hero-showcase-stage'));

    if (ctas.length > 0) {
      tl.fromTo(
        ctas,
        { y: 20, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          clearProps: 'transform'
        },
        0.5
      );
    }

    // 5. Trust Metrics Bar
    const statItems = queryAllUnique(hero, [
      '.stat-item',
      '.hero-stat',
      '.trust-stat',
      '.metric-item',
      '.hero-metrics > *',
      '.hero-stats > *'
    ]).filter((el) => !el.closest('#hero-showcase-stage'));

    if (statItems.length > 0) {
      tl.fromTo(
        statItems,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          clearProps: 'transform'
        },
        0.62
      );
    }

    // 6. #hero-showcase-stage 3D Entrance
    const stage = document.getElementById('hero-showcase-stage');
    if (stage) {
      tl.fromTo(
        stage,
        {
          opacity: 0,
          y: 34,
          scale: 0.93,
          rotateY: -10,
          rotateX: 6,
          transformPerspective: 1200
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 1.05,
          ease: 'power3.out',
          clearProps: 'transform'
        },
        0.26
      );
    }
  }

  /**
   * Helper: Register scroll-triggered staggered reveals for a group of elements
   */
  function revealBatch(elements, options = {}) {
    if (!elements || elements.length === 0) return;

    const unrevealed = elements.filter((el) => el && !STATE.revealedElements.has(el));
    if (unrevealed.length === 0) return;

    unrevealed.forEach((el) => STATE.revealedElements.add(el));

    if (STATE.reducedMotion || !window.gsap) {
      unrevealed.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const gsap = window.gsap;
    const {
      y = 28,
      scale = 0.98,
      duration = 0.68,
      stagger = 0.08,
      ease = 'power3.out',
      start = 'top 92%'
    } = options;

    if (window.ScrollTrigger && typeof window.ScrollTrigger.batch === 'function') {
      gsap.set(unrevealed, { opacity: 0, y, scale });

      window.ScrollTrigger.batch(unrevealed, {
        start,
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            stagger,
            ease,
            overwrite: true,
            clearProps: 'transform'
          });
        }
      });

      // Safety fallback: if any element is already above the fold or ScrollTrigger doesn't fire within 2.5s when scrolled past
      unrevealed.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.96) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            ease,
            overwrite: 'auto',
            clearProps: 'transform'
          });
        }
      });
    } else {
      gsap.fromTo(
        unrevealed,
        { opacity: 0, y, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          ease,
          clearProps: 'transform'
        }
      );
    }
  }

  /**
   * Orchestrate ScrollTrigger reveals across all page sections
   */
  function initSectionReveals() {
    // 1. #diferenciais-section
    const difSection = document.getElementById('diferenciais-section');
    if (difSection) {
      const headers = queryAllUnique(difSection, ['.section-header']);
      const cards = queryAllUnique(difSection, [
        '.feature-card',
        '.diferencial-card',
        '.benefit-card'
      ]);
      revealBatch(headers, { y: 22, duration: 0.6 });
      revealBatch(cards, { y: 32, scale: 0.96, stagger: 0.1, duration: 0.72 });
    }

    // 2. #catalogo-section (header, filter pills, and .catalog-card items)
    const catSection = document.getElementById('catalogo-section');
    if (catSection) {
      const headers = queryAllUnique(catSection, ['.section-header', '.catalog-header']);
      const filterPills = queryAllUnique(catSection, [
        '.filter-pill',
        '.catalog-tab',
        '.filter-tab',
        '.filter-btn'
      ]);
      const catalogCards = queryAllUnique(catSection, [
        '.catalog-card',
        '.product-card',
        '.bento-card'
      ]);
      const bottomBanner = queryAllUnique(catSection, ['.catalog-bottom-banner']);
      revealBatch(headers, { y: 22, duration: 0.6 });
      revealBatch(filterPills, { y: 14, scale: 0.95, stagger: 0.045, duration: 0.5 });
      revealBatch(catalogCards, { y: 28, scale: 0.97, stagger: 0.065, duration: 0.65 });
      revealBatch(bottomBanner, { y: 22, duration: 0.6 });
    }

    // 3. #simulador-section (interactive configurator steps & preview)
    const simSection = document.getElementById('simulador-section');
    if (simSection) {
      const headers = queryAllUnique(simSection, ['.section-header', '.simulator-header']);
      const simSteps = queryAllUnique(simSection, [
        '.sim-step',
        '.simulator-step',
        '.configurator-step',
        '.sim-preview-card',
        '.simulator-preview'
      ]);
      revealBatch(headers, { y: 22, duration: 0.6 });
      revealBatch(simSteps, { y: 26, scale: 0.98, stagger: 0.09, duration: 0.68 });
    }

    // 4. #portfolio-section (Instagram highlight bubbles and portfolio cards)
    const portSection = document.getElementById('portfolio-section');
    if (portSection) {
      const headers = queryAllUnique(portSection, [
        '.section-header',
        '.ig-profile-card'
      ]);
      const highlights = queryAllUnique(portSection, [
        '.story-highlight',
        '.highlight-item',
        '.ig-highlight'
      ]);
      const portfolioCards = queryAllUnique(portSection, [
        '.portfolio-card',
        '.ig-card',
        '.post-card',
        '.showcase-card'
      ]);
      revealBatch(headers, { y: 22, duration: 0.6 });
      revealBatch(highlights, {
        y: 16,
        scale: 0.88,
        stagger: 0.05,
        duration: 0.55,
        ease: 'back.out(1.4)'
      });
      revealBatch(portfolioCards, { y: 30, scale: 0.96, stagger: 0.08, duration: 0.68 });
    }

    // 5. #como-funciona-section (timeline steps and FAQ items)
    const howSection = document.getElementById('como-funciona-section');
    if (howSection) {
      const headers = queryAllUnique(howSection, [
        '.section-header',
        '.faq-intro-card'
      ]);
      const steps = queryAllUnique(howSection, [
        '.timeline-step',
        '.process-step',
        '.how-step',
        '.step-card',
        '.step-item'
      ]);
      const faqItems = queryAllUnique(howSection, [
        '.faq-item',
        '.accordion-item',
        'details'
      ]);
      revealBatch(headers, { y: 22, duration: 0.6 });
      revealBatch(steps, { y: 28, scale: 0.97, stagger: 0.1, duration: 0.68 });
      revealBatch(faqItems, { y: 18, scale: 0.99, stagger: 0.07, duration: 0.55 });
    }

    // 6. #cta-final-section
    const ctaSection = document.getElementById('cta-final-section');
    if (ctaSection) {
      const ctaTargets = queryAllUnique(ctaSection, [
        '.cta-final-box',
        '.cta-banner',
        '.cta-card'
      ]);
      if (ctaTargets.length > 0) {
        revealBatch(ctaTargets, { y: 24, scale: 0.98, stagger: 0.08, duration: 0.68 });
      } else {
        revealBatch([ctaSection], { y: 24, duration: 0.68 });
      }
    }
  }

  /**
   * 4. INTERACTIVE 3D TILT & RADIAL SPOTLIGHT HOVER EFFECTS
   * Applies to .catalog-card, .feature-card, .portfolio-card, and #hero-showcase-stage
   */
  function decorateCardMicroDetails(card) {
    if (!card || card.id === 'hero-showcase-stage') return;
    if (card.dataset.fxDecorated === 'true') return;
    card.dataset.fxDecorated = 'true';

    // Ensure spotlight border overlay exists
    if (!card.querySelector('.fx-spotlight-border')) {
      const borderOverlay = document.createElement('span');
      borderOverlay.className = 'fx-spotlight-border';
      borderOverlay.setAttribute('aria-hidden', 'true');
      card.appendChild(borderOverlay);
    }

    // Subtle print registration crop marks in top-left and bottom-right corners
    if (!card.querySelector('.fx-crop-mark')) {
      const markTL = document.createElement('span');
      markTL.className = 'fx-crop-mark tl';
      markTL.setAttribute('aria-hidden', 'true');

      const markBR = document.createElement('span');
      markBR.className = 'fx-crop-mark br';
      markBR.setAttribute('aria-hidden', 'true');

      card.appendChild(markTL);
      card.appendChild(markBR);
    }
  }

  function bind3DTiltAndSpotlight() {
    const cards = queryAllUnique(document, [
      '.catalog-card',
      '.feature-card',
      '.diferencial-card',
      '.portfolio-card',
      '.ig-card',
      '.post-card',
      '#hero-showcase-stage'
    ]);

    const isTouchDevice =
      'ontouchstart' in window &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;

    cards.forEach((card) => {
      if (!card || STATE.boundTiltElements.has(card)) return;
      STATE.boundTiltElements.add(card);

      decorateCardMicroDetails(card);

      if (STATE.reducedMotion || isTouchDevice) return;

      const isHeroStage = card.id === 'hero-showcase-stage';
      const maxTilt = isHeroStage ? 5.5 : 6.5;
      const hoverScale = isHeroStage ? 1.005 : 1.015;

      let rafId = null;

      const onPointerMove = (e) => {
        const rect = card.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const normX = Math.min(1, Math.max(0, relX / rect.width));
        const normY = Math.min(1, Math.max(0, relY / rect.height));

        const rotateY = (normX - 0.5) * 2 * maxTilt;
        const rotateX = (0.5 - normY) * 2 * maxTilt;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.setProperty('--mouse-x', `${relX.toFixed(1)}px`);
          card.style.setProperty('--mouse-y', `${relY.toFixed(1)}px`);
          card.style.setProperty('--spotlight-opacity', '1');

          if (window.gsap) {
            window.gsap.to(card, {
              rotateX,
              rotateY,
              scale: hoverScale,
              transformPerspective: 1000,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          } else {
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${hoverScale}, ${hoverScale}, 1)`;
          }
        });
      };

      const onPointerLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.setProperty('--spotlight-opacity', '0');

        if (window.gsap) {
          window.gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'transform'
          });
        } else {
          card.style.transform = '';
        }
      };

      card.addEventListener('pointermove', onPointerMove, { passive: true });
      card.addEventListener('pointerleave', onPointerLeave, { passive: true });
    });
  }

  /**
   * Attach Magnetic Hover Effect to Primary CTA Buttons (.btn-magnetic / .btn-primary)
   */
  function bindMagneticButtons() {
    if (STATE.reducedMotion) return;

    const isTouchDevice =
      'ontouchstart' in window &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const buttons = queryAllUnique(document, [
      '.btn-magnetic',
      '.btn-primary',
      '.btn-whatsapp',
      '#navbar .btn',
      '#hero-section .btn',
      '#cta-final-section .btn'
    ]);

    buttons.forEach((btn) => {
      if (!btn || STATE.boundMagneticElements.has(btn)) return;
      STATE.boundMagneticElements.add(btn);

      const strength = 0.24;
      const maxOffset = 9;

      const onPointerMove = (e) => {
        const rect = btn.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = Math.max(-maxOffset, Math.min(maxOffset, (e.clientX - centerX) * strength));
        const deltaY = Math.max(-maxOffset, Math.min(maxOffset, (e.clientY - centerY) * strength));

        if (window.gsap) {
          window.gsap.to(btn, {
            x: deltaX,
            y: deltaY,
            duration: 0.28,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
        }
      };

      const onPointerLeave = () => {
        if (window.gsap) {
          window.gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
            clearProps: 'transform'
          });
        } else {
          btn.style.transform = '';
        }
      };

      btn.addEventListener('pointermove', onPointerMove, { passive: true });
      btn.addEventListener('pointerleave', onPointerLeave, { passive: true });
    });
  }

  /**
   * 5. ANIMATED NUMBER COUNTERS (.stat-counter) & MARQUEE TICKER (#marquee-banner)
   */
  function initStatCounters() {
    const counters = Array.from(document.querySelectorAll('.stat-counter'));
    if (counters.length === 0) return;

    const animateCounter = (el) => {
      if (el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';

      const rawTargetAttr = el.getAttribute('data-target') || el.getAttribute('data-count');
      const originalText = (el.textContent || '').trim();

      let targetValue = 0;
      let prefix = el.getAttribute('data-prefix') || '';
      let suffix = el.getAttribute('data-suffix') || '';
      let useThousandDot = false;

      if (rawTargetAttr !== null && rawTargetAttr !== '') {
        targetValue = parseFloat(rawTargetAttr.replace(/\./g, '').replace(',', '.')) || 0;
        // Infer prefix/suffix from originalText if not explicitly in data attributes
        if (!prefix && /^[+R$]/.test(originalText)) {
          prefix = originalText.match(/^[+R$\s]+/)?.[0] || '';
        }
        if (!suffix && /[%+kKh★]$/.test(originalText)) {
          suffix = originalText.match(/[+kK%h★]+$/)?.[0] || '';
        }
      } else {
        const match = originalText.match(/^([^\d]*)([\d.,]+)(.*)$/);
        if (match) {
          if (!prefix) prefix = match[1] || '';
          const numStr = match[2];
          if (!suffix) suffix = match[3] || '';
          useThousandDot = /\d\.\d{3}/.test(numStr);
          targetValue = parseFloat(numStr.replace(/\./g, '').replace(',', '.')) || 0;
        }
      }

      if (targetValue >= 1000 && (originalText.includes('.') || el.dataset.format === 'pt-BR')) {
        useThousandDot = true;
      }

      const isFloat = !Number.isInteger(targetValue);

      const formatVal = (val) => {
        if (isFloat) {
          return `${prefix}${val.toFixed(1).replace('.', ',')}${suffix}`;
        }
        const rounded = Math.round(val);
        const formatted = useThousandDot
          ? rounded.toLocaleString('pt-BR')
          : String(rounded);
        return `${prefix}${formatted}${suffix}`;
      };

      if (STATE.reducedMotion || !window.gsap || targetValue <= 0) {
        el.textContent = formatVal(targetValue);
        return;
      }

      const proxy = { val: 0 };
      window.gsap.to(proxy, {
        val: targetValue,
        duration: 1.85,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = formatVal(proxy.val);
        },
        onComplete: () => {
          el.textContent = formatVal(targetValue);
        }
      });
    };

    counters.forEach((counter) => {
      if (STATE.boundCounters.has(counter)) return;
      STATE.boundCounters.add(counter);

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateCounter(counter);
                io.disconnect();
              }
            });
          },
          { threshold: 0.15 }
        );
        io.observe(counter);
      } else {
        animateCounter(counter);
      }
    });
  }

  /**
   * Infinite Marquee Ticker (#marquee-banner) with Scroll-Velocity Speed Modulation
   */
  function initMarqueeTicker() {
    const banner = document.getElementById('marquee-banner');
    if (!banner || banner.dataset.marqueeInitialized === 'true') return;
    banner.dataset.marqueeInitialized = 'true';

    // Find inner track or build one wrapping existing children
    let rail = banner.querySelector(
      '.marquee-track, .marquee-inner, .marquee-content, .fx-marquee-rail'
    );

    if (!rail) {
      rail = document.createElement('div');
      rail.className = 'fx-marquee-rail';
      const group = document.createElement('div');
      group.className = 'fx-marquee-group';
      while (banner.firstChild) {
        group.appendChild(banner.firstChild);
      }
      rail.appendChild(group);
      banner.appendChild(rail);
    } else {
      rail.classList.add('fx-marquee-rail');
    }

    // Remove competing CSS animation on rail so GSAP ticker controls it cleanly
    if (window.gsap && !STATE.reducedMotion) {
      rail.style.animation = 'none';
    }

    // Ensure content is duplicated enough times to fill at least 2x viewport width seamlessly
    const originalHTML = rail.innerHTML;
    if (rail.children.length < 2) {
      rail.insertAdjacentHTML('beforeend', originalHTML);
    }
    if (rail.scrollWidth < window.innerWidth * 2.4) {
      rail.insertAdjacentHTML('beforeend', originalHTML);
    }

    if (STATE.reducedMotion) return;

    if (!window.gsap || !window.gsap.ticker) {
      rail.classList.add('fx-marquee-css-fallback');
      return;
    }

    let xPercent = 0;
    let direction = -1;
    let isHovered = false;
    let currentBoost = 0;
    const baseSpeed = 0.032;

    banner.addEventListener('pointerenter', () => {
      isHovered = true;
    });
    banner.addEventListener('pointerleave', () => {
      isHovered = false;
    });

    const tickMarquee = () => {
      const targetBoost = Math.min(0.18, Math.abs(STATE.scrollVelocity) * 0.008);
      currentBoost += (targetBoost - currentBoost) * 0.08;
      STATE.scrollVelocity *= 0.9;

      if (STATE.scrollVelocity > 0.8) direction = -1;
      else if (STATE.scrollVelocity < -0.8) direction = 1;

      const hoverFactor = isHovered ? 0.3 : 1;
      const step = (baseSpeed + currentBoost) * hoverFactor * direction;
      xPercent += step;

      if (xPercent <= -50) {
        xPercent += 50;
      } else if (xPercent > 0) {
        xPercent -= 50;
      }

      rail.style.transform = `translate3d(${xPercent.toFixed(3)}%, 0, 0)`;
    };

    window.gsap.ticker.add(tickMarquee);
    STATE.marqueeCleanup = () => {
      window.gsap.ticker.remove(tickMarquee);
    };
  }

  /**
   * 6. REFRESH() METHOD
   * Re-binds 3D tilt cards, magnetic buttons, animated counters,
   * animates filtered `.catalog-card` / `.portfolio-card` items,
   * and calls `ScrollTrigger.refresh()`.
   */
  function refresh() {
    try {
      bind3DTiltAndSpotlight();
      bindMagneticButtons();
      initStatCounters();

      // Animate any newly rendered or filtered catalog cards smoothly
      const catSection = document.getElementById('catalogo-section');
      if (catSection) {
        const visibleCards = Array.from(
          catSection.querySelectorAll('.catalog-card, .product-card, .bento-card')
        ).filter((card) => {
          if (card.classList.contains('is-hidden')) return false;
          const style = window.getComputedStyle(card);
          return style.display !== 'none' && style.visibility !== 'hidden';
        });

        const filteringCards = visibleCards.filter((card) =>
          card.classList.contains('fx-filtering-in')
        );
        if (filteringCards.length > 0 && window.gsap) {
          window.gsap.killTweensOf(filteringCards);
          filteringCards.forEach((c) => {
            c.style.opacity = '1';
            c.style.transform = '';
          });
        }

        const freshCards = visibleCards.filter((card) => !STATE.revealedElements.has(card));
        if (freshCards.length > 0) {
          freshCards.forEach((card) => STATE.revealedElements.add(card));
          if (window.gsap && !STATE.reducedMotion) {
            window.gsap.fromTo(
              freshCards,
              { opacity: 0, y: 18, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.45,
                stagger: 0.045,
                ease: 'power2.out',
                overwrite: true,
                clearProps: 'transform'
              }
            );
          } else {
            freshCards.forEach((c) => {
              c.style.opacity = '1';
              c.style.transform = 'none';
            });
          }
        }
      }

      // Also check for any newly added portfolio cards
      const portSection = document.getElementById('portfolio-section');
      if (portSection) {
        const portCards = Array.from(
          portSection.querySelectorAll('.portfolio-card, .ig-card, .post-card, .showcase-card')
        ).filter((card) => !STATE.revealedElements.has(card));
        if (portCards.length > 0) {
          revealBatch(portCards, { y: 20, scale: 0.97, stagger: 0.06, duration: 0.5 });
        }
      }

      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        window.ScrollTrigger.refresh();
      }
      if (STATE.lenis && typeof STATE.lenis.resize === 'function') {
        STATE.lenis.resize();
      }
    } catch (err) {
      console.warn('[OrigemAnimations] refresh warning:', err);
    }
  }

  /**
   * MAIN INITIALIZATION
   */
  function init() {
    STATE.reducedMotion = checkReducedMotion();

    initSmoothScroll();
    initHeroCanvas();
    initHeroEntrance();
    initMarqueeTicker();
    initSectionReveals();
    bind3DTiltAndSpotlight();
    bindMagneticButtons();
    initStatCounters();

    if (!STATE.initialized) {
      STATE.initialized = true;
      window.addEventListener(
        'load',
        () => {
          refresh();
        },
        { once: true }
      );
    }
  }

  // Expose public API required by contract
  window.OrigemAnimations = {
    init,
    refresh,
    get lenis() {
      return STATE.lenis;
    }
  };
})();
