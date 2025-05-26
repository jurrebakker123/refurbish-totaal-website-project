import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { 
  Brush, Home, Construction, Wrench, Building, SquareGanttChart, 
  Check, Wallpaper, Shield, Thermometer
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CallToActionSection from '@/components/CallToActionSection';
import { OptimizedImage } from '@/components/ui/optimized-image';

const diensten = [{
  id: 'kozijntechniek',
  icon: <Shield size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Kozijntechniek',
  description: 'Bij Refurbish Totaal Nederland verzorgen wij het vervangen, herstellen en plaatsen van kozijnen met vakmanschap en oog voor detail. Of het nu gaat om hout, kunststof of aluminium kozijnen, wij leveren maatwerkoplossingen die passen bij de stijl van uw woning en bijdragen aan energiezuinigheid en comfort.',
  features: ['Vakkundige demontage en plaatsing van kozijnen', 'Inmeten en leveren van maatwerk kozijnen (nieuwbouw of renovatie)', 'Toepassing van hoogwaardige isolatieglas-systemen (HR++, triple)', 'Herstel van houtrot of het moderniseren van bestaande kozijnen', 'Integratie van ventilatieroosters en zonwering indien gewenst', 'Perfecte afwerking, zowel binnen als buiten'],
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.1&auto=format&fit=crop&w=2080&q=80'
}, {
  id: 'isolatietechniek',
  icon: <Thermometer size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Isolatietechniek',
  description: 'Energie besparen begint bij goede isolatie. Refurbish Totaal Nederland biedt doeltreffende isolatieoplossingen voor woningen en bedrijfspanden die comfort verhogen en energiekosten verlagen. Onze aanpak is technisch onderbouwd, duurzaam en afgestemd op uw situatie.',
  features: ['Spouwmuurisolatie met hoogwaardige inblaas- of schuimisolatie', 'Vloerisolatie met drukvaste isolatieplaten of gespoten schuim', 'Dak- en zolderisolatie (aan de binnen- of buitenzijde)', 'Isolatie van dakkapellen, uitbouwen en houten vloeren', 'Thermografische inspecties en advies op maat', 'Erkende producten en systemen zoals het ATI Pro Isolatie Systeem'],
  image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
}, {
  id: 'dakkapel',
  icon: <Home size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Dakkapel',
  description: 'Professionele plaatsing en renovatie van dakkapellen voor meer ruimte en licht in uw woning.',
  features: ['Ontwerp en plaatsing van nieuwe dakkapellen', 'Renovatie en isolatie van bestaande dakkapellen', 'Diverse stijlen en afwerkingsmogelijkheden', 'Compleet met dakbedekking en zinkwerk', 'Snelle en efficiënte plaatsing', 'Garantie op materialen en werkzaamheden'],
  image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
}, {
  id: 'schilderwerk',
  icon: <Brush size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Schilderwerk',
  description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
  features: ['Buitenschilderwerk voor gevels, kozijnen en deuren', 'Binnenschilderwerk voor wanden, plafonds en trappen', 'Kleuradvies en verfkeuze op maat', 'Houtrotherstel en reparaties', 'Graffiti verwijdering', 'Behang- en spuitwerk'],
  image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
}, {
  id: 'dakrenovatie',
  icon: <Home size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Dakrenovatie',
  description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
  features: ['Vernieuwen van dakbedekking (pannen, leien, bitumen)', 'Isolatie van hellende en platte daken', 'Dakkapellen plaatsen of renoveren', 'Dakgoten repareren of vervangen', 'Lood- en zinkwerk vernieuwen', 'Velux dakramen plaatsen'],
  image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
}, {
  id: 'stukadoren',
  icon: <Construction size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Stukadoren',
  description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
  features: ['Gladpleisterwerk voor wanden en plafonds', 'Renovatiestucwerk bij scheuren en beschadigingen', 'Sierlijsten en ornamenten aanbrengen', 'Spachtelputz en structuurwerk', 'Venetiaans stucwerk en tadelakt', 'Betonlook wanden en vloeren'],
  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2071&q=80'
}, {
  id: 'installatietechniek',
  icon: <Wrench size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Installatietechniek',
  description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
  features: ['Elektra aanleggen of vernieuwen', 'Groepenkast vervangen of uitbreiden', 'Water- en gasleidingen aanleggen of vervangen', 'Badkamer en toilet installaties', 'Vloerverwarming aanleggen', 'Domotica en slimme huisinstallaties'],
  image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.1&auto=format&fit=crop&w=2069&q=80'
}, {
  id: 'aan-en-verbouw',
  icon: <Building size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Aan- en verbouw',
  description: 'Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning.',
  features: ['Uitbouwen en aanbouwen realiseren', 'Dakkapellen en dakopbouwen', 'Muren doorbreken en dragende constructies', 'Garage ombouwen tot woonruimte', 'Indeling van woning wijzigen', 'Funderingsherstel'],
  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2071&q=80'
}, {
  id: 'behangen',
  icon: <Wallpaper size={48} className="text-brand-lightGreen mb-6" />,
  title: 'Behangen',
  description: 'Professioneel behangwerk met oog voor detail en een perfect eindresultaat.',
  features: ['Behang verwijderen en ondergrond voorbereiden', 'Aanbrengen van luxe behang en wandbekleding', 'Fotobehang op maat', 'Vliesbehang en traditioneel behang', 'Textiel- en vinylbehang', 'Reparatie van bestaand behangwerk'],
  image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
}, {
  id: 'pvc-vloeren',
  icon: <SquareGanttChart size={48} className="text-brand-lightGreen mb-6" />,
  title: 'PVC Vloeren',
  description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
  features: ['PVC vloeren in diverse dessins en kwaliteiten', 'Egaliseren van ondervloeren', 'Vloerverwarming geschikte PVC vloeren', 'Click PVC en vaste PVC vloeren', 'Onderhoud en reparatie van PVC vloeren', 'Verwijderen van oude vloerbedekking'],
  image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
}];

const DienstenPage = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        <section className="relative text-white py-16">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.1&auto=format&fit=crop&w=2069&q=80')`
        }}>
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
          </div>
          <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Onze Diensten</h1>
            <p className="text-xl max-w-3xl mx-auto animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              Bij Refurbish Totaal Nederland bieden wij een breed scala aan renovatie- en verbouwdiensten,
              uitgevoerd door ervaren vakmensen met oog voor detail.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container">
            {diensten.map((dienst, index) => <div key={dienst.id} id={dienst.id} className="mb-24 last:mb-0">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12`}>
                  <div className="lg:w-1/2 animate-fade-in" style={{
                animationDelay: '0.2s'
              }}>
                    <div className="rounded-lg shadow-lg overflow-hidden">
                      <OptimizedImage 
                        src={dienst.image} 
                        alt={dienst.title} 
                        className="w-full h-96 object-cover transition-transform hover:scale-105 duration-300" 
                        fallbackSrc="/placeholder.svg"
                      />
                    </div>
                  </div>
                  <div className="lg:w-1/2 animate-fade-in" style={{
                animationDelay: '0.3s'
              }}>
                    <div className="flex items-center mb-4">
                      <div className="animate-float">{dienst.icon}</div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-brand-darkGreen">{dienst.title}</h2>
                    <p className="text-lg text-gray-700 mb-6">{dienst.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen">Wat wij bieden:</h3>
                    <ul className="space-y-3 mb-8">
                      {dienst.features.map((feature, i) => <li key={i} className="flex items-start animate-fade-in" style={{
                    animationDelay: `${i * 0.1 + 0.4}s`
                  }}>
                          <Check className="h-5 w-5 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>)}
                    </ul>
                    
                    <Link to={`/diensten/${dienst.id}`} className="btn-primary hover:animate-pulse inline-block mr-4">
                      Meer Informatie
                    </Link>
                    <Link to="/offerte" className="btn-outline border-brand-darkGreen text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white inline-block">
                      Offerte Aanvragen
                    </Link>
                  </div>
                </div>
                {index < diensten.length - 1 && <Separator className="my-12 bg-gray-200" />}
              </div>)}
          </div>
        </section>

        <CallToActionSection />
      </main>
      <Footer />
    </div>;
};

export default DienstenPage;
