
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, formData, totalPrice, breakdown } = await req.json();
    
    console.log('🏗️ Processing stukadoor request:', customerData);

    // Send confirmation email to customer
    const customerEmailHtml = `
      <h2>Bevestiging Stukadoorswerk Aanvraag</h2>
      <p>Beste ${customerData.voornaam} ${customerData.achternaam},</p>
      <p>Bedankt voor uw aanvraag voor stukadoorswerk. Hieronder vindt u een overzicht:</p>
      
      <h3>Contactgegevens:</h3>
      <ul>
        <li>Naam: ${customerData.voornaam} ${customerData.achternaam}</li>
        <li>E-mail: ${customerData.emailadres}</li>
        <li>Telefoon: ${customerData.telefoon}</li>
        <li>Adres: ${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}</li>
      </ul>

      <h3>Projectdetails:</h3>
      <ul>
        <li>Type: ${formData.werk_type}</li>
        <li>Bouwtype: ${formData.bouw_type}</li>
        <li>Stucwerk type: ${formData.stuc_type}</li>
        <li>Wand oppervlakte: ${formData.oppervlakte_wanden}m²</li>
        <li>Plafond oppervlakte: ${formData.oppervlakte_plafonds}m²</li>
      </ul>

      <h3>Prijsopbouw:</h3>
      ${breakdown.map(item => `<p>${item}</p>`).join('')}
      <p><strong>Totaalprijs: €${totalPrice.toLocaleString()}</strong></p>

      <p>Wij nemen zo spoedig mogelijk contact met u op.</p>
      <p>Met vriendelijke groet,<br>Refurbish Totaal Nederland</p>
    `;

    await resend.emails.send({
      from: "Refurbish Totaal Nederland <noreply@refurbishtotaalnederland.nl>",
      to: [customerData.emailadres],
      subject: "Bevestiging stukadoorswerk aanvraag",
      html: customerEmailHtml,
    });

    // Send notification to admin emails
    const adminEmailHtml = `
      <h2>Nieuwe Stukadoorswerk Aanvraag</h2>
      <h3>Klantgegevens:</h3>
      <ul>
        <li>${customerData.voornaam} ${customerData.achternaam}</li>
        <li>${customerData.emailadres}</li>
        <li>${customerData.telefoon}</li>
        <li>${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}</li>
      </ul>

      <h3>Project:</h3>
      <ul>
        <li>Type: ${formData.werk_type}</li>
        <li>Bouwtype: ${formData.bouw_type}</li>
        <li>Stucwerk type: ${formData.stuc_type}</li>
        <li>Wand oppervlakte: ${formData.oppervlakte_wanden}m²</li>
        <li>Plafond oppervlakte: ${formData.oppervlakte_plafonds}m²</li>
      </ul>

      <h3>Prijsberekening:</h3>
      ${breakdown.map(item => `<p>${item}</p>`).join('')}
      <p><strong>Totaal: €${totalPrice.toLocaleString()}</strong></p>
    `;

    const adminEmails = ['info@refurbishtotaalnederland.nl', 'mazenaddas95@gmail.com'];
    
    for (const email of adminEmails) {
      await resend.emails.send({
        from: `${customerData.voornaam} ${customerData.achternaam} <noreply@refurbishtotaalnederland.nl>`,
        to: [email],
        subject: `Nieuwe stukadoorswerk aanvraag van ${customerData.voornaam} ${customerData.achternaam}`,
        html: adminEmailHtml,
        reply_to: customerData.emailadres
      });
    }

    console.log('✅ Stukadoor emails sent successfully');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error('❌ Stukadoor request error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
