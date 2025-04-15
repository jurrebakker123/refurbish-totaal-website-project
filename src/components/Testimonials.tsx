
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  {
    id: 4,
    name: 'Petra Willemsen',
    role: 'Woningeigenaar',
    quote: 'De PVC vloer die Refurbish Totaal heeft gelegd ziet er prachtig uit. De vakmannen waren vriendelijk, netjes en zeer bekwaam. Echt een aanrader!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Woningcorporatie Heimond',
    role: 'Zakelijke klant',
    quote: 'Voor het onderhoud van ons woningbestand werken wij al jaren samen met Refurbish Totaal. Hun servicegerichtheid en flexibiliteit maakt hen een betrouwbare partner.',
    rating: 4,
  },
];

const Testimonials = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay]);

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
          <h2 className="section-title">Wat Onze Klanten Zeggen</h2>
          <p className="text-lg text-gray-600">
            Ontdek waarom zowel particuliere als zakelijke klanten kiezen voor de kwaliteit en service van Refurbish Totaal Nederland.
          </p>
        </motion.div>
        
        <div className="px-4 sm:px-8 md:px-16 lg:px-24">
          <Carousel 
            className="w-full"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="h-full bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
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
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
