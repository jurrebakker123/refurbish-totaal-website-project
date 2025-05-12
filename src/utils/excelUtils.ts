
/**
 * Utilities for exporting and importing data to/from Excel/CSV format
 */

/**
 * Convert a JSON price structure to CSV format for Excel export
 * 
 * @param priceData The calculator price data object
 * @returns CSV string ready for download
 */
export const convertPricesToCSV = (priceData: any): string => {
  let csvContent = "";
  
  // Base Prices
  csvContent += "DAKKAPEL CALCULATOR PRIJZEN\n\n";
  csvContent += "Type,Basisprijs (€)\n";
  Object.entries(priceData.basePrices).forEach(([type, price]) => {
    csvContent += `${type},${price}\n`;
  });
  
  // Material Multipliers
  csvContent += "\nMateriaal,Vermenigvuldiger\n";
  Object.entries(priceData.materialMultipliers).forEach(([material, multiplier]) => {
    csvContent += `${material},${multiplier}\n`;
  });
  
  // Option Costs
  csvContent += "\nOptie,Kosten (€)\n";
  Object.entries(priceData.optionCosts).forEach(([option, cost]) => {
    csvContent += `${option},${cost}\n`;
  });
  
  // RC Value Costs
  csvContent += "\nRC-Waarde,Kosten (€)\n";
  Object.entries(priceData.rcValueCosts).forEach(([value, cost]) => {
    csvContent += `${value},${cost}\n`;
  });
  
  // Kozijn Hoogte Adjustments
  csvContent += "\nKozijn Hoogte,Aanpassing (€)\n";
  Object.entries(priceData.kozijnHoogteAdjustments).forEach(([height, adjustment]) => {
    csvContent += `${height},${adjustment}\n`;
  });
  
  // Color Surcharges
  csvContent += "\nKleur,Toeslag (€)\n";
  Object.entries(priceData.colorSurcharges).forEach(([color, surcharge]) => {
    csvContent += `${color},${surcharge}\n`;
  });
  
  return csvContent;
};

/**
 * Generate an Excel download from calculator price data
 * 
 * @param priceData The calculator price data object
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
    link.setAttribute('href', url);
    link.setAttribute('download', 'dakkapel_calculator_prijzen.csv');
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
