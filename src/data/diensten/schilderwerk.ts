
import { DienstData } from '../types/dienst';
import { Brush } from 'lucide-react';
import React from 'react';

const schilderwerk: DienstData = {
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
};

export default schilderwerk;
