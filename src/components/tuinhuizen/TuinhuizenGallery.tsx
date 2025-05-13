
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function TuinhuizenGallery() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Modern Douglas Tuinhuis – 500 cm breed
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Een stijlvolle combinatie van berging en overkapping met zwart/douglas hout.
            Bekijk onze foto-impressie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <AspectRatio ratio={16/10} className="bg-sky-50">
              <img 
                src="/lovable-uploads/78a350aa-89ea-4904-8e38-ceac9f29cf02.png" 
                alt="Tuinhuis vooraanzicht" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
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
                    '/lovable-uploads/78a350aa-89ea-4904-8e38-ceac9f29cf02.png',
                    '/lovable-uploads/0f924302-ce62-4b4d-bd49-46be5ab319c5.png',
                    '/lovable-uploads/3095a7de-a421-46ee-97ff-ff3df4675b7a.png',
                    '/lovable-uploads/70e348ca-19f6-4888-9cf4-4ba36b481d5a.png'
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
