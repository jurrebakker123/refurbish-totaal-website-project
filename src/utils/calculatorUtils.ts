
import { DakkapelConfiguration } from '@/components/dakkapel/calculator/DakkapelCalculator';

// Base prices
const BASE_PRICES = {
  prefab: 4500,   // Base price for prefab dakkapel
  maatwerk: 5500, // Base price for custom dakkapel
  renovatie: 3000 // Base price for renovation
};

// Price per square meter
const PRICE_PER_SQM = {
  prefab: 600,
  maatwerk: 800,
  renovatie: 500
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
  extra_isolatie: 650
};

/**
 * Calculate the total price based on the dakkapel configuration
 */
export function calculateTotalPrice(config: DakkapelConfiguration): number {
  // Calculate area in square meters
  const width = config.breedte / 100; // convert cm to m
  const height = config.hoogte / 100; // convert cm to m
  const area = width * height;
  
  // Base price calculation
  const basePrice = BASE_PRICES[config.type];
  
  // Area price calculation
  const areaPrice = area * PRICE_PER_SQM[config.type];
  
  // Material price adjustment
  const materialMultiplier = MATERIAL_MULTIPLIERS[config.materiaal];
  
  // Optional extras calculation
  let optionsTotal = 0;
  if (config.opties.ventilatie) optionsTotal += OPTION_COSTS.ventilatie;
  if (config.opties.zonwering) optionsTotal += OPTION_COSTS.zonwering;
  if (config.opties.gootafwerking) optionsTotal += OPTION_COSTS.gootafwerking;
  if (config.opties.extra_isolatie) optionsTotal += OPTION_COSTS.extra_isolatie;
  
  // Calculate total price
  const totalPrice = (basePrice + areaPrice) * materialMultiplier + optionsTotal;
  
  // Round to nearest 10
  return Math.round(totalPrice / 10) * 10;
}
