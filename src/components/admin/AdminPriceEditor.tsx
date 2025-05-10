
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, DownloadCloud, UploadCloud, RefreshCcw } from 'lucide-react';
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
    },
    rcValueCosts: {
      standaard: 0,
      upgrade_6_0: 218,
      upgrade_6_5: 250
    },
    kozijnHoogteAdjustments: {
      standaard: 0,
      medium: 150,
      large: 300,
      extra_large: 450
    },
    colorSurcharges: {
      wit: 0,
      crème: 0,
      grijs: 210,
      antraciet: 210,
      zwart: 210,
      staalblauw: 210,
      dennengroen: 210
    }
  });

  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'success', 'error'

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

  // Input change handlers
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

  const handleRCValueChange = (rcValue: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      rcValueCosts: {
        ...prev.rcValueCosts,
        [rcValue]: parseFloat(value) || 0
      }
    }));
  };

  const handleKozijnHoogteChange = (height: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      kozijnHoogteAdjustments: {
        ...prev.kozijnHoogteAdjustments,
        [height]: parseFloat(value) || 0
      }
    }));
  };

  const handleColorSurchargeChange = (color: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      colorSurcharges: {
        ...prev.colorSurcharges,
        [color]: parseFloat(value) || 0
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

  // Save and update prices in localStorage and dispatch a custom event
  const saveChanges = () => {
    try {
      setSaveStatus('saving');
      // Store the prices in localStorage
      localStorage.setItem('calculatorPrices', JSON.stringify(prices));
      
      // Create and dispatch a custom event for same-window components
      const priceUpdateEvent = new CustomEvent('priceUpdate');
      window.dispatchEvent(priceUpdateEvent);
      
      // Force a localStorage event to notify other tabs
      const storageEvent = new StorageEvent('storage', {
        key: 'calculatorPrices',
        newValue: JSON.stringify(prices)
      });
      window.dispatchEvent(storageEvent);
      
      // Indicate success
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
      
      return true;
    } catch (e) {
      console.error('Failed to save prices', e);
      setSaveStatus('error');
      return false;
    }
  };

  const handleSave = () => {
    if (saveChanges()) {
      toast.success('Prijzen succesvol opgeslagen en bijgewerkt');
    } else {
      toast.error('Er is een fout opgetreden bij het opslaan');
    }
  };

  const handleExport = () => {
    try {
      // Create Excel-compatible CSV
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Create headers for each section
      csvContent += "Type,Basisprijs\n";
      Object.entries(prices.basePrices).forEach(([type, price]) => {
        csvContent += `${type},${price}\n`;
      });
      
      csvContent += "\nMateriaal,Vermenigvuldiger\n";
      Object.entries(prices.materialMultipliers).forEach(([material, multiplier]) => {
        csvContent += `${material},${multiplier}\n`;
      });
      
      csvContent += "\nOptie,Kosten\n";
      Object.entries(prices.optionCosts).forEach(([option, cost]) => {
        csvContent += `${option},${cost}\n`;
      });
      
      csvContent += "\nRC-Waarde,Kosten\n";
      Object.entries(prices.rcValueCosts).forEach(([value, cost]) => {
        csvContent += `${value},${cost}\n`;
      });
      
      csvContent += "\nKozijn Hoogte,Aanpassing\n";
      Object.entries(prices.kozijnHoogteAdjustments).forEach(([height, adjustment]) => {
        csvContent += `${height},${adjustment}\n`;
      });
      
      csvContent += "\nKleur,Toeslag\n";
      Object.entries(prices.colorSurcharges).forEach(([color, surcharge]) => {
        csvContent += `${color},${surcharge}\n`;
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "dakkapel_prijzen.csv");
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      document.body.removeChild(link);
      
      toast.success('Excel-bestand geëxporteerd');
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Exporteren mislukt');
    }
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
        toast.info('Prijzen geïmporteerd. Klik op Opslaan om de wijzigingen door te voeren.');
      } catch (error) {
        toast.error('Fout bij het importeren van het bestand');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };

  // Force update to test connection with calculator
  const handleForceUpdate = () => {
    // Create and dispatch custom event
    const priceUpdateEvent = new CustomEvent('priceUpdate');
    window.dispatchEvent(priceUpdateEvent);
    
    // Force storage event for other tabs
    const storageEvent = new StorageEvent('storage', {
      key: 'calculatorPrices',
      newValue: localStorage.getItem('calculatorPrices')
    });
    window.dispatchEvent(storageEvent);
    
    toast.info('Prijzen update signaal verzonden', { duration: 2000 });
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
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleForceUpdate}
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Vernieuwen</span>
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
          >
            <Save className="h-4 w-4" />
            <span>
              {saveStatus === 'saving' ? 'Opslaan...' : 
               saveStatus === 'success' ? 'Opgeslagen!' : 
               saveStatus === 'error' ? 'Fout!' : 
               'Opslaan'}
            </span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="basePrices">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="basePrices">Basis Prijzen</TabsTrigger>
          <TabsTrigger value="materialMultipliers">Materialen</TabsTrigger>
          <TabsTrigger value="optionCosts">Opties</TabsTrigger>
          <TabsTrigger value="kozijnRc">Kozijn & RC</TabsTrigger>
          <TabsTrigger value="colors">Kleuren</TabsTrigger>
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
        
        <TabsContent value="kozijnRc">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Kozijn Hoogte Aanpassingen</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(prices.kozijnHoogteAdjustments).map(([height, adjustment]) => (
                  <div key={height} className="flex flex-col space-y-1">
                    <label htmlFor={`height-${height}`} className="text-sm font-medium text-gray-700">
                      {height.charAt(0).toUpperCase() + height.slice(1).replace('_', ' ')}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        €
                      </span>
                      <Input
                        id={`height-${height}`}
                        type="number"
                        value={adjustment}
                        onChange={(e) => handleKozijnHoogteChange(height, e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>RC-Waarde Kosten</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(prices.rcValueCosts).map(([rcValue, cost]) => (
                  <div key={rcValue} className="flex flex-col space-y-1">
                    <label htmlFor={`rc-${rcValue}`} className="text-sm font-medium text-gray-700">
                      {rcValue.charAt(0).toUpperCase() + rcValue.slice(1).replace('_', ' ')}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        €
                      </span>
                      <Input
                        id={`rc-${rcValue}`}
                        type="number"
                        value={cost}
                        onChange={(e) => handleRCValueChange(rcValue, e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Opslaan</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Kleur Toeslagen</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prices.colorSurcharges).map(([color, surcharge]) => (
                <div key={color} className="flex flex-col space-y-1">
                  <label htmlFor={`color-${color}`} className="text-sm font-medium text-gray-700">
                    {color.charAt(0).toUpperCase() + color.slice(1).replace('_', ' ')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      €
                    </span>
                    <Input
                      id={`color-${color}`}
                      type="number"
                      value={surcharge}
                      onChange={(e) => handleColorSurchargeChange(color, e.target.value)}
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
