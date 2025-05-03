
import React from 'react';
import { OptimizedImage } from '../ui/optimized-image';

export function TuinhuizenGallery() {
  const images = [
    {
      url: '/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png',
      title: 'Modern Tuinhuis'
    },
    {
      url: '/lovable-uploads/43b44fd9-a2c6-4670-9ec2-b2dbe73b1a5f.png',
      title: 'Klassiek Tuinhuis'
    },
    {
      url: '/lovable-uploads/504b25db-f625-4ccd-9e93-6970157c6bf6.png',
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
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
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
