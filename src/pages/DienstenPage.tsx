
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Brush, Home, Construction, Wrench, Building, SquareGanttChart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const diensten = [
  {
    id: 'schilderwerk',
    icon: <Brush size={48} className="text-brand-lightGreen mb-6" />,
    title: 'Schilderwerk',
    description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
    features: [
      'Buitenschilderwerk voor gevels, kozijnen en deuren',
      'Binnenschilderwerk voor wanden, plafonds en trappen',
      'Kleuradvies en verfkeuze op maat',
      'Houtrotherstel en reparaties',
      'Graffiti verwijdering',
      'Behang- en spuitwerk'
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'dakrenovatie',
    icon: <Home size={48} className="text-brand-lightGreen mb-6" />,
    title: 'Dakrenovatie',
    description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
    features: [
      'Vernieuwen van dakbedekking (pannen, leien, bitumen)',
      'Isolatie van hellende en platte daken',
      'Dakkapellen plaatsen of renoveren',
      'Dakgoten repareren of vervangen',
      'Lood- en zinkwerk vernieuwen',
      'Velux dakramen plaatsen'
    ],
    image: 'https://images.unsplash.com/photo-1632759145351-1d170f2a9ddd?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'stucadoren',
    icon: <Construction size={48} className="text-brand-lightGreen mb-6" />,
    title: 'Stucadoren',
    description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
    features: [
      'Gladpleisterwerk voor wanden en plafonds',
      'Renovatiestucwerk bij scheuren en beschadigingen',
      'Sierlijsten en ornamenten aanbrengen',
      'Spachtelputz en structuurwerk',
      'Venetiaans stucwerk en tadelakt',
      'Betonlook wanden en vloeren'
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'installatietechniek',
    icon: <Wrench size={48} className="text-brand-lightGreen mb-6" />,
    title: 'Installatietechniek',
    description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
    features: [
      'Elektra aanleggen of vernieuwen',
      'Groepenkast vervangen of uitbreiden',
      'Water- en gasleidingen aanleggen of vervangen',
      'Badkamer en toilet installaties',
      'Vloerverwarming aanleggen',
      'Domotica en slimme huisinstallaties'
    ],
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.1&auto=format&fit=crop&w=2069&q=80'
  },
  {
    id: 'aan-en-verbouw',
    icon: <Building size={48} className="text-brand-lightGreen mb-6" />,
    title: 'Aan- en verbouw',
    description: 'Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning.',
    features: [
      'Uitbouwen en aanbouwen realiseren',
      'Dakkapellen en dakopbouwen',
      'Muren doorbreken en dragende constructies',
      'Garage ombouwen tot woonruimte',
      'Indeling van woning wijzigen',
      'Funderingsherstel'
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2071&q=80'
  },
  {
    id: 'pvc-vloeren',
    icon: <SquareGanttChart size={48} className="text-brand-lightGreen mb-6" />,
    title: 'PVC Vloeren',
    description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
    features: [
      'PVC vloeren in diverse dessins en kwaliteiten',
      'Egaliseren van ondervloeren',
      'Vloerverwarming geschikte PVC vloeren',
      'Click PVC en vaste PVC vloeren',
      'Onderhoud en reparatie van PVC vloeren',
      'Verwijderen van oude vloerbedekking'
    ],
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2787&q=80'
  }
];

const DienstenPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Onze Diensten</h1>
            <p className="text-xl max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Bij Refurbish Totaal Nederland bieden wij een breed scala aan renovatie- en verbouwdiensten,
              uitgevoerd door ervaren vakmensen met oog voor detail.
            </p>
          </div>
        </section>

        {/* Diensten Overzicht */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            {diensten.map((dienst, index) => (
              <div key={dienst.id} id={dienst.id} className="mb-24 last:mb-0">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12`}>
                  <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <img 
                      src={dienst.image} 
                      alt={dienst.title} 
                      className="rounded-lg shadow-lg object-cover w-full h-96 hover-lift"
                    />
                  </div>
                  <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center mb-4">
                      <div className="animate-float">{dienst.icon}</div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-brand-darkGreen">{dienst.title}</h2>
                    <p className="text-lg text-gray-700 mb-6">{dienst.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen">Wat wij bieden:</h3>
                    <ul className="space-y-3 mb-8">
                      {dienst.features.map((feature, i) => (
                        <li key={i} className="flex items-start animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.4}s` }}>
                          <Check className="h-5 w-5 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to="/offerte" 
                      className="btn-primary hover:animate-pulse inline-block"
                    >
                      Offerte Aanvragen
                    </Link>
                  </div>
                </div>
                {index < diensten.length - 1 && (
                  <Separator className="my-12 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DienstenPage;
