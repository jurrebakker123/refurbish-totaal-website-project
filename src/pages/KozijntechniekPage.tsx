
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CallToActionSection from '@/components/CallToActionSection';
import ReusableForm from '@/components/common/ReusableForm';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { motion } from 'framer-motion';

const KozijntechniekPage = () => {
  const features = [
    'Vakkundige demontage en plaatsing van kozijnen',
    'Inmeten en leveren van maatwerk kozijnen (nieuwbouw of renovatie)',
    'Toepassing van hoogwaardige isolatieglas-systemen (HR++, triple)',
    'Herstel van houtrot of het moderniseren van bestaande kozijnen',
    'Integratie van ventilatieroosters en zonwering indien gewenst',
    'Perfecte afwerking, zowel binnen als buiten',
  ];

  const benefits = [
    {
      title: 'Verhoogde isolatiewaarde',
      description: 'Moderne kozijnen zorgen voor betere warmte- en geluidsisolatie, wat resulteert in een lager energieverbruik.'
    },
    {
      title: 'Waardevermeerdering',
      description: 'Nieuwe kozijnen verhogen de waarde van uw woning en verbeteren de uitstraling.'
    },
    {
      title: 'Verbeterde veiligheid',
      description: 'Moderne kozijnen zijn vaak voorzien van verbeterde sluitingen en veiligheidsglas.'
    },
    {
      title: 'Onderhoudsarm',
      description: 'Vooral kunststof en aluminium kozijnen vergen minimaal onderhoud en gaan decennialang mee.'
    },
  ];

  const faqItems = [
    {
      question: 'Wat is het verschil tussen kunststof, aluminium en houten kozijnen?',
      answer: 'Houten kozijnen hebben een klassieke uitstraling en zijn goed isolerend, maar vergen meer onderhoud. Kunststof kozijnen zijn onderhoudsarm, goed isolerend en prijstechnisch aantrekkelijk. Aluminium kozijnen zijn zeer duurzaam, slank en sterk, maar doorgaans iets duurder. Wij adviseren u graag over de beste keuze voor uw specifieke situatie.'
    },
    {
      question: 'Hoe lang duurt het vervangen van kozijnen?',
      answer: 'De doorlooptijd hangt af van het aantal kozijnen, het materiaal en eventuele maatwerk. Doorgaans kunnen we een gemiddelde woning binnen 1-3 dagen voorzien van nieuwe kozijnen. Bij de intake geven we u een nauwkeurige planning.'
    },
    {
      question: 'Kan ik subsidie krijgen voor nieuwe kozijnen?',
      answer: 'In sommige gevallen kunt u subsidie krijgen, vooral als de nieuwe kozijnen bijdragen aan energiebesparing. De ISDE-subsidie kan bijvoorbeeld van toepassing zijn bij toepassing van hoogwaardige isolatieglas. Wij kunnen u tijdens het adviesgesprek informeren over actuele subsidiemogelijkheden.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="relative py-16">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
          </div>
          <div className="container relative z-10 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Kozijntechniek</h1>
              <p className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Bij Refurbish Totaal Nederland verzorgen wij het vervangen, herstellen en plaatsen van kozijnen met vakmanschap en oog voor detail. Of het nu gaat om hout, kunststof of aluminium kozijnen, wij leveren maatwerkoplossingen die passen bij de stijl van uw woning en bijdragen aan energiezuinigheid en comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Onze specialisten zorgen voor:</h2>
                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-3 mt-1 flex-shrink-0" />
                      <p className="text-lg text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-gray-700">
                  Wij werken uitsluitend met duurzame materialen en houden bij elk project rekening met esthetiek, isolatiewaarde en gebruiksgemak. Uw kozijnproject is bij ons in vertrouwde handen — van advies tot en met perfecte afwerking.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                    alt="Kozijntechniek"
                    className="w-full h-auto"
                    fallbackSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-brand-darkGreen">Voordelen van professionele kozijnen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <ShieldCheck className="h-12 w-12 text-brand-lightGreen mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-brand-darkGreen">Onze kozijn projecten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Kunststof kozijnen"
                  className="w-full h-64 object-cover"
                  fallbackSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-brand-darkGreen">Kunststof kozijnen</h3>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Houten kozijnen"
                  className="w-full h-64 object-cover"
                  fallbackSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-brand-darkGreen">Houten kozijnen</h3>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Aluminium kozijnen"
                  className="w-full h-64 object-cover"
                  fallbackSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-brand-darkGreen">Aluminium kozijnen</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-brand-darkGreen">Veelgestelde vragen</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Vraag een vrijblijvende offerte aan</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Bent u geïnteresseerd in nieuwe kozijnen of wilt u meer informatie over de mogelijkheden? 
                  Neem contact met ons op voor een vrijblijvende offerte of adviesgesprek.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen">Onze garanties</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>10 jaar garantie op materialen</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>5 jaar garantie op plaatsing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>Gratis inmeting en advies</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>Volledig project management</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <ReusableForm 
                  title="Neem contact met ons op"
                  description="Vul het formulier in en we nemen zo snel mogelijk contact met u op."
                  showFileUpload={false}
                  templateId="template_ezfzaao"
                  buttonText="Verstuur aanvraag"
                  showServiceInput={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default KozijntechniekPage;
