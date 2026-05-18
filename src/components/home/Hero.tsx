import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { useSystem } from '../../context/SystemContext';

export default function Hero() {
  const { companyInfo } = useSystem();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-20 md:pt-0">
      {/* Background with Parallax */}
      <motion.div
        style={{ y, willChange: 'transform' }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2070"
          alt="Holy Kaaba"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 border border-gold-premium/30 bg-gold-premium/5 rounded-full mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gold-premium rounded-full animate-pulse"></span>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gold-premium font-bold">Premium Umrah Experiences</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-bold text-white mb-6 md:mb-8 leading-[1.15] tracking-tight">
            {companyInfo.heroTitle}
          </h1>
          <p className="text-base md:text-xl text-white/70 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light px-4 md:px-0">
            {companyInfo.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto">
            <Link to="/builder" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-10 py-4 bg-gold-premium text-black font-bold rounded-full flex items-center justify-center gap-2 group transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              >
                Book Umrah Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
            </Link>
            <Link to="/#packages" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-10 py-4 border border-white/10 glass text-white font-medium rounded-full hover:bg-white/10 transition-all"
              >
                View Packages
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Animated Islamic Patterns (Subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] border border-gold-premium/30 rounded-full"
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </div>
  );
}
