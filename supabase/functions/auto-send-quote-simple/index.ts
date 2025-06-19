
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

console.log("=== AUTO-SEND-QUOTE-SIMPLE FUNCTION STARTED ===");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== NEW REQUEST RECEIVED ===");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    console.log("🔍 Environment check:");
    console.log("- SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✅ Set" : "❌ Missing");
    console.log("- RESEND_API_KEY:", resendApiKey ? "✅ Set" : "❌ Missing");

    if (!supabaseUrl || !supabaseServiceKey || !resendApiKey) {
      console.error("❌ Missing environment variables");
      return new Response(
        JSON.stringify({ success: false, error: "Missing environment variables" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);
    
    console.log("=== CHECKING FOR NEW DAKKAPEL REQUESTS ===");
    console.log("Current time:", new Date().toISOString());
    
    // Check for new dakkapel requests without quotes - check last 24 hours
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    console.log("Looking for requests after:", cutoffTime);

    const { data: dakkapelRequests, error: dakkapelError } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .eq('status', 'nieuw')
      .is('offerte_verzonden_op', null)
      .gte('created_at', cutoffTime)
      .order('created_at', { ascending: false });

    if (dakkapelError) {
      console.error("❌ Database fetch failed:", dakkapelError);
      return new Response(
        JSON.stringify({ success: false, error: "Database fetch failed: " + dakkapelError.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`📊 Query result: Found ${dakkapelRequests?.length || 0} requests`);
    
    if (dakkapelRequests && dakkapelRequests.length > 0) {
      console.log("📋 Request details:");
      dakkapelRequests.forEach((req, index) => {
        console.log(`  ${index + 1}. ID: ${req.id}, Email: ${req.emailadres}, Created: ${req.created_at}, Status: ${req.status}`);
      });
    }
    
    if (!dakkapelRequests || dakkapelRequests.length === 0) {
      console.log("ℹ️ No new dakkapel requests found that need quotes");
      
      // Let's also check what requests exist in total for debugging
      const { data: allRequests, error: allError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('id, emailadres, status, offerte_verzonden_op, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!allError && allRequests) {
        console.log("📋 Last 10 requests in database:");
        allRequests.forEach((req, index) => {
          console.log(`  ${index + 1}. ID: ${req.id}, Email: ${req.emailadres}, Status: ${req.status}, Quote sent: ${req.offerte_verzonden_op || 'No'}, Created: ${req.created_at}`);
        });
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No new requests found that need quotes',
        processed: { dakkapel: 0, total: 0 },
        debug: {
          totalRequestsChecked: allRequests?.length || 0,
          cutoffTime
        }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    let successCount = 0;
    let errorCount = 0;

    for (const request of dakkapelRequests) {
      console.log(`\n=== PROCESSING REQUEST ${request.id} ===`);
      console.log(`Customer: ${request.voornaam} ${request.achternaam}`);
      console.log(`Email: ${request.emailadres}`);
      console.log(`Created: ${request.created_at}`);

      try {
        const customerName = `${request.voornaam} ${request.achternaam}`;
        const customerAddress = `${request.straatnaam} ${request.huisnummer}, ${request.postcode} ${request.plaats}`;

        const defaultTemplate = `Beste ${customerName},

Hartelijk dank voor uw interesse in onze dakkapellen. Hierbij ontvangt u uw persoonlijke offerte.

De prijs is inclusief:
- Transport naar locatie  
- Montage van de dakkapel
- Afwerking binnen- en buitenzijde
- Garantie van 10 jaar op constructie en waterdichtheid
- 5 jaar garantie op de gebruikte materialen

Wij hanteren een levertijd van 6-8 weken na definitieve opdracht.

Voor vragen kunt u contact met ons opnemen.

Met vriendelijke groet,
Het team van Refurbish Totaal Nederland
085-1301578
info@refurbishtotaalnederland.nl`;

        const priceInfo = request.totaal_prijs ? 
          `<p style="font-size: 20px; font-weight: bold; color: #059669; background-color: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">Totaalprijs: €${request.totaal_prijs.toLocaleString('nl-NL')}</p>` : 
          '<p style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">Prijs wordt binnenkort meegedeeld.</p>';

        const productDetails = `
          <h3>Uw Dakkapel Configuratie:</h3>
          <ul>
            <li><strong>Type:</strong> ${request.type}</li>
            <li><strong>Afmetingen:</strong> ${request.breedte}cm x ${request.hoogte}cm</li>
            <li><strong>Materiaal:</strong> ${request.materiaal}</li>
            <li><strong>Aantal ramen:</strong> ${request.aantalramen}</li>
            <li><strong>Kozijn hoogte:</strong> ${request.kozijnhoogte}</li>
            <li><strong>Dakhelling:</strong> ${request.dakhelling}° (${request.dakhellingtype})</li>
            <li><strong>Kleur kozijnen:</strong> ${request.kleurkozijnen}</li>
            <li><strong>Kleur zijkanten:</strong> ${request.kleurzijkanten}</li>
            <li><strong>Kleur draaikiepramen:</strong> ${request.kleurdraaikiepramen}</li>
            <li><strong>RC-waarde:</strong> ${request.rcwaarde}</li>
            <li><strong>Woning zijde:</strong> ${request.woningzijde}</li>
          </ul>
        `;

        // Create interest response URLs
        const yesUrl = `${supabaseUrl}/functions/v1/handle-interest-response?id=${request.id}&response=ja&type=dakkapel`;
        const noUrl = `${supabaseUrl}/functions/v1/handle-interest-response?id=${request.id}&response=nee&type=dakkapel`;

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background-color: #059669; color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Uw Offerte - Refurbish Totaal Nederland</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Dakkapel</p>
            </div>
            
            <div style="padding: 30px;">
              <div style="white-space: pre-line; line-height: 1.6; margin-bottom: 30px;">${defaultTemplate.replace(/\n/g, '<br/>')}</div>
              
              ${priceInfo}
              
              <div style="background-color: #fff3cd; border: 2px solid #ffeaa7; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
                <h3 style="color: #856404; margin-top: 0; font-size: 18px;">Heeft u interesse om door te gaan?</h3>
                <p style="color: #856404; margin: 15px 0;">Klik op één van onderstaande knoppen:</p>
                <div style="margin: 25px 0;">
                  <a href="${yesUrl}" style="display: inline-block; background-color: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px;">✓ JA, IK HEB INTERESSE</a>
                  <br><br>
                  <a href="${noUrl}" style="display: inline-block; background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px;">✗ NEE, GEEN INTERESSE</a>
                </div>
              </div>
              
              ${productDetails}
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0;"><strong>Uw adresgegevens:</strong><br>
                ${customerAddress}</p>
              </div>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="margin-top: 0;">Contact:</h3>
                <p style="margin-bottom: 0;">
                  <strong>Refurbish Totaal Nederland</strong><br>
                  E-mail: info@refurbishtotaalnederland.nl<br>
                  Telefoon: 085-1301578
                </p>
              </div>
            </div>
            
            <div style="background-color: #059669; color: white; padding: 20px; text-align: center; font-size: 14px;">
              <p style="margin: 0;">© 2024 Refurbish Totaal Nederland</p>
            </div>
          </div>
        `;

        console.log(`📧 Sending email to: ${request.emailadres}`);

        const emailResponse = await resend.emails.send({
          from: 'Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>',
          to: [request.emailadres],
          subject: 'Dakkapel Offerte - Refurbish Totaal Nederland',
          html: emailHtml,
        });

        console.log("📬 Resend response:", emailResponse);

        if (emailResponse.error) {
          console.error(`❌ Email error for ${request.id}:`, emailResponse.error);
          errorCount++;
          continue;
        }

        if (!emailResponse.data?.id) {
          console.error(`❌ No email ID returned for ${request.id}`);
          errorCount++;
          continue;
        }

        console.log(`✅ Email sent successfully! ID: ${emailResponse.data.id}`);

        // Update database with retry logic
        let updateSuccess = false;
        for (let retry = 0; retry < 3; retry++) {
          const { error: updateError } = await supabase
            .from('dakkapel_calculator_aanvragen')
            .update({
              status: 'offerte_verzonden',
              offerte_verzonden_op: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', request.id);

          if (!updateError) {
            updateSuccess = true;
            break;
          }
          
          console.warn(`⚠️ Database update attempt ${retry + 1} failed for ${request.id}:`, updateError);
          if (retry < 2) await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (updateSuccess) {
          console.log(`✅ Database updated for ${request.id}`);
          successCount++;
        } else {
          console.error(`❌ Failed to update database for ${request.id} after 3 attempts`);
          errorCount++;
        }

      } catch (requestError) {
        console.error(`❌ Error processing request ${request.id}:`, requestError);
        errorCount++;
      }

      // Small delay between requests to avoid overwhelming services
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n=== BATCH PROCESS COMPLETED ===`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Automatic quote process completed. Sent ${successCount} quotes.`,
      processed: {
        dakkapel: successCount,
        errors: errorCount,
        total: successCount + errorCount
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("=== CRITICAL ERROR ===", error);
    return new Response(
      JSON.stringify({ success: false, error: `Critical error: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
