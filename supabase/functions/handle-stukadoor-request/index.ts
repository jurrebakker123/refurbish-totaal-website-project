
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface StukadoorRequestData {
  customerData: {
    voornaam: string;
    achternaam: string;
    emailadres: string;
    telefoon: string;
    straatnaam: string;
    huisnummer: string;
    postcode: string;
    plaats: string;
  };
  formData: {
    bouw_type: string;
    stuc_type: string;
    oppervlakte_wanden: string;
    oppervlakte_plafonds: string;
    isolatie_gewenst: boolean;
    uitvoertermijn: string;
    reden_aanvraag: string;
    bericht: string;
  };
  totalPrice: number;
  breakdown: any[];
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🏗️ Stukadoor request handler started');
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, formData, totalPrice }: StukadoorRequestData = await req.json();
    console.log('📨 Processing stukadoor request for:', customerData.emailadres);

    // Format project details for email
    const getStucTypeLabel = (type: string) => {
      switch (type) {
        case 'glad_stucwerk': return 'Glad stucwerk';
        case 'spachtelputz': return 'Spachtelputz';
        case 'decoratief_stuc': return 'Decoratief stucwerk';
        default: return type;
      }
    };

    const projectDetails = `
<h3>📋 Project Details</h3>
<ul>
<li><strong>Type:</strong> ${formData.bouw_type === 'nieuwbouw' ? 'Nieuwbouw' : 'Renovatie'}</li>
<li><strong>Stucwerk type:</strong> ${getStucTypeLabel(formData.stuc_type)}</li>
<li><strong>Wand oppervlakte:</strong> ${formData.oppervlakte_wanden || 'Niet opgegeven'} m²</li>
<li><strong>Plafond oppervlakte:</strong> ${formData.oppervlakte_plafonds || 'Niet opgegeven'} m²</li>
<li><strong>Isolatie gewenst:</strong> ${formData.isolatie_gewenst ? 'Ja' : 'Nee'}</li>
<li><strong>Uitvoertermijn:</strong> ${formData.uitvoertermijn}</li>
<li><strong>Reden aanvraag:</strong> ${formData.reden_aanvraag}</li>
<li><strong>Geschatte prijs:</strong> €${totalPrice.toLocaleString()}</li>
</ul>
`;

    const additionalInfo = formData.bericht ? `
<h3>💬 Aanvullende opmerkingen</h3>
<p>${formData.bericht}</p>
` : '';

    // Send confirmation email to customer
    console.log('📧 Sending customer confirmation email...');
    const customerEmailResponse = await resend.emails.send({
      from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
      to: [customerData.emailadres],
      subject: "Bevestiging: Uw stukadoorswerk aanvraag is ontvangen",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2E8B57;">Bedankt voor uw aanvraag!</h2>
          
          <p>Beste ${customerData.voornaam} ${customerData.achternaam},</p>
          
          <p>Wij hebben uw aanvraag voor stukadoorswerk ontvangen en zullen zo spoedig mogelijk contact met u opnemen.</p>
          
          ${projectDetails}
          
          ${additionalInfo}
          
          <h3>📍 Uw gegevens</h3>
          <ul>
            <li><strong>Naam:</strong> ${customerData.voornaam} ${customerData.achternaam}</li>
            <li><strong>Email:</strong> ${customerData.emailadres}</li>
            <li><strong>Telefoon:</strong> ${customerData.telefoon}</li>
            <li><strong>Adres:</strong> ${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}</li>
          </ul>
          
          <p>Wij nemen binnen 24 uur contact met u op om de volgende stappen te bespreken.</p>
          
          <p>Met vriendelijke groet,<br>
          Het team van Refurbish Totaal Nederland</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            Refurbish Totaal Nederland<br>
            Email: info@refurbishtotaalnederland.nl<br>
            Website: www.refurbishtotaalnederland.nl
          </p>
        </div>
      `,
    });

    if (customerEmailResponse.error) {
      console.error('❌ Customer email error:', customerEmailResponse.error);
      throw customerEmailResponse.error;
    }

    console.log('✅ Customer confirmation email sent successfully');

    // Send admin notification emails
    console.log('📧 Sending admin notification emails...');
    const adminEmails = [
      'info@refurbishtotaalnederland.nl',
      'mazenaddas95@gmail.com'
    ];

    for (const adminEmail of adminEmails) {
      console.log(`📧 Sending to admin: ${adminEmail}`);
      
      const adminEmailResponse = await resend.emails.send({
        from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
        to: [adminEmail],
        subject: `🏗️ Nieuwe Stukadoorswerk Aanvraag - ${customerData.voornaam} ${customerData.achternaam}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2E8B57;">🏗️ Nieuwe Stukadoorswerk Aanvraag</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>👤 Klantgegevens</h3>
              <ul>
                <li><strong>Naam:</strong> ${customerData.voornaam} ${customerData.achternaam}</li>
                <li><strong>Email:</strong> ${customerData.emailadres}</li>
                <li><strong>Telefoon:</strong> ${customerData.telefoon}</li>
                <li><strong>Adres:</strong> ${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}</li>
              </ul>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${projectDetails}
            </div>
            
            ${additionalInfo}
            
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3>💰 Prijsinformatie</h3>
              <p><strong>Geschatte totaalprijs:</strong> €${totalPrice.toLocaleString()}</p>
              <small>BTW-tarief: ${formData.bouw_type === 'nieuwbouw' ? '21%' : '9%'} (${formData.bouw_type})</small>
            </div>
            
            <p><strong>⏰ Actie vereist:</strong> Neem contact op met de klant binnen 24 uur.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666;">
              Deze aanvraag is automatisch gegenereerd via de website configurator.<br>
              Datum: ${new Date().toLocaleDateString('nl-NL')} ${new Date().toLocaleTimeString('nl-NL')}
            </p>
          </div>
        `,
      });

      if (adminEmailResponse.error) {
        console.error(`❌ Admin email error for ${adminEmail}:`, adminEmailResponse.error);
        throw adminEmailResponse.error;
      }

      console.log(`✅ Admin notification sent to ${adminEmail}`);
    }

    console.log('✅ All stukadoor emails sent successfully');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Emails sent successfully',
      customerEmail: customerEmailResponse.data?.id,
      adminEmails: adminEmails.length
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('❌ Error in stukadoor request handler:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
