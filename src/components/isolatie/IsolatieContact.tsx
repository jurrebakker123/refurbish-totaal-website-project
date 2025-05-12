
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
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
                    <p><a href="mailto:info@refurbishtotaalnederland.nl" className="hover:text-brand-lightGreen">info@refurbishtotaalnederland.nl</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-brand-lightGreen mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium mb-1">Adres</h4>
                    <p>Postbus 61<br />6650 AB Druten</p>
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

                <div className="mt-4">
                  <a
                    href="https://wa.me/31630136079"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact via WhatsApp"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BF5B] text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.301-.754.966-.925 1.164-.17.199-.342.2-.642.051-.3-.15-1.268-.468-2.414-1.49-.893-.794-1.494-1.776-1.669-2.075-.176-.3-.019-.461.131-.611.136-.135.301-.353.452-.528.151-.175.2-.301.3-.502.099-.2.049-.374-.051-.524-.1-.15-.672-1.62-.922-2.22-.242-.583-.487-.5-.672-.51-.172-.01-.371-.011-.571-.011-.2 0-.522.075-.796.375-.273.3-1.045 1.02-1.045 2.489s1.07 2.889 1.22 3.089c.15.2 2.125 3.25 5.122 4.557 2.999 1.306 2.999.872 3.541.815.542-.057 1.743-.712 1.992-1.399.248-.687.248-1.273.173-1.398-.074-.125-.273-.198-.573-.349z"/>
                      <path d="M12 2a10 10 0 0 1 7.743 16.33L19 22l-3.866-.001A10 10 0 0 1 12 2z"/>
                    </svg>
                    Chat via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
              <h3 className="text-2xl font-bold mb-6">Stuur ons een bericht</h3>
              <ReusableForm 
                showFileUpload={true}
                templateId="template_ezfzaao"
                buttonText="Verstuur Bericht"
                showServiceInput={true}
                additionalFields={[
                  {
                    name: 'subject',
                    label: 'Onderwerp',
                    type: 'select',
                    required: true,
                    options: [
                      { value: 'Isolatie', label: 'Isolatie informatie' },
                      { value: 'Offerte', label: 'Offerte aanvragen' },
                      { value: 'Planning', label: 'Planning en afspraken' },
                      { value: 'Anders', label: 'Anders' }
                    ]
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsolatieContact;
