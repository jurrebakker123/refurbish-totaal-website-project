
import React from 'react';
import { ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TuinhuizenCTA() {
  return (
    <section className="py-16 bg-brand-darkGreen text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Vandaag Nog met Uw Droomproject
          </h2>
          <p className="text-lg mb-8 text-gray-100">
            Ontvang een vrijblijvende offerte en ontdek hoe wij uw tuinhuswensen kunnen waarmaken.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = 'mailto:info@refurbishtotaalnederland.nl'}
              className="bg-white text-brand-darkGreen hover:bg-gray-100 group"
            >
              Vraag een Offerte Aan
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = 'tel:+31854444255'}
              className="border-white text-white hover:bg-white hover:text-brand-darkGreen"
            >
              Bel Direct: 085 4444 255
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
