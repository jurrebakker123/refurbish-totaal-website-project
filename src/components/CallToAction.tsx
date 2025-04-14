
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const benefits = [
  'Gratis en vrijblijvende offerte',
  'Vakkundig advies op maat',
  'Ervaren en gediplomeerde vakmensen',
  'Kwaliteitsmaterialen van A-merken',
  'Nette en tijdige oplevering',
  'Garantie op al onze werkzaamheden'
];

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.1&auto=format&fit=crop&w=2069&q=80')`,
        }}
      ></div>
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Klaar om uw project te starten?</h2>
            <p className="text-lg mb-8 text-gray-300">
              Of u nu een klein renovatieproject of een complete verbouwing plant, 
              Refurbish Totaal Nederland staat voor u klaar met deskundig advies en 
              professionele uitvoering.
            </p>
            
            <ul className="mb-8 space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-brand-orange mr-2 mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/offerte" 
              className="btn-primary inline-block"
            >
              Vrijblijvende Offerte Aanvragen
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8 text-brand-blue">
            <h3 className="text-2xl font-bold mb-6">Neem Direct Contact Op</h3>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                    placeholder="uw@email.nl"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="06-12345678"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Dienst</label>
                <select 
                  id="service"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                >
                  <option value="">Selecteer een dienst</option>
                  <option value="schilderwerk">Schilderwerk</option>
                  <option value="dakrenovatie">Dakrenovatie</option>
                  <option value="stucadoren">Stucadoren</option>
                  <option value="installatietechniek">Installatietechniek</option>
                  <option value="aan-en-verbouw">Aan- en verbouw</option>
                  <option value="pvc-vloeren">PVC Vloeren</option>
                  <option value="anders">Anders</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Bericht</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="Vertel ons over uw project..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-brand-orange text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                Verstuur Aanvraag
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
