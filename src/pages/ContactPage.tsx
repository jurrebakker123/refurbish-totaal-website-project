
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Smartphone } from 'lucide-react';
import CallToActionSection from '@/components/CallToActionSection';
import ReusableForm from '@/components/common/ReusableForm';

const ContactPage = () => {
  const phoneNumber = "31630136079"; // Updated Dutch phone number format for WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

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
                      <Smartphone className="h-6 w-6 text-brand-darkGreen" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">WhatsApp</h3>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-brand-darkGreen">Direct chatten via WhatsApp</a>
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
                  <ReusableForm 
                    title="Stuur ons een bericht"
                    showFileUpload={false}
                    templateId="template_ezfzaao"
                    buttonText="Verstuur Bericht"
                    additionalFields={[
                      {
                        name: 'subject',
                        label: 'Onderwerp',
                        type: 'select',
                        required: true,
                        options: [
                          { value: 'Offerte', label: 'Offerte aanvragen' },
                          { value: 'Informatie', label: 'Informatie aanvragen' },
                          { value: 'Planning', label: 'Planning en afspraken' },
                          { value: 'Klacht', label: 'Klacht of suggestie' },
                          { value: 'Anders', label: 'Anders' }
                        ]
                      }
                    ]}
                  />
                  
                  <div className="mt-4 text-center">
                    <p className="text-gray-700 mb-3">Of neem direct contact op via:</p>
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="btn-primary bg-green-600 hover:bg-green-700 inline-flex items-center justify-center w-full"
                    >
                      <span className="mr-2">WhatsApp Chat Starten</span>
                    </a>
                  </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2475.527982465717!2d5.636422977195247!3d51.667533198950525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6fe4c25502a69%3A0xee8fa136053d95c9!2sPostbus%2061%2C%206650%20AB%20Druten!5e0!3m2!1snl!2snl!4v1719414732248!5m2!1snl!2snl"
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
