
import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

const DakkapelTestimonials = () => {
  const testimonials = [
    {
      name: "Peter van Dijk",
      location: "Amsterdam",
      rating: 5,
      text: "Onze dakkapel is perfect geplaatst door het team van Refurbish. De extra ruimte maakt een enorm verschil en de afwerking is van topkwaliteit. Zeer tevreden!",
      service: "Dakkapel op maat"
    },
    {
      name: "Familie de Boer",
      location: "Utrecht",
      rating: 5,
      text: "Binnen één dag stond onze nieuwe dakkapel. Professionele installatie, nette afwerking en goede communicatie. De ruimte in onze slaapkamer is nu optimaal benut.",
      service: "Prefab dakkapel"
    },
    {
      name: "Marieke Jansen",
      location: "Rotterdam",
      rating: 4,
      text: "Onze oude dakkapel is volledig gerenoveerd en ziet er weer als nieuw uit. De isolatie is merkbaar verbeterd en we hebben geen lekkages meer. Fijne samenwerking!",
      service: "Dakkapel renovatie"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Wat onze klanten zeggen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ontdek waarom honderden tevreden klanten kiezen voor de kwaliteit en service van Refurbish Dakkapel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-lg relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-lightGreen rounded-full flex items-center justify-center text-white">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <div className="pl-4 mb-4">
                <div className="flex mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} className="h-5 w-5 text-gray-300" />
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
            <div className="text-5xl font-bold text-brand-darkGreen mb-4">9.3</div>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Gemiddelde klantwaardering op basis van 127 reviews
            </p>
            
            <a 
              href="https://g.page/r/CaugvSM-hsKnEAI/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#4285F4]">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Laat een Google Review achter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DakkapelTestimonials;
