
import { DienstData } from '../types/dienst';
import { Building } from 'lucide-react';
import React from 'react';

const aanEnVerbouw: DienstData = {
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
  image: '/lovable-uploads/a346e449-9340-4cf7-be48-d58a75924dc0.png'
};

export default aanEnVerbouw;
