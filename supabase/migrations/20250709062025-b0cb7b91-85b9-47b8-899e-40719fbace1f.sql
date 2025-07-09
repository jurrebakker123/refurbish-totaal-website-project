
-- Add RLS policies for schilder_aanvragen table
ALTER TABLE public.schilder_aanvragen ENABLE ROW LEVEL SECURITY;

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

-- Add RLS policies for stukadoor_aanvragen table
ALTER TABLE public.stukadoor_aanvragen ENABLE ROW LEVEL SECURITY;

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
