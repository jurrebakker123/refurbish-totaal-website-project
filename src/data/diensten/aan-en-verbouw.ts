
import { DienstData } from '../types/dienst';
import { Building } from 'lucide-react';
import React from 'react';

const aanEnVerbouw: DienstData = {
  title: 'Aan- en verbouw',
  description: 'Van kleine verbouwingen tot complete aanbouwen en uitbreidingen van uw woning.',
  longDescription: 'Of het nu gaat om extra ruimte, meer comfort of een volledige herindeling van uw woning of bedrijfspand — bij Refurbish Totaal Nederland realiseren we aan- en verbouwingen van A tot Z. Wij combineren bouwkundige expertise met praktische oplossingen, volledig afgestemd op uw wensen en budget.',
  icon: React.createElement(Building, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Uitbouwen, opbouwen en aanbouwen',
    'Interne verbouwingen (wanden verplaatsen, vloeren vernieuwen, plafonds aanpassen)',
    'Constructieve aanpassingen in overleg met constructeur of architect',
    'Vergunningstrajectbegeleiding indien nodig',
    'Complete coördinatie van bouwproces en onderaannemers'
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
};

export default aanEnVerbouw;
