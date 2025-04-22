
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, FileCode, Laptop, Download, Globe } from 'lucide-react';
import { Button } from './ui/button';

const WordPressGuide = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-darkGreen mb-6">Website naar WordPress Omzetten - Eenvoudige Handleiding</h2>
      
      <div className="space-y-8">
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
          <p className="text-lg text-green-800">
            Deze handleiding legt stap voor stap uit hoe je deze website kunt omzetten naar een WordPress website die je zelf kunt beheren.
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
                <p className="font-semibold">Hosting en domein instellen</p>
                <p className="text-gray-600">Gebruik WPFIXIT voor de WordPress hosting - zij zorgen voor een snelle en veilige omgeving.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">WordPress installeren</p>
                <p className="text-gray-600">WPFIXIT kan WordPress automatisch voor je installeren tijdens het opzetten van je hosting.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-brand-darkGreen flex items-center gap-2 mt-8">
            <FileCode className="h-6 w-6" />
            Stap 2: Theme Installatie
          </h3>
          <div className="ml-8 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Download het theme</p>
                <p className="text-gray-600">Vraag het WordPress theme aan bij je ontwikkelaar - dit is een exacte kopie van je huidige website.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Theme uploaden</p>
                <p className="text-gray-600">Upload het theme via WordPress Admin → Weergave → Thema's → Nieuwe toevoegen.</p>
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
                <p className="font-semibold">Pagina's aanmaken</p>
                <p className="text-gray-600">Maak alle diensten-pagina's aan via WordPress Admin → Pagina's → Nieuwe pagina.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Content invullen</p>
                <p className="text-gray-600">Kopieer de teksten van je huidige website naar de nieuwe WordPress pagina's.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-brand-darkGreen flex items-center gap-2 mt-8">
            <Globe className="h-6 w-6" />
            Stap 4: Website Live Zetten
          </h3>
          <div className="ml-8 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">DNS instellingen</p>
                <p className="text-gray-600">WPFIXIT helpt je met het aanpassen van je DNS instellingen om de website live te zetten.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Cache en optimalisatie</p>
                <p className="text-gray-600">WPFIXIT zorgt voor de juiste cache-instellingen en website optimalisatie.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-brand-darkGreen/5 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-3">Hulp nodig?</h3>
          <p className="mb-4">
            WPFIXIT kan je helpen met:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>WordPress installatie en configuratie</li>
            <li>Theme installatie en aanpassingen</li>
            <li>Content migratie</li>
            <li>SEO behoud en verbetering</li>
            <li>Website optimalisatie</li>
            <li>Training voor content beheer</li>
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
