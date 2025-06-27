
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StukadoorConfigurator from '@/components/stukadoor/configurator/StukadoorConfigurator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

const StukadoorConfiguratorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Stucwerk Configurator | Refurbish Totaal Nederland</title>
        <meta name="description" content="Configureer uw stucwerk project. Bereken de kosten van glad stucwerk, spachtelputz en decoratief stucwerk." />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <StukadoorConfigurator />
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default StukadoorConfiguratorPage;
