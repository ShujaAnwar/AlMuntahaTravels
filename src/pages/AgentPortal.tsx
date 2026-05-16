import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Users, CheckCircle, Clock, XCircle, 
  Search, Filter, ExternalLink, Calendar, Phone, 
  MapPin, MessageSquare, ShieldCheck, Lock, Unlock,
  BarChart3, FileText, Settings, LogOut, ChevronRight,
  Hotel, Bed, Car, Plus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import { PackageInquiry } from '../types';
import SEO from '../components/seo/SEO';

// Simplified Lead State for Management
type LeadStatus = 'New' | 'Assigned' | 'Confirmed' | 'Completed' | 'Cancelled';

export default function AgentPortal() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'leads' | 'stats' | 'history'>('leads');
  const [leads, setLeads] = useState<PackageInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [agentId] = useState('AGENT-001'); // Mock agent ID
  const [selectedLead, setSelectedLead] = useState<PackageInquiry | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 10000); // Poll every 10s for real-time feel
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (leadId: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId })
      });
      if (response.ok) {
        fetchLeads();
      } else {
        const err = await response.json();
        alert(err.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateStatus = async (leadId: string, status: LeadStatus) => {
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchLeads();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.personal.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.personal.whatsapp.includes(searchQuery) ||
      l.id.includes(searchQuery);
    
    const matchesDate = !dateQuery || 
      l.journey.departureDate.includes(dateQuery) || 
      l.createdAt.includes(dateQuery);

    return matchesSearch && matchesDate;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    assigned: leads.filter(l => l.status === 'Assigned').length,
    confirmed: leads.filter(l => l.status === 'Confirmed').length,
    completed: leads.filter(l => l.status === 'Completed').length,
  };

  return (
    <div className={cn(
      "min-h-screen pt-24 pb-20 relative transition-colors duration-500",
      theme === 'dark' ? "bg-[#050505]" : "bg-slate-50"
    )}>
      <SEO title="Agent Portal | Travel Management System" />
      
      {/* Sidebar - Dashboard Style */}
      <div className="fixed left-0 top-24 bottom-0 w-20 md:w-64 glass-dark border-r border-white/5 z-40 hidden md:flex flex-col p-6">
        <div className="mb-10 px-2">
          <div className="w-12 h-12 bg-gold-premium rounded-xl flex items-center justify-center text-black font-urdu text-3xl mb-4">م</div>
          <h2 className="text-xl font-serif font-bold text-main">AL MUNTAHA</h2>
          <span className="text-[10px] uppercase tracking-widest text-gold-premium font-bold">Portal v2.0</span>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'leads', label: 'Active Leads', icon: Briefcase },
            { id: 'stats', label: 'Performance', icon: BarChart3 },
            { id: 'history', label: 'History', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                activeTab === item.id ? "bg-gold-premium text-black font-bold shadow-lg shadow-gold-premium/10" : "text-sub hover:bg-white/5"
              )}
            >
              <item.icon size={20} />
              <span className="hidden md:block text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
           <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
             <LogOut size={20} />
             <span className="hidden md:block text-sm">Logout</span>
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 p-6 md:p-12 relative">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Inquiries', val: stats.total, color: 'text-main', icon: Users },
            { label: 'Unassigned', val: stats.new, color: 'text-gold-premium', icon: Lock },
            { label: 'My Assignments', val: leads.filter(l => l.assignedTo === agentId).length, color: 'text-blue-400', icon: Briefcase },
            { label: 'Total Sales', val: stats.completed, color: 'text-emerald-400', icon: CheckCircle }
          ].map((s, i) => (
            <div key={i} className="glass-dark p-6 rounded-3xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sub">
                  <s.icon size={20} />
                </div>
                <span className="text-xs font-bold text-muted">+12%</span>
              </div>
              <h3 className={cn("text-3xl font-bold font-serif mb-1", s.color)}>{s.val}</h3>
              <p className="text-[10px] uppercase tracking-widest text-sub font-bold">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-sub" size={18} />
            <input 
              type="text"
              placeholder="Search leads by name, ID or WhatsApp..."
              className="w-full theme-bg-alt border theme-border rounded-2xl pl-16 pr-6 py-4 outline-none focus:ring-2 ring-gold-premium/50"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-none">
               <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-sub" size={18} />
               <input 
                 type="date"
                 className="w-full theme-bg-alt border theme-border rounded-2xl pl-16 pr-6 py-4 outline-none focus:ring-2 ring-gold-premium/50 text-sub"
                 value={dateQuery}
                 onChange={e => setDateQuery(e.target.value)}
               />
               {dateQuery && (
                 <button 
                   onClick={() => setDateQuery('')}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400"
                 >
                   Clear
                 </button>
               )}
            </div>
            <button 
              onClick={fetchLeads}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-gold-premium text-black font-bold rounded-2xl hover:scale-105 transition-transform"
            >
              Refresh Leads
            </button>
          </div>
        </div>

        {/* Table/Cards List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredLeads.map((lead, i) => {
              const isMine = lead.assignedTo === agentId;
              const isLocked = lead.assignedTo && lead.assignedTo !== agentId;
              const isAvailable = !lead.assignedTo;
              
              // Check if lock expired (24h)
              const assignedAt = lead.assignedAt ? new Date(lead.assignedAt).getTime() : 0;
              const lockExpired = (new Date().getTime() - assignedAt) / (1000 * 60 * 60) >= 24;
              const canSteal = (isLocked && lockExpired) || isAvailable;

              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "glass-dark rounded-[2.5rem] border overflow-hidden p-8 flex flex-col md:flex-row gap-8 transition-all hover:bg-white/5",
                    isMine ? "border-blue-400/30" : isLocked && !lockExpired ? "border-red-400/20 opacity-60" : "border-white/5"
                  )}
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-muted">ID: {lead.id}</span>
                      <span className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                        lead.status === 'New' ? "bg-gold-premium/20 text-gold-premium" :
                        lead.status === 'Assigned' ? "bg-blue-400/20 text-blue-400" :
                        lead.status === 'Confirmed' ? "bg-emerald-400/20 text-emerald-400" : "bg-muted text-black"
                      )}>
                        {lead.status}
                      </span>
                      {isLocked && !lockExpired && <div className="flex items-center gap-1 text-red-400 text-[10px] font-bold"><Lock size={12}/> Locked</div>}
                      {isLocked && lockExpired && <div className="flex items-center gap-1 text-gold-premium text-[10px] font-bold"><Unlock size={12}/> Expired</div>}
                    </div>

                    <h4 className="text-2xl font-serif font-bold text-main mb-2">{lead.personal.fullName}</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted block mb-1">WhatsApp</span>
                        <div className="flex items-center gap-2 text-main font-medium">
                          <Phone size={14} className="text-emerald-500" /> {lead.personal.whatsapp}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted block mb-1">Package / Dates</span>
                        <div className="flex flex-col gap-1 text-main font-medium">
                          <div className="flex items-center gap-2">
                             <Calendar size={14} className="text-gold-premium" /> {lead.journey.type}
                          </div>
                          <div className="text-[10px] text-sub">
                            {lead.journey.departureDate} — {lead.journey.returnDate}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted block mb-1">Travelers</span>
                        <div className="flex items-center gap-2 text-main font-medium">
                          <Users size={14} className="text-sub" /> {lead.personal.travelers} Persons
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted block mb-1">Estimated Budget</span>
                        <div className="text-gold-premium font-black">Rs. {lead.budget.customAmount?.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end gap-3 min-w-[200px]">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="flex-1 bg-white/5 border border-white/10 text-main py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText size={18} /> Details
                    </button>
                    {isAvailable || (isLocked && lockExpired) ? (
                      <button 
                        onClick={() => handleAccept(lead.id)}
                        className="flex-1 btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
                      >
                        Accept Lead <ChevronRight size={18} />
                      </button>
                    ) : isMine ? (
                      <>
                        <button className="flex-1 bg-blue-400 text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                           <MessageSquare size={18} /> Contact Now
                        </button>
                        <select 
                          className="flex-1 theme-bg-alt border theme-border rounded-2xl px-4 py-4 text-xs font-bold outline-none"
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as any)}
                        >
                          <option value="Assigned">Assigned</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </>
                    ) : (
                      <div className="flex-1 glass-dark border border-white/5 rounded-2xl p-4 flex items-center justify-center text-muted italic text-xs">
                        Managed by {lead.assignedTo}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredLeads.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-sub mb-6">
                 <Search size={32} />
               </div>
               <h3 className="text-xl font-serif text-main mb-2">No inquiries found</h3>
               <p className="text-sub">Try broadening your search or refresh to check for new leads.</p>
            </div>
          )}
        </div>
      </main>

      {/* Full Details Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-dark border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold bg-gold-premium/20 text-gold-premium px-3 py-1 rounded-full uppercase tracking-widest">Full Requirements</span>
                    <span className="text-sub font-mono text-xs">ID: {selectedLead.id}</span>
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-main">{selectedLead.personal.fullName}</h2>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="w-12 h-12 rounded-full glass-dark border border-white/10 flex items-center justify-center text-sub hover:text-main"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Section: Basic & Personal */}
                <div className="space-y-8">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                      <Users size={14}/> Personal Details
                    </h5>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-sub text-xs">Email:</span> <span className="text-main font-medium">{selectedLead.personal.email}</span></div>
                      <div className="flex justify-between"><span className="text-sub text-xs">WhatsApp:</span> <span className="text-main font-medium">{selectedLead.personal.whatsapp}</span></div>
                      <div className="flex justify-between"><span className="text-sub text-xs">City:</span> <span className="text-main font-medium">{selectedLead.personal.city}</span></div>
                      <div className="flex justify-between"><span className="text-sub text-xs">Traveler Type:</span> <span className="text-main font-medium">{selectedLead.personal.type}</span></div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                      <Calendar size={14}/> Journey Overview
                    </h5>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-sub text-xs">Type:</span> <span className="text-main font-medium">{selectedLead.journey.type}</span></div>
                      <div className="flex justify-between"><span className="text-sub text-xs">Departure:</span> <span className="text-main font-medium">{selectedLead.journey.departureDate}</span></div>
                      <div className="flex justify-between"><span className="text-sub text-xs">Return:</span> <span className="text-main font-medium">{selectedLead.journey.returnDate}</span></div>
                      <div className="flex justify-between"><span className="text-sub text-xs">Flexible:</span> <span className="text-main font-medium">{selectedLead.journey.flexible ? 'Yes' : 'No'}</span></div>
                    </div>
                  </div>
                </div>

                {/* Section: Hotels & Rooms */}
                <div className="space-y-8">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                      <Hotel size={14}/> Hotel Preferences
                    </h5>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] text-muted block mb-1">Makkah Distance: {selectedLead.makkah.distancePref}</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.makkah.hotels.map(h => <span key={h} className="text-xs bg-white/10 px-2 py-1 rounded text-main font-medium">{h}</span>)}
                          {selectedLead.makkah.hotels.length === 0 && <span className="text-xs text-muted">No specific hotels selected</span>}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted block mb-1">Madinah Distance: {selectedLead.madinah.distancePref}</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.madinah.hotels.map(h => <span key={h} className="text-xs bg-white/10 px-2 py-1 rounded text-main font-medium">{h}</span>)}
                          {selectedLead.madinah.hotels.length === 0 && <span className="text-xs text-muted">No specific hotels selected</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                       <Bed size={14}/> Room Details
                    </h5>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedLead.rooms.type.map(t => <span key={t} className="text-xs bg-gold-premium/10 text-gold-premium px-2 py-1 rounded font-bold">{t}</span>)}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className={cn("text-[10px] px-2 py-1 rounded border", selectedLead.rooms.smoking ? "border-emerald-500/50 text-emerald-500" : "border-white/5 text-muted")}>Smoking: {selectedLead.rooms.smoking ? 'Yes' : 'No'}</div>
                        <div className={cn("text-[10px] px-2 py-1 rounded border", selectedLead.rooms.connected ? "border-emerald-500/50 text-emerald-500" : "border-white/5 text-muted")}>Connected: {selectedLead.rooms.connected ? 'Yes' : 'No'}</div>
                        <div className={cn("text-[10px] px-2 py-1 rounded border", selectedLead.rooms.elderly ? "border-emerald-500/50 text-emerald-500" : "border-white/5 text-muted")}>Elderly Ready: {selectedLead.rooms.elderly ? 'Yes' : 'No'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Services & Extras */}
                <div className="space-y-8">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                       <Car size={14}/> Transport & Food
                    </h5>
                    <div className="space-y-4">
                      <div className="pb-3 border-b border-white/5">
                        <span className="text-[10px] text-muted block mb-1">Meal Plan</span>
                        <span className="text-main text-sm font-bold">{selectedLead.food.plan}</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedLead.food.preference.map(p => <span key={p} className="text-[10px] bg-white/5 px-2 py-0.5 rounded">{p}</span>)}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted block mb-1">Transport</span>
                        {selectedLead.transport.required ? (
                          <>
                            <span className="text-main text-sm font-bold">{selectedLead.transport.type}</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedLead.transport.services.map(s => <span key={s} className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold">{s}</span>)}
                            </div>
                          </>
                        ) : <span className="text-muted text-xs">No transport needed</span>}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                       <Plus size={14}/> Add-Ons
                    </h5>
                    <div className="flex flex-wrap gap-1">
                       {selectedLead.extras.map(e => <span key={e} className="text-xs bg-white/5 px-2 py-1 rounded text-main font-medium">{e}</span>)}
                       {selectedLead.extras.length === 0 && <span className="text-xs text-muted">No extras selected</span>}
                    </div>
                  </div>
                </div>

              </div>

              {/* Special Notes Section */}
              <div className="mt-8 p-8 rounded-[2rem] glass-dark border border-white/5 shadow-inner">
                <h5 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                   <MessageSquare size={14}/> Special Instructions / Notes
                </h5>
                <p className="text-main leading-relaxed italic whitespace-pre-wrap urdu-text text-lg">
                  {selectedLead.notes || "No special instructions provided."}
                </p>
              </div>

              <div className="mt-12 flex justify-end">
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="px-12 py-5 bg-gold-premium text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-gold-premium/20"
                >
                  Close Inquiry Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 shadow-2xl animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full" />
          SYSTEM LIVE
        </div>
      </div>
    </div>
  );
}
