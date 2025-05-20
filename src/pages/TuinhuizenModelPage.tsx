
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GardenHouseExporter } from '@/components/tuinhuizen/3d/GardenHouseExporter';
import { Helmet } from 'react-helmet';

const TuinhuizenModelPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>3D Model Tuinhuis | Tuinhuisbouwer.nl</title>
        <meta name="description" content="Bekijk en download ons 3D tuinhuis model als GLB bestand." />
      </Helmet>
      
      <Header />
      <main className="flex-grow container py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-brand-darkGreen">Tuinhuis 3D Model</h1>
        <p className="text-lg mb-8">
          Hieronder kunt u ons tuinhuis in 3D bekijken en als GLB-bestand exporteren. Draai, zoom en beweeg het model met uw muis om het vanuit alle hoeken te bekijken.
        </p>
        
        <div className="mb-6">
          <GardenHouseExporter />
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-4">Wat is een GLB bestand?</h2>
          <p className="mb-4">
            Een GLB bestand is een 3D model formaat dat gebruikt kan worden in veel 3D toepassingen, augmented reality apps, en websites die 3D visualisatie ondersteunen.
          </p>
          <p>
            U kunt het geëxporteerde model gebruiken om:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Het model in uw eigen tuin te visualiseren (met AR apps)</li>
            <li>Het te importeren in 3D ontwerpsoftware</li>
            <li>Het te delen met anderen die het model willen bekijken</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TuinhuizenModelPage;
