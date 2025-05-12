
import React, { useEffect, useState } from 'react';
import { downloadPricesAsExcel } from '@/utils/excelUtils';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const DakkapelPricesTable = () => {
  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    try {
      const savedPrices = localStorage.getItem('calculatorPrices');
      if (savedPrices) {
        setPriceData(JSON.parse(savedPrices));
      }
    } catch (error) {
      console.error('Error loading price data:', error);
    }
  }, []);

  if (!priceData) {
    return <p>Geen prijs data gevonden.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dakkapel Calculator Prijzen</h2>
        <Button 
          onClick={downloadPricesAsExcel}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Download als Excel
        </Button>
      </div>

      <div className="space-y-8">
        {/* Base Prices */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Basisprijzen</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Basisprijs (€)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(priceData.basePrices).map(([type, price]) => (
                  <tr key={type} className="hover:bg-gray-50">
                    <td className="border p-2">{type}</td>
                    <td className="border p-2">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Material Multipliers */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Materiaal Vermenigvuldigers</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Materiaal</th>
                  <th className="border p-2 text-left">Vermenigvuldiger</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(priceData.materialMultipliers).map(([material, multiplier]) => (
                  <tr key={material} className="hover:bg-gray-50">
                    <td className="border p-2">{material}</td>
                    <td className="border p-2">{multiplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Option Costs */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Optie Kosten</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Optie</th>
                  <th className="border p-2 text-left">Kosten (€)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(priceData.optionCosts).map(([option, cost]) => (
                  <tr key={option} className="hover:bg-gray-50">
                    <td className="border p-2">{option}</td>
                    <td className="border p-2">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RC Value Costs */}
        <div>
          <h3 className="text-lg font-semibold mb-2">RC-Waarde Kosten</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">RC-Waarde</th>
                  <th className="border p-2 text-left">Kosten (€)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(priceData.rcValueCosts).map(([value, cost]) => (
                  <tr key={value} className="hover:bg-gray-50">
                    <td className="border p-2">{value}</td>
                    <td className="border p-2">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kozijn Hoogte Adjustments */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Kozijn Hoogte Aanpassingen</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Kozijn Hoogte</th>
                  <th className="border p-2 text-left">Aanpassing (€)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(priceData.kozijnHoogteAdjustments).map(([height, adjustment]) => (
                  <tr key={height} className="hover:bg-gray-50">
                    <td className="border p-2">{height}</td>
                    <td className="border p-2">{adjustment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Color Surcharges */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Kleur Toeslagen</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Kleur</th>
                  <th className="border p-2 text-left">Toeslag (€)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(priceData.colorSurcharges).map(([color, surcharge]) => (
                  <tr key={color} className="hover:bg-gray-50">
                    <td className="border p-2">{color}</td>
                    <td className="border p-2">{surcharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DakkapelPricesTable;
