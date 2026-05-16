import { motion } from 'motion/react';
import { TreeDeciduous, Compass, Landmark, Globe, ShieldCheck, Zap } from 'lucide-react';

const partners = [
  { 
    name: 'Neem Tree Travels', 
    description: 'Expertise in sustainable and eco-conscious spiritual journeys across the Hijaz region.',
    icon: TreeDeciduous,
    color: 'text-emerald-500'
  },
  { 
    name: 'Rehla Travels & Tours', 
    description: 'Specializing in historical Islamic heritage tours and luxury desert expeditions.',
    icon: Compass,
    color: 'text-gold-premium'
  },
  { 
    name: 'Minaar-e-Haram Travels', 
    description: 'Premium hospitality management for VIP pilgrims with exclusive Haram-view suites.',
    icon: Landmark,
    color: 'text-blue-500'
  }
];

export default function Partners() {
  return (
    <div className="max-w-7xl mx-auto px-6 relative">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-deep/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold-premium/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-gold-premium tracking-[0.4em] font-bold uppercase text-[10px] mb-4 block">Strategic Alliance</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-main mb-6">Global Partners Network</h2>
          <p className="text-sub max-w-2xl mx-auto font-light text-lg">
            Connecting premium spiritual service providers across the globe to deliver an unmatched experience for our pilgrims.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-gold-premium to-transparent mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {partners.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -15, transition: { duration: 0.3 } }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group relative"
          >
            {/* Glass Card */}
            <div className="glass-dark p-8 md:p-10 rounded-[3rem] border border-white/10 h-full flex flex-col items-center text-center group-hover:border-gold-premium/40 transition-all duration-500 shadow-2xl overflow-hidden">
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon Container */}
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-premium/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <partner.icon size={40} className={`${partner.color} relative z-10`} />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-serif font-bold text-main mb-4 tracking-wide group-hover:text-gold-premium transition-colors">
                {partner.name}
              </h3>
              <p className="text-sub text-sm leading-relaxed mb-8 font-light flex-grow">
                {partner.description}
              </p>

              {/* Verified Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-deep/10 border border-emerald-deep/20 text-gold-premium text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={12} />
                Certified Partner
              </div>
            </div>
            
            {/* Card Background Pattern (Islamic Geometry) */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 100 100" className="text-gold-premium">
                <path d="M50 0L60 10L70 0L80 10L90 0L100 10V100H0V10L10 0L20 10L30 0L40 10L50 0Z" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Collaboration Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y theme-border"
      >
        {[
          { label: 'Global Offices', val: '12+', icon: Globe },
          { label: 'Service Years', val: '25+', icon: Zap },
          { label: 'Verified Partners', val: '50+', icon: ShieldCheck },
          { label: 'Travel Excellence', val: '100%', icon: Landmark }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <stat.icon size={16} className="text-gold-premium" />
              <span className="text-3xl font-bold font-serif text-main tracking-tighter">{stat.val}</span>
            </div>
            <span className="text-muted text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

