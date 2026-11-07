/**
 * FLANKO - Industrial Metal Fittings & Valves Web App
 * Master JavaScript Application
 */

(function () {
  'use strict';

  // Application State
  const state = {
    lang: localStorage.getItem('flanko_lang') || 'uz',
    vatMode: localStorage.getItem('flanko_vat') || 'with_vat', // 'no_vat' | 'with_vat'
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'default',
    selectedVariants: {}, // productId -> variantIndex
    cart: JSON.parse(localStorage.getItem('flanko_cart') || '[]'),
    activeModalProduct: null
  };

  // Translations Dictionary
  const i18n = {
    uz: {
      siteTitle: "YunalGroup — Sanoat Quvurlari va Metall Fitinglar",
      siteSubtitle: "Sanoat armaturalari va fitinglar",
      topQuality: "ГОСТ va EN sertifikatlangan mahsulotlar",
      topDelivery: "O'zbekiston bo'ylab tezkor yetkazib berish",
      topWholesale: "Ulgurji va chakana savdo",
      searchPlaceholder: "Mahsulot nomi, o'lchami yoki DN bo'yicha qidirish...",
      vatWithout: "QQSsiz",
      vatWith: "+12% QQS",
      cartBtn: "Savat / Smeta",
      cartEmpty: "Savatda hozircha mahsulot yo'q",
      cartSubtotal: "Mahsulotlar qiymati (QQSsiz):",
      cartVat: "QQS (12%):",
      cartTotal: "Jami to'lov miqdori:",
      printSmeta: "Smetani chop etish",
      sendTelegram: "Telegram orqali buyurtma",
      clearCart: "Savatni tozalash",
      heroBadge: "Sanoat fitinglari va armaturalar ombori",
      heroTitlePrefix: "YunalGroup — Yuqori Sifatli",
      heroTitleHighlight: "Metall Fitinglar va Quvur Armaturalari",
      heroDesc: "Truboprovodlar, isitish, gaz va suv tarmoqlari uchun 350+ turdagi metall perexodlar, troyiniklar, otvodlar, flaneslar va zapor armaturalari to'g'ridan-to'g'ri birinchi qo'ldan.",
      heroCatalogBtn: "Katalogga o'tish",
      heroPdfBtn: "PDF Katalogni yuklab olish",
      heroFeat1: "Omborda 350+ o'lchamlar doim mavjud",
      heroFeat2: "QQS bilan shartnoma va to'lov",
      heroFeat3: "100% Sifat kafolati va pasportlar",
      heroFeat4: "O'zbekiston bo'ylab jo'natish",
      stats1Label: "Sanoat mahsulotlari turlari",
      stats2Label: "Mavjud o'lchamlar va kalibrlar",
      stats3Label: "ГОСТ / EN sifat standartlari",
      stats4Label: "QQS bilan shaffof narxlar",
      catalogSubtitle: "Mahsulotlar katalogi",
      catalogTitle: "Ombordagi Barcha Metall Fitinglar va Armaturalar",
      catalogDesc: "Kerakli toifani tanlang yoki qidiruv orqali kerakli diametr va standartdagi detalni toping",
      sortDefault: "Saralash: Standart",
      sortPriceAsc: "Narx: Arzondan qimmatga",
      sortPriceDesc: "Narx: Qimmatdan arzonga",
      sortName: "Nomi bo'yicha (A-Z)",
      sortVariants: "Razmerlar soni ko'pligi bo'yicha",
      resultsFound: "ta mahsulot topildi",
      sizeLabel: "O'lchamni tanlang:",
      sizesCount: "ta o'lcham",
      priceBase: "Asosiy narxi:",
      priceWithVat: "QQS bilan:",
      btnAllSizes: "Barcha razmerlar",
      btnAddToCart: "Savatga qo'shish",
      modalSpecsTitle: "Texnik ko'rsatkichlari:",
      modalTableNo: "№",
      modalTableSize: "O'lchami / Parametri",
      modalTablePrice: "Narxi (QQSsiz)",
      modalTableVat: "Narxi (+12% QQS bilan)",
      modalTableAction: "Amal",
      addedToCart: "Savatga qo'shildi!",
      smetaPrinted: "Smeta chop etish oynasi ochildi",
      pdfPage: "Katalog sahifasi:",
      aboutSubtitle: "Nima uchun biz?",
      aboutTitle: "YunalGroup bilan hamkorlik afzalliklari",
      about1Title: "Katta Ombor va Tezkor Yetkazish",
      about1Text: "Barcha 27 toifadagi detallar va 350+ o'lchamlar Toshkent omborimizda doimiy zaxirada mavjud. Katta obyektlar uchun kechiktirmasdan yetkazib beramiz.",
      about2Title: "Sertifikatlangan Sifat (ГОСТ & EN)",
      about2Text: "Har bir mahsulot metall sifat sertifikati va texnik pasportga ega. Yuqori bosim va haroratga to'liq javob beradi.",
      about3Title: "QQS Bilan Rasmiy Shartnoma",
      about3Text: "Qurilish kompaniyalari, zavodlar va montaj tashkilotlari uchun 12% QQS bilan to'liq hisob-faktura va qonuniy kafolat taqdim etiladi.",
      orderTitle: "Tezkor Narx So'rovi va Smeta Olish",
      orderDesc: "Loyihangiz yoki spetsifikatsiyangiz bormi? Telefon raqamingizni qoldiring, mutaxassisimiz 10 daqiqada sizga eng ma'qul narx taklifini taqdim etadi.",
      formName: "Ismingiz:",
      formPhone: "Telefon raqamingiz:",
      formComment: "Qo'shimcha izoh yoki kerakli o'lchamlar:",
      formSubmit: "Tijoriy taklif olish",
      formSuccess: "Arizangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.",
      footerDesc: "Sanoat va qurilish quvurlari uchun yuqori sifatli metall fitinglar, flaneslar va armaturalar ulgurji markazi. 2 yillik tajriba, 350+ xil tovar, 12 oy kafolat.",
      footerSections: "Bo'limlar",
      footerContacts: "Aloqa va Manzil",
      footerAddress: "Toshkent tuman, Oltintepa, Qalbinur mebel zdaniyasida",
      footerWorkingHours: "Har kuni: 09:00 — 21:00"
    },
    ru: {
      siteTitle: "YunalGroup — Промышленные Трубы и Металлическая Арматура",
      siteSubtitle: "Промышленная трубопроводная арматура",
      topQuality: "Сертифицированная продукция ГОСТ и EN",
      topDelivery: "Оперативная доставка по всему Узбекистану",
      topWholesale: "Оптовые и розничные поставки",
      searchPlaceholder: "Поиск по названию, размеру или Ду...",
      vatWithout: "Без НДС",
      vatWith: "+12% с НДС",
      cartBtn: "Корзина / Смета",
      cartEmpty: "В корзине пока нет товаров",
      cartSubtotal: "Сумма товаров (без НДС):",
      cartVat: "НДС (12%):",
      cartTotal: "Итого к оплате:",
      printSmeta: "Печать сметы (КП)",
      sendTelegram: "Заказ через Telegram",
      clearCart: "Очистить корзину",
      heroBadge: "Склад промышленной арматуры и фитингов",
      heroTitlePrefix: "YunalGroup — Надежная",
      heroTitleHighlight: "Трубопроводная Арматура и Фитинги",
      heroDesc: "Более 350 типоразмеров стальных переходов, тройников, отводов, фланцев, затворов и компенсаторов для систем отопления, газа и водоснабжения напрямую со склада.",
      heroCatalogBtn: "Перейти в каталог",
      heroPdfBtn: "Скачать PDF Каталог",
      heroFeat1: "350+ типоразмеров всегда в наличии",
      heroFeat2: "Договор и оплата с НДС 12%",
      heroFeat3: "100% Гарантия качества и сертификаты",
      heroFeat4: "Доставка по всему Узбекистану",
      stats1Label: "Категорий продукции",
      stats2Label: "Типоразмеров и калибров",
      stats3Label: "Стандарты качества ГОСТ / EN",
      stats4Label: "Прозрачные цены с НДС",
      catalogSubtitle: "Каталог продукции",
      catalogTitle: "Все Металлические Фитинги и Арматура на Складе",
      catalogDesc: "Выберите нужную категорию или воспользуйтесь поиском для подбора диаметров и стандартов",
      sortDefault: "Сортировка: По умолчанию",
      sortPriceAsc: "Цена: от дешевых к дорогим",
      sortPriceDesc: "Цена: от дорогих к дешевым",
      sortName: "По названию (А-Я)",
      sortVariants: "По количеству размеров",
      resultsFound: "товаров найдено",
      sizeLabel: "Выберите размер:",
      sizesCount: "размеров",
      priceBase: "Цена без НДС:",
      priceWithVat: "Цена с НДС:",
      btnAllSizes: "Все размеры",
      btnAddToCart: "В корзину",
      modalSpecsTitle: "Технические характеристики:",
      modalTableNo: "№",
      modalTableSize: "Размер / Параметры",
      modalTablePrice: "Цена/ед",
      modalTableVat: "Цена/ед + 12% НДС",
      modalTableAction: "Действие",
      addedToCart: "Товар добавлен в корзину!",
      smetaPrinted: "Окно печати сметы открыто",
      pdfPage: "Страница каталога:",
      aboutSubtitle: "Почему мы?",
      aboutTitle: "Преимущества сотрудничества с YunalGroup",
      about1Title: "Собственный Склад и Быстрая Отгрузка",
      about1Text: "Все 27 категорий деталей и более 350 размеров постоянно в наличии на складе в Ташкенте. Комплектация и отгрузка в кратчайшие сроки.",
      about2Title: "Сертифицированное Качество (ГОСТ и EN)",
      about2Text: "Каждая партия сопровождается сертификатами качества металлопроката и паспортами изделий. Надежность на долгие годы.",
      about3Title: "Официальный Договор с НДС",
      about3Text: "Работаем с юр. лицами, заводами и строительными компаниями. Предоставляем электронные счета-фактуры с НДС 12%.",
      orderTitle: "Быстрый Расчет Сметы и Заказ",
      orderDesc: "Отправьте вашу спецификацию или оставьте номер телефона, и наш инженер подготовит коммерческое предложение за 10 минут.",
      formName: "Ваше имя:",
      formPhone: "Номер телефона:",
      formComment: "Комментарий или список нужных диаметров:",
      formSubmit: "Получить расчет",
      formSuccess: "Ваша заявка принята! Мы свяжемся с вами в течение 10 минут.",
      footerDesc: "Оптовый центр промышленной трубопроводной арматуры, стальных фланцев и соединений. 2 года на рынке, 350+ видов продукции, 12 месяцев гарантии.",
      footerSections: "Разделы",
      footerContacts: "Контакты и Адрес",
      footerAddress: "Ташкентский район, Олтинтепа, здание мебели Калбинур",
      footerWorkingHours: "Ежедневно: 09:00 — 21:00"
    }
  };

  // Helper: Format Currency (e.g. 1 250 000 so'm)
  function formatMoney(amount) {
    if (typeof amount !== 'number') return '0';
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // Get current active translation
  function t(key) {
    return i18n[state.lang][key] || key;
  }

  // Save Cart to localStorage
  function saveCart() {
    localStorage.setItem('flanko_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  // Show Toast Notification
  function showToast(message, icon = 'bi-check-circle-fill') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="bi ${icon}" style="color: var(--cyan-light); font-size: 1.1rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // Initialize selected variants for products (default to first variant)
  function initVariants() {
    if (!window.FLANKO_DATA || !window.FLANKO_DATA.products) return;
    window.FLANKO_DATA.products.forEach(p => {
      if (state.selectedVariants[p.id] === undefined) {
        state.selectedVariants[p.id] = 0;
      }
    });
  }

  // Update Cart Badge and Drawer UI
  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vatAmount = state.cart.reduce((sum, item) => sum + ((item.priceVat - item.price) * item.qty), 0);
    const grandTotal = subtotal + vatAmount;

    // Badges in navbar
    const badgeEl = document.getElementById('cart-badge');
    const sumEl = document.getElementById('cart-sum');
    if (badgeEl) {
      badgeEl.textContent = totalCount;
      badgeEl.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    if (sumEl) {
      sumEl.textContent = totalCount > 0 ? formatMoney(state.vatMode === 'with_vat' ? grandTotal : subtotal) + " so'm" : "";
    }

    // Drawer items list
    const itemsContainer = document.getElementById('cart-items-list');
    const cartFooter = document.getElementById('cart-drawer-footer');
    if (!itemsContainer) return;

    if (state.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <i class="bi bi-cart-x" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--metal-gray);"></i>
          <p style="font-size: 0.95rem;">${t('cartEmpty')}</p>
        </div>
      `;
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    if (cartFooter) cartFooter.style.display = 'flex';

    itemsContainer.innerHTML = state.cart.map((item, index) => {
      const unitPrice = state.vatMode === 'with_vat' ? item.priceVat : item.price;
      const lineTotal = unitPrice * item.qty;
      const title = state.lang === 'uz' ? (item.titleUz || item.titleRu) : item.titleRu;

      return `
        <div class="cart-item" data-index="${index}">
          <img src="${item.image}" alt="${title}" class="cart-item-img">
          <div class="cart-item-info">
            <span class="cart-item-title">${title}</span>
            <span class="cart-item-size"><i class="bi bi-rulers"></i> ${item.size}</span>
            <span class="cart-item-unit-price">${formatMoney(unitPrice)} so'm / dona</span>
            <div class="cart-item-qty-row">
              <button class="qty-btn" onclick="window.yunalApp.updateQty(${index}, -1)">-</button>
              <input type="text" class="qty-input" value="${item.qty}" readonly>
              <button class="qty-btn" onclick="window.yunalApp.updateQty(${index}, 1)">+</button>
            </div>
          </div>
          <div class="cart-item-total-col">
            <button class="cart-item-remove-btn" onclick="window.yunalApp.removeFromCart(${index})" title="O'chirish">
              <i class="bi bi-trash3"></i>
            </button>
            <span class="cart-item-subtotal">${formatMoney(lineTotal)} so'm</span>
          </div>
        </div>
      `;
    }).join('');

    // Summary in drawer
    const subtotalEl = document.getElementById('cart-calc-subtotal');
    const vatEl = document.getElementById('cart-calc-vat');
    const totalEl = document.getElementById('cart-calc-total');

    if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal) + " so'm";
    if (vatEl) vatEl.textContent = formatMoney(vatAmount) + " so'm";
    if (totalEl) totalEl.textContent = formatMoney(grandTotal) + " so'm";
  }

  // Add Item to Cart
  function addToCart(productId, variantIndex, qty = 1) {
    const product = window.FLANKO_DATA.products.find(p => p.id === productId);
    if (!product || !product.variants[variantIndex]) return;

    const variant = product.variants[variantIndex];
    const existingIndex = state.cart.findIndex(item => item.id === productId && item.size === variant.size);

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += qty;
    } else {
      state.cart.push({
        id: product.id,
        titleRu: product.titleRu,
        titleUz: product.titleUz,
        image: product.image,
        category: product.category,
        size: variant.size,
        price: variant.price,
        priceVat: variant.priceVat,
        qty: qty
      });
    }

    saveCart();
    showToast(`${t('addedToCart')} (${variant.size})`);
  }

  // Update Item Quantity in Cart
  function updateQty(index, delta) {
    if (!state.cart[index]) return;
    state.cart[index].qty += delta;
    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
  }

  // Remove Item from Cart
  function removeFromCart(index) {
    if (!state.cart[index]) return;
    state.cart.splice(index, 1);
    saveCart();
  }

  // Clear All Cart
  function clearCart() {
    if (confirm(state.lang === 'uz' ? "Haqiqatan ham savatni tozalaysizmi?" : "Действительно очистить корзину?")) {
      state.cart = [];
      saveCart();
    }
  }

  // Filter & Sort Products
  function getFilteredProducts() {
    if (!window.FLANKO_DATA || !window.FLANKO_DATA.products) return [];
    let list = [...window.FLANKO_DATA.products];

    // Filter by Category
    if (state.activeCategory !== 'all') {
      list = list.filter(p => p.category === state.activeCategory);
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const titleRuMatch = p.titleRu && p.titleRu.toLowerCase().includes(q);
        const titleUzMatch = p.titleUz && p.titleUz.toLowerCase().includes(q);
        const categoryMatch = p.categoryRu.toLowerCase().includes(q) || p.categoryUz.toLowerCase().includes(q);
        const variantMatch = p.variants.some(v => v.size.toLowerCase().includes(q));
        const specsMatch = Object.values(p.specs || {}).some(s => s.toLowerCase().includes(q));
        return titleRuMatch || titleUzMatch || categoryMatch || variantMatch || specsMatch;
      });
    }

    // Sort
    if (state.sortBy === 'price_asc') {
      list.sort((a, b) => a.minPrice - b.minPrice);
    } else if (state.sortBy === 'price_desc') {
      list.sort((a, b) => b.minPrice - a.minPrice);
    } else if (state.sortBy === 'name') {
      list.sort((a, b) => {
        const nameA = state.lang === 'uz' ? a.titleUz : a.titleRu;
        const nameB = state.lang === 'uz' ? b.titleUz : b.titleRu;
        return nameA.localeCompare(nameB);
      });
    } else if (state.sortBy === 'variants') {
      list.sort((a, b) => b.variants.length - a.variants.length);
    }

    return list;
  }

  // Render Category Tabs
  function renderCategories() {
    const container = document.getElementById('category-tabs');
    if (!container || !window.FLANKO_DATA) return;

    const counts = {};
    window.FLANKO_DATA.products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    container.innerHTML = window.FLANKO_DATA.categories.map(cat => {
      const isActive = cat.id === state.activeCategory ? 'active' : '';
      const name = state.lang === 'uz' ? cat.nameUz : cat.nameRu;
      const count = cat.id === 'all' ? window.FLANKO_DATA.products.length : (counts[cat.id] || 0);

      return `
        <button class="category-tab-btn ${isActive}" data-category="${cat.id}">
          <i class="bi ${cat.icon}"></i>
          <span>${name}</span>
          <span class="category-tab-count">${count}</span>
        </button>
      `;
    }).join('');

    // Attach listeners
    container.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.getAttribute('data-category');
        renderCategories();
        renderProducts();
      });
    });
  }

  // Render Product Cards Grid
  function renderProducts() {
    const grid = document.getElementById('products-grid');
    const resultsCountEl = document.getElementById('results-count');
    if (!grid) return;

    const products = getFilteredProducts();

    if (resultsCountEl) {
      resultsCountEl.innerHTML = `<strong>${products.length}</strong> ${t('resultsFound')}`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="catalog-empty">
          <i class="bi bi-search"></i>
          <h3 style="color: #fff; margin-bottom: 8px;">${state.lang === 'uz' ? "Mahsulot topilmadi" : "Ничего не найдено"}</h3>
          <p style="color: var(--metal-silver);">${state.lang === 'uz' ? "Qidiruv so'zini o'zgartirib ko'ring yoki toifani 'Barchasi' ga o'tkazing." : "Попробуйте изменить запрос или выберите другую категорию."}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(product => {
      const selectedIndex = state.selectedVariants[product.id] || 0;
      const currentVariant = product.variants[selectedIndex] || product.variants[0];
      const title = state.lang === 'uz' ? product.titleUz : product.titleRu;
      const subTitle = state.lang === 'uz' ? product.titleRu : product.titleUz;
      const categoryName = state.lang === 'uz' ? product.categoryUz : product.categoryRu;

      const basePrice = formatMoney(currentVariant.price);
      const vatPrice = formatMoney(currentVariant.priceVat);

      // Displayed price based on VAT toggle
      const mainPriceDisplay = state.vatMode === 'with_vat' ? vatPrice : basePrice;
      const mainPriceLabel = state.vatMode === 'with_vat' ? t('vatWith') : t('vatWithout');
      const subPriceDisplay = state.vatMode === 'with_vat' ? `${basePrice} so'm (${t('vatWithout')})` : `${vatPrice} so'm (${t('vatWith')})`;

      // Build options for select
      const optionsHtml = product.variants.map((v, i) => {
        const isSel = i === selectedIndex ? 'selected' : '';
        const pStr = state.vatMode === 'with_vat' ? formatMoney(v.priceVat) : formatMoney(v.price);
        return `<option value="${i}" ${isSel}>${v.size} — ${pStr} so'm</option>`;
      }).join('');

      return `
        <div class="product-card" id="card-${product.id}">
          <div class="card-image-box" onclick="window.yunalApp.openModal('${product.id}')">
            <span class="card-badge-top-left">${product.specs.material ? product.specs.material.split('/')[0] : 'СТАЛЬ'}</span>
            <span class="card-badge-page"><i class="bi bi-file-earmark-pdf"></i> ${t('pdfPage')} ${product.pdfPages}</span>
            <img src="${product.image}" alt="${title}" class="card-img" loading="lazy">
            <div class="card-zoom-icon" title="${t('btnAllSizes')}">
              <i class="bi bi-arrows-fullscreen"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="card-category-name">${categoryName}</div>
            <h3 class="card-title" onclick="window.yunalApp.openModal('${product.id}')">${title}</h3>
            <div class="card-title-sub">${subTitle}</div>

            <div class="card-variant-selector-box">
              <div class="variant-selector-label">
                <span>${t('sizeLabel')}</span>
                <span class="variant-count-badge">${product.variants.length} ${t('sizesCount')}</span>
              </div>
              <select class="card-variant-select" onchange="window.yunalApp.onVariantChange('${product.id}', this.value)">
                ${optionsHtml}
              </select>
            </div>

            <div class="card-price-block">
              <div class="price-col">
                <span class="price-meta-label">${mainPriceLabel}</span>
                <div class="price-main">${mainPriceDisplay} <span style="font-size: 0.85rem; font-weight: normal; color: var(--metal-silver);">so'm</span></div>
                <div class="price-vat-sub">${subPriceDisplay}</div>
              </div>
            </div>

            <div class="card-actions">
              <button class="btn-card-more" onclick="window.yunalApp.openModal('${product.id}')">
                <i class="bi bi-table"></i>
                <span>${t('btnAllSizes')}</span>
              </button>
              <button class="btn-card-buy" onclick="window.yunalApp.addToCart('${product.id}', ${selectedIndex})">
                <i class="bi bi-cart-plus"></i>
                <span>${t('btnAddToCart')}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Handle Variant Dropdown Change in Card
  function onVariantChange(productId, variantIndex) {
    state.selectedVariants[productId] = parseInt(variantIndex, 10);
    renderProducts();
  }

  // Open Product Detail Modal
  function openModal(productId) {
    const product = window.FLANKO_DATA.products.find(p => p.id === productId);
    if (!product) return;

    state.activeModalProduct = product;
    const modal = document.getElementById('product-modal');
    if (!modal) return;

    const title = state.lang === 'uz' ? product.titleUz : product.titleRu;
    const subTitle = state.lang === 'uz' ? product.titleRu : product.titleUz;
    const categoryName = state.lang === 'uz' ? product.categoryUz : product.categoryRu;
    const desc = state.lang === 'uz' ? product.descriptionUz : product.descriptionRu;

    // Set modal elements
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-img').alt = title;
    document.getElementById('modal-cat').textContent = categoryName;
    document.getElementById('modal-page').innerHTML = `<i class="bi bi-file-earmark-pdf"></i> ${t('pdfPage')} ${product.pdfPages}`;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-title-sub').textContent = subTitle;
    document.getElementById('modal-desc').textContent = desc;

    // Specs table
    const specsTable = document.getElementById('modal-specs-table');
    if (specsTable) {
      specsTable.innerHTML = Object.entries(product.specs || {}).map(([key, val]) => `
        <tr>
          <td>${key.toUpperCase()}</td>
          <td>${val}</td>
        </tr>
      `).join('');
    }

    // Variants table
    const tbody = document.getElementById('modal-variants-tbody');
    if (tbody) {
      tbody.innerHTML = product.variants.map((v, i) => `
        <tr>
          <td style="color: var(--text-muted); font-family: var(--font-mono);">${i + 1}</td>
          <td><strong style="color: #fff;">${v.size}</strong></td>
          <td class="td-price">${formatMoney(v.price)} so'm</td>
          <td class="td-vat">${formatMoney(v.priceVat)} so'm</td>
          <td style="text-align: right;">
            <button class="btn-table-add" onclick="window.yunalApp.addToCart('${product.id}', ${i})">
              <i class="bi bi-cart-plus"></i> ${t('btnAddToCart')}
            </button>
          </td>
        </tr>
      `).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Product Detail Modal
  function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Cart Drawer Open/Close
  function openCartDrawer() {
    const drawerOverlay = document.getElementById('cart-drawer-overlay');
    if (drawerOverlay) {
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    const drawerOverlay = document.getElementById('cart-drawer-overlay');
    if (drawerOverlay) {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Print Smeta / Commercial Offer
  function printSmeta() {
    if (state.cart.length === 0) {
      alert(t('cartEmpty'));
      return;
    }

    const printContainer = document.getElementById('print-smeta-sheet');
    if (!printContainer) return;

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vatAmount = state.cart.reduce((sum, item) => sum + ((item.priceVat - item.price) * item.qty), 0);
    const grandTotal = subtotal + vatAmount;
    const dateStr = new Date().toLocaleDateString(state.lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const rowsHtml = state.cart.map((item, idx) => `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${idx + 1}</td>
        <td style="border: 1px solid #ccc; padding: 8px;"><strong>${item.titleRu}</strong></td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.size}</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.qty} шт</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${formatMoney(item.price)} сум</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${formatMoney(item.priceVat)} сум</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold;">${formatMoney(item.priceVat * item.qty)} сум</td>
      </tr>
    `).join('');

    printContainer.innerHTML = `
      <div style="font-family: Arial, sans-serif; color: #111; max-width: 900px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px;">
          <div>
            <h1 style="margin: 0; font-size: 26px; color: #0f172a; letter-spacing: 2px;">YUNALGROUP</h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: #555;">Промышленная трубопроводная арматура и металлоизделия</p>
            <p style="margin: 2px 0 0; font-size: 12px; color: #777;">г. Ташкент, Олтинтепа, здание Калбинур | Тел: +998 (99) 871-03-27 | Telegram: @Bobur8710327</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 18px; color: #0284c7;">СМЕТА / КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ</h2>
            <p style="margin: 4px 0 0; font-size: 13px; color: #555;">Дата: ${dateStr}</p>
            <p style="margin: 2px 0 0; font-size: 12px; color: #777;">№ YG-${Date.now().toString().slice(-6)}</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="border: 1px solid #ccc; padding: 8px; width: 40px;">№</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Наименование товара</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Размер</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Кол-во</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Цена без НДС</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Цена с НДС 12%</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Сумма с НДС</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
          <div style="width: 320px; font-size: 14px;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span>Итого без НДС:</span>
              <span>${formatMoney(subtotal)} сум</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #0284c7;">
              <span>НДС (12%):</span>
              <span>${formatMoney(vatAmount)} сум</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; font-weight: bold; font-size: 16px; border-top: 1px solid #000;">
              <span>ВСЕГО К ОПЛАТЕ:</span>
              <span>${formatMoney(grandTotal)} сум</span>
            </div>
          </div>
        </div>

        <div style="margin-top: 60px; display: flex; justify-content: space-between; font-size: 13px;">
          <div style="border-top: 1px solid #555; width: 220px; text-align: center; padding-top: 8px;">
            Отпустил: Bobur (+998 99 871-03-27)
          </div>
          <div style="border-top: 1px solid #555; width: 220px; text-align: center; padding-top: 8px;">
            Принял (Заказчик)
          </div>
        </div>
      </div>
    `;

    window.print();
    showToast(t('smetaPrinted'), 'bi-printer-fill');
  }

  // Send Order to Telegram
  function sendOrderTelegram() {
    if (state.cart.length === 0) {
      alert(t('cartEmpty'));
      return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vatAmount = state.cart.reduce((sum, item) => sum + ((item.priceVat - item.price) * item.qty), 0);
    const grandTotal = subtotal + vatAmount;

    let text = `📦 YUNALGROUP BUYURTMA SMETASI\n`;
    text += `📅 Sana: ${new Date().toLocaleDateString()}\n`;
    text += `👤 Qabul qiluvchi: Bobur (+998 99 871 03 27 / @Bobur8710327)\n`;
    text += `📍 Toshkent shahri bo'ylab bepul yetkazib berish (12 oy kafolat)\n`;
    text += `--------------------------------\n`;

    state.cart.forEach((item, idx) => {
      const lineSum = (state.vatMode === 'with_vat' ? item.priceVat : item.price) * item.qty;
      text += `${idx + 1}. ${item.titleRu}\n`;
      text += `   📐 O'lcham: ${item.size}\n`;
      text += `   🔢 ${item.qty} dona x ${formatMoney(state.vatMode === 'with_vat' ? item.priceVat : item.price)} = ${formatMoney(lineSum)} so'm\n\n`;
    });

    text += `--------------------------------\n`;
    text += `💰 Jami (QQSsiz): ${formatMoney(subtotal)} so'm\n`;
    text += `📊 QQS 12%: ${formatMoney(vatAmount)} so'm\n`;
    text += `✅ JAMI TO'LOV: ${formatMoney(grandTotal)} so'm\n`;
    text += `\nIltimos, ushbu buyurtmani rasmiylashtirib bering.`;

    // Copy to clipboard for easy pasting
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    // Direct link to @Bobur8710327
    window.open(`https://t.me/Bobur8710327`, '_blank');
    showToast("Smeta nusxalandi va @Bobur8710327 ochildi!", 'bi-telegram');
  }

  // Apply Language Change
  function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('flanko_lang', lang);
    applyTranslations();
    renderCategories();
    renderProducts();
    updateCartUI();
  }

  // Apply VAT Mode Change
  function setVatMode(mode) {
    state.vatMode = mode;
    localStorage.setItem('flanko_vat', mode);

    // Update toggle buttons in DOM
    const withoutBtn = document.getElementById('vat-opt-without');
    const withBtn = document.getElementById('vat-opt-with');
    if (withoutBtn && withBtn) {
      if (mode === 'with_vat') {
        withoutBtn.classList.remove('active');
        withBtn.classList.add('active');
      } else {
        withoutBtn.classList.add('active');
        withBtn.classList.remove('active');
      }
    }

    renderProducts();
    updateCartUI();
  }

  // Translate all DOM elements with data-i18n attributes
  function applyTranslations() {
    document.title = t('siteTitle');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[state.lang] && i18n[state.lang][key]) {
        el.textContent = i18n[state.lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (i18n[state.lang] && i18n[state.lang][key]) {
        el.placeholder = i18n[state.lang][key];
      }
    });

    // Language button text
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = state.lang === 'uz' ? "O'zbekcha" : "Русский";
    }
  }

  // Handle Order Request Form Submit
  function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const comment = document.getElementById('form-comment').value;

    let msg = `📞 YUNALGROUP SAYTIDAN YANGI ARIZA:\n\n`;
    msg += `👤 Ism: ${name}\n`;
    msg += `📱 Telefon: ${phone}\n`;
    if (comment) msg += `💬 Izoh: ${comment}\n`;

    // Also include cart if any
    if (state.cart.length > 0) {
      msg += `\n🛒 Savatdagi tanlangan mahsulotlar:\n`;
      state.cart.forEach((it, idx) => {
        msg += `${idx + 1}) ${it.titleRu} (${it.size}) - ${it.qty} dona\n`;
      });
    }

    window.open(`https://t.me/share/url?url=${encodeURIComponent(msg)}`, '_blank');
    showToast(t('formSuccess'), 'bi-check2-circle');
    e.target.reset();
  }

  // Initialize Global Listeners & Search
  function initEvents() {
    // Search input (Desktop & Mobile)
    const searchInput = document.getElementById('nav-search-input');
    const searchClear = document.getElementById('nav-search-clear');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchClear = document.getElementById('mobile-search-clear');

    function syncSearch(query) {
      state.searchQuery = query;
      if (searchInput && searchInput.value !== query) searchInput.value = query;
      if (mobileSearchInput && mobileSearchInput.value !== query) mobileSearchInput.value = query;
      
      const showClear = query.trim() !== '';
      if (searchClear) searchClear.style.display = showClear ? 'block' : 'none';
      if (mobileSearchClear) mobileSearchClear.style.display = showClear ? 'block' : 'none';
      
      renderProducts();
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => syncSearch(e.target.value));
    }
    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', (e) => syncSearch(e.target.value));
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => syncSearch(''));
    }
    if (mobileSearchClear) {
      mobileSearchClear.addEventListener('click', () => syncSearch(''));
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    // VAT Toggle buttons
    const withoutBtn = document.getElementById('vat-opt-without');
    const withBtn = document.getElementById('vat-opt-with');
    if (withoutBtn) {
      withoutBtn.addEventListener('click', () => setVatMode('no_vat'));
    }
    if (withBtn) {
      withBtn.addEventListener('click', () => setVatMode('with_vat'));
    }

    // Language button
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        setLanguage(state.lang === 'uz' ? 'ru' : 'uz');
      });
    }

    // Cart Button in navbar
    const cartBtn = document.getElementById('cart-nav-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', openCartDrawer);
    }

    // Cart Drawer overlay click to close
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    if (cartOverlay) {
      cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) closeCartDrawer();
      });
    }

    // Modal overlay click to close
    const modalOverlay = document.getElementById('product-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('main-navbar');
      if (nav) {
        if (window.scrollY > 30) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    });

    // Keyboard shortcuts: Esc to close modal/drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeCartDrawer();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const inp = document.getElementById('nav-search-input');
        if (inp) inp.focus();
      }
    });

    // Lead Form
    const orderForm = document.getElementById('order-lead-form');
    if (orderForm) {
      orderForm.addEventListener('submit', handleFormSubmit);
    }

    // Subtle 3D tilt on hero logo card
    const heroCard = document.getElementById('hero-logo-card');
    if (heroCard) {
      heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        heroCard.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) translateY(-4px)`;
      });
      heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)`;
      });
    }
  }

  // App Initialization
  function init() {
    initVariants();
    applyTranslations();
    setVatMode(state.vatMode);
    renderCategories();
    renderProducts();
    updateCartUI();
    initEvents();
    console.log("YunalGroup Industrial Application initialized successfully.");
  }

  // Expose API for HTML inline handlers
  window.yunalApp = window.flankoApp = {
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    openModal,
    closeModal,
    openCartDrawer,
    closeCartDrawer,
    onVariantChange,
    printSmeta,
    sendOrderTelegram,
    setLanguage,
    setVatMode
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

