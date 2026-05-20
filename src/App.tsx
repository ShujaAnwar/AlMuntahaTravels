import { useState, useEffect, ReactNode, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import ScrollToHash from './components/utils/ScrollToHash';
import ChatAssistant from './components/common/ChatAssistant';
import ExitIntentPopup from './components/common/ExitIntentPopup';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SystemProvider } from './context/SystemContext';
import { ThemeProvider } from './context/ThemeContext';

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
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-12 h-12 border-2 border-gold-premium border-t-transparent rounded-full animate-spin"
    />
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
    // Reduced artificial delay from 2000ms to 800ms for better perceived speed
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="text-center"
        >
          <div className="w-16 h-16 bg-emerald-deep rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(6,78,59,0.5)]">
             <span className="text-gold-premium font-serif font-bold text-3xl">A</span>
          </div>
          <h2 className="text-white font-serif tracking-widest uppercase text-sm">AL MUNTAHA TRAVELS SOLUTIONS</h2>
          <div className="mt-8 w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-full bg-gold-premium" 
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <SystemProvider>
        <AuthProvider>
          <ThemeProvider>
            <div className="relative min-h-screen font-sans selection:bg-gold-premium selection:text-black">
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gold-premium origin-left z-[100]"
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
                  <Route path="/umrah-packages" element={<PackageCategoryPage title="Umrah Packages 2026" category="all" description="Explore our comprehensive range of Umrah packages for 2026. From budget-friendly options to VIP luxury experiences, AL MUNTAHA TRAVELS SOLUTIONS offers the best spiritual journeys from Pakistan." keywords="Umrah Packages 2026, Umrah Travel Agency, Best Umrah Deals Karachi" />} />
                  <Route path="/economy-umrah" element={<PackageCategoryPage title="Economy Umrah Packages" category="economy" description="Affordable and comfortable Umrah packages. Perform your pilgrimage with peace of mind and essential services included." keywords="Economy Umrah, Cheap Umrah Packages, Budget Umrah Pakistan" />} />
                  <Route path="/vip-umrah" element={<PackageCategoryPage title="VIP Umrah Packages" category="vip" description="Luxury VIP Umrah experiences with premium 5-star hotel stays, private VIP transport, and exclusive services." keywords="VIP Umrah, Luxury Umrah Packages, 5 Star Umrah Karachi" />} />
                  <Route path="/ramadan-umrah" element={<PackageCategoryPage title="Ramadan Umrah Packages" category="ramadan" description="Experience the blessings of Ramadan in the Holy Cities. Book your Ramadan Umrah package early for the best availability." keywords="Ramadan Umrah 2026, Umrah in Ramadan, Ramadan Packages Karachi" />} />
                  <Route path="/visa-services" element={<PackageCategoryPage title="Saudi Visa Services" category="visa" description="Fast and reliable Saudi visa processing services, including Umrah visas, Tourist visas, and Business visas." keywords="Saudi Visa Pakistan, Umrah Visa Karachi, Tourist Visa Saudi Arabia" />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
          <BackToTop />
          <ScrollToHash />
          <ChatAssistant />
          <ExitIntentPopup />

          {/* Floating WhatsApp Button */}
          <motion.a
            href="https://wa.me/923132710182"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 right-6 md:bottom-32 md:right-12 z-50 p-4 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ rotate: 12 }}
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>
        </div>
          </ThemeProvider>
        </AuthProvider>
      </SystemProvider>
    </Router>
  );
}
