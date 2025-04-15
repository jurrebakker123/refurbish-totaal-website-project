
import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  'Gratis en vrijblijvende offerte',
  'Vakkundig advies op maat',
  'Ervaren en gediplomeerde vakmensen',
  'Kwaliteitsmaterialen van A-merken',
  'Nette en tijdige oplevering',
  'Garantie op al onze werkzaamheden'
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const CallToAction = () => {
  return (
    <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
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
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={fadeIn}
            >
              Klaar om uw project te starten?
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 text-gray-300"
              variants={fadeIn}
            >
              Of u nu een klein renovatieproject of een complete verbouwing plant, 
              Refurbish Totaal Nederland staat voor u klaar met deskundig advies en 
              professionele uitvoering.
            </motion.p>
            
            <motion.ul className="mb-8 space-y-3" variants={staggerContainer}>
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <Check className="h-5 w-5 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/offerte" 
                className="btn-primary hover:animate-pulse inline-flex items-center"
              >
                Vrijblijvende Offerte Aanvragen
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"/>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-xl p-8 text-brand-darkGreen hover-lift"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Neem Direct Contact Op</h3>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                    placeholder="uw@email.nl"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                  placeholder="+31 6 30136079"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Dienst</label>
                <select 
                  id="service"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                  placeholder="Vertel ons over uw project..."
                ></textarea>
              </div>
              <motion.button 
                type="submit" 
                className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Verstuur Aanvraag
              </motion.button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
