
import { DienstData } from '../types/dienst';
import { Home } from 'lucide-react';
import React from 'react';

const kozijntechniek: DienstData = {
  title: 'Kozijntechniek',
  description: 'Bij Refurbish Totaal Nederland verzorgen wij het vervangen, herstellen en plaatsen van kozijnen met vakmanschap en oog voor detail. Of het nu gaat om hout, kunststof of aluminium kozijnen, wij leveren maatwerkoplossingen die passen bij de stijl van uw woning en bijdragen aan energiezuinigheid en comfort.',
  longDescription: 'Bij Refurbish Totaal Nederland verzorgen wij het vervangen, herstellen en plaatsen van kozijnen met vakmanschap en oog voor detail. Of het nu gaat om hout, kunststof of aluminium kozijnen, wij leveren maatwerkoplossingen die passen bij de stijl van uw woning en bijdragen aan energiezuinigheid en comfort. Wij werken uitsluitend met duurzame materialen en houden bij elk project rekening met esthetiek, isolatiewaarde en gebruiksgemak. Uw kozijnproject is bij ons in vertrouwde handen — van advies tot en met perfecte afwerking.',
  icon: React.createElement(Home, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Vakkundige demontage en plaatsing van kozijnen',
    'Inmeten en leveren van maatwerk kozijnen (nieuwbouw of renovatie)',
    'Toepassing van hoogwaardige isolatieglas-systemen (HR++, triple)',
    'Herstel van houtrot of het moderniseren van bestaande kozijnen',
    'Integratie van ventilatieroosters en zonwering indien gewenst',
    'Perfecte afwerking, zowel binnen als buiten'
  ],
  benefits: [
    'Verhoogde isolatiewaarde',
    'Waardevermeerdering van uw woning',
    'Verbeterde veiligheid',
    'Onderhoudsarm',
    'Moderne en stijlvolle uitstraling',
    'Energiebesparing door betere isolatie'
  ],
  faqs: [
    { 
      question: 'Wat is het verschil tussen kunststof, aluminium en houten kozijnen?', 
      answer: 'Houten kozijnen hebben een klassieke uitstraling en zijn goed isolerend, maar vergen meer onderhoud. Kunststof kozijnen zijn onderhoudsarm, goed isolerend en prijstechnisch aantrekkelijk. Aluminium kozijnen zijn zeer duurzaam, slank en sterk, maar doorgaans iets duurder. Wij adviseren u graag over de beste keuze voor uw specifieke situatie.' 
    },
    { 
      question: 'Hoe lang duurt het vervangen van kozijnen?', 
      answer: 'De doorlooptijd hangt af van het aantal kozijnen, het materiaal en eventuele maatwerk. Doorgaans kunnen we een gemiddelde woning binnen 1-3 dagen voorzien van nieuwe kozijnen. Bij de intake geven we u een nauwkeurige planning.' 
    },
    { 
      question: 'Kan ik subsidie krijgen voor nieuwe kozijnen?', 
      answer: 'In sommige gevallen kunt u subsidie krijgen, vooral als de nieuwe kozijnen bijdragen aan energiebesparing. De ISDE-subsidie kan bijvoorbeeld van toepassing zijn bij toepassing van hoogwaardige isolatieglas. Wij kunnen u tijdens het adviesgesprek informeren over actuele subsidiemogelijkheden.' 
    }
  ],
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.1&auto=format&fit=crop&w=2080&q=80'
};

export default kozijntechniek;
