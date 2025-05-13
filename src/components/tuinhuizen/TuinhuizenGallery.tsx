
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { GardenHouseModel } from './3d/GardenHouseModel';
import { GardenScene } from './3d/GardenScene';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function TuinhuizenGallery() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Modern Douglas Tuinhuis – 500 cm breed
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Een stijlvolle combinatie van berging en overkapping met zwart/douglas hout.
            Bekijk het model vanuit alle hoeken.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <AspectRatio ratio={16/10} className="bg-sky-50">
              <Canvas shadows dpr={[1, 2]}>
                <GardenScene />
                <GardenHouseModel autoRotate={autoRotate} />
                <OrbitControls 
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2 - 0.1}
                  minPolarAngle={Math.PI / 6}
                  maxDistance={15}
                  minDistance={4}
                  onStart={() => setAutoRotate(false)}
                />
              </Canvas>
            </AspectRatio>
            
            <div className="p-4 bg-gray-50 border-t">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                {autoRotate ? "Rotatie stoppen" : "Automatisch roteren"}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Tip: Klik en sleep om het model te draaien, scroll om in/uit te zoomen
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-brand-darkGreen mb-3">
                Specificaties
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Afmetingen: 500 x 350 cm (breedte x diepte)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Wandhoogte: 230 cm, nokhoogte: 260 cm</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Zwarte wanden met douglas accenten</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Geïntegreerde overkapping van 200 cm diep</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Onbehandeld geschaafd douglashout</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>EPDM dakbedekking met aluminium randafwerking</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-brand-darkGreen mb-3">
                Foto-impressie
              </h3>
              <Carousel className="w-full max-w-md">
                <CarouselContent>
                  {[
                    '/lovable-uploads/191b7e07-7bc6-4a2b-b984-d5b4bedb7875.png',
                    '/lovable-uploads/e4d081e7-d3f8-4e19-b2bf-0bf8c01f0dce.png',
                    '/lovable-uploads/86f735a8-487e-43c0-9703-193520a0aec0.png',
                    '/lovable-uploads/b0ef8923-8feb-4345-b99d-97e499ab8959.png',
                    '/lovable-uploads/01cb10c8-0224-459f-bf26-96fe9ce61fa8.png'
                  ].map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-lg shadow-md">
                          <img 
                            src={src} 
                            alt={`Tuinhuis impressie ${index + 1}`} 
                            className="w-full h-auto aspect-square object-cover object-center"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </Carousel>
            </div>
            
            <div className="pt-4">
              <a 
                href="#offerte-aanvragen" 
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-md"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Offerte aanvragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
