import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, X, PlusCircle, CheckCircle2, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import ImageUpload from './ImageUpload';

export default function GalleryManagement() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useSystem();
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<'all' | 'Makkah' | 'Madinah' | 'Tours'>('all');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Makkah' as 'Makkah' | 'Madinah' | 'Tours',
    url: '',
    type: 'image' as 'image' | 'video'
  });

  const filteredGallery = filter === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url || !formData.title) return;
    setIsSaving(true);
    try {
      await addGalleryItem(formData);
      setFormData({ title: '', category: 'Makkah', url: '', type: 'image' });
      setIsAdding(false);
    } catch (error) {
      console.error("Gallery save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
          {['all', 'Makkah', 'Madinah', 'Tours'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-gold-premium text-black' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full md:w-auto px-8 py-3 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <PlusCircle size={18} />
          Upload Media
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.map((item) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative aspect-square rounded-[2rem] overflow-hidden border border-white/5"
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => deleteGalleryItem(item.id)}
                className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="absolute top-4 left-4">
               <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[8px] font-bold text-gold-premium uppercase tracking-[0.2em] rounded-full border border-gold-premium/30">
                 {item.category}
               </span>
            </div>
          </motion.div>
        ))}
        {filteredGallery.length === 0 && (
           <div className="col-span-full py-20 text-center">
             <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-white/10">
               <ImageIcon size={40} />
             </div>
             <p className="text-white/20 text-sm uppercase tracking-widest font-bold">No media found in this category</p>
           </div>
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#010a08] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 relative z-10 shadow-2xl my-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Upload to Gallery</h2>
              <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Media Title</label>
                <input 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" 
                  placeholder="e.g., Makkah Sunset" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 appearance-none"
                >
                  <option value="Makkah">Makkah</option>
                  <option value="Madinah">Madinah</option>
                  <option value="Tours">Tours</option>
                </select>
              </div>

              <ImageUpload 
                label="Gallery Image"
                currentImage={formData.url}
                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, url }))}
              />
              
              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={!formData.url || isSaving}
                  className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSaving ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <PlusCircle size={20} />
                    </motion.div>
                  ) : (
                    <CheckCircle2 size={20} />
                  )}
                  {isSaving ? 'Uploading to Gallery...' : 'Add to Live Gallery'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
