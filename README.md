# AL MUNTAHA TRAVELS — Complete Digital Platform

Premium Umrah & Hajj travel booking ecosystem from Karachi, Pakistan. Mobile-first, conversion-optimized, with full CRM capabilities.

---

## 🌟 Platform Overview

| Feature | Status |
|---------|--------|
| Main Website (mobile-first) | ✅ Complete |
| 6-Step Custom Package Builder | ✅ Complete |
| Admin Panel with Kanban CRM | ✅ Complete |
| Travel Agent Portal | ✅ Complete |
| Database Connectivity (CRUD) | ✅ Complete |
| SEO (Schema.org, OG, Sitemap) | ✅ Complete |
| PWA Manifest | ✅ Complete |

---

## 📂 Project Structure

```
index.html              → Main website (mobile-first, conversion-optimized)
admin.html              → Admin panel with dashboard, CRUD, Kanban leads
agent-portal.html       → Travel agent portal (lead management)
css/
  ├── style.css         → Main website styles (41KB, mobile-first)
  └── admin.css         → Admin panel styles with Kanban board (25KB+)
js/
  ├── main.js           → Main website JS with DB connectivity (29KB)
  └── admin.js          → Admin panel JS with full CRUD (43KB+)
manifest.json           → PWA manifest
robots.txt              → Disallows admin/agent pages
sitemap.xml             → XML sitemap for SEO
```

---

## 🔗 Entry Points & URIs

| Page | Path | Description |
|------|------|-------------|
| **Homepage** | `index.html` | Main customer-facing website |
| **Admin Panel** | `admin.html` | Full CRM & content management |
| **Agent Portal** | `agent-portal.html` | Lead management for agents |

### Homepage Sections (anchor links)
- `#hero` — Hero with CTA + Quick Action buttons
- `#trust` — Why Choose Us (4 trust items)
- `#about` — About section with animated counters
- `#packages` — Packages loaded from DB with filter
- `#builder` — 6-Step Custom Package Builder
- `#reviews` — Customer reviews from DB
- `#gallery` — Photo gallery with lightbox
- `#partners` — Partner agencies from DB
- `#blog` — Blog articles (static)
- `#faq` — FAQ accordion (6 questions)
- `#contact` — Contact form + WhatsApp + Map

---

## 🔐 Login Credentials

| Portal | Email | Password |
|--------|-------|----------|
| Admin Panel | `admin@almuntahatravels.com` | `admin123` |
| Agent Portal | `agent@almuntahatravels.com` | `agent123` |

---

## 🗃️ Data Models (Table API)

### `packages` (14 fields)
| Field | Type | Description |
|-------|------|-------------|
| id | text | UUID |
| title | text | Package name |
| category | text | Economy / Standard / VIP / Custom |
| price | number | Price per person (PKR) |
| duration | text | e.g. "10 Days / 9 Nights" |
| hotel_makkah | text | Makkah hotel name |
| hotel_madinah | text | Madinah hotel name |
| distance_haram | text | Distance from Haram |
| transport | text | Transport details |
| features | array | List of included features |
| description | rich_text | Full description |
| image_url | text | Package image URL |
| status | text | published / draft |
| availability | bool | Is available? |

**Seed data**: 4 packages (Economy, Standard, VIP, Ramadan)

### `leads` (22 fields)
| Field | Type | Description |
|-------|------|-------------|
| id | text | UUID |
| customer_name | text | Full name |
| whatsapp | text | WhatsApp number |
| phone | text | Phone number |
| email | text | Email address |
| city | text | City |
| travelers | number | Total travelers |
| traveler_type | text | Individual / Family / Group |
| journey_type | text | Umrah / Hajj / Ramadan etc. |
| hotel_makkah | text | Makkah hotel preference |
| hotel_madinah | text | Madinah hotel preference |
| room_type | text | Room sharing type |
| transport | text | Flight/transport preference |
| extra_services | array | Add-on services selected |
| budget_range | text | Economy / Standard / Premium / VIP |
| special_notes | rich_text | Special requirements |
| status | text | New / In Progress / Confirmed / Rejected / Completed |
| assigned_agent | text | Assigned agent ID |
| agent_accepted_at | datetime | When agent accepted |

**Seed data**: 5 leads (various statuses)

### `reviews` (7 fields)
Customer reviews with name, text, rating (1-5), date, language.  
**Seed data**: 4 reviews

### `partners` (6 fields)
Partner agencies with name, logo, country, description.  
**Seed data**: 3 partners (Neem Tree, Rehla, Minaar-e-Haram)

### `blog_posts` (9 fields)
Blog articles with title, content, category, image, author. **No seed data yet.**

### `contact_messages` (7 fields)
Contact form submissions with name, phone, subject, message, status. **Populated via contact form.**

---

## ✅ Completed Features

### Main Website
- [x] Mobile-first responsive design (works on all screen sizes)
- [x] Dark/Light theme toggle with localStorage persistence
- [x] Hero section with animated bismillah, badge, CTAs
- [x] 4 Quick Action cards (Custom Package, Packages, WhatsApp, Call)
- [x] Trust section (4 items with scroll animations)
- [x] About section with animated counters (10,000+ pilgrims, 300+ tours, etc.)
- [x] Packages loaded dynamically from database with category filter (All/Economy/Standard/VIP)
- [x] Package detail modal with full info and booking CTA
- [x] **6-Step Custom Package Builder** with:
  - Step 1: Travel Type & Season (Umrah/Hajj, season, month)
  - Step 2: Group Size & Room (travelers, adults/children/elderly, room sharing)
  - Step 3: Hotel Preferences (star rating, distance, same/different cities)
  - Step 4: Flight Preferences (economy/business, airline, direct flights)
  - Step 5: Add-on Services (8 toggleable add-ons + Madinah nights)
  - Step 6: Contact Details (name, WhatsApp, email, notes)
  - Auto-save to sessionStorage (resume if user leaves)
  - Submits to `leads` table via API
  - Success modal with WhatsApp follow-up
- [x] Reviews loaded from database (grid layout, not carousel)
- [x] Photo gallery with lightbox overlay
- [x] Partners loaded from database
- [x] Blog section (static 3 articles)
- [x] FAQ accordion (6 questions, one-at-a-time toggle)
- [x] Contact form → saves to `contact_messages` table
- [x] Booking form → saves to `leads` table
- [x] Sticky mobile bottom bar (WhatsApp + Call) — appears after scrolling
- [x] Floating WhatsApp button (desktop only)
- [x] Scroll progress bar
- [x] Scroll-triggered animations (fade up/left/right with IntersectionObserver)
- [x] Loading screen with brand animation
- [x] Active nav link highlighting on scroll

### Admin Panel
- [x] Secure login (sessionStorage-based)
- [x] Dashboard with 5 stat cards (packages, leads, reviews, contacts, partners)
- [x] Chart.js lead analytics (monthly chart)
- [x] Recent leads quick-view on dashboard
- [x] **Kanban board lead management** (New → Contacted → Confirmed → Completed → Lost)
  - Drag-free: click "move" buttons to advance leads through pipeline
  - WhatsApp quick-contact on each card
  - Visual badges for budget range and journey type
  - Status counts per column
- [x] Table view toggle (switch between Kanban and table view)
- [x] Packages CRUD (add, edit, delete)
- [x] Reviews CRUD
- [x] Gallery management (URL-based)
- [x] Blog posts CRUD
- [x] Partners CRUD
- [x] Contact messages viewer
- [x] Lead CSV export
- [x] Lead detail modal with full info + WhatsApp/Call buttons
- [x] Settings page (WhatsApp number, office info)

### Agent Portal
- [x] Secure login
- [x] Dashboard stats (available leads, accepted, confirmed, conversion rate)
- [x] Lead cards with accept/reject flow
- [x] Lead locking (24-hour timeout)
- [x] WhatsApp contact per lead
- [x] Filter by: All, New, Accepted, In Progress, Confirmed
- [x] 5 seed leads available for testing

### SEO & Technical
- [x] Schema.org JSON-LD (TravelAgency, AggregateRating)
- [x] Open Graph meta tags
- [x] Twitter Card meta tags
- [x] XML Sitemap
- [x] robots.txt (blocks admin/agent pages)
- [x] PWA manifest.json
- [x] Lazy loading on images
- [x] Deferred JS loading
- [x] Semantic HTML5 structure
- [x] WCAG accessibility (focus-visible, aria-labels, reduced-motion support)
- [x] Print styles
- [x] Safe area insets for notched phones

---

## 🚧 Not Yet Implemented / Recommended Next Steps

1. **Real authentication** — Current login is client-side demo; implement proper server-side auth
2. **Image optimization** — Convert images to WebP format, add srcset for responsive images
3. **Blog content** — Add actual blog posts with SEO-optimized content
4. **Urdu language toggle** — Add Urdu version of homepage for local audience
5. **Push notifications** — Notify agents of new leads
6. **Payment integration** — JazzCash/EasyPaisa integration for deposits
7. **Email notifications** — Send confirmation emails on form submissions
8. **Google Analytics** — Add GA4 tracking for conversion measurement
9. **Real phone numbers** — Replace placeholder +92 300 0000000 with actual business numbers
10. **Service Worker** — Implement offline caching for PWA
11. **A/B testing** — Test different CTA copy and placements
12. **Google Business Profile** — Sync reviews from Google

---

## 🎨 Design System

| Property | Value |
|----------|-------|
| Primary Font | Inter (400-900) |
| Arabic Font | Amiri (400, 700) |
| Emerald (brand) | `#047857` |
| Gold (accent) | `#d4a843` |
| WhatsApp Green | `#25D366` |
| Dark BG | `#0f1a14` |
| Light BG | `#ffffff` |
| Border Radius | 8px / 12px / 16px / 24px |
| Min Touch Target | 48×48px |
| Min Body Font | 16px |

---

## 📱 Mobile-First Approach

- All styles are mobile-first (base styles = mobile, breakpoints add desktop)
- Breakpoints: 640px (tablet), 1024px (desktop), 1400px (large desktop)
- Sticky bottom bar with WhatsApp + Call (mobile only)
- Floating WhatsApp button (desktop only)
- Single-column layouts on mobile, multi-column on desktop
- Touch targets minimum 48×48px
- Font sizes minimum 16px body text
- Safe area padding for notched phones

---

*Built for Al Muntaha Travels, Karachi, Pakistan — 2025*
