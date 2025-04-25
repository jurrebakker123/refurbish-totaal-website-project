
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function TuinhuizenCTA() {
  return (
    <section className="py-16 bg-brand-darkGreen text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Vandaag Nog met Uw Droomproject
          </h2>
          <p className="text-lg mb-8 text-gray-100">
            Ontvang een vrijblijvende offerte en ontdek hoe wij uw tuinhuiswensen kunnen waarmaken.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/offerte" 
              className="btn-primary bg-white text-brand-darkGreen hover:bg-gray-100 group inline-flex items-center justify-center"
            >
              Vraag een Offerte Aan
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
            </Link>
            <a 
              href="tel:+31612345678"
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen inline-flex items-center justify-center"
            >
              Bel Direct: 06-12345678
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
