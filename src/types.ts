export interface VideoReview {
  id: string;
  title: string;
  youtubeId: string;
  description?: string;
}

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
  website?: string;
}

export interface AgentUser {
  id: string;
  username: string;
  password: string;
  name: string;
  agencyName: string;
  status: 'active' | 'suspended';
  createdAt: string;
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

export interface PackageInquiry {
  id: string;
  personal: {
    fullName: string;
    whatsapp: string;
    contact: string;
    email: string;
    city: string;
    travelers: number;
    type: 'Family' | 'Group' | 'Individual';
  };
  journey: {
    type: 'Umrah' | 'Hajj' | 'Ramadan Umrah' | 'VIP Umrah' | 'Group Umrah' | 'Custom Tour';
    departureDate: string;
    returnDate: string;
    flexible: boolean;
    days: number;
  };
  makkah: {
    distancePref: string;
    hotels: string[];
  };
  madinah: {
    distancePref: string;
    hotels: string[];
  };
  rooms: {
    type: string[];
    smoking: boolean;
    connected: boolean;
    elderly: boolean;
  };
  food: {
    plan: string;
    preference: string[];
  };
  transport: {
    required: boolean;
    type: string;
    services: string[];
  };
  extras: string[];
  budget: {
    range: 'Economy' | 'Standard' | 'Premium' | 'VIP Luxury';
    customAmount?: number;
  };
  notes: string;
  status: 'New' | 'Assigned' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  assignedTo: string | null;
  assignedAt: string | null;
}

export interface CompanyInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSub: string;
}
