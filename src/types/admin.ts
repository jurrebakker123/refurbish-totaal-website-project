
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
