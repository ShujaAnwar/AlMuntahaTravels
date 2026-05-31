import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, ArrowRight, Heart, Star } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const quickLinks = [
  { label: 'All Umrah Packages', href: '/umrah-packages' },
  { label: 'Economy Umrah', href: '/economy-umrah' },
  { label: 'VIP Royal Umrah', href: '/vip-umrah' },
  { label: 'Ramadan Groups', href: '/ramadan-umrah' },
  { label: 'Saudi Visa Services', href: '/visa-services' },
  { label: 'Custom Package Builder', href: '/builder' },
];

const companyLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Blog & Guides', href: '/#blog' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Agent Portal', href: '/portal' },
];

const socialLinks = [
  { Icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { Icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { Icon: Twitter, href: '#', label: 'Twitter / X', color: 'hover:bg-sky-500' },
  { Icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
];

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={cn(
      "border-t theme-border transition-colors duration-300",
      theme === 'dark' ? "bg-[#030d07]" : "bg-slate-900 text-white"
    )}>
      {/* ===== NEWSLETTER/CTA BAR ===== */}
      <div className={cn(
        "border-b",
        theme === 'dark' ? "border-white/5 bg-emerald-deep/10" : "border-white/10 bg-emerald-deep"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className={cn(
                "text-xl md:text-2xl font-serif font-bold mb-1",
                theme === 'dark' ? "text-main" : "text-white"
              )}>
                Start Your Sacred Journey Today
              </h3>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? "text-sub" : "text-white/70"
              )}>
                Get a free consultation from our Umrah experts
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/923132710182?text=Assalamu%20Alaikum!%20I%20want%20to%20book%20Umrah."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:scale-105 transition-all text-sm shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Consultation
              </a>
              <Link
                to="/builder"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gold-premium text-black font-bold rounded-full hover:scale-105 transition-all text-sm shadow-lg"
              >
                Build My Package <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN FOOTER ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-6 group">
              <div className="w-14 h-14 bg-gold-premium rounded-2xl flex items-center justify-center text-black font-urdu text-3xl shadow-lg shadow-gold-premium/20 group-hover:scale-110 transition-transform">
                م
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-white tracking-wider uppercase leading-none">
                  AL MUNTAHA
                </div>
                <div className="text-[9px] text-gold-premium tracking-[0.4em] font-bold uppercase mt-1">
                  TRAVELS SOLUTIONS
                </div>
              </div>
            </Link>
            
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Pakistan's trusted Umrah & Islamic travel company. 12+ years of serving the Ummah with premium services, barakah, and care.
            </p>
            
            {/* Islamic quote */}
            <div className="p-4 rounded-2xl border border-gold-premium/20 bg-gold-premium/5 mb-6">
              <p className="text-gold-premium font-urdu text-lg urdu-text mb-1">
                وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ
              </p>
              <p className="text-white/40 text-xs">
                "And Hajj to the House is a duty that mankind owes to Allah" — Quran 3:97
              </p>
            </div>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className={cn(
                    "w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-transparent transition-all",
                    color
                  )}
                >
                  <Icon size={15} className="text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Packages */}
          <div>
            <h4 className="text-gold-premium font-bold uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
              <div className="w-4 h-0.5 bg-gold-premium" />
              Explore Packages
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-white/50 text-sm hover:text-gold-premium transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-gold-premium font-bold uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
              <div className="w-4 h-0.5 bg-gold-premium" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-white/50 text-sm hover:text-gold-premium transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-gold-premium font-bold uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
              <div className="w-4 h-0.5 bg-gold-premium" />
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+923132710182" className="flex items-start gap-3 group">
                  <Phone size={15} className="text-gold-premium mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/70 text-sm group-hover:text-white transition-colors">0313-2710182</p>
                    <p className="text-white/40 text-xs">0316-8629934</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:almuntahatravels.solutions@gmail.com" className="flex items-start gap-3 group">
                  <Mail size={15} className="text-gold-premium mt-0.5 flex-shrink-0" />
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors break-all">
                    almuntahatravels.solutions@gmail.com
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Malir+Halt+Karachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin size={15} className="text-gold-premium mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/70 text-sm group-hover:text-white transition-colors">MRC Colony, Malir Halt</p>
                    <p className="text-white/40 text-xs">Karachi, Pakistan</p>
                  </div>
                </a>
              </li>
            </ul>

            {/* Ratings */}
            <div className="mt-6 flex items-center gap-2 p-3 rounded-xl border border-gold-premium/20 bg-gold-premium/5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-gold-premium text-gold-premium" />)}
              </div>
              <span className="text-white/60 text-xs">4.9/5 — 850+ Reviews</span>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center md:text-left">
            © {year} AL MUNTAHA TRAVELS SOLUTIONS. All rights reserved. 
            <span className="text-white/20"> | Licensed Travel Agency — Pakistan Tourism Development Corporation</span>
          </p>
          <div className="flex items-center gap-1 text-white/30 text-xs">
            <span>Made with</span>
            <Heart size={10} className="text-red-400 fill-red-400 mx-1" />
            <span>for the Ummah</span>
          </div>
          <div className="flex gap-4 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
