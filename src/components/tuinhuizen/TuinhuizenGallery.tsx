
import React from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';

export function TuinhuizenGallery() {
  const images = [
    {
      url: '/lovable-uploads/3b0229fd-9f27-4076-acc1-1ef2a7168e25.png',
      title: 'Modern Tuinhuis'
    },
    {
      url: '/lovable-uploads/99959b05-5a83-42b4-b97b-473c5bfc3de5.png',
      title: 'Klassiek Tuinhuis'
    },
    {
      url: '/lovable-uploads/a9b0106d-07f8-457b-bf57-185f81ec746f.png',
      title: 'Luxe Tuinhuis'
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-darkGreen">
          Onze Recente Projecten
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={image.title}
              className="group relative overflow-hidden rounded-lg shadow-lg hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <OptimizedImage 
                src={image.url} 
                alt={image.title} 
                className="w-full h-64 object-cover"
                fallbackSrc="/placeholder.svg"
              />
              <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
