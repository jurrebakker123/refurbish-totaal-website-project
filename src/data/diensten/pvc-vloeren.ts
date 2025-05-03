
import { DienstData } from '../types/dienst';
import { SquareGanttChart } from 'lucide-react';
import React from 'react';

const pvcVloeren: DienstData = {
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
  image: '/lovable-uploads/a9b0106d-07f8-457b-bf57-185f81ec746f.png'
};

export default pvcVloeren;
