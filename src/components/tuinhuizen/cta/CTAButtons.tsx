
import React from 'react';
import { ChevronRight, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function CTAButtons() {
  return <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button onClick={() => window.location.href = 'mailto:info@refurbishtotaalnederland.nl'} className="bg-white text-brand-darkGreen hover:bg-gray-100 group">
        Vraag een Offerte Aan
        <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
      <Button variant="outline" onClick={() => window.location.href = 'tel:+31854444255'} className="border-white hover:bg-white text-green-700">
        Bel Direct: 085 4444 255
      </Button>
      <Link to="/dakkapel-calculator">
        <Button variant="secondary" className="bg-white/90 text-brand-darkGreen hover:bg-white flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Dakkapel Calculator
        </Button>
      </Link>
    </div>;
}
