
import React from 'react';
import { Star } from 'lucide-react';

export function BouwhulpTestimonials() {
  const testimonials = [
    {
      name: "Joost van Dijk",
      role: "Huiseigenaar",
      comment: "Refurbishbouwhulp heeft onze badkamer compleet gerenoveerd. Uitstekende kwaliteit, binnen de afgesproken tijd en budget. Zeer tevreden!",
      rating: 5,
    },
    {
      name: "Linda Smeets",
      role: "Projectmanager",
      comment: "Voor ons kantoorpand hadden we verschillende klussen die gedaan moesten worden. Refurbishbouwhulp leverde snel en vakkundig werk!",
      rating: 5,
    },
    {
      name: "Klaas Jansen",
      role: "Huiseigenaar",
      comment: "Al jaren maken we gebruik van hun klusdiensten voor onderhoud aan ons huis. Betrouwbare en deskundige vakmensen die je echt kunt vertrouwen.",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Wat Onze Klanten Zeggen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Onze trots zit in de tevredenheid van onze klanten en de kwaliteit die we elke dag leveren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
              <div>
                <p className="font-medium text-brand-darkGreen">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
