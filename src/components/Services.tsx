
import { Link } from 'react-router-dom';
import { Brush, Home, Construction, Wrench, Building, SquareGanttChart, Wallpaper } from 'lucide-react';
import React from 'react';
import { OptimizedImage } from './ui/optimized-image';

const services = [
  {
    id: 'dakkapel',
    icon: <Home className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Dakkapel',
    description: 'Professionele plaatsing en renovatie van dakkapellen voor meer ruimte en licht in uw woning.',
    link: '/diensten/dakkapel',
    image: '/lovable-uploads/b38cb6ce-e0f6-43c0-8689-c272ffea8c12.png'
  },
  {
    id: 'schilderwerk',
    icon: <Brush className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Schilderwerk',
    description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
    link: '/diensten/schilderwerk',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'dakrenovatie',
    icon: <Home className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Dakrenovatie',
    description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
    link: '/diensten/dakrenovatie',
    image: '/lovable-uploads/b38cb6ce-e0f6-43c0-8689-c272ffea8c12.png'
  },
  {
    id: 'stukadoren',
    icon: <Construction className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Stukadoren',
    description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
    link: '/diensten/stukadoren',
    image: '/lovable-uploads/b38cb6ce-e0f6-43c0-8689-c272ffea8c12.png'
  },
  {
    id: 'installatietechniek',
    icon: <Wrench className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Installatietechniek',
    description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
    link: '/diensten/installatietechniek',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.1&auto=format&fit=crop&w=2069&q=80'
  },
  {
    id: 'aan-en-verbouw',
    icon: <Building className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Aan- en verbouw',
    description: 'Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning.',
    link: '/diensten/aan-en-verbouw',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2071&q=80'
  },
  {
    id: 'behangen',
    icon: <Wallpaper className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Behangen',
    description: 'Professioneel behangwerk met oog voor detail en een perfect eindresultaat.',
    link: '/diensten/behangen',
    image: '/lovable-uploads/b38cb6ce-e0f6-43c0-8689-c272ffea8c12.png'
  },
  {
    id: 'pvc-vloeren',
    icon: <SquareGanttChart className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'PVC Vloeren',
    description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
    link: '/diensten/pvc-vloeren',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  }
];

const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="section-title">Onze Diensten</h2>
          <p className="text-lg text-gray-600">
            Bij Refurbish Totaal Nederland bieden wij een compleet pakket aan renovatie- en verbouwdiensten. 
            Al onze werkzaamheden worden uitgevoerd door ervaren vakmensen.
          </p>
          <div className="inline-block bg-brand-lightGreen text-white text-lg font-medium px-6 py-3 rounded-full mt-4 animate-pulse">
            ✓ Gratis inspectie & advies
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id} 
              className="bg-white p-8 rounded-lg shadow-md hover-lift hover:shadow-lg transition-all flex flex-col h-full animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="animate-float">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">{service.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
              <OptimizedImage
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded mb-4"
                fallbackSrc="/placeholder.svg"
              />
              <Link 
                to={service.link} 
                className="text-brand-lightGreen font-medium hover-underline inline-flex items-center"
              >
                Meer Informatie
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/diensten" className="btn-primary hover:animate-pulse">
            Alle Diensten Bekijken
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
