
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function DakkapelFAQ() {
  const faqs = [
    {
      question: "Heb ik een vergunning nodig voor een dakkapel?",
      answer: "In veel gevallen kunt u een dakkapel vergunningsvrij plaatsen aan de achterkant van uw woning. Voor de voorzijde is vaak wel een vergunning nodig. Wij kunnen u adviseren over de specifieke regels die gelden in uw gemeente en helpen bij het aanvragen van een eventuele vergunning."
    },
    {
      question: "Hoe lang duurt het plaatsen van een dakkapel?",
      answer: "De plaatsing van een standaard dakkapel duurt meestal slechts één dag. Bij grotere of complexere projecten kan dit oplopen tot 2-3 dagen. De totale doorlooptijd vanaf bestelling tot plaatsing is gemiddeld 4-6 weken, afhankelijk van het seizoen en drukte."
    },
    {
      question: "Wat kost een dakkapel?",
      answer: "De prijs van een dakkapel is afhankelijk van verschillende factoren zoals de grootte, het materiaal en eventuele extra opties. Prijzen beginnen vanaf ongeveer €5.000 voor een prefab dakkapel. Voor een exacte prijsopgave maken wij graag een offerte op maat na een vrijblijvende inmeting."
    },
    {
      question: "Welke materialen worden gebruikt voor de dakkapel?",
      answer: "Wij gebruiken hoogwaardige materialen zoals kunststof, aluminium of hout voor onze dakkapellen. De keuze voor materiaal hangt af van uw wensen, budget en de stijl van uw woning. Alle materialen zijn duurzaam, onderhoudsarm en hebben een lange levensduur."
    },
    {
      question: "Wat houdt de garantie precies in?",
      answer: "Wij bieden standaard 10 jaar garantie op al onze dakkapellen. Deze garantie dekt constructiefouten, materiaaldefecten en waterdichtheid. Daarnaast geven wij 2 jaar garantie op alle bewegende delen zoals ramen en deuren."
    },
    {
      question: "Is er veel onderhoud nodig aan een dakkapel?",
      answer: "Onze dakkapellen zijn ontworpen om onderhoudsarm te zijn. Afhankelijk van het gekozen materiaal is er weinig tot geen onderhoud nodig. Kunststof en aluminium dakkapellen hebben praktisch geen onderhoud nodig, terwijl houten dakkapellen af en toe een schilderbeurt nodig hebben."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            Veelgestelde Vragen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Antwoorden op de meest gestelde vragen over dakkapellen
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <AccordionTrigger className="text-left font-medium text-lg text-brand-darkGreen">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
