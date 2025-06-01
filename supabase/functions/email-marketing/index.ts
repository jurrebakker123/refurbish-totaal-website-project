
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailCampaign {
  subject: string;
  content: string;
  recipientType: 'all' | 'dakkapel' | 'zonnepaneel' | 'custom';
  customEmails?: string[];
  templateId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { campaign, action } = await req.json();
    
    console.log('Email marketing action:', action, 'Template ID:', campaign.templateId);

    if (action === 'send_campaign') {
      let recipients: string[] = [];

      // Get recipients based on type
      if (campaign.recipientType === 'all') {
        // Get all customer emails from both tables
        const { data: dakkapelCustomers } = await supabase
          .from('dakkapel_configuraties')
          .select('email')
          .neq('email', null);
        
        const { data: zonnepaneelCustomers } = await supabase
          .from('refurbished_zonnepanelen')
          .select('email')
          .neq('email', null);

        const allEmails = [
          ...(dakkapelCustomers || []).map(c => c.email),
          ...(zonnepaneelCustomers || []).map(c => c.email)
        ];
        
        recipients = [...new Set(allEmails)]; // Remove duplicates
      } else if (campaign.recipientType === 'dakkapel') {
        const { data: customers } = await supabase
          .from('dakkapel_configuraties')
          .select('email')
          .neq('email', null);
        
        recipients = (customers || []).map(c => c.email);
      } else if (campaign.recipientType === 'zonnepaneel') {
        const { data: customers } = await supabase
          .from('refurbished_zonnepanelen')
          .select('email')
          .neq('email', null);
        
        recipients = (customers || []).map(c => c.email);
      } else if (campaign.recipientType === 'custom') {
        recipients = campaign.customEmails || [];
      }

      console.log(`Sending campaign to ${recipients.length} recipients using template: ${campaign.templateId || 'custom'}`);

      // Send emails in batches to avoid rate limits
      const batchSize = 10;
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        
        try {
          // Use the provided content directly (could be from template or custom)
          const emailContent = campaign.content || `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Refurbish Totaal Nederland</h2>
              <p>Er is geen specifieke inhoud opgegeven voor deze e-mail.</p>
              <hr style="margin: 20px 0;">
              <p style="font-size: 12px; color: #666;">
                Dit bericht is verzonden door Refurbish Totaal Nederland<br>
                Telefoon: 085 4444 255 | Email: info@refurbishtotaalnederland.nl
              </p>
            </div>
          `;

          await resend.emails.send({
            from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
            to: batch,
            subject: campaign.subject,
            html: emailContent,
          });
          
          successCount += batch.length;
          console.log(`Successfully sent batch ${Math.floor(i/batchSize) + 1} to ${batch.length} recipients`);
        } catch (error) {
          console.error('Error sending batch:', error);
          errorCount += batch.length;
        }
        
        // Add small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Log campaign results
      console.log(`Campaign completed: ${successCount} successful, ${errorCount} failed`);

      return new Response(JSON.stringify({ 
        success: true, 
        successCount,
        errorCount,
        templateUsed: campaign.templateId || 'custom',
        message: `Campagne "${campaign.subject}" verzonden naar ${successCount} ontvangers`
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Unknown action' 
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in email marketing function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
};

serve(handler);
