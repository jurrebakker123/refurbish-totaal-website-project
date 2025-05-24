
import React from 'react';
import { OptimizedImage } from '../ui/optimized-image';

export function DakkapelTypes() {
  const types = [
    {
      title: 'Prefab Dakkapel',
      description: 'Een voordelige en snelle optie die in één dag geplaatst kan worden.',
      image: '/lovable-uploads/e5c87c28-be1f-4ff1-809e-61c3d9fc3b9c.png',
      features: ['Snel geplaatst', 'Voordelig', 'Verschillende stijlen', 'Hoge isolatiewaarde']
    },
    {
      title: 'Op Maat Gemaakte Dakkapel',
      description: 'Volledig naar uw wensen gebouwd met premium materialen en afwerking.',
      image: '/lovable-uploads/78a350aa-89ea-4904-8e38-ceac9f29cf02.png',
      features: ['Volledig op maat', 'Premium materialen', 'Luxe afwerking', 'Maximale ruimtewinst']
    },
    {
      title: 'Renovatie Bestaande Dakkapel',
      description: 'Geef uw bestaande dakkapel een tweede leven met onze renovatiediensten.',
      image: '/lovable-uploads/90e13ec0-aaf8-444a-a92d-a72af8cc8d30.png',
      features: ['Energiebesparend', 'Modern uiterlijk', 'Verlengt levensduur', 'Verbeterde isolatie']
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            Onze Dakkapel Oplossingen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Voor elke woning en budget bieden wij de juiste dakkapel oplossing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((type, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-56 overflow-hidden">
                <OptimizedImage
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  fallbackSrc="/lovable-uploads/5f8f6883-901d-4157-ab41-1b023e186ede.png"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-brand-darkGreen">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-brand-lightGreen rounded-full mr-2"></span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
