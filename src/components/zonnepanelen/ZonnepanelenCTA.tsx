
import React from 'react';
import { ZonnepanelenCTATitle } from './cta/ZonnepanelenCTATitle';
import { ZonnepanelenCTAButtons } from './cta/ZonnepanelenCTAButtons';

export function ZonnepanelenCTA() {
  return (
    <section className="py-16 bg-brand-darkGreen text-white">
      <div className="container">
        <ZonnepanelenCTATitle />
        <ZonnepanelenCTAButtons />
      </div>
    </section>
  );
}
