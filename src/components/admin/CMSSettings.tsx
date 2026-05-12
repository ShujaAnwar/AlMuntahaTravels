import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Globe, Phone, Mail, MapPin, Type, Layout, Info } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

export default function CMSSettings() {
  const { companyInfo, updateCompanyInfo } = useSystem();
  const [formData, setFormData] = useState(companyInfo);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateCompanyInfo(formData);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-4xl space-y-10">
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Section: Contact Information */}
        <div className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">Contact Details</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Official communication channels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Phone Number</label>
              <input 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 transition-all font-mono text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">WhatsApp Number</label>
              <input 
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 transition-all font-mono text-sm" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Email Address</label>
              <input 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 transition-all font-mono text-sm" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Office Address</label>
              <textarea 
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 transition-all text-sm leading-relaxed" 
              />
            </div>
          </div>
        </div>

        {/* Section: Website Hero Content */}
        <div className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl">
              <Layout size={24} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">Hero Section</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">First impression content</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Hero Main Title</label>
              <input 
                value={formData.heroTitle}
                onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 transition-all font-serif text-lg" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Hero Description</label>
              <textarea 
                rows={4}
                value={formData.heroSub}
                onChange={(e) => setFormData({...formData, heroSub: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 transition-all text-sm leading-relaxed" 
              />
            </div>
          </div>
        </div>

        {/* Sticky Save Button */}
        <div className="sticky bottom-10 z-50 flex justify-end">
           <button 
             type="submit"
             disabled={isSaving}
             className="px-12 py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center gap-3 shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-[0.98] transition-all disabled:opacity-50"
           >
             {isSaving ? (
               <>
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                   className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                 />
                 Syncing...
               </>
             ) : (
               <>
                 <Save size={20} />
                 Save All Changes
               </>
             )}
           </button>
        </div>
      </form>
    </div>
  );
}
