export interface DakkapelConfiguratie {
  id: string;
  created_at: string;
  naam: string;
  email: string;
  telefoon: string;
  adres: string;
  postcode: string;
  plaats: string;
  opmerkingen?: string;
  model: string;
  breedte: number;
  materiaal: string;
  kleur_kozijn: string;
  kleur_zijkanten: string;
  kleur_draaikiepramen: string;
  dakhelling?: number;
  dakhelling_type?: string;
  levertijd?: string;
  ventilationgrids: boolean;
  sunshade: boolean;
  insectscreens: boolean;
  airconditioning: boolean;
  status: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
  notities?: string;
  totaal_prijs?: number;
}

export interface RefurbishedZonnepaneel {
  id: string;
  created_at: string;
  updated_at: string;
  naam: string;
  email: string;
  telefoon: string;
  adres: string;
  postcode: string;
  plaats: string;
  aantal_panelen: number;
  type_paneel: string;
  vermogen: number;
  merk: string;
  jaar_fabricage?: number;
  conditie: string;
  dak_type: string;
  dak_materiaal?: string;
  schaduw_situatie?: string;
  totaal_prijs?: number;
  status: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
  opmerkingen?: string;
  notities?: string;
}

// Generic quote item interface for painting and plastering
export interface GenericQuoteItem {
  id: string;
  naam: string;
  email: string;
  telefoon: string;
  adres: string;
  postcode: string;
  plaats: string;
  projectDetails: string;
  totaal_prijs?: number;
  opmerkingen?: string;
}

// Vereenvoudigde QuoteItem interface
export interface QuoteItem extends DakkapelConfiguratie {
  isCalculator: boolean;
}

export interface ZonnepaneelQuoteItem extends RefurbishedZonnepaneel {
  isZonnepaneel: boolean;
}

// Detail dialog interfaces
export interface RequestDetailItem {
  id: string;
  naam: string;
  email: string;
  telefoon: string;
  adres: string;
  postcode: string;
  plaats: string;
  projectDetails: string;
  extraDetails?: string[];
  totaal_prijs?: number;
  opmerkingen?: string;
  notities?: string;
  status: string;
  created_at: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
}

// Nieuwe interfaces voor Schilder en Stukadoor
export interface SchilderAanvraag {
  id: string;
  created_at: string;
  updated_at: string;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  telefoon: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  project_type: string;
  oppervlakte: number;
  verf_type: string;
  aantal_kamers?: number;
  voorbewerking_nodig: boolean;
  plafond_meeverven: boolean;
  kozijnen_meeverven: boolean;
  huidige_kleur?: string;
  gewenste_kleur?: string;
  bericht?: string;
  status: string;
  totaal_prijs?: number;
  notities?: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
}

export interface StukadoorAanvraag {
  id: string;
  created_at: string;
  updated_at: string;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  telefoon: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  werk_type: string;
  oppervlakte: number;
  afwerking: string;
  aantal_kamers?: number;
  huidige_staat?: string;
  voorbewerking?: string;
  isolatie_gewenst: boolean;
  bericht?: string;
  status: string;
  totaal_prijs?: number;
  notities?: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
}

// Uitgebreide quote item interfaces
export interface SchilderQuoteItem extends SchilderAanvraag {
  isSchilder: boolean;
}

export interface StukadoorQuoteItem extends StukadoorAanvraag {
  isStukadoor: boolean;
}
