
-- Add reminder tracking columns to dakkapel_calculator_aanvragen
ALTER TABLE dakkapel_calculator_aanvragen 
ADD COLUMN IF NOT EXISTS reminder_1_verzonden_op timestamp with time zone,
ADD COLUMN IF NOT EXISTS reminder_2_verzonden_op timestamp with time zone,
ADD COLUMN IF NOT EXISTS reminder_3_verzonden_op timestamp with time zone;

-- Add reminder tracking columns to refurbished_zonnepanelen
ALTER TABLE refurbished_zonnepanelen 
ADD COLUMN IF NOT EXISTS reminder_1_verzonden_op timestamp with time zone,
ADD COLUMN IF NOT EXISTS reminder_2_verzonden_op timestamp with time zone,
ADD COLUMN IF NOT EXISTS reminder_3_verzonden_op timestamp with time zone;
