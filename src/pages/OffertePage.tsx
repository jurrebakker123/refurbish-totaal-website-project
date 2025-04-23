
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Check, User, Mail, Phone, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { emailConfig } from '@/config/email';
import emailjs from '@emailjs/browser';

const services = [
  'Schilderwerk',
  'Dakrenovatie',
  'Stukadoren',
  'Installatietechniek',
  'Aan- en verbouw',
  'Behangen',
  'PVC Vloeren',
  'Anders'
];

const OffertePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    preferredDate: '',
    service: '',
    message: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.terms) {
      toast.error("U dient akkoord te gaan met onze voorwaarden.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Log form data for verification
      console.log('Offerte Page Form Submission:', { 
        ...formData, 
        destinationEmail: emailConfig.contactEmail 
      });

      // Controleer of EmailJS is geconfigureerd
      if (emailConfig.serviceId === 'YOUR_SERVICE_ID' || 
          emailConfig.templateId === 'YOUR_TEMPLATE_ID' || 
          emailConfig.publicKey === 'YOUR_PUBLIC_KEY') {
        toast.error("EmailJS is niet correct geconfigureerd. Controleer de src/config/email.ts instellingen.");
        console.error("EmailJS is niet correct geconfigureerd. Vervang de placeholders in src/config/email.ts met echte waarden.");
        setIsSubmitting(false);
        return;
      }

      // Gebruik EmailJS voor het verzenden van het formulier
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          location: formData.location,
          preferred_date: formData.preferredDate || 'Niet opgegeven',
          service: formData.service,
          message: formData.message || 'Geen bericht',
          to_email: emailConfig.contactEmail
        },
        emailConfig.publicKey
      );
      
      // Duidelijke succesmelding tonen
      toast.success("Bedankt voor uw aanvraag! We nemen zo spoedig mogelijk contact met u op.", {
        duration: 5000,
        position: 'top-center',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        preferredDate: '',
        service: '',
        message: '',
        terms: false
      });
    } catch (error) {
      toast.error("Er is iets misgegaan bij het verzenden van uw aanvraag. Probeer het later opnieuw of neem direct contact met ons op.");
      console.error("Email error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section - Updated with a more relevant background */}
        <section className="relative py-16">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
          </div>
          <div className="container relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Offerte Aanvragen</h1>
            <p className="text-xl max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Vraag vrijblijvend een offerte aan voor uw project. Wij nemen binnen 24 uur contact met u op 
              om uw wensen te bespreken en een passende offerte op te stellen.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Vul het formulier in</h2>
              <p className="mb-6 text-gray-600">
                Wij nemen zo snel mogelijk contact met u op om uw wensen te bespreken.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
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

                {/* Email */}
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

                {/* Phone */}
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

                {/* Location */}
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

                {/* Preferred Date */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    placeholder="Voorkeursdatum"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    Selecteer een dienst
                  </label>
                  <div className="relative mt-1">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                      required
                    >
                      <option value="">Kies een dienst</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Uw bericht of opmerking"
                    rows={4}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-transparent"
                  ></textarea>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="focus:ring-brand-lightGreen h-4 w-4 text-brand-lightGreen border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      Ik ga akkoord met de <a href="/voorwaarden" className="text-brand-lightGreen hover:underline">algemene voorwaarden</a>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffertePage;
