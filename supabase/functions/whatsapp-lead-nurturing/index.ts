
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const whatsappApiKey = Deno.env.get("WHATSAPP_API_KEY");
const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppMessage {
  from: string;
  body: string;
  timestamp: string;
}

interface LeadNurturingRequest {
  leadId: string;
  phoneNumber: string;
  customerName: string;
  step: 'initial' | 'service_choice' | 'stucwerk_details' | 'schilderwerk_details' | 'appointment_booking';
  userResponse?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing WhatsApp lead nurturing request...");

    if (!whatsappApiKey || !whatsappPhoneNumberId) {
      console.error("WhatsApp credentials not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "WhatsApp service niet geconfigureerd" 
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing Supabase configuration" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle incoming WhatsApp webhook (for user responses)
    if (req.method === "POST" && req.url.includes('/webhook')) {
      const webhookData = await req.json();
      
      if (webhookData.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
        const message = webhookData.entry[0].changes[0].value.messages[0];
        const phoneNumber = message.from;
        const messageBody = message.text?.body || '';
        
        // Process user response and determine next step
        await processUserResponse(supabase, phoneNumber, messageBody);
      }
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Handle lead nurturing trigger
    const requestBody = await req.json();
    const { leadId, phoneNumber, customerName, step, userResponse }: LeadNurturingRequest = requestBody;

    let messageText = '';
    let nextStep = '';

    switch (step) {
      case 'initial':
        messageText = `🎨 Hallo ${customerName}, bedankt voor je aanvraag bij Refurbish Totaal Nederland!

Wat wil je graag laten doen?

Reageer met:
1️⃣ voor stucwerk
2️⃣ voor schilderwerk  
3️⃣ voor beide

Dan stuur ik je direct een paar voorbeeldprojecten + een eerste prijsindicatie.`;
        nextStep = 'service_choice';
        break;

      case 'service_choice':
        if (userResponse === '1') {
          messageText = `🏠 Perfect! Stucwerk is onze specialiteit.

Om je een accurate prijsindicatie te geven heb ik wat meer info nodig:

📐 Hoeveel m² moet er worden gestuckt?
🎨 Welk type stucwerk wil je?
   - Glad stucwerk
   - Spachtelputz  
   - Decoratief stucwerk

Stuur bijvoorbeeld: "25 m² glad stucwerk"`;
          nextStep = 'stucwerk_details';
        } else if (userResponse === '2') {
          messageText = `🎨 Uitstekende keuze! Schilderwerk maken we prachtig.

Voor een goede prijsindicatie:

📐 Hoeveel m² moet er geschilderd worden?
🏠 Is het binnen- of buitenwerk?
🎨 Welke kleur(en) heb je in gedachten?

Stuur bijvoorbeeld: "40 m² binnenschilderwerk, wit"`;
          nextStep = 'schilderwerk_details';
        } else if (userResponse === '3') {
          messageText = `🏠🎨 Helemaal compleet! Stuc- én schilderwerk.

Voor beide diensten heb ik wat info nodig:

📐 Hoeveel m² stucwerk en schilderwerk?
🎨 Type stucwerk (glad/spachtelputz/decoratief)?
🏠 Schilderwerk binnen of buiten?

Stuur bijvoorbeeld: "30 m² stucwerk glad, 50 m² schilderwerk binnen"`;
          nextStep = 'stucwerk_details';
        }
        break;

      case 'stucwerk_details':
        // Parse the response and provide pricing
        const basePriceStuc = extractSquareMeters(userResponse || '') * 35; // €35 per m²
        messageText = `💰 Prijsindicatie stucwerk:

📊 Geschatte kosten: €${basePriceStuc.toLocaleString()}
(Inclusief materiaal en arbeid)

✅ Inbegrepen:
• Professionele voorbereiding 
• Kwaliteitsmaterialen
• Vakkundige afwerking
• Opruimen werkplek

📅 Zullen we een vrijblijvende bezichtiging inplannen?

Reageer met JA voor een afspraak of stel een vraag!`;
        nextStep = 'appointment_booking';
        break;

      case 'schilderwerk_details':
        const basePriceSchilder = extractSquareMeters(userResponse || '') * 25; // €25 per m²
        messageText = `💰 Prijsindicatie schilderwerk:

📊 Geschatte kosten: €${basePriceSchilder.toLocaleString()}
(Inclusief materiaal, primer en 2 lagen)

✅ Inbegrepen:
• Kwaliteitsverf (bijv. Sigma, Sikkens)
• Professionele voorbereiding
• Netjes afplakken
• Opruimen werkplek

📅 Zullen we een vrijblijvende bezichtiging inplannen?

Reageer met JA voor een afspraak!`;
        nextStep = 'appointment_booking';
        break;

      case 'appointment_booking':
        if (userResponse?.toLowerCase().includes('ja')) {
          messageText = `📅 Geweldig! Laten we een afspraak inplannen.

🗓️ Wanneer komt het jou uit?
• Morgen tussen 10:00-16:00
• Overmorgen tussen 09:00-17:00  
• Zaterdag tussen 10:00-15:00

Of geef zelf een voorkeur door!

📞 Voor spoedgevallen kun je ook direct bellen: 085 4444 255`;
          nextStep = 'appointment_booking';
        }
        break;
    }

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
        text: { body: messageText }
      })
    });

    if (!whatsappResponse.ok) {
      const error = await whatsappResponse.json();
      console.error("WhatsApp API error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.error?.message || 'WhatsApp verzending mislukt' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update conversation state in database
    await supabase.from('whatsapp_conversations').upsert({
      lead_id: leadId,
      phone_number: phoneNumber,
      customer_name: customerName,
      current_step: nextStep,
      last_message: messageText,
      last_interaction: new Date().toISOString()
    });

    // Schedule follow-up reminders
    if (step === 'initial') {
      await scheduleFollowUp(supabase, leadId, phoneNumber, customerName, 2); // 2 days
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'WhatsApp bericht verzonden',
      nextStep: nextStep 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("Error in whatsapp-lead-nurturing:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

async function processUserResponse(supabase: any, phoneNumber: string, messageBody: string) {
  // Get current conversation state
  const { data: conversation } = await supabase
    .from('whatsapp_conversations')
    .select('*')
    .eq('phone_number', phoneNumber)
    .single();

  if (conversation) {
    // Continue the conversation based on current step
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/whatsapp-lead-nurturing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: conversation.lead_id,
        phoneNumber: phoneNumber,
        customerName: conversation.customer_name,
        step: conversation.current_step,
        userResponse: messageBody
      })
    });
  }
}

function extractSquareMeters(text: string): number {
  const match = text.match(/(\d+)\s*m²?/i);
  return match ? parseInt(match[1]) : 30; // Default to 30 m²
}

async function scheduleFollowUp(supabase: any, leadId: string, phoneNumber: string, customerName: string, days: number) {
  const followUpDate = new Date();
  followUpDate.setDate(followUpDate.getDate() + days);
  
  await supabase.from('whatsapp_follow_ups').insert({
    lead_id: leadId,
    phone_number: phoneNumber,
    customer_name: customerName,
    scheduled_for: followUpDate.toISOString(),
    reminder_type: days === 2 ? 'first_reminder' : 'second_reminder',
    status: 'scheduled'
  });
}

serve(handler);
