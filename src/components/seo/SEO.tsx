import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Al Muntaha Travels and Tours | Best Umrah Packages from Pakistan',
  description = 'Premium Umrah and Travel services from Karachi, Pakistan. Al Muntaha Travels and Tours provides comfort, care, and barakah for your spiritual journey including VIP Umrah, Economy Umrah, and Visa services.',
  canonical = 'https://almuntahatravels.com',
  ogType = 'website',
  ogImage = '/logo.png',
  keywords = 'Al Muntaha Travels, Umrah Packages Pakistan, Umrah Travel Agency Karachi, Best Umrah Services, Hajj and Umrah Packages, Travel and Tours Pakistan, Economy Umrah, VIP Umrah'
}) => {
  const fullTitle = title.includes('Al Muntaha') ? title : `${title} | Al Muntaha Travels and Tours`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Al Muntaha Travels and Tours" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Al Muntaha Travels and Tours",
          "alternateName": "Al Muntaha Travels",
          "url": "https://almuntahatravels.com",
          "logo": "https://almuntahatravels.com/logo.png",
          "image": "https://almuntahatravels.com/logo.png",
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "MRC Colony, Malir Halt",
            "addressLocality": "Karachi",
            "addressRegion": "Sindh",
            "postalCode": "75080",
            "addressCountry": "PK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "24.9012",
            "longitude": "67.1610"
          },
          "telephone": "0313-2710182",
          "email": "almuntahatravelsandtours@gmail.com",
          "priceRange": "$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "21:00"
          },
          "sameAs": [
            "https://www.facebook.com/almuntahatravels",
            "https://www.instagram.com/almuntahatravels"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
