
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendQuoteRequest {
  requestId: string;
  type: 'calculator' | 'configurator';
  customMessage?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requestId, type, customMessage }: SendQuoteRequest = await req.json();
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get the request data based on type
    let requestData;
    let tableName;
    
    if (type === 'calculator') {
      tableName = 'dakkapel_calculator_aanvragen';
      const { data, error } = await supabaseClient
        .from('dakkapel_calculator_aanvragen')
        .select('*')
        .eq('id', requestId)
        .single();
      
      if (error) throw error;
      requestData = data;
    } else {
      tableName = 'dakkapel_configuraties';
      const { data, error } = await supabaseClient
        .from('dakkapel_configuraties')
        .select('*')
        .eq('id', requestId)
        .single();
      
      if (error) throw error;
      requestData = data;
    }

    if (!requestData) {
      throw new Error('Aanvraag niet gevonden');
    }

    // Prepare email content based on type
    const isCalculator = type === 'calculator';
    const customerName = isCalculator ? 
      `${requestData.voornaam} ${requestData.achternaam}` : 
      requestData.naam;
    const customerEmail = isCalculator ? requestData.emailadres : requestData.email;
    const customerAddress = isCalculator ? 
      `${requestData.straatnaam} ${requestData.huisnummer}, ${requestData.postcode} ${requestData.plaats}` :
      `${requestData.adres}, ${requestData.postcode} ${requestData.plaats}`;

    // Create detailed product information
    let productDetails = '';
    if (isCalculator) {
      productDetails = `
        <h3>Uw Dakkapel Specificaties:</h3>
        <ul>
          <li><strong>Type:</strong> ${requestData.type}</li>
          <li><strong>Afmetingen:</strong> ${requestData.breedte}cm x ${requestData.hoogte}cm</li>
          <li><strong>Materiaal:</strong> ${requestData.materiaal}</li>
          <li><strong>Aantal ramen:</strong> ${requestData.aantalramen}</li>
          <li><strong>Kozijnhoogte:</strong> ${requestData.kozijnhoogte}</li>
          <li><strong>Dakhelling:</strong> ${requestData.dakhelling}° (${requestData.dakhellingtype})</li>
          <li><strong>Kleur kozijnen:</strong> ${requestData.kleurkozijnen}</li>
          <li><strong>Kleur zijkanten:</strong> ${requestData.kleurzijkanten}</li>
          <li><strong>Kleur draaikiepramen:</strong> ${requestData.kleurdraaikiepramen}</li>
          <li><strong>RC-waarde:</strong> ${requestData.rcwaarde}</li>
          <li><strong>Woningzijde:</strong> ${requestData.woningzijde}</li>
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
    }

    const priceInfo = requestData.totaal_prijs ? 
      `<p style="font-size: 18px; font-weight: bold; color: #2563eb;">Totaalprijs: €${requestData.totaal_prijs.toLocaleString('nl-NL')}</p>` : 
      '<p>Prijs wordt binnenkort meegedeeld.</p>';

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
          <h1>Offerte Dakkapel - Refurbish Totaal Nederland</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Beste ${customerName},</p>
          
          <p>Hartelijk dank voor uw interesse in onze dakkapellen. Hierbij ontvangt u de offerte voor uw aanvraag.</p>
          
          ${productDetails}
          
          <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            ${priceInfo}
          </div>
          
          ${customMessage ? `<div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Persoonlijk bericht:</h3>
            <p>${customMessage}</p>
          </div>` : ''}
          
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
          
          <p>Met vriendelijke groet,<br>
          Het team van Refurbish Totaal Nederland</p>
        </div>
        
        <div style="background-color: #059669; color: white; padding: 10px; text-align: center; font-size: 12px;">
          <p>© 2024 Refurbish Totaal Nederland - Specialist in dakkapellen</p>
        </div>
      </div>
    `;

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
      to: [customerEmail],
      subject: `Offerte Dakkapel - ${customerName}`,
      html: emailHtml,
    });

    console.log("Quote email sent successfully:", emailResponse);

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
