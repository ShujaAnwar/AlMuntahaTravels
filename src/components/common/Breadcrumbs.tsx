import React from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex px-6 py-4 max-w-7xl mx-auto" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 md:space-x-4">
        <li>
          <div className="flex items-center">
            <Link to="/" className="text-muted hover:text-gold-premium transition-colors">
              <Home size={16} />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name}>
              <div className="flex items-center">
                <ChevronRight size={14} className="text-muted mx-1" />
                {isLast ? (
                  <span className="text-gold-premium font-bold capitalize tracking-wide text-xs md:text-sm">
                    {name.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-muted hover:text-gold-premium transition-colors capitalize text-xs md:text-sm"
                  >
                    {name.replace(/-/g, ' ')}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      
      {/* Structured Data for Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://almuntahatravels.com/"
            },
            ...pathnames.map((name, index) => ({
              "@type": "ListItem",
              "position": index + 2,
              "name": name.replace(/-/g, ' ').toUpperCase(),
              "item": `https://almuntahatravels.com/${pathnames.slice(0, index + 1).join('/')}`
            }))
          ]
        })}
      </script>
    </nav>
  );
}
