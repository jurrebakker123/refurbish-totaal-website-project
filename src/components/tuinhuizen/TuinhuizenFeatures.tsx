
import React from 'react';
import { Home, Check, Calendar, Image } from 'lucide-react';

export function TuinhuizenFeatures() {
  const features = [
    {
      icon: <Home className="h-8 w-8 text-brand-lightGreen" />,
      title: "Maatwerk Oplossingen",
      description: "Elk tuinhuis wordt op maat gemaakt volgens uw specifieke wensen en ruimte."
    },
    {
      icon: <Check className="h-8 w-8 text-brand-lightGreen" />,
      title: "Premium Kwaliteit",
      description: "We gebruiken alleen de beste materialen voor een duurzaam resultaat."
    },
    {
      icon: <Calendar className="h-8 w-8 text-brand-lightGreen" />,
      title: "Snelle Levering",
      description: "Professionele plaatsing binnen de afgesproken termijn."
    },
    {
      icon: <Image className="h-8 w-8 text-brand-lightGreen" />,
      title: "3D Visualisatie",
      description: "Zie uw tuinhuis al voordat we beginnen met bouwen."
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-darkGreen">
          Waarom Kiezen voor Onze Tuinhuizen?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
