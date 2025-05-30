
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

    // Create a beautiful success page HTML
    const successHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <title>Bedankt voor uw reactie - Refurbish Totaal Nederland</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          
          .container {
            background: white;
            max-width: 600px;
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            text-align: center;
          }
          
          .header {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            padding: 40px 30px;
            color: white;
          }
          
          .logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          
          .subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
          }
          
          .content {
            padding: 50px 30px;
          }
          
          .icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
            background: ${response === 'ja' ? '#059669' : '#6b7280'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: white;
          }
          
          .title {
            font-size: 32px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            line-height: 1.2;
          }
          
          .message {
            font-size: 18px;
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 40px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
          }
          
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(5, 150, 105, 0.4);
          }
          
          .contact-info {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
          }
          
          .contact-title {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
          }
          
          .contact-details {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
          }
          
          .contact-item {
            margin-bottom: 4px;
          }
          
          @media (max-width: 640px) {
            .container {
              margin: 10px;
              border-radius: 16px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .content {
              padding: 40px 20px;
            }
            
            .title {
              font-size: 28px;
            }
            
            .message {
              font-size: 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Refurbish Totaal Nederland</div>
            <div class="subtitle">Uw partner in duurzame renovatie</div>
          </div>
          
          <div class="content">
            <div class="icon">
              ${response === 'ja' ? '✓' : '👋'}
            </div>
            
            <h1 class="title">
              ${response === 'ja' ? 'Bedankt voor uw interesse!' : 'Bedankt voor uw reactie!'}
            </h1>
            
            <p class="message">
              ${response === 'ja' ? 
                'Geweldig! Uw interesse is bij ons geregistreerd. Een van onze specialisten neemt binnen 24 uur contact met u op om de mogelijkheden te bespreken en een afspraak in te plannen.' :
                'Bedankt dat u de tijd heeft genomen om te reageren. Mocht u in de toekomst alsnog interesse hebben of vragen, dan staan wij altijd voor u klaar.'
              }
            </p>
            
            <a href="https://refurbishtotaalnederland.nl" class="btn">
              <span>→</span>
              Terug naar website
            </a>
            
            <div class="contact-info">
              <div class="contact-title">Contact</div>
              <div class="contact-details">
                <div class="contact-item">📞 085-1301578</div>
                <div class="contact-item">✉️ info@refurbishtotaalnederland.nl</div>
                <div class="contact-item">🌐 www.refurbishtotaalnederland.nl</div>
              </div>
            </div>
          </div>
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
