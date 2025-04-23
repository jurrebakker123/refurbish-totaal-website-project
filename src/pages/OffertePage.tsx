
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OfferteForm } from '@/components/offerte/OfferteForm';
import { OfferteHero } from '@/components/offerte/OfferteHero';

const OffertePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
