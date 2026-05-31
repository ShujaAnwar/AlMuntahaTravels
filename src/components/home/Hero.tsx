import { motion } from 'motion/react';
import { ChevronDown, ArrowRight, Phone, Shield, Star, Globe } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        let n = 0;
        const step = end / 80;
        const t = setInterval(() => {
          n += step;
          if (n >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(n));
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, started]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { val: 15000, suf: '+', label: 'Pilgrims' },
  { val: 850, suf: '+', label: 'Tours' },
  { val: 12, suf: '+', label: 'Years' },
  { val: 200, suf: '+', label: 'Hotels' },
];

const BADGES = [
  { icon: Shield, text: 'Ministry Registered', color: 'text-emerald-400' },
  { icon: Star, text: 'ATAP Certified', color: 'text-[#C9A84C]' },
  { icon: Globe, text: 'Saudi MOH Approved', color: 'text-blue-400' },
];

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background Image — static, no heavy parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=75&w=1600"
          fetchPriority="high"
          decoding="async"
          alt="Holy Kaaba Makkah"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#020d09]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full pt-20">

        {/* Bismillah Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-5"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 border border-[#C9A84C]/30 bg-[#C9A84C]/8 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold">
              بسم الله الرحمن الرحيم
            </span>
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-white mb-4 leading-[1.06] tracking-tight"
        >
          Your Trusted{' '}
          <span className="bg-gradient-to-r from-[#C9A84C] via-[#e8c97a] to-[#C9A84C] bg-clip-text text-transparent">
            Umrah Journey
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-3 leading-relaxed"
        >
          Premium Umrah &amp; Hajj packages from Karachi — trusted by 15,000+ pilgrims since 2012
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/40 text-sm mb-8 font-urdu"
          style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
        >
          الله کی مہمانی کا بہترین انتظام
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link to="/builder">
            <button className="group px-8 py-4 bg-[#C9A84C] hover:bg-[#b8973d] text-black font-bold rounded-full flex items-center gap-2 transition-all shadow-lg shadow-[#C9A84C]/25 text-sm sm:text-base">
              Build My Package Free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <a
            href="https://wa.me/923132710182"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-8 py-4 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full flex items-center gap-2 transition-all backdrop-blur-sm text-sm sm:text-base">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </button>
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-5 mt-8"
        >
          {BADGES.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 text-white/50">
              <b.icon size={13} className={b.color} />
              <span className="text-[10px] font-medium tracking-wider">{b.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-16 sm:bottom-10 left-0 right-0 z-10 px-4"
      >
        <div className="max-w-2xl mx-auto grid grid-cols-4 gap-0 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center py-3 sm:py-4 ${i < 3 ? 'border-r border-white/10' : ''}`}
            >
              <span className="text-xl sm:text-2xl font-bold text-[#C9A84C]">
                <AnimatedCounter end={s.val} suffix={s.suf} />
              </span>
              <span className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/25 z-10"
      >
        <ChevronDown size={18} />
      </motion.div>

      {/* Mobile sticky call button */}
      <a
        href="tel:+923132710182"
        className="fixed bottom-6 left-4 z-50 md:hidden flex items-center gap-2 px-4 py-3 bg-[#064E3B] border border-emerald-700/50 rounded-full shadow-lg"
      >
        <Phone size={15} className="text-[#C9A84C]" />
        <span className="text-xs font-bold text-white">Call Now</span>
      </a>
    </div>
  );
}
