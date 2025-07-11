
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormSectionProps {
  formData: {
    voornaam: string;
    achternaam: string;
    emailadres: string;
    telefoon: string;
    straatnaam: string;
    huisnummer: string;
    postcode: string;
    plaats: string;
    bericht: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
  uploadedFile: File | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactFormSection = ({ formData, onFormDataChange, uploadedFile, onFileUpload }: ContactFormSectionProps) => {
  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div>
        <Label htmlFor="file-upload">Bijlage uploaden (optioneel)</Label>
        <Input
          id="file-upload"
          type="file"
          onChange={onFileUpload}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="mt-2"
        />
        {uploadedFile && (
          <p className="text-sm text-green-600 mt-1">
            Bestand geüpload: {uploadedFile.name}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Ondersteunde formaten: PDF, JPG, PNG, DOC, DOCX (max 10MB)
        </p>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="bericht">Aanvullende opmerkingen (optioneel)</Label>
        <Textarea
          id="bericht"
          value={formData.bericht}
          onChange={(e) => onFormDataChange({ bericht: e.target.value })}
          placeholder="Eventuele extra informatie over uw project..."
        />
      </div>

      {/* Contact Information */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Contactgegevens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="voornaam">Voornaam *</Label>
            <Input
              id="voornaam"
              value={formData.voornaam}
              onChange={(e) => onFormDataChange({ voornaam: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="achternaam">Achternaam *</Label>
            <Input
              id="achternaam"
              value={formData.achternaam}
              onChange={(e) => onFormDataChange({ achternaam: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="emailadres">E-mailadres *</Label>
            <Input
              id="emailadres"
              type="email"
              value={formData.emailadres}
              onChange={(e) => onFormDataChange({ emailadres: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="telefoon">Telefoonnummer *</Label>
            <Input
              id="telefoon"
              value={formData.telefoon}
              onChange={(e) => onFormDataChange({ telefoon: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2">
            <Label htmlFor="straatnaam">Straatnaam *</Label>
            <Input
              id="straatnaam"
              value={formData.straatnaam}
              onChange={(e) => onFormDataChange({ straatnaam: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="huisnummer">Huisnummer *</Label>
            <Input
              id="huisnummer"
              value={formData.huisnummer}
              onChange={(e) => onFormDataChange({ huisnummer: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="postcode">Postcode *</Label>
            <Input
              id="postcode"
              value={formData.postcode}
              onChange={(e) => onFormDataChange({ postcode: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="plaats">Plaats *</Label>
            <Input
              id="plaats"
              value={formData.plaats}
              onChange={(e) => onFormDataChange({ plaats: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
