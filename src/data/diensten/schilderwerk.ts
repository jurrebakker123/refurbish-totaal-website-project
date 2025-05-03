
import { DienstData } from '../types/dienst';
import { Brush } from 'lucide-react';
import React from 'react';

const schilderwerk: DienstData = {
  title: 'Schilderwerk',
  description: 'Professionele binnen- en buitenschilderwerken met hoogwaardige verfsoorten voor een duurzaam resultaat.',
  longDescription: 'Ons team van ervaren schilders zorgt voor een vakkundige en duurzame verfafwerking voor zowel binnen- als buitenschilderwerk. Wij gebruiken alleen hoogwaardige verfproducten die zorgen voor een langdurig mooi resultaat en bescherming van uw hout- en muurwerk. Werkzaam in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray.',
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
    },
    {
      question: 'In welke steden bieden jullie schilderwerk aan?',
      answer: 'Wij verzorgen schilderwerk in heel Nederland, maar hebben specifieke expertise in Eindhoven, Rotterdam, Breda, Amsterdam, Lelystad, Zwolle, Doetinchem en Venray.'
    },
    {
      question: 'Wat kost het schilderen van kozijnen?',
      answer: 'De kosten voor het schilderen van kozijnen zijn afhankelijk van verschillende factoren zoals materiaal, staat van het houtwerk, bereikbaarheid en aantal. Na een vrijblijvende inspectie bieden wij een gedetailleerde offerte aan.'
    },
    {
      question: 'Welke voordelen heeft professioneel schilderwerk?',
      answer: 'Professioneel schilderwerk zorgt niet alleen voor een mooie uitstraling, maar biedt ook bescherming tegen weersinvloeden, voorkomt houtrot en andere schade, en kan de waarde van uw pand verhogen. Bovendien gebruiken professionele schilders de juiste technieken en materialen voor een langdurig resultaat.'
    },
    {
      question: 'Hoe bereiden jullie het oppervlak voor?',
      answer: 'Onze schilders besteden veel aandacht aan de voorbereiding: schuren, schoonmaken, repareren van beschadigingen en indien nodig houtrotreparaties. Deze voorbereidende werkzaamheden zijn cruciaal voor een duurzaam resultaat.'
    }
  ],
  image: '/lovable-uploads/aac56ae6-f108-44cf-9a95-00bf6e672bdc.png'
};

export default schilderwerk;
