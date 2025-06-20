
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

console.log("=== DAKKAPEL WEBHOOK HANDLER STARTED ===");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== AUTOMATIC WEBHOOK REQUEST RECEIVED ===");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Environment setup
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY') || "re_Z8QG3U8T_LDwuuUYmbCvL2WTixAVzewhG";

    console.log("🔍 Environment variables check:");
    console.log("- SUPABASE_URL:", supabaseUrl ? "✅ Available" : "❌ Missing");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✅ Available" : "❌ Missing");
    console.log("- RESEND_API_KEY:", resendApiKey ? "✅ Available" : "❌ Missing");

    if (!supabaseUrl || !supabaseServiceKey) {
      const errorMsg = "Missing critical environment variables";
      console.error("❌", errorMsg);
      return new Response(JSON.stringify({ 
        success: false, 
        error: errorMsg 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);
    
    // Parse payload
    const payload = await req.json();
    console.log("📨 Received webhook payload:", JSON.stringify(payload, null, 2));

    const { event, requestId, automatic } = payload;

    // Validate event type
    if (event !== 'ConfiguratorComplete') {
      console.log("ℹ️ Not a ConfiguratorComplete event, ignoring");
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Event type not handled' 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Validate request ID
    if (!requestId) {
      console.error("❌ No requestId provided in payload");
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing requestId' 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log(`🎯 Processing AUTOMATIC ConfiguratorComplete for request: ${requestId}`);

    // Fetch request data from database
    console.log("📋 Fetching request data from database...");
    const { data: request, error: fetchError } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError) {
      console.error("❌ Database fetch error:", fetchError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Database error: ${fetchError.message}` 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    if (!request) {
      console.error("❌ Request not found in database");
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Request not found' 
      }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log("✅ Found request data:", {
      id: request.id,
      customer: `${request.voornaam} ${request.achternaam}`,
      email: request.emailadres,
      type: request.type,
      material: request.materiaal
    });

    // Calculate total price with null checks
    console.log("💰 Calculating price...");
    let totalPrice = 15000; // Base price
    
    // Size adjustments
    if (request.breedte && request.breedte > 300) {
      totalPrice += 2000;
      console.log(`+ €2000 for width > 300cm (${request.breedte}cm)`);
    }
    if (request.hoogte && request.hoogte > 175) {
      totalPrice += 1500;
      console.log(`+ €1500 for height > 175cm (${request.hoogte}cm)`);
    }
    
    // Material adjustments
    if (request.materiaal === 'hout') {
      totalPrice += 3000;
      console.log("+ €3000 for wood material");
    } else if (request.materiaal === 'aluminium') {
      totalPrice += 4000;
      console.log("+ €4000 for aluminum material");
    }
    
    // Window adjustments
    if (request.aantalramen && request.aantalramen > 2) {
      const extraWindows = request.aantalramen - 2;
      const extraCost = extraWindows * 800;
      totalPrice += extraCost;
      console.log(`+ €${extraCost} for ${extraWindows} extra windows`);
    }
    
    // Options adjustments
    if (request.opties && typeof request.opties === 'object') {
      if (request.opties.ventilatie) {
        totalPrice += 500;
        console.log("+ €500 for ventilation");
      }
      if (request.opties.zonwering) {
        totalPrice += 1200;
        console.log("+ €1200 for sun protection");
      }
      if (request.opties.extra_isolatie) {
        totalPrice += 800;
        console.log("+ €800 for extra insulation");
      }
      if (request.opties.horren) {
        totalPrice += 400;
        console.log("+ €400 for screens");
      }
      if (request.opties.kader_dakkapel) {
        totalPrice += 1140;
        console.log("+ €1140 for dormer frame");
      }
      if (request.opties.minirooftop) {
        totalPrice += 3178;
        console.log("+ €3178 for mini rooftop");
      }
      if (request.opties.dak_versteviging) {
        totalPrice += 400;
        console.log("+ €400 for roof reinforcement");
      }
    }

    console.log(`💰 Final calculated price: €${totalPrice.toLocaleString('nl-NL')}`);

    // Prepare email content
    const customerName = `${request.voornaam || ''} ${request.achternaam || ''}`.trim();
    const customerAddress = `${request.straatnaam || ''} ${request.huisnummer || ''}, ${request.postcode || ''} ${request.plaats || ''}`;

    const emailHtml = `
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
        <li><strong>Type:</strong> ${request.type || 'Niet opgegeven'}</li>
        <li><strong>Afmetingen:</strong> ${request.breedte || 0}cm x ${request.hoogte || 0}cm</li>
        <li><strong>Materiaal:</strong> ${request.materiaal || 'Niet opgegeven'}</li>
        <li><strong>Aantal ramen:</strong> ${request.aantalramen || 1}</li>
        <li><strong>Kozijn hoogte:</strong> ${request.kozijnhoogte || 'Standaard'}</li>
        <li><strong>Dakhelling:</strong> ${request.dakhelling || 45}°</li>
        <li><strong>Kleur kozijnen:</strong> ${request.kleurkozijnen || 'Wit'}</li>
        <li><strong>Kleur zijkanten:</strong> ${request.kleurzijkanten || 'Wit'}</li>
        <li><strong>RC-waarde:</strong> ${request.rcwaarde || 'Standaard'}</li>
        <li><strong>Woning zijde:</strong> ${request.woningzijde || 'Niet opgegeven'}</li>
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

    // Send email automatically
    console.log(`📧 SENDING AUTOMATIC EMAIL to: ${request.emailadres}`);
    
    const emailResponse = await resend.emails.send({
      from: 'Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>',
      to: [request.emailadres],
      subject: `🎉 Uw Dakkapel Offerte - €${totalPrice.toLocaleString('nl-NL')} (Automatisch)`,
      html: emailHtml,
    });

    console.log("📬 Email send response:", emailResponse);

    if (emailResponse.error) {
      console.error(`❌ Email sending failed:`, emailResponse.error);
      throw new Error(`Email failed: ${emailResponse.error.message || 'Unknown error'}`);
    }

    const emailId = emailResponse.data?.id;
    console.log(`✅ AUTOMATIC EMAIL SENT SUCCESSFULLY! Email ID: ${emailId}`);

    // Update database with success status
    console.log("💾 Updating database with sent status...");
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
      console.error(`❌ Database update failed:`, updateError);
      // Don't throw here - email was sent successfully
    } else {
      console.log(`✅ Database updated successfully for request ${request.id}`);
    }

    // Return success response
    console.log("🎉 AUTOMATIC WEBHOOK PROCESS COMPLETED SUCCESSFULLY!");
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Automatic email sent successfully',
      emailId: emailId,
      price: totalPrice,
      requestId: request.id,
      automatic: true
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("=== CRITICAL WEBHOOK ERROR ===", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: `Webhook failed: ${error.message}`,
      automatic: true
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

serve(handler);
