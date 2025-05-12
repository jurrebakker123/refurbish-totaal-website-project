
import { DienstData } from '../types/dienst';
import { Thermometer } from 'lucide-react';
import React from 'react';

const isolatietechniek: DienstData = {
  title: 'Isolatietechniek',
  description: 'Energie besparen begint bij goede isolatie. Refurbish Totaal Nederland biedt doeltreffende isolatieoplossingen voor woningen en bedrijfspanden die comfort verhogen en energiekosten verlagen. Onze aanpak is technisch onderbouwd, duurzaam en afgestemd op uw situatie.',
  longDescription: 'Energie besparen begint bij goede isolatie. Refurbish Totaal Nederland biedt doeltreffende isolatieoplossingen voor woningen en bedrijfspanden die comfort verhogen en energiekosten verlagen. Onze aanpak is technisch onderbouwd, duurzaam en afgestemd op uw situatie. Wij werken met erkende producten en systemen zoals het ATI Pro Isolatie Systeem, dat garant staat voor een langdurig isolerend effect en een hoge Rc-waarde.',
  icon: React.createElement(Thermometer, { size: 48, className: "text-brand-lightGreen mb-6" }),
  features: [
    'Spouwmuurisolatie met hoogwaardige inblaas- of schuimisolatie',
    'Vloerisolatie met drukvaste isolatieplaten of gespoten schuim',
    'Dak- en zolderisolatie (aan de binnen- of buitenzijde)',
    'Isolatie van dakkapellen, uitbouwen en houten vloeren',
    'Thermografische inspecties en advies op maat',
    'Erkende producten en systemen zoals het ATI Pro Isolatie Systeem'
  ],
  benefits: [
    'Lagere energiekosten',
    'Verhoogd wooncomfort',
    'Waardestijging van uw woning',
    'Duurzamer leven',
    'Verminderde CO2-uitstoot',
    'Verbeterde akoestiek in huis'
  ],
  faqs: [
    { 
      question: 'Welk type isolatie is het meest geschikt voor mijn woning?', 
      answer: 'Dit hangt af van verschillende factoren zoals de bouwperiode van uw woning, de huidige isolatiewaarde en uw budget. Bij oudere woningen zonder spouwisolatie kan spouwmuurisolatie een zeer effectieve eerste stap zijn. Bij nieuwere woningen geeft het isoleren van de vloer en het dak vaak de beste resultaten. Tijdens onze inspectie maken we een gerichte analyse en geven we u daarop gebaseerd advies.' 
    },
    { 
      question: 'Hoe snel verdien ik de investering in isolatie terug?', 
      answer: 'De terugverdientijd van isolatiemaatregelen varieert meestal tussen de 3 en 8 jaar, afhankelijk van het type isolatie, de grootte van de woning en uw energieverbruik. Door stijgende energieprijzen wordt deze periode steeds korter. Bovendien profiteert u direct van een verhoogd wooncomfort en een waardestijging van uw pand.' 
    },
    { 
      question: 'Kan ik subsidie krijgen voor isolatiemaatregelen?', 
      answer: 'Ja, er zijn verschillende subsidieregelingen beschikbaar voor woningisolatie, zoals de ISDE-subsidie voor eigenaar-bewoners. Deze kunnen oplopen tot 30% van de investeringskosten. Ook zijn er vaak lokale subsidies vanuit uw gemeente. We informeren u graag over de actuele mogelijkheden tijdens het adviesgesprek.' 
    }
  ],
  image: '/lovable-uploads/43b44fd9-a2c6-4670-9ec2-b2dbe73b1a5f.png'
};

export default isolatietechniek;
