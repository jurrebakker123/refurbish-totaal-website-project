
import React from 'react';
import { Phone, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BouwhulpCTA() {
  return (
    <section className="py-16 md:py-20 bg-brand-darkGreen text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar voor uw volgende bouwproject?
          </h2>
          <p className="text-xl mb-10 text-gray-100 max-w-2xl mx-auto">
            Neem vandaag nog contact met ons op voor een vrijblijvende offerte of adviesgesprek. Wij staan klaar om u te helpen!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <a 
              href="tel:+31854444255" 
              className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Phone className="h-10 w-10 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Bel Ons</h3>
              <p>085 4444 255</p>
            </a>
            
            <a 
              href="mailto:info@refurbishtotaalnederland.nl" 
              className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Mail className="h-10 w-10 mb-3" />
              <h3 className="text-xl font-semibold mb-2">E-mail</h3>
              <p>info@refurbishtotaalnederland.nl</p>
            </a>
            
            <Link 
              to="/contact" 
              className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Calendar className="h-10 w-10 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Plan Afspraak</h3>
              <p>Vrijblijvend adviesgesprek</p>
            </Link>
          </div>
          
          <Link
            to="/offerte"
            className="btn-primary bg-white text-brand-darkGreen hover:bg-gray-100 inline-flex items-center justify-center"
          >
            Offerte Aanvragen
          </Link>
        </div>
      </div>
    </section>
  );
}
