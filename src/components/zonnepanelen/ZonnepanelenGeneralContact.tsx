
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import ReusableForm from '@/components/common/ReusableForm';

export function ZonnepanelenGeneralContact() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Vragen over zonnepanelen?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Niet zeker welk pakket het beste bij u past? Of heeft u andere vragen over zonnepanelen? 
            Neem vrijblijvend contact met ons op!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Phone className="h-12 w-12 text-brand-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Bel ons direct</h3>
              <p className="text-gray-600 mb-4">Persoonlijk advies via telefoon</p>
              <a href="tel:+31123456789" className="text-brand-green hover:text-brand-darkGreen font-medium">
                +31 (0)12 345 67 89
              </a>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Mail className="h-12 w-12 text-brand-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">E-mail ons</h3>
              <p className="text-gray-600 mb-4">Stuur uw vraag per e-mail</p>
              <a href="mailto:info@refurbishtotaalnederland.nl" className="text-brand-green hover:text-brand-darkGreen font-medium">
                info@refurbishtotaalnederland.nl
              </a>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <MessageCircle className="h-12 w-12 text-brand-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Contactformulier</h3>
              <p className="text-gray-600 mb-4">Snel en eenvoudig contact</p>
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="bg-brand-green hover:bg-brand-darkGreen text-white"
              >
                Contact opnemen
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-brand-green/5 border-brand-green/20 p-8 max-w-2xl mx-auto">
            <CardContent className="pt-0">
              <h3 className="text-xl font-semibold text-brand-darkGreen mb-4">
                Gratis advies op maat
              </h3>
              <p className="text-gray-700 mb-6">
                Onze specialisten berekenen graag wat de beste zonnepanelen oplossing voor uw situatie is. 
                Inclusief besparingsberekening en terugverdientijd.
              </p>
              <Button 
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="bg-brand-green hover:bg-brand-darkGreen text-white"
              >
                Gratis adviesgesprek aanvragen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-brand-darkGreen">
              Contact opnemen - Zonnepanelen
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <ReusableForm
              title=""
              description="Vul uw gegevens in en we nemen zo snel mogelijk contact met u op voor gratis advies."
              templateId="template_zonnepanelen_contact"
              buttonText="Verstuur bericht"
              supabaseTable="refurbished_zonnepanelen"
              additionalFields={[
                {
                  name: 'type_paneel',
                  label: 'Type aanvraag',
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
                  label: 'Vermogen',
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
                  label: 'Type dak (indien bekend)',
                  type: 'select',
                  required: false,
                  options: [
                    { value: '', label: 'Weet ik niet zeker' },
                    { value: 'hellend_dak', label: 'Hellend dak (schuine pannen)' },
                    { value: 'plat_dak', label: 'Plat dak' },
                    { value: 'bitumen_dak', label: 'Bitumen dak' },
                    { value: 'metalen_dak', label: 'Metalen dak' },
                    { value: 'anders', label: 'Anders' }
                  ]
                },
                {
                  name: 'gewenste_opbrengst',
                  label: 'Jaarlijks energieverbruik (kWh, indien bekend)',
                  type: 'number',
                  required: false,
                  placeholder: 'Staat op uw energierekening'
                },
                {
                  name: 'opmerkingen',
                  label: 'Uw vraag of bericht',
                  type: 'textarea',
                  required: true,
                  placeholder: 'Waar kunnen we u mee helpen? Vertel ons over uw wensen, situatie of vragen...'
                }
              ]}
              onSuccess={() => {
                setIsFormOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
