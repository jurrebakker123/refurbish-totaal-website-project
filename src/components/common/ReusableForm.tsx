
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { sendEmail } from '@/config/email';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

type FormProps = {
  title?: string;
  description?: string;
  showFileUpload?: boolean;
  templateId?: string;
  buttonText?: string;
  showServiceInput?: boolean;
  useCheckboxServices?: boolean;
  showDateField?: boolean;
  redirectPath?: string;
  supabaseTable?: string;
  additionalFields?: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
  }[];
  onSuccess?: () => void;
};

const ReusableForm = ({
  title = "Contactformulier",
  description = "Vul het formulier in en we nemen zo snel mogelijk contact met u op.",
  showFileUpload = false,
  templateId = "template_ezfzaao",
  buttonText = "Verstuur",
  showServiceInput = false,
  useCheckboxServices = false,
  showDateField = false,
  redirectPath = "",
  supabaseTable = "",
  additionalFields = [],
  onSuccess
}: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const getHiddenFieldValue = (fieldName: string, formData: FormData) => {
    const value = formData.get(fieldName);
    if (value) return value as string;
    
    // Set default values for hidden fields if not provided
    switch (fieldName) {
      case 'type_paneel':
        return 'Algemene vraag';
      case 'aantal_panelen':
        return '0';
      case 'vermogen':
        return '0';
      case 'merk':
        return 'Algemene vraag';
      case 'conditie':
        return 'Adviesgesprek';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setTermsError(true);
      toast.error("U dient akkoord te gaan met onze voorwaarden.", {
        duration: 5000,
        position: 'top-center',
      });
      return;
    }
    
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Prepare data for Supabase
    if (supabaseTable) {
      const supabaseData: any = {
        naam: formData.get('naam') as string,
        email: formData.get('email') as string,
        telefoon: formData.get('telefoon') as string,
        adres: formData.get('woonplaats') as string,
        plaats: formData.get('woonplaats') as string,
        postcode: '',
        opmerkingen: formData.get('bericht') as string,
        status: 'nieuw'
      };

      // Add additional fields
      additionalFields.forEach(field => {
        const value = field.type === 'hidden' 
          ? getHiddenFieldValue(field.name, formData)
          : formData.get(field.name);
        if (value !== null && value !== '') {
          supabaseData[field.name] = value;
        }
      });

      console.log('Saving to Supabase:', supabaseData);

      try {
        const { data, error } = await supabase
          .from(supabaseTable as any)
          .insert([supabaseData]);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Saved to Supabase successfully:', data);
      } catch (error) {
        console.error('Error saving to Supabase:', error);
        toast.error("Er is een fout opgetreden bij het opslaan van uw aanvraag.", {
          duration: 5000,
          position: 'top-center',
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Prepare email data
    const emailData: Record<string, any> = {
      from_name: formData.get('naam') as string,
      from_email: formData.get('email') as string,
      to_name: "Refurbish Totaal Nederland",
      to_email: "info@refurbishtotaalnederland.nl",
      subject: `Nieuw bericht: ${showServiceInput ? formData.get('dienst') || "Contact" : "Contact"}`,
      message: formData.get('bericht') as string,
      phone: formData.get('telefoon') as string,
      location: formData.get('woonplaats') as string,
      preferred_date: showDateField && formData.get('datum') ? formData.get('datum') as string : "Niet opgegeven",
      terms_accepted: "Ja",
      templateId: templateId
    };

    if (showServiceInput) {
      emailData.service = formData.get('dienst') as string;
    }

    if (showFileUpload) {
      emailData.tekening_link = formData.get('tekening_link') as string || "";
      emailData.tekening_beschikbaar = formData.get('tekening_link') ? "Ja" : "Nee";
    }

    additionalFields.forEach(field => {
      const value = field.type === 'hidden' 
        ? getHiddenFieldValue(field.name, formData)
        : formData.get(field.name);
      emailData[field.name] = value;
      emailData[`field_${field.name}`] = value;
    });

    console.log("Sending email with data:", emailData);
    
    try {
      const result = await sendEmail(emailData);
      
      if (result.success) {
        console.log('Email sent successfully');
        toast.success("Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
          position: 'top-center',
        });
        form.reset();
        setTermsAccepted(false);

        if (onSuccess) {
          onSuccess();
        }

        if (redirectPath) {
          window.location.href = redirectPath;
        }
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error("Er is iets misgegaan bij het verzenden van uw bericht. Probeer het later opnieuw.", {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      {title && <h2 className="text-xl font-bold text-brand-darkGreen mb-4">{title}</h2>}
      {description && <p className="mb-4 text-gray-600 text-sm">{description}</p>}
      
      <form ref={formRef} className="space-y-3" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="naam" className="block font-medium mb-1 text-gray-700 text-sm">Naam</label>
          <input 
            type="text" 
            name="naam" 
            id="naam"
            required 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
            placeholder="Uw naam"
          />
        </div>
        
        <div className="field">
          <label htmlFor="email" className="block font-medium mb-1 text-gray-700 text-sm">E-mailadres</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            required 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
            placeholder="uw.email@voorbeeld.nl"
          />
        </div>
        
        <div className="field">
          <label htmlFor="telefoon" className="block font-medium mb-1 text-gray-700 text-sm">Telefoonnummer</label>
          <input 
            type="tel" 
            name="telefoon" 
            id="telefoon"
            required 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
            placeholder="06 12345678"
          />
        </div>
        
        <div className="field">
          <label htmlFor="woonplaats" className="block font-medium mb-1 text-gray-700 text-sm">Woonplaats</label>
          <input 
            type="text" 
            name="woonplaats" 
            id="woonplaats"
            required 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
            placeholder="Uw woonplaats"
          />
        </div>
        
        {additionalFields.map((field) => (
          <div className="field" key={field.name}>
            {field.type !== 'hidden' && (
              <label htmlFor={field.name} className="block font-medium mb-1 text-gray-700 text-sm">{field.label}</label>
            )}
            {field.type === 'select' ? (
              <select
                name={field.name}
                id={field.name}
                required={field.required}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
              >
                <option value="">Selecteer een optie</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
              ></textarea>
            ) : field.type === 'hidden' ? (
              <input
                type="hidden"
                name={field.name}
                id={field.name}
                value=""
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
              />
            )}
          </div>
        ))}
        
        <div className="field">
          <label htmlFor="bericht" className="block font-medium mb-1 text-gray-700 text-sm">Bericht</label>
          <textarea 
            name="bericht" 
            id="bericht"
            rows={3} 
            required 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black text-sm"
            placeholder="Uw bericht of vraag"
          ></textarea>
        </div>

        <div className="field">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) setTermsError(false);
              }}
              className="mt-1"
            />
            <label htmlFor="terms" className={`text-xs ${termsError ? 'text-red-600' : 'text-gray-700'}`}>
              Ik ga akkoord met de <Link to="/voorwaarden" className="text-brand-lightGreen hover:underline">algemene voorwaarden</Link>
            </label>
          </div>
          {termsError && <p className="text-red-600 text-xs mt-1">U dient akkoord te gaan met onze voorwaarden</p>}
        </div>
        
        <div className="field">
          <button 
            type="submit" 
            className="w-full bg-brand-green hover:bg-brand-darkGreen text-white py-2 px-4 rounded-md font-medium transition-colors text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Bezig met verzenden...' : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReusableForm;
