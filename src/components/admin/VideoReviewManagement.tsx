import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Trash2, Plus, ExternalLink, Play } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

export default function VideoReviewManagement() {
  const { videoReviews, addVideoReview, deleteVideoReview } = useSystem();
  const [isAdding, setIsAdding] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', youtubeId: '', description: '' });

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleAdd = () => {
    if (!newVideo.title || !newVideo.youtubeId) return;
    const finalId = getYoutubeId(newVideo.youtubeId);
    addVideoReview({ ...newVideo, youtubeId: finalId });
    setNewVideo({ title: '', youtubeId: '', description: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Video Reviews</h2>
          <p className="text-white/40 text-sm">Manage YouTube testimonial videos</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-gold-premium text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={20} />
          <span>Add Video</span>
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gold-premium uppercase tracking-widest mb-2">Video Title</label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-premium outline-none transition-colors"
                    placeholder="e.g. Zaireen Testimonial - Karachi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gold-premium uppercase tracking-widest mb-2">YouTube URL or ID</label>
                  <input
                    type="text"
                    value={newVideo.youtubeId}
                    onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-premium outline-none transition-colors"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gold-premium uppercase tracking-widest mb-2">Description (Optional)</label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-premium outline-none transition-colors"
                  placeholder="Tell us about this testimonial..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 rounded-xl text-white/60 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-gold-premium text-black px-8 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-gold-premium/20 transition-all"
              >
                Save Video Review
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoReviews.map((video) => (
          <motion.div
            key={video.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-gold-premium/30 transition-all"
          >
            <div className="relative aspect-video bg-black/40">
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
              <button
                onClick={() => deleteVideoReview(video.id)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-white mb-2 line-clamp-1">{video.title}</h3>
              {video.description && (
                <p className="text-white/40 text-sm mb-4 line-clamp-2">{video.description}</p>
              )}
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest">
                <span className="text-red-500 flex items-center gap-1">
                  <Youtube size={14} />
                  YouTube Video
                </span>
                <a
                  href={`https://youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-premium flex items-center gap-1 hover:underline"
                >
                  <ExternalLink size={12} />
                  View Original
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {videoReviews.length === 0 && !isAdding && (
        <div className="py-20 text-center bg-white/2 border border-dashed border-white/10 rounded-3xl">
          <Youtube size={48} className="mx-auto text-white/10 mb-4" />
          <p className="text-white/40">No video reviews added yet.</p>
        </div>
      )}
    </div>
  );
}
