import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Menu, X, Phone, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Packages', path: '/#packages' },
    { title: 'About', path: '/#about' },
    { title: 'Gallery', path: '/#gallery' },
    { title: 'Contact', path: '/#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled ? 'bg-black/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border-2 border-gold-premium rotate-45 flex items-center justify-center group-hover:bg-gold-premium transition-all duration-300">
             <span className="text-gold-premium group-hover:text-black -rotate-45 font-bold text-xl">M</span>
          </div>
          <span className="text-xl font-serif font-bold tracking-[0.2em] uppercase text-white">
            AL MUNTAHA <span className="text-gold-premium">Travels</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="text-sm font-medium hover:text-gold-premium transition-colors relative group"
            >
              {link.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-premium transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            to="/admin"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <User size={20} className="text-gold-premium" />
          </Link>
          <a
            href="tel:+123456789"
            className="flex items-center gap-2 px-5 py-2 bg-emerald-deep text-white rounded-full hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-900/40"
          >
            <Phone size={16} />
            <span className="text-sm font-medium">Book Now</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium hover:text-gold-premium"
            >
              {link.title}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="text-xl font-medium text-gold-premium"
          >
            Admin Dashboard
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
