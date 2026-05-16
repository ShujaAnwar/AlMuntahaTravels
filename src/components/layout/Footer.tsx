import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="theme-bg-alt border-t theme-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-4 mb-6 group">
            <div className="w-16 h-16 bg-gold-premium rounded-xl flex items-center justify-center text-black font-urdu text-4xl">
              م
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-serif font-bold text-main tracking-widest uppercase leading-none text-center">AL MUNTAHA</span>
              <span className="text-[8px] md:text-[10px] text-gold-premium tracking-[0.4em] font-sans font-bold uppercase mt-1 text-center">TRAVELS SOLUTIONS</span>
            </div>
          </Link>
          <p className="text-sub text-sm leading-relaxed mb-6 font-light">
            Experience the spiritual heights of Makkah and Madinah with white-glove service. Our legacy is built on Barakah and Trust.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold-premium hover:text-black transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-gold-premium font-semibold mb-6 uppercase tracking-widest text-xs">Explore Packages</h4>
          <ul className="space-y-4 text-sub text-sm">
            <li><Link to="/umrah-packages" className="hover:text-gold-premium transition-colors">All Umrah Packages</Link></li>
            <li><Link to="/economy-umrah" className="hover:text-gold-premium transition-colors">Economy Umrah</Link></li>
            <li><Link to="/vip-umrah" className="hover:text-gold-premium transition-colors">VIP Umrah</Link></li>
            <li><Link to="/ramadan-umrah" className="hover:text-gold-premium transition-colors">Ramadan Groups</Link></li>
            <li><Link to="/visa-services" className="hover:text-gold-premium transition-colors">Visa Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold-premium font-semibold mb-6 uppercase tracking-widest text-xs">Contact Info</h4>
          <ul className="space-y-4 text-sub text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold-premium mt-1 flex-shrink-0" />
              <span>MRC Colony, Malir Halt, Karachi</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold-premium flex-shrink-0" />
              <span>0313-2710182 | 0316-8629934</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold-premium flex-shrink-0" />
              <span>almuntahatravels.solutions@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center">
          <div className="text-right mb-4">
            <span className="text-xs text-gold-premium font-medium uppercase tracking-widest block mb-1 font-bold">Contact Official WhatsApp</span>
            <span className="text-xl font-bold tracking-[0.22em] text-main">0313-2710182</span>
          </div>
          <a 
            href="https://wa.me/923132710182"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-900/40 cursor-pointer animate-bounce group hover:scale-110 transition-transform"
          >
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.539 2.016 2.057-.528c.95.52 1.914.88 3.227.88 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767m4.665 8.163c-.15.424-.766.772-1.077.817-.312.045-.694.075-2.096-.475-1.55-.61-2.523-2.149-2.598-2.249-.075-.1-.611-.812-.611-1.549 0-.737.387-1.101.524-1.25.137-.15.3-.187.399-.187.1 0 .2 0 .287.004.087.004.205-.034.321.246.12.287.412 1.002.449 1.076.037.075.062.162.012.262s-.075.162-.15.25c-.075.087-.157.195-.225.262-.075.075-.153.157-.066.307.087.15.388.641.834 1.036.574.51 1.058.669 1.208.744.15.075.237.062.325-.037.087-.1.375-.436.475-.586.1-.15.2-.125.337-.075.137.05.873.412 1.023.487.15.075.25.112.287.175.037.062.037.362-.113.787"/></svg>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between gap-12 border-t theme-border pt-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted whitespace-nowrap">Global Partners</span>
        <div className="flex gap-12 items-center opacity-40 overflow-hidden">
          {["Hilton", "Mövenpick", "Saudia", "Marriott", "Hyatt"].map((partner) => (
            <span key={partner} className="font-serif italic text-lg text-main">{partner}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t theme-border flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted text-xs italic font-serif">
          "And proclaim to the people the Hajj [pilgrimage]; they will come to you on foot and on every lean camel..."
        </p>
        <p className="text-muted text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} AL MUNTAHA TRAVELS SOLUTIONS. Finalized with Excellence.
        </p>
      </div>
    </footer>
  );
}
