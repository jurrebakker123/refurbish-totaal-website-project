
-- Update RLS policies to allow public read access for admin dashboard
-- This will allow the dashboard to read the data without authentication

-- Update schilder_aanvragen policies
DROP POLICY IF EXISTS "Admins can read all schilder_aanvragen" ON schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can update schilder_aanvragen" ON schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can delete schilder_aanvragen" ON schilder_aanvragen;

CREATE POLICY "Allow public read access for schilder_aanvragen" 
  ON schilder_aanvragen 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public update access for schilder_aanvragen" 
  ON schilder_aanvragen 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete access for schilder_aanvragen" 
  ON schilder_aanvragen 
  FOR DELETE 
  USING (true);

-- Update stukadoor_aanvragen policies
DROP POLICY IF EXISTS "Admins can read all stukadoor_aanvragen" ON stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can update stukadoor_aanvragen" ON stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can delete stukadoor_aanvragen" ON stukadoor_aanvragen;

CREATE POLICY "Allow public read access for stukadoor_aanvragen" 
  ON stukadoor_aanvragen 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public update access for stukadoor_aanvragen" 
  ON stukadoor_aanvragen 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete access for stukadoor_aanvragen" 
  ON stukadoor_aanvragen 
  FOR DELETE 
  USING (true);

-- Update dakkapel_calculator_aanvragen policies for consistency
DROP POLICY IF EXISTS "Admins can read all calculator_aanvragen" ON dakkapel_calculator_aanvragen;
DROP POLICY IF EXISTS "Admins can update calculator_aanvragen" ON dakkapel_calculator_aanvragen;
DROP POLICY IF EXISTS "Admins can delete calculator_aanvragen" ON dakkapel_calculator_aanvragen;

CREATE POLICY "Allow public read access for calculator_aanvragen" 
  ON dakkapel_calculator_aanvragen 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public update access for calculator_aanvragen" 
  ON dakkapel_calculator_aanvragen 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete access for calculator_aanvragen" 
  ON dakkapel_calculator_aanvragen 
  FOR DELETE 
  USING (true);
