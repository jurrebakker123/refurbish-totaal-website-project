
import React from 'react';
import { Clock, Shield, Star, Users } from 'lucide-react';

export function BouwhulpFeatures() {
  const features = [
    {
      icon: <Clock className="h-10 w-10 text-brand-darkGreen" />,
      title: "Snel & Betrouwbaar",
      description: "Binnen 24 uur reactie op uw aanvraag. Stipte planning en oplevering van elk project."
    },
    {
      icon: <Shield className="h-10 w-10 text-brand-darkGreen" />,
      title: "Kwaliteitsgarantie",
      description: "Voor al onze werkzaamheden geldt een uitgebreide garantie. Wij staan achter ons werk."
    },
    {
      icon: <Star className="h-10 w-10 text-brand-darkGreen" />,
      title: "Ervaren Vakmensen",
      description: "Ons team bestaat uit gekwalificeerde professionals met jarenlange praktijkervaring."
    },
    {
      icon: <Users className="h-10 w-10 text-brand-darkGreen" />,
      title: "Persoonlijke Aanpak",
      description: "Wij luisteren naar uw wensen en bieden oplossingen die bij uw situatie passen."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Waarom kiezen voor Refurbishbouwhulp?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij onderscheiden ons door kwaliteit, betrouwbaarheid en transparantie in al onze diensten.
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
