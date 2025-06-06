
import { ReactNode } from 'react';

export type DienstFAQ = {
  question: string;
  answer: string;
};

export type DienstData = {
  title: string;
  description: string;
  longDescription: string;
  icon: ReactNode;
  features: string[];
  benefits: string[];
  faqs: DienstFAQ[];
  image: string;
  keywords?: string; // Added keywords as optional property
};

export type DienstenRecord = {
  [key: string]: DienstData;
};
