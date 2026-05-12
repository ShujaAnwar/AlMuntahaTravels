import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Edit2, Trash2, Filter, MoreVertical, X, Check } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { Package } from '../../types';

export default function PackageManagement() {
  const { packages, addPackage, updatePackage, deletePackage } = useSystem();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredPackages = packages.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm text-white focus:border-gold-premium/50 outline-none transition-all"
          />
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full md:w-auto px-8 py-3 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={18} />
          Add New Package
        </button>
      </div>

      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Package</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Category</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Price</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Duration</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={pkg.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-white font-medium">{pkg.title}</p>
                        <p className="text-xs text-white/30 uppercase tracking-widest mt-1">{pkg.hotelDetails}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gold-premium/10 text-gold-premium text-[10px] font-bold uppercase tracking-widest rounded-full border border-gold-premium/20">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-white font-bold">{pkg.price}</p>
                  </td>
                  <td className="px-8 py-6 text-sm text-white/60">
                    {pkg.duration}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-white/40 hover:text-white transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deletePackage(pkg.id)}
                        className="p-2 text-white/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal (Simplified for now) */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setIsAdding(false); setEditingId(null); }} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#02130e] border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-10 relative z-10"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">
                {isAdding ? 'Add Package' : 'Edit Package'}
              </h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              // Add form data handling here
              setIsAdding(false);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Package Title</label>
                  <input className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" placeholder="e.g., Ramadan Gold VIP" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Category</label>
                  <select className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30 appearance-none">
                    <option value="VIP">VIP</option>
                    <option value="Standard">Standard</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Price From</label>
                  <input className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" placeholder="$0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Duration</label>
                  <input className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" placeholder="e.g., 15 Days" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Image URL</label>
                <input className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" placeholder="https://unsplash.com/..." />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                >
                  <Check size={20} />
                  Save Package Details
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
