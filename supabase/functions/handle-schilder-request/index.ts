
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
    const requestData = await req.json();
    console.log("🎨 Received schilder request:", JSON.stringify(requestData, null, 2));

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Ensure all required fields are present and properly formatted
    const insertData = {
      voornaam: requestData.voornaam || requestData.naam?.split(' ')[0] || 'Onbekend',
      achternaam: requestData.achternaam || requestData.naam?.split(' ').slice(1).join(' ') || 'Onbekend',
      emailadres: requestData.emailadres || requestData.email,
      telefoon: requestData.telefoon,
      straatnaam: requestData.straatnaam || requestData.adres?.split(' ')[0] || 'Onbekend',
      huisnummer: requestData.huisnummer || requestData.adres?.split(' ')[1] || '1',
      postcode: requestData.postcode,
      plaats: requestData.plaats,
      project_type: requestData.project_type || 'Schilderwerk',
      verf_type: requestData.verf_type || 'Latexverf',
      oppervlakte: parseInt(requestData.oppervlakte) || 50,
      aantal_kamers: requestData.aantal_kamers ? parseInt(requestData.aantal_kamers) : null,
      voorbewerking_nodig: requestData.voorbewerking_nodig || false,
      plafond_meeverven: requestData.plafond_meeverven || false,
      kozijnen_meeverven: requestData.kozijnen_meeverven || false,
      huidige_kleur: requestData.huidige_kleur || null,
      gewenste_kleur: requestData.gewenste_kleur || null,
      bericht: requestData.bericht || null,
      totaal_prijs: requestData.totaal_prijs ? parseFloat(requestData.totaal_prijs) : null,
      status: 'nieuw'
    };

    console.log("🎨 Inserting data:", JSON.stringify(insertData, null, 2));

    // Insert into database
    const { data: insertedData, error: insertError } = await supabase
      .from("schilder_aanvragen")
      .insert([insertData])
      .select()
      .single();

    if (insertError) {
      console.error("❌ Database insert error:", insertError);
      throw insertError;
    }

    console.log("✅ Schilder request inserted successfully:", insertedData);

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 2rem; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 2rem;">🎨 Bedankt voor je aanvraag!</h1>
          <p style="color: white; margin: 0.5rem 0 0; font-size: 1.1rem;">Je schilderwerk aanvraag is succesvol ontvangen</p>
        </div>
        
        <div style="padding: 2rem; background-color: #f8fafc;">
          <h2 style="color: #1f2937; margin-bottom: 1rem;">Hallo ${insertData.voornaam},</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Dank je wel voor je interesse in onze schilderwerk diensten. We hebben je aanvraag ontvangen en zullen zo spoedig mogelijk contact met je opnemen.
          </p>
          
          <div style="background: white; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1f2937; margin: 0 0 1rem;">📋 Jouw Aanvraag Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Project Type:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${insertData.project_type}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Verf Type:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${insertData.verf_type}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Oppervlakte:</td>
                <td style="padding: 0.5rem 0; color: #1f2937;">${insertData.oppervlakte} m²</td>
              </tr>
              ${insertData.totaal_prijs ? `
              <tr>
                <td style="padding: 0.5rem 0; color: #6b7280; font-weight: 500;">Geschatte Prijs:</td>
                <td style="padding: 0.5rem 0; color: #1d4ed8; font-weight: 600;">€${insertData.totaal_prijs}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Refurbish Dakkapel <info@refurbishdakkapel.nl>",
      to: [insertData.emailadres],
      subject: "🎨 Bevestiging van je schilderwerk aanvraag",
      html: customerEmailHtml,
    });

    console.log("✅ Schilder emails sent successfully");

    return new Response(
      JSON.stringify({ success: true, data: insertedData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("❌ Error processing schilder request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
