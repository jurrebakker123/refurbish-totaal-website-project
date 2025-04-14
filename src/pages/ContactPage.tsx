
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Neem Contact Met Ons Op</h1>
              <p className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Heeft u vragen of wilt u een afspraak maken? Neem gerust contact met ons op. Wij staan voor u klaar.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Contactgegevens</h2>
                <p className="text-lg text-gray-700 mb-8">
                  U kunt contact met ons opnemen via onderstaande gegevens of door het contactformulier in te vullen. 
                  Wij streven ernaar binnen 24 uur te reageren op uw bericht.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Telefoonnummer</h3>
                      <p className="text-gray-700">020-123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">E-mailadres</h3>
                      <p className="text-gray-700">info@refurbishtotaal.nl</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Adres</h3>
                      <p className="text-gray-700">Exempelstraat 123<br />1234 AB Amsterdam</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Openingstijden</h3>
                      <p className="text-gray-700">Maandag t/m vrijdag: 08:00 - 17:00<br />Zaterdag & zondag: gesloten</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="rounded-lg overflow-hidden shadow-md h-80 hover-lift">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155959.1524697383!2d4.763875!3d52.354951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c63fb5949a7755%3A0x6600fd4cb7c0af8d!2sAmsterdam!5e0!3m2!1sen!2snl!4v1694078711567!5m2!1sen!2snl" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locatie Refurbish Totaal Nederland"
                  ></iframe>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white p-8 rounded-lg shadow-lg hover-lift">
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Stuur ons een bericht</h2>
                  <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                          placeholder="Uw naam"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                          placeholder="uw@email.nl"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        placeholder="06-12345678"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Onderwerp *</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        placeholder="Onderwerp van uw bericht"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Bericht *</label>
                      <textarea 
                        id="message" 
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        placeholder="Typ hier uw bericht..."
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Verstuur Bericht
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen animate-fade-in">Veelgestelde Vragen</h2>
              <p className="text-lg text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Hieronder vindt u antwoorden op de meest gestelde vragen. Staat uw vraag er niet tussen? Neem dan gerust contact met ons op.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Hoe vraag ik een offerte aan?</h3>
                <p className="text-gray-700">
                  U kunt een offerte aanvragen via onze website door naar de pagina 'Offerte Aanvragen' te gaan, of door direct contact met ons op te nemen via telefoon of e-mail. Wij zullen binnen 24 uur contact met u opnemen om uw wensen te bespreken.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Werken jullie door heel Nederland?</h3>
                <p className="text-gray-700">
                  Ja, wij voeren projecten uit door heel Nederland. Voor sommige kleinere projecten kan er wel een minimumbedrag gelden voor regio's buiten de Randstad. Neem contact met ons op voor meer informatie.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Bieden jullie garantie op de werkzaamheden?</h3>
                <p className="text-gray-700">
                  Zeker! Wij bieden garantie op al onze werkzaamheden. De exacte garantietermijn is afhankelijk van het type project en de gebruikte materialen. Dit wordt vooraf duidelijk vermeld in onze offerte.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Kan ik zelf materialen aanschaffen of werken jullie alleen met eigen materialen?</h3>
                <p className="text-gray-700">
                  Wij zijn flexibel hierin. U kunt ervoor kiezen om zelf materialen aan te schaffen, of wij kunnen dit voor u verzorgen. Bij eigen aanschaf van materialen kunnen wij uiteraard advies geven over de benodigde kwaliteit en hoeveelheden.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
