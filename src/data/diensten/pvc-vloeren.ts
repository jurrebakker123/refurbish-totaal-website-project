
import { DienstData } from '../types/dienst';
import { SquareGanttChart } from 'lucide-react';
import React from 'react';

const pvcVloeren: DienstData = {
  title: 'PVC Vloeren',
  description: 'Levering en installatie van duurzame, onderhoudsvriendelijke PVC vloeren.',
  longDescription: 'Een PVC vloer is de perfecte combinatie van uitstraling, comfort en duurzaamheid. Refurbish Totaal Nederland levert en installeert hoogwaardige PVC vloeren die geschikt zijn voor zowel particuliere woningen als commerciële ruimtes. Met een ruim aanbod in dessins, kleuren en legpatronen creëren wij elke gewenste sfeer — van modern tot klassiek.',
  icon: React.createElement(SquareGanttChart, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Levering van kwalitatieve PVC vloeren (stroken, tegels, visgraat, betonlook e.a.)',
    'Vakkundige egalisatie van de ondervloer',
    'Verlijmen of zwevend leggen van de vloer, afhankelijk van de situatie',
    'Afwerking met plinten, profielen en drempels',
    'Advies over onderhoud, geluiddemping en vloerverwarming'
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
};

export default pvcVloeren;
