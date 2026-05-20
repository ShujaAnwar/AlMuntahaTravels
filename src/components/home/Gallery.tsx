import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';

const galleryItems = [
  { url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=70&w=800', size: 'large', title: 'The Holy Kaaba' },
  { url: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=65&w=400', size: 'small', title: 'Madinah Munawwarah' },
  { url: 'https://images.unsplash.com/photo-1565552645632-d7cd3f98c7b5?auto=format&fit=crop&q=65&w=400', size: 'small', title: 'Masjid al-Nabawi' },
  { url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=65&w=600', size: 'medium', title: 'Sunset in Mecca' },
  { url: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?auto=format&fit=crop&q=65&w=600', size: 'medium', title: 'Evening Prayer' },
  { url: 'https://images.unsplash.com/photo-1551041777-ed07f843d47a?auto=format&fit=crop&q=70&w=800', size: 'large', title: 'Mount Arafat' },
];

export default function Gallery() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="text-gold-premium tracking-[0.3em] font-medium uppercase text-xs mb-4 block">Visual Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-main leading-tight">
            Memories of <br />
            <span className="text-gold-premium italic">Blessings</span>
          </h2>
        </div>
        <p className="text-sub max-w-md text-sm leading-relaxed mb-2">
          Capturing the spiritual essence and moments of peace from our various pilgrimage groups across the Holy Lands.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[200px]">
        {galleryItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "relative group overflow-hidden rounded-2xl cursor-pointer",
              item.size === 'large' && 'md:col-span-2 md:row-span-2',
              item.size === 'medium' && 'md:col-span-2 md:row-span-1',
              item.size === 'small' && 'md:col-span-1 md:row-span-1'
            )}
          >
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-gold-premium text-[10px] uppercase tracking-widest mb-1">{item.title}</span>
              <div className="flex justify-between items-center text-white">
                <span className="text-sm font-medium">View Image</span>
                <Maximize2 size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { cn } from '../../lib/utils';
