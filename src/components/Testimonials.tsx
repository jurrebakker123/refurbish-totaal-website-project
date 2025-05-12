import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
const testimonials = [{
  id: 1,
  name: 'Annemarie de Vries',
  role: 'Woningeigenaar',
  quote: 'Refurbish Totaal heeft onze woning perfect geschilderd en de stucwerken zijn prachtig uitgevoerd. Zeer tevreden met de netheid en de kwaliteit van het werk.',
  rating: 5
}, {
  id: 2,
  name: 'Mark Jansen',
  role: 'VvE Voorzitter',
  quote: 'Als voorzitter van onze VvE heb ik Refurbish Totaal ingeschakeld voor dakrenovatie en schilderwerk. Ze hebben alles vakkundig opgeleverd, binnen budget en planning.',
  rating: 5
}, {
  id: 3,
  name: 'Bouwbedrijf Van Houten',
  role: 'Zakelijke klant',
  quote: 'Al jarenlang werken wij samen met Refurbish Totaal voor diverse projecten. De kwaliteit en betrouwbaarheid maken hen een ideale partner voor ons.',
  rating: 4
}, {
  id: 4,
  name: 'Petra Willemsen',
  role: 'Woningeigenaar',
  quote: 'De PVC vloer die Refurbish Totaal heeft gelegd ziet er prachtig uit. De vakmannen waren vriendelijk, netjes en zeer bekwaam. Echt een aanrader!',
  rating: 5
}, {
  id: 5,
  name: 'Woningcorporatie Heimond',
  role: 'Zakelijke klant',
  quote: 'Voor het onderhoud van ons woningbestand werken wij al jaren samen met Refurbish Totaal. Hun servicegerichtheid en flexibiliteit maakt hen een betrouwbare partner.',
  rating: 4
}];
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <motion.div className="text-center max-w-3xl mx-auto mb-12" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <h2 className="section-title">Wat Onze Klanten Zeggen</h2>
          <p className="text-lg text-gray-600">
            Ontdek waarom zowel particuliere als zakelijke klanten kiezen voor de kwaliteit en service van Refurbish Totaal Nederland.
          </p>
        </motion.div>
        
        <div className="px-4 sm:px-8 md:px-16 lg:px-24">
          <Carousel className="w-full" opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          startIndex: activeIndex
        }}>
            <CarouselContent>
              {testimonials.map(testimonial => <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div className="h-full bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow" whileHover={{
                y: -5
              }} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5
              }}>
                    <div className="flex mb-4">
                      {Array(5).fill(0).map((_, i) => <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />)}
                    </div>
                    <blockquote className="mb-6 italic text-gray-600">"{testimonial.quote}"</blockquote>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </motion.div>
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Google Review Button Section */}
        <motion.div className="mt-12 flex justify-center" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }}>
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl text-center">
            <div className="text-5xl font-bold text-brand-darkGreen mb-4">9.3</div>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-lg text-gray-600 mb-6">Gemiddelde klantwaardering op basis van 10 reviews</p>
            
            <a href="https://g.page/r/CX-UvINH1PMVEAI/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#4285F4]">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Laat een Google Review achter
            </a>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Testimonials;