
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendCombinedQuoteRequest {
  requestId: string;
  type: 'configurator' | 'zonnepaneel';
  customMessage?: string;
  sendEmail?: boolean;
  sendWhatsApp?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing combined quote request (Email + WhatsApp)...");

    const requestBody = await req.json();
    const { requestId, type, customMessage, sendEmail = true, sendWhatsApp = true }: SendCombinedQuoteRequest = requestBody;
    
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

    const results = {
      email: { success: false, message: '', error: '' },
      whatsapp: { success: false, message: '', error: '' }
    };

    // Initialize Supabase client for making function calls
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

    // Send Email Quote
    if (sendEmail) {
      try {
        const { data: emailData, error: emailError } = await supabaseClient.functions.invoke('send-quote', {
          body: { requestId, type, customMessage }
        });

        if (emailError) {
          results.email.error = emailError.message;
        } else if (emailData?.success) {
          results.email.success = true;
          results.email.message = 'Email offerte verzonden';
        } else {
          results.email.error = emailData?.error || 'Onbekende email fout';
        }
      } catch (error: any) {
        results.email.error = error.message;
      }
    }

    // Send WhatsApp Quote
    if (sendWhatsApp) {
      try {
        const { data: whatsappData, error: whatsappError } = await supabaseClient.functions.invoke('send-quote-whatsapp', {
          body: { requestId, type, customMessage }
        });

        if (whatsappError) {
          results.whatsapp.error = whatsappError.message;
        } else if (whatsappData?.success) {
          results.whatsapp.success = true;
          results.whatsapp.message = 'WhatsApp offerte verzonden';
        } else {
          results.whatsapp.error = whatsappData?.error || 'Onbekende WhatsApp fout';
        }
      } catch (error: any) {
        results.whatsapp.error = error.message;
      }
    }

    const overallSuccess = (!sendEmail || results.email.success) && (!sendWhatsApp || results.whatsapp.success);
    
    return new Response(JSON.stringify({ 
      success: overallSuccess,
      results,
      message: overallSuccess ? 'Offertes succesvol verzonden' : 'Er zijn fouten opgetreden bij het verzenden'
    }), {
      status: overallSuccess ? 200 : 207, // 207 = Multi-Status
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Unexpected error in send-quote-combined function:", error);
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
