
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, Check, Calculator } from 'lucide-react';
import { OptimizedImage } from '../ui/optimized-image';
import { Button } from '@/components/ui/button';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
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
          
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="mb-4 w-full max-w-[250px]">
              <OptimizedImage 
                src="/lovable-uploads/5f8f6883-901d-4157-ab41-1b023e186ede.png" 
                alt="Dakkapel calculator" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="text-center mb-6">
              <h3 className="text-white text-2xl font-bold mb-2">Ontvang nu €250 korting!</h3>
              <p className="text-white/90 mb-4">Bereken direct online de prijs van uw dakkapel</p>
              <ul className="text-white/90 text-sm mb-4 text-left">
                <li className="flex items-center gap-2 mb-1">
                  <Check className="h-4 w-4 text-brand-lightGreen flex-shrink-0" />
                  <span>Direct prijsindicatie</span>
                </li>
                <li className="flex items-center gap-2 mb-1">
                  <Check className="h-4 w-4 text-brand-lightGreen flex-shrink-0" />
                  <span>Binnen 6 weken geplaatst</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-lightGreen flex-shrink-0" />
                  <span>15 jaar garantie</span>
                </li>
              </ul>
            </div>
            <Link to="/dakkapel-calculator" className="w-full">
              <Button size="lg" className="w-full bg-brand-green hover:bg-brand-darkGreen text-white flex items-center gap-2 justify-center shadow-lg hover:shadow-xl transition-all px-6 py-6">
                <Calculator className="h-5 w-5" />
                <span>Bereken uw prijs</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
