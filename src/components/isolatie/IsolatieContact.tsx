
import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import ReusableForm from '@/components/common/ReusableForm';

const IsolatieContact = () => {
  return (
    <section id="contact-section" className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Neem contact met ons op
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Heeft u vragen of wilt u een vrijblijvende offerte ontvangen? 
            Neem contact met ons op en we helpen u graag verder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Onze gegevens</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-brand-lightGreen mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium mb-1">Telefoon</h4>
                    <p><a href="tel:+31854444255" className="hover:text-brand-lightGreen">085 4444 255</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-brand-lightGreen mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium mb-1">E-mail</h4>
                    <p><a href="mailto:info@isolatieselectie.nl" className="hover:text-brand-lightGreen">info@isolatieselectie.nl</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-brand-lightGreen mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium mb-1">Adres</h4>
                    <p>Niersweg 27<br />6591 CT Gennep</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-brand-lightGreen mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium mb-1">Openingstijden</h4>
                    <p>Maandag t/m vrijdag: 08:00 - 17:00<br />
                    Zaterdag & zondag: gesloten</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-bold mb-3">Werkgebied</h4>
                <p className="text-gray-600 mb-4">
                  Wij zijn actief in heel Nederland. Onze isolatiespecialisten komen graag bij u langs 
                  voor een vrijblijvend adviesgesprek.
                </p>
                <a href="#" className="text-brand-darkGreen font-medium inline-flex items-center hover:text-brand-lightGreen">
                  Bekijk ons werkgebied
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ReusableForm
                title="Stuur ons een bericht"
                description="Vul het onderstaande formulier in en wij nemen binnen 24 uur contact met u op."
                templateId="template_ezfzaao"
                buttonText="Verstuur bericht"
                showServiceInput={true}
                showFileUpload={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsolatieContact;
