import { motion } from 'motion/react';
import { useSystem } from '../../context/SystemContext';
import { Calendar, MapPin, Clock, ArrowUpRight, Hotel } from 'lucide-react';
import { Link } from 'react-router';

export default function Packages() {
  const { packages } = useSystem();

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-10 md:mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold-premium tracking-[0.2em] md:tracking-[0.3em] font-medium uppercase text-[10px] md:text-xs mb-4 block"
        >
          Holy Pilgrimage
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif font-bold text-main mb-6"
        >
          Special Umrah Packages
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sub max-w-2xl mx-auto font-light text-sm md:text-base px-2"
        >
          Choose from our carefully curated packages designed to meet your spiritual needs and comfort preferences.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group glass-dark rounded-3xl overflow-hidden hover:border-gold-premium/30 transition-all duration-500 hover:-translate-y-2 premium-shadow"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="badge-ribbon">
                {pkg.category}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-gold-premium font-bold text-2xl">{pkg.price}</span>
                <span className="text-white/60 text-xs ml-1 font-light italic">/ person</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-gold-premium transition-colors text-main">
                {pkg.title}
              </h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sub text-sm">
                  <Clock size={16} className="text-gold-premium" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sub text-sm">
                  <Hotel size={16} className="text-gold-premium" />
                  <span className="line-clamp-1">{pkg.hotelDetails}</span>
                </div>
                <div className="flex items-center gap-3 text-sub text-sm">
                  <MapPin size={16} className="text-gold-premium" />
                  <span className="line-clamp-1">{pkg.distanceFromHaram}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gold-premium/10 pt-6">
                <Link
                  to={`/package/${pkg.id}`}
                  className="text-xs uppercase tracking-widest font-bold text-main hover:text-gold-premium flex items-center gap-2 group/btn"
                >
                  View Details
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Link>
                <button className="px-6 py-2 bg-emerald-deep font-bold text-white rounded-full text-xs transition-all shadow-md hover:scale-105">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="glass px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition-all text-main">
          Need a Custom Package? Contact Us
        </button>
      </div>
    </div>
  );
}
