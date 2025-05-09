
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ZonnepanelenHero } from '@/components/zonnepanelen/ZonnepanelenHero';
import { ZonnepanelenFeatures } from '@/components/zonnepanelen/ZonnepanelenFeatures';
import { ZonnepanelenVoordelen } from '@/components/zonnepanelen/ZonnepanelenVoordelen';
import { ZonnepanelenContact } from '@/components/zonnepanelen/ZonnepanelenContact';
import { ZonnepanelenCTA } from '@/components/zonnepanelen/ZonnepanelenCTA';
import { DakkapelSolarProducts } from '@/components/dakkapel/DakkapelSolarProducts';
import { Helmet } from 'react-helmet';
import { CartProvider } from '@/context/CartContext';
import ShoppingCartIcon from '@/components/common/ShoppingCartIcon';

const ZonnepanelenPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if we're on the dedicated domain
  const isDedicatedDomain = 
    window.location.hostname === 'refurbishzonnepanelen.nl' || 
    window.location.hostname === 'www.refurbishzonnepanelen.nl';

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Refurbish Zonnepanelen | Duurzame Energie Oplossingen</title>
          <meta name="description" content="Bespaar op uw energierekening met kwalitatieve zonnepanelen. Compleet verzorgd met installatie en garantie door Refurbish Totaal Nederland." />
          <meta name="keywords" content="zonnepanelen, zonnepanelen installatie, zonnepanelen kosten, zonnepanelen kopen, duurzame energie, groene stroom" />
          <link rel="canonical" href={isDedicatedDomain ? "https://www.refurbishzonnepanelen.nl/" : "https://www.refurbishtotaalnederland.nl/refurbishzonnepanelen/"} />
          
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Refurbish Zonnepanelen",
              "url": isDedicatedDomain ? "https://www.refurbishzonnepanelen.nl/" : "https://www.refurbishtotaalnederland.nl/refurbishzonnepanelen/",
              "provider": {
                "@type": "Organization",
                "name": "Refurbish Totaal Nederland",
                "url": "https://www.refurbishtotaalnederland.nl"
              },
              "description": "Professionele installatie van zonnepanelen voor woningen en bedrijven. Compleet verzorgd met garantie en service.",
              "areaServed": "Nederland"
            })}
          </script>
        </Helmet>
        
        <Header />
        <div className="fixed top-20 right-4 z-50">
          <ShoppingCartIcon />
        </div>
        <main className="flex-grow">
          <ZonnepanelenHero />
          <ZonnepanelenFeatures />
          <ZonnepanelenVoordelen />
          <DakkapelSolarProducts />
          <ZonnepanelenContact />
          <ZonnepanelenCTA />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default ZonnepanelenPage;
