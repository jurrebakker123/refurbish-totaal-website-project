
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface ProjectTypeSectionProps {
  formData: {
    project_type: string;
    bouw_type: string;
    meerdere_kleuren: boolean;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

const ProjectTypeSection = ({ formData, onFormDataChange }: ProjectTypeSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Build Type Selection */}
      <div>
        <Label className="text-base font-medium">Nieuwbouw of renovatie?</Label>
        <RadioGroup
          value={formData.bouw_type}
          onValueChange={(value) => onFormDataChange({ bouw_type: value })}
          className="flex flex-col space-y-2 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renovatie" id="renovatie" />
            <Label htmlFor="renovatie">Renovatie (9% BTW)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nieuwbouw" id="nieuwbouw" />
            <Label htmlFor="nieuwbouw">Nieuwbouw (21% BTW)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Project Type Selection */}
      <div>
        <Label className="text-base font-medium">Binnen of buiten schilderwerk?</Label>
        <RadioGroup
          value={formData.project_type}
          onValueChange={(value) => onFormDataChange({ project_type: value })}
          className="flex flex-col space-y-2 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="binnen" id="binnen" />
            <Label htmlFor="binnen">Binnen schilderwerk</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="buiten" id="buiten" />
            <Label htmlFor="buiten">Buiten schilderwerk</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Color Selection */}
      <div>
        <Label className="text-base font-medium">Kleuroptie</Label>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="meerdere_kleuren"
            checked={formData.meerdere_kleuren}
            onCheckedChange={(checked) => onFormDataChange({ meerdere_kleuren: checked as boolean })}
          />
          <Label htmlFor="meerdere_kleuren">Meerdere kleuren gebruiken</Label>
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeSection;
