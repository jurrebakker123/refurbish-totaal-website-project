
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IsolatieHero from '@/components/isolatie/IsolatieHero';
import IsolatieFeatures from '@/components/isolatie/IsolatieFeatures';
import IsolatiePartners from '@/components/isolatie/IsolatiePartners';
import IsolatieFAQ from '@/components/isolatie/IsolatieFAQ';
import IsolatieContact from '@/components/isolatie/IsolatieContact';
import IsolatieBenefits from '@/components/isolatie/IsolatieBenefits';

const IsolatieSelectiePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track page view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: window.location.pathname,
          title: 'Isolatie Selectie'
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Isolatie Selectie | Verduurzaam uw woning met professionele isolatie</title>
        <meta name="description" content="Bespaar tot 60% op uw energierekening met professionele woningisolatie. Vrijblijvend advies en een scherpe offerte via Isolatie Selectie." />
        <meta name="keywords" content="isolatie, woningisolatie, spouwmuurisolatie, dakisolatie, vloerisolatie, energiebesparing, verduurzaming" />
        <link rel="canonical" href="https://www.refurbishtotaalnederland.nl/isolatie-selectie" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Isolatie Selectie",
            "url": "https://www.refurbishtotaalnederland.nl/isolatie-selectie",
            "provider": {
              "@type": "Organization",
              "name": "Refurbish Totaal Nederland",
              "url": "https://www.refurbishtotaalnederland.nl"
            },
            "description": "Professionele isolatieoplossingen voor woningen met energiebesparing tot 60%. Spouwmuurisolatie, dakisolatie, vloerisolatie en glasisolatie.",
            "areaServed": "Nederland"
          })}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <IsolatieHero />
        <IsolatieBenefits />
        <IsolatieFeatures />
        <IsolatiePartners />
        <IsolatieFAQ />
        <IsolatieContact />
      </main>
      <Footer />
    </div>
  );
};

export default IsolatieSelectiePage;
