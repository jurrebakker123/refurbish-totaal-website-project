import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import CallToActionSection from '@/components/CallToActionSection';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section met aangepaste achtergrond en titel */}
        <section className="relative text-white py-16">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1587614297882-0943c9700ef8?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-80"></div>
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Contact</h1>
              <p className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Heeft u vragen of wilt u een afspraak maken? Neem gerust contact met ons op. Wij staan voor u klaar.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Contactgegevens</h2>
                <p className="text-lg text-gray-700 mb-8">
                  U kunt contact met ons opnemen via onderstaande gegevens of door het contactformulier in te vullen. 
                  Wij streven ernaar binnen 24 uur te reageren op uw bericht.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start hover:text-brand-darkGreen transition-colors">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Telefoonnummer</h3>
                      <a href="tel:+31630136079" className="text-gray-700">085 4444 255</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">E-mailadres</h3>
                      <a href="mailto:info@refurbishtotaalnederland.nl" className="text-gray-700 hover:text-brand-darkGreen">info@refurbishtotaalnederland.nl</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Adres</h3>
                      <a href="https://maps.google.com/?q=Niersweg+27,+6591+CT+Gennep" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-brand-darkGreen">
                        Niersweg 27<br />6591 CT Gennep
                      </a>
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
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-brand-lightGreen/10 p-4 w-12 h-12 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Locatie</h3>
                      <p className="text-gray-700">
                        Niersweg 27<br />6591 CT Gennep<br />Postbus 61, 6650 AB Druten
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white p-8 rounded-lg shadow-lg hover-lift">
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Stuur ons een bericht</h2>
                  <form action="mailto:info@refurbishtotaalnederland.nl" method="post" encType="text/plain">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name"
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
                          name="email"
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
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        placeholder="+31 6 12345678"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Onderwerp *</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        placeholder="Onderwerp van uw bericht"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Bericht *</label>
                      <textarea 
                        id="message" 
                        name="message"
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
                  U kunt een offerte aanvragen via onze website door naar de pagina <a href="/offerte" className="text-brand-darkGreen hover:underline">Offerte Aanvragen</a> te gaan, of door direct contact met ons op te nemen via telefoon of e-mail. Wij zullen binnen 24 uur contact met u opnemen om uw wensen te bespreken.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Werken jullie door heel Nederland?</h3>
                <p className="text-gray-700">
                  Ja, wij voeren projecten uit door heel Nederland. Voor sommige kleinere projecten kan er wel een minimumbedrag gelden voor regio's buiten de Randstad. Neem <a href="/contact" className="text-brand-darkGreen hover:underline">contact</a> met ons op voor meer informatie.
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
