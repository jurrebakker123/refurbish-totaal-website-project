
import React from 'react';
import { Helmet } from 'react-helmet';

interface LocalBusinessSchemaProps {
  city?: string;
  service?: string;
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({ city, service }) => {
  const businessName = "Refurbish Totaal Nederland";
  const serviceAreas = [
    "Eindhoven", "Rotterdam", "Breda", "Amsterdam", 
    "Lelystad", "Zwolle", "Doetinchem", "Venray"
  ];
  
  // Generate schema data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName + (city ? ` ${city}` : ""),
    "image": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "logo": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "telephone": "+31854444255",
    "email": "info@refurbishtotaalnederland.nl",
    "url": `https://www.refurbishtotaalnederland.nl${city ? `/diensten/${service?.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase()}` : ''}`,
    "priceRange": "€€",
    "description": city && service 
      ? `Professionele ${service.toLowerCase()} diensten in ${city} en omgeving. Refurbish Totaal Nederland levert vakkundige ${service.toLowerCase()} met meer dan 20 jaar ervaring. Wij garanderen kwaliteit en klanttevredenheid op al onze projecten.`
      : "Refurbish Totaal Nederland is uw betrouwbare partner voor professionele verbouwing en renovatie. Schilderwerk, dakrenovatie, stucwerk en meer in heel Nederland inclusief Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Niersweg 27",
      "addressLocality": "Gennep",
      "postalCode": "6591 CT",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.6982938,
      "longitude": 5.9729919
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "areaServed": city ? {
      "@type": "City",
      "name": city
    } : serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceType": service || [
      "Schilderwerk", "Dakrenovatie", "Stukadoren", 
      "Installatietechniek", "Aan- en verbouw", "Behangen", "PVC Vloeren"
    ],
    "sameAs": [
      "https://www.facebook.com/refurbishtotaal",
      "https://www.instagram.com/refurbishtotaal"
    ],
    // Toegevoegde velden voor betere SEO
    "foundingDate": "2015-01-01",
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.9",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Klantreviews"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "87"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Renovatie en Verbouwdiensten",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Schilderwerk" + (city ? ` in ${city}` : ""),
            "url": `https://www.refurbishtotaalnederland.nl/diensten/schilderwerk${city ? `/${city.toLowerCase()}` : ""}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dakrenovatie" + (city ? ` in ${city}` : ""),
            "url": `https://www.refurbishtotaalnederland.nl/diensten/dakrenovatie${city ? `/${city.toLowerCase()}` : ""}`
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
