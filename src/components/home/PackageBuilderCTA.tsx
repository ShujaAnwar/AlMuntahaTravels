import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router';
import { 
  Sparkles, ArrowRight, Wand2, Star, ShieldCheck, 
  Map, Compass, Heart, Gem, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

export default function PackageBuilderCTA() {
  const { theme } = useTheme();
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section 
      ref={containerRef}
      className={cn(
        "relative py-24 md:py-40 overflow-hidden",
        theme === 'dark' ? "bg-[#020202]" : "bg-slate-50"
      )}
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Geometric Pattern (Simulated with div) */}
        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute -top-24 -right-24 w-96 h-96 border-[1px] border-gold-premium/10 rounded-[4rem] rotate-12 opacity-40"
        />
        <motion.div 
          style={{ y: y2, rotate: -rotate }}
          className="absolute -bottom-24 -left-24 w-96 h-96 border-[1px] border-emerald-500/10 rounded-[4rem] -rotate-12 opacity-30"
        />

        {/* Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-premium/5 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[180px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={cn(
          "relative rounded-[4rem] p-10 md:p-20 border-[1px] overflow-hidden group shadow-2xl transition-all duration-1000",
          theme === 'dark' 
            ? "bg-[#080808]/80 backdrop-blur-3xl border-white/5 shadow-gold-premium/5" 
            : "bg-white border-slate-200 shadow-xl"
        )}>
          {/* Internal Animated Border */}
          <div className="absolute inset-0 border-[1px] border-gold-premium/0 group-hover:border-gold-premium/20 transition-all duration-1000 rounded-[4rem]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gold-premium/10 border border-gold-premium/30 text-gold-premium text-[10px] font-black uppercase tracking-[0.4em] shadow-lg shadow-gold-premium/5"
              >
                <div className="w-2 h-2 rounded-full bg-gold-premium animate-pulse" />
                <Wand2 size={16} /> Premium Virtual Architect
              </motion.div>

              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="text-6xl md:text-[120px] font-serif font-black text-main leading-[0.8] tracking-tighter"
                >
                  <span className="block animate-pulse-slow">Customize Your</span>
                  <span className="text-gold-premium italic block translate-x-4 md:translate-x-12 glow-text">Umrah Package</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl md:text-5xl font-urdu text-sub leading-relaxed urdu-text opacity-90 border-l-2 border-gold-premium pl-8"
                >
                  Apni Roohani Safar Ko Apni Marzi Sy Design Karain
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-xl text-muted max-w-xl leading-relaxed font-light backdrop-blur-sm bg-black/10 p-6 rounded-3xl border border-white/5"
              >
                Build your own personalized Umrah journey according to your comfort, hotels, transport, rooms and budget. Experience complete freedom and spiritual excellence.
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-col md:flex-row gap-6 pt-6"
              >
                <Link 
                  to="/builder"
                  className="group relative px-16 py-8 bg-gold-premium text-black rounded-3xl flex items-center justify-center gap-4 text-2xl font-black shadow-[0_20px_50px_rgba(212,175,55,0.4)] hover:scale-105 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
                  Start Building Now
                </Link>
                <Link 
                  to="/#packages"
                  className="px-16 py-8 rounded-3xl border-2 border-emerald-500/30 text-main font-bold flex items-center justify-center gap-3 hover:bg-emerald-500/10 transition-all backdrop-blur-md"
                >
                  Explore Packages <ChevronRight size={24} />
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/5"
              >
                <div className="flex items-center gap-2 text-sub">
                  <ShieldCheck size={18} className="text-gold-premium" />
                  <span className="text-xs font-bold uppercase tracking-wider">Verified Makkah Services</span>
                </div>
                <div className="flex items-center gap-2 text-sub">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Expert Support 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-sub">
                  <Gem size={18} className="text-gold-premium" />
                  <span className="text-xs font-bold uppercase tracking-wider">Luxury Options</span>
                </div>
              </motion.div>
            </div>

            <div className="relative lg:block hidden">
              {/* Floating Cards (Cinematic) */}
              <div className="relative w-full h-[600px]">
                <motion.div 
                   animate={{ y: [0, -20, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-0 right-0 w-72 p-8 glass-dark border border-white/10 rounded-[2.5rem] shadow-2xl z-20"
                >
                  <div className="w-16 h-16 bg-gold-premium/20 rounded-2xl flex items-center justify-center text-gold-premium mb-6">
                    <Star size={32} />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-main mb-2">5-Star Hajj</h4>
                  <p className="text-xs text-sub leading-relaxed">Direct Haram access with clock tower view suites.</p>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 20, 0] }}
                   transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute top-1/3 left-0 w-80 p-8 glass-dark border border-emerald-500/20 rounded-[2.5rem] shadow-2xl z-10"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                    <Map size={32} />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-main mb-2">Ziyarat Tours</h4>
                  <p className="text-xs text-sub leading-relaxed">Visit Maqam-e-Ibrahim and Jabal al-Nour with private guides.</p>
                </motion.div>

                <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-10 right-10 w-64 p-8 bg-gold-premium rounded-[2.5rem] shadow-[0_20px_60px_rgba(182,143,62,0.3)] z-30 text-black overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                  <h4 className="text-4xl font-serif font-bold mb-1 tracking-tighter">10k+</h4>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-70">Happy Travelers</p>
                  <div className="mt-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-black" />)}
                  </div>
                </motion.div>

                {/* Islamic Geometric Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-20">
                   <Compass size={500} strokeWidth={0.5} className="text-gold-premium animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
