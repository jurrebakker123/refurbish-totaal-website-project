
-- Verwijder de oude cron job eerst
SELECT cron.unschedule('auto-send-quotes-every-15-minutes');

-- Maak een nieuwe cron job met de JUISTE service role key
SELECT cron.schedule(
    'auto-send-quotes-every-15-minutes',
    '*/15 * * * *',
    $$
    SELECT
      net.http_post(
          url:='https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
          headers:=jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODAwMjE1MSwiZXhwIjoyMDYzNTc4MTUxfQ.dQw4w9WgXcQ_LCHpqxJLIEpTbgs2G1QiOiNGRlOCR8k'
          ),
          body:='{"scheduled": true}'::jsonb
      ) as request_id;
    $$
);

-- Test de functie direct met de juiste key
SELECT net.http_post(
    url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODAwMjE1MSwiZXhwIjoyMDYzNTc4MTUxfQ.dQw4w9WgXcQ_LCHpqxJLIEpTbgs2G1QiOiNGRlOCR8k'
    ),
    body := '{"scheduled": true}'::jsonb
) as request_id;
