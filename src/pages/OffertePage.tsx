
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OfferteForm } from '@/components/offerte/OfferteForm';
import { OfferteHero } from '@/components/offerte/OfferteHero';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const OffertePage = () => {
  // Initialize Uploadcare when component mounts
  useEffect(() => {
    // Add Uploadcare script dynamically
    const uploadcareScript = document.createElement('script');
    uploadcareScript.innerHTML = `UPLOADCARE_PUBLIC_KEY = '48d323acc8174b40046e';`;
    document.head.appendChild(uploadcareScript);

    const widgetScript = document.createElement('script');
    widgetScript.src = 'https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js';
    widgetScript.async = true;
    document.head.appendChild(widgetScript);

    return () => {
      // Clean up
      document.head.removeChild(uploadcareScript);
      if (document.head.contains(widgetScript)) {
        document.head.removeChild(widgetScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Offerte Aanvraag - Refurbish Totaal Nederland</title>
      </Helmet>
      <Header />
      <main className="flex-grow pt-32">
        <OfferteHero />
        
        {/* Contact Form Section */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Vul het formulier in</h2>
              <p className="mb-6 text-gray-600">
                Wij nemen zo snel mogelijk contact met u op om uw wensen te bespreken.
              </p>

              <OfferteForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffertePage;
