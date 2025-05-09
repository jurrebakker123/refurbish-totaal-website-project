
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';

export function DakkapelSolarProducts() {
  const solarProducts = [
    {
      id: 1,
      title: "Complete installatie - 10 Zonnepanelen - 4kW",
      price: "€ 1.445,00",
      imageUrl: "public/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png",
      features: [
        "10x zonnepanelen",
        "4kW totaal vermogen",
        "Inclusief omvormer en montagesysteem",
        "Complete installatie"
      ]
    },
    {
      id: 2,
      title: "Complete installatie - 10 zonnepanelen - Oost/West - 4kW",
      price: "€ 1.045,00",
      imageUrl: "public/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png",
      features: [
        "10x zonnepanelen geoptimaliseerd voor Oost/West oriëntatie",
        "4kW totaal vermogen",
        "Inclusief omvormer en montagesysteem",
        "Complete installatie"
      ]
    },
    {
      id: 3,
      title: "Complete installatie - 38 Zonnepanelen - 15kW - Platdak",
      price: "€ 3.715,00",
      imageUrl: "public/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png",
      features: [
        "38x zonnepanelen",
        "15kW totaal vermogen",
        "Speciaal voor platdak montage",
        "Inclusief omvormer en montagesysteem",
        "Complete installatie"
      ]
    },
    {
      id: 4,
      title: "Complete installatie - 5 zonnepanelen - 2kW",
      price: "€ 525,00",
      imageUrl: "public/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png",
      features: [
        "5x zonnepanelen",
        "2kW totaal vermogen",
        "Inclusief omvormer en montagesysteem",
        "Ideaal voor kleinere daken",
        "Complete installatie"
      ]
    },
    {
      id: 5,
      title: "Complete installatie - 8 Zonnepanelen",
      price: "Op aanvraag",
      imageUrl: "public/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png",
      features: [
        "8x zonnepanelen",
        "Inclusief omvormer en montagesysteem",
        "Complete installatie",
        "Prijs op aanvraag"
      ]
    },
    {
      id: 6,
      title: "Complete installatie - 48 Zonnepanelen",
      price: "Op aanvraag",
      imageUrl: "public/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png",
      features: [
        "48x zonnepanelen",
        "Geschikt voor grote daken",
        "Inclusief omvormer en montagesysteem",
        "Complete installatie",
        "Prijs op aanvraag"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-brand-darkGreen">
          Zonnepanelen Pakketten
        </h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Combineer uw dakkapel met zonnepanelen voor extra energiebesparing. Wij bieden complete installaties inclusief montage.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solarProducts.map((product) => (
            <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardHeader className="pb-4">
                <div className="rounded-md overflow-hidden mb-4 flex justify-center">
                  <OptimizedImage
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-48 object-contain"
                    fallbackSrc="/placeholder.svg"
                  />
                </div>
                <CardTitle className="text-lg font-bold text-brand-darkGreen">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-green mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-2">
                <p className="text-2xl font-bold text-brand-darkGreen mb-4">{product.price}</p>
                <Button className="w-full bg-brand-green hover:bg-brand-darkGreen transition-colors">
                  Opties selecteren
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
