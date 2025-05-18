
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Ruler, 
  Triangle, 
  Home, 
  Palette, 
  Check, 
  Calendar,
  ChevronRight, 
  ChevronLeft,
  ArrowDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Step types
type ConfigStep = 'intro' | 'width' | 'roofPitch' | 'model' | 'material' | 'colors' | 'extras' | 'deliveryTime' | 'contact';

// Width options
type WidthOption = {
  range: string;
  min: number;
  max: number;
  price: number;
};

// Model options
type ModelOption = {
  id: string;
  name: string;
  imageUrl: string;
};

// Color options
type ColorOption = 'wit' | 'crème' | 'blauw' | 'groen' | 'antraciet' | 'kwartsgrijs' | 'anders';

// Configuration type
interface DakkapelConfiguration {
  width: WidthOption | null;
  roofPitch: string | null;
  model: string | null;
  material: string | null;
  colors: {
    boeien: ColorOption;
    zijwanden: ColorOption;
    kozijnen: ColorOption;
  };
  extras: {
    ventilatieroosters: boolean;
    zonwering: boolean;
    horren: boolean;
    airco: boolean;
  };
  deliveryTime: string | null;
  contact: {
    name: string;
    email: string;
    phone: string;
    address: string;
    comment: string;
  };
}

// Form schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Naam moet minimaal 2 tekens bevatten",
  }),
  email: z.string().email({
    message: "Ongeldig e-mailadres",
  }),
  phone: z.string().min(10, {
    message: "Ongeldig telefoonnummer",
  }),
  address: z.string().min(5, {
    message: "Vul een geldig adres in",
  }),
  comment: z.string().optional(),
});

export const DakkapelConfigurator: React.FC = () => {
  // Current step state
  const [currentStep, setCurrentStep] = useState<ConfigStep>('intro');
  
  // Configuration state
  const [configuration, setConfiguration] = useState<DakkapelConfiguration>({
    width: null,
    roofPitch: null,
    model: null,
    material: null,
    colors: {
      boeien: 'wit',
      zijwanden: 'wit',
      kozijnen: 'wit'
    },
    extras: {
      ventilatieroosters: false,
      zonwering: false,
      horren: false,
      airco: false
    },
    deliveryTime: null,
    contact: {
      name: '',
      email: '',
      phone: '',
      address: '',
      comment: ''
    }
  });

  // Setup form
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  // Width options
  const widthOptions: WidthOption[] = [
    { range: '0 – 180 cm', min: 0, max: 180, price: 6100 },
    { range: '180 – 240 cm', min: 180, max: 240, price: 6575 },
    { range: '240 – 300 cm', min: 240, max: 300, price: 6985 },
    { range: '300 – 360 cm', min: 300, max: 360, price: 7575 },
    { range: '360 – 420 cm', min: 360, max: 420, price: 8000 },
    { range: '420 – 480 cm', min: 420, max: 480, price: 8430 },
    { range: '480 – 540 cm', min: 480, max: 540, price: 8860 },
    { range: 'Groter dan 540 cm', min: 540, max: 999, price: 9300 }
  ];

  // Roof pitch options
  const roofPitchOptions = [
    { value: '45-60', label: '45° – 60° (meest gekozen)' },
    { value: '35-45', label: '35° – 45°' },
    { value: '25-35', label: '25° – 35°' },
    { value: 'unknown', label: 'Weet ik niet' }
  ];

  // Model options
  const modelOptions: ModelOption[] = [
    { id: 'plat', name: 'Dakkapel plat dak', imageUrl: '/lovable-uploads/b080c873-1f58-400e-8855-b4cc787a6859.png' },
    { id: 'schuin', name: 'Dakkapel schuin dak', imageUrl: '/lovable-uploads/f73444a4-98da-45bd-b6aa-7cd2faa43809.png' },
    { id: 'dubbel', name: 'Dubbele nokverhoging', imageUrl: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png' },
    { id: 'enkel', name: 'Eenzijdige nokverhoging', imageUrl: '/lovable-uploads/e4d081e7-d3f8-4e19-b2bf-0bf8c01f0dce.png' }
  ];

  // Material options
  const materialOptions = [
    { value: 'keralit', label: 'Keralit' },
    { value: 'hout', label: 'Hout' },
    { value: 'zink', label: 'Zink' }
  ];

  // Color options
  const colorOptions: ColorOption[] = ['wit', 'crème', 'blauw', 'groen', 'antraciet', 'kwartsgrijs', 'anders'];

  // Delivery time options
  const deliveryTimeOptions = [
    { value: 'asap', label: 'Zo snel mogelijk' },
    { value: '3-6m', label: 'Binnen 3 – 6 maanden' },
    { value: '6-9m', label: 'Binnen 6 – 9 maanden' },
    { value: '9m+', label: '9 maanden of later' }
  ];

  // Calculate total price
  const calculatePrice = (): number => {
    let totalPrice = configuration.width?.price || 0;
    
    // Add extras costs
    if (configuration.extras.ventilatieroosters) totalPrice += 250;
    if (configuration.extras.zonwering) totalPrice += 800;
    if (configuration.extras.horren) totalPrice += 200;
    if (configuration.extras.airco) totalPrice += 1200;
    
    // Material price adjustments
    if (configuration.material === 'hout') totalPrice += 500;
    if (configuration.material === 'zink') totalPrice += 1200;
    
    return totalPrice;
  };

  // Format price to Euro
  const formatPrice = (price: number): string => {
    return '€' + price.toLocaleString('nl-NL');
  };

  // Handle next step
  const nextStep = () => {
    switch (currentStep) {
      case 'intro':
        setCurrentStep('width');
        break;
      case 'width':
        setCurrentStep('roofPitch');
        break;
      case 'roofPitch':
        setCurrentStep('model');
        break;
      case 'model':
        setCurrentStep('material');
        break;
      case 'material':
        setCurrentStep('colors');
        break;
      case 'colors':
        setCurrentStep('extras');
        break;
      case 'extras':
        setCurrentStep('deliveryTime');
        break;
      case 'deliveryTime':
        setCurrentStep('contact');
        break;
      default:
        // Handle form submission in the contact step
        break;
    }
  };

  // Handle previous step
  const prevStep = () => {
    switch (currentStep) {
      case 'width':
        setCurrentStep('intro');
        break;
      case 'roofPitch':
        setCurrentStep('width');
        break;
      case 'model':
        setCurrentStep('roofPitch');
        break;
      case 'material':
        setCurrentStep('model');
        break;
      case 'colors':
        setCurrentStep('material');
        break;
      case 'extras':
        setCurrentStep('colors');
        break;
      case 'deliveryTime':
        setCurrentStep('extras');
        break;
      case 'contact':
        setCurrentStep('deliveryTime');
        break;
      default:
        break;
    }
  };

  // Handle selection changes
  const handleWidthChange = (option: WidthOption) => {
    setConfiguration({ ...configuration, width: option });
  };

  const handleRoofPitchChange = (pitchValue: string) => {
    setConfiguration({ ...configuration, roofPitch: pitchValue });
  };

  const handleModelChange = (modelId: string) => {
    setConfiguration({ ...configuration, model: modelId });
  };

  const handleMaterialChange = (materialValue: string) => {
    setConfiguration({ ...configuration, material: materialValue });
  };

  const handleColorChange = (part: keyof typeof configuration.colors, color: ColorOption) => {
    setConfiguration({ 
      ...configuration, 
      colors: {
        ...configuration.colors,
        [part]: color
      }
    });
  };

  const handleExtraChange = (extra: keyof typeof configuration.extras) => {
    setConfiguration({
      ...configuration,
      extras: {
        ...configuration.extras,
        [extra]: !configuration.extras[extra]
      }
    });
  };

  const handleDeliveryTimeChange = (timeValue: string) => {
    setConfiguration({ ...configuration, deliveryTime: timeValue });
  };

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log('Form submitted', { ...configuration, contact: values });
    // Here you would typically send the data to your backend
    alert('Uw aanvraag is verstuurd! Wij nemen zo spoedig mogelijk contact met u op.');
    // Reset form or navigate away
  };

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
  // Update preview image based on selections
  const getDakkapelPreviewImage = () => {
    // For now just return the uploaded example image
    return '/lovable-uploads/7637419b-43f3-4013-b688-d06efaec5329.png';
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Configuration Overview */}
      <div className="bg-gray-50 p-4 border-b">
        <h3 className="font-semibold text-base mb-2">Overzicht van uw samenstelling</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {configuration.width && (
            <div className="p-2 bg-white rounded shadow-sm">
              <p className="text-gray-500 text-xs">Breedte</p>
              <p className="font-medium text-sm">{configuration.width.range}</p>
            </div>
          )}
          {configuration.roofPitch && (
            <div className="p-2 bg-white rounded shadow-sm">
              <p className="text-gray-500 text-xs">Dakhelling</p>
              <p className="font-medium text-sm">
                {roofPitchOptions.find(o => o.value === configuration.roofPitch)?.label}
              </p>
            </div>
          )}
          {configuration.model && (
            <div className="p-2 bg-white rounded shadow-sm">
              <p className="text-gray-500 text-xs">Model</p>
              <p className="font-medium text-sm">
                {modelOptions.find(o => o.id === configuration.model)?.name}
              </p>
            </div>
          )}
          {configuration.material && (
            <div className="p-2 bg-white rounded shadow-sm">
              <p className="text-gray-500 text-xs">Materiaal</p>
              <p className="font-medium text-sm">
                {materialOptions.find(o => o.value === configuration.material)?.label}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-4 items-center">
          {/* Preview image */}
          {(configuration.width || configuration.model) && (
            <div className="rounded-md overflow-hidden w-full md:w-1/2 h-40 bg-white">
              <img 
                src={getDakkapelPreviewImage()}
                alt="Dakkapel voorbeeld" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Price indication */}
          <div className="mt-2 md:mt-0 w-full md:w-1/2 text-right">
            <p className="text-sm text-gray-500">Geschatte prijs vanaf:</p>
            <p className="text-xl font-bold text-brand-darkGreen">
              {formatPrice(calculatePrice())}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Intro Step */}
        {currentStep === 'intro' && (
          <div className="text-center max-w-3xl mx-auto py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Configureer uw dakkapel</h2>
            <p className="text-base mb-6">
              Stel gratis en vrijblijvend uw ideale dakkapel samen, op basis van uw woning en wensen.
            </p>
            <p className="text-brand-lightGreen font-semibold mb-8 text-sm">
              Configureer uw dakkapel binnen 1 minuut
            </p>
            <Button 
              onClick={nextStep} 
              size="lg"
              className="font-medium text-base px-8 py-5 h-auto"
            >
              Start met samenstellen <ChevronRight className="ml-2" />
            </Button>
          </div>
        )}

        {/* Step 1: Width */}
        {currentStep === 'width' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Ruler className="mr-2" /> Stap 1: Hoe breed moet uw dakkapel worden?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {widthOptions.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all",
                    configuration.width?.range === option.range 
                      ? "border-brand-lightGreen bg-brand-lightGreen bg-opacity-10" 
                      : "hover:border-brand-lightGreen"
                  )}
                  onClick={() => handleWidthChange(option)}
                >
                  <div className="h-16 flex items-center justify-center mb-2 relative">
                    <div className="w-full h-4 bg-gray-200 relative">
                      <div 
                        className="absolute h-8 border-l-2 border-r-2 border-gray-500 bg-gray-100 bg-opacity-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ width: `${Math.min(100, (option.max - option.min) / 8)}%` }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-center">{option.range}</h3>
                  <p className="text-center text-brand-darkGreen font-semibold mt-1 text-sm">
                    vanaf {formatPrice(option.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Roof Pitch */}
        {currentStep === 'roofPitch' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Triangle className="mr-2" /> Stap 2: Wat is de helling van uw dak?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {roofPitchOptions.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all flex flex-col",
                    configuration.roofPitch === option.value 
                      ? "border-brand-lightGreen bg-brand-lightGreen bg-opacity-10" 
                      : "hover:border-brand-lightGreen"
                  )}
                  onClick={() => handleRoofPitchChange(option.value)}
                >
                  <div className="h-16 flex items-center justify-center mb-2 relative">
                    {option.value !== 'unknown' ? (
                      <div className="relative">
                        <Triangle 
                          size={48}
                          className="text-gray-400"
                          style={{ 
                            transform: `rotate(${
                              option.value === '45-60' ? 0 :
                              option.value === '35-45' ? 15 : 
                              30
                            }deg)`
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-2xl text-gray-300">?</div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm text-center mt-auto">{option.label}</h3>
                  {option.value === 'unknown' && (
                    <p className="text-xs text-center text-gray-500 mt-1">Wij meten dit gratis voor u in</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Model */}
        {currentStep === 'model' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Home className="mr-2" /> Stap 3: Welk model spreekt u aan?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modelOptions.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all",
                    configuration.model === option.id 
                      ? "border-brand-lightGreen bg-brand-lightGreen bg-opacity-10" 
                      : "hover:border-brand-lightGreen"
                  )}
                  onClick={() => handleModelChange(option.id)}
                >
                  <div className="h-36 mb-3 overflow-hidden rounded-lg">
                    <img 
                      src={option.imageUrl} 
                      alt={option.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-center">{option.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Material */}
        {currentStep === 'material' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Stap 4: Kies uw afwerkmateriaal</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {materialOptions.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all",
                    configuration.material === option.value 
                      ? "border-brand-lightGreen bg-brand-lightGreen bg-opacity-10" 
                      : "hover:border-brand-lightGreen"
                  )}
                  onClick={() => handleMaterialChange(option.value)}
                >
                  <div className="h-28 flex items-center justify-center mb-2 bg-gray-100 rounded">
                    {/* Material illustration - placeholders */}
                    {option.value === 'keralit' && (
                      <div className="w-28 h-14 bg-gray-200 rounded flex items-center justify-center">
                        Keralit
                      </div>
                    )}
                    {option.value === 'hout' && (
                      <div className="w-28 h-14 bg-amber-100 rounded flex items-center justify-center">
                        Hout
                      </div>
                    )}
                    {option.value === 'zink' && (
                      <div className="w-28 h-14 bg-gray-300 rounded flex items-center justify-center">
                        Zink
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm text-center">{option.label}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Colors */}
        {currentStep === 'colors' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Palette className="mr-2" /> Stap 5: Kies uw kleuren
            </h2>
            
            <div className="space-y-5">
              {/* Boeien colors */}
              <div>
                <h3 className="font-medium text-sm mb-2">Boeien:</h3>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map(color => (
                    <div
                      key={color}
                      className={cn(
                        "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center",
                        configuration.colors.boeien === color ? "ring-2 ring-offset-2 ring-brand-lightGreen" : ""
                      )}
                      style={{ 
                        backgroundColor: color === 'wit' ? 'white' : 
                                          color === 'crème' ? '#f5f5dc' :
                                          color === 'blauw' ? '#1e3a8a' :
                                          color === 'groen' ? '#166534' :
                                          color === 'antraciet' ? '#374151' :
                                          color === 'kwartsgrijs' ? '#9ca3af' : 
                                          '#e5e7eb',
                        border: color === 'wit' ? '1px solid #e5e7eb' : 'none'
                      }}
                      onClick={() => handleColorChange('boeien', color)}
                    >
                      {configuration.colors.boeien === color && (
                        <Check className="text-white h-4 w-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Zijwanden colors */}
              <div>
                <h3 className="font-medium text-sm mb-2">Zijwanden:</h3>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map(color => (
                    <div
                      key={color}
                      className={cn(
                        "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center",
                        configuration.colors.zijwanden === color ? "ring-2 ring-offset-2 ring-brand-lightGreen" : ""
                      )}
                      style={{ 
                        backgroundColor: color === 'wit' ? 'white' : 
                                          color === 'crème' ? '#f5f5dc' :
                                          color === 'blauw' ? '#1e3a8a' :
                                          color === 'groen' ? '#166534' :
                                          color === 'antraciet' ? '#374151' :
                                          color === 'kwartsgrijs' ? '#9ca3af' : 
                                          '#e5e7eb',
                        border: color === 'wit' ? '1px solid #e5e7eb' : 'none'
                      }}
                      onClick={() => handleColorChange('zijwanden', color)}
                    >
                      {configuration.colors.zijwanden === color && (
                        <Check className="text-white h-4 w-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Kozijnen colors */}
              <div>
                <h3 className="font-medium text-sm mb-2">Kozijnen:</h3>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map(color => (
                    <div
                      key={color}
                      className={cn(
                        "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center",
                        configuration.colors.kozijnen === color ? "ring-2 ring-offset-2 ring-brand-lightGreen" : ""
                      )}
                      style={{ 
                        backgroundColor: color === 'wit' ? 'white' : 
                                          color === 'crème' ? '#f5f5dc' :
                                          color === 'blauw' ? '#1e3a8a' :
                                          color === 'groen' ? '#166534' :
                                          color === 'antraciet' ? '#374151' :
                                          color === 'kwartsgrijs' ? '#9ca3af' : 
                                          '#e5e7eb',
                        border: color === 'wit' ? '1px solid #e5e7eb' : 'none'
                      }}
                      onClick={() => handleColorChange('kozijnen', color)}
                    >
                      {configuration.colors.kozijnen === color && (
                        <Check className="text-white h-4 w-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Extras */}
        {currentStep === 'extras' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Check className="mr-2" /> Stap 6: Wilt u extra opties?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'ventilatieroosters', label: 'Ventilatieroosters', price: 250 },
                { id: 'zonwering', label: 'Zonwering (Somfy-Ilmo motor)', price: 800 },
                { id: 'horren', label: 'Horren', price: 200 },
                { id: 'airco', label: 'Airco', price: 1200 }
              ].map((option) => (
                <div 
                  key={option.id}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all",
                    configuration.extras[option.id as keyof typeof configuration.extras] 
                      ? "border-brand-lightGreen bg-brand-lightGreen bg-opacity-10" 
                      : "hover:border-brand-lightGreen"
                  )}
                  onClick={() => handleExtraChange(option.id as keyof typeof configuration.extras)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center mr-3",
                        configuration.extras[option.id as keyof typeof configuration.extras]
                          ? "bg-brand-lightGreen border-brand-lightGreen" 
                          : "border-gray-300"
                      )}>
                        {configuration.extras[option.id as keyof typeof configuration.extras] && (
                          <Check className="text-white h-3 w-3" />
                        )}
                      </div>
                      <span className="font-medium text-sm">{option.label}</span>
                    </div>
                    <span className="text-brand-darkGreen font-semibold text-sm">
                      + {formatPrice(option.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Delivery Time */}
        {currentStep === 'deliveryTime' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="mr-2" /> Stap 7: Wat is uw gewenste uitvoeringsmoment?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deliveryTimeOptions.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all",
                    configuration.deliveryTime === option.value 
                      ? "border-brand-lightGreen bg-brand-lightGreen bg-opacity-10" 
                      : "hover:border-brand-lightGreen"
                  )}
                  onClick={() => handleDeliveryTimeChange(option.value)}
                >
                  <div className="h-14 flex items-center justify-center mb-2">
                    <Calendar className={cn(
                      "h-8 w-8",
                      configuration.deliveryTime === option.value ? "text-brand-lightGreen" : "text-gray-400"
                    )} />
                  </div>
                  <h3 className="font-medium text-sm text-center">{option.label}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Contact Form */}
        {currentStep === 'contact' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Stap 8: Uw gegevens</h2>
            <p className="mb-4 text-gray-600 text-sm">
              Vul uw gegevens in zodat wij een offerte op maat kunnen sturen.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Naam *</FormLabel>
                        <FormControl>
                          <Input placeholder="Uw naam" {...field} className="text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">E-mail *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="uw@email.nl" {...field} className="text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Telefoon *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="06 12345678" {...field} className="text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Adres *</FormLabel>
                        <FormControl>
                          <Input placeholder="Straat, nummer, postcode, plaats" {...field} className="text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Opmerkingen</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Eventuele opmerkingen of vragen"
                          {...field}
                          className="resize-none h-24 text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto text-sm"
                  >
                    Offerte aanvragen
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Navigation buttons */}
        {currentStep !== 'intro' && (
          <div className="mt-6 pt-4 border-t flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center text-sm"
            >
              <ChevronLeft className="mr-1" /> Terug
            </Button>
            
            {currentStep !== 'contact' && (
              <Button
                onClick={nextStep}
                className="flex items-center text-sm"
                disabled={
                  (currentStep === 'width' && !configuration.width) ||
                  (currentStep === 'roofPitch' && !configuration.roofPitch) ||
                  (currentStep === 'model' && !configuration.model) ||
                  (currentStep === 'material' && !configuration.material) ||
                  (currentStep === 'deliveryTime' && !configuration.deliveryTime)
                }
              >
                Volgende <ChevronRight className="ml-1" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

