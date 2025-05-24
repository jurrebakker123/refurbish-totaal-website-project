
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

export function BouwhulpServices() {
  const services = [
    {
      title: "Hulpkrachten",
      description: "Ongeschoolde en geschoolde hulpkrachten voor alle voorkomende werkzaamheden op de bouwplaats.",
      image: "/lovable-uploads/43b44fd9-a2c6-4670-9ec2-b2dbe73b1a5f.png",
      link: "/diensten/hulpkrachten"
    },
    {
      title: "Metselaars",
      description: "Ervaren metselaars voor nieuwbouw, renovatie en restauratieprojecten.",
      image: "/lovable-uploads/33476cb2-cc9e-44d6-8401-288c1a3cf6e6.png",
      link: "/diensten/metselaars"
    },
    {
      title: "Timmerlieden",
      description: "Vakbekwame timmerlieden voor ruwbouw, afbouw en maatwerk projecten.",
      image: "/lovable-uploads/70e348ca-19f6-4888-9cf4-4ba36b481d5a.png",
      link: "/diensten/timmerlieden"
    },
    {
      title: "Projectbegeleiding",
      description: "Ervaren voormannen en uitvoerders voor de begeleiding van uw bouwprojecten.",
      image: "/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png",
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
                <OptimizedImage
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
