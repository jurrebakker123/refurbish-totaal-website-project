
-- Volledig reset van alle RLS policies en herstel van toegang
-- Stap 1: Verwijder ALLE bestaande policies
DROP POLICY IF EXISTS "public_insert_schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "admin_select_schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "admin_update_schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "admin_delete_schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Allow public insert on schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Anyone can create a new schilder_aanvraag" ON public.schilder_aanvragen;

-- Stap 2: RLS uitschakelen
ALTER TABLE public.schilder_aanvragen DISABLE ROW LEVEL SECURITY;

-- Stap 3: RLS opnieuw inschakelen
ALTER TABLE public.schilder_aanvragen ENABLE ROW LEVEL SECURITY;

-- Stap 4: Maak een volledig open INSERT policy
CREATE POLICY "allow_all_inserts_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Stap 5: Admin policies voor SELECT/UPDATE/DELETE
CREATE POLICY "admins_can_select_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR SELECT 
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "admins_can_update_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR UPDATE 
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "admins_can_delete_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR DELETE 
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));
