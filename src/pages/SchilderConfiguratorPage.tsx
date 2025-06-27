
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchilderConfigurator from '@/components/schilder/configurator/SchilderConfigurator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

const SchilderConfiguratorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Schilderwerk Configurator | Refurbish Totaal Nederland</title>
        <meta name="description" content="Configureer uw schilderwerk project. Bereken de kosten van binnen- en buitenschilderwerk met onze handige configurator." />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <SchilderConfigurator />
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default SchilderConfiguratorPage;
