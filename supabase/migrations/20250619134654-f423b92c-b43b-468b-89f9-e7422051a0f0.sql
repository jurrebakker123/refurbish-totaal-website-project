
-- Verwijder de oude cron job eerst
SELECT cron.unschedule('auto-send-quotes-every-15-minutes');

-- Maak een nieuwe cron job met de juiste service role key
SELECT cron.schedule(
    'auto-send-quotes-every-15-minutes',
    '*/15 * * * *',
    $$
    SELECT
      net.http_post(
          url:='https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
          headers:=jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
          ),
          body:='{"scheduled": true}'::jsonb
      ) as request_id;
    $$
);

-- Test de functie handmatig met de service role key
SELECT net.http_post(
    url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/auto-send-quote-batch',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := '{"scheduled": true}'::jsonb
) as request_id;
