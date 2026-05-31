import { motion, AnimatePresence } from 'motion/react';
import { useSystem } from '../../context/SystemContext';
import { Calendar, MapPin, Clock, ArrowUpRight, Hotel, Check, Star, Users, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { Package } from '../../types';

interface PackagesProps {
  limit?: number;
  filterCategory?: string;
  showTitle?: boolean;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'VIP': { bg: 'bg-gold-premium/15', text: 'text-gold-premium', border: 'border-gold-premium/30' },
  'Standard': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Economy': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-400/30' },
  'Custom': { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-400/30' },
};

const categoryFilters = ['All', 'Economy', 'Standard', 'VIP', 'Custom'];

function PackageModal({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border",
          theme === 'dark' 
            ? "bg-[#030d07] border-white/10"
            : "bg-white border-slate-200 shadow-2xl"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-all border border-white/10"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Hero image */}
        <div className="relative h-56 overflow-hidden rounded-t-[2.5rem]">
          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="text-gold-premium font-black text-3xl">{pkg.price}</span>
            <span className="text-white/60 text-sm ml-1">/ person</span>
          </div>
          <div className={cn(
            "absolute top-4 left-6 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider",
            categoryColors[pkg.category]?.bg || 'bg-white/10',
            categoryColors[pkg.category]?.text || 'text-white',
            "border",
            categoryColors[pkg.category]?.border || 'border-white/20'
          )}>
            {pkg.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-main mb-2">{pkg.title}</h2>
          <p className="text-sub text-sm leading-relaxed mb-6">{pkg.description}</p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: Clock, label: 'Duration', value: pkg.duration },
              { icon: Hotel, label: 'Hotels', value: pkg.hotelDetails },
              { icon: MapPin, label: 'Distance', value: pkg.distanceFromHaram },
              { icon: Calendar, label: 'Transport', value: pkg.transportDetails },
            ].map((item, i) => (
              <div key={i} className={cn(
                "p-4 rounded-2xl border",
                theme === 'dark' ? "bg-white/3 border-white/5" : "bg-slate-50 border-slate-200"
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <item.icon size={14} className="text-gold-premium" />
                  <span className="text-muted text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
                </div>
                <p className="text-main text-sm font-medium leading-snug">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h4 className="text-main font-bold mb-4 text-sm uppercase tracking-wider">What's Included</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-emerald-400" />
                  </div>
                  <span className="text-sub text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/builder"
              onClick={onClose}
              className="flex-1 py-4 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-gold-premium/20"
            >
              Book This Package
              <ArrowUpRight size={16} />
            </Link>
            <a
              href="https://wa.me/923132710182"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 bg-green-500/10 border border-green-500/30 text-green-400 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-green-500/20 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Packages({ limit, filterCategory, showTitle = true }: PackagesProps) {
  const { packages } = useSystem();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const filtered = filterCategory && filterCategory !== 'all'
    ? packages.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase())
    : activeCategory === 'All'
      ? packages
      : packages.filter(p => p.category === activeCategory);

  const displayPackages = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6" id="packages">
      {showTitle && (
        <div className="text-center mb-12 md:mb-16">
          <motion.span className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Holy Pilgrimage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Special Umrah{' '}
            <span className="text-gold-premium italic">Packages 2026</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-sub mx-auto text-center"
          >
            Choose from our carefully curated packages designed to meet your spiritual needs and comfort. 
            All packages include visa processing and 24/7 on-ground support.
          </motion.p>

          {/* Category Filter */}
          {!filterCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mt-8"
            >
              {categoryFilters.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                    activeCategory === cat
                      ? "bg-gold-premium text-black shadow-lg shadow-gold-premium/20"
                      : theme === 'dark'
                        ? "glass border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-gold-premium/50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {displayPackages.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted text-lg">No packages found in this category.</p>
          <button
            onClick={() => setActiveCategory('All')}
            className="mt-4 px-6 py-2 bg-gold-premium text-black font-bold rounded-full text-sm"
          >
            Show All Packages
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {displayPackages.map((pkg, i) => {
              const catStyle = categoryColors[pkg.category] || categoryColors['Economy'];
              
              return (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  transition={{ delay: i * 0.08, layout: { duration: 0.3 } }}
                  className={cn(
                    "group rounded-[2.5rem] overflow-hidden border transition-all duration-500 cursor-pointer",
                    theme === 'dark'
                      ? "bg-white/3 border-white/5 hover:border-gold-premium/25 hover:shadow-2xl hover:shadow-gold-premium/5"
                      : "bg-white border-slate-200 hover:border-gold-premium/30 hover:shadow-xl"
                  )}
                  onClick={() => setSelectedPackage(pkg)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${pkg.title} package`}
                  onKeyDown={e => e.key === 'Enter' && setSelectedPackage(pkg)}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <div className={cn(
                      "absolute top-4 left-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                      catStyle.bg, catStyle.text, catStyle.border
                    )}>
                      {pkg.category}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                      <Star size={10} className="fill-gold-premium text-gold-premium" />
                      <span className="text-white text-[10px] font-bold">4.9</span>
                    </div>
                    
                    {/* Price */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-gold-premium font-black text-xl">{pkg.price}</div>
                      <div className="text-white/60 text-xs">per person</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-main mb-3 leading-snug group-hover:text-gold-premium transition-colors">
                      {pkg.title}
                    </h3>

                    {/* Key details */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-sub text-xs">
                        <Clock size={13} className="text-gold-premium flex-shrink-0" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sub text-xs">
                        <Hotel size={13} className="text-gold-premium flex-shrink-0" />
                        <span className="truncate">{pkg.hotelDetails}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sub text-xs">
                        <MapPin size={13} className="text-gold-premium flex-shrink-0" />
                        <span>{pkg.distanceFromHaram}</span>
                      </div>
                    </div>

                    {/* Features pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {pkg.features.slice(0, 3).map((f, j) => (
                        <span
                          key={j}
                          className={cn(
                            "text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border",
                            theme === 'dark'
                              ? "bg-white/5 border-white/10 text-white/60"
                              : "bg-slate-100 border-slate-200 text-slate-600"
                          )}
                        >
                          {f}
                        </span>
                      ))}
                      {pkg.features.length > 3 && (
                        <span className={cn(
                          "text-[9px] px-2.5 py-1 rounded-full font-bold border",
                          theme === 'dark' ? "bg-gold-premium/10 border-gold-premium/20 text-gold-premium" : "bg-amber-50 border-amber-200 text-amber-700"
                        )}>
                          +{pkg.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-gold-premium font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                        View Details <ChevronRight size={14} />
                      </button>
                      <div className="flex items-center gap-1 text-muted text-xs">
                        <Users size={12} />
                        <span>Min. 1 person</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ===== VIEW ALL CTA ===== */}
      {(limit && filtered.length > limit) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/umrah-packages"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-premium text-black font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-gold-premium/20 text-sm"
          >
            View All Packages
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      )}

      {/* ===== PACKAGE MODAL ===== */}
      <AnimatePresence>
        {selectedPackage && (
          <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
