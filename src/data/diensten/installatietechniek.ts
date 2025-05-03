
import { DienstData } from '../types/dienst';
import { Wrench } from 'lucide-react';
import React from 'react';

const installatietechniek: DienstData = {
  title: 'Installatietechniek',
  description: 'Complete elektra- en loodgieterswerkzaamheden voor nieuwbouw en renovatieprojecten.',
  longDescription: 'Onze gecertificeerde installateurs zorgen voor veilige en betrouwbare elektra- en loodgietersinstallaties voor zowel nieuwbouw als renovatieprojecten. Wij werken volgens de laatste normen en veiligheidsvoorschriften.',
  icon: React.createElement(Wrench, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Elektra aanleggen of vernieuwen',
    'Groepenkast vervangen of uitbreiden',
    'Water- en gasleidingen aanleggen of vervangen',
    'Badkamer en toilet installaties',
    'Vloerverwarming aanleggen',
    'Domotica en slimme huisinstallaties'
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
  image: '/lovable-uploads/b63f65bc-1311-409d-a72e-1c3304444e05.png'
};

export default installatietechniek;
