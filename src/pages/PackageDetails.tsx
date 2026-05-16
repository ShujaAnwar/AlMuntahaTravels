import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { usePackages } from '../hooks/usePackages';
import { Check, ArrowLeft, Hotel, MapPin, Calendar, Users, Plane, Shield } from 'lucide-react';

export default function PackageDetails() {
  const { id } = useParams();
  const { packages } = usePackages();
  const pkg = packages.find(p => p.id === id);

  if (!pkg) return (
    <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold mb-4">Package not found</h2>
      <Link to="/" className="text-gold-premium underline">Return Home</Link>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-black"
    >
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={pkg.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-12 left-0 w-full px-6">
          <div className="max-w-7xl mx-auto">
             <Link to="/#packages" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
               <ArrowLeft size={18} /> Back to Packages
             </Link>
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="text-gold-premium text-xs uppercase tracking-[0.3em] font-bold mb-2 block">{pkg.category} Category</span>
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">{pkg.title}</h1>
                </div>
                <div className="text-right">
                   <p className="text-white/40 text-sm mb-1 uppercase tracking-widest">Starting from</p>
                   <p className="text-4xl font-bold text-gold-premium">{pkg.price}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">About this Journey</h2>
              <p className="text-white/70 leading-relaxed text-lg font-light">
                {pkg.description || "Experience a soul-stirring journey towards the heart of the Islamic world. This package is meticulously planned to provide you with the perfect environment for reflection, prayer, and connection with the Divine."}
              </p>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="glass p-6 rounded-2xl text-center">
                 <Calendar className="text-gold-premium mx-auto mb-3" />
                 <span className="block text-white font-bold">{pkg.duration}</span>
                 <span className="block text-white/40 text-[10px] uppercase mt-1">Duration</span>
               </div>
               <div className="glass p-6 rounded-2xl text-center">
                 <Hotel className="text-gold-premium mx-auto mb-3" />
                 <span className="block text-white font-bold leading-tight truncate">VIP Stay</span>
                 <span className="block text-white/40 text-[10px] uppercase mt-1">Accommodation</span>
               </div>
               <div className="glass p-6 rounded-2xl text-center">
                 <Plane className="text-gold-premium mx-auto mb-3" />
                 <span className="block text-white font-bold">Standard</span>
                 <span className="block text-white/40 text-[10px] uppercase mt-1">Flight Type</span>
               </div>
               <div className="glass p-6 rounded-2xl text-center">
                 <Shield className="text-gold-premium mx-auto mb-3" />
                 <span className="block text-white font-bold">Included</span>
                 <span className="block text-white/40 text-[10px] uppercase mt-1">Insurance</span>
               </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-8">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-deep/20 flex items-center justify-center border border-emerald-deep/50 flex-shrink-0">
                      <Check className="text-gold-premium" size={16} />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
               <h2 className="text-2xl font-serif font-bold text-white mb-8">Itinerary Details</h2>
               <div className="space-y-6">
                  <div className="relative pl-8 border-l border-white/10 pb-8">
                     <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-gold-premium" />
                     <h4 className="text-white font-bold mb-2">Makkah Phase</h4>
                     <p className="text-white/60 text-sm">Stay at {pkg.hotelDetails.split('|')[0] || "Premium Makkah Hotel"} for spiritual serenity near the Haram.</p>
                  </div>
                  <div className="relative pl-8 border-l border-white/10 pb-8">
                     <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-gold-premium/50" />
                     <h4 className="text-white font-bold mb-2">Madinah Phase</h4>
                     <p className="text-white/60 text-sm">Transfer to the city of the Prophet (PBUH) with stay at {pkg.hotelDetails.split('|')[1] || "Central Madinah Hotel"}.</p>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar Action */}
          <div className="lg:col-span-1">
            <div className="glass-dark p-8 rounded-[2rem] border border-white/10 sticky top-32">
               <h3 className="text-xl font-serif font-bold mb-6">Reservation Summary</h3>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Base Package</span>
                    <span className="text-white">{pkg.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Visa & Taxes</span>
                    <span className="text-green-500 font-medium">Included</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-gold-premium">{pkg.price}</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <Link 
                    to="/#contact"
                    className="w-full py-4 bg-gold-premium text-black font-bold rounded-xl hover:scale-105 transition-all shadow-lg active:scale-95 flex items-center justify-center"
                  >
                    Proceed to Booking
                  </Link>
                  <Link 
                    to="/#contact"
                    className="w-full py-4 glass border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all flex items-center justify-center"
                  >
                    Request Brochure (PDF)
                  </Link>
               </div>

               <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-xs text-white/40 mb-2 italic">Need help? Chat with us</p>
                  <a href="https://wa.me/923132710182" target="_blank" rel="noopener noreferrer" className="text-gold-premium font-bold text-sm tracking-widest uppercase hover:underline">WhatsApp Support</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
