
import React from 'react';
import { Star, Quote } from 'lucide-react';

const IsolatieTestimonials = () => {
  const testimonials = [
    {
      name: "Marcel de Vries",
      location: "Amsterdam",
      rating: 5,
      text: "Ik heb mijn spouwmuren laten isoleren en merk direct verschil. Het blijft veel langer warm in huis en mijn gasrekening is flink gedaald. De medewerkers waren vriendelijk en hebben alles netjes achtergelaten.",
      service: "Spouwmuurisolatie"
    },
    {
      name: "Esther Jansen",
      location: "Rotterdam",
      rating: 5,
      text: "De dakisolatie was binnen één dag geplaatst. Sindsdien hebben we geen last meer van een te warme zolderkamer in de zomer of koude ruimtes in de winter. Zeer tevreden met het resultaat!",
      service: "Dakisolatie"
    },
    {
      name: "Johan Bakker",
      location: "Utrecht",
      rating: 4,
      text: "Heel blij met de vloerisolatie. Eindelijk geen koude voeten meer in de woonkamer! De adviseur nam de tijd om alles goed uit te leggen en kwam met een passend advies voor onze situatie.",
      service: "Vloerisolatie"
    },
    {
      name: "Annemieke van Dijk",
      location: "Groningen",
      rating: 5,
      text: "We hebben het enkelglas vervangen door HR++ glas en wat een verschil! Veel minder tocht, geen condensvorming meer op de ramen en het is veel stiller in huis. De installatie ging snel en probleemloos.",
      service: "HR++ Glasisolatie"
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Wat onze klanten zeggen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meer dan 10.000 tevreden klanten gingen u voor. Lees hieronder hun ervaringen met onze isolatieoplossingen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-lg relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-lightGreen rounded-full flex items-center justify-center text-white">
                <Quote className="h-6 w-6" />
              </div>
              <div className="pl-4 mb-4">
                <div className="flex mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.service}</p>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl text-center">
            <div className="text-5xl font-bold text-brand-darkGreen mb-4">9.4</div>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg text-gray-600">
              Gemiddelde klantwaardering op basis van 856 reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsolatieTestimonials;
