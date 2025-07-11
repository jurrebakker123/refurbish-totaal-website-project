
interface FormData {
  project_type: string;
  bouw_type: string;
  oppervlakte: string;
  plafond_oppervlakte: string;
  aantal_deuren: string;
  aantal_ramen: string;
  meerdere_kleuren: boolean;
}

export const usePriceCalculation = (formData: FormData) => {
  const calculatePrice = () => {
    // Only calculate for binnen schilderwerk
    if (formData.project_type !== 'binnen') {
      return null;
    }

    const wandOppervlakte = parseFloat(formData.oppervlakte) || 0;
    const plafondOppervlakte = parseFloat(formData.plafond_oppervlakte) || 0;
    const aantalDeuren = parseInt(formData.aantal_deuren) || 0;
    const aantalRamen = parseInt(formData.aantal_ramen) || 0;
    const meerderKleuren = formData.meerdere_kleuren;
    
    // EXACTE PRIJZEN PER ONDERDEEL (excl. BTW)
    const wandPrijs = meerderKleuren ? 19.55 : 17.25;
    const plafondPrijs = meerderKleuren ? 21.85 : 19.55;
    const deurPrijs = meerderKleuren ? 345.00 : 287.50;
    const raamPrijs = meerderKleuren ? 230.00 : 172.50;
    
    // Bereken totaal excl. BTW
    const wandKosten = wandOppervlakte * wandPrijs;
    const plafondKosten = plafondOppervlakte * plafondPrijs;
    const deurKosten = aantalDeuren * deurPrijs;
    const raamKosten = aantalRamen * raamPrijs;
    
    const totaalExclBtw = wandKosten + plafondKosten + deurKosten + raamKosten;
    
    // BTW percentage bepalen (9% voor renovatie, 21% voor nieuwbouw)
    const btwPercentage = formData.bouw_type === 'nieuwbouw' ? 1.21 : 1.09;
    
    const totaalPrijs = totaalExclBtw * btwPercentage;
    return parseFloat(totaalPrijs.toFixed(2));
  };

  const hasAnyInput = parseFloat(formData.oppervlakte) > 0 || 
                     parseFloat(formData.plafond_oppervlakte) > 0 || 
                     parseInt(formData.aantal_deuren) > 0 || 
                     parseInt(formData.aantal_ramen) > 0;

  return {
    calculatePrice,
    hasAnyInput
  };
};
