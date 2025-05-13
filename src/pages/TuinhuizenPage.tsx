
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TuinhuizenHero } from '@/components/tuinhuizen/TuinhuizenHero';
import { TuinhuizenFeatures } from '@/components/tuinhuizen/TuinhuizenFeatures';
import { TuinhuizenCTA } from '@/components/tuinhuizen/TuinhuizenCTA';
import { TuinhuizenContact } from '@/components/tuinhuizen/TuinhuizenContact';
import { TuinhuizenGallery } from '@/components/tuinhuizen/TuinhuizenGallery';
import { Helmet } from 'react-helmet';

const TuinhuizenPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Tuinhuisbouwer.nl | Premium Tuinhuizen op Maat</title>
        <meta name="description" content="Specialist in hoogwaardige tuinhuizen, overkappingen en buitenverblijven. Vakmanschap, kwaliteit en persoonlijke service voor uw droomtuinhuis." />
        <meta name="keywords" content="tuinhuis, overkapping, buitenverblijf, tuinverblijf, douglas hout, maatwerk tuinhuis" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Tuinhuisbouwer.nl",
            "url": "https://www.refurbishtotaalnederland.nl/tuinhuisbouwer",
            "provider": {
              "@type": "Organization",
              "name": "Refurbish Totaal Nederland",
              "url": "https://www.refurbishtotaalnederland.nl"
            },
            "description": "Specialist in hoogwaardige tuinhuizen, overkappingen en buitenverblijven. Vakmanschap, kwaliteit en persoonlijke service voor uw droomtuinhuis.",
            "areaServed": "Nederland"
          })}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <TuinhuizenHero />
        <TuinhuizenFeatures />
        <TuinhuizenGallery />
        <TuinhuizenCTA />
        <TuinhuizenContact />
      </main>
      <Footer />
    </div>
  );
};

export default TuinhuizenPage;
