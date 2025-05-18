
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, ChevronRight, CheckCircle, Info, X } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Tooltip } from '@/components/ui/tooltip';

export interface InteractiveDakkapelCalculatorProps {
  onBack: () => void;
}

// Define price constants
const PRICES = {
  width: {
    '0-180': 6100,
    '180-240': 6575,
    '240-300': 6985,
    '300-360': 7575,
    '360-420': 8000,
    '420-480': 8430,
    '480-540': 8860,
    '540+': 9300,
  },
  roofSlope: {
    '45-60': 0,
    '35-45': 200,
    '25-35': 450,
  },
  model: {
    'plat': 0,
    'schuin': 350,
    'dubbeleNok': 850,
    'eenzijigeNok': 650,
  },
  material: {
    'keralit': 0,
    'hout': 450,
    'zink': 750,
  },
  extras: {
    'ventilatie': 120,
    'zonwering': 850,
    'horren': 240,
    'airco': 1250,
  }
};

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Naam is verplicht' }),
  email: z.string().email({ message: 'Ongeldig e-mailadres' }),
  phone: z.string().min(10, { message: 'Ongeldig telefoonnummer' }),
  address: z.string().min(2, { message: 'Adres is verplicht' }),
  postcode: z.string().min(6, { message: 'Geldige postcode is verplicht' }),
  city: z.string().min(2, { message: 'Plaats is verplicht' }),
  message: z.string().optional(),
});

export function InteractiveDakkapelCalculator({ onBack }: InteractiveDakkapelCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(8);
  const [configuration, setConfiguration] = useState({
    width: '180-240', // default selection
    roofSlope: '45-60', // default selection
    model: 'plat', // default selection
    material: 'keralit', // default selection
    colors: {
      boei: 'wit',
      zijwanden: 'wit',
      kozijnen: 'wit',
      draaiendeDelen: 'wit',
    },
    extras: {
      ventilatie: false,
      zonwering: false,
      horren: false,
      airco: false,
    },
    timeline: 'asap',
  });

  // Setup form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      postcode: '',
      city: '',
      message: '',
    },
  });

  // Calculate price based on selections
  const calculatePrice = () => {
    let basePrice = PRICES.width[configuration.width as keyof typeof PRICES.width];
    basePrice += PRICES.roofSlope[configuration.roofSlope as keyof typeof PRICES.roofSlope];
    basePrice += PRICES.model[configuration.model as keyof typeof PRICES.model];
    basePrice += PRICES.material[configuration.material as keyof typeof PRICES.material];
    
    // Add extras
    Object.entries(configuration.extras).forEach(([key, value]) => {
      if (value) {
        basePrice += PRICES.extras[key as keyof typeof PRICES.extras];
      }
    });
    
    return basePrice;
  };

  const estimatedPrice = calculatePrice();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Combine form data with configuration
    const submissionData = {
      ...values,
      configuration
    };
    
    console.log('Form submitted:', submissionData);
    
    // Show success message
    toast.success('Uw configuratie is succesvol verzonden!', {
      description: 'We nemen zo snel mogelijk contact met u op.',
    });
    
    // Reset to start
    setTimeout(() => {
      onBack();
    }, 3000);
  };

  // Width selection icons
  const widthOptions = [
    { value: '0-180', label: '0 – 180 cm', price: PRICES.width['0-180'], icon: '⬜' },
    { value: '180-240', label: '180 – 240 cm', price: PRICES.width['180-240'], icon: '⬛' },
    { value: '240-300', label: '240 – 300 cm', price: PRICES.width['240-300'], icon: '⬛⬜' },
    { value: '300-360', label: '300 – 360 cm', price: PRICES.width['300-360'], icon: '⬛⬜⬜' },
    { value: '360-420', label: '360 – 420 cm', price: PRICES.width['360-420'], icon: '⬛⬜⬜⬜' },
    { value: '420-480', label: '420 – 480 cm', price: PRICES.width['420-480'], icon: '⬛⬜⬜⬜⬜' },
    { value: '480-540', label: '480 – 540 cm', price: PRICES.width['480-540'], icon: '⬛⬜⬜⬜⬜⬜' },
    { value: '540+', label: 'Groter dan 540 cm', price: PRICES.width['540+'], icon: '⬛⬜⬜⬜⬜⬜⬜' },
  ];

  // Roof slope options
  const roofSlopeOptions = [
    { value: '45-60', label: '45° – 60°', info: 'Meest gekozen', price: PRICES.roofSlope['45-60'] },
    { value: '35-45', label: '35° – 45°', info: '', price: PRICES.roofSlope['35-45'] },
    { value: '25-35', label: '25° – 35°', info: '', price: PRICES.roofSlope['25-35'] },
    { value: 'unknown', label: 'Weet ik niet', info: 'Wij meten dit gratis voor u in', price: 0 },
  ];

  // Model options
  const modelOptions = [
    { value: 'plat', label: 'Dakkapel plat dak', price: PRICES.model['plat'], image: '/lovable-uploads/ab4fe583-5611-4401-93c9-7fb7d38fd340.png' },
    { value: 'schuin', label: 'Dakkapel schuin dak', price: PRICES.model['schuin'], image: '/lovable-uploads/b080c873-1f58-400e-8855-b4cc787a6859.png' },
    { value: 'dubbeleNok', label: 'Dubbele nokverhoging', price: PRICES.model['dubbeleNok'], image: '/lovable-uploads/ce310265-aaac-49aa-bff7-99a27901151a.png' },
    { value: 'eenzijigeNok', label: 'Eenzijdige nokverhoging', price: PRICES.model['eenzijigeNok'], image: '/lovable-uploads/e632305e-de71-4e39-ac65-2e0bb9fb20ea.png' },
  ];

  // Material options
  const materialOptions = [
    { value: 'keralit', label: 'Keralit', price: PRICES.material['keralit'] },
    { value: 'hout', label: 'Hout', price: PRICES.material['hout'] },
    { value: 'zink', label: 'Zink', price: PRICES.material['zink'] },
  ];

  // Color options
  const colorOptions = [
    { value: 'wit', label: 'Wit', color: '#FFFFFF', border: true },
    { value: 'crème', label: 'Crème', color: '#F5F5DC' },
    { value: 'blauw', label: 'Blauw', color: '#1E90FF' },
    { value: 'groen', label: 'Groen', color: '#2E8B57' },
    { value: 'antraciet', label: 'Antraciet', color: '#36454F' },
    { value: 'kwartsgrijs', label: 'Kwartsgrijs', color: '#708090' },
    { value: 'anders', label: 'Anders', color: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)' },
  ];

  // Extras options
  const extrasOptions = [
    { value: 'ventilatie', label: 'Ventilatieroosters', price: PRICES.extras['ventilatie'] },
    { value: 'zonwering', label: 'Zonwering (Somfy-Ilmo motor)', price: PRICES.extras['zonwering'] },
    { value: 'horren', label: 'Horren', price: PRICES.extras['horren'] },
    { value: 'airco', label: 'Airco', price: PRICES.extras['airco'] },
  ];

  // Timeline options
  const timelineOptions = [
    { value: 'asap', label: 'Zo snel mogelijk' },
    { value: '3-6', label: 'Binnen 3 – 6 maanden' },
    { value: '6-9', label: 'Binnen 6 – 9 maanden' },
    { value: '9+', label: '9 maanden of later' },
  ];

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-6">
        <button 
          onClick={handlePrevious}
          className="flex items-center text-brand-darkGreen hover:text-brand-lightGreen transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Terug
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main configurator area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-brand-darkGreen">Stap {currentStep} van {totalSteps}</span>
                <span className="text-sm font-medium text-brand-darkGreen">{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-lightGreen h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Step content */}
            <div className="mt-8">
              {/* Step 1: Width selection */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Hoe breed moet uw dakkapel worden?</h2>
                  <p className="text-gray-600 mb-6">Kies de gewenste breedte van uw dakkapel:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {widthOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer border-2 hover:shadow-md transition-all ${
                          configuration.width === option.value ? 'border-brand-lightGreen' : 'border-gray-100'
                        }`}
                        onClick={() => setConfiguration({...configuration, width: option.value})}
                      >
                        <div className="p-4 flex justify-between items-center">
                          <div className="flex flex-col">
                            <div className="text-lg mb-2">{option.label}</div>
                            <div className="text-lg font-bold text-brand-darkGreen">
                              vanaf €{option.price.toLocaleString('nl-NL')},-
                            </div>
                          </div>
                          <div className="text-2xl ml-2">
                            {option.icon}
                            {configuration.width === option.value && (
                              <div className="mt-2 flex justify-end">
                                <CheckCircle className="h-6 w-6 text-brand-lightGreen" />
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 2: Roof slope */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Wat is de helling van uw dak?</h2>
                  <p className="text-gray-600 mb-6">Selecteer de hellingsgraad van uw dak:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roofSlopeOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer border-2 hover:shadow-md transition-all ${
                          configuration.roofSlope === option.value ? 'border-brand-lightGreen' : 'border-gray-100'
                        } ${option.value === 'unknown' ? 'bg-gray-50' : ''}`}
                        onClick={() => setConfiguration({...configuration, roofSlope: option.value})}
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-lg">{option.label}</div>
                              {option.info && (
                                <div className="text-sm text-brand-lightGreen font-medium mt-1">
                                  {option.info}
                                </div>
                              )}
                              {option.price > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                  + €{option.price.toLocaleString('nl-NL')}
                                </div>
                              )}
                            </div>
                            {configuration.roofSlope === option.value && (
                              <CheckCircle className="h-6 w-6 text-brand-lightGreen" />
                            )}
                          </div>
                          
                          {option.value === 'unknown' && (
                            <div className="mt-3 p-2 bg-blue-50 rounded-md flex items-start">
                              <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-blue-700">
                                Geen probleem. Wij meten dit gratis voor u in.
                              </span>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 3: Model selection */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Welk model spreekt u aan?</h2>
                  <p className="text-gray-600 mb-6">Kies het model dat het beste bij uw woning past:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modelOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer border-2 hover:shadow-md transition-all ${
                          configuration.model === option.value ? 'border-brand-lightGreen' : 'border-gray-100'
                        }`}
                        onClick={() => setConfiguration({...configuration, model: option.value})}
                      >
                        <div className="p-4">
                          <div className="aspect-[4/3] mb-4 bg-gray-100 rounded-md overflow-hidden relative">
                            <OptimizedImage 
                              src={option.image} 
                              alt={option.label} 
                              objectFit="cover" 
                            />
                            {configuration.model === option.value && (
                              <div className="absolute top-2 right-2">
                                <div className="bg-brand-lightGreen text-white rounded-full p-1">
                                  <CheckCircle className="h-5 w-5" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-lg font-medium">{option.label}</div>
                              {option.price > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                  + €{option.price.toLocaleString('nl-NL')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 4: Material selection */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Kies uw afwerkmateriaal</h2>
                  <p className="text-gray-600 mb-6">Selecteer het materiaal voor de afwerking van uw dakkapel:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {materialOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer border-2 hover:shadow-md transition-all ${
                          configuration.material === option.value ? 'border-brand-lightGreen' : 'border-gray-100'
                        }`}
                        onClick={() => setConfiguration({...configuration, material: option.value})}
                      >
                        <div className="p-4">
                          <div className="h-32 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
                            <div className="text-2xl font-bold text-gray-400">{option.label}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-lg font-medium">{option.label}</div>
                              {option.price > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                  + €{option.price.toLocaleString('nl-NL')}
                                </div>
                              )}
                            </div>
                            {configuration.material === option.value && (
                              <CheckCircle className="h-6 w-6 text-brand-lightGreen" />
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 5: Color selection */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Kies uw kleuren</h2>
                  <p className="text-gray-600 mb-6">Selecteer de kleuren voor verschillende onderdelen:</p>
                  
                  <div className="space-y-8">
                    {/* Boei colors */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Boeien</h3>
                      <div className="flex flex-wrap gap-3">
                        {colorOptions.map((color) => (
                          <div 
                            key={`boei-${color.value}`}
                            onClick={() => setConfiguration({
                              ...configuration, 
                              colors: {...configuration.colors, boei: color.value}
                            })}
                            className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all ${
                              color.border ? 'border border-gray-300' : ''
                            } ${configuration.colors.boei === color.value ? 'ring-2 ring-offset-2 ring-brand-lightGreen' : ''}`}
                            style={{ background: color.color }}
                            title={color.label}
                          >
                            {configuration.colors.boei === color.value && (
                              <CheckCircle className={`h-6 w-6 ${color.value === 'wit' ? 'text-gray-800' : 'text-white'}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Zijwanden colors */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Zijwanden</h3>
                      <div className="flex flex-wrap gap-3">
                        {colorOptions.map((color) => (
                          <div 
                            key={`zijwanden-${color.value}`}
                            onClick={() => setConfiguration({
                              ...configuration, 
                              colors: {...configuration.colors, zijwanden: color.value}
                            })}
                            className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all ${
                              color.border ? 'border border-gray-300' : ''
                            } ${configuration.colors.zijwanden === color.value ? 'ring-2 ring-offset-2 ring-brand-lightGreen' : ''}`}
                            style={{ background: color.color }}
                            title={color.label}
                          >
                            {configuration.colors.zijwanden === color.value && (
                              <CheckCircle className={`h-6 w-6 ${color.value === 'wit' ? 'text-gray-800' : 'text-white'}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Kozijnen colors */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Kozijnen</h3>
                      <div className="flex flex-wrap gap-3">
                        {colorOptions.map((color) => (
                          <div 
                            key={`kozijnen-${color.value}`}
                            onClick={() => setConfiguration({
                              ...configuration, 
                              colors: {...configuration.colors, kozijnen: color.value}
                            })}
                            className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all ${
                              color.border ? 'border border-gray-300' : ''
                            } ${configuration.colors.kozijnen === color.value ? 'ring-2 ring-offset-2 ring-brand-lightGreen' : ''}`}
                            style={{ background: color.color }}
                            title={color.label}
                          >
                            {configuration.colors.kozijnen === color.value && (
                              <CheckCircle className={`h-6 w-6 ${color.value === 'wit' ? 'text-gray-800' : 'text-white'}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Draaiende delen colors */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Draaiende delen</h3>
                      <div className="flex flex-wrap gap-3">
                        {colorOptions.map((color) => (
                          <div 
                            key={`draaiendeDelen-${color.value}`}
                            onClick={() => setConfiguration({
                              ...configuration, 
                              colors: {...configuration.colors, draaiendeDelen: color.value}
                            })}
                            className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all ${
                              color.border ? 'border border-gray-300' : ''
                            } ${configuration.colors.draaiendeDelen === color.value ? 'ring-2 ring-offset-2 ring-brand-lightGreen' : ''}`}
                            style={{ background: color.color }}
                            title={color.label}
                          >
                            {configuration.colors.draaiendeDelen === color.value && (
                              <CheckCircle className={`h-6 w-6 ${color.value === 'wit' ? 'text-gray-800' : 'text-white'}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 6: Extra options */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Wilt u extra opties?</h2>
                  <p className="text-gray-600 mb-6">Selecteer eventuele extra's voor uw dakkapel:</p>
                  
                  <div className="space-y-4">
                    {extrasOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className="border border-gray-200"
                      >
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Checkbox 
                              id={`extra-${option.value}`} 
                              checked={configuration.extras[option.value as keyof typeof configuration.extras]}
                              onCheckedChange={(checked) => {
                                setConfiguration({
                                  ...configuration,
                                  extras: {
                                    ...configuration.extras,
                                    [option.value]: checked === true
                                  }
                                });
                              }}
                              className="mr-3 data-[state=checked]:bg-brand-lightGreen data-[state=checked]:border-brand-lightGreen h-5 w-5"
                            />
                            <label htmlFor={`extra-${option.value}`} className="text-lg cursor-pointer">
                              {option.label}
                            </label>
                          </div>
                          <div className="text-brand-darkGreen font-medium">
                            + €{option.price.toLocaleString('nl-NL')}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 7: Timeline */}
              {currentStep === 7 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Wat is uw gewenste uitvoeringsmoment?</h2>
                  <p className="text-gray-600 mb-6">Wanneer zou u uw dakkapel willen laten plaatsen?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {timelineOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer border-2 hover:shadow-md transition-all ${
                          configuration.timeline === option.value ? 'border-brand-lightGreen' : 'border-gray-100'
                        }`}
                        onClick={() => setConfiguration({...configuration, timeline: option.value})}
                      >
                        <div className="p-4 flex justify-between items-center">
                          <div className="text-lg">{option.label}</div>
                          {configuration.timeline === option.value && (
                            <CheckCircle className="h-6 w-6 text-brand-lightGreen" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 8: Contact form */}
              {currentStep === 8 && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Ontvang uw persoonlijke offerte</h2>
                  <p className="text-gray-600 mb-6">Vul uw gegevens in om een persoonlijke offerte te ontvangen:</p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Naam</FormLabel>
                              <FormControl>
                                <Input placeholder="Uw volledige naam" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="uw@email.nl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefoonnummer</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="06 12345678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adres</FormLabel>
                              <FormControl>
                                <Input placeholder="Straatnaam en huisnummer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="postcode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postcode</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 AB" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Plaats</FormLabel>
                                <FormControl>
                                  <Input placeholder="Uw woonplaats" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Opmerkingen (optioneel)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Heeft u nog specifieke wensen of vragen?" 
                                {...field} 
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-brand-lightGreen hover:bg-opacity-90 text-white px-8 py-2 text-lg"
                        >
                          Offerte aanvragen
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
            </div>
            
            {/* Navigation buttons */}
            <div className={`flex ${currentStep !== totalSteps ? 'justify-between' : 'justify-start'} mt-10`}>
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="px-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug
              </Button>
              
              {currentStep < totalSteps && (
                <Button 
                  onClick={handleNext}
                  className="bg-brand-lightGreen hover:bg-opacity-90 text-white px-6"
                >
                  Volgende
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Configuration summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-brand-darkGreen mb-4">Overzicht van uw samenstelling</h3>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="text-sm text-gray-500">Breedte</div>
                <div className="text-brand-darkGreen font-medium">
                  {widthOptions.find(option => option.value === configuration.width)?.label || '-'}
                </div>
              </div>
              
              {currentStep > 1 && (
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Dakhelling</div>
                  <div className="text-brand-darkGreen font-medium">
                    {roofSlopeOptions.find(option => option.value === configuration.roofSlope)?.label || '-'}
                  </div>
                </div>
              )}
              
              {currentStep > 2 && (
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Model</div>
                  <div className="text-brand-darkGreen font-medium">
                    {modelOptions.find(option => option.value === configuration.model)?.label || '-'}
                  </div>
                </div>
              )}
              
              {currentStep > 3 && (
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Materiaal</div>
                  <div className="text-brand-darkGreen font-medium">
                    {materialOptions.find(option => option.value === configuration.material)?.label || '-'}
                  </div>
                </div>
              )}
              
              {currentStep > 4 && (
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Kleuren</div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-1 border border-gray-300"
                        style={{ 
                          background: colorOptions.find(c => c.value === configuration.colors.boei)?.color || '#FFFFFF'
                        }}
                      ></div>
                      <span className="text-xs">Boeien</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-1 border border-gray-300"
                        style={{ 
                          background: colorOptions.find(c => c.value === configuration.colors.zijwanden)?.color || '#FFFFFF'
                        }}
                      ></div>
                      <span className="text-xs">Zijwanden</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-1 border border-gray-300"
                        style={{ 
                          background: colorOptions.find(c => c.value === configuration.colors.kozijnen)?.color || '#FFFFFF'
                        }}
                      ></div>
                      <span className="text-xs">Kozijnen</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-1 border border-gray-300"
                        style={{ 
                          background: colorOptions.find(c => c.value === configuration.colors.draaiendeDelen)?.color || '#FFFFFF'
                        }}
                      ></div>
                      <span className="text-xs">Draaiende delen</span>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep > 5 && (
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Extra opties</div>
                  <div>
                    {Object.entries(configuration.extras).some(([_, value]) => value) ? (
                      <div className="space-y-1 mt-1">
                        {Object.entries(configuration.extras).map(([key, value]) => (
                          value && (
                            <div key={key} className="flex items-center text-sm text-brand-darkGreen">
                              <CheckCircle className="h-3 w-3 mr-1 text-brand-lightGreen" />
                              {extrasOptions.find(opt => opt.value === key)?.label}
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <div className="text-brand-darkGreen font-medium">Geen extra's geselecteerd</div>
                    )}
                  </div>
                </div>
              )}
              
              {currentStep > 6 && (
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Gewenste levertijd</div>
                  <div className="text-brand-darkGreen font-medium">
                    {timelineOptions.find(option => option.value === configuration.timeline)?.label || '-'}
                  </div>
                </div>
              )}
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Geschatte prijs</div>
                  <div className="text-xl font-bold text-brand-darkGreen">
                    € {estimatedPrice.toLocaleString('nl-NL')},-
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  * Prijs is indicatief, inclusief BTW en montage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
