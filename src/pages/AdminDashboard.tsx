import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Image as ImageIcon, 
  Star, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Briefcase,
  Layers,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';

// Summary Section Components
import Overview from '../components/admin/Overview';
import PackageManagement from '../components/admin/PackageManagement';
import GalleryManagement from '../components/admin/GalleryManagement';
import ReviewManagement from '../components/admin/ReviewManagement';
import EnquiryManagement from '../components/admin/EnquiryManagement';
import PartnerManagement from '../components/admin/PartnerManagement';
import CMSSettings from '../components/admin/CMSSettings';

type AdminSection = 'overview' | 'packages' | 'gallery' | 'reviews' | 'enquiries' | 'partners' | 'cms';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const { logout } = useAuth();
  const { enquiries } = useSystem();
  
  const unreadEnquiries = enquiries.filter(e => e.status === 'new').length;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: unreadEnquiries },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'partners', label: 'Partners', icon: Briefcase },
    { id: 'cms', label: 'Site Content', icon: Layers },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'packages': return <PackageManagement />;
      case 'gallery': return <GalleryManagement />;
      case 'reviews': return <ReviewManagement />;
      case 'enquiries': return <EnquiryManagement />;
      case 'partners': return <PartnerManagement />;
      case 'cms': return <CMSSettings />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#010a08] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-3xl sticky top-0 h-screen hidden lg:flex flex-col">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 border-gold-premium rotate-45 flex items-center justify-center">
              <span className="-rotate-45 text-gold-premium font-bold text-lg">M</span>
            </div>
            <span className="text-lg font-serif font-bold text-white tracking-widest">ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as AdminSection)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                activeSection === item.id 
                  ? 'bg-gold-premium text-black' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge ? (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeSection === item.id ? 'bg-black text-gold-premium' : 'bg-gold-premium text-black'
                }`}>
                  {item.badge}
                </span>
              ) : (
                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                   activeSection === item.id ? 'text-black' : 'text-white/20'
                }`} />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-wider">
                {menuItems.find(i => i.id === activeSection)?.label}
              </h1>
              <p className="text-white/40 text-sm mt-1">Manage your platform data in real-time</p>
            </div>
            
            <div className="flex gap-4">
               {/* Activity Status */}
               <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                 <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">System Online</span>
               </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
