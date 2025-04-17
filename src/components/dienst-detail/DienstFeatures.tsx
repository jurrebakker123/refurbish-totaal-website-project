
import React from 'react';
import { Check } from 'lucide-react';

interface DienstFeaturesProps {
  title: string;
  longDescription: string;
  features: string[];
}

const DienstFeatures = ({ title, longDescription, features }: DienstFeaturesProps) => {
  return (
    <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Over onze {title.toLowerCase()}</h2>
      <p className="text-lg text-gray-700 mb-6">
        {longDescription}
      </p>
      
      <h3 className="text-2xl font-semibold mb-4 text-brand-darkGreen">Onze {title.toLowerCase()} diensten omvatten:</h3>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.4}s` }}>
            <Check className="h-5 w-5 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DienstFeatures;
