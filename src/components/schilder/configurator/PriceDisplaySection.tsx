
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PriceDisplaySectionProps {
  formData: {
    project_type: string;
    bouw_type: string;
    meerdere_kleuren: boolean;
    oppervlakte: string;
    plafond_oppervlakte: string;
    aantal_deuren: string;
    aantal_ramen: string;
  };
  totalPrice: number | null;
  hasAnyInput: boolean;
}

const PriceDisplaySection = ({ formData, totalPrice, hasAnyInput }: PriceDisplaySectionProps) => {
  const btw = formData.bouw_type === 'nieuwbouw' ? 21 : 9;

  if (!hasAnyInput) return null;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800">Geschatte Prijs (Indicatief)</h3>
          {formData.project_type === 'binnen' && totalPrice ? (
            <>
              <p className="text-3xl font-bold text-blue-600">€{totalPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-blue-700 mb-2">
                Inclusief materiaal en arbeid
              </p>
              <p className="text-xs text-blue-600 mb-2">
                {formData.bouw_type === 'nieuwbouw' ? 'Nieuwbouw' : 'Renovatie'} - {btw}% BTW
              </p>
              <p className="text-xs text-blue-600">
                {formData.meerdere_kleuren ? 'Meerdere kleuren' : 'Één kleur'}
              </p>
            </>
          ) : (
            <div className="text-blue-700">
              <p className="text-lg font-semibold">Wij nemen contact met u op voor een prijs op maat</p>
              <p className="text-sm">Voor buitenschilderwerk hebben wij geen standaard prijzen</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceDisplaySection;
