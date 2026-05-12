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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <Hero />
      
      <section id="about" className="py-24 bg-gradient-to-b from-black to-emerald-dark">
        <About />
      </section>

      <section id="packages" className="py-24 bg-emerald-dark">
        <Packages />
      </section>

      <section className="py-24 bg-black">
        <RecentTours />
      </section>

      <section id="gallery" className="py-24 bg-[#050505]">
        <Gallery />
      </section>

      <section className="py-24 bg-gradient-to-b from-black to-[#050505]">
        <Testimonials />
      </section>

      <section className="py-24 bg-[#050505]">
        <Partners />
      </section>

      <section className="py-24 bg-black">
        <BlogPreview />
      </section>

      <section id="contact" className="py-24 bg-gradient-to-b from-black to-emerald-dark">
        <Contact />
      </section>
    </motion.div>
  );
}
