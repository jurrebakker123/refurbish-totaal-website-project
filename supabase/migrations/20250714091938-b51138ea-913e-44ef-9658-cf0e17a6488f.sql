-- Update default status for new requests to 'offerte_verzonden'
ALTER TABLE dakkapel_calculator_aanvragen ALTER COLUMN status SET DEFAULT 'offerte_verzonden';
ALTER TABLE dakkapel_configuraties ALTER COLUMN status SET DEFAULT 'offerte_verzonden';
ALTER TABLE schilder_aanvragen ALTER COLUMN status SET DEFAULT 'offerte_verzonden';  
ALTER TABLE stukadoor_aanvragen ALTER COLUMN status SET DEFAULT 'offerte_verzonden';
ALTER TABLE refurbished_zonnepanelen ALTER COLUMN status SET DEFAULT 'offerte_verzonden';