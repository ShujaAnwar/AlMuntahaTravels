import { motion } from 'motion/react';
import { Calendar, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router';

const groups = [
  {
    title: "Ramadan Special Group",
    date: "March 2026",
    slots: "5 Slots Left",
    status: "Filling Fast",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=70&w=600"
  },
  {
    title: "Summer Spiritual Retreat",
    date: "July 2026",
    slots: "15 Slots Left",
    status: "Open",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=70&w=600"
  }
];

export default function RecentTours() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-gold-premium tracking-[0.3em] font-medium uppercase text-xs mb-4 block">Community</span>
          <h2 className="text-4xl font-serif font-bold text-main">Upcoming Groups</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groups.map((group, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="glass-dark rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row group transition-all duration-500"
          >
            <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
               <img 
                 src={group.image} 
                 alt={group.title}
                 loading="lazy"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
               />
            </div>
            <div className="p-8 flex flex-col justify-center">
               <div className="flex justify-between items-center mb-4">
                  <span className="bg-emerald-deep/30 text-gold-premium text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-gold-premium/20">
                    {group.status}
                  </span>
                  <span className="text-muted text-xs font-bold">{group.slots}</span>
               </div>
               <h3 className="text-xl font-serif font-bold text-main mb-4">{group.title}</h3>
               <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-sub text-sm">
                    <Calendar size={14} className="text-gold-premium" /> <span>{group.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sub text-sm">
                    <Users size={14} className="text-gold-premium" /> <span>Guided Group Tour</span>
                  </div>
               </div>
               <Link 
                 to="/#contact"
                 className="text-left text-xs uppercase tracking-widest font-bold text-gold-premium hover:underline"
               >
                 Join this Group
               </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
