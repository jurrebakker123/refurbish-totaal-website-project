
-- Re-establish RLS policies for schilder_aanvragen table
DROP POLICY IF EXISTS "allow_anonymous_inserts_schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "admins_can_select_schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "admins_can_update_schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "admins_can_delete_schilder_aanvragen" ON public.schilder_aanvragen;

CREATE POLICY "Admins can read all schilder_aanvragen" 
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

CREATE POLICY "Anyone can create a new schilder_aanvraag" 
  ON public.schilder_aanvragen 
  FOR INSERT 
  WITH CHECK (true);

-- Re-establish RLS policies for stukadoor_aanvragen table
DROP POLICY IF EXISTS "allow_anonymous_inserts_stukadoor_aanvragen" ON public.stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can read all stukadoor_aanvragen" ON public.stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can update stukadoor_aanvragen" ON public.stukadoor_aanvragen;
DROP POLICY IF EXISTS "Admins can delete stukadoor_aanvragen" ON public.stukadoor_aanvragen;

CREATE POLICY "Admins can read all stukadoor_aanvragen" 
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

CREATE POLICY "Anyone can create a new stukadoor_aanvraag" 
  ON public.stukadoor_aanvragen 
  FOR INSERT 
  WITH CHECK (true);
