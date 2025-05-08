
import React from 'react';
import { DakkapelRenderer } from './DakkapelRenderer';
import { DakkapelConfiguration } from './DakkapelCalculator';

interface DakkapelRendererWrapperProps {
  configuration: DakkapelConfiguration;
}

export function DakkapelRendererWrapper({ configuration }: DakkapelRendererWrapperProps) {
  // The wrapper can handle any preprocessing needed before passing to DakkapelRenderer
  return (
    <div className="dakkapel-renderer-container">
      <DakkapelRenderer configuration={configuration} />
    </div>
  );
}
