
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend@2.0.0";

console.log("=== AUTO-SEND-QUOTE FUNCTION STARTED ===");

const resendApiKey = Deno.env.get("RESEND_API_KEY");

console.log("Environment check:");
console.log("RESEND_API_KEY configured:", !!resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AutoQuoteRequest {
  requestId: string;
  type: 'dakkapel' | 'zonnepaneel';
}

const handler = async (req: Request): Promise<Response> => {
  console.log("=== NEW AUTO-QUOTE REQUEST ===");
  console.log("Request method:", req.method);
  
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!resendApiKey) {
      console.error("CRITICAL: RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service not configured - RESEND_API_KEY missing" 
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Initializing Resend client...");
    const resend = new Resend(resendApiKey);
    
    console.log("Parsing request body...");
    const requestBody = await req.json();
    console.log("Request body received:", requestBody);
    
    const { requestId, type }: AutoQuoteRequest = requestBody;
    
    if (!requestId) {
      console.error("Missing requestId in request");
      return new Response(
        JSON.stringify({ success: false, error: "Missing requestId" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    console.log("Processing auto-quote for:", { requestId, type });
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    console.log("Supabase URL:", supabaseUrl);
    console.log("Supabase Key configured:", !!supabaseKey);
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ success: false, error: "Missing Supabase configuration" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Determine table based on type
    const table = type === 'zonnepaneel' ? 'refurbished_zonnepanelen' : 'dakkapel_calculator_aanvragen';

    console.log("Fetching data from table:", table, "for ID:", requestId);
    
    const { data: requestData, error } = await supabaseClient
      .from(table)
      .select('*')
      .eq('id', requestId)
      .single();
    
    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ success: false, error: 'Database error', details: error }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!requestData) {
      console.error("No data found for requestId:", requestId);
      return new Response(
        JSON.stringify({ success: false, error: 'Aanvraag niet gevonden' }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Request data found for:", { 
      naam: requestData.naam || `${requestData.voornaam} ${requestData.achternaam}`, 
      email: requestData.email || requestData.emailadres,
      id: requestData.id 
    });

    const customerEmail = requestData.email || requestData.emailadres;
    const customerName = requestData.naam || `${requestData.voornaam} ${requestData.achternaam}`;

    if (!customerEmail) {
      console.error("No email address found for customer");
      return new Response(
        JSON.stringify({ success: false, error: 'Geen email adres gevonden' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Preparing email content for:", customerEmail);

    // Generate quote content based on type
    let productDetails = '';
    let defaultTemplate = '';
    
    if (type === 'zonnepaneel') {
      defaultTemplate = `Beste ${customerName},

Hartelijk dank voor uw interesse in onze refurbished zonnepanelen. Hierbij ontvangt u uw persoonlijke offerte.

De prijs is inclusief:
- Transport naar locatie  
- Montage van de zonnepanelen
- Bekabeling en aansluiting
- Garantie van 5 jaar op de refurbished panelen
- 2 jaar garantie op de montage

Wij hanteren een levertijd van 4-6 weken na definitieve opdracht.

Voor vragen kunt u contact met ons opnemen.

Met vriendelijke groet,
Het team van Refurbish Totaal Nederland
085-1301578
info@refurbishtotaalnederland.nl`;

      productDetails = `
        <h3>Uw Zonnepanelen Configuratie:</h3>
        <ul>
          <li><strong>Aantal panelen:</strong> ${requestData.aantal_panelen}</li>
          <li><strong>Vermogen:</strong> ${requestData.vermogen}W</li>
          <li><strong>Type paneel:</strong> ${requestData.type_paneel}</li>
          <li><strong>Merk:</strong> ${requestData.merk}</li>
          <li><strong>Conditie:</strong> ${requestData.conditie}</li>
          <li><strong>Dak type:</strong> ${requestData.dak_type}</li>
          ${requestData.dak_materiaal ? `<li><strong>Dak materiaal:</strong> ${requestData.dak_materiaal}</li>` : ''}
          ${requestData.schaduw_situatie ? `<li><strong>Schaduw situatie:</strong> ${requestData.schaduw_situatie}</li>` : ''}
        </ul>
      `;
    } else {
      defaultTemplate = `Beste ${customerName},

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

      productDetails = `
        <h3>Uw Dakkapel Configuratie:</h3>
        <ul>
          <li><strong>Type:</strong> ${requestData.type}</li>
          <li><strong>Afmetingen:</strong> ${requestData.breedte}cm x ${requestData.hoogte}cm</li>
          <li><strong>Materiaal:</strong> ${requestData.materiaal}</li>
          <li><strong>Aantal ramen:</strong> ${requestData.aantalramen}</li>
          <li><strong>Kozijn hoogte:</strong> ${requestData.kozijnhoogte}</li>
          <li><strong>Dakhelling:</strong> ${requestData.dakhelling}° (${requestData.dakhellingtype})</li>
          <li><strong>Kleur kozijnen:</strong> ${requestData.kleurkozijnen}</li>
          <li><strong>Kleur zijkanten:</strong> ${requestData.kleurzijkanten}</li>
          <li><strong>Kleur draaikiepramen:</strong> ${requestData.kleurdraaikiepramen}</li>
          <li><strong>RC-waarde:</strong> ${requestData.rcwaarde}</li>
          <li><strong>Woning zijde:</strong> ${requestData.woningzijde}</li>
        </ul>
      `;
    }

    const customerAddress = table === 'dakkapel_calculator_aanvragen' ? 
      `${requestData.straatnaam} ${requestData.huisnummer}, ${requestData.postcode} ${requestData.plaats}` :
      `${requestData.adres}, ${requestData.postcode} ${requestData.plaats}`;

    const priceInfo = requestData.totaal_prijs ? 
      `<p style="font-size: 20px; font-weight: bold; color: #059669; background-color: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">Totaalprijs: €${requestData.totaal_prijs.toLocaleString('nl-NL')}</p>` : 
      '<p>Prijs wordt binnenkort meegedeeld.</p>';

    // Create interest response URLs
    const baseUrl = supabaseUrl.replace('/rest/v1', '');
    const yesUrl = `${baseUrl}/functions/v1/handle-interest-response?id=${requestId}&response=ja&type=${type}`;
    const noUrl = `${baseUrl}/functions/v1/handle-interest-response?id=${requestId}&response=nee&type=${type}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #059669; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Uw Offerte - Refurbish Totaal Nederland</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'}</p>
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

    // Send email using Resend
    console.log("Sending automatic quote email to:", customerEmail);
    console.log("Using Resend API with key:", resendApiKey ? "***configured***" : "NOT CONFIGURED");
    
    try {
      const emailResponse = await resend.emails.send({
        from: 'Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>',
        to: [customerEmail],
        subject: `${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'} Offerte - Refurbish Totaal Nederland`,
        html: emailHtml,
      });

      console.log("✅ Resend API response:", emailResponse);

      if (emailResponse.error) {
        console.error("❌ Resend API error:", emailResponse.error);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Email sending failed: ${emailResponse.error.message}`,
            details: emailResponse.error 
          }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (!emailResponse.data || !emailResponse.data.id) {
        console.error("❌ No email ID returned from Resend");
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Email sending failed: No email ID returned" 
          }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log("✅ Email sent successfully! Email ID:", emailResponse.data.id);

      // Update status in database
      console.log("Updating database status...");
      const { error: updateError } = await supabaseClient
        .from(table)
        .update({
          status: 'offerte_verzonden',
          offerte_verzonden_op: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (updateError) {
        console.error('❌ Error updating database status:', updateError);
      } else {
        console.log('✅ Database status updated successfully');
      }

      console.log("=== AUTO-QUOTE PROCESS COMPLETED SUCCESSFULLY ===");

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Automatische offerte succesvol verzonden',
        emailId: emailResponse.data.id,
        sentTo: customerEmail
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });

    } catch (emailError: any) {
      console.error("=== EMAIL SENDING ERROR ===", emailError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Email verzenden mislukt: ${emailError.message}`
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

  } catch (error: any) {
    console.error("=== CRITICAL ERROR IN AUTO-SEND-QUOTE ===", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Onverwachte fout: ${error.message}`
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
