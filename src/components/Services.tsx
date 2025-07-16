
import { Link } from 'react-router-dom';
import { Brush, Home, Construction, Wrench, Building, SquareGanttChart, Wallpaper, Shield, Thermometer } from 'lucide-react';
import React from 'react';
import { OptimizedImage } from './ui/optimized-image';

// Toggle om alle diensten te tonen of alleen de gefocuste diensten
const SHOW_ALL_SERVICES = false; // Zet op true om alle diensten weer te tonen

const allServices = [
  {
    id: 'kozijntechniek',
    icon: <Shield className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Kozijntechniek',
    description: 'Levering en plaatsing van hoogwaardige kozijnen in hout, kunststof of aluminium voor een betere uitstraling en isolatie.',
    link: '/diensten/kozijntechniek',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'isolatietechniek',
    icon: <Thermometer className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Isolatietechniek',
    description: 'Effectieve isolatieoplossingen die uw woning comfortabeler maken en energiekosten verlagen.',
    link: '/diensten/isolatietechniek',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'dakkapel',
    icon: <Home className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Dakkapel',
    description: 'Professionele plaatsing en renovatie van dakkapellen voor meer ruimte en licht in uw woning.',
    link: '/diensten/dakkapel',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'schilderwerk',
    icon: <Brush className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Schilderwerk',
    description: 'Professioneel binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
    link: '/diensten/schilderwerk',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'dakrenovatie',
    icon: <Home className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Dakrenovatie',
    description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
    link: '/diensten/dakrenovatie',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'stukadoren',
    icon: <Construction className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Stukadoren',
    description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
    link: '/diensten/stukadoren',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2071&q=80'
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
    image: 'https://images.unsplash.com/photo-1504615755583-2916b52192a3?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'behangen',
    icon: <Wallpaper className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Behangen',
    description: 'Professioneel behangwerk met oog voor detail en een perfect eindresultaat.',
    link: '/diensten/behangen',
    image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
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

// Gefocuste diensten die altijd zichtbaar zijn
const focusedServiceIds = ['dakkapel', 'schilderwerk', 'stukadoren'];

// Filter diensten op basis van de toggle
const services = SHOW_ALL_SERVICES 
  ? allServices 
  : allServices.filter(service => focusedServiceIds.includes(service.id));

const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="section-title">Onze Specialisaties</h2>
          <p className="text-lg text-gray-600">
            Wij focussen ons op drie kerngebieden waar wij uitblinken in vakmanschap en kwaliteit. 
            Voor elk project bieden wij maatwerkoplossingen die perfect aansluiten bij uw wensen.
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
              <div className="w-full h-48 rounded mb-4 overflow-hidden">
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  fallbackSrc="/placeholder.svg"
                />
              </div>
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
        
        {!SHOW_ALL_SERVICES && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Wij bieden ook andere diensten aan. Neem contact op voor meer informatie over onze volledige dienstverlening.
            </p>
            <Link to="/contact" className="btn-primary hover:animate-pulse">
              Contact Opnemen
            </Link>
          </div>
        )}
        
        {SHOW_ALL_SERVICES && (
          <div className="mt-12 text-center">
            <Link to="/diensten" className="btn-primary hover:animate-pulse">
              Alle Diensten Bekijken
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
