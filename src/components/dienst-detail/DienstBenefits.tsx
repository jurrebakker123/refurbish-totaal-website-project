
import React from 'react';
import { Check } from 'lucide-react';

interface DienstBenefitsProps {
  title: string;
  benefits: string[];
}

const DienstBenefits = ({ title, benefits }: DienstBenefitsProps) => {
  return (
    <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Waarom kiezen voor onze {title.toLowerCase()}?</h2>
      <ul className="space-y-4">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.6}s` }}>
            <div className="rounded-full bg-brand-lightGreen/10 p-2 w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
              <Check className="h-5 w-5 text-brand-darkGreen" />
            </div>
            <div>
              <p className="text-gray-700">{benefit}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DienstBenefits;
