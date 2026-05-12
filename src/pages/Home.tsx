import { motion } from 'motion/react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Packages from '../components/home/Packages';
import Gallery from '../components/home/Gallery';
import Testimonials from '../components/home/Testimonials';
import Partners from '../components/home/Partners';
import Contact from '../components/home/Contact';
import BlogPreview from '../components/home/BlogPreview';
import RecentTours from '../components/home/RecentTours';
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
      <Hero />
      
      <section id="about" className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-emerald-deep/5"
      )}>
        <About />
      </section>

      <section id="packages" className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-emerald-dark" : "bg-white"
      )}>
        <Packages />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-black" : "bg-emerald-deep/[0.02]"
      )}>
        <RecentTours />
      </section>

      <section id="gallery" className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-[#050505]" : "bg-white"
      )}>
        <Gallery />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-gradient-to-b from-black to-[#050505]" : "bg-emerald-deep/[0.03]"
      )}>
        <Testimonials />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-[#050505]" : "bg-white"
      )}>
        <Partners />
      </section>

      <section className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-black" : "bg-emerald-deep/[0.02]"
      )}>
        <BlogPreview />
      </section>

      <section id="contact" className={cn(
        "py-20 md:py-32 transition-colors duration-300",
        theme === 'dark' ? "bg-gradient-to-b from-black to-emerald-dark" : "bg-white"
      )}>
        <Contact />
      </section>
    </motion.div>
  );
}
