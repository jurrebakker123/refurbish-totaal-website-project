
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const testimonials = [
  {
    id: 1,
    name: "Tevreden klant",
    service: "Stucwerk binnen",
    text: "Ik ben zeer tevreden over hoe alles verliep en het werk. Er was een prettig contact via de app. Er werd snel gereageerd en meegedacht. Het contact verliep via Mazen. Hij stuurde de werklieden aan. De werklieden waren zeer vriendelijk en hebben echt vakwerk geleverd. De muren en plafonds zijn super strak geworden.",
    rating: 5
  },
  {
    id: 2,
    name: "Tevreden klant",
    service: "Buitenschilderwerk",
    text: "Wij zijn zeer tevreden. Vriendelijke mensen, goede communicatie en zeer tevreden over het eindresultaat. Zeker een aanbeveling!",
    rating: 5
  },
  {
    id: 3,
    name: "Tevreden klant",
    service: "Binnenschilderwerk",
    text: "Aardige bekwame schilder. Klus was snel geklaard. Luisteren goed naar je feedback en waar nodig komen ze met een alternatief. Ze zorgen ervoor dat de klus naar tevredenheid wordt afgerond.",
    rating: 5
  },
  {
    id: 4,
    name: "Tevreden klant",
    service: "Binnenschilderwerk",
    text: "Schilderklus prima uitgevoerd, snel na de aanvraag en voor een redelijke prijs. Communicatie verliep soepel, vriendelijk en professioneel. Dus ik kan dit bedrijf van harte aanbevelen.",
    rating: 5
  },
  {
    id: 5,
    name: "Tevreden klant",
    service: "Binnenschilderwerk",
    text: "Schilderen van binnendeuren prima uitgevoerd. Sympathieke hardwerkende mannen, en alles netjes en schoon opgeleverd.",
    rating: 5
  },
  {
    id: 6,
    name: "Tevreden klant",
    service: "Schilderwerk buiten",
    text: "Buitenschilderwerk zeer kundig verricht. Personeel is vriendelijk en behulpzaam. Zeker een aanrader!",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            Wat Anderen Zeggen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek wat onze klanten te zeggen hebben over onze diensten
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
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
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="border-t pt-4">
                      <p className="font-semibold text-brand-darkGreen">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.service}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl text-center">
            <div className="text-5xl font-bold text-brand-darkGreen mb-4">4.8/5.0</div>
            <div className="flex justify-center mb-4 gap-1">
              {renderStars(4.8)}
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Gemiddelde klantwaardering op basis van echte klantreviews
            </p>
            <a
              href="https://www.google.com/search?q=refurbish+totaal+nederland+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-lightGreen text-white px-6 py-3 rounded-lg hover:bg-brand-darkGreen transition-colors"
            >
              <Star className="h-5 w-5" />
              Bekijk alle Google Reviews
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
