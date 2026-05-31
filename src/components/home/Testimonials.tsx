import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, Play, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const testimonials = [
  {
    name: "Shuja Anwaar",
    role: "Premium Pilgrim — Karachi",
    comment: "MashAllah, the service provided by AL MUNTAHA TRAVELS was beyond excellence. From the moment we landed in Jeddah till we left, everything was handled with extreme care. The hotel was just 50 meters from Haram. SubhanAllah!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=shuja1",
    language: 'en',
    package: 'VIP Umrah Package',
    date: 'March 2026'
  },
  {
    name: "حاجی محمد اسلم",
    role: "خاندانی عمرہ گروپ — لاہور",
    comment: "الحمدللہ، ہمارا عمرہ کا سفر بہت خوبصورت رہا۔ ہوٹل حرم سے بالکل قریب تھا۔ ٹرانسپورٹ اور کھانا سب بہترین تھا۔ AL MUNTAHA TRAVELS ٹیم نے ہر قدم پر ساتھ دیا۔ جزاک اللہ خیر!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=haji1",
    language: 'ur',
    package: 'Family Umrah Package',
    date: 'February 2026'
  },
  {
    name: "Zeeshan Ali",
    role: "Solo Traveler — Islamabad",
    comment: "The VIP package is truly royal. Having a private scholar for Ziyarat made our journey so much more meaningful. The Fairmont Clock Tower view of Kaaba was absolutely breathtaking. I cried tears of joy. Highly recommended!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=zeeshan2",
    language: 'en',
    package: 'Royal VIP Package',
    date: 'January 2026'
  },
  {
    name: "Rabia Khan",
    role: "Group Leader — Peshawar",
    comment: "I organized a group of 40 people from our masjid and Al Muntaha handled everything perfectly. Visa processing was smooth, flights were on time, and their on-ground staff in Makkah were extremely helpful. Will use again for Hajj!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=rabia3",
    language: 'en',
    package: 'Group Umrah Tour',
    date: 'December 2025'
  },
  {
    name: "آپا عائشہ صدیقی",
    role: "رمضان عمرہ گروپ — کراچی",
    comment: "رمضان میں عمرہ کرنے کا موقع ملا۔ AL MUNTAHA TRAVELS نے ہمارے لیے بہترین پیکج ترتیب دیا۔ سحر و افطار کا انتظام بہت عمدہ تھا۔ اللہ تعالیٰ اس ٹیم کو جزائے خیر عطا فرمائے۔",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=ayesha4",
    language: 'ur',
    package: 'Ramadan Umrah Special',
    date: 'April 2025'
  },
];

function TestimonialCard({ review, isActive }: { review: typeof testimonials[0]; isActive: boolean }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative p-6 md:p-8 rounded-[2rem] border overflow-hidden group transition-all duration-500 h-full",
        isActive
          ? "border-gold-premium/40 shadow-[0_0_30px_rgba(201,168,76,0.15)]"
          : theme === 'dark' ? "border-white/5 hover:border-gold-premium/20" : "border-slate-200 hover:border-gold-premium/30 shadow-sm hover:shadow-md",
        theme === 'dark' ? "bg-white/3" : "bg-white"
      )}
    >
      {/* Background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold-premium/5 rounded-full blur-3xl group-hover:bg-gold-premium/10 transition-all duration-500" />
      
      {/* Quote icon */}
      <Quote className="absolute top-6 right-6 text-gold-premium/10 group-hover:text-gold-premium/20 transition-colors" size={48} />
      
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={14} className="fill-gold-premium text-gold-premium" />
        ))}
      </div>
      
      {/* Review text */}
      <blockquote className={cn(
        "text-sub leading-relaxed mb-6 relative z-10",
        review.language === 'ur' 
          ? 'font-urdu text-lg md:text-xl direction-rtl text-right line-height-loose' 
          : 'font-light italic text-sm md:text-base'
      )}>
        &ldquo;{review.comment}&rdquo;
      </blockquote>
      
      {/* Package badge */}
      <div className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5 border",
        theme === 'dark' 
          ? "bg-gold-premium/8 border-gold-premium/15 text-gold-premium" 
          : "bg-amber-50 border-amber-200 text-amber-700"
      )}>
        {review.package}
      </div>
      
      {/* Reviewer info */}
      <div className="flex items-center gap-4 border-t border-current/5 pt-5">
        <div className="relative">
          <img 
            src={review.avatar} 
            alt={review.name}
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover border-2 border-gold-premium/30"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-emerald-dark flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
              <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div>
          <h4 className="text-main font-bold text-sm">{review.name}</h4>
          <p className="text-muted text-[11px] mt-0.5">{review.role}</p>
          <p className="text-gold-premium text-[10px] font-bold mt-0.5">{review.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { theme } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIdx(prev => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying]);

  const navigate = (dir: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    setActiveIdx(prev => 
      dir === 'next' 
        ? (prev + 1) % testimonials.length 
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6" id="reviews">
      
      {/* ===== HEADER ===== */}
      <div className="text-center mb-14">
        <motion.span className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Testimonials
        </motion.span>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Voices of{' '}
          <span className="text-gold-premium italic">Peace & Gratitude</span>
        </motion.h2>
        <motion.p className="section-sub mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Join 15,000+ pilgrims who trusted us with their most sacred journey. Read real experiences from our valued customers.
        </motion.p>
      </div>

      {/* ===== FEATURED REVIEW (LARGE) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "relative p-8 md:p-14 rounded-[3rem] border overflow-hidden",
              theme === 'dark' 
                ? "bg-gradient-to-br from-emerald-deep/20 via-black/40 to-gold-premium/5 border-gold-premium/20"
                : "bg-gradient-to-br from-emerald-50 to-amber-50 border-gold-premium/30 shadow-xl"
            )}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-premium/5 rounded-full blur-[120px] pointer-events-none" />
            <Quote className="absolute top-8 right-8 text-gold-premium/10" size={120} />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={testimonials[activeIdx].avatar}
                    alt={testimonials[activeIdx].name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gold-premium/40 object-cover shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-gold-premium/20 animate-ping-slow" />
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold-premium text-gold-premium" />
                  ))}
                </div>
              </div>
              
              {/* Review */}
              <div>
                <blockquote className={cn(
                  "text-main leading-relaxed mb-6",
                  testimonials[activeIdx].language === 'ur'
                    ? 'font-urdu text-2xl md:text-3xl direction-rtl text-right'
                    : 'text-xl md:text-2xl font-serif italic'
                )}>
                  &ldquo;{testimonials[activeIdx].comment}&rdquo;
                </blockquote>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <h4 className="text-main font-bold text-lg">{testimonials[activeIdx].name}</h4>
                    <p className="text-sub text-sm">{testimonials[activeIdx].role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border",
                      theme === 'dark' 
                        ? "bg-gold-premium/10 border-gold-premium/20 text-gold-premium"
                        : "bg-amber-100 border-amber-300 text-amber-700"
                    )}>
                      {testimonials[activeIdx].package}
                    </span>
                    <span className="text-muted text-xs">{testimonials[activeIdx].date}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ===== MINI CARDS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {testimonials.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => {
              setActiveIdx(i);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer"
          >
            <TestimonialCard review={review} isActive={i === activeIdx} />
          </motion.div>
        ))}
      </div>

      {/* ===== NAVIGATION DOTS & CONTROLS ===== */}
      <div className="flex items-center justify-center gap-6 mb-12">
        <button
          onClick={() => navigate('prev')}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-premium/50 hover:bg-gold-premium/10 transition-all"
        >
          <ChevronLeft size={18} className="text-main" />
        </button>
        
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); setIsAutoPlaying(false); }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIdx ? "w-8 bg-gold-premium" : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
        
        <button
          onClick={() => navigate('next')}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-premium/50 hover:bg-gold-premium/10 transition-all"
        >
          <ChevronRight size={18} className="text-main" />
        </button>
      </div>

      {/* ===== VIDEO TESTIMONIALS CTA ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "flex flex-col md:flex-row items-center gap-8 p-8 md:p-10 rounded-3xl border",
          theme === 'dark' ? "bg-white/2 border-white/5" : "bg-white border-slate-200 shadow-lg"
        )}
      >
        <div className="w-16 h-16 rounded-2xl bg-gold-premium flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold-premium/30">
          <Play size={24} className="text-black ml-1" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-main font-bold text-xl mb-1">Watch Video Testimonials</h3>
          <p className="text-sub text-sm">See real video reviews from our pilgrims — hear their stories in their own words.</p>
        </div>
        <Link
          to="/video-reviews"
          className="flex items-center gap-2 px-6 py-3 bg-gold-premium text-black font-bold rounded-full hover:scale-105 transition-all text-sm shadow-lg whitespace-nowrap"
        >
          Watch Now <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
