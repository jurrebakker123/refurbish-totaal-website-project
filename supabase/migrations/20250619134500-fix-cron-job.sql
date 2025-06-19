
-- Verwijder de oude cron job eerst
SELECT cron.unschedule('auto-send-quotes-every-15-minutes');

-- Maak een nieuwe cron job met de juiste service role key
SELECT cron.schedule(
    'auto-send-quotes-every-15-minutes',
    '*/15 * * * *', -- Elke 15 minuten
    $$
    SELECT
      net.http_post(
          url:='https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
          body:='{"scheduled": true}'::jsonb
      ) as request_id;
    $$
);

-- Test de functie opnieuw met de service role key
SELECT net.http_post(
    url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
    body := '{"scheduled": true}'::jsonb
) as request_id;
