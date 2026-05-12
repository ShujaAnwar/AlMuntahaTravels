export interface Package {
  id: string;
  title: string;
  category: 'Economy' | 'Standard' | 'VIP' | 'Custom';
  duration: string;
  price: string;
  hotelDetails: string;
  distanceFromHaram: string;
  transportDetails: string;
  image: string;
  features: string[];
  description: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  language: 'en' | 'ur';
  avatar?: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  type: 'image' | 'video';
  category: 'Makkah' | 'Madinah' | 'Tours';
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  status: 'ongoing' | 'completed';
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  package: string;
  message: string;
  status: 'new' | 'in-progress' | 'confirmed' | 'rejected';
  date: string;
  notes?: string;
}

export interface CompanyInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSub: string;
}
