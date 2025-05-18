
import React from 'react';
import { DakkapelConfiguration } from './DakkapelConfigurator';

interface ConfigurationSummaryProps {
  configuration: DakkapelConfiguration;
  currentStep: number;
  currentPrice: number;
}

export const ConfigurationSummary: React.FC<ConfigurationSummaryProps> = ({
  configuration,
  currentStep,
  currentPrice
}) => {
  // Helper function to get display name for model
  const getModelName = (model: string): string => {
    switch(model) {
      case 'flat': return 'Dakkapel plat dak';
      case 'sloped': return 'Dakkapel schuin dak';
      case 'double-ridge': return 'Dubbele nokverhoging';
      case 'single-ridge': return 'Eenzijdige nokverhoging';
      default: return model;
    }
  };
  
  // Helper function to get display name for material
  const getMaterialName = (material: string): string => {
    switch(material) {
      case 'keralit': return 'Keralit';
      case 'wood': return 'Hout';
      case 'zinc': return 'Zink';
      default: return material;
    }
  };
  
  // Helper function to get display name for delivery time
  const getDeliveryTimeName = (time: string): string => {
    switch(time) {
      case 'asap': return 'Zo snel mogelijk';
      case '3-6': return 'Binnen 3 - 6 maanden';
      case '6-9': return 'Binnen 6 - 9 maanden';
      case '9+': return '9 maanden of later';
      default: return time;
    }
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 sticky top-24">
      <h3 className="text-xl font-semibold mb-4 text-brand-darkGreen border-b pb-2">
        Overzicht van uw samenstelling
      </h3>
      
      <div className="space-y-3">
        {currentStep >= 1 && (
          <div className="flex justify-between py-1">
            <span className="font-medium">Breedte:</span>
            <span>{configuration.width} cm</span>
          </div>
        )}
        
        {currentStep >= 2 && (
          <div className="flex justify-between py-1">
            <span className="font-medium">Dakhelling:</span>
            <span>
              {configuration.roofAngle === 'unknown' 
                ? 'Onbekend' 
                : `${configuration.roofAngle}°`}
            </span>
          </div>
        )}
        
        {currentStep >= 3 && (
          <div className="flex justify-between py-1">
            <span className="font-medium">Model:</span>
            <span>{getModelName(configuration.model)}</span>
          </div>
        )}
        
        {currentStep >= 4 && (
          <div className="flex justify-between py-1">
            <span className="font-medium">Materiaal:</span>
            <span>{getMaterialName(configuration.material)}</span>
          </div>
        )}
        
        {currentStep >= 5 && (
          <div className="py-1">
            <div className="font-medium mb-1">Kleuren:</div>
            <div className="ml-2 grid grid-cols-2 gap-x-2 text-sm">
              <div>Boeien:</div>
              <div>{configuration.colors.rafters}</div>
              
              <div>Zijwanden:</div>
              <div>{configuration.colors.sides}</div>
              
              <div>Kozijnen:</div>
              <div>{configuration.colors.frames}</div>
              
              <div>Draaiende delen:</div>
              <div>{configuration.colors.movingParts}</div>
            </div>
          </div>
        )}
        
        {currentStep >= 6 && configuration.extras && (
          <div className="py-1">
            <div className="font-medium mb-1">Extra opties:</div>
            <ul className="ml-2 text-sm">
              {configuration.extras.ventilationGrids && <li>Ventilatieroosters</li>}
              {configuration.extras.sunShade && <li>Zonwering (Somfy-Ilmo motor)</li>}
              {configuration.extras.insectScreens && <li>Horren</li>}
              {configuration.extras.airConditioning && <li>Airco</li>}
              {!configuration.extras.ventilationGrids && 
               !configuration.extras.sunShade && 
               !configuration.extras.insectScreens && 
               !configuration.extras.airConditioning && 
               <li>Geen extra opties</li>}
            </ul>
          </div>
        )}
        
        {currentStep >= 7 && (
          <div className="flex justify-between py-1">
            <span className="font-medium">Levertijd:</span>
            <span>{getDeliveryTimeName(configuration.deliveryTime)}</span>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Totaalprijs:</span>
          <span className="text-xl font-bold text-brand-darkGreen">
            €{currentPrice.toLocaleString('nl-NL')},-
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Prijsindicatie inclusief BTW</p>
      </div>
      
      {currentStep < 8 && (
        <div className="mt-6">
          <p className="text-sm text-center text-gray-700 italic">
            Vul alle stappen in voor een persoonlijke offerte op maat.
          </p>
        </div>
      )}
    </div>
  );
};
