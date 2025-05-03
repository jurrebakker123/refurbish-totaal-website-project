
import { DienstData } from '../types/dienst';
import { Home } from 'lucide-react';
import React from 'react';

const dakkapel: DienstData = {
  title: 'Dakkapel',
  description: 'Meer ruimte en licht in uw woning',
  longDescription: 'Een dakkapel is een uitbouw op het dak van een woning. Het vergroot de ruimte en lichtinval op uw zolder, waardoor deze beter benut kan worden als slaap-, werk- of hobbyruimte. Bij Refurbish Totaal Nederland plaatsen we kwalitatief hoogwaardige dakkapellen die perfect bij uw woning passen.',
  icon: React.createElement(Home, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Professionele plaatsing',
    'Diverse stijlen',
    'Hoogwaardige isolatie',
    'Snelle realisatie',
    'Vergunning aanvragen'
  ],
  benefits: [
    'Meer leefruimte in uw woning',
    'Meer lichtinval op zolder',
    'Verhoogde waarde van uw huis',
    'Betere ventilatiemogelijkheden',
    'Modern en stijlvol uiterlijk',
    'Energiezuinig door goede isolatie'
  ],
  faqs: [
    {
      question: 'Heb ik een vergunning nodig voor een dakkapel?',
      answer: 'Dit is afhankelijk van de locatie, afmetingen en gemeentelijke regelgeving. In veel gevallen is een dakkapel aan de achterzijde vergunningsvrij, maar aan de voorzijde is vaak een vergunning nodig. Wij kunnen u adviseren over de specifieke regelgeving in uw situatie.'
    },
    {
      question: 'Hoe lang duurt het plaatsen van een dakkapel?',
      answer: 'Het plaatsen van een dakkapel duurt meestal 1-2 werkdagen, afhankelijk van de grootte en complexiteit. De voorbereiding, zoals het aanvragen van vergunningen en het op maat maken van de dakkapel, neemt meer tijd in beslag.'
    },
    {
      question: 'Uit welke materialen kan ik kiezen voor mijn dakkapel?',
      answer: 'We bieden verschillende materialen aan, zoals kunststof, hout en aluminium. Elk materiaal heeft zijn eigen voordelen qua onderhoud, isolatiewaarde en uitstraling. Onze adviseurs helpen u graag bij het maken van de juiste keuze.'
    },
    {
      question: 'Kan een dakkapel op elk type dak geplaatst worden?',
      answer: 'Een dakkapel kan op de meeste schuine daken geplaatst worden, maar er zijn wel voorwaarden aan de dakhelling, de constructie en de beschikbare ruimte. Tijdens een vrijblijvend adviesgesprek beoordelen we of uw dak geschikt is.'
    },
    {
      question: 'Hoe is de isolatie van een dakkapel geregeld?',
      answer: 'Onze dakkapellen zijn goed geïsoleerd en voldoen aan de huidige bouwnormen. We gebruiken hoogwaardige isolatiematerialen voor zowel het dak, de zijwanden als de borstweringen, en plaatsen HR++ of triple glas voor optimale energieprestaties.'
    }
  ],
  image: '/lovable-uploads/65649027-1dd5-42b4-9622-1a7bc475e30d.png'
};

export default dakkapel;
