
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { sendEmail, EmailData } from '@/config/email';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'number' | 'select' | 'hidden';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string; }[];
  value?: string;
}

interface ReusableFormProps {
  title: string;
  description?: string;
  fields?: FormField[];
  onSubmit?: (data: any) => Promise<void>;
  submitButtonText?: string;
  tableName?: string;
  supabaseTable?: string;
  templateId?: string;
  buttonText?: string;
  showServiceInput?: boolean;
  showFileUpload?: boolean;
  showDateField?: boolean;
  additionalFields?: FormField[];
  onSuccess?: () => void;
  emailConfig?: {
    subject: string;
    confirmationMessage: string;
    adminEmails: string[];
  };
}

const ReusableForm = ({ 
  title, 
  description,
  fields = [],
  onSubmit, 
  submitButtonText = 'Versturen',
  tableName,
  supabaseTable,
  templateId,
  buttonText,
  showServiceInput = false,
  showFileUpload = false,
  showDateField = false,
  additionalFields = [],
  onSuccess,
  emailConfig
}: ReusableFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default fields for common forms
  const defaultFields: FormField[] = [
    { name: 'voornaam', label: 'Voornaam', type: 'text', required: true },
    { name: 'achternaam', label: 'Achternaam', type: 'text', required: true },
    { name: 'emailadres', label: 'E-mailadres', type: 'email', required: true },
    { name: 'telefoon', label: 'Telefoonnummer', type: 'tel', required: true },
    { name: 'straatnaam', label: 'Straatnaam', type: 'text', required: true },
    { name: 'huisnummer', label: 'Huisnummer', type: 'text', required: true },
    { name: 'postcode', label: 'Postcode', type: 'text', required: true },
    { name: 'plaats', label: 'Plaats', type: 'text', required: true },
  ];

  // Add service field if requested with only the three main services
  if (showServiceInput) {
    defaultFields.push({
      name: 'dienst',
      label: 'Welke dienst heeft u nodig?',
      type: 'select',
      required: true,
      options: [
        { value: 'Dakkapel', label: 'Dakkapel' },
        { value: 'Schilderwerk', label: 'Schilderwerk' },
        { value: 'Stukadoor', label: 'Stukadoor' }
      ]
    });
  }

  // Add preferred date field if requested
  if (showDateField) {
    defaultFields.push({
      name: 'gewenste_datum',
      label: 'Gewenste datum',
      type: 'text',
      placeholder: 'Bijvoorbeeld: volgende maand, flexibel'
    });
  }

  // Add message field
  defaultFields.push({
    name: 'bericht',
    label: 'Bericht (optioneel)',
    type: 'textarea',
    placeholder: 'Vertel ons meer over uw project...'
  });

  const allFields = [...defaultFields, ...additionalFields, ...fields];

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tableToUse = tableName || supabaseTable;
      
      // Save to database if table specified
      if (tableToUse) {
        const { error } = await supabase
          .from(tableToUse as any)
          .insert(formData);
        
        if (error) throw error;
      }

      // Send emails if config provided
      if (emailConfig) {
        const customerEmailData: EmailData = {
          from_name: 'Refurbish Totaal Nederland',
          from_email: 'info@refurbishtotaalnederland.nl',
          to_name: `${formData.voornaam} ${formData.achternaam}`,
          to_email: formData.emailadres,
          subject: emailConfig.subject,
          message: emailConfig.confirmationMessage,
          phone: formData.telefoon,
          location: formData.plaats
        };

        await sendEmail(customerEmailData);

        // Send admin notifications
        for (const adminEmail of emailConfig.adminEmails) {
          const adminEmailData: EmailData = {
            from_name: `${formData.voornaam} ${formData.achternaam}`,
            from_email: formData.emailadres,
            to_name: 'Admin',
            to_email: adminEmail,
            subject: `Nieuwe aanvraag van ${formData.voornaam} ${formData.achternaam}`,
            message: `Nieuwe aanvraag ontvangen:\n\n${JSON.stringify(formData, null, 2)}`,
            phone: formData.telefoon,
            location: formData.plaats
          };

          await sendEmail(adminEmailData);
        }
      }

      // Call custom onSubmit handler
      if (onSubmit) {
        await onSubmit(formData);
      }

      // Call onSuccess callback
      if (onSuccess) {
        onSuccess();
      }

      toast.success('Bedankt voor uw aanvraag, wij nemen zo snel mogelijk contact met u op!');
      
      // Reset form
      setFormData({});

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Er ging iets mis bij het verzenden van uw aanvraag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || field.value || '';

    if (field.type === 'hidden') {
      return (
        <input
          type="hidden"
          name={field.name}
          value={value}
          onChange={() => {}}
        />
      );
    }

    if (field.type === 'textarea') {
      return (
        <Textarea
          id={field.name}
          value={value}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
        />
      );
    }

    if (field.type === 'select' && field.options) {
      return (
        <Select value={value} onValueChange={(val) => handleInputChange(field.name, val)}>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || `Selecteer ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        id={field.name}
        type={field.type}
        value={value}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
      />
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-gray-600">{description}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {allFields.map((field) => (
            <div key={field.name} className={field.type === 'hidden' ? 'hidden' : ''}>
              {field.type !== 'hidden' && <Label htmlFor={field.name}>{field.label}</Label>}
              {renderField(field)}
            </div>
          ))}

          {showFileUpload && (
            <div>
              <Label htmlFor="file-upload">Bijlage uploaden (optioneel)</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ondersteunde formaten: PDF, JPG, PNG, DOC, DOCX (max 10MB)
              </p>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Bezig met verzenden...' : (buttonText || submitButtonText)}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReusableForm;
