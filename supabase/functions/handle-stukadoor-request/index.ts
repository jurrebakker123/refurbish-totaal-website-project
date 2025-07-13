
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, formData, totalPrice } = await req.json();
    console.log("🔨 Received stukadoor request:", { customerData, formData, totalPrice });

    // Create Supabase client with service role key for database operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Insert into database - We'll continue even if this fails
    let insertedData = null;
    try {
      const { data, error: insertError } = await supabase
        .from("stukadoor_aanvragen")
        .insert({
          voornaam: customerData.voornaam,
          achternaam: customerData.achternaam,
          emailadres: customerData.emailadres,
          telefoon: customerData.telefoon,
          straatnaam: customerData.straatnaam,
          huisnummer: customerData.huisnummer,
          postcode: customerData.postcode,
          plaats: customerData.plaats,
          werk_type: 'nieuw_stucwerk',
          afwerking: formData.stuc_type,
          oppervlakte: (parseFloat(formData.oppervlakte_wanden) || 0) + (parseFloat(formData.oppervlakte_plafonds) || 0),
          isolatie_gewenst: formData.isolatie_gewenst,
          bericht: formData.bericht,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        })
        .select()
        .single();

      if (insertError) {
        console.error("❌ Database insert error:", insertError);
      } else {
        insertedData = data;
        console.log("✅ Stukadoor request inserted successfully:", insertedData);
      }
    } catch (dbError) {
      console.error("❌ Database operation failed:", dbError);
    }

    // Always send emails regardless of database success
    console.log("📧 Sending emails...");

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 2rem; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 2rem;">🔨 Bedankt voor je aanvraag!</h1>
          <p style="color: white; margin: 0.5rem 0 0; font-size: 1.1rem;">Je stukadoor aanvraag is succesvol ontvangen</p>
        </div>
        
        <div style="padding: 2rem; background-color: #f8fafc;">
          <h2 style="color: #1f2937; margin-bottom: 1rem;">Hallo ${customerData.voornaam},</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Dank je wel voor je interesse in onze stukadoor diensten. We hebben je aanvraag ontvangen en zullen zo spoedig mogelijk contact met je opnemen.
          </p>
          
          <div style="background: white; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1f2937; margin: 0 0 1rem;">📋 Jouw Aanvraag Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Werk Type:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">Nieuw stucwerk</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Afwerking:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${formData.stuc_type?.replace('_', ' ') || 'Niet opgegeven'}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Wand Oppervlakte (m²):</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${parseFloat(formData.oppervlakte_wanden) || 0} m²</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Plafond Oppervlakte (m²):</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${parseFloat(formData.oppervlakte_plafonds) || 0} m²</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Totaal Oppervlakte:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${(parseFloat(formData.oppervlakte_wanden) || 0) + (parseFloat(formData.oppervlakte_plafonds) || 0)} m²</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Extra opties:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">Isolatie gewenst: ${formData.isolatie_gewenst ? 'Ja' : 'Nee'}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Gewenste uitvoertermijn:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${formData.uitvoertermijn || formData.gewenste_uitvoertermijn || 'Niet opgegeven'}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Reden van aanvraag:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${formData.reden_aanvraag || 'Niet opgegeven'}</td>
              </tr>
              ${totalPrice ? `
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Geschatte Prijs:</td>
                <td style="padding: 0.5rem 0; color: #059669; font-weight: 600;">€${totalPrice}</td>
              </tr>
              ` : ''}
            </table>

            ${formData.bericht ? `
            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
              <h4 style="color: #1f2937; margin: 0 0 0.5rem;">💬 Aanvullende opmerkingen:</h4>
              <p style="color: #1f2937; margin: 0; line-height: 1.6;">${formData.bericht}</p>
            </div>
            ` : ''}
          </div>
          
          <div style="background: #e0f2fe; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
            <h3 style="color: #0369a1; margin: 0 0 1rem;">📞 Wat gebeurt er nu?</h3>
            <ul style="color: #0369a1; margin: 0; padding-left: 1.5rem;">
              <li>We beoordelen je aanvraag binnen 24 uur</li>
              <li>Je ontvangt een persoonlijke offerte</li>
              <li>We plannen een afspraak op locatie</li>
              <li>We starten met de werkzaamheden</li>
            </ul>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Heb je vragen? Neem gerust contact met ons op via <a href="mailto:info@refurbishtotaalnederland.nl" style="color: #10b981;">info@refurbishtotaalnederland.nl</a> of bel ons op <a href="tel:+31123456789" style="color: #10b981;">+31 123 456 789</a>.
          </p>
        </div>
        
        <div style="background-color: #1f2937; padding: 1.5rem; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 0.9rem;">
            © 2024 Refurbish Totaal Nederland - Stukadoor Specialist
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
      to: [customerData.emailadres],
      subject: "🔨 Bevestiging van je stukadoor aanvraag",
      html: customerEmailHtml,
    });

    // Send admin notification email
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 2rem; text-align: center;">
          <h1 style="color: #000000; margin: 0; font-size: 1.8rem;">🔨 Nieuwe Stukadoorswerk Aanvraag</h1>
          <p style="color: #000000; margin: 0.5rem 0 0; font-size: 1rem;">Admin Notificatie</p>
        </div>
        
        <div style="padding: 2rem; background-color: #ffffff;">
          <div style="background: #fef2f2; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid #dc2626;">
            <h2 style="color: #000000; margin: 0 0 1rem; font-size: 1.2rem;">🎯 Klant Informatie</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600; width: 30%;">Naam:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${customerData.voornaam} ${customerData.achternaam}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Email:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${customerData.emailadres}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Telefoon:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${customerData.telefoon}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Adres:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f0f9ff; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid #0ea5e9;">
            <h2 style="color: #000000; margin: 0 0 1rem; font-size: 1.2rem;">🔨 Project Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600; width: 30%;">Werk Type:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">Nieuw stucwerk</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Afwerking:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${formData.stuc_type?.replace('_', ' ') || 'Niet opgegeven'}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Wand Oppervlakte:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${parseFloat(formData.oppervlakte_wanden) || 0} m²</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Plafond Oppervlakte:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${parseFloat(formData.oppervlakte_plafonds) || 0} m²</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Totaal Oppervlakte:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${(parseFloat(formData.oppervlakte_wanden) || 0) + (parseFloat(formData.oppervlakte_plafonds) || 0)} m²</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Isolatie Gewenst:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${formData.isolatie_gewenst ? 'Ja' : 'Nee'}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Gewenste Uitvoertermijn:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${formData.uitvoertermijn || formData.gewenste_uitvoertermijn || 'Niet opgegeven'}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 600;">Reden van aanvraag:</td>
                <td style="padding: 0.5rem 0; color: #000000; font-weight: 400;">${formData.reden_aanvraag || 'Niet opgegeven'}</td>
              </tr>
            </table>
          </div>
          
          ${totalPrice ? `
          <div style="background: #f0fdf4; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid #10b981; text-align: center;">
            <h2 style="color: #000000; margin: 0 0 0.5rem; font-size: 1.2rem;">💰 Totaalprijs:</h2>
            <p style="color: #059669; font-size: 2rem; font-weight: 700; margin: 0;">€${totalPrice}</p>
            <p style="color: #000000; margin: 0.5rem 0 0; font-size: 0.9rem;">Prijsindicatie inclusief BTW</p>
          </div>
          ` : ''}
          
          ${formData.bericht ? `
          <div style="background: #fffbeb; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b;">
            <h2 style="color: #000000; margin: 0 0 1rem; font-size: 1.2rem;">💬 Aanvullende Informatie</h2>
            <p style="color: #000000; line-height: 1.6; margin: 0;">${formData.bericht}</p>
          </div>
          ` : ''}
          
          <div style="background: #1f2937; border-radius: 8px; padding: 1.5rem; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 1rem;">
              🚨 <strong>ACTIE VEREIST:</strong> Log in op het admin dashboard om deze aanvraag te verwerken
            </p>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Refurbish Totaal Nederland <admin@refurbishtotaalnederland.nl>",
      to: ["info@refurbishtotaalnederland.nl", "mazenaddas95@gmail.com"],
      subject: "🔨 Nieuwe Stukadoor Aanvraag - Actie Vereist",
      html: adminEmailHtml,
    });

    console.log("✅ Stukadoor emails sent successfully");

    return new Response(
      JSON.stringify({ success: true, data: insertedData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("❌ Error processing stukadoor request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
