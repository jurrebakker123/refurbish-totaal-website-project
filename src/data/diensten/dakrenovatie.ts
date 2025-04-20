
import { DienstData } from '../types/dienst';
import { Home } from 'lucide-react';
import React from 'react';

const dakrenovatie: DienstData = {
  title: 'Dakrenovatie',
  description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
  longDescription: 'Een goed onderhouden dak is essentieel voor de bescherming van uw woning. Ons ervaren team voert alle soorten dakrenovaties uit, van het vervangen van enkele dakpannen tot complete dakvernieuwing inclusief isolatie.',
  icon: React.createElement(Home, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Vernieuwen van dakbedekking (pannen, leien, bitumen)',
    'Isolatie van hellende en platte daken',
    'Dakkapellen plaatsen of renoveren',
    'Dakgoten repareren of vervangen',
    'Lood- en zinkwerk vernieuwen',
    'Velux dakramen plaatsen'
  ],
  benefits: [
    'Energiebesparing door betere isolatie',
    'Voorkomen van lekkages en vochtproblemen',
    'Waardevermeerdering van uw woning',
    'Verbeterde uitstraling van uw dak',
    'Langdurig onderhoudsvrij'
  ],
  faqs: [
    { 
      question: 'Is het mogelijk om zonnepanelen te plaatsen tijdens dakrenovatie?', 
      answer: 'Ja, dit is zelfs een ideaal moment omdat we de zonnepanelen direct optimaal kunnen integreren in het nieuwe dak.' 
    },
    { 
      question: 'Hoe lang duurt een complete dakrenovatie?', 
      answer: 'Dit is sterk afhankelijk van de grootte en complexiteit van het dak. Een gemiddelde dakrenovatie voor een rijtjeshuis duurt ongeveer 1-2 weken.' 
    },
    { 
      question: 'Is er een vergunning nodig voor dakrenovatie?', 
      answer: 'Voor een reguliere dakrenovatie waarbij de afmetingen en contouren niet veranderen is meestal geen vergunning nodig. Bij het plaatsen van dakkapellen of het wijzigen van de dakconstructie is wel een vergunning vereist. Wij kunnen u hierbij adviseren.' 
    }
  ],
  image: '/lovable-uploads/7a76c236-aae4-4eb2-82ca-df4ed5cd2c3a.png'
};

export default dakrenovatie;
