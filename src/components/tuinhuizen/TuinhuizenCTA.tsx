
import React from 'react';
import { CTATitle } from './cta/CTATitle';
import { CTAButtons } from './cta/CTAButtons';

export function TuinhuizenCTA() {
  return (
    <section className="py-16 bg-brand-darkGreen text-white">
      <div className="container">
        <CTATitle />
        <CTAButtons />
      </div>
    </section>
  );
}
