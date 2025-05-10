import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
export const DakkapelCalculatorPreview = () => {
  return <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4">
            Bereken Direct Uw Dakkapel
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Met onze handige dakkapel calculator krijgt u direct een prijsindicatie. 
            Pas afmetingen, materialen en opties aan voor een persoonlijke offerte.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Waarom onze calculator gebruiken?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-brand-lightGreen rounded-full p-1 mr-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Direct inzicht in de kosten van uw dakkapel</span>
              </li>
              <li className="flex items-start">
                <span className="bg-brand-lightGreen rounded-full p-1 mr-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Verschillende materialen en opties vergelijken</span>
              </li>
              <li className="flex items-start">
                <span className="bg-brand-lightGreen rounded-full p-1 mr-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Visualiseer uw dakkapel in 3D</span>
              </li>
              <li className="flex items-start">
                <span className="bg-brand-lightGreen rounded-full p-1 mr-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Vraag direct een offerte aan</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <Link to="/dakkapel-calculator">
                <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  <span>Open Calculator</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <img alt="Dakkapel Calculator" className="max-w-full max-h-full object-cover rounded" onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }} src="/lovable-uploads/976a3243-6071-40c3-bf04-e4c43cf72f67.png" />
              </div>
              <h4 className="font-bold mb-2">Dakkapel berekenen in 5 stappen</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-brand-lightGreen text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">1</span>
                  <span>Kies uw type dakkapel</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-brand-lightGreen text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">2</span>
                  <span>Bepaal de afmetingen</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-brand-lightGreen text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">3</span>
                  <span>Selecteer materiaal en stijl</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-brand-lightGreen text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">4</span>
                  <span>Kies extra opties</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-brand-lightGreen text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">5</span>
                  <span>Bekijk uw prijsindicatie</span>
                </li>
              </ol>
              <div className="mt-4">
                <Link to="/dakkapel-calculator" className="text-brand-lightGreen hover:text-brand-darkGreen font-medium inline-flex items-center">
                  Start berekening <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};