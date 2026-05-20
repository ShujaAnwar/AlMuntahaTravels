import { motion } from 'motion/react';
import { lazy, Suspense } from 'react';
import Hero from '../components/home/Hero';
import SEO from '../components/seo/SEO';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

// Lazy load below-the-fold home page sections to maximize lighthouse performance
const About = lazy(() => import('../components/home/About'));
const PackageBuilderCTA = lazy(() => import('../components/home/PackageBuilderCTA'));
const Packages = lazy(() => import('../components/home/Packages'));
const RecentTours = lazy(() => import('../components/home/RecentTours'));
const Gallery = lazy(() => import('../components/home/Gallery'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const Partners = lazy(() => import('../components/home/Partners'));
const BlogPreview = lazy(() => import('../components/home/BlogPreview'));
const FAQ = lazy(() => import('../components/home/FAQ'));
const Contact = lazy(() => import('../components/home/Contact'));

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function Home() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative transition-colors duration-300"
    >
      <SEO 
        title="Al Muntaha TRAVELS SOLUTIONS | Best Umrah Packages from Karachi" 
        description="Premium Umrah, Hajj & Travel Services in Karachi. Specializing in Budget & VIP Umrah Packages with luxury hotels and personalized spiritual care."
        keywords="AL MUNTAHA TRAVELS SOLUTIONS, Umrah Packages 2024, Best Umrah Travel Agency Karachi, Hajj and Umrah Services Pakistan, Economy Umrah Packages"
      />
      <Hero />
      
      <Suspense fallback={<div className="min-h-[250px] animate-pulse bg-gold-premium/5" />}>
        <PackageBuilderCTA />
      </Suspense>

      <Suspense fallback={<div className="min-h-[250px]" />}>
        <section id="about" className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-slate-100"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '600px' }}>
          <About />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[250px]" />}>
        <section id="packages" className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-emerald-dark" : "bg-white"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '800px' }}>
          <Packages />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <section className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-black" : "bg-slate-50"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '500px' }}>
          <RecentTours />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[250px]" />}>
        <section id="gallery" className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-emerald-dark" : "bg-white border-y border-slate-200"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '1000px' }}>
          <Gallery />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <section className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-slate-100"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '600px' }}>
          <Testimonials />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[150px]" />}>
        <section className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-emerald-dark" : "bg-white"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '300px' }}>
          <Partners />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <section className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-black" : "bg-slate-50"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '600px' }}>
          <BlogPreview />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <section className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-emerald-dark" : "bg-white"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '500px' }}>
          <FAQ />
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[250px]" />}>
        <section id="contact" className={cn(
          "py-20 md:py-32 transition-colors duration-500",
          theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-white border-t border-slate-200"
        )} style={{ contentVisibility: 'auto', containIntrinsicHeight: '700px' }}>
          <Contact />
        </section>
      </Suspense>
    </motion.div>
  );
}
