import React, { createContext, useContext, useState, useEffect } from 'react';
import { Package, Review, GalleryItem, Partner, Project, Enquiry, CompanyInfo } from '../types';
import { supabase } from '../lib/supabase';

interface SystemContextType {
  packages: Package[];
  reviews: Review[];
  gallery: GalleryItem[];
  partners: Partner[];
  projects: Project[];
  enquiries: Enquiry[];
  videoReviews: VideoReview[];
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
  
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

// Initial mock data
const initialPackages: Package[] = [
  {
    id: '1',
    title: 'Ramadan Special Umrah',
    category: 'VIP',
    duration: '15 Days',
    price: 'Rs. 695,000 | 9,350 SAR',
    hotelDetails: '5* Pullman ZamZam Makkah',
    distanceFromHaram: '0m (In Clock Tower)',
    transportDetails: 'Private GMC Transport',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80',
    features: ['Visa Included', 'Ziyarat of Makkah & Madinah', 'Buffet Suhoor & Iftar', 'Expert Guide'],
    description: 'Experience the spiritual rewards of Ramadan in the Holy Cities.'
  },
  {
    id: '2',
    title: 'Economy Umrah Plus',
    category: 'Economy',
    duration: '10 Days',
    price: 'Rs. 325,000 | 4,380 SAR',
    hotelDetails: '3* Hotel in Misfalah',
    distanceFromHaram: '600m with Shuttle',
    transportDetails: 'Shared Bus',
    image: 'https://images.unsplash.com/photo-1565551905470-24dd30277053?auto=format&fit=crop&q=80',
    features: ['Visa Included', 'Group Leader', 'Budget Friendly'],
    description: 'Affordable Umrah with essential comfort for pilgrim seekers.'
  }
];

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
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
        } else {
          const revSaved = localStorage.getItem('almuntaha_reviews');
          if (revSaved) setReviews(JSON.parse(revSaved));

          const gallSaved = localStorage.getItem('almuntaha_gallery');
          if (gallSaved) setGallery(JSON.parse(gallSaved));

          const partSaved = localStorage.getItem('almuntaha_partners');
          if (partSaved) setPartners(JSON.parse(partSaved));
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
      localStorage.setItem('almuntaha_company', JSON.stringify(companyInfo));
    }
  }, [packages, reviews, gallery, enquiries, partners, companyInfo, isLoading]);

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

  return (
    <SystemContext.Provider value={{
      packages, reviews, gallery, partners, projects, enquiries, companyInfo, isLoading, videoReviews,
      addPackage, updatePackage, deletePackage,
      addReview, deleteReview, 
      addPartner, deletePartner,
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
