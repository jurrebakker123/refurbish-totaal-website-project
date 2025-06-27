
-- Create table for schilder (painting) requests
CREATE TABLE public.schilder_aanvragen (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contact information
  voornaam VARCHAR NOT NULL,
  achternaam VARCHAR NOT NULL,
  emailadres VARCHAR NOT NULL,
  telefoon VARCHAR NOT NULL,
  straatnaam VARCHAR NOT NULL,
  huisnummer VARCHAR NOT NULL,
  postcode VARCHAR NOT NULL,
  plaats VARCHAR NOT NULL,
  bericht TEXT,
  
  -- Project details
  project_type VARCHAR NOT NULL, -- 'binnen', 'buiten', 'binnen+buiten'
  oppervlakte INTEGER NOT NULL, -- in m²
  aantal_kamers INTEGER,
  verf_type VARCHAR NOT NULL, -- 'latex', 'alkyd', 'krijtverf', etc.
  huidige_kleur VARCHAR,
  gewenste_kleur VARCHAR,
  voorbewerking_nodig BOOLEAN DEFAULT false,
  plafond_meeverven BOOLEAN DEFAULT false,
  kozijnen_meeverven BOOLEAN DEFAULT false,
  
  -- Pricing and status
  totaal_prijs NUMERIC,
  status VARCHAR DEFAULT 'nieuw',
  offerte_verzonden_op TIMESTAMP WITH TIME ZONE,
  op_locatie_op TIMESTAMP WITH TIME ZONE,
  in_aanbouw_op TIMESTAMP WITH TIME ZONE,
  afgehandeld_op TIMESTAMP WITH TIME ZONE,
  notities TEXT
);

-- Create table for stukadoor (plastering) requests  
CREATE TABLE public.stukadoor_aanvragen (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contact information
  voornaam VARCHAR NOT NULL,
  achternaam VARCHAR NOT NULL,
  emailadres VARCHAR NOT NULL,
  telefoon VARCHAR NOT NULL,
  straatnaam VARCHAR NOT NULL,
  huisnummer VARCHAR NOT NULL,
  postcode VARCHAR NOT NULL,
  plaats VARCHAR NOT NULL,
  bericht TEXT,
  
  -- Project details
  werk_type VARCHAR NOT NULL, -- 'nieuw_stucwerk', 'herstel_stucwerk', 'decoratief_stucwerk'
  oppervlakte INTEGER NOT NULL, -- in m²
  aantal_kamers INTEGER,
  afwerking VARCHAR NOT NULL, -- 'glad', 'structuur', 'spikkels', 'betonlook'
  huidige_staat VARCHAR, -- 'goed', 'matig', 'slecht'
  voorbewerking VARCHAR, -- 'geen', 'schuren', 'primer', 'volledig_herstel'
  isolatie_gewenst BOOLEAN DEFAULT false,
  
  -- Pricing and status
  totaal_prijs NUMERIC,
  status VARCHAR DEFAULT 'nieuw',
  offerte_verzonden_op TIMESTAMP WITH TIME ZONE,
  op_locatie_op TIMESTAMP WITH TIME ZONE,
  in_aanbouw_op TIMESTAMP WITH TIME ZONE,
  afgehandeld_op TIMESTAMP WITH TIME ZONE,
  notities TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_schilder_aanvragen_status ON public.schilder_aanvragen(status);
CREATE INDEX idx_schilder_aanvragen_created_at ON public.schilder_aanvragen(created_at);
CREATE INDEX idx_stukadoor_aanvragen_status ON public.stukadoor_aanvragen(status);
CREATE INDEX idx_stukadoor_aanvragen_created_at ON public.stukadoor_aanvragen(created_at);
