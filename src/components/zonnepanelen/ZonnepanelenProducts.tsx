
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
            <Card key={product.id} className="h-full flex flex-col hover:shadow-xl transition-all duration-300 animate-fade-in relative overflow-hidden border-2 hover:border-brand-green/20">
              <CardHeader className="pb-4">
                <div className="rounded-md overflow-hidden mb-4 flex justify-center h-48 bg-white p-2">
                  <OptimizedImage 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="h-full w-full object-contain" 
                    fallbackSrc="/placeholder.svg" 
                  />
                </div>
                <CardTitle className="text-xl font-bold text-brand-darkGreen">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-green mr-3 flex-shrink-0 text-lg font-bold">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {product.yearlySavings && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-green-800 font-semibold text-center">
                      💰 Jaarlijkse besparing: {product.yearlySavings}
                    </p>
                    <p className="text-xs text-green-600 text-center mt-1">
                      Bij {product.kwhPrice}/kWh
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-center pt-4 bg-gray-50 border-t">
                <p className="text-3xl font-bold text-brand-darkGreen mb-4">{product.price}</p>
                <Button 
                  onClick={() => openRequestForm(product)}
                  className="w-full bg-gradient-to-r from-brand-green to-green-600 hover:from-green-600 hover:to-brand-darkGreen transition-all duration-300 text-white font-bold py-3 px-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  size="lg"
                >
                  🔥 Gratis Offerte Aanvragen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Request Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-brand-darkGreen">
              Gratis Offerte Aanvragen
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              Vul uw gegevens in en ontvang binnen 24 uur een persoonlijke offerte
            </p>
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

// Verbeterd formulier voor zonnepanelen aanvragen
function SimpleZonnepanelenForm({ product, onSuccess }: { product: any; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error("U dient akkoord te gaan met onze voorwaarden", {
        duration: 5000,
        position: 'top-center',
      });
      return;
    }
    
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Zorgvuldig voorbereiden van data voor database
    const requestData = {
      // Klantgegevens
      naam: formData.get('naam') as string,
      email: formData.get('email') as string,
      telefoon: formData.get('telefoon') as string,
      adres: formData.get('adres') as string,
      postcode: formData.get('postcode') as string || '',
      plaats: formData.get('plaats') as string,
      opmerkingen: formData.get('opmerkingen') as string || '',
      
      // Productinformatie (automatisch ingevuld vanaf geselecteerd pakket)
      type_paneel: product.title,
      aantal_panelen: parseInt(product.panels) || 0,
      vermogen: parseInt(product.wattage) || 0,
      merk: product.brand || 'Zonnepanelen pakket',
      conditie: product.condition || 'Nieuw',
      dak_type: formData.get('dak_type') as string || 'Nog te bepalen',
      
      // Systeemvelden
      status: 'nieuw'
    };

    console.log('Opslaan zonnepanelen aanvraag:', requestData);

    try {
      const { data, error } = await supabase
        .from('refurbished_zonnepanelen')
        .insert([requestData])
        .select();

      if (error) {
        console.error('Database fout:', error);
        throw error;
      }

      console.log('Succesvol opgeslagen:', data);
      toast.success("🎉 Bedankt voor uw aanvraag! We nemen binnen 24 uur contact met u op.", {
        duration: 6000,
        position: 'top-center',
      });
      onSuccess();
    } catch (error) {
      console.error('Fout bij opslaan aanvraag:', error);
      toast.error("Er is een fout opgetreden. Probeer het later opnieuw.", {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      {/* Geselecteerd pakket info - prominenter weergegeven */}
      <div className="bg-gradient-to-r from-brand-green/10 to-green-100 p-6 rounded-xl mb-6 border-2 border-brand-green/30">
        <h3 className="font-bold mb-2 text-lg text-brand-darkGreen">✅ Geselecteerd pakket:</h3>
        <p className="text-xl font-bold text-brand-darkGreen mb-2">{product.title}</p>
        <p className="text-2xl font-bold text-green-700">{product.price}</p>
        {product.yearlySavings && (
          <p className="text-sm text-green-600 mt-2">
            💰 Jaarlijkse besparing: {product.yearlySavings}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Naam *</label>
            <input 
              type="text" 
              name="naam" 
              required 
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
              placeholder="Uw volledige naam"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-mailadres *</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
              placeholder="uw.email@voorbeeld.nl"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Telefoonnummer *</label>
            <input 
              type="tel" 
              name="telefoon" 
              required 
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
              placeholder="06 12345678"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Plaats *</label>
            <input 
              type="text" 
              name="plaats" 
              required 
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
              placeholder="Uw woonplaats"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Adres *</label>
          <input 
            type="text" 
            name="adres" 
            required 
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
            placeholder="Straatnaam + huisnummer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Postcode</label>
          <input 
            type="text" 
            name="postcode" 
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
            placeholder="1234 AB"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type dak (indien bekend)</label>
          <select 
            name="dak_type"
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
          >
            <option value="Nog te bepalen">Weet ik niet zeker</option>
            <option value="Hellend dak">Hellend dak (schuine pannen)</option>
            <option value="Plat dak">Plat dak</option>
            <option value="Bitumen dak">Bitumen dak</option>
            <option value="Metalen dak">Metalen dak</option>
            <option value="Anders">Anders</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Uw vraag of aanvullende informatie</label>
          <textarea 
            name="opmerkingen" 
            rows={4}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
            placeholder="Heeft u vragen of wensen? Vertel ons meer over uw situatie..."
          />
        </div>

        <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-5 h-5 text-brand-green"
          />
          <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
            Ik ga akkoord met de algemene voorwaarden en geef toestemming voor het verwerken van mijn gegevens voor deze offerte aanvraag. We nemen binnen 24 uur contact met u op.
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || !termsAccepted}
          className="w-full bg-gradient-to-r from-brand-green to-green-600 hover:from-green-600 hover:to-brand-darkGreen text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
        >
          {isSubmitting ? '🔄 Bezig met verzenden...' : '🚀 Gratis Offerte Aanvragen'}
        </button>
      </form>
    </div>
  );
}
