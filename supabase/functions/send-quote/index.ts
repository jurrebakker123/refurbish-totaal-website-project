
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend@2.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

// Meer uitgebreide logging
console.log("Starting send-quote function with RESEND_API_KEY:", resendApiKey ? "Present (not showing for security)" : "Missing");
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendQuoteRequest {
  requestId: string;
  type: 'configurator';
  customMessage?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured in Supabase secrets");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "RESEND_API_KEY is not configured in Supabase secrets" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!resend) {
      console.error("Failed to initialize Resend client");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to initialize Resend client" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { requestId, type, customMessage }: SendQuoteRequest = await req.json();
    
    console.log("Quote request received:", { requestId, type, messageLength: customMessage?.length || 0 });
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    console.log("Supabase URL and Key:", supabaseUrl ? "URL present" : "URL missing", supabaseKey ? "Key present" : "Key missing");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase credentials");
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // We gebruiken alleen 'configurator' type
    const tableName = 'dakkapel_configuraties';
    const { data, error } = await supabaseClient
      .from(tableName)
      .select('*')
      .eq('id', requestId)
      .single();
    
    if (error) {
      console.error("Error fetching configurator data:", error);
      throw error;
    }
    requestData = data;
    console.log("Configurator data fetched:", requestData ? "success" : "null");

    if (!requestData) {
      throw new Error('Aanvraag niet gevonden');
    }

    // Prepare email content
    const customerName = requestData.naam;
    const customerEmail = requestData.email;
    const customerAddress = `${requestData.adres}, ${requestData.postcode} ${requestData.plaats}`;

    // Create detailed product information
    const productDetails = `
      <h3>Uw Dakkapel Configuratie:</h3>
      <ul>
        <li><strong>Model:</strong> ${requestData.model}</li>
        <li><strong>Breedte:</strong> ${requestData.breedte}cm</li>
        <li><strong>Materiaal:</strong> ${requestData.materiaal}</li>
        <li><strong>Kleur kozijn:</strong> ${requestData.kleur_kozijn}</li>
        <li><strong>Kleur zijkanten:</strong> ${requestData.kleur_zijkanten}</li>
        <li><strong>Kleur draaikiepramen:</strong> ${requestData.kleur_draaikiepramen}</li>
        ${requestData.dakhelling ? `<li><strong>Dakhelling:</strong> ${requestData.dakhelling}° (${requestData.dakhelling_type})</li>` : ''}
        ${requestData.levertijd ? `<li><strong>Levertijd:</strong> ${requestData.levertijd}</li>` : ''}
      </ul>
      <h3>Extra Opties:</h3>
      <ul>
        <li>Ventilatierooster: ${requestData.ventilationgrids ? 'Ja' : 'Nee'}</li>
        <li>Zonwering: ${requestData.sunshade ? 'Ja' : 'Nee'}</li>
        <li>Insectenhorren: ${requestData.insectscreens ? 'Ja' : 'Nee'}</li>
        <li>Airconditioning: ${requestData.airconditioning ? 'Ja' : 'Nee'}</li>
      </ul>
    `;

    const priceInfo = requestData.totaal_prijs ? 
      `<p style="font-size: 18px; font-weight: bold; color: #2563eb;">Totaalprijs: €${requestData.totaal_prijs.toLocaleString('nl-NL')}</p>` : 
      '<p>Prijs wordt binnenkort meegedeeld.</p>';

    const customMessageHtml = customMessage ? 
      `<div style="margin: 20px 0; white-space: pre-line;">${customMessage.replace(/\n/g, '<br/>')}</div>` : '';

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
          <h1>Offerte Dakkapel - Refurbish Totaal Nederland</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          ${customMessageHtml}
          
          ${productDetails}
          
          <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            ${priceInfo}
          </div>
          
          <p><strong>Uw adresgegevens:</strong><br>
          ${customerAddress}</p>
          
          <p>Deze offerte is 30 dagen geldig. Heeft u vragen of wilt u de offerte bespreken? Neem dan gerust contact met ons op.</p>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact:</h3>
            <p>
              <strong>Refurbish Totaal Nederland</strong><br>
              E-mail: info@refurbishtotaalnederland.nl<br>
              Telefoon: 085-1301578
            </p>
          </div>
        </div>
        
        <div style="background-color: #059669; color: white; padding: 10px; text-align: center; font-size: 12px;">
          <p>© 2024 Refurbish Totaal Nederland - Specialist in dakkapellen</p>
        </div>
      </div>
    `;

    console.log("Preparing to send email to:", customerEmail);
    console.log("Email From: Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>");

    // Test met extra logging
    try {
      // Send email
      const emailResponse = await resend.emails.send({
        from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
        to: [customerEmail],
        subject: `Offerte Dakkapel - Refurbish Totaal Nederland`,
        html: emailHtml,
        reply_to: "info@refurbishtotaalnederland.nl",
      });

      console.log("Email response from Resend:", emailResponse);

      // Update the status in the database
      const { error: updateError } = await supabaseClient
        .from(tableName)
        .update({
          status: 'offerte_verzonden',
          offerte_verzonden_op: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (updateError) {
        console.error('Error updating status:', updateError);
        throw updateError;
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Offerte succesvol verzonden',
        emailResponse 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (emailError: any) {
      console.error("Specific error with email sending:", emailError);
      console.error("Email error details:", emailError.message, emailError.name);
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Email verzending mislukt: ${emailError.message}`,
        details: emailError
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
  } catch (error: any) {
    console.error("Error in send-quote function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
