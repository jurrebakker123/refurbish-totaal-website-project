
import { Link } from 'react-router-dom';
import { Brush, Home, Construction, Wrench, Building, SquareGanttChart, Wallpaper, Shield, Thermometer } from 'lucide-react';
import React from 'react';
import { OptimizedImage } from './ui/optimized-image';

const services = [
  {
    id: 'kozijntechniek',
    icon: <Shield className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Kozijntechniek',
    description: 'Levering en plaatsing van hoogwaardige kozijnen in hout, kunststof of aluminium voor een betere uitstraling en isolatie.',
    link: '/diensten/kozijntechniek',
    image: '/lovable-uploads/5f8f6883-901d-4157-ab41-1b023e186ede.png'
  },
  {
    id: 'isolatietechniek',
    icon: <Thermometer className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Isolatietechniek',
    description: 'Effectieve isolatieoplossingen die uw woning comfortabeler maken en energiekosten verlagen.',
    link: '/diensten/isolatietechniek',
    image: '/lovable-uploads/43b44fd9-a2c6-4670-9ec2-b2dbe73b1a5f.png'
  },
  {
    id: 'dakkapel',
    icon: <Home className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Dakkapel',
    description: 'Professionele plaatsing en renovatie van dakkapellen voor meer ruimte en licht in uw woning.',
    link: '/diensten/dakkapel',
    image: '/lovable-uploads/ce310265-aaac-49aa-bff7-99a27901151a.png'
  },
  {
    id: 'schilderwerk',
    icon: <Brush className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Schilderwerk',
    description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
    link: '/diensten/schilderwerk',
    image: '/lovable-uploads/ab4fe583-5611-4401-93c9-7fb7d38fd340.png'
  },
  {
    id: 'dakrenovatie',
    icon: <Home className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Dakrenovatie',
    description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
    link: '/diensten/dakrenovatie',
    image: '/lovable-uploads/dc6d5fa1-8797-4d60-9de0-5493bc6fe9b3.png'
  },
  {
    id: 'stukadoren',
    icon: <Construction className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Stukadoren',
    description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
    link: '/diensten/stukadoren',
    image: '/lovable-uploads/ab4fe583-5611-4401-93c9-7fb7d38fd340.png'
  },
  {
    id: 'installatietechniek',
    icon: <Wrench className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Installatietechniek',
    description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
    link: '/diensten/installatietechniek',
    image: '/lovable-uploads/10e4891f-b115-4650-9c85-6f78b1e53888.png'
  },
  {
    id: 'aan-en-verbouw',
    icon: <Building className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Aan- en verbouw',
    description: 'Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning.',
    link: '/diensten/aan-en-verbouw',
    image: '/lovable-uploads/65376561-53c2-4dd6-bec2-df8e66a4be99.png'
  },
  {
    id: 'behangen',
    icon: <Wallpaper className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Behangen',
    description: 'Professioneel behangwerk met oog voor detail en een perfect eindresultaat.',
    link: '/diensten/behangen',
    image: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png'
  },
  {
    id: 'pvc-vloeren',
    icon: <SquareGanttChart className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'PVC Vloeren',
    description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
    link: '/diensten/pvc-vloeren',
    image: '/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png'
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
