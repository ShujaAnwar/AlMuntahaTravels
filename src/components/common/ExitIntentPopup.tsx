import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Send, Heart, Star, Sparkles } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personal: { fullName: 'Exit Intent User', whatsapp: phone, contact: phone, email: '', city: '', travelers: 1, type: 'Individual' },
          journey: { type: 'Umrah', departureDate: '', returnDate: '', flexible: true, days: 15 },
          notes: 'Captured via Exit Intent Popup'
        })
      });
      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glass-dark border border-white/5 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)]"
          >
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Visual Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-deep via-gold-premium to-emerald-deep" />
            
            <div className="p-8 md:p-12 text-center">
              {!submitted ? (
                <>
                  <div className="w-20 h-20 bg-gold-premium/10 rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
                    <Gift className="text-gold-premium" size={40} />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gold-premium rounded-full flex items-center justify-center text-black"
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                    Wait! Don't Leave Your <span className="text-gold-premium italic">Barakah</span> Behind
                  </h2>
                  <p className="text-white/60 mb-10 text-lg leading-relaxed">
                    Get a special <span className="text-white font-bold">5% discount</span> and a free consultation for your next Umrah journey. 
                    Just leave your WhatsApp and we'll send it over!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                      <input 
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your WhatsApp Number (e.g., 0300...)"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white text-lg placeholder:text-white/20 outline-none focus:border-gold-premium/40 group-hover:bg-white/10 transition-all text-center"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all text-lg"
                    >
                      <Send size={24} />
                      Send My Discount Code
                    </button>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mt-6 flex items-center justify-center gap-2">
                      <Heart size={10} className="text-red-500" /> Trusted by 10,000+ Pilgrims
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12"
                >
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Star className="text-green-500" size={48} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">JazakAllah Khairan!</h3>
                  <p className="text-white/60 text-lg">
                    Check your WhatsApp. Our spiritual travel consultant will reach out with your discount code shortly.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
