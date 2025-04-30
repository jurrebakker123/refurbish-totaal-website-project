
import React from 'react';
import { Sun, Recycle, Battery, Zap, BarChart4, Leaf } from 'lucide-react';

export function ZonnepanelenFeatures() {
  const features = [
    {
      icon: <Recycle className="h-8 w-8 text-brand-lightGreen" />,
      title: "Refurbished Kwaliteit",
      description: "Zorgvuldig gecontroleerde en opgeknapte premium zonnepanelen voor een fractie van de nieuwprijs."
    },
    {
      icon: <Zap className="h-8 w-8 text-brand-lightGreen" />,
      title: "Hoog Rendement",
      description: "85-95% van de originele capaciteit, maximale opbrengst voor een minimale prijs."
    },
    {
      icon: <Battery className="h-8 w-8 text-brand-lightGreen" />,
      title: "Garantie",
      description: "3 jaar volledige garantie op alle refurbished zonnepanelen met professionele installatie."
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-brand-lightGreen" />,
      title: "Snelle Terugverdientijd",
      description: "Door de lagere aanschafkosten verdient u uw investering nog sneller terug."
    },
    {
      icon: <Leaf className="h-8 w-8 text-brand-lightGreen" />,
      title: "Duurzame Keuze",
      description: "Geef zonnepanelen een tweede leven en draag bij aan een circulaire economie."
    },
    {
      icon: <Sun className="h-8 w-8 text-brand-lightGreen" />,
      title: "Compleet Pakket",
      description: "Van advies tot installatie, wij verzorgen het complete traject voor u."
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-darkGreen">
          Waarom Kiezen voor Refurbished Zonnepanelen?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
