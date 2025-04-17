
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Brush, Home, Construction, Wrench, Building, SquareGanttChart, Check, Phone, Mail, Wallpaper } from 'lucide-react';
import React, { useEffect } from 'react';
import CallToActionSection from '@/components/CallToActionSection';

const diensten = {
  'schilderwerk': {
    title: 'Schilderwerk',
    description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
    longDescription: 'Ons team van ervaren schilders zorgt voor een vakkundige en duurzame verfafwerking voor zowel binnen- als buitenschilderwerk. Wij gebruiken alleen hoogwaardige verfproducten die zorgen voor een langdurig mooi resultaat en bescherming van uw hout- en muurwerk.',
    icon: <Brush size={48} className="text-brand-lightGreen mb-6" />,
    features: [
      'Buitenschilderwerk voor gevels, kozijnen en deuren',
      'Binnenschilderwerk voor wanden, plafonds en trappen',
      'Kleuradvies en verfkeuze op maat',
      'Houtrotherstel en reparaties',
      'Graffiti verwijdering',
      'Behang- en spuitwerk'
    ],
    benefits: [
      'Bescherming tegen weersinvloeden en houtrot',
      'Verlenging van de levensduur van uw houtwerk',
      'Verhoogde waarde van uw woning',
      'Professionele afwerking en advies',
      'Alleen gebruik van A-merk verfproducten'
    ],
    faqs: [
      { 
        question: 'Hoe lang gaat buitenschilderwerk mee?', 
        answer: 'Professioneel uitgevoerd buitenschilderwerk gaat gemiddeld 4-7 jaar mee, afhankelijk van de gebruikte materialen, de kleur en de ligging van het object (noord/zuid).' 
      },
      { 
        question: 'Kunnen jullie ook in de winter schilderen?', 
        answer: 'Voor buitenschilderwerk is het sterk afhankelijk van de temperatuur en luchtvochtigheid. Binnenschilderwerk kan in principe het hele jaar door plaatsvinden.' 
      },
      { 
        question: 'Geven jullie garantie op schilderwerk?', 
        answer: 'Ja, wij geven garantie op al ons schilderwerk. De exacte garantieperiode is afhankelijk van het type schilderwerk en wordt vooraf in de offerte vermeld.' 
      }
    ],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  'dakrenovatie': {
    title: 'Dakrenovatie',
    description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
    longDescription: 'Een goed onderhouden dak is essentieel voor de bescherming van uw woning. Ons ervaren team voert alle soorten dakrenovaties uit, van het vervangen van enkele dakpannen tot complete dakvernieuwing inclusief isolatie.',
    icon: <Home size={48} className="text-brand-lightGreen mb-6" />,
    features: [
      'Vernieuwen van dakbedekking (pannen, leien, bitumen)',
      'Isolatie van hellende en platte daken',
      'Dakkapellen plaatsen of renoveren',
      'Dakgoten repareren of vervangen',
      'Lood- en zinkwerk vernieuwen',
      'Velux dakramen plaatsen'
    ],
    benefits: [
      'Energiebesparing door betere isolatie',
      'Voorkomen van lekkages en vochtproblemen',
      'Waardevermeerdering van uw woning',
      'Verbeterde uitstraling van uw dak',
      'Langdurig onderhoudsvrij'
    ],
    faqs: [
      { 
        question: 'Is het mogelijk om zonnepanelen te plaatsen tijdens dakrenovatie?', 
        answer: 'Ja, dit is zelfs een ideaal moment omdat we de zonnepanelen direct optimaal kunnen integreren in het nieuwe dak.' 
      },
      { 
        question: 'Hoe lang duurt een complete dakrenovatie?', 
        answer: 'Dit is sterk afhankelijk van de grootte en complexiteit van het dak. Een gemiddelde dakrenovatie voor een rijtjeshuis duurt ongeveer 1-2 weken.' 
      },
      { 
        question: 'Is er een vergunning nodig voor dakrenovatie?', 
        answer: 'Voor een reguliere dakrenovatie waarbij de afmetingen en contouren niet veranderen is meestal geen vergunning nodig. Bij het plaatsen van dakkapellen of het wijzigen van de dakconstructie is wel een vergunning vereist. Wij kunnen u hierbij adviseren.' 
      }
    ],
    image: 'https://images.unsplash.com/photo-1632759145351-1d170f2a9ddd?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  'stucadoren': {
    title: 'Stucadoren',
    description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
    longDescription: 'Onze stucadoors zorgen voor perfect geëgaliseerde wanden en plafonds die de basis vormen voor een mooie afwerking van uw interieur. Wij verzorgen zowel traditioneel stucwerk als decoratieve technieken.',
    icon: <Construction size={48} className="text-brand-lightGreen mb-6" />,
    features: [
      'Gladpleisterwerk voor wanden en plafonds',
      'Renovatiestucwerk bij scheuren en beschadigingen',
      'Sierlijsten en ornamenten aanbrengen',
      'Spachtelputz en structuurwerk',
      'Venetiaans stucwerk en tadelakt',
      'Betonlook wanden en vloeren'
    ],
    benefits: [
      'Strakke en egale ondergrond voor verdere afwerking',
      'Verbeterde akoestiek in uw woning',
      'Verhoogde brandveiligheid',
      'Moderne en stijlvolle uitstraling',
      'Lange levensduur en onderhoudsvriendelijk'
    ],
    faqs: [
      { 
        question: 'Hoelang moet stucwerk drogen?', 
        answer: 'De droogtijd hangt af van verschillende factoren zoals laagdikte, temperatuur en luchtvochtigheid. Gemiddeld moet u rekenen op 2-4 dagen voordat het stucwerk volledig droog is.' 
      },
      { 
        question: 'Kan stucwerk over bestaand behang worden aangebracht?', 
        answer: 'Nee, voor een goed resultaat moet de ondergrond volledig vrij zijn van behang, loszittend stucwerk en verf. Wij verzorgen de volledige voorbereiding.' 
      },
      { 
        question: 'Is stucwerk geschikt voor vochtige ruimtes zoals de badkamer?', 
        answer: 'Ja, wij gebruiken speciale vochtbestendige stucmortel voor badkamers en andere vochtige ruimtes. Ook kunnen we waterafstotende afwerkingen toepassen.' 
      }
    ],
    image: 'https://images.unsplash.com/photo-1601689058311-6e9cab08654c?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  'behangen': {
    title: 'Behangen',
    description: 'Professioneel behangwerk met een ruime keuze aan patronen, texturen en hoogwaardige materialen.',
    longDescription: 'Ons team van ervaren behangers zorgt voor een perfecte afwerking van uw wanden. Wij adviseren u graag over de mogelijkheden qua designs, materialen en toepassingen voor elk interieur.',
    icon: <Wallpaper size={48} className="text-brand-lightGreen mb-6" />,
    features: [
      'Plaatsen van verschillende soorten behang',
      'Verwijderen van oud behang',
      'Voorbereiden van muren en egaliseren',
      'Advies over behangkeuze en -patronen',
      'Fotobehang en muurschilderingen',
      'Vliesbehang en textielbehang'
    ],
    benefits: [
      'Snelle transformatie van uw interieur',
      'Eindeloze design mogelijkheden',
      'Camouflage van oneffenheden in de muur',
      'Verbeterde akoestiek in uw ruimte',
      'Moderne of klassieke uitstraling naar wens'
    ],
    faqs: [
      { 
        question: 'Hoelang gaat behang mee?', 
        answer: 'Bij normaal gebruik en met de juiste verzorging gaat kwalitatief behang gemiddeld 7-10 jaar mee. Natuurlijk is dit afhankelijk van het type behang en de ruimte waarin het is toegepast.' 
      },
      { 
        question: 'Kan behang in vochtige ruimtes worden toegepast?', 
        answer: 'Er zijn speciale vochtbestendige behangsoorten die geschikt zijn voor keukens en badkamers. We adviseren u graag over de mogelijkheden voor uw specifieke situatie.' 
      },
      { 
        question: 'Hoe lang duurt het behangen van een gemiddelde kamer?', 
        answer: 'Voor een gemiddelde woonkamer moet u rekenen op 1-2 dagen, afhankelijk van het type behang, de staat van de muren en eventuele voorbereidende werkzaamheden.' 
      }
    ],
    image: 'https://images.unsplash.com/photo-1604709490317-0a3d2c85af90?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  },
  'installatietechniek': {
    title: 'Installatietechniek',
    description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
    longDescription: 'Onze gecertificeerde installateurs zorgen voor veilige en betrouwbare elektra- en loodgietersinstallaties voor zowel nieuwbouw als renovatieprojecten. Wij werken volgens de laatste normen en veiligheidsvoorschriften.',
    icon: <Wrench size={48} className="text-brand-lightGreen mb-6" />,
    features: [
      'Elektra aanleggen of vernieuwen',
      'Groepenkast vervangen of uitbreiden',
      'Water- en gasleidingen aanleggen of vervangen',
      'Badkamer en toilet installaties',
      'Vloerverwarming aanleggen',
      'Domotica en slimme huisinstallaties'
    ],
    benefits: [
      'Veilige en betrouwbare installaties',
      'Energiebesparende oplossingen',
      'Installatiewerk volgens de nieuwste normen',
      'Gecertificeerde vakmensen',
      'Volledige ontzorging van A tot Z'
    ],
    faqs: [
      { 
        question: 'Is het nodig om de meterkast te vernieuwen bij een verbouwing?', 
        answer: 'Dit hangt af van de staat van uw huidige meterkast en de eisen van uw nieuwe installatie. Bij uitbreiding met veel groepen kan een nieuwe meterkast noodzakelijk zijn. Wij kunnen dit voor u beoordelen.' 
      },
      { 
        question: 'Verzorgen jullie ook de aanvraag bij netbeheerders?', 
        answer: 'Ja, wij kunnen het gehele traject voor u verzorgen, inclusief de communicatie met netbeheerders voor bijvoorbeeld een verzwaring van uw aansluiting.' 
      },
      { 
        question: 'Geven jullie garantie op installatiewerk?', 
        answer: 'Wij geven minimaal 2 jaar garantie op al ons installatiewerk. Op veel materialen geldt een fabrieksgarantie die nog langer is.' 
      }
    ],
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.1&auto=format&fit=crop&w=2069&q=80'
  },
  'aan-en-verbouw': {
    title: 'Aan- en verbouw',
    description: 'Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning.',
    longDescription: 'Ons team van ervaren bouwvakkers, timmerlieden en projectleiders zorgt voor een zorgeloze aan- of verbouwing van uw woning. Van het eerste ontwerp tot de laatste afwerking, wij nemen alle zorgen uit handen.',
    icon: <Building size={48} className="text-brand-lightGreen mb-6" />,
    features: [
      'Uitbouwen en aanbouwen realiseren',
      'Dakkapellen en dakopbouwen',
      'Muren doorbreken en dragende constructies',
      'Garage ombouwen tot woonruimte',
      'Indeling van woning wijzigen',
      'Funderingsherstel'
    ],
    benefits: [
      'Meer woonruimte en comfort',
      'Waardevermeerdering van uw woning',
      'Energiezuinigere woning',
      'Modernisering van uw woning',
      'Eén aanspreekpunt voor het hele traject'
    ],
    faqs: [
      { 
        question: 'Heb ik een vergunning nodig voor een aanbouw?', 
        answer: 'Voor de meeste aanbouwen is een omgevingsvergunning nodig. Voor kleinere projecten kan vergunningsvrij bouwen mogelijk zijn. Wij kunnen u adviseren en de vergunningsaanvraag voor u verzorgen.' 
      },
      { 
        question: 'Hoelang duurt een gemiddelde aanbouw?', 
        answer: 'Dit is sterk afhankelijk van de grootte en complexiteit, maar reken op 6-12 weken voor een gemiddelde aanbouw na het verkrijgen van de vergunning.' 
      },
      { 
        question: 'Kan ik in mijn huis blijven wonen tijdens de verbouwing?', 
        answer: 'In de meeste gevallen is dit mogelijk, hoewel er natuurlijk wel overlast zal zijn. Wij proberen deze overlast zoveel mogelijk te beperken en stemmen de werkzaamheden met u af.' 
      }
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2071&q=80'
  },
  'pvc-vloeren': {
    title: 'PVC Vloeren',
    description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
    longDescription: 'PVC vloeren zijn niet alleen mooi en stijlvol, maar ook duurzaam en onderhoudsvriendelijk. Ons team van specialisten zorgt voor perfect geplaatste PVC vloeren in elke ruimte van uw woning of bedrijfspand.',
    icon: <SquareGanttChart size={48} className="text-brand-lightGreen mb-6" />,
    features: [
      'PVC vloeren in diverse dessins en kwaliteiten',
      'Egaliseren van ondervloeren',
      'Vloerverwarming geschikte PVC vloeren',
      'Click PVC en vaste PVC vloeren',
      'Onderhoud en reparatie van PVC vloeren',
      'Verwijderen van oude vloerbedekking'
    ],
    benefits: [
      'Duurzame en slijtvaste vloeren',
      'Waterbestendig en gemakkelijk te reinigen',
      'Geluiddempend en comfortabel',
      'Geschikt voor vloerverwarming',
      'Moderne uitstraling in vele designs'
    ],
    faqs: [
      { 
        question: 'Is een PVC vloer geschikt voor vochtige ruimtes?', 
        answer: 'Ja, PVC vloeren zijn waterbestendig en daarom zeer geschikt voor badkamers, toiletten en keukens.' 
      },
      { 
        question: 'Moet de ondervloer altijd geëgaliseerd worden?', 
        answer: 'Voor een optimaal resultaat moet de ondervloer vlak, droog en schoon zijn. In de meeste gevallen is egalisatie nodig voor het beste eindresultaat.' 
      },
      { 
        question: 'Hoe lang gaat een PVC vloer mee?', 
        answer: 'Bij normaal gebruik en goed onderhoud gaat een kwaliteits-PVC vloer minstens 10-15 jaar mee. De slijtlaag is bepalend voor de levensduur.' 
      }
    ],
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2787&q=80'
  }
};

const DienstDetailPage = () => {
  const { serviceId } = useParams<{serviceId: string}>();
  const dienst = serviceId && diensten[serviceId as keyof typeof diensten];
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);

  if (!dienst) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32">
          <div className="container py-16 text-center">
            <h1 className="text-3xl font-bold text-brand-darkGreen mb-6">Dienst niet gevonden</h1>
            <p className="mb-8">De dienst die u zoekt bestaat niet of is niet beschikbaar.</p>
            <Link to="/diensten" className="btn-primary">
              Bekijk alle diensten
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Adjust height for PVC vloeren page
  const heroHeight = serviceId === 'pvc-vloeren' ? 'py-12' : 'py-16';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        <section className={`relative text-white ${heroHeight}`}>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${dienst.image})` }}
          >
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-50"></div>
          </div>
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
                <div className="flex items-center mb-4">
                  <div className="animate-float">{dienst.icon}</div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{dienst.title}</h1>
                <p className="text-xl">{dienst.description}</p>
              </div>
              <div className="md:w-1/2 md:pl-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-lg overflow-hidden shadow-lg hover-lift">
                  <img 
                    src={dienst.image} 
                    alt={dienst.title} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Over onze {dienst.title.toLowerCase()}</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    {dienst.longDescription}
                  </p>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-brand-darkGreen">Onze {dienst.title.toLowerCase()} diensten omvatten:</h3>
                  <ul className="space-y-3 mb-8">
                    {dienst.features.map((feature, i) => (
                      <li key={i} className="flex items-start animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.4}s` }}>
                        <Check className="h-5 w-5 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Waarom kiezen voor onze {dienst.title.toLowerCase()}?</h2>
                  <ul className="space-y-4">
                    {dienst.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.6}s` }}>
                        <div className="rounded-full bg-brand-lightGreen/10 p-2 w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <Check className="h-5 w-5 text-brand-darkGreen" />
                        </div>
                        <div>
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Veelgestelde vragen</h2>
                  <div className="space-y-6">
                    {dienst.faqs.map((faq, i) => (
                      <div key={i} className="bg-gray-50 p-6 rounded-lg animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.8}s` }}>
                        <h3 className="text-xl font-semibold mb-2 text-brand-darkGreen">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Offerte aanvragen</h3>
                    <p className="text-gray-700 mb-6">
                      Bent u geïnteresseerd in onze {dienst.title.toLowerCase()} diensten? Vraag vrijblijvend een offerte aan.
                    </p>
                    <Link 
                      to="/offerte" 
                      className="btn-primary block text-center w-full hover:animate-pulse"
                    >
                      Vrijblijvende Offerte
                    </Link>
                  </div>

                  <div className="bg-brand-darkGreen text-white p-6 rounded-lg shadow-md mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <p className="mb-4">
                      Heeft u vragen over onze {dienst.title.toLowerCase()} diensten? Neem gerust contact met ons op.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2" />
                        <span>085 4444 255</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        <span>info@refurbishtotaalnederland.nl</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Andere diensten</h3>
                    <ul className="space-y-3">
                      {Object.entries(diensten).map(([id, d]) => (
                        id !== serviceId && (
                          <li key={id} className="hover-underline">
                            <Link to={`/diensten/${id}`} className="flex items-center text-gray-700 hover:text-brand-darkGreen">
                              <div className="text-brand-lightGreen mr-2">
                                {d.icon ? React.cloneElement(d.icon as React.ReactElement, { size: 20 }) : null}
                              </div>
                              <span>{d.title}</span>
                            </Link>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default DienstDetailPage;
