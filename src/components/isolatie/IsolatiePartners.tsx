
import React from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';

const IsolatiePartners = () => {
  const partners = [
    {
      name: "KIWA",
      logo: "/assets/logos/kiwa-logo.svg"
    },
    {
      name: "ISSO",
      logo: "/assets/logos/isso-logo.svg"
    },
    {
      name: "Bouwgarant",
      logo: "/assets/logos/bouwgarant-logo.svg"
    },
    {
      name: "SKG",
      logo: "/assets/logos/skg-logo.svg"
    },
    {
      name: "IKOB",
      logo: "/assets/logos/ikob-logo.svg"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-darkGreen">
            Onze partners & certificeringen
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Wij werken samen met toonaangevende partners en voldoen aan alle kwaliteitscertificeringen.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="bg-white p-4 rounded-lg shadow-md grayscale hover:grayscale-0 transition-all"
            >
              <div className="w-32 h-16 flex items-center justify-center">
                <div className="text-xl font-bold text-gray-700">{partner.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IsolatiePartners;
