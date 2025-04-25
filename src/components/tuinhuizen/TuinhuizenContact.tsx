
import React from 'react';
import { Mail, Phone } from 'lucide-react';

export function TuinhuizenContact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-darkGreen">
            Direct Contact met Onze Specialisten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <Phone className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Telefonisch Contact</h3>
              <p className="text-gray-600 mb-6">
                Spreek direct met één van onze tuinhuis specialisten voor persoonlijk advies.
              </p>
              <a 
                href="tel:+31612345678" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                <span>06-12345678</span>
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <Mail className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">E-mail Contact</h3>
              <p className="text-gray-600 mb-6">
                Stuur ons uw wensen en ontvang binnen 24 uur een reactie van ons team.
              </p>
              <a 
                href="mailto:info@tuinhuisbouwer.nl" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                <span>E-mail Versturen</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
