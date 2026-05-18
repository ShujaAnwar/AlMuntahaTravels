import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Building, Globe, X, Check } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import ImageUpload from './ImageUpload';

export default function PartnerManagement() {
  const { partners, addPartner, deletePartner } = useSystem();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    website: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logo) return;
    addPartner(formData);
    setFormData({ name: '', logo: '', description: '', website: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest">Global Collaboration Network</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-8 py-3 bg-gold-premium text-black font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus size={18} />
          Register Agency
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="glass-dark p-8 rounded-[2.5rem] border border-white/5 relative group">
            <div className="flex justify-between items-start mb-6">
               <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3">
                 <img src={partner.logo} alt="" className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
               </div>
               <button 
                onClick={() => deletePartner(partner.id)}
                className="p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <Trash2 size={16} />
               </button>
            </div>
            <h4 className="text-xl font-serif font-bold text-white mb-2 uppercase tracking-tight">{partner.name}</h4>
            <p className="text-white/40 text-sm leading-relaxed">{partner.description}</p>
          </div>
        ))}
        {partners.length === 0 && (
           <div className="col-span-full py-20 text-center glass-dark rounded-[2.5rem] border border-white/5">
             <Building size={40} className="mx-auto mb-4 text-white/10" />
             <p className="text-white/20 uppercase tracking-widest font-bold">No partner agencies registered yet</p>
           </div>
        )}
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
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Register Partner Agency</h2>
              <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Agency Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none" 
                  placeholder="Global Travels LLC" 
                />
              </div>

              <ImageUpload 
                label="Agency Logo"
                currentImage={formData.logo}
                onUploadSuccess={(url) => setFormData({ ...formData, logo: url })}
              />

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Description</label>
                <textarea 
                  rows={3} 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none" 
                  placeholder="Briefly describe the partnership..." 
                />
              </div>
              
              <div className="pt-6">
                <button type="submit" className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3">
                  <Check size={20} />
                  Register Agency
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
