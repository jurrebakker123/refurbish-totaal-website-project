
import React from 'react';
import { Clock, Shield, Star, Users } from 'lucide-react';

export function BouwhulpFeatures() {
  const features = [
    {
      icon: <Clock className="h-10 w-10 text-brand-darkGreen" />,
      title: "Snelle Inzet",
      description: "Binnen 24 uur kunnen wij geschikt personeel leveren voor uw project. Flexibele planning en directe beschikbaarheid."
    },
    {
      icon: <Shield className="h-10 w-10 text-brand-darkGreen" />,
      title: "Betrouwbaar Personeel",
      description: "Al onze medewerkers zijn gescreend en hebben ervaring in de bouw. Volledig verzekerd en VCA gecertificeerd."
    },
    {
      icon: <Star className="h-10 w-10 text-brand-darkGreen" />,
      title: "Ervaren Vakmannen",
      description: "Ons team bestaat uit gekwalificeerde bouwvakkers met jarenlange praktijkervaring in verschillende disciplines."
    },
    {
      icon: <Users className="h-10 w-10 text-brand-darkGreen" />,
      title: "Flexibele Capaciteit",
      description: "Van enkele dagen tot langdurige projecten. Wij schalen mee met uw personeel behoefte."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Waarom kiezen aannemers voor ons?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij leveren kwaliteitspersoneel dat direct inzetbaar is op uw bouwprojecten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-brand-darkGreen">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
