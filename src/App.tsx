import { ReactNode, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import ScrollToHash from './components/utils/ScrollToHash';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SystemProvider } from './context/SystemContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load widgets
const ChatAssistant = lazy(() => import('./components/common/ChatAssistant'));
const ExitIntentPopup = lazy(() => import('./components/common/ExitIntentPopup'));

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const PackageCategoryPage = lazy(() => import('./pages/PackageCategoryPage'));
const PackageBuilder = lazy(() => import('./pages/PackageBuilder'));
const AgentPortal = lazy(() => import('./pages/AgentPortal'));
const VideoReviews = lazy(() => import('./pages/VideoReviews'));

function ProtectedRoute({ children, role: requiredRole }: { children: ReactNode; role?: 'admin' | 'partner' }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const PageLoading = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <Router>
      <SystemProvider>
        <AuthProvider>
          <ThemeProvider>
            <div className="relative min-h-screen font-sans selection:bg-[#C9A84C] selection:text-black">

              <Navbar />

              <main>
                <Suspense fallback={<PageLoading />}>
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
                      <PackageCategoryPage title="All Umrah Packages 2026" category="all"
                        description="Explore our Umrah packages for 2026." keywords="Umrah Packages 2026" />} />
                    <Route path="/economy-umrah" element={
                      <PackageCategoryPage title="Economy Umrah Packages" category="economy"
                        description="Affordable Umrah packages from Pakistan." keywords="Economy Umrah Pakistan" />} />
                    <Route path="/vip-umrah" element={
                      <PackageCategoryPage title="VIP Umrah — Luxury 5-Star" category="vip"
                        description="Luxury VIP Umrah with 5-star hotels." keywords="VIP Umrah Luxury" />} />
                    <Route path="/ramadan-umrah" element={
                      <PackageCategoryPage title="Ramadan Umrah 2026" category="ramadan"
                        description="Ramadan Umrah packages 2026." keywords="Ramadan Umrah 2026" />} />
                    <Route path="/visa-services" element={
                      <PackageCategoryPage title="Saudi Visa Services" category="visa"
                        description="Fast Saudi visa processing in Pakistan." keywords="Saudi Visa Pakistan" />} />
                  </Routes>
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
              <a
                href="https://wa.me/923132710182?text=Assalamu%20Alaikum!%20I%20am%20interested%20in%20Umrah%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 w-13 h-13 p-3.5 bg-green-500 hover:bg-green-600 rounded-full shadow-xl shadow-green-500/30 transition-all hover:scale-110"
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* Mobile sticky Call Bar */}
              <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <a
                  href="tel:+923132710182"
                  className="flex items-center justify-center gap-2 bg-[#C9A84C] text-black font-bold py-3.5 text-sm"
                >
                  📞 Call: 0313-2710182
                </a>
              </div>

            </div>
          </ThemeProvider>
        </AuthProvider>
      </SystemProvider>
    </Router>
  );
}
