
import React from 'react';
import { Home, Sun, Wrench, Building } from 'lucide-react';

export function DakkapelVoordelen() {
  const voordelen = [
    {
      icon: <Home className="h-10 w-10 text-brand-lightGreen" />,
      title: 'Meer Woonruimte',
      description: 'Een dakkapel creëert extra ruimte en vergroot het wooncomfort in uw woning.'
    },
    {
      icon: <Sun className="h-10 w-10 text-brand-lightGreen" />,
      title: 'Meer Lichtinval',
      description: 'Geniet van meer natuurlijk licht in uw woning door de extra raampartijen.'
    },
    {
      icon: <Building className="h-10 w-10 text-brand-lightGreen" />,
      title: 'Waardevermeerdering',
      description: 'Een dakkapel verhoogt de waarde van uw woning aanzienlijk bij eventuele verkoop.'
    },
    {
      icon: <Wrench className="h-10 w-10 text-brand-lightGreen" />,
      title: 'Snel Geïnstalleerd',
      description: 'In veel gevallen kan een dakkapel binnen één dag geplaatst worden.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            De Voordelen van een Dakkapel
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Een dakkapel biedt niet alleen extra ruimte, maar heeft ook tal van andere voordelen voor uw woning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {voordelen.map((voordeel, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover-lift text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                {voordeel.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-darkGreen">{voordeel.title}</h3>
              <p className="text-gray-600">{voordeel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
