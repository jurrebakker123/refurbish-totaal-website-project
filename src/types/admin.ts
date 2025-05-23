
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
  afgehandeld_op?: string;
  notities?: string;
  totaal_prijs?: number;
}

export interface DakkapelCalculatorAanvraag {
  id: string;
  created_at: string;
  voornaam: string;
  achternaam: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  telefoon: string;
  emailadres: string;
  bericht?: string;
  type: string;
  breedte: number;
  hoogte: number;
  materiaal: string;
  aantalramen: number;
  kozijnhoogte: string;
  dakhelling: number;
  dakhellingtype: string;
  kleurkozijnen: string;
  kleurzijkanten: string;
  kleurdraaikiepramen: string;
  rcwaarde: string;
  woningzijde: string;
  opties: any;
  status: string;
  offerte_verzonden_op?: string;
  afgehandeld_op?: string;
  notities?: string;
  totaal_prijs?: number;
}

export type AnyRequestItem = DakkapelConfiguratie | DakkapelCalculatorAanvraag;

export interface QuoteItem extends AnyRequestItem {
  isCalculator: boolean;
}
