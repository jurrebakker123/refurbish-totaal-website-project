
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { sendEmail } from '@/config/email';
import ProjectTypeSection from './ProjectTypeSection';
import ProjectDetailsSection from './ProjectDetailsSection';
import PriceDisplaySection from './PriceDisplaySection';
import ContactFormSection from './ContactFormSection';
import { usePriceCalculation } from './usePriceCalculation';

const SchilderConfigurator = () => {
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    emailadres: '',
    telefoon: '',
    straatnaam: '',
    huisnummer: '',
    postcode: '',
    plaats: '',
    project_type: 'binnen',
    bouw_type: 'renovatie',
    oppervlakte: '',
    plafond_oppervlakte: '',
    aantal_deuren: '',
    aantal_ramen: '',
    meerdere_kleuren: false,
    uitvoertermijn: '',
    reden_aanvraag: '',
    bericht: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { calculatePrice, hasAnyInput } = usePriceCalculation(formData);
  const totalPrice = calculatePrice();

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Bestand is te groot. Maximaal 10MB toegestaan.');
        return;
      }
      setUploadedFile(file);
      toast.success('Bestand succesvol geüpload');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('🚀 Form submission started');

    try {
      // Strikte validatie van verplichte velden
      if (!formData.voornaam?.trim()) {
        toast.error('Voornaam is verplicht');
        return;
      }
      if (!formData.achternaam?.trim()) {
        toast.error('Achternaam is verplicht');
        return;
      }
      if (!formData.emailadres?.trim()) {
        toast.error('E-mailadres is verplicht');
        return;
      }
      if (!formData.telefoon?.trim()) {
        toast.error('Telefoonnummer is verplicht');
        return;
      }
      if (!formData.straatnaam?.trim()) {
        toast.error('Straatnaam is verplicht');
        return;
      }
      if (!formData.huisnummer?.trim()) {
        toast.error('Huisnummer is verplicht');
        return;
      }
      if (!formData.postcode?.trim()) {
        toast.error('Postcode is verplicht');
        return;
      }
      if (!formData.plaats?.trim()) {
        toast.error('Plaats is verplicht');
        return;
      }
      if (!formData.uitvoertermijn?.trim()) {
        toast.error('Uitvoertermijn is verplicht');
        return;
      }
      if (!formData.reden_aanvraag?.trim()) {
        toast.error('Reden aanvraag is verplicht');
        return;
      }
      if (!formData.oppervlakte || parseInt(formData.oppervlakte) <= 0) {
        toast.error('Vul een geldige oppervlakte in');
        return;
      }

      console.log('✅ Form validation passed');

      // Bereid database data voor met expliciete type conversies
      const insertData = {
        voornaam: String(formData.voornaam).trim(),
        achternaam: String(formData.achternaam).trim(),
        emailadres: String(formData.emailadres).trim().toLowerCase(),
        telefoon: String(formData.telefoon).trim(),
        straatnaam: String(formData.straatnaam).trim(),
        huisnummer: String(formData.huisnummer).trim(),
        postcode: String(formData.postcode).trim().toUpperCase(),
        plaats: String(formData.plaats).trim(),
        project_type: `${formData.project_type} - ${formData.bouw_type}`,
        verf_type: formData.meerdere_kleuren ? 'Meerdere kleuren' : 'Één kleur',
        oppervlakte: Math.max(1, parseInt(formData.oppervlakte) || 1),
        totaal_prijs: totalPrice || null,
        plafond_meeverven: Boolean(parseFloat(formData.plafond_oppervlakte || '0') > 0),
        kozijnen_meeverven: Boolean((parseInt(formData.aantal_deuren || '0') + parseInt(formData.aantal_ramen || '0')) > 0),
        bericht: formData.bericht?.trim() || null,
        status: 'nieuw'
      };

      console.log('📊 Insert data prepared:', insertData);

      // Database insert met expliciet schema en tabel
      console.log('💾 Attempting database insert...');
      
      const { data: result, error: dbError } = await supabase
        .from('schilder_aanvragen')
        .insert([insertData])
        .select()
        .single();

      if (dbError) {
        console.error('❌ Database error details:', {
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          code: dbError.code
        });
        
        // Probeer alternatieve insert methode
        console.log('🔄 Trying alternative insert method...');
        const { data: altResult, error: altError } = await supabase
          .from('schilder_aanvragen')
          .insert(insertData)
          .select()
          .maybeSingle();

        if (altError) {
          console.error('❌ Alternative insert also failed:', altError);
          throw new Error(`Database insert failed: ${altError.message}`);
        }
        
        console.log('✅ Alternative insert successful:', altResult);
      } else {
        console.log('✅ Database insert successful:', result);
      }

      // Verstuur admin email (asynchroon)
      sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: `${formData.voornaam} ${formData.achternaam}`,
        from_email: formData.emailadres,
        to_name: 'Refurbish Totaal Nederland',
        to_email: 'info@refurbishtotaalnederland.nl',
        subject: 'Nieuwe Schilderwerk Aanvraag',
        message: `
Nieuwe schilderwerk aanvraag ontvangen:

Klant: ${formData.voornaam} ${formData.achternaam}
Email: ${formData.emailadres}
Telefoon: ${formData.telefoon}
Adres: ${formData.straatnaam} ${formData.huisnummer}, ${formData.postcode} ${formData.plaats}

Project: ${formData.project_type} - ${formData.bouw_type}
Oppervlakte wanden: ${formData.oppervlakte}m²
${formData.plafond_oppervlakte ? `Oppervlakte plafonds: ${formData.plafond_oppervlakte}m²` : ''}
${formData.aantal_deuren ? `Aantal deuren: ${formData.aantal_deuren}` : ''}
${formData.aantal_ramen ? `Aantal ramen: ${formData.aantal_ramen}` : ''}
Meerdere kleuren: ${formData.meerdere_kleuren ? 'Ja' : 'Nee'}

${totalPrice ? `Geschatte prijs: €${totalPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Buiten schilderwerk - prijs op maat'}

Uitvoertermijn: ${formData.uitvoertermijn}
Reden aanvraag: ${formData.reden_aanvraag}

${formData.bericht ? `Bericht: ${formData.bericht}` : ''}
        `,
        reply_to: formData.emailadres,
        phone: formData.telefoon,
        service: 'Schilderwerk',
        location: formData.plaats,
        preferred_date: formData.uitvoertermijn
      }).catch(error => console.error('⚠️ Admin email failed:', error));

      // Verstuur klant bevestiging (asynchroon)
      sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: 'Refurbish Totaal Nederland',
        from_email: 'info@refurbishtotaalnederland.nl',
        to_name: `${formData.voornaam} ${formData.achternaam}`,
        to_email: formData.emailadres,
        subject: 'Bevestiging Schilderwerk Aanvraag',
        message: `
Beste ${formData.voornaam},

Bedankt voor uw aanvraag voor schilderwerk. Wij hebben uw aanvraag in goede orde ontvangen.

Uw projectdetails:
- Project: ${formData.project_type} - ${formData.bouw_type}
- Oppervlakte: ${formData.oppervlakte}m² wanden${formData.plafond_oppervlakte ? `, ${formData.plafond_oppervlakte}m² plafonds` : ''}
${totalPrice ? `- Geschatte prijs: €${totalPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '- Voor buitenschilderwerk nemen wij contact met u op voor een prijs op maat'}
- Gewenste uitvoertermijn: ${formData.uitvoertermijn}

Wij nemen binnen 24 uur contact met u op voor een afspraak.

Met vriendelijke groet,
Refurbish Totaal Nederland

Tel: 06-12345678
Email: info@refurbishtotaalnederland.nl
        `,
        reply_to: 'info@refurbishtotaalnederland.nl'
      }).catch(error => console.error('⚠️ Customer email failed:', error));

      // Succes feedback
      toast.success('✅ Aanvraag succesvol verzonden! Je ontvangt een bevestigingsmail.');
      
      // Reset formulier
      setFormData({
        voornaam: '',
        achternaam: '',
        emailadres: '',
        telefoon: '',
        straatnaam: '',
        huisnummer: '',
        postcode: '',
        plaats: '',
        project_type: 'binnen',
        bouw_type: 'renovatie',
        oppervlakte: '',
        plafond_oppervlakte: '',
        aantal_deuren: '',
        aantal_ramen: '',
        meerdere_kleuren: false,
        uitvoertermijn: '',
        reden_aanvraag: '',
        bericht: ''
      });
      setUploadedFile(null);

      console.log('🎉 Form submission completed successfully');

    } catch (error: any) {
      console.error('💥 Submission error:', error);
      toast.error(`Er is een fout opgetreden: ${error.message || 'Onbekende fout'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Schilderwerk Configurator</CardTitle>
          <p className="text-center text-gray-600">
            Configureer je schilderproject en ontvang direct een prijsindicatie
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ProjectTypeSection 
              formData={formData} 
              onFormDataChange={handleFormDataChange} 
            />
            
            <ProjectDetailsSection 
              formData={formData} 
              onFormDataChange={handleFormDataChange} 
            />

            <PriceDisplaySection 
              formData={formData} 
              totalPrice={totalPrice} 
              hasAnyInput={hasAnyInput} 
            />

            <ContactFormSection 
              formData={formData} 
              onFormDataChange={handleFormDataChange}
              uploadedFile={uploadedFile}
              onFileUpload={handleFileUpload}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Bezig met verzenden...' : 'Aanvraag Versturen'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchilderConfigurator;
