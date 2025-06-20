
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting nurture flow check...');

    // Get current date minus intervals
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Check dakkapel requests for first reminder (2 days)
    const { data: firstReminderDakkapel, error: error1 } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .eq('status', 'offerte_verzonden')
      .lte('offerte_verzonden_op', twoDaysAgo)
      .is('reminder_1_verzonden_op', null);

    if (firstReminderDakkapel && firstReminderDakkapel.length > 0) {
      console.log(`Found ${firstReminderDakkapel.length} dakkapel requests for first reminder`);
      
      for (const request of firstReminderDakkapel) {
        await sendFirstReminder(request, 'dakkapel');
        await supabase
          .from('dakkapel_calculator_aanvragen')
          .update({ reminder_1_verzonden_op: new Date().toISOString() })
          .eq('id', request.id);
      }
    }

    // Check zonnepaneel requests for first reminder (2 days)
    const { data: firstReminderZonnepaneel, error: error2 } = await supabase
      .from('refurbished_zonnepanelen')
      .select('*')
      .eq('status', 'offerte_verzonden')
      .lte('offerte_verzonden_op', twoDaysAgo)
      .is('reminder_1_verzonden_op', null);

    if (firstReminderZonnepaneel && firstReminderZonnepaneel.length > 0) {
      console.log(`Found ${firstReminderZonnepaneel.length} zonnepaneel requests for first reminder`);
      
      for (const request of firstReminderZonnepaneel) {
        await sendFirstReminder(request, 'zonnepaneel');
        await supabase
          .from('refurbished_zonnepanelen')
          .update({ reminder_1_verzonden_op: new Date().toISOString() })
          .eq('id', request.id);
      }
    }

    // Check for second reminder (5 days)
    const { data: secondReminderDakkapel, error: error3 } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .eq('status', 'offerte_verzonden')
      .lte('offerte_verzonden_op', fiveDaysAgo)
      .is('reminder_2_verzonden_op', null)
      .not('reminder_1_verzonden_op', 'is', null);

    if (secondReminderDakkapel && secondReminderDakkapel.length > 0) {
      console.log(`Found ${secondReminderDakkapel.length} dakkapel requests for second reminder`);
      
      for (const request of secondReminderDakkapel) {
        await sendSecondReminder(request, 'dakkapel');
        await supabase
          .from('dakkapel_calculator_aanvragen')
          .update({ reminder_2_verzonden_op: new Date().toISOString() })
          .eq('id', request.id);
      }
    }

    const { data: secondReminderZonnepaneel, error: error4 } = await supabase
      .from('refurbished_zonnepanelen')
      .select('*')
      .eq('status', 'offerte_verzonden')
      .lte('offerte_verzonden_op', fiveDaysAgo)
      .is('reminder_2_verzonden_op', null)
      .not('reminder_1_verzonden_op', 'is', null);

    if (secondReminderZonnepaneel && secondReminderZonnepaneel.length > 0) {
      console.log(`Found ${secondReminderZonnepaneel.length} zonnepaneel requests for second reminder`);
      
      for (const request of secondReminderZonnepaneel) {
        await sendSecondReminder(request, 'zonnepaneel');
        await supabase
          .from('refurbished_zonnepanelen')
          .update({ reminder_2_verzonden_op: new Date().toISOString() })
          .eq('id', request.id);
      }
    }

    // Check for third reminder (7+ days)
    const { data: thirdReminderDakkapel, error: error5 } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .eq('status', 'offerte_verzonden')
      .lte('offerte_verzonden_op', sevenDaysAgo)
      .is('reminder_3_verzonden_op', null)
      .not('reminder_2_verzonden_op', 'is', null);

    if (thirdReminderDakkapel && thirdReminderDakkapel.length > 0) {
      console.log(`Found ${thirdReminderDakkapel.length} dakkapel requests for third reminder`);
      
      for (const request of thirdReminderDakkapel) {
        await sendThirdReminder(request, 'dakkapel');
        await supabase
          .from('dakkapel_calculator_aanvragen')
          .update({ reminder_3_verzonden_op: new Date().toISOString() })
          .eq('id', request.id);
      }
    }

    const { data: thirdReminderZonnepaneel, error: error6 } = await supabase
      .from('refurbished_zonnepanelen')
      .select('*')
      .eq('status', 'offerte_verzonden')
      .lte('offerte_verzonden_op', sevenDaysAgo)
      .is('reminder_3_verzonden_op', null)
      .not('reminder_2_verzonden_op', 'is', null);

    if (thirdReminderZonnepaneel && thirdReminderZonnepaneel.length > 0) {
      console.log(`Found ${thirdReminderZonnepaneel.length} zonnepaneel requests for third reminder`);
      
      for (const request of thirdReminderZonnepaneel) {
        await sendThirdReminder(request, 'zonnepaneel');
        await supabase
          .from('refurbished_zonnepanelen')
          .update({ reminder_3_verzonden_op: new Date().toISOString() })
          .eq('id', request.id);
      }
    }

    console.log('Nurture flow check completed successfully');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Nurture flow executed successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error: any) {
    console.error('Error in nurture flow:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};

async function sendFirstReminder(request: any, type: 'dakkapel' | 'zonnepaneel') {
  const customerName = type === 'dakkapel' ? 
    `${request.voornaam} ${request.achternaam}` : 
    request.naam;
  
  const customerEmail = type === 'dakkapel' ? 
    request.emailadres : 
    request.email;

  const projectType = type === 'dakkapel' ? 'dakkapel' : 'zonnepanelen';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #10b981; margin: 0;">Refurbish Totaal Nederland</h1>
        <p style="color: #666; margin: 5px 0 0 0;">Uw offerte wacht nog op u</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Beste ${customerName},</h2>
        
        <p style="color: #666; line-height: 1.6;">
          Een paar dagen geleden hebben wij u een offerte voor uw ${projectType} project gestuurd. 
          Wij wilden graag even checken of u de offerte heeft ontvangen en of u nog vragen heeft.
        </p>
        
        <p style="color: #666; line-height: 1.6;">
          Heeft u de offerte nog niet kunnen bekijken? Geen probleem! 
          Wij begrijpen dat zulke belangrijke beslissingen tijd kosten.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://refurbishtotaalnederland.nl/interesse-bevestiging?id=${request.id}&type=${type}" 
             style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
            Ik heb interesse
          </a>
          <a href="https://refurbishtotaalnederland.nl/contact" 
             style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
            Stel een vraag
          </a>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          Heeft u vragen over de offerte? Wij helpen u graag verder!
        </p>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 14px; margin-top: 30px;">
        <p>Met vriendelijke groet,</p>
        <p><strong>Gerard Groeneveld</strong><br>
        Refurbish Totaal Nederland<br>
        085 4444 255 | info@refurbishtotaalnederland.nl</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Gerard Groeneveld <info@refurbishtotaalnederland.nl>",
      to: [customerEmail],
      subject: `Herinnering: Uw ${projectType} offerte - Heeft u vragen?`,
      html: emailHtml,
    });
    
    console.log(`First reminder sent to ${customerEmail}`);
  } catch (error) {
    console.error(`Failed to send first reminder to ${customerEmail}:`, error);
  }
}

async function sendSecondReminder(request: any, type: 'dakkapel' | 'zonnepaneel') {
  const customerName = type === 'dakkapel' ? 
    `${request.voornaam} ${request.achternaam}` : 
    request.naam;
  
  const customerEmail = type === 'dakkapel' ? 
    request.emailadres : 
    request.email;

  const projectType = type === 'dakkapel' ? 'dakkapel' : 'zonnepanelen';
  const phoneNumber = "085 4444 255";

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #10b981; margin: 0;">Refurbish Totaal Nederland</h1>
        <p style="color: #666; margin: 5px 0 0 0;">Persoonlijk contact gewenst?</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Beste ${customerName},</h2>
        
        <p style="color: #666; line-height: 1.6;">
          Onze offerte voor uw ${projectType} project ligt al een tijdje klaar. 
          Misschien heeft u nog vragen of twijfels waar wij u mee kunnen helpen?
        </p>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #1976d2; margin: 0; font-weight: bold;">💡 Liever even bellen?</p>
          <p style="color: #1976d2; margin: 10px 0 0 0;">
            Wij begrijpen dat een ${projectType} project een grote investering is. 
            Graag bespreken we uw wensen persoonlijk door!
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="tel:${phoneNumber}" 
             style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px; font-weight: bold;">
            📞 Bel direct: ${phoneNumber}
          </a>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://refurbishtotaalnederland.nl/interesse-bevestiging?id=${request.id}&type=${type}" 
             style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
            Ik heb interesse
          </a>
          <a href="https://refurbishtotaalnederland.nl/contact" 
             style="background: #6b7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
            Email contact
          </a>
        </div>
        
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          <strong>Geen tijd voor een gesprek?</strong> Geen probleem! 
          U kunt ook via email uw vragen stellen of aangeven wanneer het u uitkomt.
        </p>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 14px; margin-top: 30px;">
        <p>Met vriendelijke groet,</p>
        <p><strong>Gerard Groeneveld</strong><br>
        Refurbish Totaal Nederland<br>
        085 4444 255 | info@refurbishtotaalnederland.nl</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Gerard Groeneveld <info@refurbishtotaalnederland.nl>",
      to: [customerEmail],
      subject: `Liever even bellen? Uw ${projectType} offerte bespreek ik graag persoonlijk`,
      html: emailHtml,
    });
    
    console.log(`Second reminder sent to ${customerEmail}`);
  } catch (error) {
    console.error(`Failed to send second reminder to ${customerEmail}:`, error);
  }
}

async function sendThirdReminder(request: any, type: 'dakkapel' | 'zonnepaneel') {
  const customerName = type === 'dakkapel' ? 
    `${request.voornaam} ${request.achternaam}` : 
    request.naam;
  
  const customerEmail = type === 'dakkapel' ? 
    request.emailadres : 
    request.email;

  const projectType = type === 'dakkapel' ? 'dakkapel' : 'zonnepanelen';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #10b981; margin: 0;">Refurbish Totaal Nederland</h1>
        <p style="color: #dc2626; margin: 5px 0 0 0; font-weight: bold;">⏰ Laatste herinnering</p>
      </div>
      
      <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
        <h2 style="color: #333; margin-top: 0;">Beste ${customerName},</h2>
        
        <p style="color: #666; line-height: 1.6;">
          Dit is onze laatste herinnering betreffende uw ${projectType} offerte.
        </p>
        
        <div style="background: #fee2e2; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
          <p style="color: #dc2626; margin: 0; font-weight: bold; font-size: 18px;">
            ⚠️ Offerte verloopt over 2 dagen
          </p>
          <p style="color: #dc2626; margin: 10px 0 0 0;">
            Na deze datum zijn de genoemde prijzen mogelijk niet meer geldig
          </p>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          <strong>Waarom deze urgentie?</strong><br>
          Materiaalkosten en planning veranderen regelmatig. Om u de beste prijs te kunnen garanderen, 
          hebben onze offertes een beperkte geldigheid.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://refurbishtotaalnederland.nl/interesse-bevestiging?id=${request.id}&type=${type}" 
             style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px; font-weight: bold; font-size: 16px;">
            ✅ Ja, ik wil doorgaan
          </a>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="tel:085 4444 255" 
             style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
            📞 Snel bellen: 085 4444 255
          </a>
          <a href="https://refurbishtotaalnederland.nl/contact" 
             style="background: #6b7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
            Email contact
          </a>
        </div>
        
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          <strong>Geen interesse meer?</strong> Dan hoeft u niets te doen. 
          Na het verlopen van de offerte nemen wij geen contact meer op.
        </p>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 14px; margin-top: 30px;">
        <p>Met vriendelijke groet,</p>
        <p><strong>Gerard Groeneveld</strong><br>
        Refurbish Totaal Nederland<br>
        085 4444 255 | info@refurbishtotaalnederland.nl</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Gerard Groeneveld <info@refurbishtotaalnederland.nl>",
      to: [customerEmail],
      subject: `🚨 LAATSTE HERINNERING: Uw ${projectType} offerte verloopt over 2 dagen`,
      html: emailHtml,
    });
    
    console.log(`Third reminder sent to ${customerEmail}`);
  } catch (error) {
    console.error(`Failed to send third reminder to ${customerEmail}:`, error);
  }
}

serve(handler);
