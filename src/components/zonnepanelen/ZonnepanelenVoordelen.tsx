
import React from 'react';
import { Check, Euro, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';

export function ZonnepanelenVoordelen() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Voordelen van Refurbished Zonnepanelen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ontdek waarom steeds meer Nederlanders kiezen voor refurbished zonnepanelen van Refurbish Totaal Nederland
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <OptimizedImage 
                src="/lovable-uploads/f267d8c4-13cc-4af9-9a44-ff406caa4b4c.png" 
                alt="Refurbished zonnepanelen installatie" 
                className="w-full h-auto"
                fallbackSrc="/placeholder.svg"
              />
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-lightGreen/10 p-3 rounded-full">
                    <Euro className="h-6 w-6 text-brand-lightGreen" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Bespaar tot 40% op aanschafkosten</h3>
                    <p className="text-gray-600">
                      Refurbished zonnepanelen zijn gemiddeld 30-40% goedkoper dan nieuwe panelen, 
                      terwijl ze 85-95% van de originele capaciteit behouden.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-lightGreen/10 p-3 rounded-full">
                    <Sun className="h-6 w-6 text-brand-lightGreen" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Premium zonnepanelen voor iedereen</h3>
                    <p className="text-gray-600">
                      Toegang tot hoogwaardige merken en modellen die anders buiten uw budget 
                      zouden vallen. Duurzaamheid wordt bereikbaar voor elk budget.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-lightGreen/10 p-3 rounded-full">
                    <Check className="h-6 w-6 text-brand-lightGreen" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Uitgebreid getest en gegarandeerd</h3>
                    <p className="text-gray-600">
                      Elk paneel ondergaat uitgebreide tests en inspecties voordat het bij u wordt geïnstalleerd.
                      Met onze garantie bent u verzekerd van een zorgeloze ervaring.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
