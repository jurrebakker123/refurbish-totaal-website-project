
import React from 'react';
import { Helmet } from 'react-helmet';

// List of target locations
const targetLocations = [
  "Eindhoven", "Rotterdam", "Breda", "Amsterdam", 
  "Lelystad", "Zwolle", "Doetinchem", "Venray"
];

const services = [
  {
    name: "Schilderwerk",
    keywords: "schilder, schildersbedrijf, buitenschilderwerk, kozijnen schilderen, houtrot reparatie, binnenschilderwerk",
    description: "Professioneel schilderwerk voor binnen en buiten, inclusief kozijnen, deuren en gevels. Met garantie en door erkende vakmensen."
  },
  {
    name: "Dakrenovatie",
    keywords: "dakrenovatie, dakdekker, daklekkage, dakisolatie, dakbedekking vervangen, dakpannen vervangen",
    description: "Complete dakrenovaties en reparaties voor alle daktypen. Wij zorgen voor een waterdicht en geïsoleerd dak met langdurige garantie."
  },
  {
    name: "Stukadoren",
    keywords: "stukadoor, stucwerk, wanden stucen, plafond stucen, spachtelputz, sierpleister",
    description: "Strakke wanden en plafonds door ervaren stukadoors. Zowel renovatie als nieuwbouw voor een perfecte afwerking."
  },
  {
    name: "Installatietechniek",
    keywords: "loodgieter, elektricien, cv monteur, installateur, elektra aanleggen, cv ketel installatie",
    description: "Complete installatietechniek voor nieuwbouw en renovatie. Van elektra tot loodgieterswerk en centrale verwarming."
  },
  {
    name: "Aan- en verbouw",
    keywords: "aannemer, verbouwing, aanbouw, uitbouw, renovatie, dakkapel plaatsen",
    description: "Totaaloplossing voor aan- en verbouwprojecten. Van kleine renovaties tot complete woninguitbreidingen met alle benodigde disciplines."
  },
  {
    name: "Behangen",
    keywords: "behanger, behang, fotobehang, behangwerk, behang verwijderen, glasvliesbehang",
    description: "Professioneel behangwerk met moderne technieken en materialen. Voor zowel particulier als zakelijk vastgoed."
  },
  {
    name: "PVC Vloeren",
    keywords: "pvc vloer, pvc vloeren leggen, vloeren specialist, vloerverwarming pvc, onderhoud pvc vloer",
    description: "Hoogwaardige PVC vloeren voor elke ruimte. Professioneel gelegd met garantie en inclusief voorbereidend werk."
  }
];

const SEOStructuredData: React.FC = () => {
  // Generate service areas that include all target locations
  const serviceAreas = targetLocations.map(location => ({
    "@type": "City",
    "name": location
  }));

  // Business structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Refurbish Totaal Nederland",
    "alternateName": "RTN Renovatie & Verbouw",
    "url": "https://www.refurbishtotaalnederland.nl",
    "logo": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "image": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "description": "Refurbish Totaal Nederland is uw betrouwbare partner voor professionele verbouwing en renovatie. Schilderwerk, dakrenovatie, stucwerk en meer in heel Nederland, inclusief Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray.",
    "telephone": "+31854444255",
    "email": "info@refurbishtotaalnederland.nl",
    "foundingDate": "2015-01-01",
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
    "keywords": "dakrenovatie, schilderwerk, stukadoren, installatietechniek, aan- en verbouw, behangen, pvc vloeren, renovatie, verbouwing, Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem, Venray, dakdekker, schilder, stukadoor, loodgieter, elektricien, aannemer",
    "priceRange": "€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "87",
      "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Renovatie en Verbouwdiensten",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "name": service.name,
        "description": `Professionele ${service.name.toLowerCase()} in heel Nederland, inclusief Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray. ${service.description}`
      }))
    }
  };

  // Create breadcrumbs schema
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.refurbishtotaalnederland.nl"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Diensten",
        "item": "https://www.refurbishtotaalnederland.nl/diensten"
      },
      ...services.map((service, index) => ({
        "@type": "ListItem",
        "position": 3 + index,
        "name": service.name,
        "item": `https://www.refurbishtotaalnederland.nl/diensten/${service.name.toLowerCase().replace(/\s+/g, '-')}`
      }))
    ]
  };

  // Create FAQs schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "In welke steden is Refurbish Totaal Nederland actief?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Refurbish Totaal Nederland is actief in heel Nederland, met focus op Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray. Neem contact op voor meer informatie over onze diensten in uw regio."
        }
      },
      {
        "@type": "Question",
        "name": "Welke renovatie- en verbouwdiensten biedt Refurbish Totaal Nederland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wij bieden een compleet pakket aan diensten, waaronder schilderwerk, dakrenovatie, stukadoren, installatietechniek, aan- en verbouw, behangen en PVC vloeren. Elk van deze diensten wordt uitgevoerd door vakkundige specialisten."
        }
      },
      {
        "@type": "Question",
        "name": "Geeft Refurbish Totaal Nederland garantie op het uitgevoerde werk?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, wij geven garantie op al onze werkzaamheden. De exacte garantieperiode varieert per type werk en wordt duidelijk vermeld in onze offertes. Kwaliteit staat bij ons voorop."
        }
      },
      {
        "@type": "Question",
        "name": "Kan ik een vrijblijvende offerte aanvragen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absoluut! U kunt via onze website gemakkelijk een vrijblijvende offerte aanvragen of direct contact met ons opnemen via telefoon of e-mail. Wij reageren snel en komen graag langs voor een persoonlijk gesprek."
        }
      },
      {
        "@type": "Question",
        "name": "Wat zijn de kosten voor een renovatie of verbouwing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De kosten voor een renovatie of verbouwing zijn afhankelijk van verschillende factoren zoals de grootte van het project, gebruikte materialen en de complexiteit van het werk. We maken graag een persoonlijke offerte op maat voor uw specifieke situatie."
        }
      },
      {
        "@type": "Question",
        "name": "Werkt Refurbish Totaal Nederland met gecertificeerde vakmensen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, al onze werkzaamheden worden uitgevoerd door ervaren en gecertificeerde vakmensen. We werken met VCA, ISO 9001 en relevante branchecertificeringen om de hoogste kwaliteit te waarborgen."
        }
      }
    ]
  };

  // Create site navigation schema
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.refurbishtotaalnederland.nl/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Diensten",
        "item": "https://www.refurbishtotaalnederland.nl/diensten"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Over Ons",
        "item": "https://www.refurbishtotaalnederland.nl/over-ons"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Projecten",
        "item": "https://www.refurbishtotaalnederland.nl/projecten"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Offerte",
        "item": "https://www.refurbishtotaalnederland.nl/offerte"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Contact",
        "item": "https://www.refurbishtotaalnederland.nl/contact"
      }
    ]
  };

  // Create city-specific service pages schema
  const cityServiceSchemas = [];
  
  targetLocations.forEach(location => {
    services.forEach(service => {
      const serviceSlug = service.name.toLowerCase().replace(/\s+/g, '-');
      
      cityServiceSchemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${service.name} ${location}`,
        "url": `https://www.refurbishtotaalnederland.nl/diensten/${serviceSlug}/${location.toLowerCase()}`,
        "description": `Professionele ${service.name.toLowerCase()} diensten in ${location} en omgeving. Met meer dan 20 jaar ervaring bieden wij vakkundige oplossingen voor particuliere en zakelijke klanten.`,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Refurbish Totaal Nederland",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Niersweg 27",
            "addressLocality": "Gennep",
            "postalCode": "6591 CT",
            "addressCountry": "NL"
          }
        },
        "areaServed": {
          "@type": "City",
          "name": location
        },
        "serviceType": service.name
      });
    });
  });

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbsSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(siteNavigationSchema)}
      </script>
      {cityServiceSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      <meta name="author" content="Refurbish Totaal Nederland" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="geo.region" content="NL" />
    </Helmet>
  );
};

export default SEOStructuredData;
