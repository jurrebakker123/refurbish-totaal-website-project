
import React from 'react';
import { DienstData } from '@/data/types/dienst';

interface DienstHeroProps {
  dienst: DienstData;
  serviceId: string;
}

const DienstHero = ({ dienst, serviceId }: DienstHeroProps) => {
  // Adjust height for PVC vloeren page
  const heroHeight = serviceId === 'pvc-vloeren' ? 'py-12' : 'py-16';

  return (
    <section className={`relative text-white ${heroHeight}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url('${dienst.image}')`,
          backgroundPosition: 'center 25%'
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-50"></div>
      </div>
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="animate-float">{dienst.icon}</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{dienst.title}</h1>
            <p className="text-xl">{dienst.description}</p>
          </div>
          <div className="md:w-1/2 md:pl-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-lg overflow-hidden shadow-lg hover-lift">
              <img 
                src={dienst.image} 
                alt={dienst.title} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DienstHero;
