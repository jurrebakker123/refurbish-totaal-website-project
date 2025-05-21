
import React from 'react';
import { ArrowRight } from 'lucide-react';

export function BouwhulpServices() {
  const services = [
    {
      title: "Klusdiensten",
      description: "Kleine klussen in en om het huis, van het ophangen van lampen tot het monteren van meubels.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45249ff78?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/klusdiensten"
    },
    {
      title: "Renovatie",
      description: "Complete renovatie van kamers, badkamers, keukens of uw hele woning.",
      image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/renovatie"
    },
    {
      title: "Onderhoud",
      description: "Regulier onderhoud aan uw woning, van schilderwerk tot dakreparaties.",
      image: "https://images.unsplash.com/photo-1590086782957-93c06f21b117?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/onderhoud"
    },
    {
      title: "Bouwbegeleiding",
      description: "Professionele begeleiding bij uw bouwproject, van planning tot oplevering.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
      link: "/diensten/bouwbegeleiding"
    }
  ];

  return (
    <section id="diensten" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Onze Diensten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij bieden een breed scala aan bouwdiensten voor particulieren en bedrijven.
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
