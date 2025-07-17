import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Euro, 
  Save, 
  RefreshCw,
  TrendingUp,
  Calculator,
  Brush,
  Hammer,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface PriceItem {
  id: string;
  service: string;
  category: string;
  name: string;
  basePrice: number;
  unit: string;
  multiplier?: number;
  isActive: boolean;
}

const WordPressPriceManager = () => {
  const [priceData, setPriceData] = useState<{
    dakkapel: PriceItem[];
    schilder: PriceItem[];
    stukadoor: PriceItem[];
    general: PriceItem[];
  }>({
    dakkapel: [],
    schilder: [],
    stukadoor: [],
    general: []
  });

  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<PriceItem | null>(null);

  useEffect(() => {
    loadPriceData();
  }, []);

  const loadPriceData = () => {
    // Mock data - in real implementation this would come from database
    const mockData = {
      dakkapel: [
        {
          id: '1',
          service: 'dakkapel',
          category: 'materiaal',
          name: 'Hout',
          basePrice: 250,
          unit: 'per m²',
          multiplier: 1.0,
          isActive: true
        },
        {
          id: '2',
          service: 'dakkapel',
          category: 'materiaal',
          name: 'Kunststof',
          basePrice: 200,
          unit: 'per m²',
          multiplier: 0.8,
          isActive: true
        },
        {
          id: '3',
          service: 'dakkapel',
          category: 'arbeid',
          name: 'Standaard installatie',
          basePrice: 150,
          unit: 'per uur',
          multiplier: 1.0,
          isActive: true
        }
      ],
      schilder: [
        {
          id: '4',
          service: 'schilder',
          category: 'verf',
          name: 'Muurverf standaard',
          basePrice: 35,
          unit: 'per m²',
          multiplier: 1.0,
          isActive: true
        },
        {
          id: '5',
          service: 'schilder',
          category: 'verf',
          name: 'Muurverf premium',
          basePrice: 45,
          unit: 'per m²',
          multiplier: 1.3,
          isActive: true
        },
        {
          id: '6',
          service: 'schilder',
          category: 'arbeid',
          name: 'Schilderwerk',
          basePrice: 40,
          unit: 'per uur',
          multiplier: 1.0,
          isActive: true
        }
      ],
      stukadoor: [
        {
          id: '7',
          service: 'stukadoor',
          category: 'materiaal',
          name: 'Standaard stuc',
          basePrice: 25,
          unit: 'per m²',
          multiplier: 1.0,
          isActive: true
        },
        {
          id: '8',
          service: 'stukadoor',
          category: 'materiaal',
          name: 'Premium gladstuc',
          basePrice: 40,
          unit: 'per m²',
          multiplier: 1.6,
          isActive: true
        },
        {
          id: '9',
          service: 'stukadoor',
          category: 'arbeid',
          name: 'Stukadoorwerk',
          basePrice: 45,
          unit: 'per uur',
          multiplier: 1.0,
          isActive: true
        }
      ],
      general: [
        {
          id: '10',
          service: 'general',
          category: 'btw',
          name: 'BTW Tarief',
          basePrice: 21,
          unit: '%',
          multiplier: 1.0,
          isActive: true
        },
        {
          id: '11',
          service: 'general',
          category: 'transport',
          name: 'Transportkosten',
          basePrice: 75,
          unit: 'per rit',
          multiplier: 1.0,
          isActive: true
        }
      ]
    };

    setPriceData(mockData);
  };

  const handleSavePrice = (item: PriceItem) => {
    setPriceData(prev => ({
      ...prev,
      [item.service]: prev[item.service as keyof typeof prev].map(p => 
        p.id === item.id ? item : p
      )
    }));
    setEditingItem(null);
    toast.success('Prijs succesvol bijgewerkt');
  };

  const handleAddPrice = (service: string) => {
    const newItem: PriceItem = {
      id: Date.now().toString(),
      service,
      category: 'nieuw',
      name: 'Nieuwe prijs item',
      basePrice: 0,
      unit: 'per eenheid',
      multiplier: 1.0,
      isActive: true
    };
    
    setPriceData(prev => ({
      ...prev,
      [service]: [...prev[service as keyof typeof prev], newItem]
    }));
    setEditingItem(newItem);
  };

  const handleDeletePrice = (service: string, itemId: string) => {
    if (!confirm('Weet je zeker dat je dit prijs item wilt verwijderen?')) return;
    
    setPriceData(prev => ({
      ...prev,
      [service]: prev[service as keyof typeof prev].filter(p => p.id !== itemId)
    }));
    toast.success('Prijs item succesvol verwijderd');
  };

  const PriceTable = ({ service, items, icon: Icon }: { 
    service: string; 
    items: PriceItem[]; 
    icon: React.ElementType 
  }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <CardTitle className="capitalize">{service} Prijzen</CardTitle>
          </div>
          <Button size="sm" onClick={() => handleAddPrice(service)}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Prijs
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              {editingItem?.id === item.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Naam</Label>
                    <Input
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Basisprijs</Label>
                    <Input
                      type="number"
                      value={editingItem.basePrice}
                      onChange={(e) => setEditingItem({ ...editingItem, basePrice: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Eenheid</Label>
                    <Input
                      value={editingItem.unit}
                      onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <Button size="sm" onClick={() => handleSavePrice(editingItem)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingItem(null)}>
                      Annuleer
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <Badge variant={item.isActive ? "default" : "secondary"}>
                        {item.isActive ? 'Actief' : 'Inactief'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">€{item.basePrice}</div>
                    <div className="text-sm text-gray-600">{item.unit}</div>
                    {item.multiplier !== 1.0 && (
                      <div className="text-xs text-blue-600">
                        Multiplier: {item.multiplier}x
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button size="sm" variant="ghost" onClick={() => setEditingItem(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeletePrice(service, item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prijzen Beheer</h1>
          <p className="text-gray-600 mt-2">Beheer alle service prijzen en tarieven</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadPriceData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Vernieuwen
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Alle Wijzigingen Opslaan
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Dakkapel Items</p>
                <p className="text-2xl font-bold">{priceData.dakkapel.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Brush className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Schilder Items</p>
                <p className="text-2xl font-bold">{priceData.schilder.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Hammer className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Stukadoor Items</p>
                <p className="text-2xl font-bold">{priceData.stukadoor.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Euro className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Algemeen Items</p>
                <p className="text-2xl font-bold">{priceData.general.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Tables */}
      <Tabs defaultValue="dakkapel" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dakkapel">Dakkapel</TabsTrigger>
          <TabsTrigger value="schilder">Schilderwerk</TabsTrigger>
          <TabsTrigger value="stukadoor">Stukadoorwerk</TabsTrigger>
          <TabsTrigger value="general">Algemeen</TabsTrigger>
        </TabsList>

        <TabsContent value="dakkapel">
          <PriceTable service="dakkapel" items={priceData.dakkapel} icon={Calculator} />
        </TabsContent>

        <TabsContent value="schilder">
          <PriceTable service="schilder" items={priceData.schilder} icon={Brush} />
        </TabsContent>

        <TabsContent value="stukadoor">
          <PriceTable service="stukadoor" items={priceData.stukadoor} icon={Hammer} />
        </TabsContent>

        <TabsContent value="general">
          <PriceTable service="general" items={priceData.general} icon={Euro} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WordPressPriceManager;