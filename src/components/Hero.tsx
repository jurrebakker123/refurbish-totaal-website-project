
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReusableForm from './common/ReusableForm';

const Hero = () => {
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
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
      </div>
      
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Specialist in Schilderwerk & Stukadoorsdiensten
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Met onze specialistische aanpak maken we uw woning comfortabeler, mooier en functioneler. 
              Vakmanschap en kwaliteit staan bij ons voorop.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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

          <motion.div 
            className="bg-white rounded-lg shadow-2xl p-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ReusableForm
              title="GRATIS Offerte Aanvragen"
              description="Vul het formulier in en ontvang snel een vrijblijvende offerte op maat."
              templateId="template_ezfzaao"
              buttonText="Verstuur Aanvraag"
              showServiceInput={true}
              showFileUpload={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
