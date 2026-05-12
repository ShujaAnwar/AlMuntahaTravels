import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Shuja Anwaar",
    role: "Premium Pilgrim",
    comment: "MashAllah, the service provided by Al Muntaha Travels was beyond excellence. From the moment we landed in Jeddah till we left, everything was handled with extreme care.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=shuja",
    language: 'en'
  },
  {
    name: "Fatima Ahmed",
    role: "Family Group",
    comment: "بهترین انتخاب برای عمره. سفر بسیار آرام و معنوی بود. هوٹل بہت قریب تھا اور سٹاف بہت مددگار تھا۔",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=fatima",
    language: 'ur'
  },
  {
    name: "Zeeshan Ali",
    role: "Solo Traveler",
    comment: "The VIP package is truly royal. Having a private scholar for Ziyarat made our journey so much more meaningful. Highly recommended!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=zeeshan",
    language: 'en'
  }
];

export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-gold-premium tracking-[0.3em] font-medium uppercase text-xs mb-4 block">Testimonials</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Voices of Peace</h2>
        <p className="text-white/60 max-w-2xl mx-auto font-light">Join the thousands of pilgrims who have trusted us with their spiritual journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark p-8 rounded-[2.5rem] border border-white/5 relative group hover:border-gold-premium/30 transition-all duration-500"
          >
            <Quote className="absolute top-8 right-8 text-gold-premium/10 group-hover:text-gold-premium/20 transition-colors" size={48} />
            
            <div className="flex gap-1 mb-6">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold-premium text-gold-premium" />
              ))}
            </div>

            <p className={cn(
              "text-white/80 leading-relaxed mb-8 min-h-[100px]",
              review.language === 'ur' ? 'font-urdu text-xl direction-rtl' : 'font-light italic'
            )}>
              "{review.comment}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-deep">
                <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold">{review.name}</h4>
                <p className="text-gold-premium text-xs uppercase tracking-widest">{review.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Testimonials Placeholder */}
      <div className="mt-20 glass p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-grow">
           <h3 className="text-2xl font-serif font-bold mb-4">Emotional Memories</h3>
           <p className="text-white/60 text-sm mb-6">Watch the real stories of our pilgrims as they experience the beauty of Al Haram.</p>
           <button className="flex items-center gap-2 text-gold-premium font-bold hover:gap-4 transition-all">
             Watch Video Gallery <ArrowRight size={18} />
           </button>
        </div>
        <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group cursor-pointer relative overflow-hidden">
           <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all" />
           <div className="w-16 h-16 rounded-full bg-gold-premium flex items-center justify-center text-black group-hover:scale-110 transition-transform relative z-10">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-current border-b-[8px] border-b-transparent ml-1" />
           </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';
