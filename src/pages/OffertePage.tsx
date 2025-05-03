
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OfferteHero } from '@/components/offerte/OfferteHero';
import { Helmet } from 'react-helmet';
import ReusableForm from '@/components/common/ReusableForm';

const OffertePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Offerte Aanvraag - Refurbish Totaal Nederland</title>
        <meta name="description" content="Vraag een vrijblijvende offerte aan voor uw bouw- of renovatieproject bij Refurbish Totaal Nederland." />
      </Helmet>
      <Header />
      <main className="flex-grow pt-32">
        <OfferteHero />
        
        {/* Simpel Offerte Formulier */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <ReusableForm 
              title="Offerte Aanvraagformulier"
              description="Wij nemen zo snel mogelijk contact met u op om uw wensen te bespreken."
              showFileUpload={true}
              templateId="template_ezfzaao"
              buttonText="Verstuur aanvraag"
              showServiceInput={true}
              showDateField={true}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffertePage;
