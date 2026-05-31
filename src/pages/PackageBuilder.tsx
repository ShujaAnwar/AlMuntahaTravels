import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Phone, Mail, MapPin, Calendar, Users,
  Hotel, Car, Star, Check, ArrowRight, ArrowLeft,
  Sparkles, CheckCircle, MessageCircle, ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/seo/SEO';

// ─── Data ────────────────────────────────────────────────────────────────────

const JOURNEY_TYPES = [
  { id: 'Umrah', label: 'Umrah', emoji: '🕋', desc: 'Year-round Umrah' },
  { id: 'Ramadan Umrah', label: 'Ramadan Umrah', emoji: '🌙', desc: 'Holy month special' },
  { id: 'Hajj', label: 'Hajj', emoji: '☪️', desc: 'Annual pilgrimage' },
  { id: 'VIP Umrah', label: 'VIP Umrah', emoji: '👑', desc: '5-star luxury' },
  { id: 'Group Umrah', label: 'Group Tour', emoji: '👥', desc: 'Community travel' },
  { id: 'Custom', label: 'Custom Tour', emoji: '✨', desc: 'Build your own' },
];

const DURATIONS = ['7 Days', '10 Days', '12 Days', '14 Days', '15 Days', '21 Days', 'Custom'];

const BUDGETS = [
  { id: 'Economy', label: 'Economy', range: 'Rs. 280,000 – 380,000', color: 'border-slate-400/40 text-slate-300' },
  { id: 'Standard', label: 'Standard', range: 'Rs. 380,000 – 550,000', color: 'border-blue-400/40 text-blue-300' },
  { id: 'Premium', label: 'Premium', range: 'Rs. 550,000 – 800,000', color: 'border-gold-premium/40 text-gold-premium' },
  { id: 'VIP Luxury', label: 'VIP Luxury', range: 'Rs. 800,000+', color: 'border-purple-400/40 text-purple-300' },
];

const HOTEL_DIST = ['Inside Haram', 'Under 100m', 'Under 300m', 'Under 500m', 'No Preference'];

const EXTRAS = [
  { id: 'visa', label: 'Visa Assistance', icon: '📋' },
  { id: 'transport', label: 'Airport Transfer', icon: '🚗' },
  { id: 'ziyarat', label: 'Ziyarat Tours', icon: '🗺️' },
  { id: 'guide', label: 'Guide / Muallim', icon: '📿' },
  { id: 'insurance', label: 'Travel Insurance', icon: '🛡️' },
  { id: 'elderly', label: 'Elderly Assistance', icon: '♿' },
  { id: 'wheelchair', label: 'Wheelchair', icon: '🦽' },
  { id: 'sim', label: 'Saudi SIM Card', icon: '📱' },
];

const STEPS = ['Journey', 'Travelers', 'Preferences', 'Add-Ons', 'Your Details'];

// ─── Step Components ──────────────────────────────────────────────────────────

function StepJourney({ data, set }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {JOURNEY_TYPES.map(j => (
          <button
            key={j.id}
            onClick={() => set({ ...data, journeyType: j.id })}
            className={cn(
              'p-4 rounded-2xl border-2 text-left transition-all',
              data.journeyType === j.id
                ? 'border-[#C9A84C] bg-[#C9A84C]/10 shadow-lg shadow-[#C9A84C]/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            )}
          >
            <div className="text-2xl mb-2">{j.emoji}</div>
            <div className={cn('font-bold text-sm', data.journeyType === j.id ? 'text-[#C9A84C]' : 'text-white')}>
              {j.label}
            </div>
            <div className="text-xs text-white/50 mt-0.5">{j.desc}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">Departure Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]" />
            <input
              type="date"
              value={data.departureDate}
              onChange={e => set({ ...data, departureDate: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm focus:ring-2 ring-[#C9A84C]/40 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">Duration</label>
          <div className="relative">
            <select
              value={data.duration}
              onChange={e => set({ ...data, duration: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:ring-2 ring-[#C9A84C]/40 outline-none appearance-none"
            >
              <option value="" className="bg-[#064E3B]">Select duration</option>
              {DURATIONS.map(d => <option key={d} value={d} className="bg-[#064E3B]">{d}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTravelers({ data, set }: any) {
  const update = (field: string, val: number) => set({ ...data, [field]: Math.max(0, val) });

  const groups = [
    { field: 'adults', label: 'Adults', sub: '12+ years', min: 1 },
    { field: 'children', label: 'Children', sub: '2–11 years', min: 0 },
    { field: 'infants', label: 'Infants', sub: 'Under 2 years', min: 0 },
  ];

  return (
    <div className="space-y-4">
      {groups.map(g => (
        <div key={g.field} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div>
            <div className="font-bold text-white">{g.label}</div>
            <div className="text-xs text-white/50">{g.sub}</div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => update(g.field, data[g.field] - 1)}
              disabled={data[g.field] <= g.min}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white font-bold disabled:opacity-30 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >−</button>
            <span className="text-white font-black text-xl w-6 text-center">{data[g.field]}</span>
            <button
              onClick={() => update(g.field, data[g.field] + 1)}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white font-bold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >+</button>
          </div>
        </div>
      ))}

      <div>
        <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">Travel Type</label>
        <div className="grid grid-cols-3 gap-3">
          {['Individual', 'Family', 'Group'].map(t => (
            <button
              key={t}
              onClick={() => set({ ...data, travelType: t })}
              className={cn(
                'py-3 rounded-xl border font-bold text-sm transition-all',
                data.travelType === t
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]'
                  : 'border-white/10 text-white/60 hover:border-white/20'
              )}
            >{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepPreferences({ data, set }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-3">Budget Range</label>
        <div className="grid grid-cols-2 gap-3">
          {BUDGETS.map(b => (
            <button
              key={b.id}
              onClick={() => set({ ...data, budget: b.id })}
              className={cn(
                'p-4 rounded-2xl border-2 text-left transition-all',
                data.budget === b.id ? b.color + ' bg-white/5 shadow-lg' : 'border-white/10 text-white/50 hover:border-white/20'
              )}
            >
              <div className="font-bold text-sm mb-1">{b.label}</div>
              <div className="text-xs opacity-70">{b.range}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">
            Makkah Hotel Distance
          </label>
          <div className="relative">
            <Hotel size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]" />
            <select
              value={data.makkahDist}
              onChange={e => set({ ...data, makkahDist: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-3 text-white text-sm outline-none appearance-none"
            >
              {HOTEL_DIST.map(d => <option key={d} value={d} className="bg-[#064E3B]">{d}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">
            Madinah Hotel Distance
          </label>
          <div className="relative">
            <Hotel size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]" />
            <select
              value={data.madinahDist}
              onChange={e => set({ ...data, madinahDist: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-3 text-white text-sm outline-none appearance-none"
            >
              {HOTEL_DIST.map(d => <option key={d} value={d} className="bg-[#064E3B]">{d}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">Room Type</label>
        <div className="flex flex-wrap gap-2">
          {['Single', 'Double', 'Triple', 'Quad', 'Family Room'].map(r => (
            <button
              key={r}
              onClick={() => set({ ...data, roomType: r })}
              className={cn(
                'px-4 py-2 rounded-xl border text-sm font-medium transition-all',
                data.roomType === r
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]'
                  : 'border-white/10 text-white/60 hover:border-white/20'
              )}
            >{r}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepAddOns({ data, set }: any) {
  const toggle = (id: string) => {
    const cur: string[] = data.extras || [];
    set({ ...data, extras: cur.includes(id) ? cur.filter(e => e !== id) : [...cur, id] });
  };

  return (
    <div className="space-y-4">
      <p className="text-white/50 text-sm">Select any additional services you need:</p>
      <div className="grid grid-cols-2 gap-3">
        {EXTRAS.map(e => {
          const selected = (data.extras || []).includes(e.id);
          return (
            <button
              key={e.id}
              onClick={() => toggle(e.id)}
              className={cn(
                'p-4 rounded-2xl border-2 flex items-center gap-3 transition-all text-left',
                selected
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              )}
            >
              <span className="text-xl">{e.icon}</span>
              <span className={cn('text-sm font-medium', selected ? 'text-[#C9A84C]' : 'text-white/70')}>
                {e.label}
              </span>
              {selected && <Check size={14} className="text-[#C9A84C] ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      <div>
        <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">
          Special Instructions (optional)
        </label>
        <textarea
          value={data.notes}
          onChange={e => set({ ...data, notes: e.target.value })}
          rows={3}
          placeholder="Any special requirements, medical needs, or preferences..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:ring-2 ring-[#C9A84C]/40 outline-none resize-none"
        />
      </div>
    </div>
  );
}

function StepDetails({ data, set }: any) {
  const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Other'];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">Full Name *</label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={data.fullName}
              onChange={e => set({ ...data, fullName: e.target.value })}
              placeholder="Muhammad Ali"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm placeholder:text-white/30 focus:ring-2 ring-[#C9A84C]/40 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">WhatsApp Number *</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="tel"
              value={data.whatsapp}
              onChange={e => set({ ...data, whatsapp: e.target.value })}
              placeholder="03xx-xxxxxxx"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm placeholder:text-white/30 focus:ring-2 ring-[#C9A84C]/40 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">Email (optional)</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              value={data.email}
              onChange={e => set({ ...data, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm placeholder:text-white/30 focus:ring-2 ring-[#C9A84C]/40 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-2">City *</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <select
              value={data.city}
              onChange={e => set({ ...data, city: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm outline-none appearance-none"
            >
              <option value="" className="bg-[#064E3B]">Select your city</option>
              {CITIES.map(c => <option key={c} value={c} className="bg-[#064E3B]">{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
        <span className="text-green-400 text-lg flex-shrink-0">🔒</span>
        <p className="text-xs text-white/50">
          Your details are private and secure. We'll only contact you via WhatsApp to share your personalized quote.
          No spam. No sharing with third parties.
        </p>
      </div>
    </div>
  );
}

// ─── Summary Pill Component ───────────────────────────────────────────────────
function SummaryPill({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-white/40 uppercase tracking-wider">{label}</span>
      <span className="text-white text-sm font-semibold">{value}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PackageBuilder() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [direction, setDirection] = useState(1);

  const [data, setData] = useState({
    // Step 0 - Journey
    journeyType: 'Umrah',
    departureDate: '',
    duration: '10 Days',
    // Step 1 - Travelers
    adults: 1,
    children: 0,
    infants: 0,
    travelType: 'Individual',
    // Step 2 - Preferences
    budget: 'Standard',
    makkahDist: 'Under 300m',
    madinahDist: 'Under 300m',
    roomType: 'Double',
    // Step 3 - Add-Ons
    extras: [] as string[],
    notes: '',
    // Step 4 - Details
    fullName: '',
    whatsapp: '',
    email: '',
    city: '',
  });

  const canProceed = () => {
    if (step === 4) return data.fullName.trim() && data.whatsapp.trim() && data.city;
    return true;
  };

  const goNext = () => {
    if (!canProceed()) return;
    setDirection(1);
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };
  const goPrev = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setIsSubmitting(true);
    // Build API payload
    const payload = {
      personal: {
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        contact: data.whatsapp,
        email: data.email,
        city: data.city,
        travelers: data.adults + data.children + data.infants,
        type: data.travelType,
      },
      journey: {
        type: data.journeyType,
        departureDate: data.departureDate,
        returnDate: '',
        flexible: false,
        days: parseInt(data.duration) || 10,
      },
      makkah: { distancePref: data.makkahDist, hotels: [] },
      madinah: { distancePref: data.madinahDist, hotels: [] },
      rooms: { type: [data.roomType], smoking: false, connected: false, elderly: data.extras.includes('elderly') },
      food: { plan: 'No Meals', preference: [] },
      transport: { required: data.extras.includes('transport'), type: 'Car', services: [] },
      extras: data.extras,
      budget: { range: data.budget, customAmount: 0 },
      notes: data.notes,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) setIsSuccess(true);
      else throw new Error('Server error');
    } catch {
      alert('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success Screen ──
  if (isSuccess) {
    const waMsg = encodeURIComponent(
      `Assalamualaikum! I just submitted my ${data.journeyType} package request on your website.\nName: ${data.fullName}\nTravelers: ${data.adults + data.children} persons\nDuration: ${data.duration}\nBudget: ${data.budget}\nPlease share a customized quote. JazakAllah!`
    );
    return (
      <div className="min-h-screen bg-[#020d09] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Request Submitted!</h2>
          <p className="text-white/60 mb-2">بارك الله فيكم</p>
          <p className="text-white/60 text-sm mb-8">
            Our team will contact you on <span className="text-[#C9A84C] font-bold">{data.whatsapp}</span> within 2 hours with your personalized quote.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-left space-y-2">
            <SummaryPill label="Package Type" value={data.journeyType} />
            <SummaryPill label="Duration" value={data.duration} />
            <SummaryPill label="Travelers" value={`${data.adults + data.children} persons`} />
            <SummaryPill label="Budget" value={data.budget} />
          </div>

          <a
            href={`https://wa.me/923001234567?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-colors mb-3"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp Now
          </a>
          <button
            onClick={() => { setIsSuccess(false); setStep(0); }}
            className="text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            Submit another request
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Progress ──
  const progress = ((step) / (STEPS.length - 1)) * 100;

  const stepContent = [
    <StepJourney data={data} set={setData} />,
    <StepTravelers data={data} set={setData} />,
    <StepPreferences data={data} set={setData} />,
    <StepAddOns data={data} set={setData} />,
    <StepDetails data={data} set={setData} />,
  ];

  const stepDescriptions = [
    'What kind of journey are you planning?',
    'How many people are traveling?',
    'Set your preferences & budget',
    'Any extra services needed?',
    'Where should we send your quote?',
  ];

  return (
    <div className="min-h-screen bg-[#020d09] pt-20 pb-10">
      <SEO title="Build Your Umrah Package | AL MUNTAHA TRAVELS" description="Customize your perfect Umrah or Hajj package in 5 easy steps. Get a personalized quote via WhatsApp." />

      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">Free Customization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Build Your Umrah Package</h1>
          <p className="text-white/50 text-sm">5 simple steps — Get your personalized quote on WhatsApp</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < step ? 'bg-[#C9A84C] text-black cursor-pointer' :
                    i === step ? 'bg-[#064E3B] border-2 border-[#C9A84C] text-[#C9A84C]' :
                    'bg-white/10 text-white/30'
                  )}
                >
                  {i < step ? <Check size={12} /> : i + 1}
                </button>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block w-12 h-0.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#C9A84C] transition-all duration-500"
                      style={{ width: i < step ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Mobile progress bar */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden sm:hidden">
            <div className="h-full bg-[#C9A84C] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Step Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          {/* Step Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
                Step {step + 1} of {STEPS.length}
              </span>
              <span className="text-white/20 text-xs">•</span>
              <span className="text-white/40 text-xs">{STEPS[step]}</span>
            </div>
            <h2 className="text-lg font-bold text-white">{stepDescriptions[step]}</h2>
          </div>

          {/* Step Body */}
          <div className="p-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.2 }}
              >
                {stepContent[step]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6 flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={goPrev}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white/60 font-medium text-sm hover:border-white/20 hover:text-white transition-all"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={goNext}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all',
                  canProceed()
                    ? 'bg-[#C9A84C] hover:bg-[#b8973d] text-black shadow-lg shadow-[#C9A84C]/20'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                )}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !canProceed()}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all',
                  !isSubmitting && canProceed()
                    ? 'bg-[#C9A84C] hover:bg-[#b8973d] text-black shadow-lg shadow-[#C9A84C]/20'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <MessageCircle size={18} />
                    Get My Custom Quote
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mini summary bar (shows after step 0) */}
        {step > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap gap-4 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl"
          >
            <SummaryPill label="Type" value={data.journeyType} />
            {data.duration && <SummaryPill label="Duration" value={data.duration} />}
            {step > 1 && <SummaryPill label="Travelers" value={`${data.adults + data.children + data.infants} persons`} />}
            {step > 2 && <SummaryPill label="Budget" value={data.budget} />}
          </motion.div>
        )}

        {/* Trust signals */}
        <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
          {['✅ No deposit required', '🔒 100% confidential', '⚡ Quote in 2 hours'].map(t => (
            <span key={t} className="text-white/40 text-xs">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
