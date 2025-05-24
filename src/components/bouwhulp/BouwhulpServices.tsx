
import React from 'react';

export function BouwhulpServices() {
  const services = [
    {
      title: "Hulpkrachten",
      description: "Ongeschoolde en geschoolde hulpkrachten voor alle voorkomende werkzaamheden op de bouwplaats. Van grondwerk tot transport van materialen, onze flexibele medewerkers zorgen dat uw project vlot verloopt.",
    },
    {
      title: "Metselaars",
      description: "Ervaren metselaars voor nieuwbouw, renovatie en restauratieprojecten. Vakbekwame specialisten die precies weten hoe metselwerk uitgevoerd moet worden volgens de nieuwste normen.",
    },
    {
      title: "Timmerlieden",
      description: "Vakbekwame timmerlieden voor ruwbouw, afbouw en maatwerk projecten. Van dakconstructies tot kozijnen, onze timmerlieden leveren kwaliteitswerk op elke bouwplaats.",
    },
    {
      title: "Projectbegeleiding",
      description: "Ervaren voormannen en uitvoerders voor de begeleiding van uw bouwprojecten. Professionals die overzicht houden, kwaliteit bewaken en ervoor zorgen dat deadlines gehaald worden.",
    }
  ];

  return (
    <section id="diensten" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Ons Personeel Aanbod
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij leveren geschikt bouwpersoneel voor alle disciplines binnen uw aannemingsbedrijf.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
