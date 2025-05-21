
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BouwhulpHero } from '@/components/bouwhulp/BouwhulpHero';
import { BouwhulpFeatures } from '@/components/bouwhulp/BouwhulpFeatures';
import { BouwhulpServices } from '@/components/bouwhulp/BouwhulpServices';
import { BouwhulpTestimonials } from '@/components/bouwhulp/BouwhulpTestimonials';
import { BouwhulpCTA } from '@/components/bouwhulp/BouwhulpCTA';

const BouwhulpPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if we're on the dedicated domain
  const isDedicatedDomain = 
    window.location.hostname === 'refurbishbouwhulp.nl' || 
    window.location.hostname === 'www.refurbishbouwhulp.nl';

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Refurbish Bouwhulp | Professionele Klusdiensten en Onderhoud</title>
        <meta name="description" content="Voor al uw bouwprojecten: van kleine klussen tot complete renovaties. Ervaren vakmensen, scherpe tarieven en persoonlijke aanpak." />
        <meta name="keywords" content="bouwhulp, klusdiensten, renovatie, onderhoud, bouwbegeleiding, verbouwing, aannemer" />
        <link rel="canonical" href={isDedicatedDomain ? "https://www.refurbishbouwhulp.nl/" : "https://www.refurbishtotaalnederland.nl/refurbishbouwhulp/"} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Refurbish Bouwhulp",
            "url": isDedicatedDomain ? "https://www.refurbishbouwhulp.nl/" : "https://www.refurbishtotaalnederland.nl/refurbishbouwhulp/",
            "provider": {
              "@type": "Organization",
              "name": "Refurbish Totaal Nederland",
              "url": "https://www.refurbishtotaalnederland.nl"
            },
            "description": "Professionele bouwhulp voor particulieren en bedrijven. Klusdiensten, renovatie, onderhoud en bouwbegeleiding.",
            "areaServed": "Nederland"
          })}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <BouwhulpHero />
        <BouwhulpFeatures />
        <BouwhulpServices />
        <BouwhulpTestimonials />
        <BouwhulpCTA />
      </main>
      <Footer />
    </div>
  );
};

export default BouwhulpPage;
