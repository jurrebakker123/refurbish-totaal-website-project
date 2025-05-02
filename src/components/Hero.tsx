import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { sendEmail } from '@/config/email';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Hero Form Submission:', formData);

      const result = await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        to_name: "Refurbish Totaal Nederland",
        to_email: "info@refurbishtotaalnederland.nl",
        subject: "Contact aanvraag via website",
        message: formData.message,
        phone: formData.phone,
        location: formData.location
      });

      if (result.success) {
        toast.success("Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          message: ''
        });
      } else {
        throw new Error("EmailJS verzending mislukt");
      }
    } catch (error) {
      console.error('Hero Form Email Error:', error);
      toast.error("Er is iets misgegaan bij het verzenden van uw bericht. Probeer het later opnieuw of neem direct contact met ons op.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Slimmer dan Renoveren: Wonen in de Toekomst Begint Nu
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Waar een gewone renovatie vaak stopt bij herstel of vervanging, kijken wij verder. 
              Met onze integrale refurbish-aanpak maken we uw woning comfortabeler, zuiniger én mooier.
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
            className="bg-white text-gray-800 rounded-lg shadow-2xl p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">GRATIS Offerte Aanvragen</h2>
            <p className="mb-6 text-gray-600">Vul het formulier in en ontvang snel een vrijblijvende offerte op maat.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Uw naam"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mailadres"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefoonnummer"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Woonplaats"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Uw bericht of opmerking"
                  rows={3}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
