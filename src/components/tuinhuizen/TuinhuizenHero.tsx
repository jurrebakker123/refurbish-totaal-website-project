
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, CubeIcon } from 'lucide-react';

export function TuinhuizenHero() {
  return <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`
    }}>
        <div className="absolute inset-0 bg-brand-darkGreen/80"></div>
      </div>
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <img src="/lovable-uploads/504b25db-f625-4ccd-9e93-6970157c6bf6.png" alt="Tuinhuisbouwer.nl Logo" className="w-48 md:w-64 mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in">
            Uw Specialist in Premium Tuinhuizen op Maat
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 animate-fade-in max-w-2xl mx-auto" style={{
          animationDelay: '0.2s'
        }}>
            Vakmanschap, kwaliteit en persoonlijke service voor uw droomtuinhuis
          </p>
          <p className="text-xl md:text-3xl mb-8 text-white font-semibold animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>Basismodel vanaf €1.999,99 exclusief btw</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
            <a href="tel:+31854444255" className="btn-primary group inline-flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              <span>Bel Direct: 085 4444 255</span>
            </a>
            <a href="mailto:info@refurbishtotaalnederland.nl" className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen inline-flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Offerte Aanvragen</span>
            </a>
          </div>
          
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Link to="/tuinhuizen-model" className="text-white hover:text-brand-lightGreen transition-colors flex items-center justify-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <span>Bekijk 3D model</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>;
}
