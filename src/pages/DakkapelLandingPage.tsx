
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelHero } from '@/components/dakkapel/DakkapelHero';
import { DakkapelVoordelen } from '@/components/dakkapel/DakkapelVoordelen';
import { DakkapelProcess } from '@/components/dakkapel/DakkapelProcess';
import { DakkapelTypes } from '@/components/dakkapel/DakkapelTypes';
import { DakkapelGallery } from '@/components/dakkapel/DakkapelGallery';
import { DakkapelFAQ } from '@/components/dakkapel/DakkapelFAQ';
import { DakkapelCTA } from '@/components/dakkapel/DakkapelCTA';
import { DakkapelSolarProducts } from '@/components/dakkapel/DakkapelSolarProducts';
import { Helmet } from 'react-helmet';

const DakkapelLandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if we're on the dedicated domain
  const isDedicatedDomain = 
    window.location.hostname === 'refurbishdakkapel.nl' || 
    window.location.hostname === 'www.refurbishdakkapel.nl';

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Refurbish Dakkapel | Professionele Dakkapellen op Maat</title>
        <meta name="description" content="Vergroot uw woonruimte met een kwalitatieve dakkapel. Compleet verzorgd met 10 jaar garantie door Refurbish Totaal Nederland." />
        <meta name="keywords" content="dakkapel, dakkapel op maat, prefab dakkapel, dakkapel plaatsen, dakkapel kosten, dakkapel renoveren" />
        <link rel="canonical" href={isDedicatedDomain ? "https://www.refurbishdakkapel.nl/" : "https://www.refurbishtotaalnederland.nl/refurbishdakkapel/"} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Refurbish Dakkapel",
            "url": isDedicatedDomain ? "https://www.refurbishdakkapel.nl/" : "https://www.refurbishtotaalnederland.nl/refurbishdakkapel/",
            "provider": {
              "@type": "Organization",
              "name": "Refurbish Totaal Nederland",
              "url": "https://www.refurbishtotaalnederland.nl"
            },
            "description": "Professionele dakkapellen op maat, prefab dakkapellen en renovatie van bestaande dakkapellen. Compleet verzorgd met 10 jaar garantie.",
            "areaServed": "Nederland"
          })}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <DakkapelHero />
        <DakkapelVoordelen />
        <DakkapelTypes />
        <DakkapelProcess />
        <DakkapelGallery />
        <DakkapelSolarProducts />
        <DakkapelFAQ />
        <DakkapelCTA />
      </main>
      <Footer />
    </div>
  );
};

export default DakkapelLandingPage;
