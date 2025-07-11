
-- Completely reset and fix RLS policies for schilder_aanvragen
-- First, drop ALL existing policies
DROP POLICY IF EXISTS "Allow public insert on schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Anyone can create a new schilder_aanvraag" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can read all schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can update schilder_aanvragen" ON public.schilder_aanvragen;
DROP POLICY IF EXISTS "Admins can delete schilder_aanvragen" ON public.schilder_aanvragen;

-- Temporarily disable RLS to ensure clean state
ALTER TABLE public.schilder_aanvragen DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.schilder_aanvragen ENABLE ROW LEVEL SECURITY;

-- Create a completely permissive INSERT policy for anonymous users
CREATE POLICY "public_insert_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Recreate admin policies
CREATE POLICY "admin_select_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR SELECT 
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "admin_update_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR UPDATE 
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "admin_delete_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR DELETE 
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  ));
