
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
      newStatus = 'akkoord';
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
    const { error: updateError } = await supabaseClient
      .from(table)
      .update({
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (updateError) {
      console.error('Error updating status:', updateError);
      return new Response('Database error', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    console.log(`Status successfully updated to: ${newStatus} for request: ${requestId}`);

    // Determine redirect URL based on type and response
    let redirectUrl: string;
    
    if (type === 'zonnepaneel') {
      redirectUrl = 'https://refurbishtotaalnederland.nl/zonnepanelen';
    } else {
      redirectUrl = 'https://refurbishtotaalnederland.nl/dakkapel';
    }

    // Create redirect response
    return new Response(null, {
      status: 302,
      headers: {
        "Location": redirectUrl,
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
