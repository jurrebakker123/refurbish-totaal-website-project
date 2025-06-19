
-- Verwijder alle oude cron jobs
SELECT cron.unschedule('auto-send-quotes-every-15-minutes');
SELECT cron.unschedule('auto-send-quotes-simple-every-15-minutes');  
SELECT cron.unschedule('auto-send-quotes-every-5-minutes');

-- Maak een nieuwe cron job met de correcte service role key
SELECT cron.schedule(
    'auto-send-quotes-working',
    '*/10 * * * *', -- Elke 10 minuten voor nu, sneller voor testing
    $$
    SELECT
      net.http_post(
          url:='https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-simple',
          headers:=jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODAwMjE1MSwiZXhwIjoyMDYzNTc4MTUxfQ.dQw4w9WgXcQ_LCHpqxJLIEpTbgs2G1QiOiNGRlOCR8k'
          ),
          body:='{"scheduled": true}'::jsonb
      ) as request_id;
    $$
);

-- Test de functie direct met de correcte headers
SELECT net.http_post(
    url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-simple',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODAwMjE1MSwiZXhwIjoyMDYzNTc4MTUxfQ.dQw4w9WgXcQ_LCHpqxJLIEpTbgs2G1QiOiNGRlOCR8k'
    ),
    body := '{"scheduled": true}'::jsonb
) as request_id;
