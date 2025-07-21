
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallToActionSection from '@/components/CallToActionSection';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';

const projects = [
  {
    id: 1,
    title: 'Volledige woningrenovatie - Stukadoorwerk',
    location: 'Amsterdam',
    category: 'Stukadoor',
    description: 'Complete stucwerk renovatie van een jaren 30 woning, inclusief gladpleisterwerk in alle ruimtes. De woning is volledig voorzien van nieuw stucwerk met behoud van authentieke elementen.',
    challenges: 'Uitdagingen waren het behouden van originele ornamenten terwijl moderne stuctechnieken werden geïntegreerd.',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'Buitenschilderwerk villa',
    location: 'Utrecht',
    category: 'Schilderwerk',
    description: 'Volledig buitenschilderwerk van een vrijstaande villa, inclusief houtrotreparaties en vervanging van kozijnen waar nodig. Gebruik van hoogwaardige verf voor langdurige bescherming.',
    challenges: 'Door het werken met hoogwaardige materialen en grondige voorbereiding hebben we een resultaat bereikt dat jaren meegaat.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 3,
    title: 'Dakkapel plaatsing jaren \'30 woning',
    location: 'Rotterdam',
    category: 'Dakkapel',
    description: 'Complete plaatsing van een nieuwe dakkapel op een karakteristieke jaren 30 woning. Inclusief isolatie en nieuwe dakramen voor meer natuurlijk licht en ruimte.',
    challenges: 'De uitdaging lag in het behouden van het authentieke karakter van het dak terwijl een moderne dakkapel werd geïntegreerd.',
    imageUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 4,
    title: 'Interieur schilderwerk appartement',
    location: 'Den Haag',
    category: 'Schilderwerk',
    description: 'Volledige binnenschildering van een modern appartement. Inclusief wanden, plafonds en al het houtwerk. Professionele afwerking met hoogwaardige muurverf.',
    challenges: 'In een beperkte ruimte hebben we efficiënt gewerkt met minimale overlast voor de bewoners.',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 5,
    title: 'Moderne dakkapel met zonnepanelen',
    location: 'Eindhoven',
    category: 'Dakkapel',
    description: 'Plaatsing van een moderne dakkapel met geïntegreerde zonnepanelen. De dakkapel combineert extra woonruimte met duurzame energieopwekking.',
    challenges: 'Door een strakke planning en samenwerking met elektriciens hebben we dakkapel en zonnepanelen perfect geïntegreerd.',
    imageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
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
                Ontdek een selectie van onze recente dakkapel-, schilderwerk- en stukadoorprojecten. 
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
