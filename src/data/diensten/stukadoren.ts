
import { DienstData } from '../types/dienst';
import { Construction } from 'lucide-react';
import React from 'react';

const stukadoren: DienstData = {
  title: 'Stukadoren',
  description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
  longDescription: 'Strakke wanden en plafonds vormen de basis van een verzorgd interieur. Refurbish Totaal Nederland levert hoogwaardig stucwerk voor zowel renovatie- als nieuwbouwprojecten. Onze ervaren stucadoors zorgen voor een perfect afgewerkte ondergrond, klaar voor verdere afwerking of direct als eindresultaat.',
  icon: React.createElement(Construction, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Glad pleisterwerk (sausklaar of behangklaar)',
    'Sierpleister (spachtelputz, schuurwerk, betonlook)',
    'Cementgebonden en vochtbestendige afwerkingen voor natte ruimtes',
    'Reparatie en egalisatie van beschadigde muren en plafonds',
    'Naadloze afwerking voor een strak en modern resultaat'
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
  image: '/lovable-uploads/541390cc-5853-4cca-be10-6ac89b366249.png'
};

export default stukadoren;
