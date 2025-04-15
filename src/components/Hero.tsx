
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex items-center pt-20">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <motion.div 
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            variants={item}
          >
            Uw partner voor professionele renovatie en verbouwing
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-200"
            variants={item}
          >
            Met meer dan 20 jaar ervaring zorgen wij voor vakkundig en betrouwbaar schilderwerk, 
            dakrenovatie, stucwerk en meer. Voor zowel particuliere als zakelijke klanten.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={item}
          >
            <Link 
              to="/offerte" 
              className="btn-primary group hover:animate-pulse text-center flex items-center justify-center"
            >
              Vrijblijvende Offerte Aanvragen
              <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"/>
            </Link>
            <Link 
              to="/diensten" 
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen text-center"
            >
              Bekijk Onze Diensten
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
