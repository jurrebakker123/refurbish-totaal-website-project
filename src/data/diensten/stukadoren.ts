
import { DienstData } from '../types/dienst';
import { Construction } from 'lucide-react';
import React from 'react';

const stukadoren: DienstData = {
  title: 'Stukadoren',
  description: 'Vakkundig stucwerk voor wanden en plafonds, zowel traditioneel als decoratief.',
  longDescription: 'Onze stukadoors zorgen voor perfect geëgaliseerde wanden en plafonds die de basis vormen voor een mooie afwerking van uw interieur. Wij verzorgen zowel traditioneel stucwerk als decoratieve technieken.',
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
  image: '/lovable-uploads/566490a7-118d-4e59-b708-05d058ea3bf8.png'
};

export default stukadoren;
