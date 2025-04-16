
import React from 'react';
import { Helmet } from 'react-helmet';

const SEOStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Refurbish Totaal Nederland",
    "url": "https://www.refurbishtotaal.nl",
    "logo": "https://www.refurbishtotaal.nl/logo.png",
    "image": "https://lovable.dev/opengraph-image-p98pqg.png",
    "description": "Refurbish Totaal Nederland is uw betrouwbare partner voor professionele verbouwing en renovatie. Schilderwerk, dakrenovatie, stucwerk en meer.",
    "telephone": "+31854444255",
    "email": "info@refurbishtotaalnederland.nl",
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
    "priceRange": "€€",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Renovatie en Verbouwdiensten",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Schilderwerk",
          "description": "Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat."
        },
        {
          "@type": "Offer",
          "name": "Dakrenovatie",
          "description": "Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak."
        },
        {
          "@type": "Offer",
          "name": "Stucadoren",
          "description": "Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief."
        },
        {
          "@type": "Offer",
          "name": "Installatietechniek",
          "description": "Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten."
        },
        {
          "@type": "Offer",
          "name": "Aan- en verbouw",
          "description": "Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning."
        },
        {
          "@type": "Offer",
          "name": "PVC Vloeren",
          "description": "Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren."
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOStructuredData;
