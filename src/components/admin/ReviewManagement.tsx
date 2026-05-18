import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Star, User, MessageCircle, X, Check } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import ImageUpload from './ImageUpload';

export default function ReviewManagement() {
  const { reviews, addReview, deleteReview } = useSystem();
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    language: 'en' as 'en' | 'ur',
    avatar: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;
    setIsSaving(true);
    try {
      await addReview(formData);
      setFormData({
        name: '',
        rating: 5,
        comment: '',
        language: 'en',
        avatar: '',
        date: new Date().toISOString().split('T')[0]
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Review save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-10">
           <div>
             <span className="block text-3xl font-bold text-white mb-1">
               {(reviews.length > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length : 5).toFixed(1)}
             </span>
             <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Avg Rating</span>
           </div>
           <div>
             <span className="block text-3xl font-bold text-white mb-1">{reviews.length}</span>
             <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Total Reviews</span>
           </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-8 py-3 bg-gold-premium text-black font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus size={18} />
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-dark p-8 rounded-[2.5rem] border border-white/5 relative group"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gold-premium/10 flex items-center justify-center border border-gold-premium/20 overflow-hidden">
                   {review.avatar ? <img src={review.avatar} alt="" className="w-full h-full object-cover" /> : <User className="text-gold-premium" size={20} />}
                 </div>
                 <div>
                   <h4 className="text-white font-bold">{review.name}</h4>
                   <div className="flex gap-1 mt-1">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={10} className={i < review.rating ? 'fill-gold-premium text-gold-premium' : 'text-white/10'} />
                     ))}
                   </div>
                 </div>
               </div>
               <button 
                 onClick={() => deleteReview(review.id)}
                 className="p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <Trash2 size={16} />
               </button>
            </div>
            <p className="text-white/60 text-sm italic leading-relaxed">"{review.comment}"</p>
            <div className="mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
               <span className="text-gold-premium/50">{review.language === 'en' ? 'English' : 'Urdu'}</span>
               <span className="text-white/20">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-[#02130e] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 relative z-10 my-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Add Client Review</h2>
              <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Client Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none" 
                  placeholder="Full name..." 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Rating</label>
                  <select 
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none appearance-none"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Language</label>
                  <select 
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none appearance-none"
                  >
                    <option value="en">English</option>
                    <option value="ur">Urdu</option>
                  </select>
                </div>
              </div>

              <ImageUpload 
                label="Client Avatar"
                currentImage={formData.avatar}
                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
              />

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Review Content</label>
                <textarea 
                  required
                  rows={4} 
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none" 
                  placeholder="Deeply spiritual journey..." 
                />
              </div>
              
              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-50"
                >
                  {isSaving ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Star size={20} />
                    </motion.div>
                  ) : (
                    <Check size={20} />
                  )}
                  {isSaving ? 'Publishing...' : 'Publish Review'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
