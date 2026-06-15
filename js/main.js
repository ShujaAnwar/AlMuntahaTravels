/* ===================================================
   AL MUNTAHA TRAVELS — Main JS
   Mobile-first, DB-connected, 6-step builder
   =================================================== */

(function () {
  'use strict';

  /* ---------- CONFIG ---------- */
  const WA_NUMBER = '923000000000';
  const WA_LINK = `https://wa.me/${WA_NUMBER}`;

  /* ---------- HELPERS ---------- */
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  function toast(msg, type = 'success') {
    const c = $('#toast-container');
    if (!c) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 350); }, 3500);
  }

  /* ---------- API HELPERS ---------- */
  async function apiGet(table, params = {}) {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`tables/${table}${q ? '?' + q : ''}`);
    if (!res.ok) throw new Error(`API GET ${table} failed: ${res.status}`);
    return res.json();
  }

  async function apiPost(table, data) {
    const res = await fetch(`tables/${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API POST ${table} failed: ${res.status}`);
    return res.json();
  }

  /* ---------- LOADING SCREEN ---------- */
  function hideLoader() {
    const el = $('#loading-screen');
    if (el) { el.classList.add('hidden'); }
  }

  /* ---------- SCROLL PROGRESS ---------- */
  function initScrollProgress() {
    const bar = $('#scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0';
    }, { passive: true });
  }

  /* ---------- NAVBAR ---------- */
  function initNavbar() {
    const nav = $('#navbar');
    const ham = $('#hamburger');
    const links = $('#nav-links');
    if (!nav) return;

    // Scroll effect
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger
    if (ham && links) {
      ham.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        ham.classList.toggle('active', open);
        ham.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });

      // Close on link click
      $$('.nav-link', links).forEach(a => {
        a.addEventListener('click', () => {
          links.classList.remove('open');
          ham.classList.remove('active');
          ham.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    // Active link on scroll
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');
    const observerNav = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });
    sections.forEach(s => observerNav.observe(s));
  }

  /* ---------- THEME TOGGLE ---------- */
  function initTheme() {
    const btn = $('#theme-toggle');
    const icon = $('#theme-icon');
    if (!btn || !icon) return;

    const saved = localStorage.getItem('amt-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    function updateIcon() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    }
    updateIcon();

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('amt-theme', next);
      updateIcon();
    });
  }

  /* ---------- STICKY MOBILE BAR ---------- */
  function initStickyBar() {
    const bar = $('#sticky-bar');
    if (!bar) return;
    let last = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 400) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
      last = y;
    }, { passive: true });
  }

  /* ---------- SCROLL ANIMATIONS ---------- */
  function initScrollAnimations() {
    const els = $$('.anim-up, .anim-left, .anim-right');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ---------- COUNTER ANIMATION ---------- */
  function initCounters() {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));

    function animateCounter(el) {
      const target = parseInt(el.dataset.count, 10);
      const duration = 2000;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);
        el.textContent = current.toLocaleString() + (target >= 100 ? '+' : '');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  /* ---------- FAQ ACCORDION ---------- */
  function initFaq() {
    $$('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');

        // Close others
        $$('.faq-item.open').forEach(i => {
          if (i !== item) i.classList.remove('open');
          i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });

        item.classList.toggle('open', !wasOpen);
        btn.setAttribute('aria-expanded', !wasOpen);
      });
    });
  }

  /* ---------- LIGHTBOX ---------- */
  window.openLightbox = function (imgEl) {
    const lb = $('#lightbox');
    const lbImg = $('#lb-img');
    if (!lb || !lbImg) return;
    lbImg.src = imgEl.src;
    lbImg.alt = imgEl.alt || 'Gallery Image';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    const lb = $('#lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  // ESC to close lightbox
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeAllModals();
    }
  });

  /* ---------- MODALS ---------- */
  window.openModal = function (id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function (id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('open');
    document.body.style.overflow = '';
  };

  function closeAllModals() {
    $$('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }

  // Close modal on backdrop click
  $$('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) closeModal(m.id);
    });
  });

  /* ---------- PACKAGES: Load from DB ---------- */
  let allPackages = [];

  async function loadPackages() {
    const grid = $('#pkg-grid');
    if (!grid) return;

    // Show skeleton
    grid.innerHTML = Array(3).fill('').map(() => `
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line price"></div>
        </div>
      </div>
    `).join('');

    try {
      const res = await apiGet('packages', { limit: 50 });
      allPackages = (res.data || []).filter(p => p.status !== 'draft');

      if (allPackages.length === 0) {
        grid.innerHTML = '<div class="pkg-grid-empty"><p>Packages coming soon. Contact us on WhatsApp!</p></div>';
        return;
      }

      renderPackages('all');
    } catch (err) {
      console.error('loadPackages error:', err);
      grid.innerHTML = '<div class="pkg-grid-empty"><p>Unable to load packages. Please try again later.</p></div>';
    }
  }

  function renderPackages(filter) {
    const grid = $('#pkg-grid');
    if (!grid) return;

    const filtered = filter === 'all' ? allPackages : allPackages.filter(p => p.category === filter);

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="pkg-grid-empty"><p>No packages in this category.</p></div>';
      return;
    }

    grid.innerHTML = filtered.map(pkg => {
      const features = (pkg.features || []).slice(0, 4);
      const imgUrl = pkg.image_url || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=500&q=75';
      const price = pkg.price ? `PKR ${Number(pkg.price).toLocaleString()}` : 'Contact Us';

      return `
        <div class="pkg-card" data-category="${pkg.category || ''}">
          <div class="pkg-card-img">
            <img src="${imgUrl}" alt="${pkg.title}" loading="lazy" width="500" height="280" />
            <span class="pkg-category-badge">${pkg.category || 'Package'}</span>
          </div>
          <div class="pkg-card-body">
            <h3 class="pkg-card-title">${pkg.title}</h3>
            <div class="pkg-card-meta">
              <span><i class="fas fa-clock"></i> ${pkg.duration || 'Flexible'}</span>
              <span><i class="fas fa-hotel"></i> ${pkg.hotel_makkah || 'Premium Hotel'}</span>
              <span><i class="fas fa-map-marker-alt"></i> ${pkg.distance_haram || 'Near Haram'}</span>
            </div>
            <ul class="pkg-card-features">
              ${features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
            </ul>
            <div class="pkg-card-footer">
              <div class="pkg-price">${price}<small>per person</small></div>
              <div class="pkg-card-actions">
                <button class="btn btn-sm btn-outline" onclick="showPackageDetail('${pkg.id}')"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-gold" onclick="bookPackage('${pkg.id}')"><i class="fas fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Package Filters
  function initPackageFilters() {
    $$('.pkg-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.pkg-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPackages(btn.dataset.filter);
      });
    });
  }

  // Show Package Detail Modal
  window.showPackageDetail = function (id) {
    const pkg = allPackages.find(p => p.id === id);
    if (!pkg) return;

    const body = $('#pkg-modal-body');
    if (!body) return;

    const imgUrl = pkg.image_url || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80';
    const features = pkg.features || [];
    const price = pkg.price ? `PKR ${Number(pkg.price).toLocaleString()}` : 'Contact Us';

    body.innerHTML = `
      <img src="${imgUrl}" alt="${pkg.title}" class="pkg-modal-img" />
      <span class="pkg-modal-cat">${pkg.category || 'Package'}</span>
      <h3 class="pkg-modal-title">${pkg.title}</h3>
      <div class="pkg-modal-price">${price} <small>per person</small></div>
      <div class="pkg-modal-meta">
        <span><i class="fas fa-clock"></i> ${pkg.duration || 'Flexible'}</span>
        <span><i class="fas fa-hotel"></i> ${pkg.hotel_makkah || 'Hotel'}</span>
        <span><i class="fas fa-hotel"></i> ${pkg.hotel_madinah || 'Hotel'}</span>
        <span><i class="fas fa-map-marker-alt"></i> ${pkg.distance_haram || 'Near Haram'}</span>
        <span><i class="fas fa-bus"></i> ${pkg.transport || 'Transport'}</span>
      </div>
      <ul class="pkg-modal-features">
        ${features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
      </ul>
      ${pkg.description ? `<div class="pkg-modal-desc">${pkg.description}</div>` : ''}
      <div class="pkg-modal-actions">
        <button class="btn btn-gold btn-lg btn-full" onclick="bookPackage('${pkg.id}')"><i class="fas fa-paper-plane"></i> Book Now</button>
        <a href="${WA_LINK}?text=Assalamu%20Alaikum!%20${encodeURIComponent(pkg.title)}%20package%20ki%20detail%20chahiye" target="_blank" rel="noopener" class="btn btn-wa btn-lg btn-full"><i class="fab fa-whatsapp"></i> WhatsApp Inquiry</a>
      </div>
    `;
    openModal('pkg-modal');
  };

  // Book Package Modal
  window.bookPackage = function (id) {
    const pkg = allPackages.find(p => p.id === id);
    const nameEl = $('#book-pkg-name');
    if (nameEl && pkg) nameEl.textContent = pkg.title;
    closeModal('pkg-modal');
    openModal('book-modal');

    // Store the package info for submission
    const form = $('#book-form');
    if (form) form.dataset.packageId = id;
  };

  /* ---------- REVIEWS: Load from DB ---------- */
  async function loadReviews() {
    const grid = $('#reviews-grid');
    if (!grid) return;

    grid.innerHTML = '<div class="reviews-grid-empty">Loading reviews...</div>';

    try {
      const res = await apiGet('reviews', { limit: 50 });
      const reviews = res.data || [];

      if (reviews.length === 0) {
        grid.innerHTML = '<div class="reviews-grid-empty"><p>Reviews coming soon.</p></div>';
        return;
      }

      grid.innerHTML = reviews.map(r => {
        const initials = (r.customer_name || 'G').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        const stars = '★'.repeat(Math.min(r.rating || 5, 5));
        const dateStr = r.date ? new Date(r.date).toLocaleDateString('en-PK', { year: 'numeric', month: 'short' }) : '';
        return `
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">${initials}</div>
              <div>
                <div class="review-name">${r.customer_name || 'Guest'}</div>
                <div class="review-stars">${stars}</div>
              </div>
            </div>
            <p class="review-text">"${r.review_text || ''}"</p>
            ${dateStr ? `<p class="review-date">${dateStr}</p>` : ''}
          </div>
        `;
      }).join('');
    } catch (err) {
      console.error('loadReviews error:', err);
      grid.innerHTML = '<div class="reviews-grid-empty"><p>Unable to load reviews.</p></div>';
    }
  }

  /* ---------- PARTNERS: Load from DB ---------- */
  async function loadPartners() {
    const grid = $('#partners-grid');
    if (!grid) return;

    grid.innerHTML = '<div class="partners-grid-empty">Loading partners...</div>';

    try {
      const res = await apiGet('partners', { limit: 50 });
      const partners = res.data || [];

      if (partners.length === 0) {
        grid.innerHTML = '<div class="partners-grid-empty"><p>Partner agencies coming soon.</p></div>';
        return;
      }

      grid.innerHTML = partners.map(p => `
        <div class="partner-card">
          <div class="partner-card-icon"><i class="fas fa-handshake"></i></div>
          <h3>${p.name || 'Partner'}</h3>
          <p>${p.description || p.country || ''}</p>
        </div>
      `).join('');
    } catch (err) {
      console.error('loadPartners error:', err);
      grid.innerHTML = '<div class="partners-grid-empty"><p>Unable to load partners.</p></div>';
    }
  }

  /* ---------- 6-STEP PACKAGE BUILDER ---------- */
  function initBuilder() {
    const startBtn = $('#start-builder-btn');
    const form = $('#builder-form');
    const backBtn = $('#builder-back');
    const nextBtn = $('#builder-next');
    const fill = $('#builder-fill');
    const label = $('#step-label');
    if (!form || !startBtn) return;

    const TOTAL_STEPS = 6;
    let currentStep = 1;

    const stepLabels = [
      'Travel Type',
      'Group Size & Room',
      'Hotel Preferences',
      'Flight Preferences',
      'Add-on Services',
      'Get Your Quote'
    ];

    // Restore builder state from sessionStorage
    const saved = sessionStorage.getItem('amt-builder');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        restoreBuilderState(data);
      } catch (e) { /* ignore */ }
    }

    startBtn.addEventListener('click', () => {
      form.style.display = 'block';
      startBtn.closest('.builder-banner').style.display = 'none';
      updateStep();
      // Smooth scroll to form
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function updateStep() {
      // Show/hide steps
      $$('.builder-step', form).forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.step) === currentStep);
      });

      // Progress
      if (fill) fill.style.width = ((currentStep / TOTAL_STEPS) * 100) + '%';
      if (label) label.textContent = `Step ${currentStep} of ${TOTAL_STEPS} — ${stepLabels[currentStep - 1]}`;

      // Back button
      if (backBtn) backBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';

      // Next button text
      if (nextBtn) {
        if (currentStep === TOTAL_STEPS) {
          nextBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Quote Request';
          nextBtn.className = 'btn btn-gold btn-lg';
        } else {
          nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
          nextBtn.className = 'btn btn-gold';
        }
      }

      // Auto-save
      saveBuilderState();
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentStep > 1) { currentStep--; updateStep(); }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStep < TOTAL_STEPS) {
          currentStep++;
          updateStep();
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          submitBuilder();
        }
      });
    }

    function saveBuilderState() {
      const data = collectBuilderData();
      data._step = currentStep;
      sessionStorage.setItem('amt-builder', JSON.stringify(data));
    }

    function restoreBuilderState(data) {
      if (data._step) currentStep = data._step;

      // Restore radio buttons
      if (data.journey_type) {
        const radio = $(`input[name="journey"][value="${data.journey_type}"]`);
        if (radio) radio.checked = true;
      }
      if (data.hotel_cities) {
        const radio = $(`input[name="hotel-cities"][value="${data.hotel_cities}"]`);
        if (radio) radio.checked = true;
      }
      if (data.flight_class) {
        const radio = $(`input[name="flight"][value="${data.flight_class}"]`);
        if (radio) radio.checked = true;
      }

      // Restore selects and inputs
      const map = {
        'b-season': 'season', 'b-month': 'preferred_month', 'b-travelers': 'travelers',
        'b-adults': 'adults', 'b-children': 'children', 'b-elderly': 'elderly',
        'b-room': 'room_sharing', 'b-star': 'hotel_star', 'b-distance': 'hotel_distance',
        'b-airline': 'preferred_airline', 'b-madinah-nights': 'madinah_nights',
        'b-name': 'customer_name', 'b-phone': 'whatsapp', 'b-email': 'email', 'b-notes': 'special_notes'
      };
      Object.entries(map).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el && data[key] !== undefined) el.value = data[key];
      });

      // Checkboxes
      const checks = {
        'b-visa': 'visa', 'b-airport': 'airport_transfer', 'b-ziyarat': 'ziyarat',
        'b-madinah': 'madinah_stay', 'b-guide': 'personal_guide', 'b-meals': 'meals',
        'b-wheelchair': 'wheelchair', 'b-insurance': 'insurance', 'b-direct': 'direct_flights'
      };
      Object.entries(checks).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el && data[key] !== undefined) el.checked = data[key];
      });
    }
  }

  function collectBuilderData() {
    const getVal = id => { const el = document.getElementById(id); return el ? el.value : ''; };
    const getChecked = id => { const el = document.getElementById(id); return el ? el.checked : false; };
    const getRadio = name => { const el = $(`input[name="${name}"]:checked`); return el ? el.value : ''; };

    const addons = [];
    if (getChecked('b-visa')) addons.push('Visa Processing');
    if (getChecked('b-airport')) addons.push('Airport Transfers');
    if (getChecked('b-ziyarat')) addons.push('Ziyarat Tours');
    if (getChecked('b-madinah')) addons.push('Madinah Stay');
    if (getChecked('b-guide')) addons.push('Personal Muallim Guide');
    if (getChecked('b-meals')) addons.push('Meals Included');
    if (getChecked('b-wheelchair')) addons.push('Wheelchair/Elderly Care');
    if (getChecked('b-insurance')) addons.push('Travel Insurance');

    return {
      customer_name: getVal('b-name'),
      whatsapp: getVal('b-phone'),
      email: getVal('b-email'),
      special_notes: getVal('b-notes'),
      journey_type: getRadio('journey') === 'Umrah' ? 'Umrah' : 'Hajj',
      season: getVal('b-season'),
      preferred_month: getVal('b-month'),
      travelers: parseInt(getVal('b-travelers')) || 1,
      adults: parseInt(getVal('b-adults')) || 1,
      children: parseInt(getVal('b-children')) || 0,
      elderly: parseInt(getVal('b-elderly')) || 0,
      room_type: getVal('b-room'),
      hotel_star: getVal('b-star'),
      hotel_distance: getVal('b-distance'),
      hotel_cities: getRadio('hotel-cities'),
      flight_class: getRadio('flight'),
      preferred_airline: getVal('b-airline'),
      direct_flights: getChecked('b-direct'),
      extra_services: addons,
      madinah_nights: getVal('b-madinah-nights'),
      // Mapped to leads schema
      hotel_makkah: getVal('b-star') + ' Star, ' + getVal('b-distance'),
      hotel_madinah: getVal('b-madinah-nights'),
      transport: getRadio('flight') + ' Class' + (getVal('b-airline') ? ' - ' + getVal('b-airline') : ''),
      budget_range: getVal('b-star') === '5' ? 'VIP Luxury' : getVal('b-star') === '4' ? 'Standard' : 'Economy',
      status: 'New',
      traveler_type: (parseInt(getVal('b-travelers')) || 1) > 4 ? 'Group' : (parseInt(getVal('b-travelers')) || 1) > 1 ? 'Family' : 'Individual'
    };
  }

  async function submitBuilder() {
    const data = collectBuilderData();

    // Validate
    if (!data.customer_name.trim()) {
      toast('Please enter your name', 'error');
      return;
    }
    if (!data.whatsapp.trim()) {
      toast('Please enter your WhatsApp number', 'error');
      return;
    }

    const nextBtn = $('#builder-next');
    if (nextBtn) { nextBtn.disabled = true; nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'; }

    try {
      await apiPost('leads', {
        customer_name: data.customer_name,
        whatsapp: data.whatsapp,
        phone: data.whatsapp,
        email: data.email,
        journey_type: data.journey_type,
        travelers: data.travelers,
        traveler_type: data.traveler_type,
        hotel_makkah: data.hotel_makkah,
        hotel_madinah: data.hotel_madinah,
        room_type: data.room_type,
        transport: data.transport,
        extra_services: data.extra_services,
        budget_range: data.budget_range,
        special_notes: `Season: ${data.season} | Month: ${data.preferred_month} | Adults: ${data.adults} | Children: ${data.children} | Elderly: ${data.elderly} | Hotel Cities: ${data.hotel_cities} | Direct Flights: ${data.direct_flights} | Madinah Nights: ${data.madinah_nights}\n\n${data.special_notes || ''}`,
        status: 'New'
      });

      // Clear saved state
      sessionStorage.removeItem('amt-builder');

      // Show success
      openModal('success-modal');

      // Reset builder
      const form = $('#builder-form');
      const banner = form ? form.previousElementSibling : null;
      if (form) form.style.display = 'none';
      if (banner) banner.style.display = '';

    } catch (err) {
      console.error('submitBuilder error:', err);
      toast('Something went wrong. Please try WhatsApp instead.', 'error');
    } finally {
      if (nextBtn) { nextBtn.disabled = false; nextBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Quote Request'; }
    }
  }

  /* ---------- BOOKING FORM ---------- */
  function initBookingForm() {
    const form = $('#book-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = $('#bk-name').value.trim();
      const phone = $('#bk-phone').value.trim();
      const travelers = $('#bk-travelers').value || '1';
      const notes = $('#bk-notes').value.trim();
      const pkgId = form.dataset.packageId;

      if (!name || !phone) {
        toast('Please enter your name and WhatsApp number', 'error');
        return;
      }

      const pkg = allPackages.find(p => p.id === pkgId);
      const submitBtn = $('button[type="submit"]', form);
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'; }

      try {
        await apiPost('leads', {
          customer_name: name,
          whatsapp: phone,
          phone: phone,
          travelers: parseInt(travelers) || 1,
          journey_type: pkg ? (pkg.category === 'VIP' ? 'VIP Umrah' : 'Umrah') : 'Umrah',
          hotel_makkah: pkg ? pkg.hotel_makkah : '',
          hotel_madinah: pkg ? pkg.hotel_madinah : '',
          budget_range: pkg ? pkg.category : 'Standard',
          special_notes: `Package: ${pkg ? pkg.title : 'Direct Inquiry'}\n${notes}`,
          status: 'New',
          traveler_type: parseInt(travelers) > 4 ? 'Group' : parseInt(travelers) > 1 ? 'Family' : 'Individual'
        });

        closeModal('book-modal');
        form.reset();
        openModal('success-modal');

      } catch (err) {
        console.error('booking error:', err);
        toast('Something went wrong. Please try WhatsApp.', 'error');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-check"></i> Submit Inquiry'; }
      }
    });
  }

  /* ---------- CONTACT FORM ---------- */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = $('#c-name').value.trim();
      const phone = $('#c-phone').value.trim();
      const subject = $('#c-subject').value;
      const message = $('#c-message').value.trim();

      if (!name || !phone || !message) {
        toast('Please fill in all required fields', 'error');
        return;
      }

      const submitBtn = $('button[type="submit"]', form);
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; }

      try {
        await apiPost('contact_messages', {
          name: name,
          phone: phone,
          subject: subject,
          message: message,
          status: 'New'
        });

        toast('Message sent! We\'ll contact you soon. JazakAllah Khair.', 'success');
        form.reset();

      } catch (err) {
        console.error('contact form error:', err);
        toast('Failed to send. Please try WhatsApp.', 'error');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; }
      }
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', async () => {
    initScrollProgress();
    initNavbar();
    initTheme();
    initStickyBar();
    initScrollAnimations();
    initCounters();
    initFaq();
    initBuilder();
    initBookingForm();
    initContactForm();
    initPackageFilters();

    // Load DB data in parallel
    await Promise.allSettled([
      loadPackages(),
      loadReviews(),
      loadPartners()
    ]);

    // Hide loader after everything loaded
    hideLoader();
  });

})();
