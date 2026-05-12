import { motion } from 'motion/react';
import { ShieldCheck, Star, Users, Map } from 'lucide-react';

const stats = [
  { label: 'Happy Pilgrims', value: '15,000+', icon: Users },
  { label: 'Successful Tours', value: '850+', icon: Map },
  { label: 'Hotels Connected', value: '200+', icon: ShieldCheck },
  { label: 'Years Experience', value: '12+', icon: Star },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-premium tracking-[0.2em] font-medium uppercase text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
            Journeying with Grace, <br />
            <span className="text-gold-premium">Serving with Honor</span>
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 text-lg font-light">
            Founded with a vision to make the sacred journey of Umrah accessible and comfortable for everyone, 
            Al Muntaha Travels has evolved into a symbol of trust and excellence. We believe that every 
            pilgrim is a Guest of Allah, and serving them is our highest honor.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-deep/30 flex items-center justify-center flex-shrink-0 border border-emerald-deep/50">
                <ShieldCheck className="text-gold-premium" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Our Mission</h4>
                <p className="text-white/60 text-sm">To provide seamless, spiritual, and stress-free travel solutions that allow you to focus entirely on your ibadah.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-deep/30 flex items-center justify-center flex-shrink-0 border border-emerald-deep/50">
                <Star className="text-gold-premium" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Our Vision</h4>
                <p className="text-white/60 text-sm">To be the global leader in Islamic travel, known for our integrity, innovation, and commitment to the Ummah.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-3xl overflow-hidden premium-shadow relative group">
            <img
              src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=80&w=2070"
              alt="Madinah"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-emerald-dark/20 group-hover:bg-transparent transition-all" />
          </div>
          
          {/* Stats Grid Overlay */}
          <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col border-l border-gold-premium pl-6"
              >
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
