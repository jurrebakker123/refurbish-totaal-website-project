
import React from 'react';
import { DienstFAQ } from '@/data/types/dienst';

interface DienstFAQsProps {
  faqs: DienstFAQ[];
}

const DienstFAQs = ({ faqs }: DienstFAQsProps) => {
  return (
    <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Veelgestelde vragen</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-lg animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.8}s` }}>
            <h3 className="text-xl font-semibold mb-2 text-brand-darkGreen">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DienstFAQs;
