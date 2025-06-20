
-- Create a cron job to run the nurture flow daily at 9:00 AM
SELECT cron.schedule(
  'nurture-flow-daily',
  '0 9 * * *', -- Daily at 9:00 AM
  $$
  SELECT net.http_post(
    url := 'https://pluhasunoaevfrdugkzg.supabase.co/functions/v1/nurture-flow',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdWhhc3Vub2FldmZyZHVna3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDIxNTEsImV4cCI6MjA2MzU3ODE1MX0.vgmnDOcff2-I-ji4r51cKKCjl4w4FcMQHsoZJqlPxRA"}'::jsonb,
    body := '{"trigger": "cron"}'::jsonb
  ) as request_id;
  $$
);
