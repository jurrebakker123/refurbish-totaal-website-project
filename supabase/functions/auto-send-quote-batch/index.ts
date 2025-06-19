
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend@2.0.0";

console.log("=== AUTO-SEND-QUOTE-BATCH FUNCTION STARTED ===");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== NEW REQUEST RECEIVED ===");
  console.log("Method:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Gebruik de JUISTE Supabase credentials voor jouw project
    const supabaseUrl = 'https://pluhasunoaevfrdugkzg.supabase.co';
    const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODAwMjE1MSwiZXhwIjoyMDYzNTc4MTUxfQ.dQw4w9WgXcQ_LCHpqxJLIEpTbgs2G1QiOiNGRlOCR8k';
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    console.log("=== ENVIRONMENT CHECK ===");
    console.log("SUPABASE_URL:", !!supabaseUrl);
    console.log("SUPABASE_SERVICE_ROLE_KEY:", !!supabaseServiceKey);
    console.log("RESEND_API_KEY:", !!resendApiKey);

    if (!resendApiKey) {
      console.error("❌ RESEND_API_KEY is missing!");
      return new Response(
        JSON.stringify({ success: false, error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("✅ All environment variables are configured");
    
    const resend = new Resend(resendApiKey);
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log("=== CHECKING FOR NEW DAKKAPEL REQUESTS ===");
    
    // Get all dakkapel requests from last 48 hours
    const { data: allRequests, error: fetchError } = await supabaseClient
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .gte('created_at', new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    console.log("All dakkapel requests from last 48 hours:", allRequests?.length || 0);
    
    if (fetchError) {
      console.error("❌ Database fetch error:", fetchError);
      return new Response(
        JSON.stringify({ success: false, error: "Database fetch failed", details: fetchError }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!allRequests || allRequests.length === 0) {
      console.log("ℹ️ No dakkapel requests found in last 48 hours");
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No requests found in last 48 hours',
        processed: { dakkapel: 0, total: 0 }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Filter for new requests without quotes
    const newRequests = allRequests.filter(req => 
      req.status === 'nieuw' && !req.offerte_verzonden_op
    );

    console.log("Requests breakdown:");
    console.log("- Total requests:", allRequests.length);
    console.log("- New requests without quotes:", newRequests.length);
    
    allRequests.forEach(req => {
      console.log(`Request ${req.id}: status="${req.status}", offerte_verzonden_op="${req.offerte_verzonden_op}", email="${req.emailadres}"`);
    });

    if (newRequests.length === 0) {
      console.log("ℹ️ No new requests found that need quotes");
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No new requests found that need quotes',
        processed: { dakkapel: 0, total: 0 }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log(`🎯 Found ${newRequests.length} requests that need quotes`);

    let successCount = 0;
    let errorCount = 0;

    for (const request of newRequests) {
      console.log(`\n=== PROCESSING REQUEST ${request.id} ===`);
      console.log(`Customer: ${request.voornaam} ${request.achternaam}`);
      console.log(`Email: ${request.emailadres}`);
      console.log(`Created: ${request.created_at}`);

      try {
        const customerName = `${request.voornaam} ${request.achternaam}`;
        const customerAddress = `${request.straatnaam} ${request.huisnummer}, ${request.postcode} ${request.plaats}`;

        const priceInfo = request.totaal_prijs ? 
          `<p style="font-size: 20px; font-weight: bold; color: #059669; background-color: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">Totaalprijs: €${request.totaal_prijs.toLocaleString('nl-NL')}</p>` : 
          '<p style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">Prijs wordt binnenkort meegedeeld.</p>';

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
        const yesUrl = `https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/handle-interest-response?id=${request.id}&response=ja&type=dakkapel`;
        const noUrl = `https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/handle-interest-response?id=${request.id}&response=nee&type=dakkapel`;

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

        console.log("Resend response:", emailResponse);

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

        // Update database
        const { error: updateError } = await supabaseClient
          .from('dakkapel_calculator_aanvragen')
          .update({
            status: 'offerte_verzonden',
            offerte_verzonden_op: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', request.id);

        if (updateError) {
          console.error(`❌ Database update error for ${request.id}:`, updateError);
          errorCount++;
        } else {
          console.log(`✅ Database updated for ${request.id}`);
          successCount++;
        }

      } catch (requestError) {
        console.error(`❌ Error processing request ${request.id}:`, requestError);
        errorCount++;
      }

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n=== BATCH PROCESS COMPLETED ===`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📊 Total processed: ${successCount + errorCount}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Batch auto-quote process completed`,
      processed: {
        dakkapel: successCount,
        errors: errorCount,
        total: successCount + errorCount
      },
      details: {
        totalRequests: allRequests.length,
        newRequests: newRequests.length,
        successfulEmails: successCount,
        failedEmails: errorCount
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("=== CRITICAL ERROR ===", error);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Critical error: ${error.message}`,
        stack: error.stack
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
