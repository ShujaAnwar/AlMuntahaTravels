import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Play, Star, Quote } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import SEO from '../components/seo/SEO';

const VideoCard = ({ video }: { video: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#0a110f] border border-white/5 rounded-3xl overflow-hidden hover:border-gold-premium/30 transition-all duration-500"
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-gold-premium">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest bg-white/5 px-2 py-1 rounded-full">
            Verified Testimonial
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-gold-premium transition-colors">
          {video.title}
        </h3>

        {video.description && (
          <p className="text-white/40 text-sm leading-relaxed line-clamp-3 italic">
            "{video.description}"
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gold-premium/10 flex items-center justify-center text-gold-premium">
                <Youtube size={20} />
             </div>
             <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">YouTube Video</span>
          </div>
          <Quote size={20} className="text-gold-premium/20" />
        </div>
      </div>
    </motion.div>
  );
};

export default function VideoReviews() {
  const { videoReviews, isLoading } = useSystem();

  return (
    <div className="min-h-screen bg-[#010a08] pt-32 pb-24">
      <SEO 
        title="Video Reviews | AL MUNTAHA TRAVELS SOLUTIONS"
        description="Watch video testimonials from our satisfied pilgrims. Real stories of spiritual journeys and Umrah experiences with AL MUNTAHA TRAVELS SOLUTIONS."
        keywords="Umrah Reviews, Video Testimonials, AL MUNTAHA TRAVELS Reviews, Pilgrim Stories"
      />

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-premium/10 border border-gold-premium/20 text-gold-premium font-bold text-[10px] uppercase tracking-widest mb-6"
          >
            <Star size={12} fill="currentColor" />
            <span>Success Stories</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-wider"
          >
            Video <span className="text-gold-premium italic">Reviews</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl font-light leading-relaxed"
          >
            Listen to the real experiences of those who performed their pilgrimage with us. 
            At AL MUNTAHA TRAVELS SOLUTIONS, we believe in transparency and spiritual satisfaction.
          </motion.p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {videoReviews.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {videoReviews.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white/5 rounded-[40px] border border-dashed border-white/10"
          >
            <Youtube size={64} className="mx-auto text-white/5 mb-6" />
            <h3 className="text-2xl font-serif text-white mb-2">No Video Reviews Yet</h3>
            <p className="text-white/40 max-w-md mx-auto">
              Our team is currently uploading latest testimonials from our Ramadan groups. Check back soon!
            </p>
          </motion.div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video bg-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
