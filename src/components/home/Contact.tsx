import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: 'Select Experience',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personal: {
            fullName: formData.name,
            email: formData.email,
            whatsapp: '',
            contact: '',
            city: '',
            travelers: 1,
            type: 'Individual'
          },
          journey: {
            type: formData.package,
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
        setFormData({ name: '', email: '', package: 'Select Experience', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-dark p-12 rounded-[3.5rem] border border-emerald-500/30 max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-main mb-4">Message Received!</h2>
          <p className="text-sub mb-8 font-light italic">
            Thank you for reaching out. Our pilgrimage experts will contact you shortly about your journey.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="px-8 py-3 bg-gold-premium text-black font-bold rounded-xl hover:scale-105 transition-all"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-premium tracking-[0.3em] font-medium uppercase text-xs mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-main mb-8">
            Speak with our <br />
            <span className="text-gold-premium italic">Travel Concierge</span>
          </h2>
          <p className="text-sub mb-12 max-w-md leading-relaxed font-light">
            Have questions about timings, visas, or custom requirements? Our team is available 24/7 to guide you through your spiritual preparations.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:bg-gold-premium group-hover:text-black transition-all">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-main font-bold mb-1">Direct Call</h4>
                <p className="text-sub text-sm mb-1">0313-2710182 | 0316-8629934</p>
                <p className="text-gold-premium text-xs uppercase font-bold tracking-widest">Available 24/7</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:bg-gold-premium group-hover:text-black transition-all">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-main font-bold mb-1">Email Inquiry</h4>
                <p className="text-sub text-sm mb-1">almuntahatravels.solutions@gmail.com</p>
                <p className="text-gold-premium text-xs uppercase font-bold tracking-widest">Prompt Response</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:bg-gold-premium group-hover:text-black transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-main font-bold mb-1">Visit Office</h4>
                <p className="text-sub text-sm">MRC Colony, Malir Halt, Karachi</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Futuristic Form */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="glass-dark p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-deep/20 blur-[100px] -z-10" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted font-bold ml-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-current opacity-60 dark:opacity-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-gold-premium outline-none transition-all placeholder:text-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted font-bold ml-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-current opacity-60 dark:opacity-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-gold-premium outline-none transition-all placeholder:text-muted"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted font-bold ml-2">Interested In</label>
              <select 
                value={formData.package}
                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                className="w-full bg-black/5 dark:bg-white/5 border border-current opacity-60 dark:opacity-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-gold-premium outline-none transition-all appearance-none cursor-pointer text-main"
              >
                <option disabled value="Select Experience" className="theme-bg">Select Experience</option>
                <option className="theme-bg">Economy Umrah</option>
                <option className="theme-bg">Standard Umrah</option>
                <option className="theme-bg">VIP Royal Package</option>
                <option className="theme-bg">Custom Tour</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted font-bold ml-2">Your Message</label>
              <textarea 
                placeholder="How can we help make your journey special?" 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/5 dark:bg-white/5 border border-current opacity-60 dark:opacity-100 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-gold-premium outline-none transition-all placeholder:text-muted h-32 resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send size={18} />}
            </button>
            
            <a 
              href="https://wa.me/923132710182" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 glass border border-green-500/30 text-green-500 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-green-500/10 transition-all"
            >
              Direct WhatsApp 
              <MessageCircle size={18} />
            </a>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

