import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, Wrench } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
export function BouwhulpHero() {
  return <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <OptimizedImage src="/lovable-uploads/e5c87c28-be1f-4ff1-809e-61c3d9fc3b9c.png" alt="Bouwvakker aan het werk met gereedschap" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-darkGreen/85"></div>
      </div>
      <div className="container relative z-10 md:py-24 py-[110px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-lg mb-8">
            <Wrench className="h-8 w-8 text-brand-darkGreen" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in">
            Bouwhulp Voor Grote Aannemers
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-100 animate-fade-in max-w-3xl mx-auto" style={{
          animationDelay: '0.2s'
        }}>
            Wij leveren ervaren bouwvakkers en hulpkrachten aan aannemingsbedrijven. Flexibele inzet, betrouwbare mensen en concurrerende tarieven.
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
              <span>Vraag Personeel Aan</span>
            </a>
          </div>
          
          <div className="mt-8 animate-fade-in" style={{
          animationDelay: '0.5s'
        }}>
            <Link to="#diensten" className="text-white hover:text-brand-lightGreen transition-colors flex items-center justify-center gap-2 group">
              <span>Bekijk ons aanbod</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>;
}