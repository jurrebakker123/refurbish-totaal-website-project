
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { solarProducts } from '@/data/solarProducts';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-brand-darkGreen">
              Offerte aanvragen - {selectedProduct?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <SimpleZonnepanelenForm 
              product={selectedProduct}
              onSuccess={() => {
                setIsFormOpen(false);
                setSelectedProduct(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Simple and clear form for solar panel requests
function SimpleZonnepanelenForm({ product, onSuccess }: { product: any; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error("U dient akkoord te gaan met onze voorwaarden");
      return;
    }
    
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Prepare clean data for database
    const requestData = {
      // User information
      naam: formData.get('naam') as string,
      email: formData.get('email') as string,
      telefoon: formData.get('telefoon') as string,
      adres: formData.get('adres') as string,
      postcode: formData.get('postcode') as string || '',
      plaats: formData.get('plaats') as string,
      opmerkingen: formData.get('opmerkingen') as string || '',
      
      // Product information (automatically filled from selected package)
      type_paneel: product.title,
      aantal_panelen: parseInt(product.panels) || 0,
      vermogen: parseInt(product.wattage) || 0,
      merk: product.brand || 'Zonnepanelen pakket',
      conditie: product.condition || 'Nieuw',
      dak_type: 'Nog te bepalen',
      
      // System fields
      status: 'nieuw'
    };

    console.log('Saving zonnepanelen request:', requestData);

    try {
      const { data, error } = await supabase
        .from('refurbished_zonnepanelen')
        .insert([requestData])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Successfully saved:', data);
      toast.success("Bedankt voor uw aanvraag! We nemen binnen 24 uur contact met u op.");
      onSuccess();
    } catch (error) {
      console.error('Error saving request:', error);
      toast.error("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      {/* Selected package info */}
      <div className="bg-brand-green/10 p-3 rounded-lg mb-4 border border-brand-green/20">
        <h3 className="font-semibold mb-1 text-sm text-brand-darkGreen">Geselecteerd pakket:</h3>
        <p className="text-base font-medium text-brand-darkGreen">{product.title}</p>
        <p className="text-lg font-bold text-brand-darkGreen">{product.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
          <input 
            type="text" 
            name="naam" 
            required 
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            placeholder="Uw volledige naam"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
          <input 
            type="email" 
            name="email" 
            required 
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            placeholder="uw.email@voorbeeld.nl"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer *</label>
          <input 
            type="tel" 
            name="telefoon" 
            required 
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            placeholder="06 12345678"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adres *</label>
          <input 
            type="text" 
            name="adres" 
            required 
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            placeholder="Straatnaam + huisnummer"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
            <input 
              type="text" 
              name="postcode" 
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              placeholder="1234 AB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plaats *</label>
            <input 
              type="text" 
              name="plaats" 
              required 
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              placeholder="Uw woonplaats"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opmerkingen</label>
          <textarea 
            name="opmerkingen" 
            rows={2}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            placeholder="Heeft u vragen of aanvullende informatie?"
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-xs text-gray-700">
            Ik ga akkoord met de algemene voorwaarden en geef toestemming voor het verwerken van mijn gegevens voor deze offerte aanvraag.
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-brand-green hover:bg-brand-darkGreen text-white py-2 px-4 rounded font-medium transition-colors text-sm disabled:opacity-50"
        >
          {isSubmitting ? 'Bezig met verzenden...' : 'Offerte aanvragen'}
        </button>
      </form>
    </div>
  );
}
