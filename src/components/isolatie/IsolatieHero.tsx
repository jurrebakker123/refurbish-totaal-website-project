
import React from 'react';
import { ChevronRight, Shield, ThumbsUp, Home } from 'lucide-react';
import ReusableForm from '@/components/common/ReusableForm';

const IsolatieHero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen/75"></div>
      </div>
      
      <div className="container relative z-10 py-16 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-white">
              <Shield className="h-5 w-5 mr-2" /> KIWA gecertificeerd • Hoogste kwaliteit isolatiematerialen
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Bespaar tot 60% op uw energiekosten met professionele woningisolatie
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Duurzame isolatieoplossingen voor uw hele woning met KIWA-gecertificeerde materialen. 
              Spouwmuurisolatie, dakisolatie, vloerisolatie en glasisolatie van de hoogste kwaliteit. 
              Binnen één dag geïsoleerd.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2 text-white" />
                <span>100% klanttevredenheid</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-white" />
                <span>10+ jaar ervaring</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-white" />
                <span>KIWA & ISSO gecertificeerd</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="#contact-section" 
                className="btn-primary group inline-flex items-center justify-center"
              >
                Vraag vrijblijvend offerte aan
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"/>
              </a>
              <a 
                href="tel:+31854444255" 
                className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen inline-flex items-center justify-center"
              >
                Bel direct: 085 4444 255
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-2xl p-0 animate-fade-in">
            <ReusableForm
              title="GRATIS isolatie-advies aanvragen"
              description="Ontvang binnen 24 uur een vrijblijvende offerte op maat."
              templateId="template_ezfzaao"
              buttonText="Verstuur aanvraag"
              showServiceInput={true}
              showFileUpload={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsolatieHero;
