
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const whatsappApiKey = Deno.env.get("WHATSAPP_API_KEY");
const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendWhatsAppRequest {
  requestId: string;
  type: 'configurator' | 'zonnepaneel';
  customMessage?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing WhatsApp quote request...");

    if (!whatsappApiKey || !whatsappPhoneNumberId) {
      console.error("WhatsApp credentials not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "WhatsApp service niet geconfigureerd. Voeg WHATSAPP_API_KEY en WHATSAPP_PHONE_NUMBER_ID toe aan Supabase secrets." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const requestBody = await req.json();
    const { requestId, type, customMessage }: SendWhatsAppRequest = requestBody;
    
    if (!requestId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing requestId in request" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing Supabase configuration" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Determine table based on type
    const table = type === 'zonnepaneel' ? 'refurbished_zonnepanelen' : 'dakkapel_calculator_aanvragen';

    // Fetch data
    const { data: requestData, error } = await supabaseClient
      .from(table)
      .select('*')
      .eq('id', requestId)
      .single();
    
    if (error || !requestData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Aanvraag niet gevonden in database' 
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!requestData.telefoon) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Geen telefoonnummer gevonden voor deze aanvraag' 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format phone number for WhatsApp (remove spaces, dashes, add country code if needed)
    let phoneNumber = requestData.telefoon.replace(/[\s\-\+\(\)]/g, '');
    if (phoneNumber.startsWith('06')) {
      phoneNumber = '31' + phoneNumber.substring(1);
    } else if (phoneNumber.startsWith('6')) {
      phoneNumber = '31' + phoneNumber;
    } else if (!phoneNumber.startsWith('31')) {
      phoneNumber = '31' + phoneNumber;
    }

    // Create message content
    const customerName = requestData.naam;
    const priceInfo = requestData.totaal_prijs ? 
      `€${requestData.totaal_prijs.toLocaleString('nl-NL')}` : 
      'Prijs wordt na inspectie bepaald';

    let productInfo = '';
    if (type === 'zonnepaneel') {
      productInfo = `🔸 *Zonnepanelen Offerte*
📊 Aantal panelen: ${requestData.aantal_panelen}
⚡ Vermogen: ${requestData.vermogen}W
🏷️ Merk: ${requestData.merk}
🏠 Dak type: ${requestData.dak_type}`;
    } else {
      productInfo = `🔸 *Dakkapel Offerte*
📐 Model: ${requestData.model}
📏 Breedte: ${requestData.breedte}cm
🏗️ Materiaal: ${requestData.materiaal}
🎨 Kleur kozijn: ${requestData.kleur_kozijn}`;
    }

    const messageText = `Hallo ${customerName}! 👋

${customMessage || `Hartelijk dank voor uw interesse in onze ${type === 'zonnepaneel' ? 'zonnepanelen' : 'dakkapel'}. Hierbij ontvangt u uw persoonlijke offerte.`}

${productInfo}

💰 *Totaalprijs: ${priceInfo}*
${requestData.totaal_prijs ? '(Inclusief BTW en montage)' : ''}

📍 *Uw adres:*
${requestData.adres}, ${requestData.postcode} ${requestData.plaats}

✅ *Inbegrepen:*
• Transport naar locatie
• Professionele montage
• ${type === 'zonnepaneel' ? '5 jaar garantie op panelen, 2 jaar op montage' : '10 jaar garantie op constructie en waterdichtheid'}

⏰ *Deze offerte is 30 dagen geldig*

Heeft u interesse om door te gaan? Reageer dan op dit bericht of bel ons op 085 4444 255.

Met vriendelijke groet,
Gerard Groeneveld
Refurbish Totaal Nederland

📧 info@refurbishtotaalnederland.nl
🌐 www.refurbishtotaalnederland.nl`;

    // Send WhatsApp message
    const whatsappResponse = await fetch(`https://graph.facebook.com/v18.0/${whatsappPhoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: messageText
        }
      })
    });

    const whatsappResult = await whatsappResponse.json();

    if (!whatsappResponse.ok) {
      console.error("WhatsApp API error:", whatsappResult);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `WhatsApp verzending mislukt: ${whatsappResult.error?.message || 'Onbekende fout'}` 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("WhatsApp message sent successfully:", whatsappResult);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'WhatsApp offerte succesvol verzonden',
      messageId: whatsappResult.messages?.[0]?.id,
      sentTo: phoneNumber,
      note: 'WhatsApp bericht verzonden via Meta Business API'
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Unexpected error in send-quote-whatsapp function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Onverwachte fout: ${error.message || 'Onbekende fout'}` 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
