import React, { createContext, useContext, useState, useEffect } from 'react';
import { Package, Review, GalleryItem, Partner, Project, Enquiry, CompanyInfo } from '../types';

interface SystemContextType {
  packages: Package[];
  reviews: Review[];
  gallery: GalleryItem[];
  partners: Partner[];
  projects: Project[];
  enquiries: Enquiry[];
  companyInfo: CompanyInfo;
  
  // Actions
  addPackage: (p: Omit<Package, 'id'>) => void;
  updatePackage: (id: string, p: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  
  addReview: (r: Omit<Review, 'id'>) => void;
  deleteReview: (id: string) => void;
  
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
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
    price: '$2,499',
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
    price: '$1,299',
    hotelDetails: '3* Hotel in Misfalah',
    distanceFromHaram: '600m with Shuttle',
    transportDetails: 'Shared Bus',
    image: 'https://images.unsplash.com/photo-1565551905470-24dd30277053?auto=format&fit=crop&q=80',
    features: ['Visa Included', 'Group Leader', 'Budget Friendly'],
    description: 'Affordable Umrah with essential comfort for pilgrim seekers.'
  }
];

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('almuntaha_packages');
    return saved ? JSON.parse(saved) : initialPackages;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('almuntaha_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('almuntaha_gallery');
    return saved ? JSON.parse(saved) : [];
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('almuntaha_partners');
    return saved ? JSON.parse(saved) : [];
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('almuntaha_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('almuntaha_enquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('almuntaha_company');
    return saved ? JSON.parse(saved) : {
      phone: '0313-2710182 | 0316-8629934',
      whatsapp: '0313-2710182',
      email: 'almuntahatravelsandtours@gmail.com',
      address: 'MRC Colony, Malir Halt, Karachi',
      heroTitle: 'Your Trusted Journey Towards Haram',
      heroSub: 'Al Muntaha Travels and Tours - Experience the spiritual heights with Barakah and Trust.'
    };
  });

  useEffect(() => {
    localStorage.setItem('almuntaha_packages', JSON.stringify(packages));
    localStorage.setItem('almuntaha_reviews', JSON.stringify(reviews));
    localStorage.setItem('almuntaha_gallery', JSON.stringify(gallery));
    localStorage.setItem('almuntaha_partners', JSON.stringify(partners));
    localStorage.setItem('almuntaha_projects', JSON.stringify(projects));
    localStorage.setItem('almuntaha_enquiries', JSON.stringify(enquiries));
    localStorage.setItem('almuntaha_company', JSON.stringify(companyInfo));
  }, [packages, reviews, gallery, partners, projects, enquiries, companyInfo]);

  const addPackage = (p: Omit<Package, 'id'>) => {
    const newPkg = { ...p, id: Date.now().toString() };
    setPackages([...packages, newPkg]);
  };

  const updatePackage = (id: string, p: Partial<Package>) => {
    setPackages(packages.map(pkg => pkg.id === id ? { ...pkg, ...p } : pkg));
  };

  const deletePackage = (id: string) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], notes?: string) => {
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status, notes: notes || e.notes } : e));
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo({ ...companyInfo, ...info });
  };

  const deleteReview = (id: string) => setReviews(reviews.filter(r => r.id !== id));
  const addReview = (r: Omit<Review, 'id'>) => setReviews([...reviews, { ...r, id: Date.now().toString() }]);
  
  const deleteGalleryItem = (id: string) => setGallery(gallery.filter(g => g.id !== id));
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => setGallery([...gallery, { ...item, id: Date.now().toString() }]);

  return (
    <SystemContext.Provider value={{
      packages, reviews, gallery, partners, projects, enquiries, companyInfo,
      addPackage, updatePackage, deletePackage,
      addReview, deleteReview, 
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
