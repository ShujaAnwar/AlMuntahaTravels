import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: "Essential Guide for First-time Umrah Pilgrims",
    excerpt: "Everything you need to know from Miqat rules to Ihram etiquette for a successful journey.",
    date: "May 10, 2026",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=600",
    category: "Guides"
  },
  {
    title: "Understanding the Significance of Haram Shura",
    excerpt: "Diving deep into the historical and spiritual importance of the expansion projects.",
    date: "May 05, 2026",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600",
    category: "Spiritual"
  },
  {
    title: "Visa Process Updates for 2026 Season",
    excerpt: "Stay updated with the latest regulations for Umrah and Tourist visas for Saudi Arabia.",
    date: "Apr 28, 2026",
    image: "https://images.unsplash.com/photo-1610448721566-47369c768e70?auto=format&fit=crop&q=80&w=600",
    category: "Travel News"
  }
];

export default function BlogPreview() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="text-gold-premium tracking-[0.3em] font-medium uppercase text-xs mb-4 block">Knowledge Hub</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-main leading-tight">
            Latest from <br />
            <span className="text-gold-premium italic">Our Journal</span>
          </h2>
        </div>
        <button className="px-8 py-3 glass rounded-full text-sm font-medium hover:scale-105 transition-all text-main flex items-center gap-2 group">
          View All Articles
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative h-64 rounded-3xl overflow-hidden mb-6 border theme-border">
              <img 
                src={post.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-gold-premium">
                {post.category}
              </div>
            </div>
            
            <div className="px-2">
              <span className="text-muted text-xs font-medium mb-3 block">{post.date}</span>
              <h3 className="text-xl font-serif font-bold text-main mb-4 group-hover:text-gold-premium transition-colors">
                {post.title}
              </h3>
              <p className="text-sub text-sm font-light line-clamp-2 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-gold-premium text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Read More <ArrowRight size={14} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
