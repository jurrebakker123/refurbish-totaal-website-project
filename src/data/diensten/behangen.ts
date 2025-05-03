
import { DienstData } from '../types/dienst';
import { Wallpaper } from 'lucide-react';
import React from 'react';

const behangen: DienstData = {
  title: 'Behangen',
  description: 'Professioneel behangwerk met oog voor detail en een perfect eindresultaat.',
  longDescription: 'Ons team van ervaren behangers zorgt ervoor dat uw wanden een prachtige afwerking krijgen met behang naar keuze. Van klassiek tot modern, van effen tot met patroon - wij zorgen voor een perfect eindresultaat.',
  icon: React.createElement(Wallpaper, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Behang verwijderen en ondergrond voorbereiden',
    'Aanbrengen van luxe behang en wandbekleding',
    'Fotobehang op maat',
    'Vliesbehang en traditioneel behang',
    'Textiel- en vinylbehang',
    'Reparatie van bestaand behangwerk'
  ],
  benefits: [
    'Snelle en effectieve woningmetamorfose',
    'Breed assortiment aan designs en materialen',
    'Perfect strakke afwerking',
    'Professioneel advies over materiaal en design',
    'Duurzame en hoogwaardige resultaten'
  ],
  faqs: [
    { 
      question: 'Hoe lang gaat behang gemiddeld mee?', 
      answer: 'Dit hangt sterk af van het type behang en de ruimte waarin het is aangebracht. Kwaliteitsbehang in een normaal gebruikte woonkamer gaat gemiddeld 7-10 jaar mee voordat het aan vervanging toe is.' 
    },
    { 
      question: 'Moet de oude behang altijd eerst verwijderd worden?', 
      answer: 'Voor het beste resultaat is het altijd aan te raden om oud behang te verwijderen. In sommige gevallen kan er over bestaand behang geplakt worden, maar dit is afhankelijk van de conditie van het oude behang en het type nieuw behang.' 
    },
    { 
      question: 'Hoe lang duurt het behangen van een gemiddelde kamer?', 
      answer: 'Voor een gemiddelde kamer (circa 4x4 meter) moet u rekenen op ongeveer één werkdag voor het complete behangwerk, inclusief de voorbereidingen. Bij complexe patronen of een moeilijke ondergrond kan dit iets langer duren.' 
    }
  ],
  image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80'
};

export default behangen;
