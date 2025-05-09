
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';

export function DakkapelSolarProducts() {
  const solarProducts = [
    {
      id: 1,
      title: "6 Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen + Enphase IQ8+ omvormers",
      price: "€ 2.925,00",
      imageUrl: "https://www.gebruiktepanelen.nl/wp-content/uploads/2023/03/6-Zonnepanelen-Jinko-400-Wp-Full-Black-PERC-Enphase-IQ7-micro-omvormers-400x400.jpg",
      features: [
        "6x Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen",
        "6x Enphase IQ8+ micro-omvormers",
        "Inclusief montagesysteem en kabels",
        "Opbrengst: ca. 2.322 kWh/jaar"
      ]
    },
    {
      id: 2,
      title: "8 Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen + Enphase IQ8+ omvormers",
      price: "€ 3.800,00",
      imageUrl: "https://www.gebruiktepanelen.nl/wp-content/uploads/2023/03/8-Zonnepanelen-Jinko-400-Wp-Full-Black-PERC-Enphase-IQ7-micro-omvormers-400x400.jpg",
      features: [
        "8x Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen",
        "8x Enphase IQ8+ micro-omvormers",
        "Inclusief montagesysteem en kabels",
        "Opbrengst: ca. 3.096 kWh/jaar"
      ]
    },
    {
      id: 3,
      title: "10 Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen + Enphase IQ8+ omvormers",
      price: "€ 4.670,00",
      imageUrl: "https://www.gebruiktepanelen.nl/wp-content/uploads/2023/03/10-Zonnepanelen-Jinko-400-Wp-Full-Black-PERC-Enphase-IQ7-micro-omvormers-400x400.jpg",
      features: [
        "10x Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen",
        "10x Enphase IQ8+ micro-omvormers",
        "Inclusief montagesysteem en kabels",
        "Opbrengst: ca. 3.870 kWh/jaar"
      ]
    },
    {
      id: 4,
      title: "12 Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen + Enphase IQ8+ omvormers",
      price: "€ 5.550,00",
      imageUrl: "https://www.gebruiktepanelen.nl/wp-content/uploads/2023/03/12-Zonnepanelen-Jinko-400-Wp-Full-Black-PERC-Enphase-IQ7-micro-omvormers-400x400.jpg",
      features: [
        "12x Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen",
        "12x Enphase IQ8+ micro-omvormers",
        "Inclusief montagesysteem en kabels",
        "Opbrengst: ca. 4.644 kWh/jaar"
      ]
    },
    {
      id: 5,
      title: "14 Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen + Enphase IQ8+ omvormers",
      price: "€ 6.435,00",
      imageUrl: "https://www.gebruiktepanelen.nl/wp-content/uploads/2023/03/14-Zonnepanelen-Jinko-400-Wp-Full-Black-PERC-Enphase-IQ7-micro-omvormers-400x400.jpg",
      features: [
        "14x Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen",
        "14x Enphase IQ8+ micro-omvormers",
        "Inclusief montagesysteem en kabels",
        "Opbrengst: ca. 5.418 kWh/jaar"
      ]
    },
    {
      id: 6,
      title: "16 Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen + Enphase IQ8+ omvormers",
      price: "€ 7.295,00",
      imageUrl: "https://www.gebruiktepanelen.nl/wp-content/uploads/2023/03/16-Zonnepanelen-Jinko-400-Wp-Full-Black-PERC-Enphase-IQ7-micro-omvormers-400x400.jpg",
      features: [
        "16x Jinko Tiger Neo N-type 430 Wp Full Black zonnepanelen",
        "16x Enphase IQ8+ micro-omvormers",
        "Inclusief montagesysteem en kabels",
        "Opbrengst: ca. 6.192 kWh/jaar"
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
          Combineer uw dakkapel met zonnepanelen voor extra energiebesparing. Wij bieden hoogwaardige zonnepanelen sets met Enphase micro-omvormers voor optimale opbrengst.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solarProducts.map((product) => (
            <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardHeader className="pb-4">
                <div className="rounded-md overflow-hidden mb-4">
                  <OptimizedImage
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-cover"
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
                  Offerte aanvragen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
