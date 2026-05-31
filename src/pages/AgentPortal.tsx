import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase, Users, CheckCircle, Clock, XCircle,
  Search, Phone, Calendar, MessageCircle, Lock,
  Unlock, BarChart3, LogOut, ChevronDown, RefreshCw,
  Star, TrendingUp, AlertCircle, Check, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { PackageInquiry } from '../types';
import SEO from '../components/seo/SEO';

type LeadStatus = 'New' | 'Assigned' | 'Confirmed' | 'Completed' | 'Cancelled';

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  New:       { label: 'New Lead',  color: 'text-amber-400',  bg: 'bg-amber-400/10 border-amber-400/30' },
  Assigned:  { label: 'Assigned',  color: 'text-blue-400',   bg: 'bg-blue-400/10 border-blue-400/30'  },
  Confirmed: { label: 'Confirmed', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
  Completed: { label: 'Completed', color: 'text-green-400',  bg: 'bg-green-400/10 border-green-400/30' },
  Cancelled: { label: 'Cancelled', color: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/30'   },
};

const BUDGET_LABELS: Record<string, string> = {
  Economy: '280K–380K',
  Standard: '380K–550K',
  Premium: '550K–800K',
  'VIP Luxury': '800K+',
};

// ─── Lead Card ────────────────────────────────────────────────────────────────
function LeadCard({
  lead, agentId, onAccept, onStatusChange, onExpand
}: {
  lead: PackageInquiry;
  agentId: string;
  onAccept: (id: string) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onExpand: (lead: PackageInquiry) => void;
}) {
  const isMine = lead.assignedTo === agentId;
  const isLockedByOther = lead.assignedTo && lead.assignedTo !== agentId;
  const assignedAt = lead.assignedAt ? new Date(lead.assignedAt).getTime() : 0;
  const lockExpired = isLockedByOther && (Date.now() - assignedAt) / 3600000 >= 24;
  const isAvailable = !lead.assignedTo || lockExpired;
  const status = (lead.status as LeadStatus) || 'New';
  const sc = STATUS_CONFIG[status] || STATUS_CONFIG.New;

  const waLink = `https://wa.me/${lead.personal.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Assalamualaikum ${lead.personal.fullName}! I'm from AL MUNTAHA TRAVELS. Regarding your ${lead.journey.type} package inquiry (ID: ${lead.id}). I'd like to share a personalized quote for you. Please let me know a convenient time to discuss. JazakAllah!`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white/5 border rounded-2xl overflow-hidden transition-all',
        isMine ? 'border-blue-500/30' :
        isLockedByOther && !lockExpired ? 'border-white/5 opacity-60' :
        'border-white/10 hover:border-white/20'
      )}
    >
      {/* Card Top */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border', sc.bg, sc.color)}>
                {sc.label}
              </span>
              {isLockedByOther && !lockExpired && (
                <span className="text-[10px] font-bold flex items-center gap-1 text-red-400 bg-red-400/10 border border-red-400/30 px-2 py-0.5 rounded-full">
                  <Lock size={10} /> Locked
                </span>
              )}
              {lockExpired && (
                <span className="text-[10px] font-bold flex items-center gap-1 text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  <Unlock size={10} /> Expired Lock
                </span>
              )}
              {isMine && (
                <span className="text-[10px] font-bold flex items-center gap-1 text-blue-400 bg-blue-400/10 border border-blue-400/30 px-2 py-0.5 rounded-full">
                  <Star size={10} /> My Lead
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-lg leading-tight">{lead.personal.fullName}</h3>
            <p className="text-white/40 text-xs font-mono">#{lead.id.slice(-8).toUpperCase()}</p>
          </div>
          {/* Budget badge */}
          <div className="flex-shrink-0 text-right">
            <div className="text-[#C9A84C] font-black text-base">{BUDGET_LABELS[lead.budget?.range] || '—'}</div>
            <div className="text-white/40 text-[10px]">PKR (est.)</div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-white/5 rounded-xl px-3 py-2">
            <div className="text-white/40 text-[9px] uppercase font-bold mb-0.5">Package</div>
            <div className="text-white text-xs font-semibold">{lead.journey.type}</div>
          </div>
          <div className="bg-white/5 rounded-xl px-3 py-2">
            <div className="text-white/40 text-[9px] uppercase font-bold mb-0.5">Travelers</div>
            <div className="text-white text-xs font-semibold flex items-center gap-1">
              <Users size={11} /> {lead.personal.travelers} pax
            </div>
          </div>
          <div className="bg-white/5 rounded-xl px-3 py-2">
            <div className="text-white/40 text-[9px] uppercase font-bold mb-0.5">Departure</div>
            <div className="text-white text-xs font-semibold">
              {lead.journey.departureDate ? new Date(lead.journey.departureDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }) : 'Flexible'}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl px-3 py-2">
            <div className="text-white/40 text-[9px] uppercase font-bold mb-0.5">City</div>
            <div className="text-white text-xs font-semibold">{lead.personal.city || '—'}</div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onExpand(lead)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-white/60 text-xs font-medium hover:border-white/20 hover:text-white transition-all"
          >
            View Details
          </button>

          {/* WhatsApp — only for assigned leads */}
          {isMine && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          )}

          {/* Accept button */}
          {isAvailable && !isMine && (
            <button
              onClick={() => onAccept(lead.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C9A84C] hover:bg-[#b8973d] text-black text-xs font-bold transition-all"
            >
              <Check size={13} /> Accept Lead
            </button>
          )}

          {/* Status updater — only owner */}
          {isMine && (
            <div className="relative ml-auto">
              <select
                value={lead.status}
                onChange={e => onStatusChange(lead.id, e.target.value as LeadStatus)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-3 pr-7 py-2 text-xs text-white/70 outline-none cursor-pointer hover:border-white/20"
              >
                <option value="Assigned" className="bg-[#020d09]">Assigned</option>
                <option value="Confirmed" className="bg-[#020d09]">Confirmed</option>
                <option value="Completed" className="bg-[#020d09]">Completed</option>
                <option value="Cancelled" className="bg-[#020d09]">Cancelled</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Lead Detail Modal ────────────────────────────────────────────────────────
function LeadModal({ lead, onClose }: { lead: PackageInquiry; onClose: () => void }) {
  const waLink = `https://wa.me/${lead.personal.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Assalamualaikum ${lead.personal.fullName}! I'm from AL MUNTAHA TRAVELS regarding your ${lead.journey.type} package inquiry.`
  )}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a1a12] border border-white/10 rounded-t-3xl sm:rounded-3xl"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0a1a12] border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">{lead.personal.fullName}</h3>
            <p className="text-white/40 text-xs font-mono">#{lead.id.slice(-8).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Contact */}
          <Section title="Contact Details">
            <Row label="WhatsApp" value={lead.personal.whatsapp} />
            <Row label="Email" value={lead.personal.email || '—'} />
            <Row label="City" value={lead.personal.city || '—'} />
            <Row label="Travel Type" value={lead.personal.type} />
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 mt-3 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-all w-full justify-center">
              <MessageCircle size={16} /> Open WhatsApp Chat
            </a>
          </Section>

          {/* Journey */}
          <Section title="Journey Details">
            <Row label="Package Type" value={lead.journey.type} />
            <Row label="Departure" value={lead.journey.departureDate || 'Flexible'} />
            <Row label="Return" value={lead.journey.returnDate || '—'} />
            <Row label="Duration" value={lead.journey.days ? `${lead.journey.days} days` : '—'} />
            <Row label="Travelers" value={`${lead.personal.travelers} persons`} />
            <Row label="Budget" value={lead.budget?.range || '—'} />
          </Section>

          {/* Hotel Prefs */}
          <Section title="Hotel Preferences">
            <Row label="Makkah Distance" value={lead.makkah?.distancePref || '—'} />
            <Row label="Makkah Hotels" value={lead.makkah?.hotels?.join(', ') || 'No preference'} />
            <Row label="Madinah Distance" value={lead.madinah?.distancePref || '—'} />
            <Row label="Madinah Hotels" value={lead.madinah?.hotels?.join(', ') || 'No preference'} />
            <Row label="Room Type" value={lead.rooms?.type?.join(', ') || '—'} />
          </Section>

          {/* Services */}
          <Section title="Services & Add-Ons">
            <Row label="Meal Plan" value={lead.food?.plan || '—'} />
            <Row label="Transport" value={lead.transport?.required ? lead.transport.type : 'Not needed'} />
            {lead.extras?.length > 0 && (
              <div>
                <span className="text-white/40 text-xs">Extras:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {lead.extras.map(e => (
                    <span key={e} className="text-xs bg-[#C9A84C]/10 text-[#C9A84C] px-2 py-0.5 rounded-full border border-[#C9A84C]/20">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* Notes */}
          {lead.notes && (
            <Section title="Special Instructions">
              <p className="text-white/70 text-sm leading-relaxed bg-white/5 rounded-xl p-3 italic">
                {lead.notes}
              </p>
            </Section>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <h4 className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/40 text-xs flex-shrink-0">{label}</span>
      <span className="text-white text-xs font-medium text-right">{value}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AgentPortal() {
  const { user, isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const [leads, setLeads] = useState<PackageInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<PackageInquiry | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'stats'>('leads');

  const agentId = user && 'id' in user ? (user as any).id : 'ADMIN';
  const agentName = user?.name || 'Agent';

  useEffect(() => {
    if (!isAuthenticated || role !== 'partner') navigate('/login');
  }, [isAuthenticated, role, navigate]);

  const fetchLeads = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch {/* silently fail */} finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const iv = setInterval(() => fetchLeads(true), 15000);
    return () => clearInterval(iv);
  }, []);

  const handleAccept = async (leadId: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId }),
      });
      if (res.ok) fetchLeads(true);
      else { const e = await res.json(); alert(e.error || 'Could not accept lead'); }
    } catch {/* */}
  };

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchLeads(true);
    } catch {/* */}
  };

  const filtered = leads.filter(l => {
    const matchSearch = l.personal.fullName.toLowerCase().includes(search.toLowerCase()) ||
      l.personal.whatsapp.includes(search) || l.id.includes(search);
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Stats
  const myLeads = leads.filter(l => l.assignedTo === agentId);
  const stats = {
    available: leads.filter(l => !l.assignedTo).length,
    mine: myLeads.length,
    confirmed: myLeads.filter(l => l.status === 'Confirmed').length,
    completed: myLeads.filter(l => l.status === 'Completed').length,
  };

  return (
    <div className="min-h-screen bg-[#020d09] pt-16">
      <SEO title="Agent Portal | AL MUNTAHA TRAVELS" />

      {/* Top Nav */}
      <div className="sticky top-0 z-50 bg-[#020d09]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#064E3B] border border-[#C9A84C]/30 rounded-xl flex items-center justify-center text-[#C9A84C] font-bold text-sm">م</div>
            <div>
              <div className="text-white font-bold text-sm">{agentName}</div>
              <div className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-wider">Partner Agent</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[10px] font-bold">LIVE</span>
            </div>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-white/60 text-xs font-medium hover:border-white/20 hover:text-white transition-all"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Available Leads', val: stats.available, color: 'text-amber-400', icon: AlertCircle },
            { label: 'My Active Leads', val: stats.mine, color: 'text-blue-400', icon: Briefcase },
            { label: 'Confirmed', val: stats.confirmed, color: 'text-[#C9A84C]', icon: CheckCircle },
            { label: 'Completed', val: stats.completed, color: 'text-green-400', icon: TrendingUp },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <s.icon size={20} className={s.color} />
              <div>
                <div className={cn('text-2xl font-black', s.color)}>{s.val}</div>
                <div className="text-white/40 text-[10px] font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 mb-5 w-fit">
          {(['leads', 'stats'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn('px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all',
                activeTab === tab ? 'bg-[#C9A84C] text-black' : 'text-white/50 hover:text-white'
              )}>
              {tab === 'leads' ? 'All Leads' : 'My Performance'}
            </button>
          ))}
        </div>

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Search + Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, phone, ID..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#C9A84C]/40"
                />
              </div>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-3 pr-8 py-2.5 text-white text-sm outline-none cursor-pointer hover:border-white/20"
                >
                  <option value="All" className="bg-[#020d09]">All Status</option>
                  {Object.keys(STATUS_CONFIG).map(s => (
                    <option key={s} value={s} className="bg-[#020d09]">{s}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
              <button
                onClick={() => fetchLeads(true)}
                className={cn('p-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all', isRefreshing && 'animate-spin')}
              >
                <RefreshCw size={15} />
              </button>
            </div>

            {/* Lead count */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm">{filtered.length} leads found</span>
              {filterStatus !== 'All' && (
                <button onClick={() => setFilterStatus('All')} className="text-xs text-[#C9A84C] hover:underline">
                  Clear filter
                </button>
              )}
            </div>

            {/* Leads List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search size={40} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No leads match your search</p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {filtered.map(lead => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      agentId={agentId}
                      onAccept={handleAccept}
                      onStatusChange={handleStatusChange}
                      onExpand={setSelectedLead}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-[#C9A84C]" /> My Performance Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Leads Accepted', val: stats.mine },
                  { label: 'Confirmed Bookings', val: stats.confirmed },
                  { label: 'Completed Trips', val: stats.completed },
                  { label: 'Conversion Rate', val: stats.mine > 0 ? `${Math.round((stats.confirmed / stats.mine) * 100)}%` : '0%' },
                ].map(item => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-[#C9A84C] font-black text-3xl">{item.val}</div>
                    <div className="text-white/40 text-xs mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Leads List */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">My Active Leads ({myLeads.length})</h3>
              {myLeads.length === 0 ? (
                <p className="text-white/40 text-sm text-center py-6">No leads accepted yet. Go to All Leads to accept some!</p>
              ) : (
                <div className="space-y-3">
                  {myLeads.map(lead => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      agentId={agentId}
                      onAccept={handleAccept}
                      onStatusChange={handleStatusChange}
                      onExpand={setSelectedLead}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
