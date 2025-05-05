
import { DakkapelConfiguration } from '@/components/dakkapel/calculator/DakkapelCalculator';

// Base prices per dakkapel type
const BASE_PRICES = {
  typeA: 7060, // 1 meter
  typeB: 7290, // 2 meter
  typeC: 8200, // 3 meter
  typeD: 8780, // 4 meter
  typeE: 9330, // 5 meter
};

// Material cost multipliers
const MATERIAL_MULTIPLIERS = {
  kunststof: 1.0,  // Standard price
  hout: 1.2,       // 20% more expensive
  aluminium: 1.3   // 30% more expensive
};

// Additional options costs
const OPTION_COSTS = {
  ventilatie: 450,
  zonwering: 850,
  gootafwerking: 350,
  extra_isolatie: 650,
  extra_draaikiepraam: 192.77,
  horren: 240,
  elektrisch_rolluik: 281.75, // per meter
  verwijderen_bestaande: 402.50,
  afvoeren_bouwafval: 150
};

// Type to width mapping in meters
const TYPE_WIDTH_MAP = {
  typeA: 100, // 1 meter
  typeB: 200, // 2 meter
  typeC: 300, // 3 meter
  typeD: 400, // 4 meter
  typeE: 500, // 5 meter
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
  // Base price for the selected dakkapel type
  const basePrice = BASE_PRICES[config.type];
  
  // Width in meters for rolluik calculation
  const widthInMeters = config.breedte / 100;
  
  // Material price adjustment
  const materialMultiplier = MATERIAL_MULTIPLIERS[config.materiaal];
  
  // Optional extras calculation
  let optionsTotal = 0;
  
  // Add costs for each selected option
  for (const [key, isSelected] of Object.entries(config.opties)) {
    if (isSelected) {
      const optionKey = key as keyof typeof OPTION_COSTS;
      // For electric rolluik, multiply by width
      if (optionKey === 'elektrisch_rolluik') {
        optionsTotal += OPTION_COSTS[optionKey] * widthInMeters;
      } 
      // For horren, multiply by number of windows
      else if (optionKey === 'horren') {
        optionsTotal += OPTION_COSTS[optionKey] * config.aantalRamen;
      }
      // For all other options, add the fixed cost
      else {
        optionsTotal += OPTION_COSTS[optionKey];
      }
    }
  }
  
  // Add cost for additional windows if any (standard is 2 for type C)
  let windowsAdjustment = 0;
  if (config.type === 'typeC') {
    // Type C comes with 2 windows as standard
    if (config.aantalRamen > 2) {
      windowsAdjustment = OPTION_COSTS.extra_draaikiepraam * (config.aantalRamen - 2);
    }
  } else if (config.type === 'typeD') {
    // Type D comes with 2-3 windows, we'll use 2 as standard
    if (config.aantalRamen > 2) {
      windowsAdjustment = OPTION_COSTS.extra_draaikiepraam * (config.aantalRamen - 2);
    }
  } else if (config.type === 'typeE') {
    // Type E comes with 3-4 windows, we'll use 3 as standard
    if (config.aantalRamen > 3) {
      windowsAdjustment = OPTION_COSTS.extra_draaikiepraam * (config.aantalRamen - 3);
    }
  } else {
    // Types A and B come with 1 window as standard
    if (config.aantalRamen > 1) {
      windowsAdjustment = OPTION_COSTS.extra_draaikiepraam * (config.aantalRamen - 1);
    }
  }
  
  // Low roof pitch warning (no price adjustment, just a warning in the UI)
  let roofPitchAdjustment = 0; // Usually this would be handled by contacting for a quote
  
  // Calculate total price
  const totalPrice = (basePrice * materialMultiplier) + optionsTotal + windowsAdjustment + roofPitchAdjustment;
  
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
 * Get the default number of windows for a dakkapel type
 */
export function getDefaultWindowsForType(type: string): number {
  return DEFAULT_WINDOWS[type as keyof typeof DEFAULT_WINDOWS] || 2;
}
