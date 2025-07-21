
import { useState } from 'react';
import { ShieldCheck, Check, ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import CallToActionSection from '@/components/CallToActionSection';
import { Link } from 'react-router-dom';

const Index = () => {
  const certifications = [{
    name: 'VCA',
    description: 'Veiligheid voor uitvoerenden en leidinggevenden'
  }, {
    name: 'ISO 9001',
    description: 'Kwaliteitsmanagement'
  }, {
    name: 'ISO 14001',
    description: 'Milieumanagement'
  }, {
    name: 'KOMO/BRL',
    description: 'Certificering voor isolatie- en installatiewerkzaamheden'
  }, {
    name: 'BouwGarant',
    description: 'Kwaliteitswaarborg bij particuliere projecten'
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative">
          <div className="pt-6 md:pt-0">
            <Hero />
          </div>
        </section>
        <Services />
        
        <Testimonials />
        
        {/* Map Section */}
        <section className="py-10 md:py-16">
          <div className="container">
            <motion.div className="text-center max-w-3xl mx-auto mb-8 md:mb-16" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-brand-darkGreen leading-tight">
                Ons Werkgebied
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Refurbish Totaal Nederland voert projecten uit door heel Nederland. 
                Onze hoofdvestiging bevindt zich in Druten, van waaruit we klanten in het hele land bedienen.
              </p>
            </motion.div>
            <motion.div className="bg-white p-4 md:p-8 rounded-lg shadow-lg" initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.627583012478!2d5.6000662!3d51.8926512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c7f8a3c360349f%3A0x27f8c114d6c94a8!2sPostbus%2061%2C%206650%20AB%20Druten%2C%20Nederland!5e0!3m2!1snl!2snl!4v1713705571890!5m2!1snl!2snl" width="100%" height="100%" style={{
                border: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Werkgebied Refurbish Totaal Nederland"></iframe>
              </div>
              <motion.div className="mt-3 md:mt-6 text-center" initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.3
            }}>
                <p className="text-base md:text-lg text-gray-700">
                  <strong>Vestigingsadres:</strong> Postbus 61, 6650 AB Druten
                </p>
                <Link to="/contact" className="btn-primary mt-4 inline-flex items-center">
                  Contact Opnemen <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Client types section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brand-darkGreen">Voor Wie zijn Onze Diensten Ideaal?</h2>
              <p className="text-lg text-gray-700">
                Onze specialistische aanpak is perfect voor:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5
            }} whileHover={{
              y: -5
            }}>
                <ShieldCheck className="h-12 w-12 text-brand-lightGreen mb-4" />
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Particuliere Woningen</h3>
                <p className="text-gray-600">Dakkapellen, schilderwerk en stucwerk voor uw woning</p>
              </motion.div>
              <motion.div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.1
            }} whileHover={{
              y: -5
            }}>
                <ShieldCheck className="h-12 w-12 text-brand-lightGreen mb-4" />
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Kleinschalige Utiliteitsbouw</h3>
                <p className="text-gray-600">Professionele afwerking voor bedrijfspanden</p>
              </motion.div>
              <motion.div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} whileHover={{
              y: -5
            }}>
                <ShieldCheck className="h-12 w-12 text-brand-lightGreen mb-4" />
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Renovatieprojecten</h3>
                <p className="text-gray-600">Specialistische vakmanschap voor uw renovatie</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Free inspection banner */}
        <motion.section className="py-16 bg-brand-darkGreen text-white" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.1
            }}>Vrijblijvend inspectie &amp; advies</motion.h2>
              <motion.p className="text-xl mb-8" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }}>
                Wij komen graag vrijblijvend bij u langs om de mogelijkheden te bespreken en u te voorzien van professioneel advies zonder kosten of verplichtingen.
              </motion.p>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.3
            }}>
                <Link to="/contact" className="bg-white text-brand-darkGreen px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all inline-flex items-center">
                  Plan Uw Gratis Inspectie
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Certifications Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <motion.div className="text-center max-w-3xl mx-auto mb-12" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Onze Certificeringen</h2>
              <p className="text-lg text-gray-700">
                Onze kwaliteit en expertise worden onderstreept door gerenommeerde certificeringen die onze vakmanschap en toewijding garanderen.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => <motion.div key={cert.name} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} whileHover={{
              y: -5
            }}>
                  <Award className="h-12 w-12 text-brand-lightGreen mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">{cert.name}</h3>
                  <p className="text-gray-600">{cert.description}</p>
                </motion.div>)}
            </div>
            
            <motion.div className="text-center mt-12" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <Link to="/certificaat" className="btn-primary hover:animate-pulse inline-flex items-center">
                Onze Certificeringen <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <CallToActionSection />
      </main>
      <Footer />
    </div>;
};
export default Index;
