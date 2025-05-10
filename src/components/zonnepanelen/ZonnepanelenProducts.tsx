
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Link } from 'react-router-dom';
import { solarProducts } from '@/data/solarProducts';

export function ZonnepanelenProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-brand-darkGreen">
          Zonnepanelen Pakketten
        </h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Onze complete zonnepanelen installaties inclusief montage. Kies het pakket dat het beste bij uw situatie past.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solarProducts.map((product) => (
            <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 animate-fade-in relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="rounded-md overflow-hidden mb-4 flex justify-center h-48">
                  <OptimizedImage
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-contain"
                    fallbackSrc="/placeholder.svg"
                    style={{ maxHeight: '100%' }}
                  />
                </div>
                <CardTitle className="text-lg font-bold text-brand-darkGreen">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-green mr-2 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-2 w-full">
                <p className="text-2xl font-bold text-brand-darkGreen mb-4">{product.price}</p>
                <Link to={`/product/${product.slug}`} className="w-full">
                  <Button className="w-full bg-brand-green hover:bg-brand-darkGreen transition-colors">
                    Opties selecteren
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
