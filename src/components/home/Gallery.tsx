import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const galleryItems = [
  { 
    url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=75&w=900', 
    size: 'large', 
    title: 'The Holy Kaaba',
    location: 'Masjid al-Haram, Makkah',
    category: 'Makkah'
  },
  { 
    url: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=70&w=500', 
    size: 'small', 
    title: 'Madinah Munawwarah',
    location: 'Al-Madinah, Saudi Arabia',
    category: 'Madinah'
  },
  { 
    url: 'https://images.unsplash.com/photo-1565552645632-d7cd3f98c7b5?auto=format&fit=crop&q=70&w=500', 
    size: 'small', 
    title: 'Masjid al-Nabawi',
    location: 'Madinah, Saudi Arabia',
    category: 'Madinah'
  },
  { 
    url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=70&w=700', 
    size: 'medium', 
    title: 'Haram at Sunset',
    location: 'Makkah al-Mukarramah',
    category: 'Makkah'
  },
  { 
    url: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?auto=format&fit=crop&q=70&w=700', 
    size: 'medium', 
    title: 'Evening Prayer',
    location: 'Masjid al-Haram',
    category: 'Makkah'
  },
  { 
    url: 'https://images.unsplash.com/photo-1551041777-ed07f843d47a?auto=format&fit=crop&q=70&w=900', 
    size: 'large', 
    title: 'Mount Arafat',
    location: 'Arafat, Makkah',
    category: 'Tours'
  },
  {
    url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=70&w=500',
    size: 'small',
    title: 'Pilgrims in Ihram',
    location: 'Masjid al-Haram',
    category: 'Tours'
  },
  {
    url: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&q=70&w=500',
    size: 'small',
    title: 'Jabal al-Nour',
    location: 'Makkah, Saudi Arabia',
    category: 'Tours'
  },
];

const categories = ['All', 'Makkah', 'Madinah', 'Tours'];

export default function Gallery() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filtered = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: typeof galleryItems[0], idx: number) => {
    setLightboxItem(item);
    setLightboxIdx(idx);
  };

  const navigateLightbox = (dir: 'prev' | 'next') => {
    const newIdx = dir === 'next' 
      ? (lightboxIdx + 1) % filtered.length 
      : (lightboxIdx - 1 + filtered.length) % filtered.length;
    setLightboxIdx(newIdx);
    setLightboxItem(filtered[newIdx]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6" id="gallery">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <motion.span className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Visual Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-main"
          >
            Memories of{' '}
            <span className="text-gold-premium italic">Blessings</span>
          </motion.h2>
        </div>
        
        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="flex gap-2 flex-wrap"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                selectedCategory === cat 
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
      </div>

      {/* ===== MASONRY GALLERY ===== */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[180px]"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ delay: i * 0.04, layout: { duration: 0.4 } }}
              className={cn(
                "relative group overflow-hidden rounded-2xl cursor-pointer",
                item.size === 'large' && 'md:col-span-2 md:row-span-2',
                item.size === 'medium' && 'md:col-span-2 md:row-span-1',
                item.size === 'small' && 'md:col-span-1 md:row-span-1',
                "aspect-square md:aspect-auto"
              )}
              onClick={() => openLightbox(item, i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category badge (always visible) */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 bg-black/60 backdrop-blur-sm text-gold-premium rounded-full border border-gold-premium/20">
                  {item.category}
                </span>
              </div>
              
              {/* Expand icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-gold-premium rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <Maximize2 size={14} className="text-black" />
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-white font-bold text-sm">{item.title}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={10} className="text-gold-premium" />
                  <span className="text-white/70 text-[10px]">{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ===== GALLERY CTA ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center mt-10"
      >
        <button className="flex items-center gap-2 px-6 py-3 glass rounded-full text-sm text-main font-medium hover:border-gold-premium/30 transition-all group border border-white/10">
          <Camera size={16} className="text-gold-premium" />
          <span>View Full Gallery</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[300] flex items-center justify-center"
            onClick={() => setLightboxItem(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center z-10 transition-all border border-white/20"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center z-10 transition-all border border-white/20"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center z-10 transition-all border border-white/20"
            >
              <ChevronRight size={20} className="text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxItem.url}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl max-h-[90vh] mx-auto px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxItem.url}
                alt={lightboxItem.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-white font-bold text-lg">{lightboxItem.title}</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <MapPin size={12} className="text-gold-premium" />
                  <span className="text-white/70 text-sm">{lightboxItem.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIdx + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
