import React, { createContext, useContext, useState, useEffect } from 'react';
import { Package, Review, GalleryItem, Partner, Project, Enquiry, CompanyInfo, VideoReview, AgentUser } from '../types';
import { supabase } from '../lib/supabase';

interface SystemContextType {
  packages: Package[];
  reviews: Review[];
  gallery: GalleryItem[];
  partners: Partner[];
  projects: Project[];
  enquiries: Enquiry[];
  videoReviews: VideoReview[];
  agents: AgentUser[];
  companyInfo: CompanyInfo;
  isLoading: boolean;
  
  // Actions
  addPackage: (p: Omit<Package, 'id'>) => void;
  updatePackage: (id: string, p: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  
  addReview: (r: Omit<Review, 'id'>) => void;
  deleteReview: (id: string) => void;
  
  addVideoReview: (v: Omit<VideoReview, 'id'>) => void;
  deleteVideoReview: (id: string) => void;
  
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  addPartner: (p: Omit<Partner, 'id'>) => void;
  deletePartner: (id: string) => void;
  
  addAgent: (a: Omit<AgentUser, 'id' | 'createdAt' | 'status'>) => void;
  deleteAgent: (id: string) => void;
  updateAgentStatus: (id: string, status: AgentUser['status']) => void;
  
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

// Initial mock data — Rich and comprehensive
const initialPackages: Package[] = [
  {
    id: '1',
    title: 'Ramadan Royal Umrah',
    category: 'VIP',
    duration: '15 Days',
    price: 'Rs. 695,000 | 9,350 SAR',
    hotelDetails: '5★ Pullman ZamZam Makkah & Anwar Madinah',
    distanceFromHaram: '0m (Directly in Clock Tower Complex)',
    transportDetails: 'Private GMC | VIP Luxury',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800',
    features: ['Visa Included', 'Return Flights', 'Suhoor & Iftar Buffet', 'Expert Alim Guide', 'Ziyarat Tours', 'Airport VIP Reception', 'Private Transport', '24/7 Support'],
    description: 'Experience the magnificent spiritual rewards of Ramadan in the Holy Cities with our most exclusive VIP package. 5-star luxury meets sacred spirituality.'
  },
  {
    id: '2',
    title: 'Economy Umrah Package',
    category: 'Economy',
    duration: '10 Days',
    price: 'Rs. 325,000 | 4,380 SAR',
    hotelDetails: '3★ Al Safwa Hotel, Misfalah',
    distanceFromHaram: '600m with Free Shuttle Service',
    transportDetails: 'Shared Bus (A/C)',
    image: 'https://images.unsplash.com/photo-1565552645632-d7cd3f98c7b5?auto=format&fit=crop&q=80&w=800',
    features: ['Visa Processing', 'Group Leader Included', 'Shuttle Service', 'Budget-Friendly', 'Halal Meals Available'],
    description: 'Affordable Umrah without compromising on quality. Perfect for budget-conscious pilgrims seeking a meaningful spiritual journey.'
  },
  {
    id: '3',
    title: 'Standard Umrah Plus',
    category: 'Standard',
    duration: '12 Days',
    price: 'Rs. 465,000 | 6,250 SAR',
    hotelDetails: '4★ Elaf Mashaer Hotel',
    distanceFromHaram: '200m from Haram Main Entrance',
    transportDetails: 'Private Hiace (Group-Shared)',
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=80&w=800',
    features: ['Visa Included', 'Breakfast Daily', 'City Ziyarat', 'Group Guide', 'Medical Assistance', 'SIM Card'],
    description: 'The perfect balance of comfort and affordability. Our Standard package is ideal for families and couples seeking a quality spiritual experience.'
  },
  {
    id: '4',
    title: 'VIP Royal Umrah Exclusive',
    category: 'VIP',
    duration: '14 Days',
    price: 'Rs. 895,000 | 12,000 SAR',
    hotelDetails: '5★ Fairmont Makkah Clock Tower',
    distanceFromHaram: '0m (Clock Tower — Haram View Room)',
    transportDetails: 'Dedicated Private Luxury SUV',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
    features: ['Visa + Insurance', 'Business Class Option', 'Haram View Suite', 'Private Alim', 'All Meals Included', 'VIP Lounge Access', 'Personal Concierge', 'Exclusive Ziyarat'],
    description: 'The pinnacle of Islamic travel luxury. Our Royal VIP package offers unparalleled comfort with a Haram-view suite at the world-famous Fairmont Clock Tower.'
  },
  {
    id: '5',
    title: 'Family Umrah Special',
    category: 'Standard',
    duration: '10 Days',
    price: 'Rs. 395,000 | 5,300 SAR',
    hotelDetails: '4★ Makkah Millennium Hotel',
    distanceFromHaram: '300m (5 min walk)',
    transportDetails: 'Family Private Van',
    image: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?auto=format&fit=crop&q=80&w=800',
    features: ['Visa for Full Family', 'Family Room Available', 'Child-Friendly Services', 'Kids Ihram Kit', 'Elderly Assistance', 'Connected Rooms'],
    description: 'Designed exclusively for families. Special arrangements for children, elderly members, and connected family rooms for a comfortable family Umrah.'
  },
  {
    id: '6',
    title: 'Group Umrah Tour 2026',
    category: 'Economy',
    duration: '08 Days',
    price: 'Rs. 285,000 | 3,850 SAR',
    hotelDetails: '3★ Hotel Makkah (Group)',
    distanceFromHaram: '800m (Shuttle Available)',
    transportDetails: 'Group Coach (A/C)',
    image: 'https://images.unsplash.com/photo-1551041777-ed07f843d47a?auto=format&fit=crop&q=80&w=800',
    features: ['Visa Included', 'Experienced Group Leader', 'Madinah Ziyarat', 'Group Support', 'Budget Plan Available'],
    description: 'Join our managed group tours for an enriching collective spiritual experience. Ideal for mosques, organizations, and friends groups.'
  }
];

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [agents, setAgents] = useState<AgentUser[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    phone: '0313-2710182 | 0316-8629934',
    whatsapp: '0313-2710182',
    email: 'almuntahatravels.solutions@gmail.com',
    address: 'MRC Colony, Malir Halt, Karachi',
    heroTitle: 'Your Trusted Journey Towards Haram',
    heroSub: 'Al Muntaha TRAVELS SOLUTIONS - Experience the spiritual heights with Barakah and Trust.'
  });

  // Load initial data from Supabase or LocalStorage cache
  useEffect(() => {
    async function initData() {
      setIsLoading(true);
      
      try {
        // Try to fetch packages from Supabase
        if (supabase) {
          const { data: pkgData, error: pkgError } = await supabase.from('packages').select('*');
          if (!pkgError && pkgData && pkgData.length > 0) {
            setPackages(pkgData);
          } else {
            const saved = localStorage.getItem('almuntaha_packages');
            setPackages(saved ? JSON.parse(saved) : initialPackages);
          }
        } else {
          const saved = localStorage.getItem('almuntaha_packages');
          setPackages(saved ? JSON.parse(saved) : initialPackages);
        }

        // Fetch enquiries from our server API (proxied)
        const enquiryRes = await fetch('/api/leads');
        const enquiryData = await enquiryRes.json();
        if (Array.isArray(enquiryData)) setEnquiries(enquiryData);

        // Fetch other items from Supabase or localStorage
        if (supabase) {
          const { data: revData } = await supabase.from('reviews').select('*');
          if (revData && revData.length > 0) setReviews(revData);
          else {
            const saved = localStorage.getItem('almuntaha_reviews');
            if (saved) setReviews(JSON.parse(saved));
          }
          
          const { data: gallData } = await supabase.from('gallery').select('*');
          if (gallData && gallData.length > 0) setGallery(gallData);
          else {
            const saved = localStorage.getItem('almuntaha_gallery');
            if (saved) setGallery(JSON.parse(saved));
          }

          const { data: vidData } = await supabase.from('video_reviews').select('*');
          if (vidData && vidData.length > 0) setVideoReviews(vidData);

          const { data: partData } = await supabase.from('partners').select('*');
          if (partData && partData.length > 0) setPartners(partData);
          else {
            const saved = localStorage.getItem('almuntaha_partners');
            if (saved) setPartners(JSON.parse(saved));
          }

          const { data: agentData } = await supabase.from('agents').select('*');
          if (agentData && agentData.length > 0) setAgents(agentData);
          else {
            const saved = localStorage.getItem('almuntaha_agents');
            if (saved) setAgents(JSON.parse(saved));
          }
        } else {
          const revSaved = localStorage.getItem('almuntaha_reviews');
          if (revSaved) setReviews(JSON.parse(revSaved));

          const gallSaved = localStorage.getItem('almuntaha_gallery');
          if (gallSaved) setGallery(JSON.parse(gallSaved));

          const partSaved = localStorage.getItem('almuntaha_partners');
          if (partSaved) setPartners(JSON.parse(partSaved));

          const agentSaved = localStorage.getItem('almuntaha_agents');
          if (agentSaved) setAgents(JSON.parse(agentSaved));
        }

        const companySaved = localStorage.getItem('almuntaha_company');
        if (companySaved) setCompanyInfo(JSON.parse(companySaved));

      } catch (err) {
        console.error('SystemContext init error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initData();
  }, []);

  // Sync to localStorage as backup
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('almuntaha_packages', JSON.stringify(packages));
      localStorage.setItem('almuntaha_reviews', JSON.stringify(reviews));
      localStorage.setItem('almuntaha_gallery', JSON.stringify(gallery));
      localStorage.setItem('almuntaha_enquiries', JSON.stringify(enquiries));
      localStorage.setItem('almuntaha_partners', JSON.stringify(partners));
      localStorage.setItem('almuntaha_agents', JSON.stringify(agents));
      localStorage.setItem('almuntaha_company', JSON.stringify(companyInfo));
    }
  }, [packages, reviews, gallery, enquiries, partners, agents, companyInfo, isLoading]);

  const addPackage = async (p: Omit<Package, 'id'>) => {
    const newPkg = { ...p, id: Date.now().toString() };
    setPackages([...packages, newPkg]);
    if (supabase) await supabase.from('packages').insert([newPkg]);
  };

  const updatePackage = async (id: string, p: Partial<Package>) => {
    setPackages(packages.map(pkg => pkg.id === id ? { ...pkg, ...p } : pkg));
    if (supabase) await supabase.from('packages').update(p).eq('id', id);
  };

  const deletePackage = async (id: string) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    if (supabase) await supabase.from('packages').delete().eq('id', id);
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status'], notes?: string) => {
    const update = { status, notes: notes || '' };
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, ...update } : e));
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo({ ...companyInfo, ...info });
  };

  const deleteReview = async (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
    if (supabase) await supabase.from('reviews').delete().eq('id', id);
  };

  const addReview = async (r: Omit<Review, 'id'>) => {
    const newReview = { ...r, id: Date.now().toString() };
    setReviews([...reviews, newReview]);
    if (supabase) await supabase.from('reviews').insert([newReview]);
  };
  
  const deleteGalleryItem = async (id: string) => {
    setGallery(gallery.filter(g => g.id !== id));
    if (supabase) await supabase.from('gallery').delete().eq('id', id);
  };

  const addPartner = async (p: Omit<Partner, 'id'>) => {
    const newPartner = { ...p, id: Date.now().toString() };
    setPartners([...partners, newPartner]);
    if (supabase) await supabase.from('partners').insert([newPartner]);
  };

  const deletePartner = async (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
    if (supabase) await supabase.from('partners').delete().eq('id', id);
  };

  const addVideoReview = async (v: Omit<VideoReview, 'id'>) => {
    const newVid = { ...v, id: Date.now().toString() };
    setVideoReviews([...videoReviews, newVid]);
    if (supabase) await supabase.from('video_reviews').insert([newVid]);
  };

  const deleteVideoReview = async (id: string) => {
    setVideoReviews(videoReviews.filter(v => v.id !== id));
    if (supabase) await supabase.from('video_reviews').delete().eq('id', id);
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setGallery([...gallery, newItem]);
    if (supabase) await supabase.from('gallery').insert([newItem]);
  };

  const addAgent = async (a: Omit<AgentUser, 'id' | 'createdAt' | 'status'>) => {
    const newAgent: AgentUser = {
      ...a,
      id: Date.now().toString(),
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setAgents([...agents, newAgent]);
    if (supabase) await supabase.from('agents').insert([newAgent]);
  };

  const deleteAgent = async (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
    if (supabase) await supabase.from('agents').delete().eq('id', id);
  };

  const updateAgentStatus = async (id: string, status: AgentUser['status']) => {
    setAgents(agents.map(a => a.id === id ? { ...a, status } : a));
    if (supabase) await supabase.from('agents').update({ status }).eq('id', id);
  };

  return (
    <SystemContext.Provider value={{
      packages, reviews, gallery, partners, agents, projects, enquiries, companyInfo, isLoading, videoReviews,
      addPackage, updatePackage, deletePackage,
      addReview, deleteReview, 
      addPartner, deletePartner,
      addAgent, deleteAgent, updateAgentStatus,
      addVideoReview, deleteVideoReview,
      addGalleryItem, deleteGalleryItem,
      updateEnquiryStatus, updateCompanyInfo
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}
