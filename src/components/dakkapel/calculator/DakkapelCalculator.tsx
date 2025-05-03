
import React, { useState, useEffect } from 'react';
import { DimensionsSelector } from './DimensionsSelector';
import { TypeSelector } from './TypeSelector';
import { MaterialSelector } from './MaterialSelector';
import { OptionsSelector } from './OptionsSelector';
import { PriceDisplay } from './PriceDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateTotalPrice } from '@/utils/calculatorUtils';
import { DakkapelRenderer } from './DakkapelRenderer';

export type DakkapelType = 'prefab' | 'maatwerk' | 'renovatie';
export type MaterialType = 'kunststof' | 'hout' | 'aluminium';

export interface DakkapelOptions {
  ventilatie: boolean;
  zonwering: boolean;
  gootafwerking: boolean;
  extra_isolatie: boolean;
}

export interface DakkapelConfiguration {
  breedte: number;
  hoogte: number;
  type: DakkapelType;
  materiaal: MaterialType;
  opties: DakkapelOptions;
}

export function DakkapelCalculator() {
  const [configuration, setConfiguration] = useState<DakkapelConfiguration>({
    breedte: 300, // in cm
    hoogte: 150, // in cm
    type: 'prefab',
    materiaal: 'kunststof',
    opties: {
      ventilatie: false,
      zonwering: false,
      gootafwerking: false,
      extra_isolatie: false,
    }
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("afmetingen");

  useEffect(() => {
    const price = calculateTotalPrice(configuration);
    setTotalPrice(price);
  }, [configuration]);

  const updateDimensions = (breedte: number, hoogte: number) => {
    setConfiguration(prev => ({ ...prev, breedte, hoogte }));
  };

  const updateType = (type: DakkapelType) => {
    setConfiguration(prev => ({ ...prev, type }));
  };

  const updateMaterial = (materiaal: MaterialType) => {
    setConfiguration(prev => ({ ...prev, materiaal }));
  };

  const updateOptions = (opties: DakkapelOptions) => {
    setConfiguration(prev => ({ ...prev, opties }));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const nextTab = () => {
    if (activeTab === "afmetingen") setActiveTab("type");
    else if (activeTab === "type") setActiveTab("materiaal");
    else if (activeTab === "materiaal") setActiveTab("opties");
    else if (activeTab === "opties") setActiveTab("resultaat");
  };

  const previousTab = () => {
    if (activeTab === "resultaat") setActiveTab("opties");
    else if (activeTab === "opties") setActiveTab("materiaal");
    else if (activeTab === "materiaal") setActiveTab("type");
    else if (activeTab === "type") setActiveTab("afmetingen");
  };

  return (
    <Card className="shadow-lg border-2 border-gray-200">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="bg-gray-50 p-4 border-b">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="afmetingen">1. Afmetingen</TabsTrigger>
              <TabsTrigger value="type">2. Type</TabsTrigger>
              <TabsTrigger value="materiaal">3. Materiaal</TabsTrigger>
              <TabsTrigger value="opties">4. Opties</TabsTrigger>
              <TabsTrigger value="resultaat">5. Resultaat</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="afmetingen">
              <DimensionsSelector 
                breedte={configuration.breedte} 
                hoogte={configuration.hoogte} 
                onChange={updateDimensions}
                onNext={nextTab}
              />
            </TabsContent>
            
            <TabsContent value="type">
              <TypeSelector 
                selectedType={configuration.type} 
                onChange={updateType}
                onNext={nextTab}
                onPrevious={previousTab}
              />
            </TabsContent>
            
            <TabsContent value="materiaal">
              <MaterialSelector 
                selectedMaterial={configuration.materiaal} 
                onChange={updateMaterial}
                onNext={nextTab}
                onPrevious={previousTab}
              />
            </TabsContent>
            
            <TabsContent value="opties">
              <OptionsSelector 
                selectedOptions={configuration.opties} 
                onChange={updateOptions}
                onNext={nextTab}
                onPrevious={previousTab}
              />
            </TabsContent>
            
            <TabsContent value="resultaat">
              <PriceDisplay 
                configuration={configuration} 
                totalPrice={totalPrice}
                onPrevious={previousTab}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
