
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DienstDetailPage from '@/pages/DienstDetailPage';

// Service en stad configuraties voor routing en SEO
const targetCities = [
  'Eindhoven', 'Rotterdam', 'Breda', 'Amsterdam', 
  'Lelystad', 'Zwolle', 'Doetinchem', 'Venray'
];

const services = [
  'dakkapel',
  'schilderwerk',
  'dakrenovatie',
  'stukadoren',  // Changed to stukadoren consistently
  'installatietechniek',
  'aan-en-verbouw',
  'behangen',
  'pvc-vloeren'
];

// Slug-mapping voor betere SEO
const citySlugMap: Record<string, string> = {
  'eindhoven': 'eindhoven',
  'rotterdam': 'rotterdam',
  'breda': 'breda',
  'amsterdam': 'amsterdam',
  'lelystad': 'lelystad',
  'zwolle': 'zwolle',
  'doetinchem': 'doetinchem',
  'venray': 'venray'
};

const serviceSlugMap: Record<string, string> = {
  'dakkapel': 'dakkapel',
  'schilderwerk': 'schilderwerk',
  'dakrenovatie': 'dakrenovatie',
  'stukadoren': 'stukadoren',  // Changed to stukadoren consistently
  'installatietechniek': 'installatietechniek',
  'aan-en-verbouw': 'aan-en-verbouw',
  'behangen': 'behangen',
  'pvc-vloeren': 'pvc-vloeren'
};

/**
 * Component om stad-specifieke service-pagina's te routeren
 * Verbeterd voor SEO met slug-mapping en consistent URL-structuur
 */
const CityServicePages: React.FC = () => {
  // Console log voor debuggen (verwijder in productie)
  console.log('CityServicePages geladen - routes worden ingesteld');
  
  return (
    <Routes>
      {/* Service hoofdpagina's */}
      {services.map((service) => (
        <Route 
          key={service}
          path={`/diensten/${service}`} 
          element={<DienstDetailPage />} 
        />
      ))}

      {/* Service pagina's per stad */}
      {services.map((service) => 
        targetCities.map((city) => {
          const citySlug = citySlugMap[city.toLowerCase()] || city.toLowerCase();
          return (
            <Route 
              key={`${service}-${city}`}
              path={`/diensten/${service}/${citySlug}`} 
              element={<DienstDetailPage />} 
            />
          );
        })
      )}
    </Routes>
  );
};

export default CityServicePages;
