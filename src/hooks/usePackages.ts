import { useState, useEffect } from 'react';
import { Package } from '../types';

const defaultPackages: Package[] = [
  {
    id: '1',
    title: 'Economy Umrah Package',
    category: 'Economy',
    duration: '15 Days',
    price: '$750',
    hotelDetails: 'Makkah: Al Kiswah Towers | Madinah: Al Mukhtara',
    distanceFromHaram: '900m from Haram (Shuttle Service)',
    transportDetails: 'VIP Bus Transport',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=600',
    features: ['Visa Processing', 'Ziyarat included', 'Return Air Ticket', 'Breakfast'],
    description: 'An affordable yet comfortable journey for those seeking barakah on a budget.'
  },
  {
    id: '2',
    title: 'Standard Spiritual Journey',
    category: 'Standard',
    duration: '21 Days',
    price: '$1,200',
    hotelDetails: 'Makkah: Anjum Hotel | Madinah: Dyar International',
    distanceFromHaram: '200m from Haram',
    transportDetails: 'Private GMC Transport',
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=80&w=600',
    features: ['Visa Processing', 'Luxury Ziyarat', 'Direct Flight', 'Half Board'],
    description: 'Perfect balance of proximity and price for a peaceful pilgrimage.'
  },
  {
    id: '3',
    title: 'VIP Royal Experience',
    category: 'VIP',
    duration: '10 Days',
    price: '$3,500',
    hotelDetails: 'Makkah: Fairmont Clock Tower | Madinah: Oberoi',
    distanceFromHaram: '0m from Haram (Full View)',
    transportDetails: 'Chauffeur Driven S-Class',
    image: 'https://images.unsplash.com/photo-1565552645632-d7cd3f98c7b5?auto=format&fit=crop&q=80&w=600',
    features: ['Premium Visa', 'Private Scholar', 'Business Class', 'Full Board', 'Wheelchair Support'],
    description: 'The ultimate luxury experience for the most sacred journey of your life.'
  }
];

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('al_muntaha_packages');
    if (stored) {
      setPackages(JSON.parse(stored));
    } else {
      setPackages(defaultPackages);
      localStorage.setItem('al_muntaha_packages', JSON.stringify(defaultPackages));
    }
  }, []);

  const addPackage = (pkg: Package) => {
    const updated = [...packages, { ...pkg, id: Date.now().toString() }];
    setPackages(updated);
    localStorage.setItem('al_muntaha_packages', JSON.stringify(updated));
  };

  const deletePackage = (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    localStorage.setItem('al_muntaha_packages', JSON.stringify(updated));
  };

  const updatePackage = (pkg: Package) => {
    const updated = packages.map(p => p.id === pkg.id ? pkg : p);
    setPackages(updated);
    localStorage.setItem('al_muntaha_packages', JSON.stringify(updated));
  };

  return { packages, addPackage, deletePackage, updatePackage };
}
