
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { solarProducts } from '@/data/solarProducts';
import ReusableForm from '@/components/common/ReusableForm';

export function ZonnepanelenProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openRequestForm = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-brand-darkGreen">
          Zonnepanelen Pakketten
        </h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Onze complete zonnepanelen installaties inclusief montage. Kies het pakket dat het beste bij uw situatie past.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solarProducts.map(product => (
            <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 animate-fade-in relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="rounded-md overflow-hidden mb-4 flex justify-center h-48 bg-white p-2">
                  <OptimizedImage 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="h-full w-full object-contain" 
                    fallbackSrc="/placeholder.svg" 
                  />
                </div>
                <CardTitle className="text-lg font-bold text-brand-darkGreen">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-green mr-2 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {product.yearlySavings && (
                  <p className="text-sm text-brand-darkGreen font-medium mt-2 bg-brand-green/10 p-2 rounded">
                    Jaarlijkse besparing: {product.yearlySavings} bij {product.kwhPrice}/kWh
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-2 w-full">
                <p className="text-2xl font-bold text-brand-darkGreen mb-4">{product.price}</p>
                <Button 
                  onClick={() => openRequestForm(product)}
                  className="w-full bg-brand-green hover:bg-brand-darkGreen transition-colors text-white font-medium"
                >
                  Gratis offerte aanvragen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Request Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-brand-darkGreen">
              Gratis offerte aanvragen - {selectedProduct?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="mt-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Geselecteerd pakket:</h3>
                <p className="text-lg font-medium text-brand-darkGreen">{selectedProduct.title}</p>
                <p className="text-2xl font-bold text-brand-darkGreen mt-2">{selectedProduct.price}</p>
                {selectedProduct.yearlySavings && (
                  <p className="text-sm text-gray-600 mt-1">
                    Jaarlijkse besparing: {selectedProduct.yearlySavings}
                  </p>
                )}
              </div>
              
              <ReusableForm
                title=""
                description="Vul uw gegevens in voor een gratis, vrijblijvende offerte. We nemen binnen 24 uur contact met u op."
                templateId="template_zonnepanelen_aanvraag"
                buttonText="Gratis offerte aanvragen"
                supabaseTable="refurbished_zonnepanelen"
                additionalFields={[
                  {
                    name: 'type_paneel',
                    label: 'Type zonnepaneel',
                    type: 'hidden',
                    required: true
                  },
                  {
                    name: 'aantal_panelen',
                    label: 'Aantal panelen',
                    type: 'hidden',
                    required: true
                  },
                  {
                    name: 'vermogen',
                    label: 'Vermogen per paneel (W)',
                    type: 'hidden',
                    required: true
                  },
                  {
                    name: 'merk',
                    label: 'Merk',
                    type: 'hidden',
                    required: true
                  },
                  {
                    name: 'conditie',
                    label: 'Conditie',
                    type: 'hidden',
                    required: true
                  },
                  {
                    name: 'dak_type',
                    label: 'Type dak',
                    type: 'select',
                    required: true,
                    options: [
                      { value: 'hellend_dak', label: 'Hellend dak (schuine pannen)' },
                      { value: 'plat_dak', label: 'Plat dak' },
                      { value: 'bitumen_dak', label: 'Bitumen dak' },
                      { value: 'metalen_dak', label: 'Metalen dak' },
                      { value: 'anders', label: 'Anders' }
                    ]
                  },
                  {
                    name: 'dak_materiaal',
                    label: 'Dak materiaal',
                    type: 'select',
                    required: false,
                    options: [
                      { value: 'dakpannen', label: 'Dakpannen' },
                      { value: 'leien', label: 'Leien' },
                      { value: 'bitumen', label: 'Bitumen' },
                      { value: 'metaal', label: 'Metaal' },
                      { value: 'anders', label: 'Anders' }
                    ]
                  },
                  {
                    name: 'schaduw_situatie',
                    label: 'Schaduw op het dak',
                    type: 'select',
                    required: false,
                    options: [
                      { value: 'geen_schaduw', label: 'Geen schaduw' },
                      { value: 'weinig_schaduw', label: 'Weinig schaduw (ochtend/avond)' },
                      { value: 'matige_schaduw', label: 'Matige schaduw (gedeeltelijk overdag)' },
                      { value: 'veel_schaduw', label: 'Veel schaduw' }
                    ]
                  },
                  {
                    name: 'gewenste_opbrengst',
                    label: 'Huidige jaarlijkse energieverbruik (kWh)',
                    type: 'number',
                    required: false,
                    placeholder: 'Bijv. 3500 kWh (staat op uw energierekening)'
                  },
                  {
                    name: 'opmerkingen',
                    label: 'Aanvullende informatie',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Bijv. specifieke wensen, vragen over installatie, etc.'
                  }
                ]}
                onSuccess={() => {
                  setIsFormOpen(false);
                  setSelectedProduct(null);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
