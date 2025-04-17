
import { Brush, Home, Construction, Wrench, Building, SquareGanttChart, Check, Wallpaper } from 'lucide-react';
import React from 'react';

export type DienstFAQ = {
  question: string;
  answer: string;
};

export type DienstData = {
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
  faqs: DienstFAQ[];
  image: string;
};

export type DienstenRecord = {
  [key: string]: DienstData;
};

const diensten: DienstenRecord = {
  'schilderwerk': {
    title: 'Schilderwerk',
    description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
    longDescription: 'Ons team van ervaren schilders zorgt voor een vakkundige en duurzame verfafwerking voor zowel binnen- als buitenschilderwerk. Wij gebruiken alleen hoogwaardige verfproducten die zorgen voor een langdurig mooi resultaat en bescherming van uw hout- en muurwerk.',
    icon: React.createElement(Brush, { size: 48, className: "text-brand-lightGreen mb-6" }),
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
    icon: React.createElement(Home, { size: 48, className: "text-brand-lightGreen mb-6" }),
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
    image: '/lovable-uploads/ad8c8e3c-2907-4b81-b6bc-0cc94d9cf1e0.png'
  },
  'stucadoren': {
    title: 'Stucadoren',
    description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
    longDescription: 'Onze stucadoors zorgen voor perfect geëgaliseerde wanden en plafonds die de basis vormen voor een mooie afwerking van uw interieur. Wij verzorgen zowel traditioneel stucwerk als decoratieve technieken.',
    icon: React.createElement(Construction, { size: 48, className: "text-brand-lightGreen mb-6" }),
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
    image: '/lovable-uploads/021fe3bd-a1fe-4022-abad-070ce97b29e8.png'
  },
  'installatietechniek': {
    title: 'Installatietechniek',
    description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
    longDescription: 'Onze gecertificeerde installateurs zorgen voor veilige en betrouwbare elektra- en loodgietersinstallaties voor zowel nieuwbouw als renovatieprojecten. Wij werken volgens de laatste normen en veiligheidsvoorschriften.',
    icon: React.createElement(Wrench, { size: 48, className: "text-brand-lightGreen mb-6" }),
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
    icon: React.createElement(Building, { size: 48, className: "text-brand-lightGreen mb-6" }),
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
  'behangen': {
    title: 'Behangen',
    description: 'Professioneel behangwerk met oog voor detail en een perfect eindresultaat.',
    longDescription: 'Ons team van ervaren behangers zorgt ervoor dat uw wanden een prachtige afwerking krijgen met behang naar keuze. Van klassiek tot modern, van effen tot met patroon - wij zorgen voor een perfect eindresultaat.',
    icon: React.createElement(Wallpaper, { size: 48, className: "text-brand-lightGreen mb-6" }),
    features: [
      'Behang verwijderen en ondergrond voorbereiden',
      'Aanbrengen van luxe behang en wandbekleding',
      'Fotobehang op maat',
      'Vliesbehang en traditioneel behang',
      'Textiel- en vinylbehang',
      'Reparatie van bestaand behangwerk'
    ],
    benefits: [
      'Snelle en effectieve woningmetamorfose',
      'Breed assortiment aan designs en materialen',
      'Perfect strakke afwerking',
      'Professioneel advies over materiaal en design',
      'Duurzame en hoogwaardige resultaten'
    ],
    faqs: [
      { 
        question: 'Hoe lang gaat behang gemiddeld mee?', 
        answer: 'Dit hangt sterk af van het type behang en de ruimte waarin het is aangebracht. Kwaliteitsbehang in een normaal gebruikte woonkamer gaat gemiddeld 7-10 jaar mee voordat het aan vervanging toe is.' 
      },
      { 
        question: 'Moet de oude behang altijd eerst verwijderd worden?', 
        answer: 'Voor het beste resultaat is het altijd aan te raden om oud behang te verwijderen. In sommige gevallen kan er over bestaand behang geplakt worden, maar dit is afhankelijk van de conditie van het oude behang en het type nieuw behang.' 
      },
      { 
        question: 'Hoe lang duurt het behangen van een gemiddelde kamer?', 
        answer: 'Voor een gemiddelde kamer (circa 4x4 meter) moet u rekenen op ongeveer één werkdag voor het complete behangwerk, inclusief de voorbereidingen. Bij complexe patronen of een moeilijke ondergrond kan dit iets langer duren.' 
      }
    ],
    image: '/lovable-uploads/bde19c7f-fd57-41c4-99d8-2138e8be56c9.png'
  },
  'pvc-vloeren': {
    title: 'PVC Vloeren',
    description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
    longDescription: 'PVC vloeren zijn niet alleen mooi en stijlvol, maar ook duurzaam en onderhoudsvriendelijk. Ons team van specialisten zorgt voor perfect geplaatste PVC vloeren in elke ruimte van uw woning of bedrijfspand.',
    icon: React.createElement(SquareGanttChart, { size: 48, className: "text-brand-lightGreen mb-6" }),
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
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
  }
};

export default diensten;
