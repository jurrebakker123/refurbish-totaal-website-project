
import React from 'react';
import { ArrowRight } from 'lucide-react';

export function BouwhulpServices() {
  const services = [
    {
      title: "Hulpkrachten",
      description: "Ongeschoolde en geschoolde hulpkrachten voor alle voorkomende werkzaamheden op de bouwplaats.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45249ff78?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/hulpkrachten"
    },
    {
      title: "Metselaars",
      description: "Ervaren metselaars voor nieuwbouw, renovatie en restauratieprojecten.",
      image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/metselaars"
    },
    {
      title: "Timmerlieden",
      description: "Vakbekwame timmerlieden voor ruwbouw, afbouw en maatwerk projecten.",
      image: "https://images.unsplash.com/photo-1590086782957-93c06f21b117?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/timmerlieden"
    },
    {
      title: "Projectbegeleiding",
      description: "Ervaren voormannen en uitvoerders voor de begeleiding van uw bouwprojecten.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/projectbegeleiding"
    }
  ];

  return (
    <section id="diensten" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Ons Personeel Aanbod
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij leveren geschikt bouwpersoneel voor alle disciplines binnen uw aannemingsbedrijf.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-brand-darkGreen">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a 
                  href={service.link}
                  className="inline-flex items-center text-brand-darkGreen font-medium hover:text-brand-lightGreen transition-colors group"
                >
                  Meer informatie
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
