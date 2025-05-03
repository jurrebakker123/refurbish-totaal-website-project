
import React from 'react';

export function TuinhuizenGallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Modern Tuinhuis'
    },
    {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
      title: 'Klassiek Tuinhuis'
    },
    {
      url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80',
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
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
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
