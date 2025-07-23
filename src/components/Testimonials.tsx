
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api?.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000); // Increased from 3000ms to 5000ms for slower scrolling

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            Wat Anderen Zeggen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek wat onze klanten te zeggen hebben over onze diensten
          </p>
        </div>

        <div className="mb-12">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              duration: 20, // Slower transition duration
            }}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="relative h-full bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-brand-lightGreen rounded-full flex items-center justify-center text-white shadow-lg z-10">
                      <Quote className="h-5 w-5" />
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex justify-center">
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl text-center">
            <div className="text-5xl font-bold text-brand-darkGreen mb-4">4.8/5.0</div>
            <div className="flex justify-center mb-4 gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <div className="relative w-5 h-5">
                <Star className="w-5 h-5 text-gray-300 absolute" />
                <div className="overflow-hidden absolute w-4/5">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Gemiddelde klantwaardering op basis van echte klantreviews
            </p>
            <a
              href="https://g.page/r/CaugvSM-hsKnEAI/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-lightGreen text-white px-6 py-3 rounded-lg hover:bg-brand-darkGreen transition-colors"
            >
              <Star className="h-5 w-5" />
              Bekijk alle Google Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
