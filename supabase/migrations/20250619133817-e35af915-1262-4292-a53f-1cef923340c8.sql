
-- Controleer of de cron job correct is ingesteld
SELECT * FROM cron.job WHERE jobname = 'auto-send-quotes-every-15-minutes';

-- Test de edge function handmatig door hem direct aan te roepen
SELECT net.http_post(
    url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDIxNTEsImV4cCI6MjA2MzU3ODE1MX0.vgmnDOcff2-I-js4r51cKKCjl4w4FcMQHsoZJqlPxRA"}'::jsonb,
    body := '{"scheduled": true}'::jsonb
) as request_id;
