/**
 * Utilities for exporting and importing data to/from Excel/CSV format
 */

/**
 * Convert a JSON price structure to CSV format for Excel export
 * with well-formatted, descriptive headers
 * 
 * @param priceData The calculator price data object
 * @returns CSV string ready for download
 */
export const convertPricesToCSV = (priceData: any): string => {
  let csvContent = "";
  
  // Document title and metadata
  csvContent += "DAKKAPEL CALCULATOR PRIJSOVERZICHT\n";
  csvContent += "Refurbish Totaal Nederland\n";
  csvContent += "Gegenereerd op: " + new Date().toLocaleDateString('nl-NL') + "\n\n";
  
  // Base Prices
  csvContent += "BASISPRIJZEN PER TYPE\n";
  csvContent += "Type,Omschrijving,Basisprijs (€)\n";
  Object.entries(priceData.basePrices).map(([type, price]) => {
    const descriptions: {[key: string]: string} = {
      typeA: "Klein (tot 1.5m breed)",
      typeB: "Medium (1.5m tot 3m breed)",
      typeC: "Groot (3m tot 5m breed)",
      typeD: "Extra groot (3.5m tot 5.5m breed)",
      typeE: "XXL (3.5m tot 5.9m breed)"
    };
    csvContent += `${type},${descriptions[type] || type},${price}\n`;
  });
  
  // Material Multipliers
  csvContent += "\nMATERIAAL VERMENIGVULDIGERS\n";
  csvContent += "Materiaal Code,Materiaal Omschrijving,Vermenigvuldiger\n";
  const materialDescriptions: {[key: string]: string} = {
    kunststof: "Kunststof standaard",
    hout: "Houten uitvoering",
    aluminium: "Aluminium uitvoering",
    standaard: "Standaard afwerking",
    kunststof_rabat: "Kunststof rabat",
    kunststof_rabat_boeideel: "Kunststof rabat met boeideel",
    polyester_glad: "Polyester glad",
    polyester_rabat: "Polyester rabat"
  };
  Object.entries(priceData.materialMultipliers).forEach(([material, multiplier]) => {
    csvContent += `${material},${materialDescriptions[material] || material},${multiplier}\n`;
  });
  
  // Option Costs
  csvContent += "\nOPTIE KOSTEN\n";
  csvContent += "Optie Code,Optie Omschrijving,Kosten (€)\n";
  const optionDescriptions: {[key: string]: string} = {
    ventilatie: "Ventilatiesysteem",
    zonwering: "Zonwering",
    gootafwerking: "Gootafwerking",
    extra_isolatie: "Extra isolatie",
    extra_draaikiepraam: "Extra draaikiepraam (per stuk)",
    horren: "Horren (per stuk)",
    elektrisch_rolluik: "Elektrisch rolluik (per meter)",
    verwijderen_bestaande: "Verwijderen bestaande dakkapel",
    afvoeren_bouwafval: "Afvoeren bouwafval",
    kader_dakkapel: "Kader dakkapel",
    voorbereiden_rolluiken: "Voorbereiden rolluiken",
    minirooftop: "Mini rooftop",
    dak_versteviging: "Dak versteviging",
    ventilatieroosters: "Ventilatieroosters (per meter)",
    sporenkap: "Sporenkap"
  };
  Object.entries(priceData.optionCosts).forEach(([option, cost]) => {
    csvContent += `${option},${optionDescriptions[option] || option},${cost}\n`;
  });
  
  // RC Value Costs
  csvContent += "\nRC-WAARDE KOSTEN\n";
  csvContent += "RC-Waarde Code,RC-Waarde Omschrijving,Kosten (€)\n";
  const rcDescriptions: {[key: string]: string} = {
    standaard: "Standaard isolatiewaarde",
    upgrade_6_0: "Upgrade naar RC 6.0",
    upgrade_6_5: "Upgrade naar RC 6.5"
  };
  Object.entries(priceData.rcValueCosts).forEach(([value, cost]) => {
    csvContent += `${value},${rcDescriptions[value] || value},${cost}\n`;
  });
  
  // Kozijn Hoogte Adjustments
  csvContent += "\nKOZIJN HOOGTE AANPASSINGEN\n";
  csvContent += "Hoogte Code,Hoogte Omschrijving,Aanpassing (€)\n";
  const heightDescriptions: {[key: string]: string} = {
    standaard: "Standaard (kozijn 110cm)",
    medium: "Medium (kozijn 120cm)",
    large: "Large (kozijn 130cm)",
    extra_large: "Extra large (kozijn 140cm)"
  };
  Object.entries(priceData.kozijnHoogteAdjustments).forEach(([height, adjustment]) => {
    csvContent += `${height},${heightDescriptions[height] || height},${adjustment}\n`;
  });
  
  // Color Surcharges
  csvContent += "\nKLEUR TOESLAGEN\n";
  csvContent += "Kleurcode,Kleur Omschrijving,Toeslag (€)\n";
  const colorDescriptions: {[key: string]: string} = {
    wit: "Wit (standaard)",
    crème: "Crème",
    grijs: "Grijs",
    antraciet: "Antraciet",
    zwart: "Zwart",
    staalblauw: "Staalblauw",
    dennengroen: "Dennengroen"
  };
  Object.entries(priceData.colorSurcharges).forEach(([color, surcharge]) => {
    csvContent += `${color},${colorDescriptions[color] || color},${surcharge}\n`;
  });
  
  return csvContent;
};

/**
 * Generate an Excel download from calculator price data
 */
export const downloadPricesAsExcel = () => {
  try {
    // Get data from localStorage
    const savedPrices = localStorage.getItem('calculatorPrices');
    if (!savedPrices) {
      console.error('No calculator prices found in localStorage');
      return;
    }
    
    const priceData = JSON.parse(savedPrices);
    const csvContent = convertPricesToCSV(priceData);
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set link properties
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    link.setAttribute('href', url);
    link.setAttribute('download', `dakkapel_prijzen_${date}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating Excel export:', error);
  }
};

/**
 * Parse a CSV file into a price data structure
 * This is a simple implementation - in real applications
 * you would want a more robust CSV parser
 * 
 * @param csvText CSV text to parse
 * @returns Parsed price data object or null if parsing failed
 */
export const parseCSVToPrices = (csvText: string): any | null => {
  try {
    // This is a placeholder for actual CSV parsing logic
    // In a real implementation, you would use a proper CSV parser
    
    // For now, we'll return a message that this functionality
    // would need more implementation time
    console.warn('CSV parsing not fully implemented yet');
    return null;
  } catch (error) {
    console.error('Failed to parse CSV:', error);
    return null;
  }
};

/**
 * Get the current calculator prices as an object ready for display
 */
export const getCurrentPricesTable = () => {
  try {
    const savedPrices = localStorage.getItem('calculatorPrices');
    if (!savedPrices) {
      return null;
    }
    return JSON.parse(savedPrices);
  } catch (error) {
    console.error('Error getting current prices:', error);
    return null;
  }
};
