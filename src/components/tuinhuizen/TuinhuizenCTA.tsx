
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function TuinhuizenCTA() {
  return (
    <section className="py-16 bg-brand-darkGreen text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar om Uw Droomtuinhuis te Realiseren?
          </h2>
          <p className="text-lg mb-8 text-gray-100">
            Vraag vandaag nog een vrijblijvende offerte aan en ontdek hoe wij uw tuinhuiswensen kunnen waarmaken.
          </p>
          <Link 
            to="/offerte" 
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-lightGreen text-white rounded-md font-medium hover:bg-opacity-90 transition-colors group"
          >
            Start Uw Tuinhuis Project
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
          </Link>
        </div>
      </div>
    </section>
  );
}
