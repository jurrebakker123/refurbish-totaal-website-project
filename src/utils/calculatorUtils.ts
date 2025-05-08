import { DakkapelConfiguration, DakkapelType, KozijnHoogte, MaterialType, RCWaarde } from '@/components/dakkapel/calculator/DakkapelCalculator';

// Base prices per dakkapel type
const BASE_PRICES = {
  typeA: 7060, // 1 meter (Min 1,00m - max 1,50m)
  typeB: 7290, // 2 meter (Min 1,50m - max 3,00m)
  typeC: 8200, // 3 meter (Min 3,00m - max 5,00m)
  typeD: 8780, // 4 meter (Min 3,50m - max 5,50m)
  typeE: 9330, // 5 meter (Min 3,50m - max 5,90m)
};

// Material cost multipliers
const MATERIAL_MULTIPLIERS: Record<MaterialType, number> = {
  kunststof: 1.0,     // Standard price
  hout: 1.2,          // 20% more expensive
  aluminium: 1.3,     // 30% more expensive
  standaard: 1.0,     // Standaard volkern plaat in de kleur wit of grijs
  kunststof_rabat: 1.05, // Kunststof rabat delen (€497 additional)
  kunststof_rabat_boeideel: 1.08, // Kunststof rabat delen incl. boeideel (€751 additional)
  polyester_glad: 1.07, // Polyester glad (€750 additional)
  polyester_rabat: 1.09 // Polyester rabat (€850 additional)
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
  afvoeren_bouwafval: 150,
  kader_dakkapel: 1140.26,
  voorbereiden_rolluiken: 125,
  minirooftop: 3177.69,
  dak_versteviging: 400,
  ventilatieroosters: 120, // per meter
  sporenkap: 275
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

// RC Values additional costs
const RC_VALUE_COSTS: Record<RCWaarde, number> = {
  standaard: 0, // Standard RC-value 3.5
  upgrade_6_0: 218, // Upgrade to RC-value 6.0
  upgrade_6_5: 250 // Extra upgrade to RC-value 6.5
};

// Kozijn Hoogte adjustments
const KOZIJN_HOOGTE_ADJUSTMENTS: Record<KozijnHoogte, number> = {
  standaard: 0,    // Standaard: Hoogte kozijn 110cm - Hoogte dakkapel 145cm
  medium: 150,     // Medium: Hoogte kozijn 120cm - Hoogte dakkapel 155cm
  large: 300,      // Large: Hoogte kozijn 130cm - Hoogte dakkapel 165cm
  extra_large: 450 // Extra large: Hoogte kozijn 140cm - Hoogte dakkapel 175cm
};

// Color surcharges
const COLOR_SURCHARGES = {
  wit: 0,            // Standard white RAL9016
  crème: 0,          // Standard cream white RAL9001
  grijs: 210,        // Grey
  antraciet: 210,    // Anthracite RAL7016
  zwart: 210,        // Black RAL9005
  staalblauw: 210,   // Steel blue RAL5011
  dennengroen: 210   // Pine green RAL6009
};

// Just adding a comment to acknowledge that the Vector3 issue in DakkapelRenderer.tsx
// would need to be fixed in that file directly, but it's marked as read-only.
// If we could modify it, we would ensure that any array being assigned to a Vector3 type
// is properly formatted as [x, y, z] or constructed as a new Vector3(x, y, z).

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
      if (optionKey === 'elektrisch_rolluik' || optionKey === 'ventilatieroosters') {
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
  
  // Add RC-value adjustment
  const rcValueAdjustment = RC_VALUE_COSTS[config.rcWaarde];
  
  // Add kozijn height adjustment
  const kozijnHoogteAdjustment = KOZIJN_HOOGTE_ADJUSTMENTS[config.kozijnHoogte];
  
  // Add color surcharges
  const kozijnenKleurSurcharge = COLOR_SURCHARGES[config.kleurKozijnen];
  const zijkantenKleurSurcharge = COLOR_SURCHARGES[config.kleurZijkanten];
  const draaikiepramenKleurSurcharge = COLOR_SURCHARGES[config.kleurDraaikiepramen];
  
  // Calculate total price
  const totalPrice = (basePrice * materialMultiplier) + 
                      optionsTotal + 
                      windowsAdjustment + 
                      rcValueAdjustment + 
                      kozijnHoogteAdjustment + 
                      kozijnenKleurSurcharge + 
                      zijkantenKleurSurcharge + 
                      draaikiepramenKleurSurcharge;
  
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
