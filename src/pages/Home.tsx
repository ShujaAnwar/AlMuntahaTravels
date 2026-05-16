import { motion } from 'motion/react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import PackageBuilderCTA from '../components/home/PackageBuilderCTA';
import Packages from '../components/home/Packages';
import Gallery from '../components/home/Gallery';
import Testimonials from '../components/home/Testimonials';
import Partners from '../components/home/Partners';
import Contact from '../components/home/Contact';
import BlogPreview from '../components/home/BlogPreview';
import RecentTours from '../components/home/RecentTours';
import FAQ from '../components/home/FAQ';
import SEO from '../components/seo/SEO';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

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
      
      <PackageBuilderCTA />

      <section id="about" className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-slate-100"
      )}>
        <About />
      </section>

      <section id="packages" className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-emerald-dark" : "bg-white"
      )}>
        <Packages />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-black" : "bg-slate-50"
      )}>
        <RecentTours />
      </section>

      <section id="gallery" className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-emerald-dark" : "bg-white border-y border-slate-200"
      )}>
        <Gallery />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-slate-100"
      )}>
        <Testimonials />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-emerald-dark" : "bg-white"
      )}>
        <Partners />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-black" : "bg-slate-50"
      )}>
        <BlogPreview />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-emerald-dark" : "bg-white"
      )}>
        <FAQ />
      </section>

      <section id="contact" className={cn(
        "py-20 md:py-32 transition-colors duration-500",
        theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-white border-t border-slate-200"
      )}>
        <Contact />
      </section>
    </motion.div>
  );
}
