-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('configurator-uploads', 'configurator-uploads', false);

-- Create storage policies for file uploads and access
CREATE POLICY "Allow authenticated uploads for configurator files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'configurator-uploads');

CREATE POLICY "Allow public read access for configurator files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'configurator-uploads');

CREATE POLICY "Allow authenticated update for configurator files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'configurator-uploads');

-- Add file_url columns to all configurator tables
ALTER TABLE dakkapel_calculator_aanvragen ADD COLUMN file_url TEXT;
ALTER TABLE dakkapel_configuraties ADD COLUMN file_url TEXT;
ALTER TABLE schilder_aanvragen ADD COLUMN file_url TEXT;
ALTER TABLE stukadoor_aanvragen ADD COLUMN file_url TEXT;
ALTER TABLE refurbished_zonnepanelen ADD COLUMN file_url TEXT;