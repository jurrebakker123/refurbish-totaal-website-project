
import React from 'react';
import { Helmet } from 'react-helmet';

// List of target locations
const targetLocations = [
  "Eindhoven", "Rotterdam", "Breda", "Amsterdam", 
  "Lelystad", "Zwolle", "Doetinchem", "Venray"
];

const SEOStructuredData: React.FC = () => {
  // Generate service areas that include all target locations
  const serviceAreas = targetLocations.map(location => ({
    "@type": "City",
    "name": location
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Refurbish Totaal Nederland",
    "url": "https://www.refurbishtotaalnederland.nl",
    "logo": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "image": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "description": "Refurbish Totaal Nederland is uw betrouwbare partner voor professionele verbouwing en renovatie. Schilderwerk, dakrenovatie, stucwerk en meer in heel Nederland, inclusief Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray.",
    "telephone": "+31854444255",
    "email": "info@refurbishtotaalnederland.nl",
    "areaServed": serviceAreas,
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
    "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
    "sameAs": [
      "https://www.facebook.com/refurbishtotaal",
      "https://www.instagram.com/refurbishtotaal"
    ],
    "keywords": "dakrenovatie, schilderwerk, stukadoren, installatietechniek, aan- en verbouw, behangen, pvc vloeren, renovatie, verbouwing, Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem, Venray",
    "priceRange": "€€",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Renovatie en Verbouwdiensten",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Schilderwerk",
          "description": "Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat in heel Nederland, inclusief Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray."
        },
        {
          "@type": "Offer",
          "name": "Dakrenovatie",
          "description": "Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak. Werkzaam in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray."
        },
        {
          "@type": "Offer",
          "name": "Stukadoren",
          "description": "Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief. Werkzaam in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray."
        },
        {
          "@type": "Offer",
          "name": "Installatietechniek",
          "description": "Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray."
        },
        {
          "@type": "Offer",
          "name": "Aan- en verbouw",
          "description": "Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray."
        },
        {
          "@type": "Offer",
          "name": "Behangen",
          "description": "Professioneel behangwerk met oog voor detail en een perfect eindresultaat in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray."
        },
        {
          "@type": "Offer",
          "name": "PVC Vloeren",
          "description": "Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray."
        }
      ]
    }
  };

  // Create location-specific service pages for each location and service combination
  const locationServicePages = [];
  const services = ["Dakrenovatie", "Schilderwerk", "Stukadoren", "Installatietechniek", "Aan- en verbouw", "Behangen", "PVC Vloeren"];
  
  targetLocations.forEach(location => {
    services.forEach(service => {
      locationServicePages.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": `https://www.refurbishtotaalnederland.nl/diensten/${service.toLowerCase().replace(/\s+/g, '-')}/${location.toLowerCase()}`,
        "name": `${service} ${location} | Refurbish Totaal Nederland`,
        "description": `Professionele ${service.toLowerCase()} in ${location} en omgeving. Refurbish Totaal Nederland biedt vakkundige ${service.toLowerCase()} diensten voor particuliere en zakelijke klanten.`,
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://www.refurbishtotaalnederland.nl",
          "name": "Refurbish Totaal Nederland"
        }
      });
    });
  });

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {locationServicePages.map((page, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(page)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOStructuredData;
