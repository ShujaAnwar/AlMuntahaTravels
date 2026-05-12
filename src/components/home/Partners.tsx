import { motion } from 'motion/react';

const partners = [
  { name: 'Saudi Airlines', logo: 'https://seeklogo.com/images/S/saudi-arabian-airlines-logo-B3A9B3E5B5-seeklogo.com.png' },
  { name: 'Hilton Makkah', logo: 'https://seeklogo.com/images/H/hilton-logo-9ED7FFB45B-seeklogo.com.png' },
  { name: 'Fairmont Hotels', logo: 'https://seeklogo.com/images/F/fairmont-hotels-and-resorts-logo-0EF5A9A7A6-seeklogo.com.png' },
  { name: 'Qatar Airways', logo: 'https://seeklogo.com/images/Q/qatar-airways-logo-4A1B0B2E2E-seeklogo.com.png' },
  { name: 'InterContinental', logo: 'https://seeklogo.com/images/I/intercontinental-logo-F9A9E9F9F9-seeklogo.com.png' },
  { name: 'Emirates', logo: 'https://seeklogo.com/images/E/emirates-logo-5E5A5A5A5A-seeklogo.com.png' },
];

export default function Partners() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-gold-premium tracking-[0.3em] font-medium uppercase text-xs mb-4 block">Our Collaborations</span>
        <h2 className="text-3xl font-serif font-bold text-main mb-4">Trusted Partnerships</h2>
        <div className="w-20 h-1 bg-gold-premium mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center transition-all duration-700">
        {partners.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="w-32 h-16 relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
          >
            {/* Using text fallback as Logos from external URLs might be brittle, but adding image anyway */}
             <div className="text-main font-serif font-bold text-[10px] text-center border theme-border px-4 py-2 rounded-lg theme-bg-alt w-full">
               {partner.name}
             </div>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-muted text-xs mt-12 max-w-lg mx-auto leading-relaxed">
        Collaborating with premium hospitality and aviation groups to ensure every step of your journey is managed with international standards.
      </p>
    </div>
  );
}
