
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const requestId = url.searchParams.get('id');
    const response = url.searchParams.get('response');
    const type = url.searchParams.get('type') || 'configurator';

    console.log('Interest response received:', { requestId, response, type });

    if (!requestId || !response) {
      return new Response('Missing parameters', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Initialize Supabase client with service role key for database updates
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
      return new Response('Server configuration error', { 
        status: 500, 
        headers: corsHeaders 
      });
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Determine table and new status based on response and type
    let table: string;
    let newStatus: string;
    
    if (type === 'zonnepaneel') {
      table = 'refurbished_zonnepanelen';
    } else {
      table = 'dakkapel_configuraties';
    }

    if (response === 'ja') {
      newStatus = 'interesse_bevestigd';
    } else if (response === 'nee') {
      newStatus = 'niet_akkoord';
    } else {
      return new Response('Invalid response', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log(`Updating ${table} with ID ${requestId} to status: ${newStatus}`);

    // Update the request status
    const updateData: any = {
      status: newStatus,
      updated_at: new Date().toISOString()
    };

    // Add timestamp for interest confirmation
    if (newStatus === 'interesse_bevestigd') {
      updateData.interest_response_at = new Date().toISOString();
    }

    const { error: updateError } = await supabaseClient
      .from(table)
      .update(updateData)
      .eq('id', requestId);

    if (updateError) {
      console.error('Error updating status:', updateError);
      return new Response('Database error', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    console.log(`Status successfully updated to: ${newStatus} for request: ${requestId}`);

    // Create a success page HTML instead of redirect
    const successHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bedankt voor uw reactie</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 50px auto; 
            padding: 20px; 
            text-align: center; 
            background-color: #f5f5f5;
          }
          .container {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .success { color: #059669; font-size: 24px; margin-bottom: 20px; }
          .error { color: #dc3545; font-size: 24px; margin-bottom: 20px; }
          .btn { 
            display: inline-block; 
            background-color: #059669; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 8px; 
            margin-top: 20px;
          }
          .btn:hover { background-color: #047857; }
        </style>
      </head>
      <body>
        <div class="container">
          ${response === 'ja' ? 
            `<div class="success">✓ Bedankt! Uw interesse is geregistreerd.</div>
             <p>We nemen binnenkort contact met u op voor de vervolgstappen.</p>` :
            `<div class="error">Bedankt voor uw reactie.</div>
             <p>Mocht u nog vragen hebben, neem dan gerust contact met ons op.</p>`
          }
          <a href="https://refurbishtotaalnederland.nl" class="btn">Terug naar website</a>
        </div>
      </body>
      </html>
    `;

    return new Response(successHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in handle-interest-response function:", error);
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
};

serve(handler);
