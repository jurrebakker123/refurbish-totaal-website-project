
import React from 'react';
import { OptimizedImage } from '../ui/optimized-image';

export function DakkapelProcess() {
  const steps = [
    {
      number: '01',
      title: 'Vrijblijvende Offerte',
      description: 'Neem contact met ons op voor een gratis en vrijblijvende offerte op maat.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21ed6c?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      number: '02',
      title: 'Inmeten & Ontwerp',
      description: 'Onze experts meten alles nauwkeurig in en maken een ontwerp dat perfect bij uw woning past.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      number: '03',
      title: 'Productie',
      description: 'Uw dakkapel wordt op maat geproduceerd in onze Nederlandse werkplaats met hoogwaardige materialen.',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      number: '04',
      title: 'Plaatsing & Afwerking',
      description: 'Onze vakkundige monteurs plaatsen uw dakkapel en zorgen voor een perfecte afwerking.',
      image: 'https://images.unsplash.com/photo-1613685703305-eb42ee346545?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            Zo Werkt Het
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Van offerte tot plaatsing: dit is hoe wij te werk gaan om uw droomdakkapel te realiseren
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 bg-brand-lightGreen text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center z-10">
                    {step.number}
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <OptimizedImage
                      src={step.image}
                      alt={step.title}
                      className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
                      fallbackSrc="/placeholder.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-brand-darkGreen">{step.title}</h3>
                <p className="text-lg text-gray-600 mb-4">{step.description}</p>
                <div className="h-1 w-16 bg-brand-lightGreen"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
