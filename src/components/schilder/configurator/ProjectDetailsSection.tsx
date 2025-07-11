
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ProjectDetailsSectionProps {
  formData: {
    oppervlakte: string;
    plafond_oppervlakte: string;
    aantal_deuren: string;
    aantal_ramen: string;
    uitvoertermijn: string;
    reden_aanvraag: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

const ProjectDetailsSection = ({ formData, onFormDataChange }: ProjectDetailsSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="oppervlakte">Wand oppervlakte (m²)</Label>
          <Input
            id="oppervlakte"
            type="number"
            step="0.01"
            value={formData.oppervlakte}
            onChange={(e) => onFormDataChange({ oppervlakte: e.target.value })}
            placeholder="Bijvoorbeeld: 50"
          />
        </div>
        <div>
          <Label htmlFor="plafond_oppervlakte">Plafond oppervlakte (m²)</Label>
          <Input
            id="plafond_oppervlakte"
            type="number"
            step="0.01"
            value={formData.plafond_oppervlakte}
            onChange={(e) => onFormDataChange({ plafond_oppervlakte: e.target.value })}
            placeholder="Bijvoorbeeld: 25"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="aantal_deuren">Aantal deuren (incl. kozijn)</Label>
          <Input
            id="aantal_deuren"
            type="number"
            value={formData.aantal_deuren}
            onChange={(e) => onFormDataChange({ aantal_deuren: e.target.value })}
            placeholder="Bijvoorbeeld: 3"
          />
        </div>
        <div>
          <Label htmlFor="aantal_ramen">Aantal ramen (incl. kozijn)</Label>
          <Input
            id="aantal_ramen"
            type="number"
            value={formData.aantal_ramen}
            onChange={(e) => onFormDataChange({ aantal_ramen: e.target.value })}
            placeholder="Bijvoorbeeld: 5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="uitvoertermijn">Gewenste startdatum *</Label>
        <Input
          id="uitvoertermijn"
          value={formData.uitvoertermijn}
          onChange={(e) => onFormDataChange({ uitvoertermijn: e.target.value })}
          placeholder="Bijvoorbeeld: 15 januari 2024, flexibel, zo snel mogelijk"
          required
        />
      </div>

      <div>
        <Label htmlFor="reden_aanvraag">Wat is de reden van uw aanvraag? *</Label>
        <Input
          id="reden_aanvraag"
          value={formData.reden_aanvraag}
          onChange={(e) => onFormDataChange({ reden_aanvraag: e.target.value })}
          placeholder="Bijvoorbeeld: verhuizing, onderhoud, renovatie"
          required
        />
      </div>
    </div>
  );
};

export default ProjectDetailsSection;
