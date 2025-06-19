
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
    
    // Get request body 
    let requestBody = null;
    try {
      requestBody = await req.json();
      console.log("📨 Request body:", requestBody);
    } catch (e) {
      console.log("ℹ️ No request body provided, checking for all new requests");
    }

    let dakkapelRequests = [];
    
    if (requestBody?.requestId) {
      // Direct request for specific ID - get immediately
      console.log("🎯 Processing specific request ID:", requestBody.requestId);
      
      const { data: specificRequest, error: specificError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('*')
        .eq('id', requestBody.requestId)
        .single();

      if (!specificError && specificRequest) {
        dakkapelRequests = [specificRequest];
        console.log("✅ Found specific request:", specificRequest.id);
      } else {
        console.log("❌ Specific request not found:", specificError);
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Request ${requestBody.requestId} not found`,
        }), {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
    } else {
      // Check for new requests in last 24 hours
      console.log("🔍 Checking for new dakkapel requests...");
      
      const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      console.log("Looking for requests after:", cutoffTime);

      const { data: allRequests, error: dakkapelError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('*')
        .eq('status', 'nieuw')
        .is('offerte_verzonden_op', null)
        .gte('created_at', cutoffTime)
        .order('created_at', { ascending: false });

      if (!dakkapelError && allRequests) {
        dakkapelRequests = allRequests;
      }
    }

    console.log(`📊 Found ${dakkapelRequests.length} requests to process`);
    
    if (dakkapelRequests.length === 0) {
      console.log("ℹ️ No new dakkapel requests found");
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No new requests found',
        processed: 0
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    let successCount = 0;
    let errorCount = 0;

    for (const request of dakkapelRequests) {
      console.log(`\n🔄 Processing request ${request.id}`);
      console.log(`👤 Customer: ${request.voornaam} ${request.achternaam}`);
      console.log(`📧 Email: ${request.emailadres}`);

      try {
        const customerName = `${request.voornaam} ${request.achternaam}`;
        const customerAddress = `${request.straatnaam} ${request.huisnummer}, ${request.postcode} ${request.plaats}`;

        // Calculate total price based on configuration
        let totalPrice = 15000; // Base price
        
        // Add pricing based on configuration
        if (request.breedte > 300) totalPrice += 2000;
        if (request.hoogte > 175) totalPrice += 1500;
        if (request.materiaal === 'hout') totalPrice += 3000;
        if (request.materiaal === 'aluminium') totalPrice += 4000;
        if (request.aantalramen > 2) totalPrice += (request.aantalramen - 2) * 800;
        
        // Add options pricing
        if (request.opties) {
          if (request.opties.ventilatie) totalPrice += 500;
          if (request.opties.zonwering) totalPrice += 1200;
          if (request.opties.extra_isolatie) totalPrice += 800;
          if (request.opties.horren) totalPrice += 400;
        }

        console.log(`💰 Calculated price: €${totalPrice.toLocaleString('nl-NL')}`);

        const emailTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <div style="background-color: #059669; color: white; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Uw Dakkapel Offerte</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">Refurbish Totaal Nederland</p>
  </div>
  
  <div style="padding: 30px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Beste ${customerName},</p>
    
    <p style="line-height: 1.6; margin-bottom: 20px;">
      Hartelijk dank voor uw interesse in onze dakkapellen. Hierbij ontvangt u uw persoonlijke offerte 
      op basis van uw configuratie.
    </p>
    
    <div style="background-color: #f0fdf4; border: 2px solid #059669; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <h2 style="color: #059669; margin: 0 0 10px 0;">Totaalprijs: €${totalPrice.toLocaleString('nl-NL')}</h2>
      <p style="margin: 0; color: #065f46;">Inclusief BTW, transport en montage</p>
    </div>
    
    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #374151;">Uw Dakkapel Configuratie:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li><strong>Type:</strong> ${request.type}</li>
        <li><strong>Afmetingen:</strong> ${request.breedte}cm x ${request.hoogte}cm</li>
        <li><strong>Materiaal:</strong> ${request.materiaal}</li>
        <li><strong>Aantal ramen:</strong> ${request.aantalramen}</li>
        <li><strong>Kozijn hoogte:</strong> ${request.kozijnhoogte}</li>
        <li><strong>Dakhelling:</strong> ${request.dakhelling}°</li>
        <li><strong>Kleur kozijnen:</strong> ${request.kleurkozijnen}</li>
        <li><strong>Kleur zijkanten:</strong> ${request.kleurzijkanten}</li>
        <li><strong>RC-waarde:</strong> ${request.rcwaarde}</li>
        <li><strong>Woning zijde:</strong> ${request.woningzijde}</li>
      </ul>
    </div>

    <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #059669;">Inbegrepen:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #065f46;">
        <li>Transport naar locatie</li>
        <li>Montage van de dakkapel</li>
        <li>Afwerking binnen- en buitenzijde</li>
        <li>10 jaar garantie op constructie en waterdichtheid</li>
        <li>5 jaar garantie op de gebruikte materialen</li>
      </ul>
    </div>

    <div style="background-color: #fff3cd; border: 2px solid #ffeaa7; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
      <h3 style="color: #856404; margin-top: 0; font-size: 18px;">Heeft u interesse om door te gaan?</h3>
      <p style="color: #856404; margin: 15px 0;">Klik op één van onderstaande knoppen:</p>
      <div style="margin: 25px 0;">
        <a href="https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/handle-interest-response?id=${request.id}&response=ja&type=dakkapel" 
           style="display: inline-block; background-color: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px;">
          ✓ JA, IK HEB INTERESSE
        </a>
        <br><br>
        <a href="https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/handle-interest-response?id=${request.id}&response=nee&type=dakkapel" 
           style="display: inline-block; background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px;">
          ✗ NEE, GEEN INTERESSE
        </a>
      </div>
    </div>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <p style="margin: 0;"><strong>Uw adresgegevens:</strong><br>
      ${customerAddress}</p>
    </div>
    
    <p style="line-height: 1.6; margin: 20px 0;">
      <strong>Levertijd:</strong> 6-8 weken na definitieve opdracht<br>
      <strong>Geldigheid offerte:</strong> 30 dagen
    </p>
    
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
          subject: `Uw Dakkapel Offerte - €${totalPrice.toLocaleString('nl-NL')}`,
          html: emailTemplate,
        });

        console.log("📬 Resend response:", emailResponse);

        if (emailResponse.error) {
          console.error(`❌ Email error for ${request.id}:`, emailResponse.error);
          errorCount++;
          continue;
        }

        console.log(`✅ Email sent successfully! ID: ${emailResponse.data?.id}`);

        // Update database
        const { error: updateError } = await supabase
          .from('dakkapel_calculator_aanvragen')
          .update({
            status: 'offerte_verzonden',
            offerte_verzonden_op: new Date().toISOString(),
            totaal_prijs: totalPrice,
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
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n=== PROCESSING COMPLETED ===`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Processed ${successCount + errorCount} requests. Sent ${successCount} emails.`,
      processed: {
        total: successCount + errorCount,
        successful: successCount,
        errors: errorCount
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
