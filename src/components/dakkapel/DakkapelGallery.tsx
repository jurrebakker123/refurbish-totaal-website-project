
import React from 'react';
import { OptimizedImage } from '../ui/optimized-image';

export function DakkapelGallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Moderne Dakkapel'
    },
    {
      url: 'https://images.unsplash.com/photo-1570004147644-7d165c4e7e04?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Klassieke Dakkapel'
    },
    {
      url: 'https://images.unsplash.com/photo-1490197415175-074fd86b1fcc?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Luxe Dakkapel'
    },
    {
      url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Dakkapel met Openslaande Deuren'
    },
    {
      url: 'https://images.unsplash.com/photo-1605276375781-2d3e4b3fb772?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Prefab Dakkapel'
    },
    {
      url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Gerenoveerde Dakkapel'
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            Onze Recente Projecten
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bekijk enkele van onze recente dakkapel projecten door heel Nederland
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
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
