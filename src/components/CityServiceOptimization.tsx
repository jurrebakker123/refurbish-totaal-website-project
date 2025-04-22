
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

interface CityServiceOptimizationProps {
  service: string;
  serviceDescription: string;
}

const targetCities = [
  'Eindhoven', 'Rotterdam', 'Breda', 'Amsterdam', 
  'Lelystad', 'Zwolle', 'Doetinchem', 'Venray'
];

const CityServiceOptimization: React.FC<CityServiceOptimizationProps> = ({ 
  service, 
  serviceDescription 
}) => {
  const { cityName } = useParams<{ cityName: string }>();
  
  // Only render if we're on a city-specific page
  if (!cityName || !targetCities.map(city => city.toLowerCase()).includes(cityName.toLowerCase())) {
    return null;
  }

  // Format city name with first letter capitalized
  const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  
  // Generate city-specific meta information
  const title = `${service} ${formattedCityName} | Refurbish Totaal Nederland`;
  const description = `Professionele ${service.toLowerCase()} in ${formattedCityName} en omgeving. ${serviceDescription} Neem contact op voor een vrijblijvende offerte.`;
  
  // Generate a list of related keywords for this service+city combination
  const serviceType = service.toLowerCase();
  let relatedKeywords = [];
  
  if (serviceType.includes('schilder')) {
    relatedKeywords = [
      `schilder ${formattedCityName}`,
      `schildersbedrijf ${formattedCityName}`,
      `buitenschilderwerk ${formattedCityName}`,
      `kozijnen schilderen ${formattedCityName}`,
      `houtrot reparatie ${formattedCityName}`
    ];
  } else if (serviceType.includes('dak')) {
    relatedKeywords = [
      `dakrenovatie ${formattedCityName}`,
      `dakdekker ${formattedCityName}`,
      `daklekkage ${formattedCityName}`,
      `dakisolatie ${formattedCityName}`,
      `dakbedekking vervangen ${formattedCityName}`
    ];
  } else if (serviceType.includes('stuk')) {
    relatedKeywords = [
      `stukadoor ${formattedCityName}`,
      `stucwerk ${formattedCityName}`,
      `wanden stucen ${formattedCityName}`,
      `plafond stucen ${formattedCityName}`,
      `spachtelputz ${formattedCityName}`
    ];
  } else if (serviceType.includes('installatie')) {
    relatedKeywords = [
      `loodgieter ${formattedCityName}`,
      `elektricien ${formattedCityName}`,
      `cv monteur ${formattedCityName}`,
      `installateur ${formattedCityName}`,
      `elektra aanleggen ${formattedCityName}`
    ];
  } else if (serviceType.includes('verbouw')) {
    relatedKeywords = [
      `aannemer ${formattedCityName}`,
      `verbouwing ${formattedCityName}`,
      `aanbouw ${formattedCityName}`,
      `uitbouw ${formattedCityName}`,
      `renovatie ${formattedCityName}`
    ];
  } else if (serviceType.includes('behang')) {
    relatedKeywords = [
      `behanger ${formattedCityName}`,
      `behang ${formattedCityName}`,
      `fotobehang ${formattedCityName}`,
      `behangwerk ${formattedCityName}`,
      `behang verwijderen ${formattedCityName}`
    ];
  } else if (serviceType.includes('vloer')) {
    relatedKeywords = [
      `pvc vloer ${formattedCityName}`,
      `pvc vloeren leggen ${formattedCityName}`,
      `vloeren specialist ${formattedCityName}`,
      `vloerverwarming pvc ${formattedCityName}`,
      `onderhoud pvc vloer ${formattedCityName}`
    ];
  }

  // Create keywords meta content
  const keywordsString = relatedKeywords.join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <link rel="canonical" href={`https://www.refurbishtotaalnederland.nl/diensten/${serviceType.replace(/\s+/g, '-')}/${cityName.toLowerCase()}`} />
      
      {/* City-specific schema markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${service} ${formattedCityName}`,
          "description": description,
          "provider": {
            "@type": "Organization",
            "name": "Refurbish Totaal Nederland",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Gennep",
              "addressRegion": "Limburg",
              "postalCode": "6591 CT",
              "streetAddress": "Niersweg 27",
              "addressCountry": "NL"
            }
          },
          "areaServed": {
            "@type": "City",
            "name": formattedCityName
          },
          "serviceType": service
        })}
      </script>
    </Helmet>
  );
};

export default CityServiceOptimization;
