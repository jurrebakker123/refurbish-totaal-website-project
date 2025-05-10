
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, DownloadCloud, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';

const AdminPriceEditor = () => {
  const [prices, setPrices] = useState({
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
    }
  });

  useEffect(() => {
    // Load saved prices from localStorage if available
    const savedPrices = localStorage.getItem('calculatorPrices');
    if (savedPrices) {
      try {
        setPrices(JSON.parse(savedPrices));
      } catch (e) {
        console.error('Failed to parse saved prices', e);
      }
    }
  }, []);

  const handleBasePriceChange = (type: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      basePrices: {
        ...prev.basePrices,
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const handleMultiplierChange = (material: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      materialMultipliers: {
        ...prev.materialMultipliers,
        [material]: parseFloat(value) || 0
      }
    }));
  };

  const handleOptionCostChange = (option: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      optionCosts: {
        ...prev.optionCosts,
        [option]: parseFloat(value) || 0
      }
    }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem('calculatorPrices', JSON.stringify(prices));
      toast.success('Prijzen succesvol opgeslagen');
    } catch (e) {
      toast.error('Er is een fout opgetreden bij het opslaan');
      console.error('Failed to save prices', e);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(prices, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'calculator-prijzen.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Prijzen geëxporteerd als JSON bestand');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedPrices = JSON.parse(content);
        setPrices(importedPrices);
        toast.success('Prijzen succesvol geïmporteerd');
      } catch (error) {
        toast.error('Fout bij het importeren van het bestand');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dakkapel Calculator Prijzen</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => document.getElementById('file-import')?.click()}
          >
            <UploadCloud className="h-4 w-4" />
            <span>Importeren</span>
          </Button>
          <input
            id="file-import"
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <DownloadCloud className="h-4 w-4" />
            <span>Exporteren</span>
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            <span>Opslaan</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="basePrices">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="basePrices">Basis Prijzen</TabsTrigger>
          <TabsTrigger value="materialMultipliers">Materiaal Vermenigvuldigers</TabsTrigger>
          <TabsTrigger value="optionCosts">Optie Kosten</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basePrices">
          <Card>
            <CardHeader>
              <CardTitle>Basis Prijzen per Type</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prices.basePrices).map(([type, price]) => (
                <div key={type} className="flex flex-col space-y-1">
                  <label htmlFor={`base-${type}`} className="text-sm font-medium text-gray-700">
                    Type {type.replace('type', '')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      €
                    </span>
                    <Input
                      id={`base-${type}`}
                      type="number"
                      value={price}
                      onChange={(e) => handleBasePriceChange(type, e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Opslaan</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="materialMultipliers">
          <Card>
            <CardHeader>
              <CardTitle>Materiaal Vermenigvuldigers</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prices.materialMultipliers).map(([material, multiplier]) => (
                <div key={material} className="flex flex-col space-y-1">
                  <label htmlFor={`multiplier-${material}`} className="text-sm font-medium text-gray-700">
                    {material.charAt(0).toUpperCase() + material.slice(1).replace('_', ' ')}
                  </label>
                  <Input
                    id={`multiplier-${material}`}
                    type="number"
                    value={multiplier}
                    onChange={(e) => handleMultiplierChange(material, e.target.value)}
                    step="0.01"
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Opslaan</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="optionCosts">
          <Card>
            <CardHeader>
              <CardTitle>Optie Kosten</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prices.optionCosts).map(([option, cost]) => (
                <div key={option} className="flex flex-col space-y-1">
                  <label htmlFor={`option-${option}`} className="text-sm font-medium text-gray-700">
                    {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      €
                    </span>
                    <Input
                      id={`option-${option}`}
                      type="number"
                      value={cost}
                      onChange={(e) => handleOptionCostChange(option, e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Opslaan</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPriceEditor;
