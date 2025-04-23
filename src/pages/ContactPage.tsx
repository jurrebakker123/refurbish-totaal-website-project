import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import CallToActionSection from '@/components/CallToActionSection';
import emailjs from '@emailjs/browser';
import { emailConfig } from '@/config/email';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Log form data for verification
      console.log('Contact Form Submission:', { 
        ...formData, 
        destinationEmail: emailConfig.contactEmail 
      });

      // Controleer of EmailJS is geconfigureerd
      if (emailConfig.serviceId === 'YOUR_SERVICE_ID' || 
          emailConfig.templateId === 'YOUR_TEMPLATE_ID' || 
          emailConfig.publicKey === 'YOUR_PUBLIC_KEY') {
        toast.error("EmailJS is niet correct geconfigureerd. Controleer de src/config/email.ts instellingen.", {
          duration: 5000,
          position: 'top-center',
        });
        console.error("EmailJS is niet correct geconfigureerd. Vervang de placeholders in src/config/email.ts met echte waarden.");
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          to_email: emailConfig.contactEmail,
          to_name: "Refurbish Totaal Nederland",
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          subject: formData.subject || "Contactformulier website",
          message: formData.message || "Geen bericht",
        },
        emailConfig.publicKey
      );

      // Duidelijke succesmelding tonen
      toast.success("Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.", {
        duration: 5000,
        position: 'top-center',
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact Form Email Error:', error);
      toast.error("Er is iets misgegaan bij het verzenden van uw bericht. Probeer het later opnieuw of neem direct contact met ons op.", {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section - Updated with a neutral background */}
        <section className="relative py-16">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.1&auto=format&fit=crop&w=2069&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
          </div>
          <div className="container relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Contact</h1>
            <p className="text-xl max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Heeft u vragen over onze diensten of wilt u een offerte aanvragen? 
              Neem contact met ons op en we helpen u graag verder.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Contactgegevens</h2>
                <p className="text-lg text-gray-700 mb-8">
                  U kunt ons bereiken via onderstaande contactgegevens. Wij streven ernaar om binnen 24 uur te reageren op uw bericht.
                </p>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-brand-lightGreen/10 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Telefoonnummer</h3>
                      <a href="tel:+31854444255" className="text-gray-700 hover:text-brand-darkGreen">085 4444 255</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-brand-lightGreen/10 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">E-mailadres</h3>
                      <a href="mailto:info@refurbishtotaalnederland.nl" className="text-gray-700 hover:text-brand-darkGreen">info@refurbishtotaalnederland.nl</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-brand-lightGreen/10 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Adres</h3>
                      <a 
                        href="https://maps.google.com/?q=Postbus+61,+6650+AB+Druten" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-brand-darkGreen"
                      >
                        Postbus 61<br />
                        6650 AB Druten
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white p-8 rounded-lg shadow-lg hover-lift">
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Stuur ons een bericht</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Onderwerp *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                          required
                        >
                          <option value="" disabled>Selecteer een onderwerp</option>
                          <option value="Offerte">Offerte aanvragen</option>
                          <option value="Informatie">Informatie aanvragen</option>
                          <option value="Planning">Planning en afspraken</option>
                          <option value="Klacht">Klacht of suggestie</option>
                          <option value="Anders">Anders</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Bericht *</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="btn-primary w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Bericht'}</span>
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center text-brand-darkGreen">Onze Locatie</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.627583012478!2d5.6000662!3d51.8926512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c7f8a3c360349f%3A0x27f8c114d6c94a8!2sPostbus%2061%2C%206650%20AB%20Druten%2C%20Nederland!5e0!3m2!1snl!2snl!4v1713705571890!5m2!1snl!2snl"
                width="100%" 
                height="350"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Kaart locatie Refurbish Totaal Nederland"
              ></iframe>
            </div>
          </div>
        </section>
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
