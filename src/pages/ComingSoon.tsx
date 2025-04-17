
import React from 'react';
import { motion } from 'framer-motion';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-brand-darkGreen flex items-center justify-center p-4">
      <motion.div 
        className="text-center bg-white p-12 rounded-xl shadow-2xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png" 
          alt="Refurbish Totaal Nederland Logo" 
          className="mx-auto mb-8 h-24"
        />
        <h1 className="text-4xl font-bold mb-6 text-brand-darkGreen">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Wij zijn druk bezig om onze website te vernieuwen. 
          Binnenkort lanceren wij een gloednieuwe online ervaring voor Refurbish Totaal Nederland.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="tel:+31854444255" 
            className="bg-brand-lightGreen text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Bel Ons
          </a>
          <a 
            href="mailto:info@refurbishtotaal.nl" 
            className="bg-gray-200 text-brand-darkGreen px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Mail Ons
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;

