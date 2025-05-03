
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, Check } from 'lucide-react';
import { OptimizedImage } from '../ui/optimized-image';

export function DakkapelHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen/80"></div>
      </div>
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-4xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Professionele Dakkapellen op Maat
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in max-w-2xl" style={{ animationDelay: '0.2s' }}>
            Vergroot uw woonruimte met een kwalitatieve dakkapel. Compleet verzorgd met 10 jaar garantie.
          </p>
          
          <ul className="mb-8 space-y-3">
            {[
              'Volledig op maat gemaakt',
              'Plaatsing binnen 1 dag mogelijk',
              'Inclusief isolatie en afwerking',
              'Nederlandse kwaliteit, ervaren vakmensen'
            ].map((item, i) => (
              <li key={i} className="flex items-start text-lg animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
                <Check className="h-6 w-6 text-brand-lightGreen mr-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a 
              href="tel:+31854444255" 
              className="btn-primary group inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span>Bel Direct: 085 4444 255</span>
            </a>
            <Link 
              to="/offerte" 
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              <span>Offerte Aanvragen</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
