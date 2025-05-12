
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, ThumbsUp, Thermometer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CallToActionSection from '@/components/CallToActionSection';
import ReusableForm from '@/components/common/ReusableForm';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { motion } from 'framer-motion';

const IsolatietechniekPage = () => {
  const features = [
    'Spouwmuurisolatie met hoogwaardige inblaas- of schuimisolatie',
    'Vloerisolatie met drukvaste isolatieplaten of gespoten schuim',
    'Dak- en zolderisolatie (aan de binnen- of buitenzijde)',
    'Isolatie van dakkapellen, uitbouwen en houten vloeren',
    'Thermografische inspecties en advies op maat',
    'Erkende producten en systemen zoals het ATI Pro Isolatie Systeem',
  ];

  const benefits = [
    {
      title: 'Lagere energiekosten',
      description: 'Goede isolatie kan uw energierekening met 20-40% verlagen, afhankelijk van de huidige situatie.'
    },
    {
      title: 'Verhoogd wooncomfort',
      description: 'Een goed geïsoleerde woning voelt aangenamer door stabielere temperaturen en minder tocht.'
    },
    {
      title: 'Waardestijging',
      description: 'Een geïsoleerde woning heeft een beter energielabel, wat de woningwaarde verhoogt.'
    },
    {
      title: 'Duurzamer leven',
      description: 'Minder energieverbruik betekent een lagere CO₂-uitstoot en dus een kleinere ecologische voetafdruk.'
    },
  ];

  const faqItems = [
    {
      question: 'Welk type isolatie is het meest geschikt voor mijn woning?',
      answer: 'Dit hangt af van verschillende factoren zoals de bouwperiode van uw woning, de huidige isolatiewaarde en uw budget. Bij oudere woningen zonder spouwisolatie kan spouwmuurisolatie een zeer effectieve eerste stap zijn. Bij nieuwere woningen geeft het isoleren van de vloer en het dak vaak de beste resultaten. Tijdens onze inspectie maken we een gerichte analyse en geven we u daarop gebaseerd advies.'
    },
    {
      question: 'Hoe snel verdien ik de investering in isolatie terug?',
      answer: 'De terugverdientijd van isolatiemaatregelen varieert meestal tussen de 3 en 8 jaar, afhankelijk van het type isolatie, de grootte van de woning en uw energieverbruik. Door stijgende energieprijzen wordt deze periode steeds korter. Bovendien profiteert u direct van een verhoogd wooncomfort en een waardestijging van uw pand.'
    },
    {
      question: 'Kan ik subsidie krijgen voor isolatiemaatregelen?',
      answer: 'Ja, er zijn verschillende subsidieregelingen beschikbaar voor woningisolatie, zoals de ISDE-subsidie voor eigenaar-bewoners. Deze kunnen oplopen tot 30% van de investeringskosten. Ook zijn er vaak lokale subsidies vanuit uw gemeente. We informeren u graag over de actuele mogelijkheden tijdens het adviesgesprek.'
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
              backgroundImage: `url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
          </div>
          <div className="container relative z-10 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Isolatietechniek</h1>
              <p className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Energie besparen begint bij goede isolatie. Refurbish Totaal Nederland biedt doeltreffende isolatieoplossingen voor woningen en bedrijfspanden die comfort verhogen en energiekosten verlagen. Onze aanpak is technisch onderbouwd, duurzaam en afgestemd op uw situatie.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Wij leveren en installeren onder andere:</h2>
                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-3 mt-1 flex-shrink-0" />
                      <p className="text-lg text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-gray-700">
                  Wij werken met erkende producten en systemen zoals het ATI Pro Isolatie Systeem, dat garant staat voor een langdurig isolerend effect en een hoge Rc-waarde. Of het nu gaat om een losstaande maatregel of onderdeel van een grotere renovatie — wij zorgen voor een comfortabele en energiezuinige woning.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1614181740406-8bb775a83bbe?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                    alt="Isolatietechniek"
                    className="w-full h-auto"
                    fallbackSrc="/placeholder.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-brand-darkGreen">Voordelen van professionele isolatie</h2>
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
                  <Thermometer className="h-12 w-12 text-brand-lightGreen mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-brand-darkGreen">Onze werkwijze</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                <div className="rounded-full bg-brand-lightGreen w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Gratis inspectie en advies</h3>
                <p className="text-gray-600 text-sm">We brengen uw huidige isolatiesituatie in kaart en geven vrijblijvend advies.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                <div className="rounded-full bg-brand-lightGreen w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Offerte op maat</h3>
                <p className="text-gray-600 text-sm">U ontvangt een heldere offerte met daarin de aanbevolen isolatiemaatregelen.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                <div className="rounded-full bg-brand-lightGreen w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Professionele installatie</h3>
                <p className="text-gray-600 text-sm">Onze ervaren isolatiespecialisten voeren het werk nauwkeurig en efficiënt uit.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                <div className="rounded-full bg-brand-lightGreen w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Kwaliteitscontrole</h3>
                <p className="text-gray-600 text-sm">Na afronding controleren we het resultaat, desgewenst met een thermografische nameting.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                <div className="rounded-full bg-brand-lightGreen w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">5</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Garantie en nazorg</h3>
                <p className="text-gray-600 text-sm">We geven garantie op de geplaatste materialen en uitgevoerde werkzaamheden.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-brand-darkGreen">Onze isolatie projecten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Spouwmuurisolatie"
                  className="w-full h-64 object-cover"
                  fallbackSrc="/placeholder.svg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-brand-darkGreen">Spouwmuurisolatie</h3>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Vloerisolatie"
                  className="w-full h-64 object-cover"
                  fallbackSrc="/placeholder.svg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-brand-darkGreen">Vloerisolatie</h3>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1614181740406-8bb775a83bbe?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Dakisolatie"
                  className="w-full h-64 object-cover"
                  fallbackSrc="/placeholder.svg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-brand-darkGreen">Dakisolatie</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-brand-darkGreen">Veelgestelde vragen</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Vraag een vrijblijvende inspectie aan</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Wilt u weten wat isolatie voor uw woning kan betekenen? We komen graag langs voor een 
                  vrijblijvende inspectie en advies op maat.
                </p>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen">Onze garanties</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <ThumbsUp className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>Gratis inspectie en vrijblijvend advies</span>
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>Garantie op alle isolatiewerkzaamheden</span>
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>Gecertificeerde isolatiespecialisten</span>
                    </li>
                    <li className="flex items-center">
                      <ThumbsUp className="h-5 w-5 text-brand-lightGreen mr-3" />
                      <span>Advies over subsidiemogelijkheden</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
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

export default IsolatietechniekPage;
