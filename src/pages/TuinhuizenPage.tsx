
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TuinhuizenHero } from '@/components/tuinhuizen/TuinhuizenHero';
import { TuinhuizenFeatures } from '@/components/tuinhuizen/TuinhuizenFeatures';
import { TuinhuizenCTA } from '@/components/tuinhuizen/TuinhuizenCTA';
import { TuinhuizenContact } from '@/components/tuinhuizen/TuinhuizenContact';

const TuinhuizenPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <TuinhuizenHero />
        <TuinhuizenFeatures />
        <TuinhuizenContact />
        <TuinhuizenCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TuinhuizenPage;
