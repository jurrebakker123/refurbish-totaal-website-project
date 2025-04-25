
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function TuinhuizenHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
      </div>
      <div className="container relative z-10 py-16 md:py-24 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
            Uw Droomtuinhuis op Maat Gebouwd
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Ontdek onze collectie premium tuinhuizen, vakkundig gebouwd en perfect geïntegreerd in uw tuin. 
            Van klassiek tot modern, wij maken uw tuinhuis precies zoals u het wenst.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link 
              to="/offerte" 
              className="btn-primary group flex items-center justify-center"
            >
              Vraag een Offerte Aan
              <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"/>
            </Link>
            <a 
              href="#features" 
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen text-center"
            >
              Ontdek Onze Tuinhuizen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
