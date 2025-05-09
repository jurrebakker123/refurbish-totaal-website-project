
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IsolatieFAQ = () => {
  const faqs = [
    {
      question: "Wat kost woningisolatie gemiddeld?",
      answer: "De kosten van woningisolatie variëren per type isolatie en de grootte van uw woning. Gemiddeld kost spouwmuurisolatie tussen de €15 en €25 per m², dakisolatie tussen €30 en €60 per m², vloerisolatie tussen €25 en €40 per m² en HR++ glasisolatie tussen €150 en €250 per m². Voor een exacte prijsopgave kunt u vrijblijvend een offerte aanvragen."
    },
    {
      question: "Hoe lang duurt het isoleren van mijn woning?",
      answer: "De meeste isolatiewerkzaamheden kunnen binnen één dag worden uitgevoerd. Spouwmuurisolatie duurt meestal enkele uren, vloerisolatie en dakisolatie kunnen vaak binnen één werkdag worden geplaatst. Voor HR++ glasisolatie hangt de tijdsduur af van het aantal ramen dat vervangen moet worden."
    },
    {
      question: "Wat zijn de besparingen na het isoleren van mijn woning?",
      answer: "Na het isoleren van uw woning kunt u tot 60% besparen op uw energierekening, afhankelijk van welke isolatiemaatregelen u neemt. Spouwmuurisolatie levert gemiddeld 25-30% besparing op, dakisolatie 20-25%, vloerisolatie 10-15% en HR++ glasisolatie 15-20%. Daarnaast verhoogt isolatie het wooncomfort en de waarde van uw woning."
    },
    {
      question: "Kan iedere woning geïsoleerd worden?",
      answer: "De meeste woningen kunnen worden geïsoleerd, maar de mogelijkheden verschillen per woning. Factoren zoals het bouwjaar, de bouwconstructie en de staat van de woning bepalen welke isolatiemaatregelen mogelijk zijn. Tijdens een vrijblijvende inspectie bekijken we welke isolatieoplossingen het meest geschikt zijn voor uw specifieke situatie."
    },
    {
      question: "Zijn er subsidies beschikbaar voor woningisolatie?",
      answer: "Ja, er zijn diverse subsidies en financieringsmogelijkheden voor woningisolatie. De ISDE-subsidie (Investeringssubsidie Duurzame Energie) biedt bijvoorbeeld tot 30% subsidie op isolatiemaatregelen. Ook bieden veel gemeenten lokale subsidies aan. Onze adviseurs kunnen u informeren over de actuele subsidiemogelijkheden en helpen bij het aanvragen ervan."
    },
    {
      question: "Welke garantie krijg ik op de isolatiewerkzaamheden?",
      answer: "Wij geven minimaal 10 jaar garantie op al onze isolatiewerkzaamheden en de gebruikte materialen. Voor sommige isolatieoplossingen, zoals spouwmuurisolatie, geldt zelfs een garantie van 25 jaar. Na de installatie ontvangt u een garantiecertificaat waarin alle voorwaarden duidelijk zijn vastgelegd."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Veelgestelde vragen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Antwoord op de meest gestelde vragen over woningisolatie.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Heeft u een andere vraag? Neem gerust contact met ons op.
            </p>
            <a 
              href="#contact-section" 
              className="btn-primary inline-flex items-center justify-center"
            >
              Stel uw vraag
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsolatieFAQ;
