
import React from 'react';
import { OptimizedImage } from '../ui/optimized-image';

export function DakkapelGallery() {
  const images = [{
    url: '/lovable-uploads/ce310265-aaac-49aa-bff7-99a27901151a.png',
    title: 'Moderne Dakkapel'
  }, {
    url: '/lovable-uploads/b080c873-1f58-400e-8855-b4cc787a6859.png',
    title: 'Klassieke Dakkapel'
  }, {
    url: '/lovable-uploads/eaa01620-492a-4794-b2c6-ad2b92dc3603.png',
    title: 'Luxe Dakkapel'
  }, {
    url: '/lovable-uploads/fb97d4bf-a1e7-428b-bd5b-37fc1b54729b.png',
    title: 'Dakkapel met Openslaande Deuren'
  }, {
    url: '/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png',
    title: 'Prefab Dakkapel'
  }, {
    url: '/lovable-uploads/8745f4c4-960d-4da5-b5f5-59564c7cdd33.png',
    title: 'Gerenoveerde Dakkapel'
  }];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-brand-darkGreen">Onze Dakkapel Projecten</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative">
                <OptimizedImage
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  fallbackSrc="/lovable-uploads/5f8f6883-901d-4157-ab41-1b023e186ede.png"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg text-brand-darkGreen">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
