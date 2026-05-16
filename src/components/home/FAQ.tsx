import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is included in your Umrah packages?",
    answer: "Our comprehensive Umrah packages typically include visa processing, return airfare, premium hotel accommodations in Makkah and Madinah, ground transportation in private air-conditioned vehicles, and 24/7 on-ground assistance."
  },
  {
    question: "How long does the Umrah visa process take?",
    answer: "Generally, the Umrah visa processing takes between 3 to 7 working days once all required documents are submitted. We handle all documentation to ensure a smooth and timely approval."
  },
  {
    question: "Do you offer customized VIP Umrah packages?",
    answer: "Yes, we specialize in bespoke VIP Umrah experiences. These include stays at 5-star hotels like Raffles Makkah Palace or Fairmont Clock Tower, private VIP transport, and personalized guided tours (Ziyarats)."
  },
  {
    question: "What documents are required for Umrah from Pakistan?",
    answer: "The primary documents required are an original passport (valid for at least 6 months), original CNIC, white background photographs, and vaccination certificates as per the latest Saudi government regulations."
  },
  {
    question: "Can I perform Umrah on a tourist visa?",
    answer: "Yes, since the recent updates, tourists from many countries can perform Umrah on a valid tourist visa. We can guide you on the best visa option based on your nationality and requirements."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-gold-premium tracking-[0.3em] font-medium uppercase text-xs mb-4 block underline decoration-gold-premium/30 underline-offset-8">Information Hub</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-main mb-6">Frequently Asked Questions</h2>
        <p className="text-sub max-w-2xl mx-auto font-light">Find answers to common queries regarding Umrah visas, packages, and travel requirements from Pakistan.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="glass-dark rounded-3xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-gold-premium/30"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-lg font-serif font-bold text-main pr-8">{faq.question}</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gold-premium/20 flex items-center justify-center text-gold-premium bg-gold-premium/5">
                {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>
            
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-8 text-sub font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Structured Data for FAQ */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>
    </div>
  );
}
