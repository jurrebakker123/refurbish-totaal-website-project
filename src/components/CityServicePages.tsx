
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DienstDetailPage from '@/pages/DienstDetailPage';

const targetCities = [
  'Eindhoven', 'Rotterdam', 'Breda', 'Amsterdam', 
  'Lelystad', 'Zwolle', 'Doetinchem', 'Venray'
];

const services = [
  'schilderwerk',
  'dakrenovatie',
  'stukadoren',
  'installatietechniek',
  'aan-en-verbouw',
  'behangen',
  'pvc-vloeren'
];

const CityServicePages: React.FC = () => {
  return (
    <Routes>
      {services.map((service) => (
        <Route 
          key={service}
          path={`/diensten/${service}`} 
          element={<DienstDetailPage />} 
        />
      ))}

      {services.map((service) => 
        targetCities.map((city) => (
          <Route 
            key={`${service}-${city}`}
            path={`/diensten/${service}/${city.toLowerCase()}`} 
            element={<DienstDetailPage />} 
          />
        ))
      )}
    </Routes>
  );
};

export default CityServicePages;
