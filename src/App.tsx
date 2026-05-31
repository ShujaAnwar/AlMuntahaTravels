import { useState, useEffect, ReactNode, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import ScrollToHash from './components/utils/ScrollToHash';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SystemProvider } from './context/SystemContext';
import { ThemeProvider } from './context/ThemeContext';
import { Phone } from 'lucide-react';

// Lazy load non-critical widgets to minimize initial bundle size and speed up PageSpeed Index
const ChatAssistant = lazy(() => import('./components/common/ChatAssistant'));
const ExitIntentPopup = lazy(() => import('./components/common/ExitIntentPopup'));

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const PackageCategoryPage = lazy(() => import('./pages/PackageCategoryPage'));
const PackageBuilder = lazy(() => import('./pages/PackageBuilder'));
const AgentPortal = lazy(() => import('./pages/AgentPortal'));
const VideoReviews = lazy(() => import('./pages/VideoReviews'));

function ProtectedRoute({ children, role: requiredRole }: { children: ReactNode, role?: 'admin' | 'partner' }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />;
  return <>{children}</>;
}

// Optimized Loading Component
const PageLoading = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-16 h-16">
        <div className="w-full h-full rounded-full border-2 border-gold-premium/20" />
        <div className="absolute inset-0 rounded-full border-2 border-gold-premium border-t-transparent animate-spin" />
        <div className="absolute inset-3 bg-gold-premium/5 rounded-full flex items-center justify-center">
          <span className="text-gold-premium font-urdu font-bold text-xl">م</span>
        </div>
      </div>
      <span className="text-white/40 text-xs uppercase tracking-widest animate-pulse">Loading...</span>
    </div>
  </div>
);

// Premium Loading Screen
const SplashScreen = () => (
  <div className="fixed inset-0 bg-emerald-dark z-[200] flex items-center justify-center overflow-hidden">
    {/* Background patterns */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-premium/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-deep/20 rounded-full blur-[150px]" />
    </div>
    
    {/* Geometric circle animation */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute w-80 h-80 border border-gold-premium/10 rounded-full"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-64 h-64 border border-gold-premium/15 rounded-full"
      style={{ borderStyle: 'dashed' }}
    />
    
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 text-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-20 h-20 bg-gold-premium rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(201,168,76,0.4)]"
      >
        <span className="text-black font-urdu font-bold text-4xl">م</span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-white font-serif font-bold text-2xl tracking-[0.2em] uppercase mb-1"
      >
        AL MUNTAHA
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gold-premium text-xs tracking-[0.4em] uppercase font-bold"
      >
        TRAVELS SOLUTIONS
      </motion.p>
      
      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 w-48 mx-auto"
      >
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-gold-premium to-gold-light rounded-full"
          />
        </div>
        <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] mt-3">
          بسم الله الرحمن الرحيم
        </p>
      </motion.div>
    </motion.div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <SystemProvider>
        <AuthProvider>
          <ThemeProvider>
            <div className="relative min-h-screen font-sans selection:bg-gold-premium selection:text-black">
              
              {/* Scroll progress indicator */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-premium via-gold-light to-gold-premium origin-left z-[100]"
                style={{ scaleX }}
              />
              
              <Navbar />
              
              <main className="relative">
                <Suspense fallback={<PageLoading />}>
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<AdminLogin />} />
                      <Route 
                        path="/admin" 
                        element={
                          <ProtectedRoute role="admin">
                            <AdminDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/package/:id" element={<PackageDetails />} />
                      <Route path="/builder" element={<PackageBuilder />} />
                      <Route 
                        path="/portal" 
                        element={
                          <ProtectedRoute role="partner">
                            <AgentPortal />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/video-reviews" element={<VideoReviews />} />
                      <Route path="/umrah-packages" element={
                        <PackageCategoryPage 
                          title="All Umrah Packages 2026" 
                          category="all" 
                          description="Explore our comprehensive range of Umrah packages for 2026. From budget-friendly options to VIP luxury experiences, AL MUNTAHA TRAVELS offers the best spiritual journeys from Pakistan."
                          keywords="Umrah Packages 2026, Umrah Travel Agency, Best Umrah Deals Karachi"
                        />
                      } />
                      <Route path="/economy-umrah" element={
                        <PackageCategoryPage 
                          title="Economy Umrah Packages" 
                          category="economy" 
                          description="Affordable and comfortable Economy Umrah packages from Pakistan. Perform your pilgrimage with peace of mind and all essential services included."
                          keywords="Economy Umrah, Cheap Umrah Packages, Budget Umrah Pakistan"
                        />
                      } />
                      <Route path="/vip-umrah" element={
                        <PackageCategoryPage 
                          title="VIP Umrah Packages — Luxury 5-Star" 
                          category="vip" 
                          description="Luxury VIP Umrah experiences with premium 5-star hotel stays, private VIP transport, personal scholar guide, and exclusive Ziyarat services."
                          keywords="VIP Umrah, Luxury Umrah Packages, 5 Star Umrah Karachi, Royal Umrah"
                        />
                      } />
                      <Route path="/ramadan-umrah" element={
                        <PackageCategoryPage 
                          title="Ramadan Umrah Packages 2026" 
                          category="ramadan" 
                          description="Experience the exceptional blessings of Ramadan in the Holy Cities. Book your Ramadan Umrah package early for the best hotel availability."
                          keywords="Ramadan Umrah 2026, Umrah in Ramadan, Ramadan Packages Karachi"
                        />
                      } />
                      <Route path="/visa-services" element={
                        <PackageCategoryPage 
                          title="Saudi Visa Services Pakistan" 
                          category="visa" 
                          description="Fast and reliable Saudi visa processing services in Pakistan, including Umrah visas, Tourist visas, and Business visas with expert documentation support."
                          keywords="Saudi Visa Pakistan, Umrah Visa Karachi, Tourist Visa Saudi Arabia, Saudi e-Visa"
                        />
                      } />
                    </Routes>
                  </AnimatePresence>
                </Suspense>
              </main>
              
              <Footer />
              <BackToTop />
              <ScrollToHash />
              
              <Suspense fallback={null}>
                <ChatAssistant />
                <ExitIntentPopup />
              </Suspense>

              {/* Floating WhatsApp Button */}
              <motion.a
                href="https://wa.me/923132710182?text=Assalamu%20Alaikum!%20I%20am%20interested%20in%20Umrah%20packages."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-24 right-5 md:bottom-28 md:right-10 z-50 p-4 bg-green-500 rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-shadow"
                aria-label="Chat on WhatsApp"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-green-500 rounded-full opacity-30"
                />
                <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.a>

              {/* Sticky Call Button (Mobile Only) */}
              <motion.a
                href="tel:+923132710182"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3, type: "spring" }}
                className="fixed bottom-6 left-0 right-0 mx-4 z-50 md:hidden bg-gold-premium text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-2xl shadow-gold-premium/30"
                aria-label="Call AL MUNTAHA TRAVELS"
              >
                <Phone size={18} />
                <span className="text-sm">Call Now: 0313-2710182</span>
              </motion.a>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </SystemProvider>
    </Router>
  );
}
