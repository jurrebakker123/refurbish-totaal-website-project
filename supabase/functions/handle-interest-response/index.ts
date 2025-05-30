
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

    // Return a user-friendly HTML page that auto-redirects
    const responseMessage = response === 'ja' 
      ? 'Bedankt voor uw bevestiging! We nemen zo spoedig mogelijk contact met u op voor de vervolgstappen.'
      : 'Bedankt voor uw reactie. We hebben uw melding ontvangen.';

    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reactie ontvangen</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: 50px auto; 
              padding: 20px; 
              text-align: center;
              background-color: #f9f9f9;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .success { color: #059669; }
            .logo { 
              color: #059669; 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 20px;
            }
            .countdown {
              color: #666;
              font-size: 14px;
              margin-top: 20px;
            }
          </style>
          <script>
            // Auto-redirect after 3 seconds
            let countdown = 3;
            function updateCountdown() {
              const countdownEl = document.getElementById('countdown');
              if (countdownEl) {
                countdownEl.textContent = countdown;
              }
              countdown--;
              if (countdown < 0) {
                // Try to close the window/tab, fallback to going back
                try {
                  window.close();
                  // If window.close() doesn't work, try going back
                  setTimeout(() => {
                    if (window.history.length > 1) {
                      window.history.back();
                    } else {
                      // Last resort: redirect to a generic page
                      window.location.href = 'about:blank';
                    }
                  }, 500);
                } catch (e) {
                  // Fallback if all else fails
                  if (window.history.length > 1) {
                    window.history.back();
                  }
                }
              } else {
                setTimeout(updateCountdown, 1000);
              }
            }
            window.onload = function() {
              updateCountdown();
            };
          </script>
        </head>
        <body>
          <div class="container">
            <div class="logo">Refurbish Totaal Nederland</div>
            <h2 class="success">✓ Reactie ontvangen!</h2>
            <p>${responseMessage}</p>
            <div class="countdown">
              Dit venster sluit automatisch over <span id="countdown">3</span> seconden...
            </div>
            <p><small>U kunt dit venster ook handmatig sluiten.</small></p>
          </div>
        </body>
      </html>
    `;

    return new Response(htmlResponse, {
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
