
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  imageUrl?: string;
  city?: string;
  service?: string;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  imageUrl,
  city,
  service
}) => {
  // Default SEO values
  const defaultTitle = "Refurbish Totaal Nederland | Professionele Renovatie & Verbouw";
  const defaultDescription = "Refurbish Totaal Nederland is uw betrouwbare partner voor professionele verbouwing en renovatie. Schilderwerk, dakrenovatie, stucwerk en meer in heel Nederland inclusief Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray.";
  const baseKeywords = ["renovatie", "verbouwing", "schilderwerk", "dakrenovatie", "stucwerk", "installatietechniek", "aan- en verbouw", "pvc vloeren", "renovatiebedrijf Nederland"];
  
  // Create city-specific content
  const citySpecificTitle = city && service 
    ? `${service} ${city} | Refurbish Totaal Nederland`
    : title || defaultTitle;
    
  const citySpecificDescription = city && service
    ? `Professionele ${service.toLowerCase()} in ${city} en omgeving. Refurbish Totaal Nederland levert vakkundige ${service.toLowerCase()} met meer dan 20 jaar ervaring. Gratis offerte en garantie op al het werk.`
    : description || defaultDescription;

  // Combine keywords
  const allKeywords = [
    ...baseKeywords,
    ...keywords,
    ...(city ? [city.toLowerCase(), `${service?.toLowerCase()} ${city.toLowerCase()}`] : []),
    "Eindhoven", "Rotterdam", "Breda", "Amsterdam", "Lelystad", "Zwolle", "Doetinchem", "Venray"
  ].filter(Boolean).join(", ");

  const finalCanonicalUrl = canonicalUrl || `https://www.refurbishtotaalnederland.nl${city && service ? `/diensten/${service.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase()}` : '/'}`;
  const finalImageUrl = imageUrl || "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png";

  // Generate hreflang tags for different cities
  const targetCities = ["eindhoven", "rotterdam", "breda", "amsterdam", "lelystad", "zwolle", "doetinchem", "venray"];
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{citySpecificTitle}</title>
      <meta name="description" content={citySpecificDescription} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={citySpecificTitle} />
      <meta property="og:description" content={citySpecificDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={finalImageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Refurbish Totaal Nederland" />
      <meta property="og:locale" content="nl_NL" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={citySpecificTitle} />
      <meta name="twitter:description" content={citySpecificDescription} />
      <meta name="twitter:image" content={finalImageUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="Refurbish Totaal Nederland" />
      <meta name="publisher" content="Refurbish Totaal Nederland" />
      <meta name="copyright" content="© 2024 Refurbish Totaal Nederland" />
      <meta name="language" content="Dutch" />
      <meta name="geo.region" content="NL" />
      <meta name="geo.placename" content="Nederland" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Preload critical resources */}
      <link rel="preload" href={finalImageUrl} as="image" />
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Hreflang for international SEO */}
      <link rel="alternate" href="https://www.refurbishtotaalnederland.nl/" hreflang="nl" />
      <link rel="alternate" href="https://www.refurbishtotaalnederland.nl/" hreflang="nl-nl" />
      
      {/* City-specific hreflang if applicable */}
      {city && service && targetCities.map(targetCity => (
        <link 
          key={targetCity}
          rel="alternate" 
          href={`https://www.refurbishtotaalnederland.nl/diensten/${service.toLowerCase().replace(/\s+/g, '-')}/${targetCity}`} 
          hreflang={`nl-${targetCity}`} 
        />
      ))}
      
      {/* JSON-LD for better rich snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": citySpecificTitle,
          "description": citySpecificDescription,
          "url": finalCanonicalUrl,
          "image": finalImageUrl,
          "publisher": {
            "@type": "Organization",
            "name": "Refurbish Totaal Nederland",
            "logo": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.refurbishtotaalnederland.nl/offerte",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOOptimizer;
