
import { DienstData } from '../types/dienst';
import { Home } from 'lucide-react';
import React from 'react';

const dakrenovatie: DienstData = {
  title: 'Dakrenovatie',
  description: 'Complete dakrenovaties, reparaties en onderhoud voor een waterdicht en energiezuinig dak.',
  longDescription: 'Een betrouwbaar dak is essentieel voor de bescherming en duurzaamheid van elke woning of bedrijfsruimte. Refurbish Totaal Nederland levert complete dakrenovaties op maat, waarbij veiligheid, isolatie en levensduur centraal staan.',
  icon: React.createElement(Home, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Vervanging van dakbedekking (bitumen, dakpannen, EPDM, etc.)',
    'Herstel of vernieuwing van dakconstructies',
    'Isolatieverbetering volgens de nieuwste normen (binnenzijde of buitenzijde)',
    'Aanbrengen van dakdoorvoeren, dakramen of dakkapellen',
    'Lood-, zink- en dakgootwerkzaamheden'
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
  image: 'https://images.unsplash.com/photo-1632759145399-0e4913e71a51?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
};

export default dakrenovatie;
