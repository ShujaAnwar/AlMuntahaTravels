import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  noIndex?: boolean;
  structuredData?: object;
  breadcrumbs?: { name: string; url: string }[];
}

const SITE_URL = 'https://almuntahatravels.com';
const SITE_NAME = 'AL MUNTAHA TRAVELS';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80';

const defaultSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "AL MUNTAHA TRAVELS",
  "legalName": "AL MUNTAHA TRAVELS SOLUTIONS",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "description": "Pakistan's premier Umrah & Islamic travel agency. Premium Umrah packages, Hajj services, and Saudi visa processing from Karachi.",
  "foundingDate": "2012",
  "numberOfEmployees": "50+",
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
  "telephone": "+92-313-2710182",
  "email": "almuntahatravels.solutions@gmail.com",
  "priceRange": "$$-$$$$",
  "currenciesAccepted": "PKR, SAR, USD",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "16:00"
    }
  ],
  "areaServed": [
    { "@type": "Country", "name": "Pakistan" },
    { "@type": "City", "name": "Karachi" },
    { "@type": "City", "name": "Lahore" },
    { "@type": "City", "name": "Islamabad" }
  ],
  "serviceType": ["Umrah Packages", "Hajj Packages", "Saudi Visa Services", "Islamic Travel"],
  "sameAs": [
    "https://www.facebook.com/almuntahatravels",
    "https://www.instagram.com/almuntahatravels",
    "https://www.youtube.com/@almuntahatravels"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "850",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const SEO: React.FC<SEOProps> = ({
  title = `${SITE_NAME} | Best Umrah Packages from Pakistan 2026`,
  description = "Premium Umrah & Travel Services from Karachi, Pakistan. AL MUNTAHA TRAVELS offers Economy, Standard, VIP & Custom Umrah Packages with 5-star hotels, visa processing, and 24/7 support. Book your blessed journey today!",
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  keywords = 'AL MUNTAHA TRAVELS, Umrah Packages Pakistan 2026, Umrah Travel Agency Karachi, Best Umrah Services, Hajj Umrah Packages, Economy Umrah Karachi, VIP Umrah Pakistan, Ramadan Umrah 2026, Saudi Visa Pakistan, Umrah Package Price, Umrah Agent Karachi, بہترین عمرہ پیکیج',
  noIndex = false,
  structuredData,
  breadcrumbs,
}) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || SITE_URL;

  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": crumb.name,
      "item": `${SITE_URL}${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* ===== BASIC META ===== */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      
      {/* Author & Verification */}
      <meta name="author" content="AL MUNTAHA TRAVELS SOLUTIONS" />
      <meta name="copyright" content="AL MUNTAHA TRAVELS SOLUTIONS 2026" />
      <meta name="language" content="en, ur, ar" />
      <meta name="geo.region" content="PK-SD" />
      <meta name="geo.placename" content="Karachi, Pakistan" />
      <meta name="geo.position" content="24.9012;67.1610" />
      <meta name="ICBM" content="24.9012, 67.1610" />
      
      {/* Mobile & PWA */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#064E3B" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="AL MUNTAHA" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* ===== OPEN GRAPH ===== */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="AL MUNTAHA TRAVELS - Premium Umrah & Islamic Travel" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ur_PK" />
      
      {/* ===== TWITTER CARD ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@almuntahatravels" />
      <meta name="twitter:creator" content="@almuntahatravels" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="AL MUNTAHA TRAVELS - Premium Umrah Packages" />
      
      {/* ===== STRUCTURED DATA (Organization) ===== */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultSchema)}
      </script>
      
      {/* ===== BREADCRUMBS SCHEMA ===== */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* ===== LOCAL BUSINESS SCHEMA ===== */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "AL MUNTAHA TRAVELS",
          "image": DEFAULT_OG_IMAGE,
          "telephone": "+92-313-2710182",
          "email": "almuntahatravels.solutions@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "MRC Colony, Malir Halt",
            "addressLocality": "Karachi",
            "addressCountry": "PK"
          },
          "url": SITE_URL,
          "priceRange": "$$",
          "servesCuisine": "N/A",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "850"
          }
        })}
      </script>

      {/* ===== FAQ SCHEMA (for rich results) ===== */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is included in AL MUNTAHA TRAVELS Umrah packages?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our comprehensive Umrah packages include visa processing, return airfare from Pakistan, 3-5 star hotel accommodations in Makkah and Madinah, ground transportation, meals (on selected packages), and 24/7 on-ground assistance."
              }
            },
            {
              "@type": "Question",
              "name": "How much does Umrah cost from Pakistan in 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Umrah packages from Pakistan start from Rs. 325,000 for economy options up to Rs. 695,000+ for VIP 5-star packages. Prices vary based on hotel choice, distance from Haram, and included services."
              }
            },
            {
              "@type": "Question",
              "name": "How long does the Umrah visa process take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Umrah visa processing typically takes 3-7 working days after all required documents are submitted. We handle all documentation to ensure a smooth and timely approval."
              }
            },
            {
              "@type": "Question",
              "name": "Does AL MUNTAHA TRAVELS offer VIP Umrah packages?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer premium VIP Umrah packages with 5-star hotel stays at Fairmont Clock Tower, Pullman ZamZam, private GMC transport, personal guide, and exclusive Ziyarat tours."
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
