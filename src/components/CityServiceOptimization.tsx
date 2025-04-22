
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

interface CityServiceOptimizationProps {
  service: string;
  serviceDescription: string;
  keywords?: string[];
}

const targetCities = [
  'Eindhoven', 'Rotterdam', 'Breda', 'Amsterdam', 
  'Lelystad', 'Zwolle', 'Doetinchem', 'Venray'
];

const CityServiceOptimization: React.FC<CityServiceOptimizationProps> = ({ 
  service, 
  serviceDescription,
  keywords = [] 
}) => {
  const { cityName } = useParams<{ cityName: string }>();
  
  // Only render if we're on a city-specific page
  if (!cityName || !targetCities.map(city => city.toLowerCase()).includes(cityName.toLowerCase())) {
    return null;
  }

  // Format city name with first letter capitalized
  const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  
  // Generate city-specific meta information
  const title = `${service} ${formattedCityName} | Refurbish Totaal Nederland - Vakkundige specialisten`;
  const description = `Professionele ${service.toLowerCase()} in ${formattedCityName} en omgeving. ${serviceDescription} Neem contact op voor een vrijblijvende offerte. Erkend en gecertificeerde vakmensen.`;
  
  // Generate a list of related keywords for this service+city combination
  const serviceType = service.toLowerCase();
  let relatedKeywords: string[] = keywords;
  
  if (relatedKeywords.length === 0) {
    if (serviceType.includes('schilder')) {
      relatedKeywords = [
        `schilder ${formattedCityName}`,
        `schildersbedrijf ${formattedCityName}`,
        `buitenschilderwerk ${formattedCityName}`,
        `kozijnen schilderen ${formattedCityName}`,
        `houtrot reparatie ${formattedCityName}`,
        `binnenschilderwerk ${formattedCityName}`,
        `schilderwerk offerte ${formattedCityName}`,
        `professioneel schilderwerk ${formattedCityName}`,
        `schilderwerk monumentaal pand ${formattedCityName}`,
        `schilder renovatie ${formattedCityName}`
      ];
    } else if (serviceType.includes('dak')) {
      relatedKeywords = [
        `dakrenovatie ${formattedCityName}`,
        `dakdekker ${formattedCityName}`,
        `daklekkage ${formattedCityName}`,
        `dakisolatie ${formattedCityName}`,
        `dakbedekking vervangen ${formattedCityName}`,
        `plat dak renovatie ${formattedCityName}`,
        `dakgoten vervangen ${formattedCityName}`,
        `dakonderhoud ${formattedCityName}`,
        `dakpannen vervangen ${formattedCityName}`,
        `dakisolatie kosten ${formattedCityName}`
      ];
    } else if (serviceType.includes('stuk')) {
      relatedKeywords = [
        `stukadoor ${formattedCityName}`,
        `stucwerk ${formattedCityName}`,
        `wanden stucen ${formattedCityName}`,
        `plafond stucen ${formattedCityName}`,
        `spachtelputz ${formattedCityName}`,
        `sierpleister ${formattedCityName}`,
        `renovatiestucwerk ${formattedCityName}`,
        `gladpleisterwerk ${formattedCityName}`,
        `stucadoor plafond ${formattedCityName}`,
        `stucwerk badkamer ${formattedCityName}`
      ];
    } else if (serviceType.includes('installatie')) {
      relatedKeywords = [
        `loodgieter ${formattedCityName}`,
        `elektricien ${formattedCityName}`,
        `cv monteur ${formattedCityName}`,
        `installateur ${formattedCityName}`,
        `elektra aanleggen ${formattedCityName}`,
        `cv ketel installatie ${formattedCityName}`,
        `installatiebedrijf ${formattedCityName}`,
        `elektra vernieuwen ${formattedCityName}`,
        `sanitair installateur ${formattedCityName}`,
        `elektrische installatie ${formattedCityName}`
      ];
    } else if (serviceType.includes('verbouw')) {
      relatedKeywords = [
        `aannemer ${formattedCityName}`,
        `verbouwing ${formattedCityName}`,
        `aanbouw ${formattedCityName}`,
        `uitbouw ${formattedCityName}`,
        `renovatie ${formattedCityName}`,
        `verbouwing kosten ${formattedCityName}`,
        `aanbouw specialist ${formattedCityName}`,
        `verbouwing woning ${formattedCityName}`,
        `renovatie jaren 30 woning ${formattedCityName}`,
        `dakkapel specialist ${formattedCityName}`
      ];
    } else if (serviceType.includes('behang')) {
      relatedKeywords = [
        `behanger ${formattedCityName}`,
        `behang ${formattedCityName}`,
        `fotobehang ${formattedCityName}`,
        `behangwerk ${formattedCityName}`,
        `behang verwijderen ${formattedCityName}`,
        `fotobehang op maat ${formattedCityName}`,
        `behangen prijs ${formattedCityName}`,
        `vliesbehang aanbrengen ${formattedCityName}`,
        `glasvliesbehang ${formattedCityName}`,
        `behang specialist ${formattedCityName}`
      ];
    } else if (serviceType.includes('vloer')) {
      relatedKeywords = [
        `pvc vloer ${formattedCityName}`,
        `pvc vloeren leggen ${formattedCityName}`,
        `vloeren specialist ${formattedCityName}`,
        `vloerverwarming pvc ${formattedCityName}`,
        `onderhoud pvc vloer ${formattedCityName}`,
        `pvc vloer prijzen ${formattedCityName}`,
        `click pvc vloeren ${formattedCityName}`,
        `pvc vloer badkamer ${formattedCityName}`,
        `pvc vloeren showroom ${formattedCityName}`,
        `luxe pvc vloeren ${formattedCityName}`
      ];
    }
  }

  // Create keywords meta content
  const keywordsString = relatedKeywords.join(', ');
  const serviceSlug = serviceType.replace(/\s+/g, '-');
  const canonicalUrl = `https://www.refurbishtotaalnederland.nl/diensten/${serviceSlug}/${cityName.toLowerCase()}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="nl_NL" />
      
      {/* Twitter card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* City-specific schema markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${service} ${formattedCityName}`,
          "description": description,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Refurbish Totaal Nederland",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Gennep",
              "addressRegion": "Limburg",
              "postalCode": "6591 CT",
              "streetAddress": "Niersweg 27",
              "addressCountry": "NL"
            },
            "telephone": "+31854444255",
            "priceRange": "€€",
            "image": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png",
            "logo": "https://www.refurbishtotaalnederland.nl/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png"
          },
          "areaServed": {
            "@type": "City",
            "name": formattedCityName
          },
          "serviceType": service,
          "url": canonicalUrl,
          "mainEntityOfPage": canonicalUrl
        })}
      </script>
    </Helmet>
  );
};

export default CityServiceOptimization;
