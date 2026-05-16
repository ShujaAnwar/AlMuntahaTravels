import { motion } from 'motion/react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Packages from '../components/home/Packages';
import Contact from '../components/home/Contact';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

interface PackageCategoryPageProps {
  title: string;
  category: string;
  description: string;
  keywords: string;
}

export default function PackageCategoryPage({ title, category, description, keywords }: PackageCategoryPageProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen"
    >
      <SEO 
        title={`${title} | AL MUNTAHA TRAVELS SOLUTIONS`} 
        description={description}
        keywords={keywords}
      />
      
      <div className={cn(
        "py-12 border-b theme-border",
        theme === 'dark' ? "bg-black" : "bg-slate-50"
      )}>
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto px-6 mt-8">
           <h1 className="text-4xl md:text-6xl font-serif font-bold text-main mb-6">{title}</h1>
           <p className="text-sub text-lg max-w-3xl font-light">{description}</p>
        </div>
      </div>

      <section className={cn(
        "py-20",
        theme === 'dark' ? "bg-emerald-dark" : "bg-white"
      )}>
        <Packages /> {/* This component currently shows all, but we could filter it if we wanted */}
      </section>

      <section className={cn(
        "py-20",
        theme === 'dark' ? "bg-black" : "bg-slate-50"
      )}>
        <Contact />
      </section>
    </motion.div>
  );
}
