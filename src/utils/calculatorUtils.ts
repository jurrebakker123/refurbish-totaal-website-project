
import { DakkapelConfiguration, DakkapelType, KozijnHoogte, MaterialType, RCWaarde } from '@/components/dakkapel/calculator/DakkapelCalculator';

// Load prices from localStorage if available
const loadSavedPrices = () => {
  try {
    const savedPrices = localStorage.getItem('calculatorPrices');
    if (savedPrices) {
      return JSON.parse(savedPrices);
    }
  } catch (e) {
    console.error('Failed to load saved prices', e);
  }
  
  // Return default prices if no saved prices found or error
  return {
    basePrices: {
      typeA: 7060,
      typeB: 7290,
      typeC: 8200,
      typeD: 8780,
      typeE: 9330,
    },
    materialMultipliers: {
      kunststof: 1.0,
      hout: 1.2,
      aluminium: 1.3,
      standaard: 1.0,
      kunststof_rabat: 1.05,
      kunststof_rabat_boeideel: 1.08,
      polyester_glad: 1.07,
      polyester_rabat: 1.09
    },
    optionCosts: {
      ventilatie: 450,
      zonwering: 850,
      gootafwerking: 350,
      extra_isolatie: 650,
      extra_draaikiepraam: 192.77,
      horren: 240,
      elektrisch_rolluik: 281.75,
      verwijderen_bestaande: 402.50,
      afvoeren_bouwafval: 150,
      kader_dakkapel: 1140.26,
      voorbereiden_rolluiken: 125,
      minirooftop: 3177.69,
      dak_versteviging: 400,
      ventilatieroosters: 120,
      sporenkap: 275
    },
    rcValueCosts: {
      standaard: 0,
      upgrade_6_0: 218,
      upgrade_6_5: 250
    },
    kozijnHoogteAdjustments: {
      standaard: 0,
      medium: 150,
      large: 300,
      extra_large: 450
    },
    colorSurcharges: {
      wit: 0,
      crème: 0,
      grijs: 210,
      antraciet: 210,
      zwart: 210,
      staalblauw: 210,
      dennengroen: 210
    }
  };
};

// Type to width mapping in meters
const TYPE_WIDTH_MAP = {
  typeA: 100, // 1 meter
  typeB: 200, // 2 meter
  typeC: 300, // 3 meter
  typeD: 400, // 4 meter
  typeE: 500, // 5 meter
};

// Type to width range mapping - Corrected based on requirements
const TYPE_WIDTH_RANGE = {
  typeA: { min: 100, max: 150 }, // Min 1,00m - max 1,50m
  typeB: { min: 150, max: 300 }, // Min 1,50m - max 3,00m
  typeC: { min: 300, max: 500 }, // Min 3,00m - max 5,00m
  typeD: { min: 350, max: 550 }, // Min 3,50m - max 5,50m
  typeE: { min: 350, max: 590 }, // Min 3,50m - max 5,90m
};

// Default number of windows per type
const DEFAULT_WINDOWS = {
  typeA: 1,
  typeB: 1,
  typeC: 2,
  typeD: 2,
  typeE: 3
};

/**
 * Calculate the total price based on the dakkapel configuration
 */
export function calculateTotalPrice(config: DakkapelConfiguration): number {
  console.log('Calculating price for configuration:', config);
  
  // Always load the latest prices from localStorage for each calculation
  const pricesData = loadSavedPrices();
  
  // Base price for the selected dakkapel type
  const basePrice = pricesData.basePrices[config.type];
  
  // Width in meters for rolluik calculation
  const widthInMeters = config.breedte / 100;
  
  // Material price adjustment
  const materialMultiplier = pricesData.materialMultipliers[config.materiaal];
  
  // Optional extras calculation
  let optionsTotal = 0;
  
  // Add costs for each selected option
  for (const [key, isSelected] of Object.entries(config.opties)) {
    if (isSelected) {
      const optionKey = key as keyof typeof pricesData.optionCosts;
      // For electric rolluik, multiply by width
      if (optionKey === 'elektrisch_rolluik' || optionKey === 'ventilatieroosters') {
        optionsTotal += pricesData.optionCosts[optionKey] * widthInMeters;
      } 
      // For horren, multiply by number of windows
      else if (optionKey === 'horren') {
        optionsTotal += pricesData.optionCosts[optionKey] * config.aantalRamen;
      }
      // For all other options, add the fixed cost
      else {
        optionsTotal += pricesData.optionCosts[optionKey];
      }
    }
  }
  
  // Add cost for additional windows if any (standard is 2 for type C)
  let windowsAdjustment = 0;
  if (config.type === 'typeC') {
    // Type C comes with 2 windows as standard
    if (config.aantalRamen > 2) {
      windowsAdjustment = pricesData.optionCosts.extra_draaikiepraam * (config.aantalRamen - 2);
    }
  } else if (config.type === 'typeD') {
    // Type D comes with 2-3 windows, we'll use 2 as standard
    if (config.aantalRamen > 2) {
      windowsAdjustment = pricesData.optionCosts.extra_draaikiepraam * (config.aantalRamen - 2);
    }
  } else if (config.type === 'typeE') {
    // Type E comes with 3-4 windows, we'll use 3 as standard
    if (config.aantalRamen > 3) {
      windowsAdjustment = pricesData.optionCosts.extra_draaikiepraam * (config.aantalRamen - 3);
    }
  } else {
    // Types A and B come with 1 window as standard
    if (config.aantalRamen > 1) {
      windowsAdjustment = pricesData.optionCosts.extra_draaikiepraam * (config.aantalRamen - 1);
    }
  }
  
  // Add RC-value adjustment
  const rcValueAdjustment = pricesData.rcValueCosts[config.rcWaarde];
  
  // Add kozijn height adjustment
  const kozijnHoogteAdjustment = pricesData.kozijnHoogteAdjustments[config.kozijnHoogte];
  
  // Add color surcharges
  const kozijnenKleurSurcharge = pricesData.colorSurcharges[config.kleurKozijnen];
  const zijkantenKleurSurcharge = pricesData.colorSurcharges[config.kleurZijkanten];
  const draaikiepramenKleurSurcharge = pricesData.colorSurcharges[config.kleurDraaikiepramen];
  
  // Calculate total price
  const totalPrice = (basePrice * materialMultiplier) + 
                      optionsTotal + 
                      windowsAdjustment + 
                      rcValueAdjustment + 
                      kozijnHoogteAdjustment + 
                      kozijnenKleurSurcharge + 
                      zijkantenKleurSurcharge + 
                      draaikiepramenKleurSurcharge;
  
  console.log('Calculation details:', {
    basePrice,
    materialMultiplier,
    optionsTotal,
    windowsAdjustment,
    rcValueAdjustment,
    kozijnHoogteAdjustment,
    kozijnenKleurSurcharge,
    zijkantenKleurSurcharge,
    draaikiepramenKleurSurcharge,
    totalPrice
  });
  
  // Round to nearest 10
  return Math.round(totalPrice / 10) * 10;
}

/**
 * Get the default width for a dakkapel type
 */
export function getDefaultWidthForType(type: string): number {
  return TYPE_WIDTH_MAP[type as keyof typeof TYPE_WIDTH_MAP] || 300;
}

/**
 * Get the width range for a dakkapel type
 */
export function getWidthRangeForType(type: DakkapelType): { min: number, max: number } {
  return TYPE_WIDTH_RANGE[type];
}

/**
 * Get the default number of windows for a dakkapel type
 */
export function getDefaultWindowsForType(type: string): number {
  return DEFAULT_WINDOWS[type as keyof typeof DEFAULT_WINDOWS] || 2;
}

/**
 * Get the height for a kozijn height option
 */
export function getKozijnHeight(kozijnHoogte: KozijnHoogte): { kozijn: number, dakkapel: number } {
  switch (kozijnHoogte) {
    case 'standaard':
      return { kozijn: 110, dakkapel: 145 };
    case 'medium':
      return { kozijn: 120, dakkapel: 155 };
    case 'large':
      return { kozijn: 130, dakkapel: 165 };
    case 'extra_large':
      return { kozijn: 140, dakkapel: 175 };
    default:
      return { kozijn: 110, dakkapel: 145 };
  }
}

/**
 * Get dakHelling value in degrees from dakHellingType
 */
export function getDakHellingFromType(dakHellingType: string): number {
  switch (dakHellingType) {
    case 'kleiner_dan_40':
      return 35;
    case 'tussen_40_45':
      return 42;
    case 'groter_dan_45':
      return 50;
    default:
      return 42;
  }
}
