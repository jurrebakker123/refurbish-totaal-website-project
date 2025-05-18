
import React from 'react';
import { StepProps, ColorOption } from '../DakkapelConfigurator';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const colorOptions: Array<{
  value: ColorOption;
  label: string;
  hexColor: string;
}> = [
  { value: 'wit', label: 'Wit', hexColor: '#FFFFFF' },
  { value: 'crème', label: 'Crème', hexColor: '#FFF4E0' },
  { value: 'blauw', label: 'Blauw', hexColor: '#4A90E2' },
  { value: 'groen', label: 'Groen', hexColor: '#50B83C' },
  { value: 'antraciet', label: 'Antraciet', hexColor: '#343A40' },
  { value: 'kwartsgrijs', label: 'Kwartsgrijs', hexColor: '#7F8C8D' },
  { value: 'anders', label: 'Anders', hexColor: '#F5A623' }
];

export const ColorStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep, 
  prevStep,
  currentPrice
}) => {
  // Function to update a specific color property
  const updateColor = (part: keyof typeof configuration.colors, color: ColorOption) => {
    updateConfiguration({
      colors: {
        ...configuration.colors,
        [part]: color
      }
    });
  };

  // Component for color selection
  const ColorSelector = ({ 
    title, 
    part, 
    currentColor 
  }: { 
    title: string; 
    part: keyof typeof configuration.colors; 
    currentColor: ColorOption;
  }) => {
    return (
      <div className="mb-6">
        <h3 className="font-medium mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <div 
              key={color.value}
              onClick={() => updateColor(part, color.value)}
              className={`
                w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 relative
                ${currentColor === color.value ? 'transform scale-110 ring-2 ring-brand-lightGreen' : ''}
              `}
              style={{ 
                backgroundColor: color.hexColor,
                border: color.value === 'wit' ? '1px solid #E0E0E0' : 'none'
              }}
              title={color.label}
            >
              {currentColor === color.value && (
                <span className="absolute -bottom-5 left-0 right-0 text-xs font-medium text-center">
                  {color.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 5 - Kleuren</h2>
      <p className="mb-6 text-lg">Kies de kleuren voor verschillende onderdelen</p>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="all">Alle onderdelen</TabsTrigger>
          <TabsTrigger value="rafters">Boeien</TabsTrigger>
          <TabsTrigger value="sides">Zijwanden</TabsTrigger>
          <TabsTrigger value="frames">Kozijnen & draaiende delen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-8">
            <ColorSelector 
              title="Boeien" 
              part="rafters" 
              currentColor={configuration.colors.rafters} 
            />
            <ColorSelector 
              title="Zijwanden" 
              part="sides" 
              currentColor={configuration.colors.sides} 
            />
            <ColorSelector 
              title="Kozijnen" 
              part="frames" 
              currentColor={configuration.colors.frames} 
            />
            <ColorSelector 
              title="Draaiende delen" 
              part="movingParts" 
              currentColor={configuration.colors.movingParts} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="rafters">
          <ColorSelector 
            title="Boeien" 
            part="rafters" 
            currentColor={configuration.colors.rafters} 
          />
        </TabsContent>
        
        <TabsContent value="sides">
          <ColorSelector 
            title="Zijwanden" 
            part="sides" 
            currentColor={configuration.colors.sides} 
          />
        </TabsContent>
        
        <TabsContent value="frames">
          <div className="space-y-8">
            <ColorSelector 
              title="Kozijnen" 
              part="frames" 
              currentColor={configuration.colors.frames} 
            />
            <ColorSelector 
              title="Draaiende delen" 
              part="movingParts" 
              currentColor={configuration.colors.movingParts} 
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-10">
        <button
          onClick={prevStep}
          className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
        >
          <ArrowLeft size={18} />
          <span>Vorige stap</span>
        </button>
        
        <button
          onClick={nextStep}
          className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
        >
          <span>Volgende stap</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
