import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, Wrench } from 'lucide-react';
export function BouwhulpHero() {
  return <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`
    }}>
        <div className="absolute inset-0 bg-brand-darkGreen/85"></div>
      </div>
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-lg mb-8">
            <Wrench className="h-8 w-8 text-brand-darkGreen" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in">
            Professionele Bouwhulp Op Maat
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-100 animate-fade-in max-w-3xl mx-auto" style={{
          animationDelay: '0.2s'
        }}>
            Voor al uw bouwprojecten: van kleine klussen tot complete renovaties. Ervaren vakmensen, scherpe tarieven en persoonlijke aanpak.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
            <a href="tel:+31854444255" className="btn-primary group inline-flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              <span>Bel Direct: 085 4444 255</span>
            </a>
            <a href="mailto:info@refurbishtotaalnederland.nl" className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen inline-flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Vraag Informatie Aan</span>
            </a>
          </div>
          
          <div className="mt-8 animate-fade-in" style={{
          animationDelay: '0.5s'
        }}>
            <Link to="#diensten" className="text-white hover:text-brand-lightGreen transition-colors flex items-center justify-center gap-2 group">
              <span>Bekijk onze diensten</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>;
}