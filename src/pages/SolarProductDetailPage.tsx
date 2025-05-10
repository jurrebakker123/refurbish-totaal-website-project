
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, SolarProduct } from '@/data/solarProducts';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { CartProvider } from '@/context/CartContext';
import ShoppingCartIcon from '@/components/common/ShoppingCartIcon';
import NotFound from './NotFound';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const SolarProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductBySlug(productId) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return <NotFound />;
  }

  return (
    <CartProvider>
      <ProductDetail product={product} />
    </CartProvider>
  );
};

const ProductDetail = ({ product }: { product: SolarProduct }) => {
  const { addItem } = useCart();
  const [roofType, setRoofType] = useState<string>("pannendak");
  const [selectedProduct, setSelectedProduct] = useState(product);
  
  const handleAddToCart = () => {
    // Create a new product object with the roofType property
    const productWithRoofType = {
      ...selectedProduct,
      roofType: roofType
    };
    addItem(productWithRoofType);
  };

  // Fix image paths if they start with public/
  const mainImageUrl = product.imageUrl.startsWith('public/') 
    ? product.imageUrl.replace('public/', '/') 
    : product.imageUrl;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{product.title} - Refurbish Zonnepanelen</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>
      
      <Header />
      <div className="fixed top-20 right-4 z-50">
        <ShoppingCartIcon />
      </div>
      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-brand-darkGreen hover:text-brand-green transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Terug naar overzicht
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center items-center h-full">
                <OptimizedImage
                  src={mainImageUrl}
                  alt={product.title}
                  className="max-h-96 object-contain"
                  fallbackSrc="/placeholder.svg"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-brand-darkGreen mb-3">{product.title}</h1>
              <p className="text-gray-700 mb-6">{product.shortDescription}</p>
              
              {/* Roof type selection */}
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-3">Uw soort dak</h3>
                <RadioGroup defaultValue="pannendak" value={roofType} onValueChange={setRoofType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pannendak" id="pannendak" />
                    <Label htmlFor="pannendak">Pannendak</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="platdak" id="platdak" />
                    <Label htmlFor="platdak">Platdak</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Kenmerken:</h2>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Prijs</p>
                    <p className="text-3xl font-bold text-brand-darkGreen">{product.price}</p>
                  </div>
                  <div className="flex space-x-3">
                    {product.price !== 'Op aanvraag' ? (
                      <Button 
                        onClick={handleAddToCart}
                        className="bg-brand-green hover:bg-brand-darkGreen transition-colors flex"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        In winkelwagen
                      </Button>
                    ) : (
                      <Link to="/offerte" className="w-full">
                        <Button className="bg-brand-green hover:bg-brand-darkGreen transition-colors">
                          Offerte aanvragen
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="description">Productbeschrijving</TabsTrigger>
              <TabsTrigger value="specifications">Specificaties</TabsTrigger>
              <TabsTrigger value="installation">Kenmerken van de installatie</TabsTrigger>
              <TabsTrigger value="delivery">Levering & Installatie</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 bg-white rounded-lg shadow-sm">
              <div className="prose max-w-none">
                {product.fullDescription.map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="p-6 bg-white rounded-lg shadow-sm">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium">{spec.label}</td>
                      <td className="py-3 px-4">{spec.value}</td>
                    </tr>
                  ))}
                  <tr className={product.specifications.length % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-4 font-medium">Garantie</td>
                    <td className="py-3 px-4">{product.warranty}</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="installation" className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Kenmerken van de installatie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Zonnepanelen</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>Refurbished A-merk zonnepanelen</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>Half-cell technologie voor betere schaduw prestaties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>12 jaar productgarantie</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>25 jaar vermogensgarantie</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Omvormer</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>A-merk omvormer (Growatt/SMA/Goodwe)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>WiFi monitoring inbegrepen</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>10 jaar garantie</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Montagesysteem</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>Esdec ClickFit EVO voor pannendaken</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>Flatfix systeem voor platte daken</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>20 jaar garantie</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Installatie</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>Uitvoering door gecertificeerde monteurs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>Inclusief aansluiting op meterkast</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>5 jaar installatiegarantie</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="delivery" className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Levering</h3>
              <p className="mb-4">{product.delivery}</p>
              
              <h3 className="text-lg font-semibold mb-3 mt-6">Installatie</h3>
              <p className="mb-4">{product.installation}</p>
            </TabsContent>
          </Tabs>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Heeft u vragen?</h2>
            <p className="mb-4">
              Neem contact met ons op voor een persoonlijk advies of voor meer informatie over dit product.
            </p>
            <div className="flex space-x-4">
              <Link to="/contact">
                <Button variant="outline">
                  Contact opnemen
                </Button>
              </Link>
              <Link to="/offerte">
                <Button className="bg-brand-darkGreen hover:bg-brand-green transition-colors">
                  Offerte aanvragen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SolarProductDetailPage;
