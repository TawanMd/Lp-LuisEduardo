/**
 * Origem Personalizados RS - Admin Panel Logic
 * 
 * IMPORTANT SECURITY NOTE:
 * This is a client-side administration interface running in a static web environment.
 * Client-side authentication provides basic protection for lay administration and should
 * be paired with server-side access control (HTTP Basic Auth, .htaccess, or hosting firewall)
 * if deployed on a publicly indexed server.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. AUTHENTICATION & SECURITY
  // ==========================================================================
  // Precomputed SHA-256 hash of salted credentials
  const AUTH_SALT = 'origem-salt-2027-capao#';
  const STORED_HASH_HEX = '9d4c8b45f65e928bc3d33038487ee69b0ded1de1a127b4a59b74617f01f42897';
  const LOCKOUT_KEY = 'origem_admin_lockout';
  const SESSION_KEY = 'origem_admin_session';
  const MAX_ATTEMPTS = 5;
  const COOLDOWN_MS = 60 * 1000; // 60s cooldown
  const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

  async function computeSha256(text) {
    const enc = new TextEncoder();
    const data = enc.encode(text);
    const hashBuf = await crypto.subtle.digest('SHA-256', data);
    const hashArr = Array.from(new Uint8Array(hashBuf));
    return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function getLockoutState() {
    try {
      const raw = localStorage.getItem(LOCKOUT_KEY);
      if (!raw) return { count: 0, lockedUntil: 0 };
      const parsed = JSON.parse(raw);
      return {
        count: Number(parsed.count) || 0,
        lockedUntil: Number(parsed.lockedUntil) || 0
      };
    } catch (e) {
      return { count: 0, lockedUntil: 0 };
    }
  }

  function recordFailedAttempt() {
    const state = getLockoutState();
    state.count += 1;
    if (state.count >= MAX_ATTEMPTS) {
      state.lockedUntil = Date.now() + COOLDOWN_MS;
    }
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(state));
    return state;
  }

  function resetLockout() {
    localStorage.removeItem(LOCKOUT_KEY);
  }

  function isSessionValid() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const sess = JSON.parse(raw);
      if (sess && sess.expires && sess.expires > Date.now()) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  function saveSession(user) {
    const sessionData = {
      user: user,
      token: 'session_' + Math.random().toString(36).substring(2) + Date.now(),
      expires: Date.now() + SESSION_TTL_MS
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  // ==========================================================================
  // 2. STATE & INITIALIZATION
  // ==========================================================================
  let appContent = null;
  let activeTab = 'products';
  let editingProductId = null;
  let currentUploadedPhotoDataUrl = null;

  document.addEventListener('DOMContentLoaded', async function () {
    // Check initial auth state
    if (isSessionValid()) {
      showAdminView();
    } else {
      showLoginView();
    }

    initAuthListeners();
    initTabListeners();
    initProductListeners();
    initInstagramListeners();
    initShippingListeners();
    initBusinessListeners();
    initPublishListeners();

    // Load content store
    try {
      appContent = await window.OrigemStore.ready;
      renderAll();
    } catch (e) {
      console.error('[Admin] Error initializing content store:', e);
      showToast('Erro ao carregar dados do site', 'danger');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // ==========================================================================
  // 3. AUTH VIEW LOGIC
  // ==========================================================================
  function showLoginView() {
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('admin-view').style.display = 'none';
    checkLockoutAlert();
  }

  function showAdminView() {
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('admin-view').style.display = 'block';
    if (appContent) {
      renderAll();
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function checkLockoutAlert() {
    const alertEl = document.getElementById('login-alert');
    const state = getLockoutState();
    if (state.lockedUntil > Date.now()) {
      const secondsLeft = Math.ceil((state.lockedUntil - Date.now()) / 1000);
      alertEl.className = 'login-alert login-alert-warning show';
      alertEl.textContent = `Muitas tentativas incorretas. Aguarde ${secondsLeft} segundos para tentar novamente.`;
      document.getElementById('btn-login').disabled = true;
      setTimeout(checkLockoutAlert, 1000);
    } else {
      document.getElementById('btn-login').disabled = false;
      if (alertEl.classList.contains('login-alert-warning')) {
        alertEl.className = 'login-alert';
        alertEl.textContent = '';
      }
    }
  }

  function initAuthListeners() {
    const loginForm = document.getElementById('login-form');
    const alertEl = document.getElementById('login-alert');

    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const lockout = getLockoutState();
      if (lockout.lockedUntil > Date.now()) {
        checkLockoutAlert();
        return;
      }

      const userInput = (document.getElementById('login-username').value || '').trim();
      const passInput = document.getElementById('login-password').value || '';

      const normalizedUser = userInput.toUpperCase();
      const stringToHash = `${AUTH_SALT}${normalizedUser}:${passInput}`;
      const hash = await computeSha256(stringToHash);

      if (hash === STORED_HASH_HEX) {
        resetLockout();
        saveSession(normalizedUser);
        alertEl.className = 'login-alert';
        alertEl.textContent = '';
        showAdminView();
        showToast('Bem-vindo ao painel, ' + userInput + '!');
      } else {
        const updatedLockout = recordFailedAttempt();
        alertEl.className = 'login-alert login-alert-danger show';
        if (updatedLockout.lockedUntil > Date.now()) {
          checkLockoutAlert();
        } else {
          const remaining = MAX_ATTEMPTS - updatedLockout.count;
          alertEl.textContent = `Usuário ou senha incorretos. Tentativas restantes: ${remaining}.`;
        }
      }
    });

    document.getElementById('btn-logout').addEventListener('click', function () {
      clearSession();
      showLoginView();
      showToast('Sessão encerrada com sucesso.');
    });

    document.getElementById('btn-quick-save').addEventListener('click', async function () {
      await saveStoreContent();
      showToast('Todas as alterações foram salvas!');
    });
  }

  // ==========================================================================
  // 4. NAVIGATION & TABS
  // ==========================================================================
  function initTabListeners() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });
  }

  function switchTab(tabId) {
    activeTab = tabId;

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${tabId}`);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function renderAll() {
    if (!appContent) return;
    renderProducts();
    renderInstagram();
    renderShipping();
    renderBusiness();
    updateBadges();
  }

  function updateBadges() {
    if (!appContent) return;
    const prodCount = (appContent.products || []).length;
    const instaCount = (appContent.instagramPosts || []).length;
    const bProd = document.getElementById('badge-products-count');
    const bInsta = document.getElementById('badge-instagram-count');
    if (bProd) bProd.textContent = prodCount;
    if (bInsta) bInsta.textContent = instaCount;
  }

  async function saveStoreContent() {
    if (!appContent) return;
    await window.OrigemStore.save(appContent);
    updateBadges();
  }

  // ==========================================================================
  // 5. PRODUCTS LOGIC
  // ==========================================================================
  function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid || !appContent) return;

    const searchTerm = (document.getElementById('filter-products-search')?.value || '').toLowerCase().trim();
    const filterCat = document.getElementById('filter-products-category')?.value || '';

    // Populate category dropdown
    const catSelect = document.getElementById('filter-products-category');
    if (catSelect && catSelect.options.length <= 1) {
      (appContent.categories || []).forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.label;
        catSelect.appendChild(opt);
      });
    }

    // Sort products by order
    const products = [...(appContent.products || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

    grid.innerHTML = '';

    const filtered = products.filter(p => {
      const matchSearch = !searchTerm ||
        (p.name && p.name.toLowerCase().includes(searchTerm)) ||
        (p.description && p.description.toLowerCase().includes(searchTerm)) ||
        (p.badge && p.badge.toLowerCase().includes(searchTerm));
      const matchCat = !filterCat || p.category === filterCat;
      return matchSearch && matchCat;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #fff; border-radius: 16px; border: 1px dashed var(--admin-cream-border);">
          <p style="font-size: 1.1rem; color: var(--admin-text-muted); margin-bottom: 12px;">Nenhum produto encontrado com este filtro.</p>
          <button id="btn-clear-prod-filter" class="btn btn-secondary btn-sm">Limpar Filtros</button>
        </div>
      `;
      document.getElementById('btn-clear-prod-filter')?.addEventListener('click', () => {
        document.getElementById('filter-products-search').value = '';
        document.getElementById('filter-products-category').value = '';
        renderProducts();
      });
      return;
    }

    filtered.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = `product-admin-card ${p.visible === false ? 'is-hidden' : ''}`;
      card.setAttribute('data-id', p.id);

      // Category label
      const catObj = (appContent.categories || []).find(c => c.id === p.category);
      const catLabel = catObj ? catObj.label : (p.category || 'Geral');

      // Visual art or photo
      let visualHtml = '';
      if (p.image) {
        visualHtml = `<img src="${p.image}" alt="${p.name}" class="product-thumb-img" loading="lazy" />`;
      } else if (window.OrigemVisuals && typeof window.OrigemVisuals.getProductArt === 'function') {
        const svgMarkup = window.OrigemVisuals.getProductArt(p.artId || p.id);
        visualHtml = `<div class="product-thumb-svg">${svgMarkup}</div>`;
      } else {
        visualHtml = `<div style="font-size: 3rem;">📦</div>`;
      }

      const priceDisplay = p.priceFrom ? p.priceFrom : '<span style="color: var(--admin-text-light); font-weight: normal;">Preço sob consulta</span>';

      card.innerHTML = `
        <div class="product-card-top">
          ${visualHtml}
          ${p.badge ? `<span class="product-badge-pill">${p.badge}</span>` : ''}
          <span class="product-order-pill">Ordem: ${p.order || (idx + 1)}</span>
        </div>
        <div class="product-card-body">
          <span class="product-category-tag">${catLabel}</span>
          <h3 class="product-card-title">${p.name}</h3>
          <p class="product-card-desc">${p.description || 'Sem descrição cadastrada.'}</p>
          <div class="product-card-price">${priceDisplay}</div>
        </div>
        <div class="product-card-footer">
          <div class="reorder-btns">
            <button class="btn btn-secondary btn-icon-only btn-move-up" title="Mover para cima" ${idx === 0 ? 'disabled' : ''}>
              <i data-lucide="arrow-up" style="width: 15px; height: 15px;"></i>
            </button>
            <button class="btn btn-secondary btn-icon-only btn-move-down" title="Mover para baixo" ${idx === filtered.length - 1 ? 'disabled' : ''}>
              <i data-lucide="arrow-down" style="width: 15px; height: 15px;"></i>
            </button>
          </div>
          <div class="action-btns">
            <button class="btn ${p.visible !== false ? 'btn-secondary' : 'btn-amber'} btn-sm btn-toggle-vis" title="${p.visible !== false ? 'Ocultar do site' : 'Exibir no site'}">
              <i data-lucide="${p.visible !== false ? 'eye' : 'eye-off'}" style="width: 15px; height: 15px;"></i>
            </button>
            <button class="btn btn-primary btn-sm btn-edit-prod">
              <i data-lucide="edit-3" style="width: 15px; height: 15px;"></i> Editar
            </button>
            <button class="btn btn-danger btn-icon-only btn-delete-prod" title="Excluir produto">
              <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
            </button>
          </div>
        </div>
      `;

      // Event handlers for this card
      card.querySelector('.btn-move-up')?.addEventListener('click', () => moveProductOrder(p.id, -1));
      card.querySelector('.btn-move-down')?.addEventListener('click', () => moveProductOrder(p.id, 1));
      card.querySelector('.btn-toggle-vis')?.addEventListener('click', () => toggleProductVisibility(p.id));
      card.querySelector('.btn-edit-prod')?.addEventListener('click', () => openProductModal(p.id));
      card.querySelector('.btn-delete-prod')?.addEventListener('click', () => deleteProduct(p.id));

      grid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function moveProductOrder(productId, delta) {
    const list = [...(appContent.products || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
    const currIdx = list.findIndex(p => p.id === productId);
    if (currIdx === -1) return;
    const targetIdx = currIdx + delta;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    // Swap items
    const temp = list[currIdx];
    list[currIdx] = list[targetIdx];
    list[targetIdx] = temp;

    // Re-assign normalized sequential orders
    list.forEach((item, i) => {
      item.order = i + 1;
    });

    appContent.products = list;
    saveStoreContent();
    renderProducts();
    showToast('Ordem dos produtos atualizada!');
  }

  function toggleProductVisibility(productId) {
    const prod = (appContent.products || []).find(p => p.id === productId);
    if (!prod) return;
    prod.visible = prod.visible === false ? true : false;
    saveStoreContent();
    renderProducts();
    showToast(prod.visible ? `Produto "${prod.name}" agora está visível no site!` : `Produto "${prod.name}" foi ocultado.`);
  }

  function deleteProduct(productId) {
    const prod = (appContent.products || []).find(p => p.id === productId);
    if (!prod) return;
    if (!confirm(`Tem certeza que deseja excluir o produto "${prod.name}"?`)) {
      return;
    }
    appContent.products = appContent.products.filter(p => p.id !== productId);
    saveStoreContent();
    renderProducts();
    showToast(`Produto "${prod.name}" excluído.`);
  }

  function initProductListeners() {
    document.getElementById('btn-add-product').addEventListener('click', () => openProductModal(null));
    document.getElementById('filter-products-search').addEventListener('input', () => renderProducts());
    document.getElementById('filter-products-category').addEventListener('change', () => renderProducts());

    // Modal listeners
    document.getElementById('btn-modal-close').addEventListener('click', closeProductModal);
    document.getElementById('btn-modal-cancel').addEventListener('click', closeProductModal);
    document.getElementById('form-product-edit').addEventListener('submit', handleProductFormSubmit);

    // Photo upload & dropzone
    const dropzone = document.getElementById('dropzone-photo');
    const photoInput = document.getElementById('input-prod-photo');

    dropzone.addEventListener('click', function (e) {
      if (e.target.closest('#btn-remove-photo')) return;
      photoInput.click();
    });

    photoInput.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        processUploadedPhoto(this.files[0]);
      }
    });

    dropzone.addEventListener('dragover', function (e) {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', function () {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processUploadedPhoto(e.dataTransfer.files[0]);
      }
    });

    document.getElementById('btn-remove-photo').addEventListener('click', function (e) {
      e.stopPropagation();
      currentUploadedPhotoDataUrl = '';
      updatePhotoPreviewUI('');
      showToast('Foto removida. O produto usará a arte ilustrativa padrão.');
    });
  }

  function openProductModal(productId) {
    editingProductId = productId;
    const modal = document.getElementById('modal-product');
    const title = document.getElementById('modal-product-title');
    const categorySelect = document.getElementById('edit-prod-category');

    // Populate categories select
    categorySelect.innerHTML = '';
    (appContent.categories || []).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.label;
      categorySelect.appendChild(opt);
    });

    if (productId) {
      title.textContent = 'Editar Produto';
      const p = (appContent.products || []).find(item => item.id === productId);
      if (p) {
        document.getElementById('edit-prod-id').value = p.id;
        document.getElementById('edit-prod-name').value = p.name || '';
        document.getElementById('edit-prod-category').value = p.category || (appContent.categories[0]?.id || 'brindes');
        document.getElementById('edit-prod-badge').value = p.badge || '';
        document.getElementById('edit-prod-price').value = p.priceFrom || '';
        document.getElementById('edit-prod-desc').value = p.description || '';
        document.getElementById('edit-prod-artid').value = p.artId || 'copos-termicos';
        document.getElementById('edit-prod-visible').checked = p.visible !== false;
        currentUploadedPhotoDataUrl = p.image || null;
        updatePhotoPreviewUI(p.image || '');
      }
    } else {
      title.textContent = 'Novo Produto';
      document.getElementById('edit-prod-id').value = '';
      document.getElementById('edit-prod-name').value = '';
      document.getElementById('edit-prod-category').value = appContent.categories[0]?.id || 'brindes';
      document.getElementById('edit-prod-badge').value = '';
      document.getElementById('edit-prod-price').value = '';
      document.getElementById('edit-prod-desc').value = '';
      document.getElementById('edit-prod-artid').value = 'copos-termicos';
      document.getElementById('edit-prod-visible').checked = true;
      currentUploadedPhotoDataUrl = null;
      updatePhotoPreviewUI('');
    }

    modal.classList.add('show');
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeProductModal() {
    const modal = document.getElementById('modal-product');
    modal.classList.remove('show');
    editingProductId = null;
    currentUploadedPhotoDataUrl = null;
  }

  function updatePhotoPreviewUI(dataUrl) {
    const previewWrap = document.getElementById('photo-preview-wrap');
    const previewImg = document.getElementById('photo-preview-img');
    if (dataUrl) {
      previewImg.src = dataUrl;
      previewWrap.style.display = 'inline-block';
    } else {
      previewImg.src = '';
      previewWrap.style.display = 'none';
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function processUploadedPhoto(file) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const MAX_DIM = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP ~0.82 first, fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', 0.82);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        }

        currentUploadedPhotoDataUrl = dataUrl;
        updatePhotoPreviewUI(dataUrl);
        showToast('Foto carregada e otimizada!');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  async function handleProductFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('edit-prod-name').value.trim();
    if (!name) {
      alert('O nome do produto é obrigatório.');
      return;
    }

    const category = document.getElementById('edit-prod-category').value;
    const badge = document.getElementById('edit-prod-badge').value.trim();
    const priceFrom = document.getElementById('edit-prod-price').value.trim();
    const description = document.getElementById('edit-prod-desc').value.trim();
    const artId = document.getElementById('edit-prod-artid').value;
    const visible = document.getElementById('edit-prod-visible').checked;

    if (!appContent.products) {
      appContent.products = [];
    }

    if (editingProductId) {
      // Update existing
      const p = appContent.products.find(item => item.id === editingProductId);
      if (p) {
        p.name = name;
        p.category = category;
        p.badge = badge;
        p.priceFrom = priceFrom;
        p.description = description;
        p.artId = artId;
        p.visible = visible;
        if (currentUploadedPhotoDataUrl !== null) {
          p.image = currentUploadedPhotoDataUrl;
        }
      }
    } else {
      // Add new
      const newId = 'prod-' + Date.now().toString(36);
      const maxOrder = appContent.products.reduce((acc, p) => Math.max(acc, p.order || 0), 0);
      const newProd = {
        id: newId,
        name: name,
        category: category,
        description: description,
        badge: badge,
        priceFrom: priceFrom,
        image: currentUploadedPhotoDataUrl || '',
        artId: artId,
        visible: visible,
        order: maxOrder + 1
      };
      appContent.products.push(newProd);
    }

    await saveStoreContent();
    closeProductModal();
    renderProducts();
    showToast('Produto salvo com sucesso!');
  }

  // ==========================================================================
  // 6. INSTAGRAM LOGIC
  // ==========================================================================
  function renderInstagram() {
    const listEl = document.getElementById('instagram-posts-list');
    if (!listEl || !appContent) return;

    listEl.innerHTML = '';
    const posts = appContent.instagramPosts || [];

    if (posts.length === 0) {
      listEl.innerHTML = `
        <p style="text-align: center; color: var(--admin-text-muted); padding: 24px;">
          Nenhuma publicação cadastrada. Adicione links de posts do seu Instagram acima.
        </p>
      `;
      return;
    }

    posts.forEach((post, idx) => {
      const row = document.createElement('div');
      row.className = `insta-post-row ${post.visible === false ? 'is-hidden' : ''}`;

      // Extract shortcode
      const shortcodeMatch = (post.url || '').match(/(?:p|reel)\/([A-Za-z0-9_-]+)/);
      const shortcode = post.shortcode || (shortcodeMatch ? shortcodeMatch[1] : 'post');

      row.innerHTML = `
        <div class="insta-post-info">
          <div class="insta-post-icon">
            <i data-lucide="instagram" style="width: 22px; height: 22px;"></i>
          </div>
          <div class="insta-post-text">
            <span class="insta-post-code">Código: ${shortcode}</span>
            <input type="text" class="form-input form-input-sm insta-caption-input" value="${post.caption || ''}" placeholder="Legenda do post..." style="font-size: 0.88rem; padding: 6px 10px; width: 100%; max-width: 400px;" />
            <a href="${post.url}" target="_blank" style="font-size: 0.78rem; color: var(--admin-sage-dark); text-decoration: none; margin-top: 2px;">
              Ver no Instagram &rarr;
            </a>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="reorder-btns">
            <button class="btn btn-secondary btn-icon-only btn-insta-up" ${idx === 0 ? 'disabled' : ''} title="Subir">
              <i data-lucide="arrow-up" style="width: 14px; height: 14px;"></i>
            </button>
            <button class="btn btn-secondary btn-icon-only btn-insta-down" ${idx === posts.length - 1 ? 'disabled' : ''} title="Descer">
              <i data-lucide="arrow-down" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
          <button class="btn ${post.visible !== false ? 'btn-secondary' : 'btn-amber'} btn-sm btn-insta-vis" title="${post.visible !== false ? 'Ocultar do site' : 'Exibir no site'}">
            <i data-lucide="${post.visible !== false ? 'eye' : 'eye-off'}" style="width: 14px; height: 14px;"></i>
          </button>
          <button class="btn btn-danger btn-icon-only btn-insta-delete" title="Remover post">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      `;

      // Handlers
      const captionInput = row.querySelector('.insta-caption-input');
      captionInput.addEventListener('change', () => {
        post.caption = captionInput.value.trim();
        saveStoreContent();
        showToast('Legenda atualizada!');
      });

      row.querySelector('.btn-insta-up')?.addEventListener('click', () => {
        if (idx > 0) {
          const temp = posts[idx];
          posts[idx] = posts[idx - 1];
          posts[idx - 1] = temp;
          saveStoreContent();
          renderInstagram();
          showToast('Ordem das publicações atualizada!');
        }
      });

      row.querySelector('.btn-insta-down')?.addEventListener('click', () => {
        if (idx < posts.length - 1) {
          const temp = posts[idx];
          posts[idx] = posts[idx + 1];
          posts[idx + 1] = temp;
          saveStoreContent();
          renderInstagram();
          showToast('Ordem das publicações atualizada!');
        }
      });

      row.querySelector('.btn-insta-vis')?.addEventListener('click', () => {
        post.visible = post.visible === false ? true : false;
        saveStoreContent();
        renderInstagram();
        showToast(post.visible ? 'Publicação ativada no site.' : 'Publicação ocultada.');
      });

      row.querySelector('.btn-insta-delete')?.addEventListener('click', () => {
        if (confirm('Deseja remover esta publicação do site?')) {
          appContent.instagramPosts = posts.filter(item => item !== post);
          saveStoreContent();
          renderInstagram();
          showToast('Publicação removida.');
        }
      });

      listEl.appendChild(row);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function initInstagramListeners() {
    const form = document.getElementById('form-add-instagram');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const rawUrl = document.getElementById('new-insta-url').value.trim();
      const caption = document.getElementById('new-insta-caption').value.trim();

      // Extract shortcode
      const match = rawUrl.match(/(?:p|reel)\/([A-Za-z0-9_-]+)/);
      if (!match) {
        alert('Link do Instagram inválido. Cole um link no formato: https://www.instagram.com/p/CODIGO/');
        return;
      }

      const shortcode = match[1];
      const validUrl = `https://www.instagram.com/p/${shortcode}/`;

      if (!appContent.instagramPosts) {
        appContent.instagramPosts = [];
      }

      const newPost = {
        id: 'post-' + Date.now().toString(36),
        shortcode: shortcode,
        url: validUrl,
        caption: caption,
        visible: true
      };

      appContent.instagramPosts.push(newPost);
      saveStoreContent();
      renderInstagram();

      document.getElementById('new-insta-url').value = '';
      document.getElementById('new-insta-caption').value = '';
      showToast('Publicação do Instagram adicionada!');
    });
  }

  // ==========================================================================
  // 7. SHIPPING (FRETE CORREIOS) LOGIC
  // ==========================================================================
  function renderShipping() {
    if (!appContent || !appContent.shipping) return;
    const s = appContent.shipping;

    document.getElementById('ship-origin-cep').value = s.originCep || '95555000';
    document.getElementById('ship-origin-city').value = s.originCity || 'Capão da Canoa/RS';
    document.getElementById('ship-handling-days').value = s.handlingDays != null ? s.handlingDays : 1;
    document.getElementById('ship-free-threshold').value = s.freeShippingFrom || '';
    document.getElementById('ship-note').value = s.note || '';

    // Services
    const pacSvc = (s.services || []).find(item => item.id === 'pac');
    const sedexSvc = (s.services || []).find(item => item.id === 'sedex');
    document.getElementById('ship-service-pac').checked = pacSvc ? pacSvc.enabled !== false : true;
    document.getElementById('ship-service-sedex').checked = sedexSvc ? sedexSvc.enabled !== false : true;

    // Render Zones Table
    const zonesTbody = document.getElementById('shipping-zones-tbody');
    zonesTbody.innerHTML = '';
    (s.zones || []).forEach((z, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <input type="text" class="form-input form-input-sm zone-label" value="${z.label || ''}" style="width: 170px;" />
        </td>
        <td>
          <input type="text" class="form-input form-input-sm zone-ufs" value="${Array.isArray(z.ufs) ? z.ufs.join(', ') : (z.ufs || '')}" style="width: 150px;" />
        </td>
        <td><input type="number" step="0.10" class="table-input zone-pac-base" value="${z.pac?.base || 0}" /></td>
        <td><input type="number" step="0.10" class="table-input zone-pac-perkg" value="${z.pac?.perKg || 0}" /></td>
        <td><input type="number" class="table-input zone-pac-days" style="width:65px;" value="${z.pac?.days || 0}" /></td>
        <td><input type="number" step="0.10" class="table-input zone-sedex-base" value="${z.sedex?.base || 0}" /></td>
        <td><input type="number" step="0.10" class="table-input zone-sedex-perkg" value="${z.sedex?.perKg || 0}" /></td>
        <td><input type="number" class="table-input zone-sedex-days" style="width:65px;" value="${z.sedex?.days || 0}" /></td>
        <td>
          <button class="btn btn-danger btn-icon-only btn-del-zone" title="Remover Região">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </td>
      `;
      tr.querySelector('.btn-del-zone').addEventListener('click', () => {
        s.zones.splice(idx, 1);
        renderShipping();
      });
      zonesTbody.appendChild(tr);
    });

    // Render Packages Table
    const packTbody = document.getElementById('shipping-packages-tbody');
    packTbody.innerHTML = '';
    (s.packages || []).forEach((p, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" class="form-input form-input-sm pack-label" value="${p.label || ''}" style="width: 250px;" /></td>
        <td><input type="number" step="0.05" class="table-input pack-weight" value="${p.weightKg || 0}" /></td>
        <td><input type="text" class="form-input form-input-sm pack-dims" value="${p.dims || ''}" style="width: 150px;" /></td>
        <td>
          <button class="btn btn-danger btn-icon-only btn-del-pack" title="Remover Pacote">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </td>
      `;
      tr.querySelector('.btn-del-pack').addEventListener('click', () => {
        s.packages.splice(idx, 1);
        renderShipping();
      });
      packTbody.appendChild(tr);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function initShippingListeners() {
    document.getElementById('btn-add-zone').addEventListener('click', function () {
      if (!appContent.shipping) appContent.shipping = {};
      if (!appContent.shipping.zones) appContent.shipping.zones = [];
      appContent.shipping.zones.push({
        id: 'zone-' + Date.now().toString(36),
        label: 'Nova Região',
        ufs: ['RS'],
        pac: { base: 20.00, perKg: 4.00, days: 5 },
        sedex: { base: 35.00, perKg: 6.00, days: 2 }
      });
      renderShipping();
      showToast('Nova região adicionada na tabela.');
    });

    document.getElementById('btn-add-package').addEventListener('click', function () {
      if (!appContent.shipping) appContent.shipping = {};
      if (!appContent.shipping.packages) appContent.shipping.packages = [];
      appContent.shipping.packages.push({
        id: 'pack-' + Date.now().toString(36),
        label: 'Novo Pacote',
        weightKg: 0.5,
        dims: '20x15x10 cm'
      });
      renderShipping();
      showToast('Novo modelo de pacote adicionado.');
    });

    document.getElementById('btn-save-shipping').addEventListener('click', async function () {
      collectAndSaveShipping();
    });
  }

  async function collectAndSaveShipping() {
    if (!appContent.shipping) appContent.shipping = {};
    const s = appContent.shipping;

    s.originCep = document.getElementById('ship-origin-cep').value.replace(/\D/g, '') || '95555000';
    s.originCity = document.getElementById('ship-origin-city').value.trim();
    s.handlingDays = parseInt(document.getElementById('ship-handling-days').value, 10) || 0;
    s.freeShippingFrom = parseFloat(document.getElementById('ship-free-threshold').value) || 0;
    s.note = document.getElementById('ship-note').value.trim();

    // Services
    s.services = [
      { id: 'pac', name: 'PAC', enabled: document.getElementById('ship-service-pac').checked },
      { id: 'sedex', name: 'SEDEX', enabled: document.getElementById('ship-service-sedex').checked }
    ];

    // Read zones
    const zoneRows = document.querySelectorAll('#shipping-zones-tbody tr');
    const newZones = [];
    zoneRows.forEach(tr => {
      const label = tr.querySelector('.zone-label').value.trim();
      const ufsRaw = tr.querySelector('.zone-ufs').value.trim();
      const ufs = ufsRaw.split(',').map(u => u.trim().toUpperCase()).filter(Boolean);

      const pacBase = parseFloat(tr.querySelector('.zone-pac-base').value) || 0;
      const pacPerKg = parseFloat(tr.querySelector('.zone-pac-perkg').value) || 0;
      const pacDays = parseInt(tr.querySelector('.zone-pac-days').value, 10) || 0;

      const sedexBase = parseFloat(tr.querySelector('.zone-sedex-base').value) || 0;
      const sedexPerKg = parseFloat(tr.querySelector('.zone-sedex-perkg').value) || 0;
      const sedexDays = parseInt(tr.querySelector('.zone-sedex-days').value, 10) || 0;

      newZones.push({
        id: label.toLowerCase().replace(/[^a-z0-9]/g, '-') || ('zone-' + Math.random().toString(36).substring(2, 6)),
        label: label,
        ufs: ufs,
        pac: { base: pacBase, perKg: pacPerKg, days: pacDays },
        sedex: { base: sedexBase, perKg: sedexPerKg, days: sedexDays }
      });
    });
    s.zones = newZones;

    // Read packages
    const packRows = document.querySelectorAll('#shipping-packages-tbody tr');
    const newPacks = [];
    packRows.forEach(tr => {
      const label = tr.querySelector('.pack-label').value.trim();
      const weight = parseFloat(tr.querySelector('.pack-weight').value) || 0.1;
      const dims = tr.querySelector('.pack-dims').value.trim();
      newPacks.push({
        id: label.toLowerCase().replace(/[^a-z0-9]/g, '-') || ('pack-' + Math.random().toString(36).substring(2, 6)),
        label: label,
        weightKg: weight,
        dims: dims
      });
    });
    s.packages = newPacks;

    await saveStoreContent();
    renderShipping();
    showToast('Configurações de frete salvas com sucesso!');
  }

  // ==========================================================================
  // 8. BUSINESS & HERO LOGIC
  // ==========================================================================
  function renderBusiness() {
    if (!appContent) return;
    const b = appContent.business || {};
    const h = appContent.hero || {};

    // Business
    document.getElementById('biz-name').value = b.name || '';
    document.getElementById('biz-whatsapp').value = b.whatsapp || '';
    document.getElementById('biz-whatsapp-display').value = b.whatsappDisplay || '';
    document.getElementById('biz-whatsapp-link').value = b.whatsappLink || '';
    document.getElementById('biz-email').value = b.email || '';
    document.getElementById('biz-instagram').value = b.instagram || '';
    document.getElementById('biz-city').value = b.city || '';
    document.getElementById('biz-cep').value = b.cep || '';

    // Hero
    document.getElementById('hero-badge').value = h.badge || '';
    document.getElementById('hero-title').value = h.title || '';
    document.getElementById('hero-title-accent').value = h.titleAccent || '';
    document.getElementById('hero-subtitle').value = h.subtitle || '';
  }

  function initBusinessListeners() {
    document.getElementById('btn-save-business').addEventListener('click', async function () {
      if (!appContent.business) appContent.business = {};
      if (!appContent.hero) appContent.hero = {};

      appContent.business.name = document.getElementById('biz-name').value.trim();
      appContent.business.whatsapp = document.getElementById('biz-whatsapp').value.trim().replace(/\D/g, '');
      appContent.business.whatsappDisplay = document.getElementById('biz-whatsapp-display').value.trim();
      appContent.business.whatsappLink = document.getElementById('biz-whatsapp-link').value.trim();
      appContent.business.email = document.getElementById('biz-email').value.trim();
      appContent.business.instagram = document.getElementById('biz-instagram').value.trim().replace(/^@/, '');
      appContent.business.city = document.getElementById('biz-city').value.trim();
      appContent.business.cep = document.getElementById('biz-cep').value.trim();

      appContent.hero.badge = document.getElementById('hero-badge').value.trim();
      appContent.hero.title = document.getElementById('hero-title').value.trim();
      appContent.hero.titleAccent = document.getElementById('hero-title-accent').value.trim();
      appContent.hero.subtitle = document.getElementById('hero-subtitle').value.trim();

      await saveStoreContent();
      showToast('Dados da empresa e do site salvos com sucesso!');
    });
  }

  // ==========================================================================
  // 9. PUBLISH & BACKUP LOGIC
  // ==========================================================================
  function initPublishListeners() {
    // Export JSON
    document.getElementById('btn-export-json').addEventListener('click', function () {
      const jsonStr = window.OrigemStore.exportJSON();
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Arquivo content.json baixado com sucesso!');
    });

    // Import JSON
    const fileInput = document.getElementById('input-import-json');
    fileInput.addEventListener('change', function () {
      if (!this.files || !this.files[0]) return;
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = async function (e) {
        try {
          const imported = await window.OrigemStore.importJSON(e.target.result);
          appContent = imported;
          renderAll();
          showToast('Arquivo importado com sucesso!');
        } catch (err) {
          alert('Erro ao importar arquivo: ' + err.message);
        }
      };
      reader.readAsText(file);
      this.value = '';
    });

    // Reset Defaults
    document.getElementById('btn-reset-defaults').addEventListener('click', async function () {
      if (confirm('Tem certeza que deseja restaurar as configurações padrão de fábrica? Todas as edições salvas no navegador serão substituídas pelos valores originais.')) {
        appContent = await window.OrigemStore.reset();
        renderAll();
        showToast('Configurações originais de fábrica restauradas!');
      }
    });
  }

  // ==========================================================================
  // 10. TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'danger') {
      toast.style.borderLeftColor = 'var(--admin-red)';
    }

    toast.innerHTML = `
      <i data-lucide="${type === 'danger' ? 'alert-triangle' : 'check-circle-2'}" style="width: 18px; height: 18px; color: ${type === 'danger' ? 'var(--admin-red)' : 'var(--admin-sage)'};"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Trigger transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

})();
