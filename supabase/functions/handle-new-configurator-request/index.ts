
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

console.log("=== HANDLE-NEW-CONFIGURATOR-REQUEST FUNCTION STARTED ===");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== NEW CONFIGURATOR REQUEST TRIGGER ===");
  console.log("Request method:", req.method);
  
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing new configurator request trigger...");
    const requestBody = await req.json();
    console.log("Trigger payload:", requestBody);
    
    // Get the new record data from the trigger
    const newRecord = requestBody.record;
    
    if (!newRecord || !newRecord.id) {
      console.error("No record data in trigger payload");
      return new Response(
        JSON.stringify({ success: false, error: "No record data" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    console.log("New configurator entry:", { id: newRecord.id, email: newRecord.email });
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ success: false, error: "Missing Supabase configuration" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    
    // Call the auto-send-quote function
    console.log("Calling auto-send-quote function...");
    
    const { data: emailData, error: emailError } = await supabaseClient.functions.invoke('auto-send-quote', {
      body: {
        requestId: newRecord.id,
        type: 'dakkapel'
      }
    });
    
    if (emailError) {
      console.error("❌ Auto-send-quote failed:", emailError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Email sending failed: ${emailError.message}` 
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    if (!emailData?.success) {
      console.error("❌ Auto-send-quote returned error:", emailData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Email sending failed: ${emailData?.error || 'Unknown error'}` 
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    console.log("✅ Automatic quote email sent successfully!");
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Automatic quote email sent successfully',
      requestId: newRecord.id
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error: any) {
    console.error("=== CRITICAL ERROR IN CONFIGURATOR TRIGGER ===", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Trigger error: ${error.message}`
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
