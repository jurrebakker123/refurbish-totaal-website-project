
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail } from 'lucide-react';
import { OptimizedImage } from '../ui/optimized-image';

export function TuinhuizenHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <OptimizedImage 
          src="/lovable-uploads/a9b0106d-07f8-457b-bf57-185f81ec746f.png" 
          alt="Tuinhuis achtergrond" 
          className="w-full h-full"
          objectFit="cover"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-brand-darkGreen/80"></div>
      </div>
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src="/lovable-uploads/504b25db-f625-4ccd-9e93-6970157c6bf6.png" 
            alt="Tuinhuisbouwer.nl Logo" 
            className="w-48 md:w-64 mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in">
            Uw Specialist in Premium Tuinhuizen op Maat
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Vakmanschap, kwaliteit en persoonlijke service voor uw droomtuinhuis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a 
              href="tel:+31854444255" 
              className="btn-primary group inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span>Bel Direct: 085 4444 255</span>
            </a>
            <a 
              href="mailto:info@refurbishtotaalnederland.nl" 
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              <span>Offerte Aanvragen</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
