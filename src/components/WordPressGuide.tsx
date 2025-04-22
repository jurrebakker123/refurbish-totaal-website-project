
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, FileCode, Laptop, Download, Globe } from 'lucide-react';
import { Button } from './ui/button';

const WordPressGuide = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-darkGreen mb-6">Website Koppelen aan WordPress CMS - Eenvoudige Handleiding</h2>
      
      <div className="space-y-8">
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
          <p className="text-lg text-green-800">
            Deze handleiding legt uit hoe je WordPress als CMS (Content Management Systeem) kunt gebruiken om de teksten van je website eenvoudig te beheren.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-brand-darkGreen flex items-center gap-2">
            <Laptop className="h-6 w-6" />
            Stap 1: WordPress Installatie
          </h3>
          <div className="ml-8 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">WordPress hosting opzetten</p>
                <p className="text-gray-600">WPFIXIT zorgt voor een snelle en veilige WordPress omgeving die alleen voor contentbeheer wordt gebruikt.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Headless WordPress configureren</p>
                <p className="text-gray-600">WPFIXIT installeert de benodigde plugins en stelt de API in voor contentbeheer.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-brand-darkGreen flex items-center gap-2 mt-8">
            <FileCode className="h-6 w-6" />
            Stap 2: Content Types Instellen
          </h3>
          <div className="ml-8 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Diensten content type</p>
                <p className="text-gray-600">Er wordt een speciaal content type gemaakt voor het beheren van alle dienstenpagina's.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Custom velden inrichten</p>
                <p className="text-gray-600">Voor elke dienst komen er velden voor titel, beschrijving, features, voordelen en veel gestelde vragen.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-brand-darkGreen flex items-center gap-2 mt-8">
            <Download className="h-6 w-6" />
            Stap 3: Content Overzetten
          </h3>
          <div className="ml-8 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Content migreren</p>
                <p className="text-gray-600">Alle bestaande teksten worden overgezet naar het nieuwe WordPress CMS.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Content testen</p>
                <p className="text-gray-600">We controleren of alle content correct wordt weergegeven op de website.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-brand-darkGreen flex items-center gap-2 mt-8">
            <Globe className="h-6 w-6" />
            Stap 4: Website Koppelen
          </h3>
          <div className="ml-8 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">API koppeling</p>
                <p className="text-gray-600">De website wordt gekoppeld aan de WordPress API voor dynamische content.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Training</p>
                <p className="text-gray-600">U krijgt een uitgebreide training voor het beheren van de content via WordPress.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-brand-darkGreen/5 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-3">Hulp nodig?</h3>
          <p className="mb-4">
            WPFIXIT kan u helpen met:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>WordPress als headless CMS installeren</li>
            <li>Content types en velden inrichten</li>
            <li>Content migratie naar WordPress</li>
            <li>API koppeling met de website</li>
            <li>WordPress training en ondersteuning</li>
            <li>Doorlopende technische support</li>
          </ul>
          <Button className="bg-brand-darkGreen hover:bg-brand-darkGreen/90">
            Contact WPFIXIT Support
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordPressGuide;
