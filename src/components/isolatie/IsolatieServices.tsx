
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

const IsolatieServices = () => {
  const services = [
    {
      title: "Spouwmuurisolatie",
      description: "Isoleer uw spouwmuren en bespaar direct op energiekosten. Spouwmuurisolatie houdt de warmte binnen en voorkomt vocht- en schimmelproblemen.",
      image: "https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?ixlib=rb-4.0.1&auto=format&fit=crop&w=1080&q=80",
      benefits: ["Tot 30% energiebesparing", "Binnen enkele uren geïnstalleerd", "Minimaal 25 jaar garantie"]
    },
    {
      title: "Dakisolatie",
      description: "Via het dak verdwijnt tot wel 30% van alle warmte. Met onze dakisolatie houdt u deze warmte binnen en bespaart u direct op uw energierekening.",
      image: "https://images.unsplash.com/photo-1632759145399-0e4913e71a51?ixlib=rb-4.0.1&auto=format&fit=crop&w=1080&q=80",
      benefits: ["Tot 25% energiebesparing", "Keuze uit diverse materialen", "Geschikt voor alle daktypen"]
    },
    {
      title: "Vloerisolatie",
      description: "Een goed geïsoleerde vloer voelt behaaglijk aan en voorkomt koude voeten. Vloerisolatie is een eenvoudige manier om uw wooncomfort te verhogen.",
      image: "https://images.unsplash.com/photo-1603865713652-94b02a36973a?ixlib=rb-4.0.1&auto=format&fit=crop&w=1080&q=80",
      benefits: ["Tot 15% energiebesparing", "Verhoogd wooncomfort", "Snel terugverdiend"]
    },
    {
      title: "HR++ Glasisolatie",
      description: "Modern HR++ glas isoleert tot 3x beter dan enkelglas. Vervang uw oude ramen en bespaar aanzienlijk op uw energierekening.",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.1&auto=format&fit=crop&w=1080&q=80",
      benefits: ["Tot 20% energiebesparing", "Verbeterde geluidsisolatie", "Verhoogde inbraakwerendheid"]
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Onze isolatieoplossingen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Wij bieden verschillende isolatieoplossingen aan voor elke situatie. 
            Onze experts adviseren u graag over de beste oplossing voor uw woning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-60">
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.benefits.map(benefit => (
                    <li key={benefit} className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-brand-lightGreen mr-2" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-0">
                <a 
                  href="#contact-section" 
                  className="btn-outline w-full text-center inline-block"
                >
                  Meer informatie
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IsolatieServices;
