
-- Check and fix all RLS policies for schilder_aanvragen table
-- First, drop all existing INSERT policies
DROP POLICY IF EXISTS "Anyone can create a new schilder_aanvraag" ON public.schilder_aanvragen;

-- Create a new policy that explicitly allows all INSERT operations
CREATE POLICY "Allow public insert on schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Also ensure the table has RLS enabled but with permissive policies
ALTER TABLE public.schilder_aanvragen ENABLE ROW LEVEL SECURITY;
