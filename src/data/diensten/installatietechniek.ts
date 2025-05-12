
import { DienstData } from '../types/dienst';
import { Wrench } from 'lucide-react';
import React from 'react';

const installatietechniek: DienstData = {
  title: 'Installatietechniek',
  description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
  longDescription: 'Refurbish Totaal Nederland levert betrouwbare en toekomstgerichte oplossingen op het gebied van installatietechniek. Onze gecertificeerde vakmensen verzorgen complete installaties en aanpassingen binnen renovatie- en verbouwprojecten, met oog voor comfort, veiligheid en energie-efficiëntie.',
  icon: React.createElement(Wrench, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Elektrotechniek: aanleg, uitbreiding en vernieuwing van elektrische installaties volgens NEN-normen',
    'Airconditioning: levering, installatie en onderhoud van energiezuinige aircosystemen',
    'Zonnepanelen: advies, plaatsing en aansluiting van PV-installaties met monitoring',
    'Loodgieterswerk: leidingwerk voor water en gas, sanitairinstallaties en afvoersystemen'
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
};

export default installatietechniek;
