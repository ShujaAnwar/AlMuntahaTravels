import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, User, Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
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
        scrolled 
          ? (theme === 'dark' ? 'bg-black/80 backdrop-blur-lg py-4' : 'bg-white/80 backdrop-blur-lg py-4 shadow-lg') 
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
             <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-3xl md:text-4xl font-serif font-bold tracking-[0.05em] uppercase leading-none transition-colors duration-500",
              theme === 'dark' ? "text-white" : "text-emerald-dark"
            )}>
              AL MUNTAHA
            </span>
            <span className="text-[10px] md:text-xs text-gold-premium tracking-[0.4em] font-sans font-bold uppercase mt-1">
              Travels and Tours
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className={cn(
                "text-sm font-medium uppercase tracking-widest transition-all relative group/link",
                theme === 'dark' ? "text-white/70 hover:text-gold-premium" : "text-emerald-dark/70 hover:text-gold-premium"
              )}
            >
              {link.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-premium transition-all group-hover/link:w-full" />
            </Link>
          ))}
          
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              theme === 'dark' ? "text-gold-premium hover:bg-white/10" : "text-emerald-deep hover:bg-emerald-deep/10"
            )}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/admin"
            className={cn(
              "p-2 rounded-full transition-all",
              theme === 'dark' ? "hover:bg-white/10" : "hover:bg-emerald-deep/10"
            )}
          >
            <User size={20} className="text-gold-premium" />
          </Link>
          <a
            href="tel:0313-2710182"
            className="flex items-center gap-2 px-5 py-2 bg-gold-premium text-black rounded-full hover:scale-105 transition-all shadow-lg font-bold"
          >
            <Phone size={16} />
            <span className="text-sm font-medium">Book Now</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-xl transition-colors",
              theme === 'dark' ? "text-gold-premium hover:bg-white/10" : "text-emerald-deep hover:bg-emerald-deep/10"
            )}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={cn(
              "p-2 rounded-xl transition-colors",
              theme === 'dark' ? "text-white" : "text-emerald-dark"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "md:hidden absolute top-full left-0 w-full backdrop-blur-2xl border-t shadow-2xl transition-colors duration-300",
              theme === 'dark' ? "bg-black/95 border-white/5" : "bg-white/95 border-emerald-dark/5"
            )}
          >
            <div className="px-8 py-12 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-serif font-bold transition-colors",
                      theme === 'dark' ? "text-white/80 hover:text-gold-premium" : "text-emerald-dark/80 hover:text-gold-premium"
                    )}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className={cn(
                  "pt-8 border-t flex flex-col gap-6",
                  theme === 'dark' ? "border-white/5" : "border-emerald-dark/5 shadow-inner"
                )}
              >
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-gold-premium font-bold uppercase tracking-widest text-xs"
                >
                  <User size={18} />
                  Admin Control Panel
                </Link>
                <a
                  href="tel:+966501234567"
                  className="w-full py-4 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg"
                >
                  <Phone size={18} />
                  Contact Support
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
