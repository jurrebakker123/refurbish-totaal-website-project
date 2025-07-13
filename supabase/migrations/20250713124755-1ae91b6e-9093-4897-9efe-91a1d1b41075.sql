
-- Update RLS policy for schilder_aanvragen to allow anonymous inserts
DROP POLICY IF EXISTS "allow_all_inserts_schilder_aanvragen" ON public.schilder_aanvragen;
CREATE POLICY "allow_anonymous_inserts_schilder_aanvragen" 
  ON public.schilder_aanvragen 
  FOR INSERT 
  WITH CHECK (true);

-- Update RLS policy for stukadoor_aanvragen to allow anonymous inserts  
DROP POLICY IF EXISTS "Anyone can create a new stukadoor_aanvraag" ON public.stukadoor_aanvragen;
CREATE POLICY "allow_anonymous_inserts_stukadoor_aanvragen" 
  ON public.stukadoor_aanvragen 
  FOR INSERT 
  WITH CHECK (true);
