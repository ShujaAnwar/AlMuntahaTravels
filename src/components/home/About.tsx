import { motion, useInView } from 'motion/react';
import { ShieldCheck, Star, Users, MapPin, Heart, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  
  const start = () => {
    if (started) return;
    setStarted(true);
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };
  
  return { count, start };
}

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { count, start } = useCounter(end, 2000);

  useEffect(() => {
    if (isInView) start();
  }, [isInView]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start group">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-4xl md:text-5xl font-black font-serif text-main leading-none"
      >
        <span className="text-gold-premium">{count.toLocaleString()}</span>
        <span className="text-gold-premium">{suffix}</span>
      </motion.div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted mt-2 font-bold">{label}</span>
    </div>
  );
}

const stats = [
  { end: 15000, suffix: '+', label: 'Happy Pilgrims' },
  { end: 850, suffix: '+', label: 'Successful Tours' },
  { end: 200, suffix: '+', label: 'Hotels Connected' },
  { end: 12, suffix: '+', label: 'Years Experience' },
];

const whyUs = [
  { icon: ShieldCheck, title: 'Fully Licensed', desc: 'Pakistan Tourism Development Corporation & Saudi MOH registered agency.' },
  { icon: Heart, title: 'With Barakah', desc: 'We treat every pilgrim as a Guest of Allah — with the utmost respect and care.' },
  { icon: Award, title: 'Premium Quality', desc: 'Handpicked 3–5 star hotels with proximity to Haram for your spiritual focus.' },
  { icon: TrendingUp, title: 'Transparent Pricing', desc: 'No hidden costs. All-inclusive packages with complete peace of mind.' },
];

const milestones = [
  { year: '2012', event: 'Company Founded', desc: 'Started with a small team and big dreams to serve the Ummah.' },
  { year: '2015', event: 'First 1000 Pilgrims', desc: 'Achieved our first major milestone serving 1,000+ pilgrims.' },
  { year: '2018', event: 'VIP Services Launch', desc: 'Expanded to offer exclusive VIP 5-star Umrah experiences.' },
  { year: '2020', event: 'Digital Transformation', desc: 'Launched online booking system for seamless experience.' },
  { year: '2023', event: 'Agency Network', desc: 'Built a network of 50+ partner agencies across Pakistan.' },
  { year: '2026', event: 'Innovation Hub', desc: 'Introducing AI-powered custom package builder for pilgrims.' },
];

export default function About() {
  const { theme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6" id="about">
      
      {/* ===== HEADER ===== */}
      <div className="text-center mb-16 md:mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Our Story & Mission
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Journeying with Grace,{' '}
          <span className="text-gold-premium italic">Serving with Honor</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-sub mx-auto"
        >
          Founded with a vision to make the sacred journey accessible and comfortable for every Muslim, 
          AL MUNTAHA TRAVELS has become Pakistan's most trusted Umrah services brand.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-premium to-transparent mx-auto mt-6"
        />
      </div>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20 md:mb-32">
        
        {/* LEFT: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold uppercase tracking-wider",
            theme === 'dark' ? "bg-emerald-deep/20 border border-emerald-deep/30 text-emerald-400" : "bg-emerald-deep/10 border border-emerald-deep/20 text-emerald-600"
          )}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Trusted Since 2012
          </div>

          <h3 className="text-3xl md:text-4xl font-serif font-bold text-main mb-6 leading-tight">
            We Don't Just Arrange Travel —{' '}
            <span className="text-gold-premium italic">We Curate Sacred Experiences</span>
          </h3>
          
          <p className="text-sub leading-relaxed mb-6 font-light text-base">
            AL MUNTAHA TRAVELS was founded on the belief that every Muslim deserves to perform Umrah and Hajj 
            with dignity, comfort, and spiritual focus. Over 12+ years, we have served 15,000+ pilgrims from 
            across Pakistan with premium hotel stays, reliable transport, and dedicated on-ground support.
          </p>
          
          <p className="text-sub leading-relaxed mb-10 font-light text-base">
            Our team of experienced travel professionals, Islamic scholars, and hospitality experts 
            ensure that your journey is not just a trip — it's a life-changing spiritual transformation.
          </p>

          {/* Mission & Vision Cards */}
          <div className="space-y-4 mb-10">
            {[
              { 
                icon: ShieldCheck, 
                title: 'Our Mission', 
                desc: 'To provide seamless, spiritual, and stress-free travel solutions that allow you to focus entirely on your ibadah.'
              },
              {
                icon: Star,
                title: 'Our Vision',
                desc: 'To be the global leader in Islamic travel, known for our integrity, innovation, and commitment to the Ummah.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3 }}
                className={cn(
                  "flex gap-4 items-start p-5 rounded-2xl border transition-all duration-300 group hover:border-gold-premium/30",
                  theme === 'dark' ? "bg-white/3 border-white/5" : "bg-white border-slate-200 shadow-sm"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-deep/30 flex items-center justify-center flex-shrink-0 border border-emerald-deep/50 group-hover:bg-gold-premium/10 transition-colors">
                  <item.icon size={18} className="text-gold-premium" />
                </div>
                <div>
                  <h4 className="text-main font-bold mb-1 text-sm">{item.title}</h4>
                  <p className="text-sub text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-premium text-black font-bold rounded-full text-sm shadow-lg shadow-gold-premium/20 hover:shadow-gold-premium/40 transition-all"
          >
            <CheckCircle size={16} />
            Get a Free Consultation
          </motion.a>
        </motion.div>

        {/* RIGHT: Image & Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Main Image */}
          <div className="relative rounded-3xl overflow-hidden group">
            <div className="aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=75&w=800"
                srcSet="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=60&w=480 480w, https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=75&w=800 800w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Al-Masjid an-Nabawi - Madinah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Overlay Badge */}
            <div className="absolute bottom-6 left-6 glass border border-white/20 backdrop-blur-md rounded-2xl px-5 py-3">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold-premium" />
                <span className="text-white text-sm font-bold">Al-Masjid an-Nabawi, Madinah</span>
              </div>
            </div>
            
            {/* Floating Award Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 bg-gold-premium text-black rounded-2xl p-4 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-2xl font-black">12+</div>
                <div className="text-[9px] font-black uppercase tracking-wider">Years of Trust</div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className={cn(
            "grid grid-cols-2 gap-4 p-6 rounded-3xl border",
            theme === 'dark' ? "bg-white/3 border-white/5" : "bg-white border-slate-200 shadow-lg"
          )}>
            {stats.map((stat, i) => (
              <div key={i} className={cn(
                "p-4 rounded-2xl border-r border-b",
                i % 2 === 1 && "border-r-0",
                i >= 2 && "border-b-0",
                theme === 'dark' ? "border-white/5" : "border-slate-100"
              )}>
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ===== WHY CHOOSE US ===== */}
      <div className="mb-20 md:mb-32">
        <div className="text-center mb-12">
          <motion.span className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Why Choose Us
          </motion.span>
          <motion.h2 className="text-3xl md:text-4xl font-serif font-bold text-main" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            The AL MUNTAHA Difference
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className={cn(
                "group p-6 md:p-8 rounded-3xl border cursor-default transition-all duration-300 hover:border-gold-premium/30",
                theme === 'dark' ? "bg-white/3 border-white/5" : "bg-white border-slate-200 shadow-sm hover:shadow-lg"
              )}
            >
              <div className="w-12 h-12 rounded-2xl bg-gold-premium/10 border border-gold-premium/20 flex items-center justify-center mb-5 group-hover:bg-gold-premium group-hover:border-gold-premium transition-all duration-300">
                <item.icon size={22} className="text-gold-premium group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-main font-bold mb-2 text-base">{item.title}</h3>
              <p className="text-sub text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== TIMELINE ===== */}
      <div>
        <div className="text-center mb-12">
          <motion.span className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Our Journey
          </motion.span>
          <motion.h2 className="text-3xl md:text-4xl font-serif font-bold text-main" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Milestones of Excellence
          </motion.h2>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-premium/30 to-transparent hidden md:block" />
          
          <div className="space-y-6 md:space-y-0">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "flex items-center gap-6 md:gap-12 relative",
                  "flex-row md:odd:flex-row md:even:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className={cn(
                  "flex-1 p-5 md:p-6 rounded-2xl border hover:border-gold-premium/20 transition-all group",
                  theme === 'dark' ? "bg-white/3 border-white/5" : "bg-white border-slate-200 shadow-sm",
                  "md:max-w-[calc(50%-3rem)]",
                  i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                )}>
                  <div className="flex items-start gap-3">
                    <span className="text-gold-premium font-black text-xl font-serif">{milestone.year}</span>
                    <div>
                      <h4 className="text-main font-bold text-sm mb-1">{milestone.event}</h4>
                      <p className="text-sub text-xs leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-premium shadow-[0_0_12px_rgba(201,168,76,0.6)] border-2 border-emerald-dark" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
