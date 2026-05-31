import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ChevronDown, ArrowRight, Phone, Star, Shield, Globe } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useSystem } from '../../context/SystemContext';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

// Animated Counter Component
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Floating Islamic Geometric Pattern
function IslamicPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,10 121,40 155,40 131,60 140,95 100,75 60,95 69,60 45,40 79,40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <polygon points="100,25 116,48 142,48 122,63 130,88 100,73 70,88 78,63 58,48 84,48" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 6"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 6"/>
      <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 6"/>
      <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 6"/>
    </svg>
  );
}

const trustBadges = [
  { icon: Shield, text: 'Ministry Registered', color: 'text-emerald-400' },
  { icon: Star, text: 'ATAP Certified', color: 'text-gold-premium' },
  { icon: Globe, text: 'Saudi MOH Approved', color: 'text-blue-400' },
];

const heroStats = [
  { label: 'Happy Pilgrims', value: 15000, suffix: '+' },
  { label: 'Successful Tours', value: 850, suffix: '+' },
  { label: 'Years of Trust', value: 12, suffix: '+' },
  { label: 'Partner Hotels', value: 200, suffix: '+' },
];

export default function Hero() {
  const { companyInfo } = useSystem();
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center" aria-label="Hero Section">
      
      {/* ===== CINEMATIC BACKGROUND ===== */}
      <motion.div
        style={{ y, scale, willChange: 'transform' }}
        className="absolute inset-0 z-0"
      >
        {/* Primary Hero Image */}
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1920"
          srcSet="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=60&w=640 640w,
                  https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=70&w=1200 1200w,
                  https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1920 1920w"
          sizes="100vw"
          fetchPriority="high"
          decoding="async"
          alt="Holy Kaaba - Masjid al-Haram, Makkah"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark/60 via-transparent to-emerald-dark/40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] z-10" />
      </motion.div>

      {/* ===== ANIMATED ISLAMIC PATTERNS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Large rotating geometric - top right */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] text-gold-premium/8"
        >
          <IslamicPattern className="w-full h-full" />
        </motion.div>
        
        {/* Medium counter-rotating - bottom left */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-[400px] h-[400px] text-gold-premium/6"
        >
          <IslamicPattern className="w-full h-full" />
        </motion.div>

        {/* Glowing orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-premium/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-deep/20 rounded-full blur-[120px]"
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 rounded-full bg-gold-premium/60"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${20 + (i * 11) % 60}%`,
            }}
          />
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        style={{ y: textY, opacity, willChange: 'transform' }}
        className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto w-full pt-24 md:pt-0"
      >
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-2.5 border border-gold-premium/40 bg-gold-premium/8 rounded-full backdrop-blur-md">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-gold-premium rounded-full"
            />
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.35em] text-gold-premium font-bold">
              بسم الله الرحمن الرحيم
            </span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-2 h-2 bg-gold-premium rounded-full"
            />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-4 md:mb-6 leading-[1.05] tracking-tight"
        >
          <span className="block">Your Trusted</span>
          <span className="block text-gradient mt-1">
            Journey Towards
          </span>
          <span className="block">
            <span className="italic">Haram</span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-sm sm:text-base md:text-xl text-white/75 font-light max-w-2xl mx-auto mb-4 leading-relaxed px-2"
        >
          Premium Umrah & Travel Services with Comfort, Care & Barakah —{' '}
          <span className="text-gold-premium font-medium">AL MUNTAHA TRAVELS</span>
        </motion.p>

        {/* Urdu tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/50 font-urdu text-sm md:text-base mb-10 md:mb-12 urdu-text"
        >
          الله کی مہمانی کا بہترین انتظام — ہمارا اعزاز ہے
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link to="/builder" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full sm:w-auto group px-8 md:px-12 py-4 md:py-5 bg-gold-premium text-black font-bold rounded-full flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.5)]"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="text-sm md:text-base tracking-wide">Book Umrah Now</span>
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform" size={18} />
            </motion.button>
          </Link>

          {/* Secondary CTA - Contact */}
          <a href="https://wa.me/923132710182" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto group px-8 md:px-10 py-4 md:py-5 border border-white/20 glass text-white font-medium rounded-full flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/30 transition-all"
            >
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-sm md:text-base tracking-wide">WhatsApp Us</span>
            </motion.button>
          </a>

          {/* Tertiary - View Packages */}
          <Link to="/#packages" className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full border border-gold-premium/20 text-gold-premium font-medium flex items-center gap-2 hover:bg-gold-premium/10 transition-all text-sm"
            >
              View Packages
              <ChevronDown className="group-hover:translate-y-1 transition-transform" size={16} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12"
        >
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-white/60">
              <badge.icon size={14} className={badge.color} />
              <span className="text-[10px] md:text-xs font-medium tracking-wider">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ===== STATS BAR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-20 md:bottom-12 left-0 right-0 z-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="glass border border-white/10 backdrop-blur-xl rounded-2xl md:rounded-full px-4 md:px-12 py-4 md:py-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center md:px-8",
                  i < 3 && "md:border-r border-white/10"
                )}
              >
                <span className="text-2xl md:text-3xl font-serif font-bold text-gold-premium leading-none">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-widest mt-1 text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 md:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 z-20"
      >
        <span className="text-[8px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={14} />
      </motion.div>

      {/* ===== PHONE CTA (Mobile Sticky) ===== */}
      <motion.a
        href="tel:+923132710182"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 left-4 z-50 md:hidden flex items-center gap-2 px-4 py-3 bg-emerald-deep border border-emerald-500/30 rounded-full shadow-lg shadow-emerald-900/50"
      >
        <Phone size={16} className="text-gold-premium" />
        <span className="text-xs font-bold text-white">Call Now</span>
      </motion.a>
    </div>
  );
}
