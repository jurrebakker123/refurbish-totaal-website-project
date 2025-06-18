
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend@2.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const whatsappApiKey = Deno.env.get("WHATSAPP_API_KEY");
const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");

console.log("Starting auto-send-quote function");

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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing auto quote request...");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service not configured" 
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resend = new Resend(resendApiKey);
    const requestBody = await req.json();
    const { requestId, type }: AutoQuoteRequest = requestBody;
    
    if (!requestId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing requestId" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing Supabase configuration" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Determine table based on type
    const table = type === 'zonnepaneel' ? 'refurbished_zonnepanelen' : 
                  type === 'dakkapel' && requestId.includes('calc') ? 'dakkapel_calculator_aanvragen' :
                  'dakkapel_configuraties';

    console.log("Fetching data for ID:", requestId, "from table:", table);
    
    const { data: requestData, error } = await supabaseClient
      .from(table)
      .select('*')
      .eq('id', requestId)
      .single();
    
    if (error || !requestData) {
      console.error("Error fetching data:", error);
      return new Response(
        JSON.stringify({ success: false, error: 'Aanvraag niet gevonden' }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Request data found:", { naam: requestData.naam || requestData.voornaam, email: requestData.email || requestData.emailadres });

    const customerEmail = requestData.email || requestData.emailadres;
    const customerName = requestData.naam || `${requestData.voornaam} ${requestData.achternaam}`;
    const customerPhone = requestData.telefoon;

    if (!customerEmail) {
      return new Response(
        JSON.stringify({ success: false, error: 'Geen email adres gevonden' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate quote content based on type
    let productDetails = '';
    let defaultTemplate = '';
    
    if (type === 'zonnepaneel') {
      defaultTemplate = `Beste ${customerName},

Hartelijk dank voor uw interesse in onze refurbished zonnepanelen. Wij zijn verheugd u hierbij een offerte te kunnen aanbieden voor het leveren en monteren van zonnepanelen volgens uw specificaties.

De prijs is inclusief:
- Transport naar locatie  
- Montage van de zonnepanelen
- Bekabeling en aansluiting
- Garantie van 5 jaar op de refurbished panelen
- 2 jaar garantie op de montage

Wij hanteren een levertijd van 4-6 weken na definitieve opdracht.

Voor vragen of aanpassingen aan deze offerte kunt u altijd contact met ons opnemen.

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

Hartelijk dank voor uw interesse in onze dakkapellen. Wij zijn verheugd u hierbij een offerte te kunnen aanbieden voor het leveren en monteren van een dakkapel volgens uw specificaties.

De prijs is inclusief:
- Transport naar locatie
- Montage van de dakkapel
- Afwerking binnen- en buitenzijde
- Garantie van 10 jaar op constructie en waterdichtheid
- 5 jaar garantie op de gebruikte materialen

Wij hanteren een levertijd van 6-8 weken na definitieve opdracht.

Voor vragen of aanpassingen aan deze offerte kunt u altijd contact met ons opnemen.

Met vriendelijke groet,

Het team van Refurbish Totaal Nederland
085-1301578
info@refurbishtotaalnederland.nl`;

      if (table === 'dakkapel_calculator_aanvragen') {
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
      } else {
        productDetails = `
          <h3>Uw Dakkapel Configuratie:</h3>
          <ul>
            <li><strong>Model:</strong> ${requestData.model}</li>
            <li><strong>Breedte:</strong> ${requestData.breedte}cm</li>
            <li><strong>Materiaal:</strong> ${requestData.materiaal}</li>
            <li><strong>Kleur kozijn:</strong> ${requestData.kleur_kozijn}</li>
            <li><strong>Kleur zijkanten:</strong> ${requestData.kleur_zijkanten}</li>
            <li><strong>Kleur draaikiepramen:</strong> ${requestData.kleur_draaikiepramen}</li>
            ${requestData.dakhelling ? `<li><strong>Dakhelling:</strong> ${requestData.dakhelling}° (${requestData.dakhelling_type})</li>` : ''}
          </ul>
        `;
      }
    }

    const customerAddress = table === 'dakkapel_calculator_aanvragen' ? 
      `${requestData.straatnaam} ${requestData.huisnummer}, ${requestData.postcode} ${requestData.plaats}` :
      `${requestData.adres}, ${requestData.postcode} ${requestData.plaats}`;

    const priceInfo = requestData.totaal_prijs ? 
      `<p style="font-size: 18px; font-weight: bold; color: #2563eb;">Totaalprijs: €${requestData.totaal_prijs.toLocaleString('nl-NL')}</p>` : 
      '<p>Prijs wordt binnenkort meegedeeld.</p>';

    // Create interest response URLs
    const baseUrl = supabaseUrl.replace('/rest/v1', '');
    const yesUrl = `${baseUrl}/functions/v1/handle-interest-response?id=${requestId}&response=ja&type=${type}`;
    const noUrl = `${baseUrl}/functions/v1/handle-interest-response?id=${requestId}&response=nee&type=${type}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
          <h1>Offerte ${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'} - Refurbish Totaal Nederland</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <div style="white-space: pre-line;">${defaultTemplate.replace(/\n/g, '<br/>')}</div>
          
          <div style="background-color: #fff3cd; border: 2px solid #ffeaa7; padding: 25px; border-radius: 10px; margin: 25px 0; text-align: center;">
            <h3 style="color: #856404; margin-top: 0; font-size: 18px;">Heeft u daadwerkelijk interesse om door te gaan?</h3>
            <p style="color: #856404; margin: 15px 0;">Klik op één van de onderstaande knoppen om uw interesse te bevestigen:</p>
            <div style="margin: 25px 0;">
              <a href="${yesUrl}" style="display: inline-block; background-color: #059669; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px;">✓ JA, IK HEB INTERESSE</a>
              <br><br>
              <a href="${noUrl}" style="display: inline-block; background-color: #dc3545; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px;">✗ NEE, GEEN INTERESSE</a>
            </div>
            <p style="font-size: 14px; color: #856404; margin-bottom: 0;">Deze knoppen werken direct vanuit uw email.</p>
          </div>
          
          ${productDetails}
          
          <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            ${priceInfo}
          </div>
          
          <p><strong>Uw adresgegevens:</strong><br>
          ${customerAddress}</p>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact:</h3>
            <p>
              <strong>Refurbish Totaal Nederland</strong><br>
              E-mail: info@refurbishtotaalnederland.nl<br>
              Telefoon: +31 85 4444 255
            </p>
          </div>
        </div>
        
        <div style="background-color: #059669; color: white; padding: 10px; text-align: center; font-size: 12px;">
          <p>© 2024 Refurbish Totaal Nederland</p>
        </div>
      </div>
    `;

    // Send email
    console.log("Sending automatic quote email to:", customerEmail);
    const emailResponse = await resend.emails.send({
      from: 'Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>',
      to: [customerEmail],
      subject: `Automatische Offerte ${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'} - ${type === 'zonnepaneel' ? requestData.merk : (requestData.model || requestData.type)}`,
      html: emailHtml,
    });

    let whatsappSent = false;
    
    // Send WhatsApp message if API keys are configured and phone number is available
    if (whatsappApiKey && whatsappPhoneNumberId && customerPhone) {
      try {
        console.log("Sending WhatsApp message to:", customerPhone);
        
        // Clean phone number (remove spaces, dashes, etc.)
        const cleanPhone = customerPhone.replace(/[\s\-\(\)]/g, '');
        const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone.substring(1) : cleanPhone;
        
        const whatsappMessage = `🏠 *Offerte ${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'}*

Beste ${customerName},

Hartelijk dank voor uw aanvraag! We hebben automatisch een offerte verstuurd naar uw email: ${customerEmail}

${type === 'zonnepaneel' ? 
  `🔋 *Zonnepanelen Details:*
• Aantal: ${requestData.aantal_panelen} panelen
• Vermogen: ${requestData.vermogen}W
• Merk: ${requestData.merk}` :
  table === 'dakkapel_calculator_aanvragen' ?
  `🏠 *Dakkapel Details:*
• Type: ${requestData.type}
• Afmetingen: ${requestData.breedte}cm x ${requestData.hoogte}cm
• Materiaal: ${requestData.materiaal}` :
  `🏠 *Dakkapel Details:*
• Model: ${requestData.model}
• Breedte: ${requestData.breedte}cm
• Materiaal: ${requestData.materiaal}`
}

${requestData.totaal_prijs ? `💰 *Totaalprijs: €${requestData.totaal_prijs.toLocaleString('nl-NL')}*` : '💰 *Prijs wordt binnenkort meegedeeld*'}

📧 Controleer uw email voor de volledige offerte met alle details en de mogelijkheid om uw interesse te bevestigen.

Heeft u vragen? Bel ons op 085-1301578 of stuur een WhatsApp bericht terug!

Met vriendelijke groet,
Refurbish Totaal Nederland`;

        const whatsappResponse = await fetch(`https://graph.facebook.com/v17.0/${whatsappPhoneNumberId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${whatsappApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: formattedPhone,
            type: 'text',
            text: {
              body: whatsappMessage
            }
          })
        });

        if (whatsappResponse.ok) {
          whatsappSent = true;
          console.log("WhatsApp message sent successfully");
        } else {
          const errorText = await whatsappResponse.text();
          console.error("WhatsApp API error:", errorText);
        }
      } catch (whatsappError) {
        console.error("WhatsApp sending failed:", whatsappError);
      }
    }

    if (emailResponse.error) {
      console.error("Email sending failed:", emailResponse.error);
      return new Response(
        JSON.stringify({ success: false, error: `Email sending failed: ${emailResponse.error.message}` }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update status in database
    const { error: updateError } = await supabaseClient
      .from(table)
      .update({
        status: 'offerte_verzonden',
        offerte_verzonden_op: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (updateError) {
      console.error('Error updating status:', updateError);
    }

    console.log("Automatic quote sent successfully!");

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Automatische offerte succesvol verzonden',
      emailSent: true,
      whatsappSent,
      emailId: emailResponse.data?.id,
      sentTo: customerEmail,
      phone: customerPhone
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("Unexpected error in auto-send-quote function:", error);
    return new Response(
      JSON.stringify({ success: false, error: `Onverwachte fout: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
