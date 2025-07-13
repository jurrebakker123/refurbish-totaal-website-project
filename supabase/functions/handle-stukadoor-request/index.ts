
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, formData, totalPrice } = await req.json();
    
    console.log('🏗️ Processing stukadoor request:', customerData);

    // Format form data for display
    const formatFieldName = (fieldName: string) => {
      return fieldName
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    // Send confirmation email to customer with dakkapel-style template
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .header .subtitle { margin: 10px 0 0 0; font-size: 18px; opacity: 0.9; }
          .content { padding: 30px; }
          .greeting { font-size: 18px; margin-bottom: 20px; color: #333; }
          .section { margin: 25px 0; }
          .section h3 { color: #059669; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #10b981; padding-bottom: 5px; }
          .details { background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .details ul { margin: 0; padding-left: 20px; }
          .details li { margin: 5px 0; color: #555; }
          .price-box { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .price-box .label { font-size: 18px; margin-bottom: 10px; opacity: 0.9; }
          .price-box .amount { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
          .price-box .note { font-size: 14px; opacity: 0.8; }
          .included { background-color: #f0fdf4; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .included h4 { color: #059669; margin: 0 0 10px 0; }
          .included ul { margin: 0; padding-left: 20px; }
          .included li { color: #059669; margin: 5px 0; }
          .contact { background-color: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center; margin: 20px 0; }
          .contact h4 { color: #333; margin: 0 0 10px 0; }
          .phone-button { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; display: inline-block; margin: 10px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer .company { color: #10b981; font-weight: bold; font-size: 18px; }
          .footer .details { color: #6b7280; font-size: 14px; margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔨 Stukadoorswerk Offerte</h1>
            <div class="subtitle">Refurbish Totaal Nederland</div>
          </div>
          
          <div class="content">
            <div class="greeting">Beste ${customerData.voornaam} ${customerData.achternaam},</div>
            
            <p>Hartelijk dank voor uw interesse in ons stukadoorswerk! Wij hebben uw configuratie ontvangen en zijn verheugd u hierbij een offerte te kunnen aanbieden.</p>
            
            <div class="section">
              <h3>📋 Overzicht van uw samenstelling</h3>
              
              <div class="details">
                <p><strong>Bouwtype:</strong> ${formatFieldName(formData.bouw_type)}</p>
                <p><strong>Stucwerk type:</strong> ${formatFieldName(formData.stuc_type)}</p>
                <p><strong>Wand oppervlakte:</strong> ${formData.oppervlakte_wanden}m²</p>
                <p><strong>Plafond oppervlakte:</strong> ${formData.oppervlakte_plafonds}m²</p>
                <p><strong>Isolatie:</strong> ${formData.isolatie_gewenst ? 'Gewenst' : 'Niet gewenst'}</p>
              </div>
            </div>

            <div class="section">
              <h3>Contactgegevens:</h3>
              <div class="details">
                <ul>
                  <li>Naam: ${customerData.voornaam} ${customerData.achternaam}</li>
                  <li>E-mail: ${customerData.emailadres}</li>
                  <li>Telefoon: ${customerData.telefoon}</li>
                  <li>Adres: ${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}</li>
                </ul>
              </div>
            </div>

            <div class="price-box">
              <div class="label">💰 Totaalprijs:</div>
              <div class="amount">€${totalPrice.toLocaleString()}</div>
              <div class="note">Prijsindicatie inclusief BTW</div>
              <div class="note">*Deze prijs is indicatief en kan worden aangepast na een locatiebezoek</div>
            </div>

            <div class="included">
              <h4>✅ Inbegrepen in de prijs:</h4>
              <ul>
                <li>Complete levering en verwerking van hoogwaardige stucmaterialen</li>
                <li>Professionele voorbehandeling van het oppervlak</li>
                <li>Vakkundige afwerking door ervaren stukadoors</li>
                <li>Opruimen en schoonmaken na afloop</li>
                <li>Garantie op het uitgevoerde werk</li>
                <li>Deskundig advies over afwerking en textuur</li>
              </ul>
            </div>

            <div class="contact">
              <h4>📞 Bel direct voor een persoonlijk gesprek:</h4>
              <a href="tel:+085-44-44-255" class="phone-button">+085 44 44 255</a>
            </div>

            <p>Heeft u vragen over deze offerte of wilt u aanpassingen bespreken? Neem gerust contact met ons op. Wij staan klaar om u te helpen bij de realisatie van uw stukadoorsproject!</p>
          </div>
          
          <div class="footer">
            <div class="company">Met vriendelijke groet,<br>Refurbish Totaal Nederland</div>
            <div class="details">📧 info@refurbishtotaalnederland.nl</div>
            <div class="details">📞 +085 44 44 255</div>
            <div class="details">🌐 www.refurbishtotaalnederland.nl</div>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: "Refurbish Totaal Nederland <noreply@refurbishtotaalnederland.nl>",
      to: [customerData.emailadres],
      subject: "Bevestiging stukadoorswerk aanvraag",
      html: customerEmailHtml,
    });

    // Send detailed notification to admin emails with SAME colors as customer template
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .header .subtitle { margin: 10px 0 0 0; font-size: 18px; opacity: 0.9; }
          .content { padding: 30px; }
          .greeting { font-size: 18px; margin-bottom: 20px; color: #333; }
          .section { margin: 25px 0; }
          .section h3 { color: #059669; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #10b981; padding-bottom: 5px; }
          .details { background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .details ul { margin: 0; padding-left: 20px; }
          .details li { margin: 5px 0; color: #555; }
          .details p { margin: 5px 0; color: #555; }
          .price-box { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .price-box .label { font-size: 18px; margin-bottom: 10px; opacity: 0.9; }
          .price-box .amount { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
          .price-box .note { font-size: 14px; opacity: 0.8; }
          .included { background-color: #f0fdf4; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .included h4 { color: #059669; margin: 0 0 10px 0; }
          .included ul { margin: 0; padding-left: 20px; }
          .included li { color: #059669; margin: 5px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer .company { color: #10b981; font-weight: bold; font-size: 18px; }
          .footer .details { color: #6b7280; font-size: 14px; margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔨 Nieuwe Stukadoorswerk Aanvraag</h1>
            <div class="subtitle">Admin Notificatie</div>
          </div>
          
          <div class="content">
            <div class="greeting">Nieuwe aanvraag ontvangen van ${customerData.voornaam} ${customerData.achternaam}</div>
            
            <div class="section">
              <h3>📋 Overzicht van de configuratie</h3>
              
              <div class="details">
                <p><strong>Bouwtype:</strong> ${formatFieldName(formData.bouw_type)}</p>
                <p><strong>Stucwerk type:</strong> ${formatFieldName(formData.stuc_type)}</p>
                <p><strong>Wand oppervlakte:</strong> ${formData.oppervlakte_wanden}m²</p>
                <p><strong>Plafond oppervlakte:</strong> ${formData.oppervlakte_plafonds}m²</p>
                <p><strong>Isolatie:</strong> ${formData.isolatie_gewenst ? 'Gewenst' : 'Niet gewenst'}</p>
                ${formData.uitvoertermijn ? `<p><strong>Uitvoertermijn:</strong> ${formData.uitvoertermijn}</p>` : ''}
                ${formData.reden_aanvraag ? `<p><strong>Reden aanvraag:</strong> ${formData.reden_aanvraag}</p>` : ''}
                ${formData.bericht ? `<p><strong>Bericht:</strong> ${formData.bericht}</p>` : ''}
              </div>
            </div>

            <div class="section">
              <h3>👤 Contactgegevens klant:</h3>
              <div class="details">
                <ul>
                  <li><strong>Naam:</strong> ${customerData.voornaam} ${customerData.achternaam}</li>
                  <li><strong>E-mail:</strong> ${customerData.emailadres}</li>
                  <li><strong>Telefoon:</strong> ${customerData.telefoon}</li>
                  <li><strong>Adres:</strong> ${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}</li>
                </ul>
              </div>
            </div>

            <div class="price-box">
              <div class="label">💰 Totaalprijs:</div>
              <div class="amount">€${totalPrice.toLocaleString()}</div>
              <div class="note">Prijsindicatie inclusief BTW</div>
            </div>

            <div class="included">
              <h4>✅ Inbegrepen in de prijs:</h4>
              <ul>
                <li>Complete levering en verwerking van hoogwaardige stucmaterialen</li>
                <li>Professionele voorbehandeling van het oppervlak</li>
                <li>Vakkundige afwerking door ervaren stukadoors</li>
                <li>Opruimen en schoonmaken na afloop</li>
                <li>Garantie op het uitgevoerde werk</li>
                <li>Deskundig advies over afwerking en textuur</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <div class="company">Admin Notificatie<br>Refurbish Totaal Nederland</div>
            <div class="details">Neem zo snel mogelijk contact op met de klant!</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmails = ['info@refurbishtotaalnederland.nl', 'mazenaddas95@gmail.com'];
    
    for (const email of adminEmails) {
      await resend.emails.send({
        from: `Nieuwe Stukadoorswerk Aanvraag <noreply@refurbishtotaalnederland.nl>`,
        to: [email],
        subject: `Nieuwe stukadoorswerk aanvraag van ${customerData.voornaam} ${customerData.achternaam} - €${totalPrice.toLocaleString()}`,
        html: adminEmailHtml,
        reply_to: customerData.emailadres
      });
    }

    console.log('✅ Stukadoor emails sent successfully');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error('❌ Stukadoor request error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
