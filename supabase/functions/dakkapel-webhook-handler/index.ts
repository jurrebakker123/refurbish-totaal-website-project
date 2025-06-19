
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

console.log("=== DAKKAPEL WEBHOOK HANDLER STARTED ===");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== WEBHOOK REQUEST RECEIVED ===");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = "re_Z8QG3U8T_LDwuuUYmbCvL2WTixAVzewhG"; // Direct API key

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
    
    // Get webhook payload
    const payload = await req.json();
    console.log("📨 Webhook payload:", JSON.stringify(payload, null, 2));

    const { event, requestId, customerData, configurationData, immediate } = payload;

    if (event !== 'ConfiguratorComplete') {
      console.log("ℹ️ Not a ConfiguratorComplete event, skipping");
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Event ignored' 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    if (!requestId) {
      console.error("❌ No requestId provided");
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Request ID is required' 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log("🎯 Processing ConfiguratorComplete event for request:", requestId);

    // Get full request data from database
    const { data: request, error: fetchError } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError || !request) {
      console.error("❌ Failed to fetch request:", fetchError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Request not found' 
      }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log("✅ Found request data:", request.id);
    console.log("📋 Request details:", {
      voornaam: request.voornaam,
      achternaam: request.achternaam,
      emailadres: request.emailadres,
      type: request.type,
      materiaal: request.materiaal
    });

    // Calculate price
    let totalPrice = 15000; // Base price
    
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

    // Generate email content
    const customerName = `${request.voornaam} ${request.achternaam}`;
    const customerAddress = `${request.straatnaam} ${request.huisnummer}, ${request.postcode} ${request.plaats}`;

    const emailTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <div style="background-color: #059669; color: white; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">🎉 Uw Dakkapel Offerte</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">Automatisch gegenereerd via onze configurator</p>
  </div>
  
  <div style="padding: 30px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Beste ${customerName},</p>
    
    <p style="line-height: 1.6; margin-bottom: 20px;">
      Hartelijk dank voor het gebruik van onze dakkapel configurator! Hierbij ontvangt u uw 
      <strong>automatisch gegenereerde offerte</strong> op basis van uw configuratie.
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
    
    <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="margin-top: 0; color: #1976d2;">🤖 Automatisch Gegenereerd</h3>
      <p style="margin-bottom: 0; color: #1565c0;">
        Deze offerte is automatisch gegenereerd door onze configurator.<br>
        Voor vragen of aanpassingen kunt u contact met ons opnemen.
      </p>
    </div>
  </div>
  
  <div style="background-color: #059669; color: white; padding: 20px; text-align: center; font-size: 14px;">
    <p style="margin: 0;">© 2024 Refurbish Totaal Nederland - Automatische Offerte Service</p>
  </div>
</div>
    `;

    // Send email via Resend
    console.log(`📧 Sending webhook-triggered email to: ${request.emailadres}`);

    const emailResponse = await resend.emails.send({
      from: 'Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>',
      to: [request.emailadres],
      subject: `🎉 Uw Dakkapel Offerte - €${totalPrice.toLocaleString('nl-NL')} (Automatisch)`,
      html: emailTemplate,
    });

    console.log("📬 Resend email response:", emailResponse);

    if (emailResponse.error) {
      console.error(`❌ Email error:`, emailResponse.error);
      throw emailResponse.error;
    }

    console.log(`✅ WEBHOOK EMAIL SENT SUCCESSFULLY! ID: ${emailResponse.data?.id}`);

    // Update database with sent status
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
      console.error(`❌ Database update error:`, updateError);
    } else {
      console.log(`✅ Database updated for request ${request.id}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Webhook processed successfully',
      emailId: emailResponse.data?.id,
      price: totalPrice,
      requestId: request.id
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("=== WEBHOOK ERROR ===", error);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ success: false, error: `Webhook error: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
