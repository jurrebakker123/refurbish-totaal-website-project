
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, ArrowRight, Database, Globe, Code, FileCode, Server } from 'lucide-react';

const WordPressGuide = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-brand-darkGreen mb-6">Hoe deze website naar WordPress migreren</h2>
      
      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Belangrijk om te weten</h3>
              <p className="text-gray-700">
                Deze website is gebouwd met React, een JavaScript framework dat anders werkt dan WordPress. 
                Een directe migratie is niet mogelijk, maar er zijn verschillende methoden om de site toch naar WordPress te verplaatsen.
              </p>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-brand-darkGreen">Migratie Opties</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-lg mb-3 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-brand-lightGreen" />
              Optie 1: WordPress met Custom Theme
            </h4>
            <p className="text-gray-700 mb-4">
              Laat een WordPress ontwikkelaar een custom theme bouwen dat het uiterlijk van deze website nabootst.
            </p>
            <div className="mt-4">
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Volledig bewerkbaar in WordPress</span>
              </div>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Behoud van functionaliteit</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Optimale WordPress integratie</span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-lg mb-3 flex items-center">
              <Database className="h-5 w-5 mr-2 text-brand-lightGreen" />
              Optie 2: Headless WordPress
            </h4>
            <p className="text-gray-700 mb-4">
              Gebruik WordPress als CMS (backend) en behoud de React frontend, waarbij data uit WordPress wordt opgehaald.
            </p>
            <div className="mt-4">
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Behoud van moderne React frontend</span>
              </div>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Content beheer via WordPress</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <span>Technisch complexer</span>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-brand-darkGreen mt-8">Aanbevolen Methode: Custom WordPress Theme</h3>
        
        <ol className="space-y-6 mt-4">
          <li className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <div className="bg-brand-darkGreen text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</div>
              Neem contact op met een WordPress ontwikkelaar
            </h4>
            <p className="text-gray-700 pl-9">
              Zoek een ontwikkelaar met ervaring in het maken van custom WordPress themes, bij voorkeur iemand die bekend is met WPFIXIT.
            </p>
          </li>
          
          <li className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <div className="bg-brand-darkGreen text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</div>
              Deel de huidige website als referentie
            </h4>
            <p className="text-gray-700 pl-9">
              Geef de ontwikkelaar toegang tot deze website, zodat zij de stijl, layout en functionaliteiten kunnen analyseren en reproduceren.
            </p>
          </li>
          
          <li className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <div className="bg-brand-darkGreen text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</div>
              Exporteer en lever alle assets
            </h4>
            <p className="text-gray-700 pl-9">
              Stel alle afbeeldingen, logos, en content beschikbaar aan de ontwikkelaar voor de WordPress-migratie.
            </p>
          </li>
          
          <li className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <div className="bg-brand-darkGreen text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</div>
              Test grondig op een staging-omgeving
            </h4>
            <p className="text-gray-700 pl-9">
              Controleer of alle functionaliteiten correct werken voordat u de site live zet op uw WPFIXIT server.
            </p>
          </li>
          
          <li className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <div className="bg-brand-darkGreen text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">5</div>
              Live gaan en doorlopend onderhoud
            </h4>
            <p className="text-gray-700 pl-9">
              Na de lancering is het belangrijk om WordPress, plugins en themes regelmatig te updaten voor veiligheid en prestaties.
            </p>
          </li>
        </ol>
        
        <div className="mt-8 bg-brand-darkGreen/5 p-6 rounded-lg border border-brand-darkGreen/20">
          <h3 className="font-bold text-lg mb-3 text-brand-darkGreen flex items-center">
            <Server className="h-5 w-5 mr-2" />
            Contacteer WPFIXIT voor hulp
          </h3>
          <p className="mb-4">
            Het WPFIXIT team kan u mogelijk assisteren bij de migratie of u doorverwijzen naar WordPress-ontwikkelaars die bekend zijn met hun hosting-omgeving.
          </p>
          <p>
            <strong>Belangrijk:</strong> Behoud een backup van de huidige website als referentie, zelfs na de migratie naar WordPress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordPressGuide;
