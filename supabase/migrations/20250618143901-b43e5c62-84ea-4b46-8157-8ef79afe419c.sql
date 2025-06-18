
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  user_type VARCHAR NOT NULL CHECK (user_type IN ('vakman', 'klant')),
  voornaam VARCHAR NOT NULL,
  achternaam VARCHAR NOT NULL,
  bedrijfsnaam VARCHAR,
  telefoon VARCHAR,
  postcode VARCHAR,
  plaats VARCHAR,
  adres VARCHAR,
  btw_nummer VARCHAR,
  kvk_nummer VARCHAR,
  beschrijving TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create service categories table
CREATE TABLE public.service_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  naam VARCHAR NOT NULL UNIQUE,
  beschrijving TEXT,
  icon_name VARCHAR DEFAULT 'wrench',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vakman_categories junction table (many-to-many)
CREATE TABLE public.vakman_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vakman_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES service_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(vakman_id, category_id)
);

-- Create klussen (jobs) table
CREATE TABLE public.klussen (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  klant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  titel VARCHAR NOT NULL,
  beschrijving TEXT NOT NULL,
  category_id UUID REFERENCES service_categories(id),
  postcode VARCHAR NOT NULL,
  plaats VARCHAR NOT NULL,
  budget_min DECIMAL,
  budget_max DECIMAL,
  urgentie VARCHAR CHECK (urgentie IN ('asap', 'deze_week', 'deze_maand', 'flexibel')) DEFAULT 'flexibel',
  status VARCHAR CHECK (status IN ('open', 'in_behandeling', 'afgesloten', 'geannuleerd')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reacties (responses) table
CREATE TABLE public.klus_reacties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  klus_id UUID REFERENCES klussen(id) ON DELETE CASCADE,
  vakman_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  bericht TEXT NOT NULL,
  geschatte_prijs DECIMAL,
  geschatte_duur VARCHAR,
  beschikbaarheid VARCHAR,
  status VARCHAR CHECK (status IN ('verzonden', 'geaccepteerd', 'afgewezen')) DEFAULT 'verzonden',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(klus_id, vakman_id)
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  klus_id UUID REFERENCES klussen(id),
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reviewed_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vakman_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.klussen ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.klus_reacties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for service_categories
CREATE POLICY "Anyone can view active categories" ON service_categories FOR SELECT USING (is_active = true);

-- Create RLS policies for vakman_categories
CREATE POLICY "Anyone can view vakman categories" ON vakman_categories FOR SELECT USING (true);
CREATE POLICY "Vakmen can manage own categories" ON vakman_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = vakman_id AND auth.uid() = id AND user_type = 'vakman')
);

-- Create RLS policies for klussen
CREATE POLICY "Anyone can view open klussen" ON klussen FOR SELECT USING (status = 'open' OR klant_id = auth.uid());
CREATE POLICY "Klanten can create klussen" ON klussen FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'klant')
);
CREATE POLICY "Klanten can update own klussen" ON klussen FOR UPDATE USING (klant_id = auth.uid());

-- Create RLS policies for klus_reacties
CREATE POLICY "Klanten and vakmen can view relevant reacties" ON klus_reacties FOR SELECT USING (
  vakman_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM klussen WHERE id = klus_id AND klant_id = auth.uid())
);
CREATE POLICY "Vakmen can create reacties" ON klus_reacties FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'vakman') AND
  vakman_id = auth.uid()
);

-- Create RLS policies for reviews
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for completed jobs" ON reviews FOR INSERT WITH CHECK (
  reviewer_id = auth.uid()
);

-- Insert default service categories
INSERT INTO service_categories (naam, beschrijving, icon_name) VALUES
('Schilderwerk', 'Binnen- en buitenschilderwerk, behangen', 'paintbrush'),
('Loodgieterswerk', 'Sanitair, leidingwerk, reparaties', 'wrench'),
('Elektricien', 'Elektrotechniek, bedrading, verlichting', 'zap'),
('Timmerman', 'Timmerwerk, meubels, constructies', 'hammer'),
('Tegelleger', 'Tegelwerk badkamer, keuken, vloeren', 'grid'),
('Dakdekker', 'Dakbedekking, goten, reparaties', 'home'),
('Tuinman', 'Tuinonderhoud, aanleg, snoeiwerk', 'leaf'),
('Isolatie', 'Spouwmuurisolatie, dakisolatie', 'shield'),
('Kozijnen', 'Ramen, deuren, kozijnwerk', 'door-open'),
('Vloerlegger', 'Laminaat, parket, vinyl, tegels', 'square'),
('Stukadoor', 'Pleisterwerk, afwerking wanden', 'wall'),
('Dakkapel', 'Dakkapellen, verbouwingen', 'triangle'),
('Zonnepanelen', 'Installatie zonnepanelen', 'sun'),
('Keukenmontage', 'Keuken plaatsen en monteren', 'chef-hat'),
('Badkamerrenovatie', 'Complete badkamer renovatie', 'bath');

-- Create function to automatically create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_type, voornaam, achternaam)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'klant'),
    COALESCE(NEW.raw_user_meta_data->>'voornaam', ''),
    COALESCE(NEW.raw_user_meta_data->>'achternaam', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
