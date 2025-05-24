
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Volledige woningrenovatie',
    location: 'Amsterdam',
    category: 'Renovatie',
    imageUrl: '/lovable-uploads/70e348ca-19f6-4888-9cf4-4ba36b481d5a.png',
    beforeImageUrl: '/lovable-uploads/86f735a8-487e-43c0-9703-193520a0aec0.png',
  },
  {
    id: 2,
    title: 'Buitenschilderwerk villa',
    location: 'Utrecht',
    category: 'Schilderwerk',
    imageUrl: '/lovable-uploads/f267d8c4-13cc-4af9-9a44-ff406caa4b4c.png',
    beforeImageUrl: '/lovable-uploads/b5d41da0-30bd-4787-a952-fdab69d3ac1a.png',
  },
  {
    id: 3,
    title: 'Dakrenovatie jaren \'30 woning',
    location: 'Rotterdam',
    category: 'Dakrenovatie',
    imageUrl: '/lovable-uploads/1f7274d9-4949-4025-91b8-2a7ac6c7f3e7.png',
    beforeImageUrl: '/lovable-uploads/80306d05-7941-4133-8d63-76968fad7e37.png',
  },
];

const ProjectsPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.h2 
              className="section-title mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Recente Projecten
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Bekijk enkele van onze recente renovatie- en verbouwprojecten. 
              Laat u inspireren door onze werkzaamheden en de transformaties die we hebben gerealiseerd.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/projecten" 
              className="mt-6 md:mt-0 text-brand-orange font-medium inline-flex items-center hover:underline"
            >
              Alle Projecten Bekijken
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Link
                to={`/projecten/${project.id}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-60 overflow-hidden">
                  <motion.div
                    animate={{
                      opacity: hoveredIndex === index ? 0 : 1,
                      transition: { duration: 0.5 }
                    }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-brand-darkGreen text-xs font-bold px-2 py-1 rounded">
                      Na
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: { duration: 0.5 }
                    }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={project.beforeImageUrl} 
                      alt={`Voor - ${project.title}`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-brand-darkGreen text-xs font-bold px-2 py-1 rounded">
                      Voor
                    </div>
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    <p className="text-sm font-semibold inline-block bg-brand-orange px-2 py-1 rounded mb-2">{project.category}</p>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm">{project.location}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
