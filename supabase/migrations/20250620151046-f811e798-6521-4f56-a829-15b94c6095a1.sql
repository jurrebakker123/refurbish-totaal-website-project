
-- Create database trigger function for automatic email sending when new dakkapel request is inserted
CREATE OR REPLACE FUNCTION public.handle_new_dakkapel_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the handle-dakkapel-calculator-request edge function via HTTP request
  PERFORM
    net.http_post(
      url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/handle-dakkapel-calculator-request',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDIxNTEsImV4cCI6MjA2MzU3ODE1MX0.vgmnDOcff2-I-ji4r51cKKCjl4w4FcMQHsoZJqlPxRA'
      ),
      body := jsonb_build_object(
        'record', row_to_json(NEW)
      )
    );
  
  RETURN NEW;
END;
$$;

-- Create the trigger that fires when a new row is inserted into dakkapel_calculator_aanvragen
DROP TRIGGER IF EXISTS trigger_new_dakkapel_request ON dakkapel_calculator_aanvragen;
CREATE TRIGGER trigger_new_dakkapel_request
  AFTER INSERT ON dakkapel_calculator_aanvragen
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_dakkapel_request();

-- Enable the pg_net extension if not already enabled (needed for HTTP requests from database)
CREATE EXTENSION IF NOT EXISTS pg_net;
