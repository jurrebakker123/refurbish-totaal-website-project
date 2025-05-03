
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallToActionSection from '@/components/CallToActionSection';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';

const projects = [
  {
    id: 1,
    title: 'Volledige woningrenovatie',
    location: 'Amsterdam',
    category: 'Renovatie',
    description: 'Complete renovatie van een jaren 30 woning, inclusief nieuwe badkamer, keuken, en stucwerk in alle ruimtes. De woning is volledig gemoderniseerd met behoud van authentieke elementen.',
    challenges: 'Uitdagingen waren het behouden van originele ornamenten terwijl moderne installaties werden geïntegreerd.',
    imageUrl: '/lovable-uploads/b5d41da0-30bd-4787-a952-fdab69d3ac1a.png',
    beforeImageUrl: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png',
  },
  {
    id: 2,
    title: 'Buitenschilderwerk villa',
    location: 'Utrecht',
    category: 'Schilderwerk',
    description: 'Volledig buitenschilderwerk van een vrijstaande villa, inclusief houtrotreparaties en vervanging van kozijnen waar nodig. Gebruik van hoogwaardige verf voor langdurige bescherming.',
    challenges: 'Door het werken met hoogwaardige materialen en grondige voorbereiding hebben we een resultaat bereikt dat jaren meegaat.',
    imageUrl: '/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png',
    beforeImageUrl: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png',
  },
  {
    id: 3,
    title: 'Dakrenovatie jaren \'30 woning',
    location: 'Rotterdam',
    category: 'Dakrenovatie',
    description: 'Complete renovatie van het dak van een karakteristieke jaren 30 woning. Inclusief vervanging van dakpannen, isolatie en nieuwe dakramen voor meer natuurlijk licht.',
    challenges: 'De uitdaging lag in het behouden van het authentieke karakter van het dak terwijl moderne isolatie werd toegepast.',
    imageUrl: '/lovable-uploads/3b0229fd-9f27-4076-acc1-1ef2a7168e25.png',
    beforeImageUrl: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png',
  },
  {
    id: 4,
    title: 'Badkamerrenovatie',
    location: 'Amsterdam',
    category: 'Verbouwing',
    description: 'Volledige renovatie van een verouderde badkamer naar een moderne wellnessruimte. Inclusief inloopdouche, vrijstaand bad en op maat gemaakt badkamermeubel.',
    challenges: 'In een beperkte ruimte hebben we optimaal gebruik gemaakt van slimme indelingen en materialen.',
    imageUrl: '/lovable-uploads/b5d41da0-30bd-4787-a952-fdab69d3ac1a.png',
    beforeImageUrl: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png',
  },
  {
    id: 5,
    title: 'PVC vloer installatie kantoorpand',
    location: 'Eindhoven',
    category: 'PVC Vloeren',
    description: 'Installatie van hoogwaardige PVC vloeren in een modern kantoorpand van 500m². De vloer combineert praktische eigenschappen met een stijlvolle uitstraling.',
    challenges: 'Door een strakke planning en efficiënte werkwijze hebben we het project binnen 3 dagen kunnen afronden zonder bedrijfsactiviteiten te verstoren.',
    imageUrl: '/lovable-uploads/a9b0106d-07f8-457b-bf57-185f81ec746f.png',
    beforeImageUrl: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png',
  },
];

const ProjectenPage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section met aantrekkelijke afbeelding */}
        <section className="relative text-white py-24">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darkGreen/90 to-brand-darkGreen/70"></div>
          <div className="container relative z-10">
            <motion.div 
              className="max-w-3xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-5xl font-bold mb-6 leading-tight">Onze Projecten</h1>
              <p className="text-xl mb-8 text-gray-200">
                Ontdek een selectie van onze recente renovatie- en verbouwingsprojecten. 
                Van kleine transformaties tot complete metamorfoses, wij zorgen voor vakkundig uitgevoerd werk dat uw verwachtingen overtreft.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <motion.div 
              className="space-y-24"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                  variants={fadeIn}
                >
                  {/* Project Image */}
                  <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg group">
                    <div className="relative h-80 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full"
                      >
                        <OptimizedImage 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                          fallbackSrc="/placeholder.svg"
                        />
                      </motion.div>
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-brand-darkGreen text-xs font-bold px-2 py-1 rounded">
                        Na
                      </div>
                    </div>
                  </div>
                  {/* Project Details */}
                  <div className="w-full md:w-1/2">
                    <Badge className="mb-4 bg-brand-lightGreen hover:bg-brand-lightGreen/90">{project.category}</Badge>
                    <h3 className="text-2xl font-bold mb-3 text-brand-darkGreen">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{project.location}</p>
                    <p className="text-gray-700 mb-6">{project.description}</p>
                    <p className="italic text-gray-600">{project.challenges}</p>
                    {/* Before/After Comparison Button */}
                    <div className="mt-6 flex items-center gap-3">
                      <div className="relative overflow-hidden w-16 h-16 rounded">
                        <OptimizedImage 
                          src={project.beforeImageUrl} 
                          alt="Voor" 
                          className="w-full h-full object-cover"
                          fallbackSrc="/placeholder.svg"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-medium">
                          Voor
                        </div>
                      </div>
                      <div className="relative overflow-hidden w-16 h-16 rounded">
                        <OptimizedImage 
                          src={project.imageUrl} 
                          alt="Na" 
                          className="w-full h-full object-cover"
                          fallbackSrc="/placeholder.svg"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-medium">
                          Na
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectenPage;
