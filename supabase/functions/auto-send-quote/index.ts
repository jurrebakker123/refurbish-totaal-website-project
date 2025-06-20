
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from 'npm:resend@2.0.0';

console.log("=== AUTO-SEND-QUOTE FUNCTION STARTED ===");

console.log("Environment check:");
console.log("RESEND_API_KEY configured:", !!Deno.env.get('RESEND_API_KEY'));

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== NEW AUTO-QUOTE REQUEST ===");
  console.log("Request method:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("Initializing Resend client...");
  
  try {
    console.log("Parsing request body...");
    const { requestId, type } = await req.json();
    console.log("Request body received:", { requestId, type });

    console.log("Processing auto-quote for:", { requestId, type });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log("Supabase URL:", supabaseUrl);
    console.log("Supabase Key configured:", !!supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase configuration");
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Missing Supabase configuration" 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fetch request data based on type
    let requestData;
    const tableName = type === 'dakkapel' ? 'dakkapel_calculator_aanvragen' : 'refurbished_zonnepanelen';
    
    console.log(`Fetching data from table: ${tableName} for ID: ${requestId}`);
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', requestId)
      .single();

    if (error || !data) {
      console.error("Failed to fetch request data:", error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Request not found" 
      }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    requestData = data;
    console.log("Request data found for:", { 
      naam: type === 'dakkapel' ? `${requestData.voornaam} ${requestData.achternaam}` : requestData.naam,
      email: type === 'dakkapel' ? requestData.emailadres : requestData.email,
      id: requestData.id
    });

    // Prepare email content
    const customerName = type === 'dakkapel' ? `${requestData.voornaam} ${requestData.achternaam}`.trim() : requestData.naam;
    const customerEmail = type === 'dakkapel' ? requestData.emailadres : requestData.email;
    
    console.log("Preparing email content for:", customerEmail);

    // Create comprehensive email content
    const emailSubject = type === 'dakkapel' ? 
      "🏠 Uw Dakkapel Offerte van Refurbish Totaal Nederland" : 
      "☀️ Uw Zonnepanelen Offerte van Refurbish Totaal Nederland";

    const emailHtml = type === 'dakkapel' ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🏠 Dakkapel Offerte</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Refurbish Totaal Nederland</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #1f2937; margin-bottom: 20px;">Beste ${customerName},</p>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
            Hartelijk dank voor uw interesse in onze dakkapellen! Wij hebben uw configuratie ontvangen en zijn verheugd u hierbij een offerte te kunnen aanbieden.
          </p>

          <div style="background: white; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">📋 Uw Dakkapel Configuratie:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Type:</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${requestData.type}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Breedte:</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${requestData.breedte} cm</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Materiaal:</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${requestData.materiaal}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Dakhelling:</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${requestData.dakhellingtype}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Locatie:</td><td style="padding: 8px 0;">${requestData.plaats}, ${requestData.postcode}</td></tr>
            </table>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #065f46; margin-top: 0;">✅ Inbegrepen in de prijs:</h3>
            <ul style="color: #047857; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Complete levering en montage van de dakkapel</li>
              <li>Hoogwaardige materialen (${requestData.materiaal})</li>
              <li>Professionele afwerking binnen- en buitenzijde</li>
              <li>10 jaar garantie op constructie en waterdichtheid</li>
              <li>5 jaar garantie op gebruikte materialen</li>
              <li>Vergunningaanvraag (indien nodig)</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 15px;">📞 <strong>Bel direct voor een persoonlijk gesprek:</strong></p>
            <a href="tel:0851301578" style="display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px;">085-1301578</a>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
            <p style="color: #92400e; margin: 0; font-weight: bold;">⏰ Levertijd: 6-8 weken na definitieve opdracht</p>
          </div>

          <p style="color: #4b5563; line-height: 1.6; margin: 20px 0;">
            Heeft u vragen over deze offerte of wilt u aanpassingen bespreken? Neem gerust contact met ons op. 
            Wij staan klaar om u te helpen bij de realisatie van uw dakkapel!
          </p>

          <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px; border: 2px solid #10b981;">
            <p style="margin: 0; font-size: 18px; color: #1f2937;"><strong>Met vriendelijke groet,</strong></p>
            <p style="margin: 5px 0; font-size: 20px; color: #10b981; font-weight: bold;">Het team van Refurbish Totaal Nederland</p>
            <div style="margin-top: 15px;">
              <p style="margin: 5px 0; color: #4b5563;">📧 info@refurbishtotaalnederland.nl</p>
              <p style="margin: 5px 0; color: #4b5563;">📞 085-1301578</p>
              <p style="margin: 5px 0; color: #4b5563;">🌐 www.refurbishtotaalnederland.nl</p>
            </div>
          </div>
        </div>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">☀️ Zonnepanelen Offerte</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Refurbish Totaal Nederland</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #1f2937; margin-bottom: 20px;">Beste ${customerName},</p>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
            Hartelijk dank voor uw interesse in onze refurbished zonnepanelen! Wij hebben uw aanvraag ontvangen.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 15px;">📞 <strong>Bel direct voor een persoonlijk gesprek:</strong></p>
            <a href="tel:0851301578" style="display: inline-block; background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px;">085-1301578</a>
          </div>

          <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px; border: 2px solid #f59e0b;">
            <p style="margin: 0; font-size: 18px; color: #1f2937;"><strong>Met vriendelijke groet,</strong></p>
            <p style="margin: 5px 0; font-size: 20px; color: #f59e0b; font-weight: bold;">Het team van Refurbish Totaal Nederland</p>
            <div style="margin-top: 15px;">
              <p style="margin: 5px 0; color: #4b5563;">📧 info@refurbishtotaalnederland.nl</p>
              <p style="margin: 5px 0; color: #4b5563;">📞 085-1301578</p>
              <p style="margin: 5px 0; color: #4b5563;">🌐 www.refurbishtotaalnederland.nl</p>
            </div>
          </div>
        </div>
      </div>
    `;

    console.log("Sending automatic quote email to:", customerEmail);
    
    // Check if RESEND_API_KEY is configured
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Email service not configured" 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log("Using Resend API with key: ***configured***");

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
      to: [customerEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("✅ Resend API response:", emailResponse);

    if (emailResponse.error) {
      console.error("❌ Resend API error:", emailResponse.error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Email sending failed: ${emailResponse.error.message}` 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log("✅ Email sent successfully! Email ID:", emailResponse.data?.id);

    // Update the database to mark the quote as sent
    console.log("Updating database status...");
    const updateResult = await supabase
      .from(tableName)
      .update({ 
        status: 'offerte_verzonden',
        offerte_verzonden_op: new Date().toISOString()
      })
      .eq('id', requestId);

    if (updateResult.error) {
      console.error("Database update error:", updateResult.error);
    } else {
      console.log("✅ Database status updated successfully");
    }

    console.log("=== AUTO-QUOTE PROCESS COMPLETED SUCCESSFULLY ===");

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Auto-quote email sent successfully",
      emailId: emailResponse.data?.id
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("=== CRITICAL ERROR IN AUTO-SEND-QUOTE ===", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: `Auto-quote error: ${error.message}` 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

serve(handler);
