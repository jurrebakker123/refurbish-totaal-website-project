
-- Create a function that will be called by the trigger
CREATE OR REPLACE FUNCTION handle_new_dakkapel_request()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the auto-send-quote edge function via HTTP request
  PERFORM
    net.http_post(
      url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDIxNTEsImV4cCI6MjA2MzU3ODE1MX0.vgmnDOcff2-I-ji4r51cKKCjl4w4FcMQHsoZJqlPxRA'
      ),
      body := jsonb_build_object(
        'requestId', NEW.id::text,
        'type', 'dakkapel'
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger that fires after insert
CREATE OR REPLACE TRIGGER trigger_new_dakkapel_request
  AFTER INSERT ON public.dakkapel_calculator_aanvragen
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_dakkapel_request();
