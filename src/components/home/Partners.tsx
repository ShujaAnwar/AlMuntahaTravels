import { motion } from 'motion/react';
import { Globe, ShieldCheck, Award, Handshake, ArrowUpRight, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const partners = [
  { 
    name: 'Neem Tree Travels', 
    tagline: 'Eco-Conscious Islamic Journeys',
    description: 'Expertise in sustainable and eco-conscious spiritual journeys across the Hijaz region with a focus on responsible pilgrimage.',
    country: 'Pakistan',
    specialty: 'Group Umrah & Heritage Tours',
    color: 'from-emerald-500/20 to-emerald-900/20',
    borderColor: 'hover:border-emerald-500/40',
    glowColor: 'shadow-emerald-500/10',
    initials: 'NT',
    bgInitials: 'bg-emerald-900/50',
    textInitials: 'text-emerald-400',
    yearPartner: '2019',
  },
  { 
    name: 'Rehla Travels & Tours', 
    tagline: 'Luxury Heritage Expeditions',
    description: 'Specializing in historical Islamic heritage tours and luxury desert expeditions with expert scholar-guided tours.',
    country: 'Pakistan',
    specialty: 'VIP Tours & Desert Expeditions',
    color: 'from-gold-premium/20 to-amber-900/20',
    borderColor: 'hover:border-gold-premium/40',
    glowColor: 'shadow-gold-premium/10',
    initials: 'RH',
    bgInitials: 'bg-amber-900/50',
    textInitials: 'text-gold-premium',
    yearPartner: '2020',
  },
  { 
    name: 'Minaar-e-Haram Travels', 
    tagline: 'Premium Haram Hospitality',
    description: 'Premium hospitality management for VIP pilgrims with exclusive Haram-view suites and personalized concierge services.',
    country: 'Saudi Arabia',
    specialty: 'VIP Hotel Management & Concierge',
    color: 'from-blue-500/20 to-blue-900/20',
    borderColor: 'hover:border-blue-400/40',
    glowColor: 'shadow-blue-500/10',
    initials: 'MH',
    bgInitials: 'bg-blue-900/50',
    textInitials: 'text-blue-400',
    yearPartner: '2021',
  }
];

const saudiPartners = [
  { name: 'Pullman ZamZam', type: '5★ Hotel Partner', location: 'Makkah' },
  { name: 'Anwar Al Madinah', type: '5★ Hotel Partner', location: 'Madinah' },
  { name: 'Emaar Hospitality', type: 'Property Group', location: 'Both Cities' },
  { name: 'Saudi Airlines', type: 'Aviation Partner', location: 'International' },
];

const colabStats = [
  { label: 'Global Network', value: '50+', icon: Globe },
  { label: 'Partner Agencies', value: '12+', icon: Handshake },
  { label: 'Hotel Partners', value: '200+', icon: Award },
  { label: 'Countries Served', value: '8+', icon: MapPin },
];

export default function Partners() {
  const { theme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      
      {/* Background decorations */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-deep/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-premium/8 rounded-full blur-[150px] pointer-events-none" />

      {/* ===== HEADER ===== */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Strategic Alliance</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-main mb-5">
            Global Partners{' '}
            <span className="text-gold-premium italic">Network</span>
          </h2>
          <p className="section-sub mx-auto text-center">
            Connecting premium spiritual service providers across the globe to deliver an unmatched, 
            blessed pilgrimage experience for every traveler.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-premium to-transparent mx-auto mt-6"
          />
        </motion.div>
      </div>

      {/* ===== PARTNER CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 relative z-10">
        {partners.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -12, transition: { duration: 0.3 } }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="group relative"
          >
            {/* Card */}
            <div className={cn(
              "relative p-7 md:p-8 rounded-[2.5rem] border h-full flex flex-col overflow-hidden transition-all duration-500",
              `bg-gradient-to-br ${partner.color}`,
              theme === 'dark'
                ? `border-white/10 ${partner.borderColor} hover:shadow-2xl ${partner.glowColor}`
                : `border-slate-200 ${partner.borderColor} hover:shadow-xl`
            )}>
              
              {/* Background Islamic geometric */}
              <div className="absolute -top-8 -right-8 w-40 h-40 opacity-0 group-hover:opacity-5 transition-all duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-white w-full h-full">
                  <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"/>
                </svg>
              </div>

              {/* Card glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem] bg-gradient-to-br from-white/3 to-transparent" />

              {/* Top row: Logo area + Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 text-xl font-black shadow-lg",
                  partner.bgInitials, partner.textInitials
                )}>
                  {partner.initials}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-wider text-white/60">
                  <ShieldCheck size={10} className="text-gold-premium" />
                  Certified Partner
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-main mb-1 group-hover:text-gold-premium transition-colors duration-300">
                  {partner.name}
                </h3>
                <p className={cn("text-xs font-bold uppercase tracking-widest mb-4", partner.textInitials)}>
                  {partner.tagline}
                </p>
                <p className="text-sub text-sm leading-relaxed mb-5">
                  {partner.description}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-5 border-t border-white/5 pt-5">
                <div className="flex items-center gap-2 text-sub text-xs">
                  <MapPin size={12} className="text-gold-premium flex-shrink-0" />
                  <span>{partner.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sub text-xs">
                  <Award size={12} className="text-gold-premium flex-shrink-0" />
                  <span>{partner.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-sub text-xs">
                  <Handshake size={12} className="text-gold-premium flex-shrink-0" />
                  <span>Partner since {partner.yearPartner}</span>
                </div>
              </div>

              {/* CTA */}
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-premium group-hover:gap-3 transition-all duration-300">
                Learn More <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== SAUDI HOTEL PARTNERS ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className={cn(
          "rounded-3xl p-8 md:p-10 mb-16 border relative overflow-hidden",
          theme === 'dark' ? "bg-white/2 border-white/5" : "bg-white border-slate-200 shadow-lg"
        )}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-premium/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-gold-premium text-xs font-bold uppercase tracking-widest mb-2 block">Hotel Partnerships</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-main">
              Saudi Hospitality Partners
            </h3>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-premium/10 border border-gold-premium/20">
            <ShieldCheck size={14} className="text-gold-premium" />
            <span className="text-gold-premium text-xs font-bold">All Partners Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {saudiPartners.map((hotel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-4 rounded-2xl border hover:border-gold-premium/30 transition-all group",
                theme === 'dark' ? "bg-white/3 border-white/5" : "bg-slate-50 border-slate-200"
              )}
            >
              <div className="text-gold-premium text-lg font-serif font-bold mb-1 leading-tight group-hover:text-gold-light transition-colors">
                {hotel.name}
              </div>
              <div className="text-muted text-[10px] uppercase font-bold tracking-wider mb-1">{hotel.type}</div>
              <div className="flex items-center gap-1 text-[10px] text-sub">
                <MapPin size={9} className="text-gold-premium" /> {hotel.location}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===== STATS ROW ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y theme-border"
      >
        {colabStats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <stat.icon size={16} className="text-gold-premium" />
              <span className="text-3xl md:text-4xl font-bold font-serif text-main">{stat.value}</span>
            </div>
            <span className="text-muted text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
