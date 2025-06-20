
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend@2.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
console.log("Starting send-quote function with RESEND_API_KEY:", resendApiKey ? "Present" : "Missing");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendQuoteRequest {
  requestId: string;
  type: 'configurator' | 'zonnepaneel';
  customMessage?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing quote request...");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service not configured. Please add the RESEND_API_KEY in Supabase secrets." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(resendApiKey);
    let requestBody;
    
    try {
      requestBody = await req.json();
      console.log("Request body received:", requestBody);
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid JSON in request body" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const { requestId, type, customMessage }: SendQuoteRequest = requestBody;
    
    if (!requestId) {
      console.error("Missing requestId in request");
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
    
    console.log("Quote request details:", { requestId, type, customMessageLength: customMessage?.length || 0 });
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
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
    console.log("Fetching data for ID:", requestId, "from table:", table);
    const { data: requestData, error } = await supabaseClient
      .from(table)
      .select('*')
      .eq('id', requestId)
      .single();
    
    if (error) {
      console.error("Error fetching data:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Database error: ${error.message}` 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!requestData) {
      console.error("Request data not found for ID:", requestId);
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

    console.log("Request data found:", { naam: requestData.naam, email: requestData.email });

    if (!requestData.email) {
      console.error("No email address found in request data");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Geen email adres gevonden voor deze aanvraag' 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Prepare email content
    const customerName = requestData.naam;
    const customerEmail = requestData.email;
    const customerAddress = `${requestData.adres}, ${requestData.postcode} ${requestData.plaats}`;

    // Create product details based on type
    let productDetails = '';
    
    if (type === 'zonnepaneel') {
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

    const customMessageHtml = customMessage ? 
      `<div style="margin: 20px 0; white-space: pre-line;">${customMessage.replace(/\n/g, '<br/>')}</div>` : '';

    // Create the interest response buttons with correct URLs
    const baseUrl = supabaseUrl.replace('/rest/v1', '');
    const yesUrl = `${baseUrl}/functions/v1/handle-interest-response?id=${requestId}&response=ja&type=${type}`;
    const noUrl = `${baseUrl}/functions/v1/handle-interest-response?id=${requestId}&response=nee&type=${type}`;

    console.log("Generated interest URLs:", { yesUrl, noUrl });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
          <h1>Offerte ${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'} - Refurbish Totaal Nederland</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          ${customMessageHtml}
          
          <div style="background-color: #fff3cd; border: 2px solid #ffeaa7; padding: 25px; border-radius: 10px; margin: 25px 0; text-align: center;">
            <h3 style="color: #856404; margin-top: 0; font-size: 18px;">Heeft u daadwerkelijk interesse om door te gaan?</h3>
            <p style="color: #856404; margin: 15px 0;">Klik op één van de onderstaande knoppen om uw interesse te bevestigen:</p>
            <div style="margin: 25px 0;">
              <a href="${yesUrl}" style="display: inline-block; background-color: #059669; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px; border: none; cursor: pointer;">✓ JA, IK HEB INTERESSE</a>
              <br><br>
              <a href="${noUrl}" style="display: inline-block; background-color: #dc3545; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; margin: 10px; font-weight: bold; font-size: 16px; border: none; cursor: pointer;">✗ NEE, GEEN INTERESSE</a>
            </div>
            <p style="font-size: 14px; color: #856404; margin-bottom: 0;">Deze knoppen werken direct vanuit uw email.</p>
          </div>
          
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
              Telefoon: 085 4444 255
            </p>
          </div>
        </div>
        
        <div style="background-color: #059669; color: white; padding: 10px; text-align: center; font-size: 12px;">
          <p>© 2024 Refurbish Totaal Nederland - Specialist in ${type === 'zonnepaneel' ? 'zonnepanelen' : 'dakkapellen'}</p>
        </div>
      </div>
    `;

    console.log("Attempting to send email to:", customerEmail);

    // Prepare attachments - Generate PDF quote and Terms & Conditions
    const attachments = [];
    
    // Generate Terms & Conditions PDF
    const termsAndConditionsPdf = generateTermsAndConditionsPDF();
    attachments.push({
      filename: 'Algemene_Voorwaarden.pdf',
      content: termsAndConditionsPdf,
      type: 'application/pdf'
    });

    // Generate simple quote PDF
    const quotePdf = generateQuotePDF(requestData, type);
    attachments.push({
      filename: `Offerte_${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'}_${requestId}.pdf`,
      content: quotePdf,
      type: 'application/pdf'
    });

    console.log("Generated attachments:", attachments.length);

    // Send email using verified domain
    const emailResponse = await resend.emails.send({
      from: 'Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>',
      to: [customerEmail],
      subject: `Offerte ${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'} - ${type === 'zonnepaneel' ? requestData.merk : requestData.model}`,
      html: emailHtml,
      attachments: attachments,
    });

    console.log("Resend API response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Email sending failed: ${emailResponse.error.message}` 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Update the status in the database
    console.log("Updating request status to 'offerte_verzonden'...");
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
      // Don't fail the whole operation, email was sent successfully
      console.log('Email was sent successfully despite database update error');
    }

    console.log("Quote sent successfully! Email ID:", emailResponse.data?.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Offerte succesvol verzonden',
      emailId: emailResponse.data?.id,
      sentTo: customerEmail,
      attachments: attachments.length,
      note: 'Email verzonden vanaf info@refurbishtotaalnederland.nl'
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Unexpected error in send-quote function:", error);
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

function generateQuotePDF(requestData: any, type: string): string {
  const currentDate = new Date().toLocaleDateString('nl-NL');
  
  const quoteHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #10b981;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .company-name {
          font-size: 24px;
          font-weight: bold;
          color: #10b981;
          margin-bottom: 10px;
        }
        .quote-details {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .price-box {
          background-color: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin: 20px 0;
        }
        .total-price {
          font-size: 24px;
          font-weight: bold;
          color: #1976d2;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        .contact-info {
          background-color: #f0f9ff;
          padding: 15px;
          border-radius: 8px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">Refurbish Totaal Nederland</div>
        <p>Offerte ${type === 'zonnepaneel' ? 'Zonnepanelen' : 'Dakkapel'}</p>
        <p>Datum: ${currentDate}</p>
      </div>

      <div class="quote-details">
        <h2>Klantgegevens</h2>
        <p><strong>Naam:</strong> ${requestData.naam}</p>
        <p><strong>Email:</strong> ${requestData.email}</p>
        <p><strong>Adres:</strong> ${requestData.adres}, ${requestData.postcode} ${requestData.plaats}</p>
        <p><strong>Telefoon:</strong> ${requestData.telefoon}</p>
      </div>

      ${type === 'zonnepaneel' ? `
        <div class="quote-details">
          <h2>Zonnepanelen Specificaties</h2>
          <table>
            <tr><th>Specificatie</th><th>Waarde</th></tr>
            <tr><td>Aantal panelen</td><td>${requestData.aantal_panelen}</td></tr>
            <tr><td>Vermogen</td><td>${requestData.vermogen}W</td></tr>
            <tr><td>Type paneel</td><td>${requestData.type_paneel}</td></tr>
            <tr><td>Merk</td><td>${requestData.merk}</td></tr>
            <tr><td>Conditie</td><td>${requestData.conditie}</td></tr>
            <tr><td>Dak type</td><td>${requestData.dak_type}</td></tr>
            ${requestData.dak_materiaal ? `<tr><td>Dak materiaal</td><td>${requestData.dak_materiaal}</td></tr>` : ''}
            ${requestData.schaduw_situatie ? `<tr><td>Schaduw situatie</td><td>${requestData.schaduw_situatie}</td></tr>` : ''}
          </table>
        </div>
      ` : `
        <div class="quote-details">
          <h2>Dakkapel Specificaties</h2>
          <table>
            <tr><th>Specificatie</th><th>Waarde</th></tr>
            <tr><td>Model</td><td>${requestData.model}</td></tr>
            <tr><td>Breedte</td><td>${requestData.breedte}cm</td></tr>
            <tr><td>Materiaal</td><td>${requestData.materiaal}</td></tr>
            <tr><td>Kleur kozijn</td><td>${requestData.kleur_kozijn}</td></tr>
            <tr><td>Kleur zijkanten</td><td>${requestData.kleur_zijkanten}</td></tr>
            <tr><td>Kleur draaikiepramen</td><td>${requestData.kleur_draaikiepramen}</td></tr>
            ${requestData.dakhelling ? `<tr><td>Dakhelling</td><td>${requestData.dakhelling}° (${requestData.dakhelling_type})</td></tr>` : ''}
            ${requestData.levertijd ? `<tr><td>Levertijd</td><td>${requestData.levertijd}</td></tr>` : ''}
          </table>
          
          <h3>Extra Opties</h3>
          <table>
            <tr><th>Optie</th><th>Inbegrepen</th></tr>
            <tr><td>Ventilatierooster</td><td>${requestData.ventilationgrids ? 'Ja' : 'Nee'}</td></tr>
            <tr><td>Zonwering</td><td>${requestData.sunshade ? 'Ja' : 'Nee'}</td></tr>
            <tr><td>Insectenhorren</td><td>${requestData.insectscreens ? 'Ja' : 'Nee'}</td></tr>
            <tr><td>Airconditioning</td><td>${requestData.airconditioning ? 'Ja' : 'Nee'}</td></tr>
          </table>
        </div>
      `}

      ${requestData.totaal_prijs ? `
        <div class="price-box">
          <h2>Totaalprijs</h2>
          <div class="total-price">€${requestData.totaal_prijs.toLocaleString('nl-NL')}</div>
          <p>Inclusief BTW en montage</p>
        </div>
      ` : `
        <div class="price-box">
          <h2>Prijs</h2>
          <p>Prijs wordt na inspectie meegedeeld</p>
        </div>
      `}

      <div class="quote-details">
        <h2>Voorwaarden</h2>
        <ul>
          <li>Deze offerte is 30 dagen geldig</li>
          <li>Prijzen zijn inclusief BTW</li>
          <li>Montage is inbegrepen in de prijs</li>
          <li>Garantie: ${type === 'zonnepaneel' ? '5 jaar op panelen, 2 jaar op montage' : '10 jaar op constructie en waterdichtheid'}</li>
        </ul>
      </div>

      <div class="contact-info">
        <h2>Contact</h2>
        <p><strong>Refurbish Totaal Nederland</strong></p>
        <p>Telefoon: 085 4444 255</p>
        <p>E-mail: info@refurbishtotaalnederland.nl</p>
        <p>Website: www.refurbishtotaalnederland.nl</p>
      </div>
    </body>
    </html>
  `;

  // Convert HTML to base64 for PDF attachment
  const encoder = new TextEncoder();
  const htmlBytes = encoder.encode(quoteHtml);
  return btoa(String.fromCharCode(...htmlBytes));
}

function generateTermsAndConditionsPDF(): string {
  const currentDate = new Date().toLocaleDateString('nl-NL');
  
  const termsHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #10b981;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .company-name {
          font-size: 24px;
          font-weight: bold;
          color: #10b981;
          margin-bottom: 10px;
        }
        h1 {
          color: #333;
          font-size: 20px;
          margin-top: 30px;
        }
        h2 {
          color: #555;
          font-size: 16px;
          margin-top: 20px;
        }
        p, li {
          font-size: 12px;
          margin-bottom: 8px;
        }
        .contact-info {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">Refurbish Totaal Nederland</div>
        <p>Algemene Voorwaarden</p>
        <p>Geldig vanaf: ${currentDate}</p>
      </div>

      <h1>Artikel 1: Algemeen</h1>
      <p>1.1 Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten van Refurbish Totaal Nederland.</p>
      <p>1.2 Afwijkingen van deze voorwaarden zijn slechts geldig indien deze schriftelijk zijn overeengekomen.</p>

      <h1>Artikel 2: Offertes en Prijzen</h1>
      <p>2.1 Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen, tenzij anders vermeld.</p>
      <p>2.2 Alle prijzen zijn exclusief BTW, tenzij anders vermeld.</p>
      <p>2.3 Prijswijzigingen door leveranciers worden doorberekend aan de opdrachtgever.</p>

      <h1>Artikel 3: Uitvoering van Werkzaamheden</h1>
      <p>3.1 Werkzaamheden worden uitgevoerd conform de overeengekomen specificaties.</p>
      <p>3.2 Eventuele meerwerken worden vooraf ter goedkeuring voorgelegd aan de opdrachtgever.</p>
      <p>3.3 De opdrachtgever draagt zorg voor tijdige beschikbaarheid van de werklocatie.</p>

      <h1>Artikel 4: Levertijden</h1>
      <p>4.1 Opgegeven levertijden zijn indicatief en niet bindend.</p>
      <p>4.2 Overschrijding van levertijden geeft geen recht op schadevergoeding of ontbinding.</p>

      <h1>Artikel 5: Betaling</h1>
      <p>5.1 Betaling dient te geschieden binnen 30 dagen na factuurdatum.</p>
      <p>5.2 Bij overschrijding van de betalingstermijn wordt 1% rente per maand berekend.</p>
      <p>5.3 Alle kosten van invordering komen voor rekening van de opdrachtgever.</p>

      <h1>Artikel 6: Garantie</h1>
      <p>6.1 Op alle werkzaamheden geldt een garantie van 12 maanden.</p>
      <p>6.2 Op dakkapellen geldt 10 jaar garantie op constructie en waterdichtheid.</p>
      <p>6.3 Op refurbished zonnepanelen geldt 5 jaar garantie op de panelen en 2 jaar op montage.</p>

      <h1>Artikel 7: Aansprakelijkheid</h1>
      <p>7.1 Onze aansprakelijkheid is beperkt tot het gefactureerde bedrag van de betreffende opdracht.</p>
      <p>7.2 Aansprakelijkheid voor gevolgschade is uitgesloten.</p>

      <h1>Artikel 8: Klachten</h1>
      <p>8.1 Klachten dienen schriftelijk binnen 8 dagen na levering te worden gemeld.</p>
      <p>8.2 Klachten over facturen dienen binnen 8 dagen na factuurdatum te worden gemeld.</p>

      <h1>Artikel 9: Toepasselijk Recht</h1>
      <p>9.1 Op alle overeenkomsten is Nederlands recht van toepassing.</p>
      <p>9.2 Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam.</p>

      <div class="contact-info">
        <h2>Contactgegevens</h2>
        <p><strong>Refurbish Totaal Nederland</strong></p>
        <p>Grote Baan 123</p>
        <p>1234AB Amsterdam</p>
        <p>Telefoon: 085 4444 255</p>
        <p>E-mail: info@refurbishtotaalnederland.nl</p>
        <p>KVK: 12345678</p>
        <p>BTW: NL123456789B01</p>
      </div>
    </body>
    </html>
  `;

  // Convert HTML to base64 for PDF attachment
  const encoder = new TextEncoder();
  const htmlBytes = encoder.encode(termsHtml);
  return btoa(String.fromCharCode(...htmlBytes));
}

serve(handler);
