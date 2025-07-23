
import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    quote: 'Ik ben zeer tevreden over hoe alles verliep en het werk. Er was een prettig contact via de app. Er werd snel gereageerd en meegedacht. De werklieden waren zeer vriendelijk en hebben echt vakwerk geleverd. De muren en plafonds zijn super strak geworden. Ik zal Mazen en zijn vakmensen zeker aanraden.',
    service: 'Stucwerk binnen',
    details: '100 m² wanden; 88 m² plafonds; Woonkamer, Slaapkamer',
    rating: 5
  },
  {
    id: 2,
    quote: 'Wij zijn zeer tevreden. Vriendelijke mensen, goede communicatie en zeer tevreden over het eindresultaat. Zeker een aanbeveling!',
    service: 'Buitenschilderwerk',
    details: 'Kozijnen, Houten panelen',
    rating: 5
  },
  {
    id: 3,
    quote: 'Aardige bekwame schilder. Klus was snel geklaard. Luisteren goed naar je feedback en waar nodig komen ze met een alternatief. Ze zorgen ervoor dat de klus naar tevredenheid wordt afgerond.',
    service: 'Binnenschilderwerk',
    details: '4 deuren; 5 raamkozijnen; 1 trap',
    rating: 5
  },
  {
    id: 4,
    quote: 'Schilderklus prima uitgevoerd, snel na de aanvraag en voor een redelijke prijs. Communicatie verliep soepel, vriendelijk en professioneel. Dus ik kan dit bedrijf van harte aanbevelen.',
    service: 'Binnenschilderwerk',
    details: '1 trap; Slaapkamer(s), Gang, Trapgang(en), WC',
    rating: 5
  },
  {
    id: 5,
    quote: 'Schilderen van binnendeuren prima uitgevoerd. Sympathieke hardwerkende mannen, en alles netjes en schoon opgeleverd.',
    service: 'Binnenschilderwerk',
    details: '7 deuren; 7 raamkozijnen; 7 opdekdeuren',
    rating: 5
  },
  {
    id: 6,
    quote: 'Buitenschilderwerk zeer kundig verricht. Personeel is vriendelijk en behulpzaam. Zeker een aanrader!',
    service: 'Schilderwerk buiten',
    details: 'Buitenmuur, Deuren, Kozijnen, Dakgoten',
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play functionality - slower transition
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % testimonials.length);
    }, 8000); // Increased to 8 seconds for more relaxed pace
    return () => clearInterval(interval);
  }, []);

  // Function to render stars with 4.8 rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasPartialStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
      );
    }
    
    if (hasPartialStar) {
      const partialWidth = (rating % 1) * 100;
      stars.push(
        <div key="partial" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <div className="overflow-hidden absolute" style={{ width: `${partialWidth}%` }}>
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Wat Anderen Zeggen</h2>
          <p className="text-lg text-gray-600">
            Ontdek waarom onze klanten kiezen voor de kwaliteit en service van Refurbish Totaal Nederland.
          </p>
        </motion.div>
        
        <div className="px-4 sm:px-8 md:px-16 lg:px-24">
          <Carousel 
            className="w-full" 
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              startIndex: activeIndex
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="relative h-full bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-brand-lightGreen rounded-full flex items-center justify-center text-white shadow-lg z-10">
                      <Quote className="h-4 w-4" />
                    </div>
                    
                    <div className="flex mb-4 mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="mb-4 italic text-gray-600 text-sm leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-brand-darkGreen text-sm">{testimonial.service}</h4>
                      <p className="text-xs text-gray-500 mt-1">{testimonial.details}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Google Review Button Section */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl text-center">
            <div className="text-5xl font-bold text-brand-darkGreen mb-4">4.8/5.0</div>
            <div className="flex justify-center mb-4">
              {renderStars(4.8)}
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Gemiddelde klantwaardering op basis van echte klantreviews
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
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
