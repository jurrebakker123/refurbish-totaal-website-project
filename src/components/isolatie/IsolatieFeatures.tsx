
import React from 'react';
import { PhoneCall, ClipboardList, Home, Truck, Calendar, ThumbsUp } from 'lucide-react';

const IsolatieFeatures = () => {
  const steps = [
    {
      icon: <PhoneCall size={28} className="text-white" />,
      title: "Gratis adviesgesprek",
      description: "Begin met een vrijblijvend adviesgesprek over de isolatiemogelijkheden voor uw woning. Onze experts luisteren naar uw wensen en situatie."
    },
    {
      icon: <Home size={28} className="text-white" />,
      title: "Inspectie ter plaatse",
      description: "Een van onze isolatie-experts komt bij u langs om uw woning te inspecteren en de beste technische oplossing voor uw situatie te bepalen."
    },
    {
      icon: <ClipboardList size={28} className="text-white" />,
      title: "Gedetailleerde offerte",
      description: "U ontvangt een gedetailleerde en transparante offerte met alle kosten, subsidies en besparingsmogelijkheden duidelijk uitgesplitst."
    },
    {
      icon: <Calendar size={28} className="text-white" />,
      title: "Inplanning",
      description: "Na akkoord plannen we samen met u een geschikte datum voor de uitvoering. We houden rekening met uw agenda en wensen."
    },
    {
      icon: <Truck size={28} className="text-white" />,
      title: "Uitvoering",
      description: "Onze gecertificeerde isolatiespecialisten voeren het werk vakkundig en netjes uit. Wij zorgen ervoor dat alles schoon en opgeruimd achterblijft."
    },
    {
      icon: <ThumbsUp size={28} className="text-white" />,
      title: "Nazorg & garantie",
      description: "Na oplevering ontvangt u alle garantiecertificaten en informatie over subsidies. Wij blijven beschikbaar voor eventuele vragen na de installatie."
    }
  ];

  return (
    <section className="py-16 bg-brand-darkGreen text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hoe werkt het?
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Onze werkwijze is eenvoudig, transparant en klantgericht. Van advies tot en met uitvoering: wij nemen u het hele proces uit handen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-brand-lightGreen rounded-full mb-4">
                  {step.icon}
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white text-brand-darkGreen font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                <p className="text-gray-200 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IsolatieFeatures;
