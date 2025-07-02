
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface WhatsAppOptInCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

const WhatsAppOptInCheckbox: React.FC<WhatsAppOptInCheckboxProps> = ({
  checked,
  onCheckedChange,
  error
}) => {
  return (
    <div className="flex items-start space-x-3 space-y-0 bg-green-50 p-4 rounded-lg border border-green-200">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="mt-1"
      />
      <div className="flex-1">
        <Label className="font-normal text-sm text-gray-700">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-green-600">📱</span>
            <span className="font-medium">WhatsApp contact toestemming</span>
          </div>
          <span className="text-gray-600">
            Ik geef toestemming om via WhatsApp contact op te nemen m.b.t. mijn aanvraag. 
            Zo kunnen we je sneller en persoonlijker van dienst zijn met updates over je project.
          </span>
        </Label>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default WhatsAppOptInCheckbox;
