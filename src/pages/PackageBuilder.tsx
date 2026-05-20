import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, MapPin, Calendar, Hotel, Bed, Utensils, 
  Car, Plus, Star, Check, ArrowRight, ArrowLeft,
  ChevronRight, Heart, Sparkles, ShieldCheck, Bot
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/seo/SEO';

const STEPS = [
  "Personal", "Journey", "Dates", "Makkah", "Madinah", 
  "Rooms", "Food", "Transport", "Extras", "Budget", "Notes", "Review"
];

const JOURNEY_TYPES = [
  'Umrah', 'Hajj', 'Ramadan Umrah', 'VIP Umrah', 'Group Umrah', 'Custom Tour'
];

const DISTANCES = [
  'Inside Haram Area', 'Under 100m', 'Under 300m', 
  'Under 500m', 'Under 1000m', 'Budget Distance'
];

const ROOM_TYPES = ['Single', 'Double', 'Triple', 'Quad', 'Quint', 'Family Room', 'Suite'];

const MEAL_PLANS = ['No Meals', 'Breakfast only', 'Half Board', 'Full Board'];

const FOOD_PREFS = ['Pakistani Food', 'Indian Food', 'Arabic Food', 'Buffet'];

const VEHICLES = [
  'Car', 'Staria', 'GMC', 'Hiace', 'Coaster', 'Bus', 'VIP Luxury Car', 'Haramain Train'
];

const EXTRA_SERVICES = [
  'Wheelchair Assistance', 'Elderly Assistance', 'Child Assistance', 
  'Ihram Kit', 'SIM Card', 'Laundry', 'Guide/Muallim', 
  'Ziyarat Tours', 'Travel Insurance', 'Visa Assistance'
];

const BUDGET_RANGES = ['Economy', 'Standard', 'Premium', 'VIP Luxury'];

// Mock hotels data for the dynamic list
const MOCK_HOTELS = [
  { name: 'Hotel Hilton Makkah', dist: 'Inside Haram Area', rating: 5, makkah: true },
  { name: 'Fairmont Clock Tower', dist: 'Inside Haram Area', rating: 5, makkah: true },
  { name: 'Swissôtel Al Maqam', dist: 'Under 100m', rating: 5, makkah: true },
  { name: 'Conrad Makkah', dist: 'Under 100m', rating: 5, makkah: true },
  { name: 'Anjum Hotel', dist: 'Under 300m', rating: 5, makkah: true },
  { name: 'Movenpick Hajar', dist: 'Under 100m', rating: 5, makkah: true },
  { name: 'Emaar Grand', dist: 'Under 500m', rating: 4, makkah: true },
  { name: 'Le Meridien Madinah', dist: 'Under 300m', rating: 5, makkah: false },
  { name: 'Pullman Zamzam Madinah', dist: 'Under 100m', rating: 5, makkah: false },
  { name: 'Anwar Al Madinah', dist: 'Inside Haram Area', rating: 5, makkah: false },
];

export default function PackageBuilder() {
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      whatsapp: '',
      contact: '',
      email: '',
      city: '',
      travelers: 1,
      type: 'Individual'
    },
    journey: {
      type: 'Umrah',
      departureDate: '',
      returnDate: '',
      flexible: false,
      days: 0
    },
    makkah: {
      distancePref: 'Under 300m',
      hotels: [] as string[]
    },
    madinah: {
      distancePref: 'Under 300m',
      hotels: [] as string[]
    },
    rooms: {
      type: [] as string[],
      smoking: false,
      connected: false,
      elderly: false
    },
    food: {
      plan: 'No Meals',
      preference: [] as string[]
    },
    transport: {
      required: false,
      type: 'Car',
      services: [] as string[]
    },
    extras: [] as string[],
    budget: {
      range: 'Standard' as any,
      customAmount: 500000
    },
    notes: ''
  });

  useEffect(() => {
    if (formData.journey.departureDate && formData.journey.returnDate) {
      const start = new Date(formData.journey.departureDate);
      const end = new Date(formData.journey.returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData(prev => ({
        ...prev,
        journey: { ...prev.journey, days: diffDays }
      }));
    }
  }, [formData.journey.departureDate, formData.journey.returnDate]);

  const [isAiLoading, setIsAiLoading] = useState(false);

  const getAiSuggestion = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Given my current selections for an ${formData.journey.type} journey for ${formData.personal.travelers} people with a budget of ${formData.budget.customAmount} PKR, what hotels and services would you recommend? My notes: ${formData.notes}`,
          history: []
        })
      });
      const data = await response.json();
      if (data.text) {
        setFormData(prev => ({ ...prev, notes: prev.notes + "\n\n--- AI SUGGESTION ---\n" + data.text }));
        setStep(10); // Move to notes step to show result
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const toggleSelection = (category: string, item: string) => {
    setFormData(prev => {
      const current = (prev as any)[category] as any;
      const list = Array.isArray(current) ? current : current.hotels || current.type || current.preference || [];
      const newList = list.includes(item) 
        ? list.filter((i: string) => i !== item)
        : [...list, item];
      
      if (Array.isArray(current)) {
        return { ...prev, [category]: newList };
      } else if (current.hotels) {
        return { ...prev, [category]: { ...current, hotels: newList } };
      } else if (current.type && category === 'rooms') {
        return { ...prev, rooms: { ...current, type: newList } };
      } else if (current.preference && category === 'food') {
        return { ...prev, food: { ...current, preference: newList } };
      }
      return prev;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">Full Name</label>
              <input 
                type="text" 
                className="w-full theme-bg-alt border theme-border rounded-2xl px-6 py-4 focus:ring-2 ring-gold-premium/50 outline-none transition-all"
                placeholder="Enter your name"
                value={formData.personal.fullName}
                onChange={e => setFormData({...formData, personal: {...formData.personal, fullName: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">WhatsApp Number</label>
              <input 
                type="text" 
                className="w-full theme-bg-alt border theme-border rounded-2xl px-6 py-4 focus:ring-2 ring-gold-premium/50 outline-none transition-all"
                placeholder="03xx-xxxxxxx"
                value={formData.personal.whatsapp}
                onChange={e => setFormData({...formData, personal: {...formData.personal, whatsapp: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">Contact Number</label>
              <input 
                type="text" 
                className="w-full theme-bg-alt border theme-border rounded-2xl px-6 py-4 focus:ring-2 ring-gold-premium/50 outline-none transition-all"
                placeholder="Mobile number"
                value={formData.personal.contact}
                onChange={e => setFormData({...formData, personal: {...formData.personal, contact: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">Email</label>
              <input 
                type="email" 
                className="w-full theme-bg-alt border theme-border rounded-2xl px-6 py-4 focus:ring-2 ring-gold-premium/50 outline-none transition-all"
                placeholder="your@email.com"
                value={formData.personal.email}
                onChange={e => setFormData({...formData, personal: {...formData.personal, email: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">City</label>
              <input 
                type="text" 
                className="w-full theme-bg-alt border theme-border rounded-2xl px-6 py-4 focus:ring-2 ring-gold-premium/50 outline-none transition-all"
                placeholder="Search city"
                value={formData.personal.city}
                onChange={e => setFormData({...formData, personal: {...formData.personal, city: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">Travelers</label>
              <input 
                type="number" 
                className="w-full theme-bg-alt border theme-border rounded-2xl px-6 py-4 focus:ring-2 ring-gold-premium/50 outline-none transition-all"
                min="1"
                value={formData.personal.travelers}
                onChange={e => setFormData({...formData, personal: {...formData.personal, travelers: parseInt(e.target.value)}})}
              />
            </div>
          </div>
          <div className="flex gap-4">
            {['Family', 'Group', 'Individual'].map(t => (
              <button 
                key={t}
                onClick={() => setFormData({...formData, personal: {...formData.personal, type: t as any}})}
                className={cn(
                  "flex-1 py-4 rounded-2xl border transition-all font-medium",
                  formData.personal.type === t ? "border-gold-premium bg-gold-premium/10 text-gold-premium shadow-lg shadow-gold-premium/10" : "border-white/5 theme-bg-alt text-sub"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>
      );
      case 1: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {JOURNEY_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setFormData({...formData, journey: {...formData.journey, type: type as any}})}
              className={cn(
                "p-8 rounded-[2rem] border transition-all text-center flex flex-col items-center gap-4",
                formData.journey.type === type ? "border-gold-premium bg-gold-premium/10 text-gold-premium ring-4 ring-gold-premium/5" : "border-white/5 glass-dark text-sub"
              )}
            >
              <Sparkles className={formData.journey.type === type ? 'text-gold-premium' : 'text-white/20'} />
              <span className="font-serif font-bold text-lg">{type}</span>
            </button>
          ))}
        </motion.div>
      );
      case 2: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">Departure Date</label>
              <div className="relative">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-premium" size={20} />
                <input 
                  type="date"
                  className="w-full theme-bg-alt border theme-border rounded-2xl pl-16 pr-6 py-5 focus:ring-2 ring-gold-premium/50 outline-none"
                  value={formData.journey.departureDate}
                  onChange={e => setFormData({...formData, journey: {...formData.journey, departureDate: e.target.value}})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-main">Return Date</label>
              <div className="relative">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-premium" size={20} />
                <input 
                  type="date"
                  className="w-full theme-bg-alt border theme-border rounded-2xl pl-16 pr-6 py-5 focus:ring-2 ring-gold-premium/50 outline-none"
                  value={formData.journey.returnDate}
                  onChange={e => setFormData({...formData, journey: {...formData.journey, returnDate: e.target.value}})}
                />
              </div>
            </div>
          </div>
          <div className="p-8 glass-dark rounded-[2.5rem] flex items-center justify-between border border-white/5">
            <div>
              <h4 className="text-xl font-serif font-bold text-main mb-1">Flexible Dates?</h4>
              <p className="text-sub text-sm">Allow us to suggest better pricing based on dates.</p>
            </div>
            <button 
              onClick={() => setFormData({...formData, journey: {...formData.journey, flexible: !formData.journey.flexible}})}
              className={cn(
                "w-16 h-8 rounded-full relative transition-colors duration-300",
                formData.journey.flexible ? "bg-gold-premium" : "bg-white/10"
              )}
            >
              <div className={cn(
                "absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300",
                formData.journey.flexible ? "left-9" : "left-1"
              )} />
            </button>
          </div>
          {formData.journey.days > 0 && (
             <div className="text-center font-serif text-3xl text-gold-premium animate-bounce">
                {formData.journey.days} Days Spiritual Journey
             </div>
          )}
        </motion.div>
      );
      case 3: 
      case 4:
        const isMakkah = step === 3;
        const currentData = isMakkah ? formData.makkah : formData.madinah;
        const hotels = MOCK_HOTELS.filter(h => h.makkah === isMakkah && (h.dist === currentData.distancePref || currentData.distancePref === 'Budget Distance'));
        
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-8">
            <div className="flex flex-wrap gap-3">
              {DISTANCES.map(d => (
                <button
                  key={d}
                  onClick={() => setFormData({...formData, [isMakkah ? 'makkah' : 'madinah']: { ...currentData, distancePref: d }})}
                  className={cn(
                    "px-6 py-3 rounded-full border text-sm font-medium transition-all",
                    currentData.distancePref === d ? "border-gold-premium bg-gold-premium text-black" : "border-white/10 glass-dark text-sub"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotels.map(h => (
                <div 
                  key={h.name}
                  onClick={() => toggleSelection(isMakkah ? 'makkah' : 'madinah', h.name)}
                  className={cn(
                    "p-6 rounded-3xl border cursor-pointer transition-all flex items-center justify-between group",
                    currentData.hotels.includes(h.name) ? "border-emerald-500 bg-emerald-500/10" : "border-white/5 glass-dark hover:border-white/20"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Hotel className="text-gold-premium" />
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-main">{h.name}</h5>
                      <div className="flex items-center gap-2 text-xs text-sub mt-1">
                        <MapPin size={12} className="text-gold-premium" />
                        {h.dist}
                        <div className="flex gap-1 ml-2">
                          {[...Array(h.rating)].map((_, i) => <Star key={i} size={10} className="fill-gold-premium text-gold-premium" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full border flex items-center justify-center transition-all",
                    currentData.hotels.includes(h.name) ? "border-emerald-500 bg-emerald-500 text-white" : "border-white/10"
                  )}>
                    {currentData.hotels.includes(h.name) && <Check size={16} />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 5: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ROOM_TYPES.map(r => (
              <button
                key={r}
                onClick={() => toggleSelection('rooms', r)}
                className={cn(
                  "p-8 rounded-[2rem] border transition-all text-center flex flex-col items-center gap-4",
                  formData.rooms.type.includes(r) ? "border-gold-premium bg-gold-premium/10 text-gold-premium" : "border-white/5 glass-dark text-sub"
                )}
              >
                <Bed className={formData.rooms.type.includes(r) ? 'text-gold-premium' : 'text-white/20'} />
                <span className="font-medium">{r}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'smoking', label: 'Smoking Room', icon: ShieldCheck },
              { id: 'connected', label: 'Connected Rooms', icon: Plus },
              { id: 'elderly', label: 'Elderly Friendly', icon: Heart }
            ].map(pref => (
              <button
                key={pref.id}
                onClick={() => setFormData({...formData, rooms: { ...formData.rooms, [pref.id]: !(formData.rooms as any)[pref.id] }})}
                className={cn(
                  "p-6 rounded-2xl border flex items-center justify-between transition-all",
                  (formData.rooms as any)[pref.id] ? "border-gold-premium bg-gold-premium/10 text-gold-premium" : "border-white/5 theme-bg-alt text-sub"
                )}
              >
                <div className="flex items-center gap-3">
                  <pref.icon size={20} />
                  <span>{pref.label}</span>
                </div>
                {(formData.rooms as any)[pref.id] && <Check size={16} />}
              </button>
            ))}
          </div>
        </motion.div>
      );
      case 6: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-10">
          <div className="grid grid-cols-2 gap-4">
            {MEAL_PLANS.map(plan => (
              <button
                key={plan}
                onClick={() => setFormData({...formData, food: { ...formData.food, plan }})}
                className={cn(
                  "p-8 rounded-[2rem] border transition-all flex items-center gap-6",
                  formData.food.plan === plan ? "border-gold-premium bg-gold-premium/10 text-gold-premium" : "border-white/5 theme-bg-alt text-sub"
                )}
              >
                <Utensils className={formData.food.plan === plan ? 'text-gold-premium' : 'text-white/20'} />
                <span className="font-serif font-bold text-xl">{plan}</span>
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="text-main font-serif font-bold text-lg">Food Category Preference</h4>
            <div className="flex flex-wrap gap-3">
              {FOOD_PREFS.map(pref => (
                <button
                  key={pref}
                  onClick={() => toggleSelection('food', pref)}
                  className={cn(
                    "px-8 py-4 rounded-2xl border transition-all font-medium",
                    formData.food.preference.includes(pref) ? "border-gold-premium bg-gold-premium/10 text-gold-premium" : "border-white/5 glass-dark text-sub"
                  )}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      );
      case 7: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-10">
           <div className="p-8 glass-dark rounded-[2.5rem] flex items-center justify-between border border-white/5">
            <div>
              <h4 className="text-2xl font-serif font-bold text-main mb-1">Need Transport?</h4>
              <p className="text-sub">Pickups, Transfers and Ziyarats</p>
            </div>
            <button 
              onClick={() => setFormData({...formData, transport: {...formData.transport, required: !formData.transport.required}})}
              className={cn(
                "w-16 h-8 rounded-full relative transition-colors duration-300",
                formData.transport.required ? "bg-emerald-500" : "bg-white/10"
              )}
            >
              <div className={cn(
                "absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300",
                formData.transport.required ? "left-9" : "left-1"
              )} />
            </button>
          </div>

          <AnimatePresence>
            {formData.transport.required && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-8 overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {VEHICLES.map(v => (
                    <button
                      key={v}
                      onClick={() => setFormData({...formData, transport: {...formData.transport, type: v}})}
                      className={cn(
                        "p-6 rounded-3xl border transition-all text-center flex flex-col items-center gap-3",
                        formData.transport.type === v ? "border-gold-premium bg-gold-premium/10 text-gold-premium" : "border-white/5 theme-bg-alt text-sub"
                      )}
                    >
                      <Car size={24} />
                      <span className="text-xs font-bold">{v}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Airport Pickup', 'Makkah to Madinah', 'Ziyarat Tours'].map(serv => (
                    <button
                      key={serv}
                      onClick={() => toggleSelection('transport', serv)}
                      className={cn(
                        "px-6 py-3 rounded-full border text-sm transition-all",
                        formData.transport.services.includes(serv) ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : "border-white/5 glass-dark text-sub"
                      )}
                    >
                      {serv}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
      case 8: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXTRA_SERVICES.map(extra => (
            <button
              key={extra}
              onClick={() => toggleSelection('extras', extra)}
              className={cn(
                "p-6 rounded-2xl border flex items-center justify-between transition-all",
                formData.extras.includes(extra) ? "border-gold-premium bg-gold-premium/10 text-gold-premium" : "border-white/5 theme-bg-alt text-sub"
              )}
            >
              <span className="font-medium">{extra}</span>
              {formData.extras.includes(extra) ? <Check size={18} /> : <Plus size={18} className="opacity-20" />}
            </button>
          ))}
        </motion.div>
      );
      case 9: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BUDGET_RANGES.map(range => (
              <button
                key={range}
                onClick={() => setFormData({...formData, budget: {...formData.budget, range: range as any}})}
                className={cn(
                  "p-8 rounded-[2rem] border transition-all text-center",
                  formData.budget.range === range ? "border-gold-premium bg-gold-premium/10 text-gold-premium" : "border-white/5 glass-dark text-sub"
                )}
              >
                <span className="font-serif font-bold text-xl block mb-2">{range}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Selection</span>
              </button>
            ))}
          </div>
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="flex flex-col items-center mb-4">
              <label className="text-sm font-medium text-main mb-2">Estimated Budget</label>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-serif font-bold text-gold-premium">Rs. {formData.budget.customAmount?.toLocaleString()}</span>
                <span className="text-xl text-white/40 mt-1">Approx. {Math.round(formData.budget.customAmount / 74).toLocaleString()} SAR</span>
              </div>
            </div>
            <input 
              type="range"
              min="50000"
              max="2000000"
              step="10000"
              className="w-full accent-gold-premium h-3 bg-white/10 rounded-full cursor-pointer"
              value={formData.budget.customAmount}
              onChange={e => setFormData({...formData, budget: {...formData.budget, customAmount: parseInt(e.target.value)}})}
            />
            <div className="flex justify-between text-xs text-muted font-bold tracking-widest">
              <span>50,000</span>
              <span>1,000,000</span>
              <span>2,000,000</span>
            </div>
          </div>
        </motion.div>
      );
      case 10: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-4">
          <label className="text-sm font-medium text-main">Any special requirements? (Urdu or English)</label>
          <textarea 
            rows={8}
            className="w-full theme-bg-alt border theme-border rounded-[2rem] p-8 focus:ring-2 ring-gold-premium/50 outline-none transition-all resize-none text-main leading-relaxed"
            placeholder="Tell us about wheelchair needs, food allergies, or specific hotel wishes..."
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
          />
        </motion.div>
      );
      case 11: return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
              <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-6">Personal details</h5>
              <div className="space-y-4">
                <div className="flex justify-between border-b theme-border pb-3">
                  <span className="text-sub font-medium">Name</span>
                  <span className="text-main font-bold">{formData.personal.fullName}</span>
                </div>
                <div className="flex justify-between border-b theme-border pb-3">
                  <span className="text-sub font-medium">Journey</span>
                  <span className="text-main font-bold">{formData.journey.type}</span>
                </div>
                <div className="flex justify-between border-b theme-border pb-3">
                  <span className="text-sub font-medium">Dates</span>
                  <span className="text-main font-bold">{formData.journey.departureDate} — {formData.journey.returnDate}</span>
                </div>
                <div className="flex justify-between border-b theme-border pb-3">
                  <span className="text-sub font-medium">Guests</span>
                  <span className="text-gold-premium font-black">{formData.personal.travelers} Persons</span>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
              <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-6">Hotel selections</h5>
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-sub block mb-2">Makkah: {formData.makkah.distancePref}</span>
                  <div className="flex flex-wrap gap-2">
                    {formData.makkah.hotels.map(h => <span key={h} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-main">{h}</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-sub block mb-2">Madinah: {formData.madinah.distancePref}</span>
                  <div className="flex flex-wrap gap-2">
                    {formData.madinah.hotels.map(h => <span key={h} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-main">{h}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 glass-dark rounded-[2.5rem] border border-gold-premium/30 bg-gold-premium/5 text-center">
             <h4 className="text-2xl font-serif font-bold text-main mb-2">Estimated Budget Range</h4>
             <div className="flex flex-col items-center">
               <span className="text-4xl font-serif font-bold text-gold-premium italic">Rs. {formData.budget.customAmount?.toLocaleString()}</span>
               <span className="text-xl text-white/40 mt-1 italic">~ {Math.round(formData.budget.customAmount / 74).toLocaleString()} SAR</span>
             </div>
             <p className="text-sub text-xs mt-4">Final price will be calculated by our experts based on real-time availability.</p>
          </div>
        </motion.div>
      );
      default: return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
        <SEO title="Inquiry Received | AL MUNTAHA TRAVELS SOLUTIONS" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full glass-dark p-16 rounded-[4rem] border border-emerald-500/30 text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-emerald-500/20">
            <Check size={48} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-main mb-6">Mubarak! Inquiry Received</h2>
          <p className="text-sub text-xl leading-relaxed mb-10 font-light urdu-text">
            Apki inquiry humein receive ho gayi hai. <br/>
            <span className="text-2xl font-bold text-emerald-500">IN SHA ALLAH</span> aapse jald rabta kar liya jayega. <br/>
            JazakAllah Khair.
          </p>
          <div className="p-8 theme-bg-alt rounded-3xl border theme-border mb-10">
            <p className="text-muted italic text-sm">"Please remember us in your valuable duas and reviews."</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary w-full py-6 rounded-2xl flex items-center justify-center gap-3 text-lg"
          >
            Go Back Home <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen pt-32 pb-20 transition-colors duration-500 relative",
      theme === 'dark' ? "bg-black" : "bg-slate-50"
    )}>
      <SEO title="Smart Package Builder | AL MUNTAHA TRAVELS SOLUTIONS" description="Create your own custom Umrah or Hajj package with our smart multi-step wizard." />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-80 space-y-4 md:sticky md:top-32">
            <div className="mb-10">
              <span className="text-gold-premium tracking-[0.3em] font-bold uppercase text-[10px] mb-2 block">Step {step + 1} of {STEPS.length}</span>
              <h2 className="text-3xl font-serif font-bold text-main">{STEPS[step]}</h2>
            </div>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div 
                  key={s} 
                  className={cn(
                    "flex items-center gap-4 transition-all duration-300",
                    step === i ? "translate-x-2" : "opacity-40"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs",
                    step === i ? "bg-gold-premium text-black" : 
                    i < step ? "bg-emerald-500 text-white" : "border border-white/10 text-sub"
                  )}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={cn(
                    "font-medium",
                    step === i ? "text-gold-premium" : "text-sub"
                  )}>{s}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={getAiSuggestion}
                disabled={isAiLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-emerald-deep text-gold-premium border-2 border-gold-premium/50 rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isAiLoading ? 'Analyzing...' : (
                  <>
                    <Bot size={20} />
                    AI Smart Suggest
                  </>
                )}
              </button>
            </div>

            <div className="mt-12 p-8 glass-dark rounded-3xl border border-white/5 space-y-4 bg-gold-premium/5">
              <div className="flex items-center gap-3 text-gold-premium">
                <ShieldCheck size={20} />
                <span className="font-bold text-xs uppercase tracking-widest">Safe & Secure</span>
              </div>
              <p className="text-xs text-sub leading-relaxed">Your spiritual journey is our priority. Every selection is reviewed by certified Muallims and hospitality experts.</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 w-full">
            <div className="glass-dark p-8 md:p-16 rounded-[3rem] border border-white/5 min-h-[600px] flex flex-col">
              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>
              </div>

              <div className="pt-12 mt-12 border-t theme-border flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={step === 0}
                  className={cn(
                    "flex items-center gap-2 font-bold uppercase tracking-widest text-xs transition-opacity px-6 py-4 rounded-xl",
                    step === 0 ? "opacity-0 pointer-events-none" : "hover:text-gold-premium theme-bg-alt text-main"
                  )}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                
                {step === STEPS.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary px-12 py-5 rounded-2xl flex items-center gap-3 font-bold group shadow-2xl shadow-gold-premium/40"
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete My Journey'} 
                    {!isSubmitting && <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="btn-primary px-12 py-5 rounded-2xl flex items-center gap-3 font-bold group shadow-xl shadow-gold-premium/20"
                  >
                    Next Step <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
