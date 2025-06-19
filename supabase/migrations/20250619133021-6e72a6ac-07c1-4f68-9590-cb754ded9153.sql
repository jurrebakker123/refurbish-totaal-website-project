
-- Enable the pg_cron extension to allow scheduled functions
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable the pg_net extension to make HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a cron job that runs every 15 minutes to send automatic quotes
SELECT cron.schedule(
    'auto-send-quotes-every-15-minutes',
    '*/15 * * * *', -- Every 15 minutes
    $$
    SELECT
      net.http_post(
          url:='https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDIxNTEsImV4cCI6MjA2MzU3ODE1MX0.vgmnDOcff2-I-ji4r51cKKCjl4w4FcMQHsoZJqlPxRA"}'::jsonb,
          body:='{"scheduled": true}'::jsonb
      ) as request_id;
    $$
);
