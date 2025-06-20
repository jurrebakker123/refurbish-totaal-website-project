
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requestData, type, calculatedPrice } = await req.json();
    
    console.log('Generating PDF for:', type, 'with price:', calculatedPrice);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate PDF content based on type
    const pdfHtml = type === 'dakkapel' ? generateDakkapelPDF(requestData, calculatedPrice) : generateZonnepaneelPDF(requestData, calculatedPrice);

    // Convert HTML to PDF using a simple HTML-to-PDF service
    const pdfResponse = await fetch('https://api.html-pdf-node.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('HTML_PDF_API_KEY') || 'demo'}`
      },
      body: JSON.stringify({
        html: pdfHtml,
        options: {
          format: 'A4',
          margin: {
            top: '20mm',
            right: '10mm',
            bottom: '20mm',
            left: '10mm'
          }
        }
      })
    });

    if (!pdfResponse.ok) {
      console.log('PDF generation failed, returning base64 encoded HTML as fallback');
      const encoder = new TextEncoder();
      const htmlBytes = encoder.encode(pdfHtml);
      const base64Html = btoa(String.fromCharCode(...htmlBytes));
      
      return new Response(JSON.stringify({ 
        success: true, 
        pdfBase64: base64Html,
        contentType: 'text/html'
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));

    return new Response(JSON.stringify({ 
      success: true, 
      pdfBase64: base64Pdf,
      contentType: 'application/pdf'
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("PDF generation error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

function generateDakkapelPDF(requestData: any, calculatedPrice: number): string {
  const customerName = `${requestData.voornaam} ${requestData.achternaam}`.trim();
  const priceDisplay = calculatedPrice ? 
    `€${parseFloat(calculatedPrice.toString()).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 
    'Prijs op aanvraag';

  const currentDate = new Date().toLocaleDateString('nl-NL');
  const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('nl-NL'); // 30 days from now

  // Parse opties
  let optiesText = 'Geen extra opties';
  if (requestData.opties && requestData.opties !== 'Geen extra opties') {
    const opties = typeof requestData.opties === 'string' ? requestData.opties.split(',') : [];
    if (opties.length > 0) {
      optiesText = opties.map(optie => {
        switch(optie.trim()) {
          case 'ventilationGrids': return 'Ventilatie roosters';
          case 'sunShade': return 'Zonwering';
          case 'insectScreens': return 'Horren';
          case 'airConditioning': return 'Airconditioning voorbereiding';
          default: return optie.trim();
        }
      }).join(', ');
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.4;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #10b981;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .company-info {
          flex: 1;
        }
        .company-name {
          font-size: 18px;
          font-weight: bold;
          color: #10b981;
          margin-bottom: 5px;
        }
        .company-details {
          font-size: 12px;
          color: #666;
        }
        .logo-placeholder {
          width: 80px;
          height: 80px;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          border-radius: 8px;
        }
        .customer-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .offer-title {
          font-size: 24px;
          font-weight: bold;
          margin: 30px 0 10px 0;
        }
        .offer-subtitle {
          color: #666;
          margin-bottom: 20px;
        }
        .offer-dates {
          text-align: right;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .specifications-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .specifications-table th,
        .specifications-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .specifications-table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        .price-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        .price-table th,
        .price-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        .price-table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        .price-table .amount {
          text-align: right;
        }
        .total-row {
          background-color: #f0f9ff;
          font-weight: bold;
        }
        .footer-text {
          margin-top: 40px;
          font-size: 12px;
          color: #666;
        }
        .signature {
          margin-top: 50px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <div class="company-name">Refurbish Totaal Nederland</div>
          <div class="company-details">
            Grote Baan 123<br>
            1234AB Amsterdam<br>
            <br>
            info@refurbishtotaalnederland.nl<br>
            +31648200064<br>
            <br>
            KVK: 12345678<br>
            BTW: NL123456789B01
          </div>
        </div>
        <div class="logo-placeholder">RTN</div>
      </div>

      <div class="customer-info">
        <strong>Selecteer contact</strong><br>
        ${customerName}<br>
        ${requestData.straatnaam}<br>
        ${requestData.postcode} ${requestData.plaats}
      </div>

      <div class="offer-dates">
        <strong>Offertedatum:</strong> ${currentDate}<br>
        <strong>Vervaldatum:</strong> ${validUntilDate}
      </div>

      <div class="offer-title">Offerte Dakkapel #${requestData.id || 'CONCEPT'}</div>
      <div class="offer-subtitle">Geachte ${customerName},</div>
      
      <p>Hierbij ontvangt u van ons de prijsopgave voor de onderstaande diensten.</p>

      <table class="specifications-table">
        <tr>
          <th>Specificatie</th>
          <th>Details</th>
        </tr>
        <tr>
          <td>Type dakkapel</td>
          <td>${requestData.type}</td>
        </tr>
        <tr>
          <td>Afmetingen</td>
          <td>${requestData.breedte} cm (breedte) x ${requestData.hoogte} cm (hoogte)</td>
        </tr>
        <tr>
          <td>Materiaal</td>
          <td>${requestData.materiaal}</td>
        </tr>
        <tr>
          <td>Aantal ramen</td>
          <td>${requestData.aantalramen}</td>
        </tr>
        <tr>
          <td>Dakhelling</td>
          <td>${requestData.dakhellingtype}</td>
        </tr>
        <tr>
          <td>Kozijn hoogte</td>
          <td>${requestData.kozijnhoogte}</td>
        </tr>
        <tr>
          <td>Woningzijde</td>
          <td>${requestData.woningzijde}</td>
        </tr>
        <tr>
          <td>RC-waarde</td>
          <td>${requestData.rcwaarde}</td>
        </tr>
        <tr>
          <td>Kleuren</td>
          <td>Kozijnen: ${requestData.kleurkozijnen}, Zijkanten: ${requestData.kleurzijkanten}, Draaikiepramen: ${requestData.kleurdraaikiepramen}</td>
        </tr>
        <tr>
          <td>Extra opties</td>
          <td>${optiesText}</td>
        </tr>
      </table>

      <table class="price-table">
        <thead>
          <tr>
            <th>Omschrijving</th>
            <th>Bedrag</th>
            <th>Totaal</th>
            <th>Btw</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dakkapel levering en montage volgens specificaties</td>
            <td class="amount">${priceDisplay}</td>
            <td class="amount">${priceDisplay}</td>
            <td class="amount">21%</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Subtotaal</strong></td>
            <td class="amount"><strong>${priceDisplay}</strong></td>
            <td></td>
          </tr>
          <tr class="total-row">
            <td colspan="2"><strong>Totaal</strong></td>
            <td class="amount"><strong>${priceDisplay}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p>Hierbij hoop ik u goede informatie te hebben gegeven.</p>

      <div class="signature">
        <p>Met vriendelijke groet,</p>
        <br>
        <p><strong>Gerard Groeneveld</strong><br>
        Refurbish Totaal Nederland</p>
      </div>

      <div class="footer-text">
        <p><strong>Inbegrepen in de prijs:</strong></p>
        <ul>
          <li>Complete levering en montage van de dakkapel</li>
          <li>Hoogwaardige materialen (${requestData.materiaal})</li>
          <li>Professionele afwerking binnen- en buitenzijde</li>
          <li>10 jaar garantie op constructie en waterdichtheid</li>
          <li>5 jaar garantie op gebruikte materialen</li>
          <li>Vergunningaanvraag (indien nodig)</li>
        </ul>
        <p><strong>Levertijd:</strong> 6-8 weken na definitieve opdracht</p>
        <p><strong>Betaalvoorwaarden:</strong> 30 dagen netto</p>
      </div>
    </body>
    </html>
  `;
}

function generateZonnepaneelPDF(requestData: any, calculatedPrice: number): string {
  const customerName = requestData.naam;
  const priceDisplay = calculatedPrice ? 
    `€${parseFloat(calculatedPrice.toString()).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 
    'Prijs op aanvraag';

  const currentDate = new Date().toLocaleDateString('nl-NL');
  const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('nl-NL');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.4;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #f59e0b;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .company-info {
          flex: 1;
        }
        .company-name {
          font-size: 18px;
          font-weight: bold;
          color: #f59e0b;
          margin-bottom: 5px;
        }
        .company-details {
          font-size: 12px;
          color: #666;
        }
        .logo-placeholder {
          width: 80px;
          height: 80px;
          background: #f59e0b;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          border-radius: 8px;
        }
        .customer-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .offer-title {
          font-size: 24px;
          font-weight: bold;
          margin: 30px 0 10px 0;
        }
        .offer-subtitle {
          color: #666;
          margin-bottom: 20px;
        }
        .offer-dates {
          text-align: right;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .price-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        .price-table th,
        .price-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        .price-table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        .price-table .amount {
          text-align: right;
        }
        .total-row {
          background-color: #fef3c7;
          font-weight: bold;
        }
        .footer-text {
          margin-top: 40px;
          font-size: 12px;
          color: #666;
        }
        .signature {
          margin-top: 50px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <div class="company-name">Refurbish Totaal Nederland</div>
          <div class="company-details">
            Grote Baan 123<br>
            1234AB Amsterdam<br>
            <br>
            info@refurbishtotaalnederland.nl<br>
            +31648200064<br>
            <br>
            KVK: 12345678<br>
            BTW: NL123456789B01
          </div>
        </div>
        <div class="logo-placeholder">RTN</div>
      </div>

      <div class="customer-info">
        <strong>Selecteer contact</strong><br>
        ${customerName}<br>
        ${requestData.adres || 'Adres 123'}<br>
        ${requestData.postcode || '1234AB'} ${requestData.plaats || 'Plaats'}
      </div>

      <div class="offer-dates">
        <strong>Offertedatum:</strong> ${currentDate}<br>
        <strong>Vervaldatum:</strong> ${validUntilDate}
      </div>

      <div class="offer-title">Offerte Zonnepanelen #${requestData.id || 'CONCEPT'}</div>
      <div class="offer-subtitle">Geachte ${customerName},</div>
      
      <p>Hierbij ontvangt u van ons de prijsopgave voor de onderstaande diensten.</p>

      <table class="price-table">
        <thead>
          <tr>
            <th>Omschrijving</th>
            <th>Bedrag</th>
            <th>Totaal</th>
            <th>Btw</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Refurbished zonnepanelen levering en montage${requestData.aantal_panelen ? ` (${requestData.aantal_panelen} panelen)` : ''}</td>
            <td class="amount">${priceDisplay}</td>
            <td class="amount">${priceDisplay}</td>
            <td class="amount">21%</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Subtotaal</strong></td>
            <td class="amount"><strong>${priceDisplay}</strong></td>
            <td></td>
          </tr>
          <tr class="total-row">
            <td colspan="2"><strong>Totaal</strong></td>
            <td class="amount"><strong>${priceDisplay}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p>Hierbij hoop ik u goede informatie te hebben gegeven.</p>

      <div class="signature">
        <p>Met vriendelijke groet,</p>
        <br>
        <p><strong>Gerard Groeneveld</strong><br>
        Refurbish Totaal Nederland</p>
      </div>

      <div class="footer-text">
        <p><strong>Inbegrepen in de prijs:</strong></p>
        <ul>
          <li>Transport naar locatie</li>
          <li>Montage van de zonnepanelen</li>
          <li>Bekabeling en aansluiting</li>
          <li>Garantie van 5 jaar op de refurbished panelen</li>
          <li>2 jaar garantie op de montage</li>
        </ul>
        <p><strong>Levertijd:</strong> 4-6 weken na definitieve opdracht</p>
        <p><strong>Betaalvoorwaarden:</strong> 30 dagen netto</p>
      </div>
    </body>
    </html>
  `;
}

serve(handler);
