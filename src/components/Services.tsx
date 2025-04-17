
import { Link } from 'react-router-dom';
import { Brush, Home, Construction, Wrench, Building, SquareGanttChart } from 'lucide-react';

const services = [
  {
    id: 'schilderwerk',
    icon: <Brush className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Schilderwerk',
    description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
    link: '/diensten/schilderwerk',
  },
  {
    id: 'dakrenovatie',
    icon: <Home className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Dakrenovatie',
    description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
    link: '/diensten/dakrenovatie',
  },
  {
    id: 'stucadoren',
    icon: <Construction className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Stucadoren',
    description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
    link: '/diensten/stucadoren',
  },
  {
    id: 'installatietechniek',
    icon: <Wrench className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Installatietechniek',
    description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
    link: '/diensten/installatietechniek',
  },
  {
    id: 'aan-en-verbouw',
    icon: <Building className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'Aan- en verbouw',
    description: 'Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning.',
    link: '/diensten/aan-en-verbouw',
  },
  {
    id: 'pvc-vloeren',
    icon: <SquareGanttChart className="h-12 w-12 text-brand-lightGreen mb-4" />,
    title: 'PVC Vloeren',
    description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
    link: '/diensten/pvc-vloeren',
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
