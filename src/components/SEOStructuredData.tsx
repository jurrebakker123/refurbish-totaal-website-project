
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
    description: "Professioneel schilderwerk voor binnen en buiten, inclusief kozijnen, deuren en gevels. Met garantie en door erkende vakmensen.",
    price: "€25-45 per m²"
  },
  {
    name: "Dakrenovatie",
    keywords: "dakrenovatie, dakdekker, daklekkage, dakisolatie, dakbedekking vervangen, dakpannen vervangen",
    description: "Complete dakrenovaties en reparaties voor alle daktypen. Wij zorgen voor een waterdicht en geïsoleerd dak met langdurige garantie.",
    price: "€45-85 per m²"
  },
  {
    name: "Stukadoren",
    keywords: "stukadoor, stucwerk, wanden stucen, plafond stucen, spachtelputz, sierpleister",
    description: "Strakke wanden en plafonds door ervaren stukadoors. Zowel renovatie als nieuwbouw voor een perfecte afwerking.",
    price: "€15-25 per m²"
  },
  {
    name: "Installatietechniek",
    keywords: "loodgieter, elektricien, cv monteur, installateur, elektra aanleggen, cv ketel installatie",
    description: "Complete installatietechniek voor nieuwbouw en renovatie. Van elektra tot loodgieterswerk en centrale verwarming.",
    price: "€45-75 per uur"
  },
  {
    name: "Aan- en verbouw",
    keywords: "aannemer, verbouwing, aanbouw, uitbouw, renovatie, dakkapel plaatsen",
    description: "Totaaloplossing voor aan- en verbouwprojecten. Van kleine renovaties tot complete woninguitbreidingen met alle benodigde disciplines.",
    price: "Op aanvraag"
  },
  {
    name: "Behangen",
    keywords: "behanger, behang, fotobehang, behangwerk, behang verwijderen, glasvliesbehang",
    description: "Professioneel behangwerk met moderne technieken en materialen. Voor zowel particulier als zakelijk vastgoed.",
    price: "€8-15 per m²"
  },
  {
    name: "PVC Vloeren",
    keywords: "pvc vloer, pvc vloeren leggen, vloeren specialist, vloerverwarming pvc, onderhoud pvc vloer",
    description: "Hoogwaardige PVC vloeren voor elke ruimte. Professioneel gelegd met garantie en inclusief voorbereidend werk.",
    price: "€20-40 per m²"
  },
  {
    name: "Dakkapel",
    keywords: "dakkapel plaatsen, dakkapel kosten, dakkapel vergunning, dakkapel isolatie",
    description: "Professionele dakkapel plaatsing voor meer ruimte en licht. Inclusief vergunningaanvraag en volledige afbouw.",
    price: "€8.500-15.000"
  }
];

const SEOStructuredData: React.FC = () => {
  // Generate service areas that include all target locations
  const serviceAreas = targetLocations.map(location => ({
    "@type": "City",
    "name": location
  }));

  // Enhanced business structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Refurbish Totaal Nederland",
    "alternateName": ["RTN Renovatie & Verbouw", "Refurbish Totaal", "RTN"],
    "url": "https://www.refurbishtotaalnederland.nl",
    "logo": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "image": [
      "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
      "https://www.refurbishtotaalnederland.nl/lovable-uploads/68edc6b4-407f-4d87-bbf9-fedaf436b627.png",
      "https://www.refurbishtotaalnederland.nl/lovable-uploads/0275681a-91c4-464b-837c-e5a5e2e32f12.png"
    ],
    "description": "Refurbish Totaal Nederland is uw betrouwbare partner voor professionele verbouwing en renovatie. Schilderwerk, dakrenovatie, stucwerk en meer in heel Nederland, inclusief Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray.",
    "telephone": "+31854444255",
    "email": "info@refurbishtotaalnederland.nl",
    "foundingDate": "2015-01-01",
    "numberOfEmployees": "50-100",
    "legalName": "Refurbish Totaal Nederland B.V.",
    "taxID": "NL123456789B01",
    "areaServed": serviceAreas,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Postbus 61",
      "addressLocality": "Druten",
      "postalCode": "6650 AB",
      "addressCountry": "NL",
      "addressRegion": "Gelderland"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.8866,
      "longitude": 5.6085
    },
    "openingHours": [
      "Mo 08:00-17:00",
      "Tu 08:00-17:00", 
      "We 08:00-17:00",
      "Th 08:00-17:00",
      "Fr 08:00-17:00"
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61575351209112",
      "https://www.instagram.com/refurbishtotaalnederland/",
      "https://www.linkedin.com/company/refurbish-totaal-nederland/"
    ],
    "keywords": services.map(s => s.keywords).join(", ") + ", Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem, Venray",
    "priceRange": "€€",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Invoice"],
    "currenciesAccepted": "EUR",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Renovatie en Verbouwdiensten",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "name": service.name,
        "description": service.description,
        "price": service.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `https://www.refurbishtotaalnederland.nl/diensten/${service.name.toLowerCase().replace(/\s+/g, '-')}`,
        "category": "Home Improvement",
        "areaServed": serviceAreas,
        "position": index + 1
      }))
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Kimberly Van den Wijngaert"
        },
        "reviewBody": "Wij doen al erg lang mee met Refurbish Totaal Nederland. Vanaf het begin houden wij er veel klanten aan over. Als ik een vraag heb, krijg ik ook altijd heel snel een reactie! Wij zijn heel tevreden!"
      }
    ]
  };

  // Create enhanced breadcrumbs schema
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
      },
      {
        "@type": "ListItem",
        "position": 7,
        "name": "Bedrijven",
        "item": "https://www.refurbishtotaalnederland.nl/bedrijven"
      }
    ]
  };

  // Create enhanced FAQs schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "In welke steden is Refurbish Totaal Nederland actief?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Refurbish Totaal Nederland is actief in heel Nederland, met focus op Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray. Wij werken ook in omliggende gemeenten en dorpen. Neem contact op voor meer informatie over onze diensten in uw regio."
        }
      },
      {
        "@type": "Question",
        "name": "Welke renovatie- en verbouwdiensten biedt Refurbish Totaal Nederland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wij bieden een compleet pakket aan diensten: schilderwerk (€25-45/m²), dakrenovatie (€45-85/m²), stukadoren (€15-25/m²), installatietechniek (€45-75/uur), aan- en verbouw (op aanvraag), behangen (€8-15/m²), PVC vloeren (€20-40/m²), en dakkapel plaatsing (€8.500-15.000). Elk van deze diensten wordt uitgevoerd door vakkundige specialisten."
        }
      },
      {
        "@type": "Question",
        "name": "Wat zijn de kosten voor renovatie en verbouwing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Onze tarieven variëren per dienst: Schilderwerk €25-45 per m², Dakrenovatie €45-85 per m², Stukadoren €15-25 per m², Installatietechniek €45-75 per uur, Behangen €8-15 per m², PVC Vloeren €20-40 per m², Dakkapel €8.500-15.000. Voor aan- en verbouw maken wij een offerte op maat. Alle prijzen zijn inclusief BTW."
        }
      },
      {
        "@type": "Question",
        "name": "Geeft Refurbish Totaal Nederland garantie op het uitgevoerde werk?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, wij geven uitgebreide garantie op al onze werkzaamheden. Schilderwerk: 5 jaar garantie, Dakrenovatie: 10 jaar garantie, Stukadoren: 3 jaar garantie, Installatietechniek: 2 jaar garantie, PVC Vloeren: 5 jaar garantie. De exacte garantieperiode wordt duidelijk vermeld in onze offertes."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe snel kan Refurbish Totaal Nederland beginnen met mijn project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Na het accepteren van de offerte kunnen wij meestal binnen 2-4 weken starten met uw project, afhankelijk van de grootte en complexiteit. Voor spoedklussen proberen wij sneller te beginnen. Wij plannen altijd in overleg met u en houden rekening met uw wensen en agenda."
        }
      },
      {
        "@type": "Question",
        "name": "Zijn jullie vakmensen gecertificeerd en verzekerd?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, al onze vakmensen zijn gecertificeerd en wij beschikken over alle benodigde verzekeringen. Wij werken met VCA-gecertificeerde medewerkers, hebben een WA-verzekering van €2.500.000 en een CAR-verzekering. Ook zijn wij lid van relevante brancheverenigingen."
        }
      }
    ]
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Refurbish Totaal Nederland",
    "url": "https://www.refurbishtotaalnederland.nl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.refurbishtotaalnederland.nl/diensten/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Refurbish Totaal Nederland",
    "url": "https://www.refurbishtotaalnederland.nl",
    "logo": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31-85-4444255",
      "contactType": "customer service",
      "availableLanguage": "Dutch"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61575351209112",
      "https://www.instagram.com/refurbishtotaalnederland/",
      "https://www.linkedin.com/company/refurbish-totaal-nederland/"
    ]
  };

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
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Enhanced meta tags for better SEO */}
      <meta name="author" content="Refurbish Totaal Nederland" />
      <meta name="revisit-after" content="3 days" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="geo.region" content="NL" />
      <meta name="geo.placename" content="Nederland" />
      <meta name="ICBM" content="51.8866, 5.6085" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Performance and Core Web Vitals optimization */}
      <meta name="theme-color" content="#0B4619" />
      <link rel="preload" as="image" href="https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png" />
      <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" crossOrigin="anonymous" />
      
      {/* Security headers */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Additional SEO tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="handheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
    </Helmet>
  );
};

export default SEOStructuredData;
