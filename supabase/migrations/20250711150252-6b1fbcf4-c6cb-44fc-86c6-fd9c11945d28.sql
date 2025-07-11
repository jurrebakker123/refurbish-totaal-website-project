
-- Fix the RLS policy for schilder_aanvragen to allow anonymous users to create requests
DROP POLICY IF EXISTS "Anyone can create a new schilder_aanvraag" ON public.schilder_aanvragen;

CREATE POLICY "Anyone can create a new schilder_aanvraag" 
  ON public.schilder_aanvragen 
  FOR INSERT 
  WITH CHECK (true);
