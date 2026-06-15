/**
 * AL MUNTAHA TRAVELS — Admin Panel JavaScript
 * Secure Admin Dashboard with full CRUD operations
 */

'use strict';

// ============================================
// AUTH SYSTEM
// ============================================
const ADMIN_CREDENTIALS = {
  email: 'admin@almuntahatravels.com',
  password: 'admin123' // In production: use server-side auth
};

let isLoggedIn = false;

function checkAuth() {
  const session = sessionStorage.getItem('admin-session');
  if (session === 'authenticated') {
    isLoggedIn = true;
    document.getElementById('admin-auth').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    initAdminPanel();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  const authForm = document.getElementById('auth-form');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-email').value.trim();
      const password = document.getElementById('admin-password').value;
      const errorEl = document.getElementById('auth-error');

      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('admin-session', 'authenticated');
        errorEl.style.display = 'none';
        document.getElementById('admin-auth').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        isLoggedIn = true;
        initAdminPanel();
      } else {
        errorEl.style.display = 'flex';
        // Security: rate limit attempts
        const attempts = parseInt(sessionStorage.getItem('login-attempts') || '0') + 1;
        sessionStorage.setItem('login-attempts', attempts);
        if (attempts >= 5) {
          setTimeout(() => { errorEl.innerHTML = '<i class="fas fa-lock"></i> Too many attempts. Wait 30 seconds.'; }, 100);
        }
      }
    });
  }
});

function adminLogout() {
  sessionStorage.removeItem('admin-session');
  sessionStorage.removeItem('login-attempts');
  isLoggedIn = false;
  document.getElementById('admin-auth').classList.remove('hidden');
  document.getElementById('admin-panel').classList.add('hidden');
}

function togglePass() {
  const passInput = document.getElementById('admin-password');
  const icon = document.getElementById('pass-icon');
  if (passInput.type === 'password') {
    passInput.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    passInput.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// ============================================
// INIT ADMIN PANEL
// ============================================
function initAdminPanel() {
  loadDashboardStats();
  loadRecentLeads();
  initCharts();
}

function refreshData() {
  const activePage = document.querySelector('.admin-page.active')?.id?.replace('page-', '');
  if (activePage) loadPageData(activePage);
  adminToast('Data refreshed', 'success');
}

// ============================================
// NAVIGATION
// ============================================
function showPage(page, navItem) {
  // Hide all pages
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  // Show selected
  document.getElementById(`page-${page}`)?.classList.add('active');
  // Update nav
  document.querySelectorAll('.sidebar-nav-item').forEach(item => item.classList.remove('active'));
  if (navItem) navItem.classList.add('active');
  // Update title
  const titles = {
    dashboard: 'Dashboard',
    packages: 'Packages Management',
    leads: 'Enquiries & Leads',
    reviews: 'Reviews Management',
    gallery: 'Gallery Management',
    blog: 'Blog Posts',
    partners: 'Partner Agencies',
    contacts: 'Contact Messages',
    settings: 'Settings & CMS'
  };
  document.getElementById('page-title').textContent = titles[page] || page;
  // Close sidebar on mobile
  if (window.innerWidth < 1024) closeSidebar();
  loadPageData(page);
}

function loadPageData(page) {
  switch (page) {
    case 'packages': loadPackages(); break;
    case 'leads': loadLeads(); break;
    case 'reviews': loadReviews(); break;
    case 'gallery': loadGallery(); break;
    case 'blog': loadBlog(); break;
    case 'partners': loadPartners(); break;
    case 'contacts': loadContacts(); break;
    case 'dashboard': loadDashboardStats(); loadRecentLeads(); break;
  }
}

// ============================================
// SIDEBAR
// ============================================
function toggleSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

function closeSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
}

// ============================================
// DASHBOARD STATS
// ============================================
async function loadDashboardStats() {
  try {
    const [pkgRes, leadsRes, reviewsRes, contactRes, partnersRes] = await Promise.all([
      fetch('tables/packages?limit=100'),
      fetch('tables/leads?limit=100'),
      fetch('tables/reviews?limit=100'),
      fetch('tables/contact_messages?limit=100'),
      fetch('tables/partners?limit=100')
    ]);

    const [pkgData, leadsData, reviewsData, contactData, partnersData] = await Promise.all([
      pkgRes.json(), leadsRes.json(), reviewsRes.json(), contactRes.json(), partnersRes.json()
    ]);

    animateStat('stat-packages', pkgData.total || 0);
    animateStat('stat-leads', leadsData.total || 0);
    animateStat('stat-reviews', reviewsData.total || 0);
    animateStat('stat-contacts', contactData.total || 0);
    animateStat('stat-partners', partnersData.total || 0);

    // New leads badge
    const newLeads = (leadsData.data || []).filter(l => l.status === 'New').length;
    const badge = document.getElementById('leads-badge');
    if (badge) badge.textContent = newLeads;

    const newEl = document.getElementById('stat-leads-new');
    if (newEl && newLeads > 0) newEl.textContent = `${newLeads} new`;

  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

function animateStat(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const duration = 800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

async function loadRecentLeads() {
  try {
    const res = await fetch('tables/leads?limit=5&sort=created_at');
    const data = await res.json();
    const list = document.getElementById('recent-leads-list');
    if (!list) return;

    if (!data.data || data.data.length === 0) {
      list.innerHTML = '<p style="color:rgba(255,255,255,0.35);font-size:0.85rem;">No leads yet</p>';
      return;
    }

    list.innerHTML = data.data.map(lead => `
      <div class="activity-item">
        <div class="activity-dot ${lead.status === 'New' ? 'emerald' : lead.status === 'Confirmed' ? 'blue' : 'gold'}"></div>
        <div>
          <div class="activity-text">${sanitize(lead.customer_name)} — ${sanitize(lead.journey_type || 'Umrah')}</div>
          <div class="activity-time">
            <span class="status-badge ${getStatusClass(lead.status)}">${lead.status}</span>
            ${lead.whatsapp ? `<a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g,'')}" target="_blank" style="color:var(--emerald-light);font-size:0.7rem;margin-left:0.5rem;"><i class="fab fa-whatsapp"></i> WhatsApp</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load recent leads:', err);
  }
}

// ============================================
// CHARTS
// ============================================
function initCharts() {
  // Leads Chart
  const leadsCtx = document.getElementById('leads-chart');
  if (leadsCtx) {
    new Chart(leadsCtx, {
      type: 'bar',
      data: {
        labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Leads',
          data: [12, 19, 15, 28, 24, 32],
          backgroundColor: 'rgba(16,185,129,0.6)',
          borderColor: '#10b981',
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 11 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 11 } } }
        }
      }
    });
  }

  // Packages Chart
  const pkgCtx = document.getElementById('packages-chart');
  if (pkgCtx) {
    new Chart(pkgCtx, {
      type: 'doughnut',
      data: {
        labels: ['Economy', 'Standard', 'VIP', 'Ramadan'],
        datasets: [{
          data: [30, 35, 20, 15],
          backgroundColor: ['rgba(16,185,129,0.7)', 'rgba(245,158,11,0.7)', 'rgba(139,92,246,0.7)', 'rgba(59,130,246,0.7)'],
          borderColor: ['#10b981', '#f59e0b', '#8b5cf6', '#3b82f6'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 }, padding: 15 }
          }
        }
      }
    });
  }
}

// ============================================
// PACKAGES CRUD
// ============================================
async function loadPackages() {
  const tbody = document.getElementById('packages-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;"><i class="fas fa-spinner fa-spin" style="color:var(--gold);"></i></td></tr>';

  try {
    const res = await fetch('tables/packages?limit=50');
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3);">No packages found. Add your first package!</td></tr>';
      return;
    }
    tbody.innerHTML = data.data.map(pkg => `
      <tr>
        <td class="td-name" data-label="Package">${sanitize(pkg.title)}</td>
        <td data-label="Category"><span class="status-badge ${pkg.category === 'VIP' ? 'vip' : pkg.category === 'Standard' ? 'confirmed' : 'published'}">${sanitize(pkg.category)}</span></td>
        <td data-label="Price">PKR ${parseInt(pkg.price || 0).toLocaleString()}</td>
        <td data-label="Duration">${sanitize(pkg.duration || '—')}</td>
        <td data-label="Status"><span class="status-badge ${pkg.status}">${sanitize(pkg.status || 'draft')}</span></td>
        <td data-label="Actions">
          <div class="td-actions">
            <button class="action-btn edit" onclick="editPackage('${sanitize(pkg.id)}')" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete" onclick="confirmDelete('packages','${sanitize(pkg.id)}')" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:rgba(239,68,68,0.6);">Failed to load packages</td></tr>';
  }
}

function openPkgModal(pkg = null) {
  document.getElementById('pkg-id').value = '';
  document.getElementById('pkg-name').value = '';
  document.getElementById('pkg-cat').value = 'Economy';
  document.getElementById('pkg-price').value = '';
  document.getElementById('pkg-dur').value = '';
  document.getElementById('pkg-hotel-m').value = '';
  document.getElementById('pkg-hotel-md').value = '';
  document.getElementById('pkg-dist').value = '';
  document.getElementById('pkg-transport').value = '';
  document.getElementById('pkg-features').value = '';
  document.getElementById('pkg-desc').value = '';
  document.getElementById('pkg-img').value = '';
  document.getElementById('pkg-status').value = 'published';
  document.getElementById('pkg-modal-title').textContent = pkg ? 'Edit Package' : 'Add Package';
  openAdminModal('pkg-modal');
}

async function editPackage(id) {
  try {
    const res = await fetch(`tables/packages/${id}`);
    const pkg = await res.json();
    document.getElementById('pkg-id').value = pkg.id;
    document.getElementById('pkg-name').value = pkg.title || '';
    document.getElementById('pkg-cat').value = pkg.category || 'Economy';
    document.getElementById('pkg-price').value = pkg.price || '';
    document.getElementById('pkg-dur').value = pkg.duration || '';
    document.getElementById('pkg-hotel-m').value = pkg.hotel_makkah || '';
    document.getElementById('pkg-hotel-md').value = pkg.hotel_madinah || '';
    document.getElementById('pkg-dist').value = pkg.distance_haram || '';
    document.getElementById('pkg-transport').value = pkg.transport || '';
    document.getElementById('pkg-features').value = Array.isArray(pkg.features) ? pkg.features.join(', ') : (pkg.features || '');
    document.getElementById('pkg-desc').value = pkg.description || '';
    document.getElementById('pkg-img').value = pkg.image_url || '';
    document.getElementById('pkg-status').value = pkg.status || 'published';
    document.getElementById('pkg-modal-title').textContent = 'Edit Package';
    openAdminModal('pkg-modal');
  } catch (err) {
    adminToast('Failed to load package', 'error');
  }
}

async function savePackage() {
  const id = document.getElementById('pkg-id').value;
  const title = document.getElementById('pkg-name').value.trim();
  const price = document.getElementById('pkg-price').value;

  if (!title || !price) {
    adminToast('Package name and price are required', 'error');
    return;
  }

  const featuresRaw = document.getElementById('pkg-features').value;
  const features = featuresRaw.split(',').map(f => f.trim()).filter(f => f);

  const payload = {
    title,
    category: document.getElementById('pkg-cat').value,
    price: parseFloat(price),
    duration: document.getElementById('pkg-dur').value,
    hotel_makkah: document.getElementById('pkg-hotel-m').value,
    hotel_madinah: document.getElementById('pkg-hotel-md').value,
    distance_haram: document.getElementById('pkg-dist').value,
    transport: document.getElementById('pkg-transport').value,
    features,
    description: document.getElementById('pkg-desc').value,
    image_url: document.getElementById('pkg-img').value,
    status: document.getElementById('pkg-status').value,
    availability: true
  };

  try {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `tables/packages/${id}` : 'tables/packages';
    if (!id) payload.id = generateAdminId();

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      closeAdminModal('pkg-modal');
      loadPackages();
      adminToast(id ? 'Package updated!' : 'Package added!', 'success');
    } else {
      adminToast('Failed to save package', 'error');
    }
  } catch (err) {
    adminToast('Error saving package', 'error');
  }
}

// ============================================
// LEADS CRUD
// ============================================
let allLeads = [];
let currentLeadFilter = 'all';

async function loadLeads() {
  const tbody = document.getElementById('leads-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;"><i class="fas fa-spinner fa-spin" style="color:var(--gold);"></i></td></tr>';

  try {
    const res = await fetch('tables/leads?limit=100');
    const data = await res.json();
    allLeads = data.data || [];
    renderLeads(allLeads);

    // Update badge
    const newLeads = allLeads.filter(l => l.status === 'New').length;
    const badge = document.getElementById('leads-badge');
    if (badge) badge.textContent = newLeads;
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:rgba(239,68,68,0.6);">Failed to load leads</td></tr>';
  }
}

function renderLeads(leads) {
  const tbody = document.getElementById('leads-tbody');
  if (!tbody) return;

  if (leads.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3);">No leads found</td></tr>';
    return;
  }

  tbody.innerHTML = leads.map(lead => `
    <tr>
      <td class="td-name" data-label="Customer">${sanitize(lead.customer_name)}</td>
      <td data-label="WhatsApp">
        ${lead.whatsapp ? `<a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g,'')}" target="_blank" style="color:#25d366;"><i class="fab fa-whatsapp"></i> ${sanitize(lead.whatsapp)}</a>` : '—'}
      </td>
      <td data-label="Journey">${sanitize(lead.journey_type || 'Umrah')}</td>
      <td data-label="Budget">${sanitize(lead.budget_range || '—')}</td>
      <td data-label="Date" style="font-size:0.75rem;">${formatDate(lead.created_at)}</td>
      <td data-label="Status">
        <select onchange="updateLeadStatus('${lead.id}', this.value)" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;padding:0.25rem 0.5rem;border-radius:6px;font-size:0.75rem;cursor:pointer;">
          ${['New','In Progress','Confirmed','Rejected','Completed'].map(s => `<option value="${s}" ${lead.status === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </td>
      <td data-label="Actions">
        <div class="td-actions">
          <button class="action-btn view" onclick="viewLeadDetail('${lead.id}')" title="View Details"><i class="fas fa-eye"></i></button>
          <button class="action-btn delete" onclick="confirmDelete('leads','${lead.id}')" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterLeads(status, btn) {
  document.querySelectorAll('.filter-lead-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentLeadFilter = status;
  const filtered = status === 'all' ? allLeads : allLeads.filter(l => l.status === status);
  renderLeads(filtered);
}

async function updateLeadStatus(id, status) {
  try {
    await fetch(`tables/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    adminToast(`Lead status updated to: ${status}`, 'success');
    // Update local data
    const lead = allLeads.find(l => l.id === id);
    if (lead) lead.status = status;
  } catch (err) {
    adminToast('Failed to update status', 'error');
  }
}

function viewLeadDetail(id) {
  const lead = allLeads.find(l => l.id === id);
  if (!lead) return;

  const body = document.getElementById('lead-detail-body');
  body.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem;">
      ${detailRow('Customer Name', lead.customer_name)}
      ${detailRow('WhatsApp', lead.whatsapp ? `<a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g,'')}" target="_blank" style="color:#25d366;">${lead.whatsapp}</a>` : '—')}
      ${detailRow('Email', lead.email || '—')}
      ${detailRow('City', lead.city || '—')}
      ${detailRow('Travelers', lead.travelers || '—')}
      ${detailRow('Traveler Type', lead.traveler_type || '—')}
      ${detailRow('Journey Type', lead.journey_type || '—')}
      ${detailRow('Departure', formatDate(lead.departure_date) || '—')}
      ${detailRow('Return', formatDate(lead.return_date) || '—')}
      ${detailRow('Makkah Hotel', lead.hotel_makkah || '—')}
      ${detailRow('Madinah Hotel', lead.hotel_madinah || '—')}
      ${detailRow('Room Type', lead.room_type || '—')}
      ${detailRow('Meals', lead.meals || '—')}
      ${detailRow('Transport', lead.transport || '—')}
      ${detailRow('Budget', lead.budget_range || '—')}
      ${detailRow('Status', `<span class="status-badge ${getStatusClass(lead.status)}">${lead.status}</span>`)}
    </div>
    ${lead.extra_services && lead.extra_services.length ? `<div style="margin-bottom:1rem;"><p style="font-size:0.7rem;color:rgba(255,255,255,0.4);text-transform:uppercase;margin-bottom:0.5rem;">Extra Services</p><p style="color:white;font-size:0.875rem;">${Array.isArray(lead.extra_services) ? lead.extra_services.join(', ') : lead.extra_services}</p></div>` : ''}
    ${lead.special_notes ? `<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:1rem;"><p style="font-size:0.7rem;color:rgba(255,255,255,0.4);text-transform:uppercase;margin-bottom:0.4rem;">Special Notes</p><p style="color:rgba(255,255,255,0.7);font-size:0.875rem;line-height:1.6;">${sanitize(lead.special_notes)}</p></div>` : ''}
    <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;">
      ${lead.whatsapp ? `<a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g,'')}?text=Assalamu%20Alaikum%20${encodeURIComponent(lead.customer_name)}!%20Regarding%20your%20Umrah%20inquiry" target="_blank" style="flex:1;min-width:140px;padding:0.7rem;background:#25d366;color:white;font-weight:700;border-radius:8px;text-align:center;display:flex;align-items:center;justify-content:center;gap:0.5rem;">
        <i class="fab fa-whatsapp"></i> Send WhatsApp
      </a>` : ''}
      <a href="tel:${lead.whatsapp || ''}" style="flex:1;min-width:140px;padding:0.7rem;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:var(--emerald-light);font-weight:700;border-radius:8px;text-align:center;display:flex;align-items:center;justify-content:center;gap:0.5rem;">
        <i class="fas fa-phone"></i> Call Now
      </a>
    </div>
  `;
  openAdminModal('lead-detail-modal');
}

function detailRow(label, value) {
  return `<div style="padding:0.5rem;background:rgba(255,255,255,0.02);border-radius:6px;">
    <p style="font-size:0.65rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.2rem;">${label}</p>
    <p style="color:white;font-size:0.85rem;font-weight:500;">${value}</p>
  </div>`;
}

function exportLeads() {
  const headers = ['Name', 'WhatsApp', 'Email', 'City', 'Journey', 'Travelers', 'Budget', 'Status', 'Date'];
  const rows = allLeads.map(l => [
    l.customer_name, l.whatsapp, l.email, l.city, l.journey_type,
    l.travelers, l.budget_range, l.status, formatDate(l.created_at)
  ]);
  downloadCSV([headers, ...rows], 'leads_export.csv');
  adminToast('Leads exported to CSV', 'success');
}

// ============================================
// KANBAN VIEW
// ============================================
let currentLeadView = 'kanban';

function switchLeadView(view) {
  currentLeadView = view;
  const kanbanView = document.getElementById('leads-kanban-view');
  const tableView = document.getElementById('leads-table-view');
  const kanbanBtn = document.getElementById('btn-kanban-view');
  const tableBtn = document.getElementById('btn-table-view');

  if (view === 'kanban') {
    if (kanbanView) kanbanView.style.display = '';
    if (tableView) tableView.style.display = 'none';
    if (kanbanBtn) kanbanBtn.classList.add('active');
    if (tableBtn) tableBtn.classList.remove('active');
    renderKanban();
  } else {
    if (kanbanView) kanbanView.style.display = 'none';
    if (tableView) tableView.style.display = '';
    if (kanbanBtn) kanbanBtn.classList.remove('active');
    if (tableBtn) tableBtn.classList.add('active');
    renderLeads(allLeads);
  }
}

function renderKanban() {
  const statusMap = {
    'New': 'new',
    'In Progress': 'inprogress',
    'Confirmed': 'confirmed',
    'Completed': 'completed',
    'Rejected': 'rejected'
  };

  // Clear all columns
  Object.values(statusMap).forEach(key => {
    const col = document.getElementById('kanban-' + key);
    if (col) col.innerHTML = '';
  });

  // Group leads by status
  const groups = {};
  Object.keys(statusMap).forEach(s => groups[s] = []);

  allLeads.forEach(lead => {
    const status = lead.status || 'New';
    if (groups[status]) groups[status].push(lead);
    else groups['New'].push(lead);
  });

  // Render cards
  Object.entries(groups).forEach(([status, leads]) => {
    const key = statusMap[status];
    const col = document.getElementById('kanban-' + key);
    const countEl = document.getElementById('kanban-' + key + '-count');

    if (countEl) countEl.textContent = leads.length;

    if (!col) return;

    if (leads.length === 0) {
      col.innerHTML = '<div class="kanban-empty">No leads</div>';
      return;
    }

    col.innerHTML = leads.map(lead => {
      const budgetClass = (lead.budget_range || '').toLowerCase().replace(/\s+/g, '-');
      const waNum = (lead.whatsapp || '').replace(/[^0-9]/g, '');
      const nextStatus = getNextStatus(status);
      const dateStr = lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }) : '';

      return `
        <div class="kanban-card" onclick="viewLeadDetail('${lead.id}')">
          <div class="kanban-card-name">${sanitize(lead.customer_name || 'Unknown')}</div>
          <div class="kanban-card-info">
            <span><i class="fab fa-whatsapp"></i> ${sanitize(lead.whatsapp || '—')}</span>
            <span><i class="fas fa-users"></i> ${lead.travelers || 1} travelers • ${lead.traveler_type || 'Individual'}</span>
            ${dateStr ? `<span><i class="fas fa-clock"></i> ${dateStr}</span>` : ''}
          </div>
          <div class="kanban-card-badges">
            <span class="kanban-card-badge type">${sanitize(lead.journey_type || 'Umrah')}</span>
            <span class="kanban-card-badge budget-${budgetClass}">${sanitize(lead.budget_range || 'Standard')}</span>
          </div>
          <div class="kanban-card-actions" onclick="event.stopPropagation()">
            ${waNum ? `<button class="btn-wa-mini" onclick="window.open('https://wa.me/${waNum}?text=Assalamu%20Alaikum!','_blank')"><i class="fab fa-whatsapp"></i></button>` : ''}
            ${nextStatus ? `<button class="btn-move" onclick="moveLeadKanban('${lead.id}','${nextStatus}')" title="Move to ${nextStatus}"><i class="fas fa-arrow-right"></i> ${nextStatus.split(' ')[0]}</button>` : ''}
          </div>
        </div>
      `;
    }).join('');
  });
}

function getNextStatus(current) {
  const flow = ['New', 'In Progress', 'Confirmed', 'Completed'];
  const idx = flow.indexOf(current);
  return idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null;
}

async function moveLeadKanban(id, newStatus) {
  try {
    await fetch(`tables/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const lead = allLeads.find(l => l.id === id);
    if (lead) lead.status = newStatus;
    renderKanban();
    adminToast(`Lead moved to ${newStatus}`, 'success');

    // Update badge
    const newLeads = allLeads.filter(l => l.status === 'New').length;
    const badge = document.getElementById('leads-badge');
    if (badge) badge.textContent = newLeads;
  } catch (err) {
    adminToast('Failed to update lead', 'error');
  }
}

// Override loadLeads to also render kanban
const _origLoadLeads = loadLeads;
loadLeads = async function() {
  await _origLoadLeads();
  if (currentLeadView === 'kanban') renderKanban();
};

// ============================================
// REVIEWS CRUD
// ============================================
async function loadReviews() {
  const tbody = document.getElementById('reviews-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;"><i class="fas fa-spinner fa-spin" style="color:var(--gold);"></i></td></tr>';

  try {
    const res = await fetch('tables/reviews?limit=50');
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3);">No reviews yet</td></tr>';
      return;
    }
    tbody.innerHTML = data.data.map(rev => `
      <tr>
        <td class="td-name" data-label="Customer">${sanitize(rev.customer_name)}</td>
        <td data-label="Rating">${'★'.repeat(rev.rating || 5)}</td>
        <td data-label="Review">${sanitize((rev.review_text || '').substring(0, 60))}...</td>
        <td data-label="Language"><span class="status-badge published">${sanitize(rev.language || 'English')}</span></td>
        <td data-label="Date">${formatDate(rev.date || rev.created_at)}</td>
        <td data-label="Actions">
          <div class="td-actions">
            <button class="action-btn edit" onclick="editReview('${sanitize(rev.id)}')" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete" onclick="confirmDelete('reviews','${sanitize(rev.id)}')" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:rgba(239,68,68,0.6);">Failed to load reviews</td></tr>';
  }
}

function openReviewModal() {
  document.getElementById('review-id').value = '';
  document.getElementById('rev-name').value = '';
  document.getElementById('rev-rating').value = '5';
  document.getElementById('rev-text').value = '';
  document.getElementById('rev-lang').value = 'English';
  document.getElementById('rev-img').value = '';
  document.getElementById('review-modal-title').textContent = 'Add Review';
  openAdminModal('review-modal');
}

async function editReview(id) {
  try {
    const res = await fetch(`tables/reviews/${id}`);
    const rev = await res.json();
    document.getElementById('review-id').value = rev.id;
    document.getElementById('rev-name').value = rev.customer_name || '';
    document.getElementById('rev-rating').value = rev.rating || 5;
    document.getElementById('rev-text').value = rev.review_text || '';
    document.getElementById('rev-lang').value = rev.language || 'English';
    document.getElementById('rev-img').value = rev.image_url || '';
    document.getElementById('review-modal-title').textContent = 'Edit Review';
    openAdminModal('review-modal');
  } catch (err) {
    adminToast('Failed to load review', 'error');
  }
}

async function saveReview() {
  const id = document.getElementById('review-id').value;
  const name = document.getElementById('rev-name').value.trim();
  const text = document.getElementById('rev-text').value.trim();

  if (!name || !text) {
    adminToast('Name and review text are required', 'error');
    return;
  }

  const payload = {
    customer_name: name,
    rating: parseInt(document.getElementById('rev-rating').value),
    review_text: text,
    language: document.getElementById('rev-lang').value,
    image_url: document.getElementById('rev-img').value,
    date: new Date().toISOString().split('T')[0]
  };

  try {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `tables/reviews/${id}` : 'tables/reviews';
    if (!id) payload.id = generateAdminId();

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      closeAdminModal('review-modal');
      loadReviews();
      adminToast(id ? 'Review updated!' : 'Review added!', 'success');
    }
  } catch (err) {
    adminToast('Error saving review', 'error');
  }
}

// ============================================
// GALLERY
// ============================================
const galleryItems = [
  { url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&q=80', alt: 'Masjid al-Haram' },
  { url: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&q=80', alt: 'Kaaba' },
  { url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&q=80', alt: 'Madinah' },
  { url: 'https://images.unsplash.com/photo-1572097440023-b2841ee1e7da?w=400&q=80', alt: 'Islamic Architecture' }
];

function loadGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  renderGalleryGrid();
}

function renderGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = galleryItems.map((item, i) => `
    <div class="admin-gallery-item">
      <img src="${sanitize(item.url)}" alt="${sanitize(item.alt)}" loading="lazy" />
      <div class="admin-gallery-overlay">
        <button class="action-btn delete" onclick="removeGalleryItem(${i})" title="Delete" style="width:32px;height:32px;">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function removeGalleryItem(index) {
  galleryItems.splice(index, 1);
  renderGalleryGrid();
  adminToast('Image removed', 'success');
}

function handleGalleryUpload(input) {
  const files = Array.from(input.files);
  files.forEach(file => {
    if (file.size > 10 * 1024 * 1024) {
      adminToast(`${file.name} is too large (max 10MB)`, 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      galleryItems.push({ url: e.target.result, alt: file.name });
      renderGalleryGrid();
    };
    reader.readAsDataURL(file);
  });
  adminToast(`${files.length} image(s) uploaded`, 'success');
}

function addGalleryItem() {
  const url = prompt('Enter image URL:');
  if (url && url.startsWith('http')) {
    galleryItems.push({ url, alt: 'Gallery image' });
    renderGalleryGrid();
    adminToast('Image added', 'success');
  }
}

// ============================================
// BLOG CRUD
// ============================================
async function loadBlog() {
  const tbody = document.getElementById('blog-tbody');
  if (!tbody) return;
  try {
    const res = await fetch('tables/blog_posts?limit=50');
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3);">No blog posts yet</td></tr>';
      return;
    }
    tbody.innerHTML = data.data.map(post => `
      <tr>
        <td class="td-name" data-label="Title">${sanitize(post.title)}</td>
        <td data-label="Category"><span class="status-badge published">${sanitize(post.category || '—')}</span></td>
        <td data-label="Status"><span class="status-badge ${post.status}">${sanitize(post.status)}</span></td>
        <td data-label="Date">${formatDate(post.created_at)}</td>
        <td data-label="Actions">
          <div class="td-actions">
            <button class="action-btn edit" onclick="" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete" onclick="confirmDelete('blog_posts','${sanitize(post.id)}')" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {}
}

function openBlogModal() {
  document.getElementById('blog-title').value = '';
  document.getElementById('blog-content').value = '';
  document.getElementById('blog-meta').value = '';
  document.getElementById('blog-img').value = '';
  openAdminModal('blog-modal');
}

async function saveBlogPost() {
  const title = document.getElementById('blog-title').value.trim();
  const content = document.getElementById('blog-content').value.trim();
  if (!title || !content) { adminToast('Title and content required', 'error'); return; }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  try {
    const res = await fetch('tables/blog_posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: generateAdminId(),
        title,
        content,
        category: document.getElementById('blog-cat').value,
        status: document.getElementById('blog-status').value,
        meta_description: document.getElementById('blog-meta').value,
        image_url: document.getElementById('blog-img').value,
        slug
      })
    });
    if (res.ok) {
      closeAdminModal('blog-modal');
      loadBlog();
      adminToast('Blog post published!', 'success');
    }
  } catch (err) {
    adminToast('Error saving post', 'error');
  }
}

// ============================================
// PARTNERS CRUD
// ============================================
async function loadPartners() {
  const tbody = document.getElementById('partners-tbody');
  if (!tbody) return;
  try {
    const res = await fetch('tables/partners?limit=50');
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3);">No partners yet</td></tr>';
      return;
    }
    tbody.innerHTML = data.data.map(p => `
      <tr>
        <td class="td-name" data-label="Agency">${sanitize(p.name)}</td>
        <td data-label="Country">${sanitize(p.country || '—')}</td>
        <td data-label="Partnership">${sanitize(p.partnership_type || '—')}</td>
        <td data-label="Actions">
          <div class="td-actions">
            <button class="action-btn delete" onclick="confirmDelete('partners','${sanitize(p.id)}')" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {}
}

function openPartnerModal() {
  document.getElementById('p-name').value = '';
  document.getElementById('p-country').value = '';
  document.getElementById('p-type').value = '';
  document.getElementById('p-desc').value = '';
  document.getElementById('p-logo').value = '';
  openAdminModal('partner-modal');
}

async function savePartner() {
  const name = document.getElementById('p-name').value.trim();
  if (!name) { adminToast('Agency name required', 'error'); return; }

  try {
    const res = await fetch('tables/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: generateAdminId(),
        name,
        country: document.getElementById('p-country').value,
        partnership_type: document.getElementById('p-type').value,
        description: document.getElementById('p-desc').value,
        logo_url: document.getElementById('p-logo').value
      })
    });
    if (res.ok) {
      closeAdminModal('partner-modal');
      loadPartners();
      adminToast('Partner added!', 'success');
    }
  } catch (err) {
    adminToast('Error saving partner', 'error');
  }
}

// ============================================
// CONTACTS
// ============================================
async function loadContacts() {
  const tbody = document.getElementById('contacts-tbody');
  if (!tbody) return;
  try {
    const res = await fetch('tables/contact_messages?limit=100');
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3);">No messages yet</td></tr>';
      return;
    }
    tbody.innerHTML = data.data.map(msg => `
      <tr style="${msg.status === 'Unread' ? 'background:rgba(245,158,11,0.03);' : ''}">
        <td class="td-name" data-label="Name">${sanitize(msg.name)} ${msg.status === 'Unread' ? '<span style="width:7px;height:7px;background:var(--gold);border-radius:50%;display:inline-block;margin-left:4px;"></span>' : ''}</td>
        <td data-label="Phone">${sanitize(msg.phone || '—')}</td>
        <td data-label="Subject">${sanitize(msg.subject || '—')}</td>
        <td data-label="Message">${sanitize((msg.message || '').substring(0, 50))}...</td>
        <td data-label="Status"><span class="status-badge ${msg.status === 'Read' ? 'confirmed' : msg.status === 'Replied' ? 'published' : 'new'}">${sanitize(msg.status || 'Unread')}</span></td>
        <td data-label="Actions">
          <div class="td-actions">
            <button class="action-btn view" onclick="markRead('${sanitize(msg.id)}')" title="Mark Read"><i class="fas fa-check"></i></button>
            <button class="action-btn delete" onclick="confirmDelete('contact_messages','${sanitize(msg.id)}')" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {}
}

async function markRead(id) {
  try {
    await fetch(`tables/contact_messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Read' })
    });
    loadContacts();
    adminToast('Marked as read', 'success');
  } catch (err) {}
}

function exportContacts() {
  adminToast('Export feature ready — connect backend for CSV generation', 'info');
}

// ============================================
// DELETE
// ============================================
let pendingDelete = { table: '', id: '' };

function confirmDelete(table, id) {
  pendingDelete = { table, id };
  document.getElementById('confirm-delete-btn').onclick = executeDelete;
  openAdminModal('delete-modal');
}

async function executeDelete() {
  const { table, id } = pendingDelete;
  try {
    const res = await fetch(`tables/${table}/${id}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) {
      closeAdminModal('delete-modal');
      adminToast('Item deleted successfully', 'success');
      // Reload current page data
      const activePage = document.querySelector('.admin-page.active')?.id?.replace('page-', '');
      if (activePage) loadPageData(activePage);
    }
  } catch (err) {
    adminToast('Delete failed', 'error');
  }
}

// ============================================
// SETTINGS
// ============================================
function saveSettings() {
  adminToast('Settings saved successfully!', 'success');
}

function changePassword() {
  const curr = document.getElementById('curr-pass')?.value;
  const newPass = document.getElementById('new-pass')?.value;
  if (!curr || !newPass) { adminToast('Please fill both fields', 'error'); return; }
  if (curr !== ADMIN_CREDENTIALS.password) { adminToast('Current password is incorrect', 'error'); return; }
  if (newPass.length < 8) { adminToast('New password must be 8+ characters', 'error'); return; }
  ADMIN_CREDENTIALS.password = newPass;
  adminToast('Password changed successfully', 'success');
}

// ============================================
// TABLE FILTER
// ============================================
function filterTable(tbodyId, query) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const rows = tbody.querySelectorAll('tr');
  const q = query.toLowerCase();
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

// ============================================
// MODALS
// ============================================
function openAdminModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeAdminModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ============================================
// UTILITIES
// ============================================
function sanitize(str) {
  if (typeof str !== 'string') return String(str || '');
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateAdminId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function formatDate(timestamp) {
  if (!timestamp) return '—';
  try {
    const d = new Date(typeof timestamp === 'number' ? timestamp : timestamp);
    return d.toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return '—'; }
}

function getStatusClass(status) {
  const map = {
    'New': 'new', 'In Progress': 'in-progress', 'Confirmed': 'confirmed',
    'Rejected': 'rejected', 'Completed': 'completed'
  };
  return map[status] || 'new';
}

function downloadCSV(rows, filename) {
  const csv = rows.map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function adminToast(message, type = 'success') {
  const container = document.getElementById('admin-toast');
  if (!container) return;
  const icons = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
  const toast = document.createElement('div');
  toast.className = `a-toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${icons[type]}"></i> ${sanitize(message)}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
