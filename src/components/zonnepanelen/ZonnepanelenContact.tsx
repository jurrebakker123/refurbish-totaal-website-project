
import React from 'react';
import { Mail, Phone, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReusableForm from '@/components/common/ReusableForm';

export function ZonnepanelenContact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-darkGreen">
            Direct Contact met Onze Zonnepanelen Specialisten
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <Phone className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Telefonisch Contact</h3>
              <p className="text-gray-600 mb-6">
                Spreek direct met een zonnepanelen specialist voor persoonlijk advies.
              </p>
              <Button 
                onClick={() => window.location.href = 'tel:+31854444255'}
                className="w-full"
              >
                <Phone className="h-5 w-5 mr-2" />
                Bel 085 4444 255
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <Mail className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">E-mail Contact</h3>
              <p className="text-gray-600 mb-6">
                Stuur ons uw wensen en ontvang binnen 24 uur een reactie van ons team.
              </p>
              <Button 
                onClick={() => window.location.href = 'mailto:info@refurbishtotaalnederland.nl'}
                className="w-full"
              >
                <Mail className="h-5 w-5 mr-2" />
                E-mail Versturen
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <CalendarCheck className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Gratis Inspectie</h3>
              <p className="text-gray-600 mb-6">
                Plan een vrijblijvende inspectie voor een persoonlijk advies op maat.
              </p>
              <Button 
                onClick={() => window.location.href = '/offerte'}
                className="w-full"
              >
                <CalendarCheck className="h-5 w-5 mr-2" />
                Afspraak Inplannen
              </Button>
            </div>
          </div>
          
          <div className="mt-12">
            <ReusableForm 
              title="Vraag direct een offerte aan voor uw zonnepanelen"
              description="Ontvang binnen 24 uur een reactie van onze zonnepanelen specialisten."
              showFileUpload={true}
              templateId="template_ezfzaao"
              buttonText="Offerte aanvragen"
              showServiceInput={true}
              showDateField={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
