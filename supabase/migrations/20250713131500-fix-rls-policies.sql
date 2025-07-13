
-- Fix RLS policies to allow anonymous inserts for schilder_aanvragen
DROP POLICY IF EXISTS "Anyone can create a new schilder_aanvraag" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can read all schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can update schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can delete schilder_aanvragen" ON public.schilder_aanvragen;

-- Create policies that work for both anonymous users and admins
CREATE POLICY "Allow anonymous inserts for schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can select all schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "Admins can update schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "Admins can delete schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

-- Fix RLS policies to allow anonymous inserts for stukadoor_aanvragen
DROP POLICY IF EXISTS "Anyone can create a new stukadoor_aanvraag" ON public.stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can read all stukadoor_aanvragen" ON public.stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can update stukadoor_aanvragen" ON public.stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can delete stukadoor_aanvragen" ON public.stukadoor_aanvragen;

-- Create policies that work for both anonymous users and admins
CREATE POLICY "Allow anonymous inserts for stukadoor_aanvragen" 
  ON public.stukadoor_aanvragen 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can select all stukadoor_aanvragen" 
  ON public.stukadoor_aanvragen 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "Admins can update stukadoor_aanvragen" 
  ON public.stukadoor_aanvragen 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "Admins can delete stukadoor_aanvragen" 
  ON public.stukadoor_aanvragen 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));
