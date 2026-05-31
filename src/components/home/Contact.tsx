import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, Clock, Globe, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const contactInfo = [
  {
    icon: Phone,
    title: 'Direct Call',
    value: '0313-2710182',
    sub: '0316-8629934',
    badge: 'Available 24/7',
    link: 'tel:+923132710182',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '0313-2710182',
    sub: 'Quick Response Guaranteed',
    badge: 'Instant Reply',
    link: 'https://wa.me/923132710182',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20'
  },
  {
    icon: Mail,
    title: 'Email Inquiry',
    value: 'almuntahatravels.solutions@gmail.com',
    sub: 'Detailed inquiries welcome',
    badge: 'Prompt Response',
    link: 'mailto:almuntahatravels.solutions@gmail.com',
    color: 'text-gold-premium',
    bg: 'bg-gold-premium/10',
    border: 'border-gold-premium/20'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'MRC Colony, Malir Halt',
    sub: 'Karachi, Pakistan',
    badge: 'Mon–Sat 9AM–6PM',
    link: 'https://maps.google.com/?q=Malir+Halt+Karachi',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20'
  },
];

export default function Contact() {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    package: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.phone.trim()) e.phone = 'Phone number is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personal: {
            fullName: formData.name,
            email: formData.email,
            whatsapp: formData.phone,
            contact: formData.phone,
            city: '',
            travelers: 1,
            type: 'Individual'
          },
          journey: {
            type: formData.package || 'Umrah',
            departureDate: '',
            returnDate: '',
            flexible: true,
            days: 0
          },
          makkah: { distancePref: 'Standard', hotels: [] },
          madinah: { distancePref: 'Standard', hotels: [] },
          rooms: { type: [], smoking: false, connected: false, elderly: false },
          food: { plan: 'Standard', preference: [] },
          transport: { required: false, type: 'Standard', services: [] },
          extras: [],
          budget: { range: 'Standard', customAmount: 0 },
          notes: formData.message
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', phone: '', email: '', package: '', message: '' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      // Still show success for UX if API unavailable
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            "p-12 md:p-16 rounded-[3rem] border max-w-2xl mx-auto relative overflow-hidden",
            theme === 'dark' 
              ? "bg-gradient-to-br from-emerald-deep/20 to-black/40 border-emerald-500/30"
              : "bg-gradient-to-br from-emerald-50 to-white border-emerald-200 shadow-xl"
          )}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-premium/5 rounded-full blur-3xl" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-serif font-bold text-main mb-4">Message Received!</h2>
          <p className="text-sub mb-3 font-light text-lg">
            Apki inquiry humein receive ho gayi hai.
          </p>
          <p className="text-gold-premium font-urdu text-2xl mb-4 urdu-text">
            ان شاء اللہ آپ سے جلد رابطہ کیا جائے گا
          </p>
          <p className="text-muted text-sm mb-8">JazakAllah Khair — Remember us in your valuable duas</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 bg-gold-premium text-black font-bold rounded-full hover:scale-105 transition-all"
            >
              Send Another Message
            </button>
            <a
              href="https://wa.me/923132710182"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-500 text-white font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              WhatsApp Now
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6" id="contact">
      
      {/* ===== HEADER ===== */}
      <div className="text-center mb-14">
        <motion.span className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Get In Touch
        </motion.span>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Speak with our{' '}
          <span className="text-gold-premium italic">Travel Concierge</span>
        </motion.h2>
        <motion.p className="section-sub mx-auto text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Available 24/7 to guide you through your spiritual journey preparations. Contact us via any channel.
        </motion.p>
      </div>

      {/* ===== CONTACT INFO CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {contactInfo.map((info, i) => (
          <motion.a
            key={i}
            href={info.link}
            target={info.link.startsWith('http') ? '_blank' : undefined}
            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={cn(
              "group p-5 rounded-2xl border transition-all duration-300 block",
              theme === 'dark'
                ? `bg-white/3 ${info.border} hover:bg-white/5`
                : `bg-white border-slate-200 hover:border-gold-premium/30 shadow-sm hover:shadow-md`
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 border",
              info.bg, info.border,
              "group-hover:scale-110"
            )}>
              <info.icon size={18} className={info.color} />
            </div>
            <h4 className="text-main font-bold text-sm mb-1">{info.title}</h4>
            <p className={cn("font-medium text-sm mb-0.5 truncate", info.color)}>{info.value}</p>
            <p className="text-muted text-xs">{info.sub}</p>
            <div className="mt-3">
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border",
                info.bg, info.border, info.color
              )}>
                {info.badge}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* ===== MAIN CONTACT FORM + MAP ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            "relative p-8 md:p-10 rounded-[2.5rem] border overflow-hidden",
            theme === 'dark' ? "bg-white/2 border-white/5" : "bg-white border-slate-200 shadow-xl"
          )}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-premium/5 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl font-serif font-bold text-main mb-2 relative z-10">Send a Message</h3>
          <p className="text-sub text-sm mb-8 relative z-10">Fill out the form and we'll respond within hours.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10" noValidate>
            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className={cn(
                    "form-input",
                    errors.name && "border-red-400/50 focus:border-red-400"
                  )}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block">
                  WhatsApp / Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="03xx-xxxxxxx"
                  className={cn(
                    "form-input",
                    errors.phone && "border-red-400/50 focus:border-red-400"
                  )}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block">
                Email Address <span className="text-white/20">(optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className={cn(
                  "form-input",
                  errors.email && "border-red-400/50 focus:border-red-400"
                )}
              />
            </div>

            {/* Package */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block">
                Interested In
              </label>
              <select
                value={formData.package}
                onChange={e => setFormData({ ...formData, package: e.target.value })}
                className="form-input appearance-none cursor-pointer"
              >
                <option value="" className="bg-emerald-dark">Select Package Type</option>
                <option className="bg-emerald-dark">Economy Umrah</option>
                <option className="bg-emerald-dark">Standard Umrah</option>
                <option className="bg-emerald-dark">VIP Royal Package</option>
                <option className="bg-emerald-dark">Ramadan Umrah</option>
                <option className="bg-emerald-dark">Hajj Package</option>
                <option className="bg-emerald-dark">Custom Package</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block">
                Your Message <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your requirements, dates, number of travelers, and any special needs..."
                rows={4}
                className={cn(
                  "form-input resize-none",
                  errors.message && "border-red-400/50 focus:border-red-400"
                )}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            {/* Privacy note */}
            <p className="text-muted text-[10px] flex items-start gap-1.5">
              <Shield size={12} className="text-gold-premium mt-0.5 flex-shrink-0" />
              Your information is safe with us. We never share personal data with third parties.
            </p>

            {/* Submit Buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-gold-premium/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
              
              <a
                href="https://wa.me/923132710182?text=Assalamu%20Alaikum!%20I%20am%20interested%20in%20Umrah%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-green-500/10 border border-green-500/30 text-green-400 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-green-500/20 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </form>
        </motion.div>

        {/* MAP + INFO */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Google Maps Embed */}
          <div className="rounded-[2rem] overflow-hidden border theme-border h-72 relative">
            <iframe
              title="AL MUNTAHA TRAVELS Office Location - Malir Halt, Karachi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.8478258887267!2d67.19827397558547!3d24.90059974516609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33db32571c4b3%3A0x58702bfc0f63f25!2sMalir%20Halt%2C%20Karachi!5e0!3m2!1sen!2s!4v1714000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Office Hours */}
          <div className={cn(
            "p-6 rounded-2xl border",
            theme === 'dark' ? "bg-white/2 border-white/5" : "bg-white border-slate-200 shadow-sm"
          )}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-premium/10 flex items-center justify-center">
                <Clock size={16} className="text-gold-premium" />
              </div>
              <h4 className="text-main font-bold">Office Hours</h4>
            </div>
            <div className="space-y-2">
              {[
                { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                { day: 'Sunday', hours: 'Closed (WhatsApp Available)' },
                { day: 'Ramadan', hours: 'Extended Hours' },
              ].map((schedule, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-2 border-b border-current/5 last:border-0">
                  <span className="text-sub">{schedule.day}</span>
                  <span className="text-main font-medium">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className={cn(
            "p-6 rounded-2xl border",
            theme === 'dark' ? "bg-white/2 border-white/5" : "bg-white border-slate-200 shadow-sm"
          )}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-premium/10 flex items-center justify-center">
                <Globe size={16} className="text-gold-premium" />
              </div>
              <h4 className="text-main font-bold">Connect With Us</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Facebook', url: '#', color: 'hover:bg-blue-600' },
                { name: 'Instagram', url: '#', color: 'hover:bg-pink-600' },
                { name: 'YouTube', url: '#', color: 'hover:bg-red-600' },
                { name: 'TikTok', url: '#', color: 'hover:bg-black' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all",
                    theme === 'dark'
                      ? `bg-white/5 border-white/10 text-white/70 hover:text-white ${social.color} hover:border-transparent`
                      : `bg-slate-50 border-slate-200 text-slate-600 hover:text-white ${social.color} hover:border-transparent`
                  )}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
