
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { sendEmail, EmailData } from '@/config/email';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'number';
  required?: boolean;
  placeholder?: string;
}

interface ReusableFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => Promise<void>;
  submitButtonText?: string;
  tableName?: string;
  emailConfig?: {
    subject: string;
    confirmationMessage: string;
    adminEmails: string[];
  };
}

const ReusableForm = ({ 
  title, 
  fields, 
  onSubmit, 
  submitButtonText = 'Versturen',
  tableName,
  emailConfig
}: ReusableFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database if tableName provided
      if (tableName) {
        const { error } = await supabase
          .from(tableName)
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
    const value = formData[field.name] || '';

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
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {renderField(field)}
            </div>
          ))}
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Bezig met verzenden...' : submitButtonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReusableForm;
