
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Annemarie de Vries',
    role: 'Woningeigenaar',
    quote: 'Refurbish Totaal heeft onze woning perfect geschilderd en de stucwerken zijn prachtig uitgevoerd. Zeer tevreden met de netheid en de kwaliteit van het werk.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mark Jansen',
    role: 'VvE Voorzitter',
    quote: 'Als voorzitter van onze VvE heb ik Refurbish Totaal ingeschakeld voor dakrenovatie en schilderwerk. Ze hebben alles vakkundig opgeleverd, binnen budget en planning.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Bouwbedrijf Van Houten',
    role: 'Zakelijke klant',
    quote: 'Al jarenlang werken wij samen met Refurbish Totaal voor diverse projecten. De kwaliteit en betrouwbaarheid maken hen een ideale partner voor ons.',
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Wat Onze Klanten Zeggen</h2>
          <p className="text-lg text-gray-600">
            Ontdek waarom zowel particuliere als zakelijke klanten kiezen voor de kwaliteit en service van Refurbish Totaal Nederland.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-50 p-8 rounded-lg border border-gray-100"
            >
              <div className="flex mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <blockquote className="mb-6 italic text-gray-600">"{testimonial.quote}"</blockquote>
              <div>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;
