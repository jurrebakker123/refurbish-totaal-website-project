
-- Remove the old cron job
SELECT cron.unschedule('auto-send-quotes-every-15-minutes');

-- Create a new cron job that runs every 5 minutes and calls the correct function
SELECT cron.schedule(
    'auto-send-quotes-every-5-minutes',
    '*/5 * * * *', -- Every 5 minutes for faster processing
    $$
    SELECT
      net.http_post(
          url:='https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-simple',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDIxNTEsImV4cCI6MjA2MzU3ODE1MX0.vgmnDOcff2-I-ji4r51cKKCjl4w4FcMQHsoZJqlPxRA"}'::jsonb,
          body:='{"scheduled": true}'::jsonb
      ) as request_id;
    $$
);
