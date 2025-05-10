
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Calculator } from 'lucide-react';

export function DakkapelCTA() {
  return (
    <section className="py-16 bg-brand-darkGreen text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar voor Meer Ruimte in Uw Woning?
          </h2>
          <p className="text-xl mb-8">
            Vraag vandaag nog een vrijblijvende offerte aan of neem contact met ons op voor persoonlijk advies over uw dakkapel project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+31854444255" 
              className="bg-white text-brand-darkGreen hover:bg-gray-100 px-8 py-3 rounded-md font-medium inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span>Bel Direct: 085 4444 255</span>
            </a>
            <Link 
              to="/offerte" 
              className="bg-brand-lightGreen text-white hover:bg-opacity-90 px-8 py-3 rounded-md font-medium inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              <span>Offerte Aanvragen</span>
            </Link>
            <Link 
              to="/dakkapel-calculator" 
              className="bg-white/20 text-white hover:bg-white/30 px-8 py-3 rounded-md font-medium inline-flex items-center justify-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              <span>Dakkapel Calculator</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mt-16">
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-sm text-white/60">
            <Link to="/dakkapel-calculator" className="underline hover:text-white">
              Bereken zelf de kosten van uw dakkapel met onze handige calculator
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
