
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, CalendarDays, Percent, BadgeDollarSign, Clipboard, FileText } from 'lucide-react';

const OffertePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Vraag een Vrijblijvende Offerte Aan</h1>
              <p className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Vul onderstaand formulier in en ontvang binnen 48 uur een persoonlijke offerte voor uw project.
              </p>
            </div>
          </div>
        </section>

        {/* Offerte Form & Benefits */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Offerte Form */}
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white p-8 rounded-lg shadow-lg hover-lift">
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Offerte aanvraag</h2>
                  <form>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen">Persoonlijke gegevens</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                          <input 
                            type="text" 
                            id="name" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Uw volledige naam"
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
                    </div>

                    <div className="mb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer *</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="06-12345678"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam</label>
                          <input 
                            type="text" 
                            id="company" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Optioneel"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adres *</label>
                          <input 
                            type="text" 
                            id="address" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Straat en huisnummer"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                          <input 
                            type="text" 
                            id="zipcode" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="1234 AB"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Plaats *</label>
                          <input 
                            type="text" 
                            id="city" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Uw woonplaats"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-1">Gewenste uitvoerdatum</label>
                          <input 
                            type="date" 
                            id="preferred_date" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen">Projectdetails</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gewenste dienst(en) *</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="schilderwerk" 
                              className="h-4 w-4 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                            />
                            <label htmlFor="schilderwerk">Schilderwerk</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="dakrenovatie" 
                              className="h-4 w-4 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                            />
                            <label htmlFor="dakrenovatie">Dakrenovatie</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="stucadoren" 
                              className="h-4 w-4 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                            />
                            <label htmlFor="stucadoren">Stucadoren</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="installatietechniek" 
                              className="h-4 w-4 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                            />
                            <label htmlFor="installatietechniek">Installatietechniek</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="aan-verbouw" 
                              className="h-4 w-4 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                            />
                            <label htmlFor="aan-verbouw">Aan- en verbouw</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="pvc-vloeren" 
                              className="h-4 w-4 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                            />
                            <label htmlFor="pvc-vloeren">PVC Vloeren</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="anders" 
                              className="h-4 w-4 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                            />
                            <label htmlFor="anders">Anders</label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="project_description" className="block text-sm font-medium text-gray-700 mb-1">Omschrijving van het project *</label>
                        <textarea 
                          id="project_description" 
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                          placeholder="Beschrijf uw project zo gedetailleerd mogelijk, inclusief afmetingen, materiaalwensen, etc."
                          required
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (indicatie)</label>
                        <select 
                          id="budget"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        >
                          <option value="">Selecteer een budget</option>
                          <option value="0-1000">€0 - €1.000</option>
                          <option value="1000-5000">€1.000 - €5.000</option>
                          <option value="5000-10000">€5.000 - €10.000</option>
                          <option value="10000-25000">€10.000 - €25.000</option>
                          <option value="25000+">€25.000+</option>
                        </select>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Foto's uploaden (optioneel)</label>
                        <input 
                          type="file" 
                          multiple
                          accept="image/*"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload foto's van de ruimte of het project (max. 5 afbeeldingen)</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-start mb-4">
                        <input 
                          type="checkbox" 
                          id="terms" 
                          className="h-4 w-4 mt-1 mr-2 text-brand-darkGreen focus:ring-brand-darkGreen border-gray-300 rounded"
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                          Ik ga akkoord met de <a href="/voorwaarden" className="text-brand-darkGreen hover:underline">algemene voorwaarden</a> en het <a href="/privacy" className="text-brand-darkGreen hover:underline">privacybeleid</a>. *
                        </label>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center hover:animate-pulse"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Offerte Aanvragen
                    </button>
                  </form>
                </div>
              </div>

              {/* Benefits */}
              <div className="lg:mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-brand-darkGreen">Waarom kiezen voor Refurbish Totaal Nederland?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.5s' }}>
                      <div className="rounded-full bg-brand-lightGreen/10 p-2 w-10 h-10 flex items-center justify-center mr-4">
                        <Check className="h-5 w-5 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-brand-darkGreen">Vakmanschap</h4>
                        <p className="text-gray-700">Al onze medewerkers zijn gediplomeerd en hebben jarenlange ervaring in hun vakgebied.</p>
                      </div>
                    </li>
                    <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
                      <div className="rounded-full bg-brand-lightGreen/10 p-2 w-10 h-10 flex items-center justify-center mr-4">
                        <Percent className="h-5 w-5 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-brand-darkGreen">Scherpe prijzen</h4>
                        <p className="text-gray-700">Wij bieden concurrerende tarieven zonder in te leveren op kwaliteit.</p>
                      </div>
                    </li>
                    <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.7s' }}>
                      <div className="rounded-full bg-brand-lightGreen/10 p-2 w-10 h-10 flex items-center justify-center mr-4">
                        <CalendarDays className="h-5 w-5 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-brand-darkGreen">Snelle service</h4>
                        <p className="text-gray-700">Wij reageren snel op uw aanvraag en plannen de werkzaamheden in overleg.</p>
                      </div>
                    </li>
                    <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
                      <div className="rounded-full bg-brand-lightGreen/10 p-2 w-10 h-10 flex items-center justify-center mr-4">
                        <Clipboard className="h-5 w-5 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-brand-darkGreen">Gedetailleerde offerte</h4>
                        <p className="text-gray-700">Onze offertes zijn duidelijk en gespecificeerd, zodat u precies weet waar u voor betaalt.</p>
                      </div>
                    </li>
                    <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.9s' }}>
                      <div className="rounded-full bg-brand-lightGreen/10 p-2 w-10 h-10 flex items-center justify-center mr-4">
                        <BadgeDollarSign className="h-5 w-5 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-brand-darkGreen">Geen verrassingen achteraf</h4>
                        <p className="text-gray-700">Wij werken volgens de afgesproken offerte, zonder onverwachte meerkosten.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-brand-darkGreen text-white p-8 rounded-lg shadow-md hover-lift">
                  <h3 className="text-2xl font-bold mb-4">Direct persoonlijk advies?</h3>
                  <p className="mb-6">
                    Liever direct persoonlijk contact? Bel ons of stuur een e-mail en we helpen u graag verder.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <a 
                      href="tel:0201234567" 
                      className="bg-brand-lightGreen text-white py-2 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      020-123 4567
                    </a>
                    <a 
                      href="mailto:info@refurbishtotaal.nl" 
                      className="border-2 border-white text-white py-2 px-6 rounded-md font-medium hover:bg-white hover:text-brand-darkGreen transition-all flex items-center justify-center"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Stuur e-mail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffertePage;
