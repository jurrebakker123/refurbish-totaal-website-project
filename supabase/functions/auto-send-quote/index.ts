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

// Function to calculate total price from configuration
const calculateTotalPrice = (config: any): number => {
  console.log('Calculating price for config:', config);
  
  // Base prices per type
  const basePrices: Record<string, number> = {
    'typeA': 7060,
    'typeB': 7290,
    'typeC': 8200,
    'typeD': 8780,
    'typeE': 9330,
    'Dakkapel plat dak': 7500,
    'Dakkapel schuin dak': 8000,
    'Dakkapel lessenaar': 8500
  };

  // Material multipliers
  const materialMultipliers: Record<string, number> = {
    'kunststof': 1.0,
    'hout': 1.2,
    'aluminium': 1.3,
    'Keralit': 1.0,
    'Hout': 1.2,
    'Aluminium': 1.3
  };

  // Option costs
  const optionCosts: Record<string, number> = {
    'ventilationGrids': 450,
    'sunShade': 850,
    'insectScreens': 240,
    'airConditioning': 650
  };

  // Get base price
  const basePrice = basePrices[config.type] || basePrices['Dakkapel plat dak'] || 7500;
  
  // Get material multiplier
  const materialMultiplier = materialMultipliers[config.materiaal] || materialMultipliers[config.material] || 1.0;
  
  // Calculate options total
  let optionsTotal = 0;
  if (config.opties) {
    const opties = typeof config.opties === 'string' ? config.opties.split(',') : [];
    opties.forEach((optie: string) => {
      const optieKey = optie.trim();
      if (optionCosts[optieKey]) {
        optionsTotal += optionCosts[optieKey];
      }
    });
  }
  
  // Calculate extras from configurator
  if (config.extras) {
    Object.keys(config.extras).forEach(key => {
      if (config.extras[key] && optionCosts[key]) {
        optionsTotal += optionCosts[key];
      }
    });
  }
  
  // Width-based adjustments (for configurator)
  let widthAdjustment = 0;
  if (config.width) {
    const widthValue = parseInt(config.width.split('-')[0]) || 240;
    if (widthValue > 300) {
      widthAdjustment = (widthValue - 300) * 5; // €5 per cm extra
    }
  }
  
  const totalPrice = (basePrice * materialMultiplier) + optionsTotal + widthAdjustment;
  
  console.log('Price calculation:', {
    basePrice,
    materialMultiplier,
    optionsTotal,
    widthAdjustment,
    totalPrice
  });
  
  return Math.round(totalPrice / 10) * 10; // Round to nearest 10
};

const getDeliveryTimeDisplayName = (deliveryTime: string) => {
  console.log('=== FINAL DELIVERY TIME MAPPING DEBUG ===');
  console.log('Raw delivery time value:', JSON.stringify(deliveryTime));
  console.log('Type:', typeof deliveryTime);
  console.log('Length:', deliveryTime?.length);
  
  if (!deliveryTime) {
    console.log('❌ No delivery time provided, using default');
    return 'Zo snel mogelijk (Wij plannen dit zo spoedig mogelijk in)';
  }
  
  // Convert to string and normalize - handle all possible formats
  const normalizedTime = String(deliveryTime).trim().toLowerCase();
  console.log('✅ Normalized delivery time for matching:', normalizedTime);
  
  // BULLETPROOF MAPPING - Check every possible variation
  // Zo snel mogelijk variations
  if (normalizedTime.includes('zo snel mogelijk') || 
      normalizedTime === 'asap' || 
      normalizedTime === 'zo-snel-mogelijk' ||
      normalizedTime === 'spoedig' ||
      normalizedTime === '1') {
    console.log('🎯 MATCHED: Zo snel mogelijk');
    return 'Zo snel mogelijk (Wij plannen dit zo spoedig mogelijk in)';
  }
  
  // Binnen 3-6 maanden variations  
  if (normalizedTime.includes('3') && normalizedTime.includes('6') ||
      normalizedTime.includes('binnen 3 - 6') ||
      normalizedTime.includes('3-6') ||
      normalizedTime === '2') {
    console.log('🎯 MATCHED: Binnen 3 - 6 maanden');
    return 'Binnen 3 - 6 maanden (Flexibele planning op middellange termijn)';
  }
  
  // Binnen 6-9 maanden variations
  if (normalizedTime.includes('6') && normalizedTime.includes('9') ||
      normalizedTime.includes('binnen 6 - 9') ||
      normalizedTime.includes('6-9') ||
      normalizedTime === '3') {
    console.log('🎯 MATCHED: Binnen 6 - 9 maanden');
    return 'Binnen 6 - 9 maanden (Planning op langere termijn)';
  }
  
  // 9+ maanden variations
  if (normalizedTime.includes('9') && (normalizedTime.includes('later') || normalizedTime.includes('+')) ||
      normalizedTime.includes('9 maanden of later') ||
      normalizedTime.includes('9+') ||
      normalizedTime === '4') {
    console.log('🎯 MATCHED: 9 maanden of later');
    return '9 maanden of later (Ver vooruit plannen)';
  }
  
  // FALLBACK - log what we couldn't match and use default
  console.log('❌ NO MATCH FOUND FOR:', normalizedTime);
  console.log('🔧 Using default delivery time');
  return 'Zo snel mogelijk (Wij plannen dit zo spoedig mogelijk in)';
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
      id: requestData.id,
      existing_totaal_prijs: requestData.totaal_prijs,
      levertijd: requestData.levertijd
    });

    // Calculate price if not already set
    let calculatedPrice = requestData.totaal_prijs;
    if (!calculatedPrice && type === 'dakkapel') {
      calculatedPrice = calculateTotalPrice(requestData);
      console.log("Calculated price:", calculatedPrice);
      
      // Update the record with calculated price
      await supabase
        .from(tableName)
        .update({ totaal_prijs: calculatedPrice })
        .eq('id', requestId);
    }

    // Generate PDF attachments
    console.log("Generating PDF attachments...");
    
    let pdfAttachment = null;
    try {
      const pdfResponse = await fetch(`${supabaseUrl}/functions/v1/generate-offerte-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          requestData,
          type,
          calculatedPrice: calculatedPrice || requestData.totaal_prijs
        })
      });

      if (pdfResponse.ok) {
        const pdfResult = await pdfResponse.json();
        if (pdfResult.success) {
          pdfAttachment = {
            filename: `Offerte-${type}-${requestId}.pdf`,
            content: pdfResult.pdfBase64,
            type: 'application/pdf'
          };
          console.log("PDF attachment generated successfully");
        }
      } else {
        console.log("PDF generation failed, continuing without attachment");
      }
    } catch (pdfError) {
      console.log("PDF generation error:", pdfError, "continuing without attachment");
    }

    // Prepare email content
    const customerName = type === 'dakkapel' ? `${requestData.voornaam} ${requestData.achternaam}`.trim() : requestData.naam;
    const customerEmail = type === 'dakkapel' ? requestData.emailadres : requestData.email;
    
    console.log("Preparing email content for:", customerEmail);

    // Helper functions for configurator display values
    const getWidthDisplayName = (width: string) => {
      const widthValue = parseInt(width) || 240;
      if (widthValue <= 180) return '0 - 180 cm';
      if (widthValue <= 240) return '180 - 240 cm';
      if (widthValue <= 300) return '240 - 300 cm';
      if (widthValue <= 360) return '300 - 360 cm';
      if (widthValue <= 420) return '360 - 420 cm';
      if (widthValue <= 480) return '420 - 480 cm';
      if (widthValue <= 540) return '480 - 540 cm';
      return 'Groter dan 540 cm';
    };

    const getRoofAngleDisplayName = (angle: string) => {
      switch(angle) {
        case '45-60': return '45° - 60° (Meest gekozen)';
        case '35-45': return '35° - 45° (Gemiddelde helling)';
        case '25-35': return '25° - 35° (Lage helling)';
        case 'unknown': 
        case 'unknown°':
          return 'Weet ik niet (Wij meten dit gratis voor u in)';
        default: return angle;
      }
    };

    const getModelDisplayName = (model: string) => {
      switch(model) {
        case 'flat': return 'Dakkapel plat dak (Meest gekozen model)';
        case 'sloped': return 'Dakkapel schuin dak (Past bij traditionele woningen)';
        case 'double-ridge': return 'Dubbele nokverhoging (Voor maximale ruimte)';
        case 'single-ridge': return 'Eenzijdige nokverhoging (Voor extra hoogte)';
        default: return model;
      }
    };

    const getMaterialDisplayName = (material: string) => {
      switch(material) {
        case 'keralit': return 'Keralit (Onderhoudsarm en duurzaam)';
        case 'wood': return 'Hout (Natuurlijke uitstraling)';
        case 'zinc': return 'Zink (Stijlvol en modern)';
        default: return material;
      }
    };

    const getColorDisplayName = (color: string) => {
      switch(color) {
        case 'wit': return 'Wit';
        case 'creme': return 'Crème';
        case 'blauw': return 'Blauw';
        case 'groen': return 'Groen';
        case 'antraciet': return 'Antraciet';
        case 'kwartsgrijs': return 'Kwartsgrijs';
        case 'anders': return 'Anders';
        default: return color;
      }
    };

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
      // Parse extra options from opties field
      let extraOptions = [];
      if (requestData.opties) {
        const opties = typeof requestData.opties === 'string' ? requestData.opties.split(',') : [];
        opties.forEach((optie: string) => {
          const trimmedOptie = optie.trim();
          switch(trimmedOptie) {
            case 'ventilationGrids':
              extraOptions.push('✅ Ventilatieroosters (+€350,-)');
              break;
            case 'sunShade':
              extraOptions.push('✅ Zonwering (Somfy-Ilmo motor) (+€850,-)');
              break;
            case 'insectScreens':
              extraOptions.push('✅ Horren (+€250,-)');
              break;
            case 'airConditioning':
              extraOptions.push('✅ Airco (+€1.500,-)');
              break;
          }
        });
      }

      const extraOptionsText = extraOptions.length > 0 ? 
        `<div style="margin-top: 15px;">${extraOptions.join('<br>')}</div>` : 
        '<div style="margin-top: 15px;">Geen extra opties</div>';

      // CRITICAL: Get the delivery time from requestData and process it bulletproof
      console.log('🚨 PROCESSING LEVERTIJD FOR EMAIL DISPLAY 🚨');
      console.log('requestData.levertijd raw value:', JSON.stringify(requestData.levertijd));
      
      const deliveryTimeForEmail = getDeliveryTimeDisplayName(requestData.levertijd);
      console.log('✅ Final delivery time for email:', deliveryTimeForEmail);

      productDetails = `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #065f46; margin-top: 0; margin-bottom: 20px;">📋 Overzicht van uw samenstelling</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 40%;">Stap 1 - Breedte:</td>
              <td style="padding: 12px 0; color: #1f2937;">${getWidthDisplayName(requestData.breedte.toString())}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">Stap 2 - Dakhelling:</td>
              <td style="padding: 12px 0; color: #1f2937;">${getRoofAngleDisplayName(requestData.dakhellingtype)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">Stap 3 - Model:</td>
              <td style="padding: 12px 0; color: #1f2937;">${getModelDisplayName(requestData.type)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">Stap 4 - Materiaal:</td>
              <td style="padding: 12px 0; color: #1f2937;">${getMaterialDisplayName(requestData.materiaal)}</td>
            </tr>
          </table>

          <div style="margin-bottom: 20px;">
            <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Stap 5 - Kleuren:</h4>
            <div style="background: white; padding: 15px; border-radius: 6px;">
              <div style="margin-bottom: 8px;"><strong>Boeien:</strong> ${getColorDisplayName(requestData.kleurkozijnen)}</div>
              <div style="margin-bottom: 8px;"><strong>Zijwanden:</strong> ${getColorDisplayName(requestData.kleurzijkanten)}</div>
              <div style="margin-bottom: 8px;"><strong>Kozijnen:</strong> ${getColorDisplayName(requestData.kleurkozijnen)}</div>
              <div><strong>Draaiende delen:</strong> ${getColorDisplayName(requestData.kleurdraaikiepramen)}</div>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Stap 6 - Extra opties:</h4>
            <div style="background: white; padding: 15px; border-radius: 6px;">
              ${extraOptionsText}
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Stap 7 - Levertijd:</h4>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981;">
              <strong style="color: #10b981;">${deliveryTimeForEmail}</strong>
            </div>
          </div>
          
          <div style="padding-top: 15px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280;"><strong>Stap 8 - Locatie:</strong> ${requestData.plaats}, ${requestData.postcode}</p>
          </div>
        </div>
      `;
    }

    // Create comprehensive email content
    const emailSubject = type === 'dakkapel' ? 
      "🏠 Uw Dakkapel Offerte van Refurbish Totaal Nederland" : 
      "☀️ Uw Zonnepanelen Offerte van Refurbish Totaal Nederland";

    // Format price display - use calculated or existing price
    const finalPrice = calculatedPrice || requestData.totaal_prijs;
    const priceDisplay = finalPrice ? 
      `€${parseFloat(finalPrice.toString()).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 
      'Prijs op aanvraag';

    console.log("Final price for email:", { finalPrice, priceDisplay });

    // Interest confirmation buttons
    const interestButtons = `
      <div style="background: #f9fafb; padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center; border: 2px solid #e5e7eb;">
        <h3 style="color: #1f2937; margin-top: 0; font-size: 20px;">📋 Heeft u daadwerkelijk interesse?</h3>
        <p style="color: #6b7280; margin-bottom: 25px;">Laat ons weten of u interesse heeft in deze offerte:</p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <a href="https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/handle-interest-response?id=${requestId}&response=ja&type=${type}" 
             style="display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; margin: 5px;">
            ✅ Ja, ik heb interesse
          </a>
          <a href="https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/handle-interest-response?id=${requestId}&response=nee&type=${type}" 
             style="display: inline-block; background: #6b7280; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; margin: 5px;">
            ❌ Nee, geen interesse
          </a>
        </div>
      </div>
    `;

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

          ${productDetails}
          
          <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #10b981;">
            <h3 style="color: #065f46; margin-top: 0; font-size: 24px;">💰 Totaalprijs:</h3>
            <div style="font-size: 36px; font-weight: bold; color: #10b981; margin: 15px 0;">${priceDisplay}</div>
            <p style="color: #047857; margin: 0; font-size: 14px;">Prijsindicatie inclusief BTW</p>
            <p style="color: #047857; margin: 5px 0 0 0; font-size: 12px;">*Deze prijs is indicatief en kan worden aangepast na een locatiebezoek</p>
          </div>

          ${pdfAttachment ? `
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0; border: 2px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">📎 Bijlagen</h3>
            <p style="color: #1e40af; margin: 0;">Deze email bevat een gedetailleerde PDF-offerte en onze algemene voorwaarden als bijlage.</p>
          </div>
          ` : ''}

          ${interestButtons}

          ${requestData.bericht ? `<div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;"><strong>Uw bericht:</strong><br>${requestData.bericht}</div>` : ''}
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #065f46; margin-top: 0;">✅ Inbegrepen in de prijs:</h3>
            <ul style="color: #047857; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Complete levering en montage van de dakkapel</li>
              <li>Hoogwaardige materialen (${getMaterialDisplayName(requestData.materiaal)})</li>
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

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
            <p style="color: #10b981; margin: 0; font-weight: bold;">⏰ Levertijd: ${getDeliveryTimeDisplayName(requestData.levertijd || 'Zo snel mogelijk')}</p>
          </div>

          <p style="color: #4b5563; line-height: 1.6; margin: 20px 0;">
            Heeft u vragen over deze offerte of wilt u aanpassingen bespreken? Neem gerust contact met ons op. 
            Wij staan klaar om u te helpen bij de realisatie van uw dakkapel!
          </p>

          <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px; border: 2px solid #10b981;">
            <p style="margin: 0; font-size: 18px; color: #1f2937;"><strong>Met vriendelijke groet,</strong></p>
            <p style="margin: 5px 0; font-size: 20px; color: #10b981; font-weight: bold;">Gerard Groeneveld</p>
            <p style="margin: 5px 0; font-size: 16px; color: #4b5563;">Refurbish Totaal Nederland</p>
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

          ${requestData.totaal_prijs ? `
          <div style="background: #fef3c7; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0; font-size: 24px;">💰 Totaalprijs</h3>
            <p style="color: #b45309; margin: 5px 0; font-size: 14px;">Prijsindicatie inclusief BTW</p>
            <div style="font-size: 36px; font-weight: bold; color: #f59e0b; margin: 15px 0;">${priceDisplay}</div>
            <p style="color: #b45309; margin: 0; font-size: 14px;">*Deze prijs is indicatief en kan worden aangepast na een locatiebezoek</p>
          </div>
          ` : ''}

          ${pdfAttachment ? `
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0; border: 2px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">📎 Bijlagen</h3>
            <p style="color: #1e40af; margin: 0;">Deze email bevat een gedetailleerde PDF-offerte en onze algemene voorwaarden als bijlage.</p>
          </div>
          ` : ''}

          ${interestButtons}

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 15px;">📞 <strong>Bel direct voor een persoonlijk gesprek:</strong></p>
            <a href="tel:0851301578" style="display: inline-block; background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px;">085-1301578</a>
          </div>

          <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px; border: 2px solid #f59e0b;">
            <p style="margin: 0; font-size: 18px; color: #1f2937;"><strong>Met vriendelijke groet,</strong></p>
            <p style="margin: 5px 0; font-size: 20px; color: #f59e0b; font-weight: bold;">Gerard Groeneveld</p>
            <p style="margin: 5px 0; font-size: 16px; color: #4b5563;">Refurbish Totaal Nederland</p>
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

    // Prepare email options for customer
    const customerEmailOptions: any = {
      from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
      to: [customerEmail],
      subject: emailSubject,
      html: emailHtml,
    };

    // Add PDF attachment if available
    if (pdfAttachment) {
      customerEmailOptions.attachments = [pdfAttachment];
      console.log("Adding PDF attachment to customer email");
    }

    // Send the customer email using Resend
    const customerEmailResponse = await resend.emails.send(customerEmailOptions);

    console.log("✅ Resend API response for customer:", customerEmailResponse);

    if (customerEmailResponse.error) {
      console.error("❌ Customer email sending failed:", customerEmailResponse.error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Customer email sending failed: ${customerEmailResponse.error.message}` 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log("✅ Customer email sent successfully! Email ID:", customerEmailResponse.data?.id);

    // NEW: Send internal notification email to company
    console.log("Sending internal notification email...");
    
    const internalNotificationSubject = `🔔 Nieuwe ${type === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} Aanvraag - ${customerName}`;
    
    const internalNotificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🔔 Nieuwe Aanvraag</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${type === 'dakkapel' ? 'Dakkapel Configurator' : 'Zonnepanelen'}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">Klantgegevens:</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Naam:</strong> ${customerName}</p>
            <p><strong>E-mail:</strong> ${customerEmail}</p>
            <p><strong>Telefoon:</strong> ${type === 'dakkapel' ? requestData.telefoon : requestData.telefoon || 'Niet opgegeven'}</p>
            <p><strong>Adres:</strong> ${type === 'dakkapel' ? `${requestData.straatnaam} ${requestData.huisnummer}, ${requestData.postcode} ${requestData.plaats}` : requestData.adres || 'Niet opgegeven'}</p>
            ${requestData.bericht ? `<p><strong>Bericht:</strong> ${requestData.bericht}</p>` : ''}
          </div>

          <h2 style="color: #1f2937;">Configuratie Details:</h2>
          ${productDetails}

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px solid #10b981;">
            <h3 style="color: #065f46; margin-top: 0;">💰 Berekende Prijs:</h3>
            <div style="font-size: 24px; font-weight: bold; color: #10b981;">${priceDisplay}</div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 15px;">📋 <strong>Aanvraag ID:</strong> ${requestId}</p>
            <p style="font-size: 14px; color: #6b7280;">Ontvangen op: ${new Date().toLocaleString('nl-NL')}</p>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-weight: bold;">⚡ Actie vereist: Neem contact op met de klant voor verdere afhandeling</p>
          </div>
        </div>
      </div>
    `;

    // Send internal notification email
    const internalEmailResponse = await resend.emails.send({
      from: "Dakkapel Configurator <info@refurbishtotaalnederland.nl>",
      to: ["info@refurbishtotaalnederland.nl"],
      subject: internalNotificationSubject,
      html: internalNotificationHtml,
    });

    console.log("✅ Internal notification email response:", internalEmailResponse);

    if (internalEmailResponse.error) {
      console.error("❌ Internal notification email failed:", internalEmailResponse.error);
      // Continue processing even if internal email fails
    } else {
      console.log("✅ Internal notification email sent successfully! Email ID:", internalEmailResponse.data?.id);
    }

    // Update the database to mark the quote as sent
    console.log("Updating database status...");
    const updateResult = await supabase
      .from(tableName)
      .update({ 
        status: 'offerte_verzonden',
        offerte_verzonden_op: new Date().toISOString(),
        ...(finalPrice && { totaal_prijs: finalPrice })
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
      emailId: customerEmailResponse.data?.id,
      internalEmailId: internalEmailResponse.data?.id || null,
      calculatedPrice: finalPrice,
      pdfGenerated: !!pdfAttachment
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
