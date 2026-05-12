import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MoreVertical, 
  ExternalLink,
  ChevronRight,
  User,
  Mail,
  Box
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { Enquiry } from '../../types';

export default function EnquiryManagement() {
  const { enquiries, updateEnquiryStatus } = useSystem();
  const [filter, setFilter] = useState<'all' | Enquiry['status']>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const filteredEnquiries = filter === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === filter);

  const getStatusColor = (status: Enquiry['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'confirmed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-white/10 text-white/40 border-white/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* List Header and Filter */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 overflow-x-auto max-w-full">
          {['all', 'new', 'in-progress', 'confirmed', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                filter === s 
                  ? 'bg-gold-premium text-black' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List of Enquiries */}
        <div className="lg:col-span-2 space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <motion.div
              key={enquiry.id}
              layoutId={enquiry.id}
              onClick={() => setSelectedEnquiry(enquiry)}
              className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
                selectedEnquiry?.id === enquiry.id 
                  ? 'bg-white/10 border-gold-premium/50' 
                  : 'bg-white/[0.02] border-white/5 hover:border-gold-premium/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-gold-premium transition-colors">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{enquiry.name}</h4>
                    <p className="text-xs text-white/40 mt-1">{enquiry.package} Package</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] border ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status}
                </span>
              </div>
              <p className="text-sm text-white/60 line-clamp-2 mb-4 leading-relaxed">
                {enquiry.message}
              </p>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/20">
                <span>{enquiry.date}</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
          {filteredEnquiries.length === 0 && (
            <div className="py-20 text-center glass-dark rounded-[2.5rem] border border-white/5">
              <MessageCircle size={40} className="mx-auto mb-4 text-white/10" />
              <p className="text-white/20 uppercase tracking-widest font-bold">No enquiries found</p>
            </div>
          )}
        </div>

        {/* Enquiry Detail Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 space-y-6">
            {selectedEnquiry ? (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="glass-dark p-8 rounded-[2.5rem] border border-gold-premium/30"
               >
                 <h3 className="text-xl font-serif font-bold text-white mb-8 uppercase tracking-wider">Enquiry Details</h3>
                 
                 <div className="space-y-8">
                   <div className="flex items-start gap-4">
                     <Mail size={18} className="text-gold-premium mt-1" />
                     <div>
                       <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Email Address</p>
                       <p className="text-white break-all">{selectedEnquiry.email}</p>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <Box size={18} className="text-gold-premium mt-1" />
                     <div>
                       <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Package Intent</p>
                       <p className="text-white">{selectedEnquiry.package}</p>
                     </div>
                   </div>

                   <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                     <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Message Body</p>
                     <p className="text-sm text-white/70 leading-relaxed italic">"{selectedEnquiry.message}"</p>
                   </div>

                   <div className="space-y-4 pt-4 border-t border-white/5">
                     <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Update Working Status</p>
                     <div className="grid grid-cols-2 gap-3">
                       {['in-progress', 'confirmed', 'rejected'].map((s) => (
                         <button
                           key={s}
                           onClick={() => updateEnquiryStatus(selectedEnquiry.id, s as any)}
                           className={`px-4 py-2 rounded-xl text-[8px] font-bold uppercase tracking-widest border transition-all ${
                             selectedEnquiry.status === s 
                               ? 'bg-gold-premium text-black border-gold-premium'
                               : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
                           }`}
                         >
                           {s}
                         </button>
                       ))}
                     </div>
                   </div>
                 </div>
               </motion.div>
            ) : (
              <div className="glass-dark p-12 rounded-[2.5rem] border border-white/5 text-center">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/10">
                   <Filter size={32} />
                 </div>
                 <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Select an enquiry to view full details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
