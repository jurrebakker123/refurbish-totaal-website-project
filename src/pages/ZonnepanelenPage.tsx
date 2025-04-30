
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ZonnepanelenHero } from '@/components/zonnepanelen/ZonnepanelenHero';
import { ZonnepanelenFeatures } from '@/components/zonnepanelen/ZonnepanelenFeatures';
import { ZonnepanelenVoordelen } from '@/components/zonnepanelen/ZonnepanelenVoordelen';
import { ZonnepanelenContact } from '@/components/zonnepanelen/ZonnepanelenContact';
import { ZonnepanelenCTA } from '@/components/zonnepanelen/ZonnepanelenCTA';

const ZonnepanelenPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ZonnepanelenHero />
        <ZonnepanelenFeatures />
        <ZonnepanelenVoordelen />
        <ZonnepanelenContact />
        <ZonnepanelenCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ZonnepanelenPage;
