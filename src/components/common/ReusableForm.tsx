
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { emailConfig } from '@/config/email';
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
  additionalFields?: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
  }[];
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
  additionalFields = []
}: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  
  // Initialize Uploadcare when component mounts if file upload is needed
  useEffect(() => {
    if (showFileUpload) {
      // Add Uploadcare script dynamically
      const uploadcareScript = document.createElement('script');
      uploadcareScript.innerHTML = `UPLOADCARE_PUBLIC_KEY = '48d323acc8174b40046e';`;
      document.head.appendChild(uploadcareScript);
  
      const widgetScript = document.createElement('script');
      widgetScript.src = 'https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js';
      widgetScript.async = true;
      document.head.appendChild(widgetScript);
  
      // Initialize EmailJS
      emailjs.init(emailConfig.publicKey);
  
      // Log when scripts are loaded
      widgetScript.onload = () => {
        console.log('Uploadcare widget loaded successfully');
        initializeUploadcareWidget();
      };
  
      return () => {
        // Clean up
        document.head.removeChild(uploadcareScript);
        if (document.head.contains(widgetScript)) {
          document.head.removeChild(widgetScript);
        }
      };
    } else {
      // Just initialize EmailJS if no file upload needed
      emailjs.init(emailConfig.publicKey);
    }
  }, [showFileUpload]);

  // Initialize Uploadcare widget when it's available
  const initializeUploadcareWidget = () => {
    if (window.uploadcare && document.querySelector('[role=uploadcare-uploader]')) {
      const widget = window.uploadcare.Widget('[role=uploadcare-uploader]');
      
      // Listen for file changes
      widget.onChange(function(file: any) {
        if (file) {
          file.done(function(fileInfo: any) {
            console.log("Uploadcare file info:", fileInfo);
            const hiddenInput = document.querySelector('input[name="tekening_link"]') as HTMLInputElement;
            if (hiddenInput) {
              hiddenInput.value = fileInfo.cdnUrl;
              toast.success("Bestand geupload!", {
                duration: 3000,
                position: 'top-center',
              });
            }
          });
        }
      });
    } else {
      console.log('Uploadcare not available yet or uploader not found');
      // Retry in a moment if elements aren't ready
      setTimeout(initializeUploadcareWidget, 500);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if terms are accepted
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
    
    // Get the tekening_link value if applicable
    const teekeningLink = showFileUpload ? formData.get('tekening_link') as string : "";
    
    // Prepare email data
    const emailData: Record<string, any> = {
      from_name: formData.get('naam') as string,
      from_email: formData.get('email') as string,
      to_name: "Refurbish Totaal Nederland",
      to_email: emailConfig.contactEmail,
      subject: `Nieuw bericht: ${showServiceInput ? formData.get('dienst') || "Contact" : "Contact"}`,
      message: formData.get('bericht') as string,
      phone: formData.get('telefoon') as string,
      location: formData.get('woonplaats') as string,
      preferred_date: showDateField && formData.get('datum') ? formData.get('datum') as string : "Niet opgegeven",
      terms_accepted: "Ja"
    };

    // Add service information if applicable
    if (showServiceInput) {
      emailData.service = formData.get('dienst') as string;
    }

    // Add tekening information if applicable
    if (showFileUpload) {
      emailData.tekening_link = teekeningLink || "";
      emailData.tekening_beschikbaar = teekeningLink ? "Ja" : "Nee";
    }

    // Add additional fields to email data
    additionalFields.forEach(field => {
      emailData[field.name] = formData.get(field.name);
    });

    console.log("Sending email with data:", emailData);
    
    // Send the email
    emailjs.send(
      emailConfig.serviceId,
      templateId,
      emailData,
      { publicKey: emailConfig.publicKey }
    ).then(
      () => {
        console.log('Email sent successfully');
        toast.success("Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
          position: 'top-center',
        });
        form.reset();
        setTermsAccepted(false);
        
        // Reset Uploadcare widget if it exists
        if (showFileUpload && window.uploadcare) {
          const widget = window.uploadcare.Widget('[role=uploadcare-uploader]');
          widget.value(null);
        }

        // Redirect if specified
        if (redirectPath) {
          window.location.href = redirectPath;
        }
      },
      (error) => {
        console.error('Email sending failed:', error);
        toast.error("Er is iets misgegaan bij het verzenden van uw bericht. Probeer het later opnieuw of neem direct contact met ons op.", {
          duration: 5000,
          position: 'top-center',
        });
      }
    ).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
      {title && <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">{title}</h2>}
      {description && <p className="mb-6 text-gray-600">{description}</p>}
      
      <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
        <div className="field">
          <label className="block font-medium mb-1">Naam</label>
          <input 
            type="text" 
            name="naam" 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="field">
          <label className="block font-medium mb-1">E-mailadres</label>
          <input 
            type="email" 
            name="email" 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="field">
          <label className="block font-medium mb-1">Telefoonnummer</label>
          <input 
            type="tel" 
            name="telefoon" 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        {showServiceInput && (
          <div className="field">
            <label className="block font-medium mb-1">Dienst</label>
            <input 
              type="text" 
              name="dienst" 
              required 
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Bijv. Dakkapel, Schilderwerk, etc."
            />
          </div>
        )}
        
        <div className="field">
          <label className="block font-medium mb-1">Woonplaats</label>
          <input 
            type="text" 
            name="woonplaats" 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        {showDateField && (
          <div className="field">
            <label className="block font-medium mb-1">Gewenste datum</label>
            <input 
              type="date" 
              name="datum" 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}
        
        {/* Additional custom fields */}
        {additionalFields.map((field) => (
          <div className="field" key={field.name}>
            <label className="block font-medium mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                required={field.required}
                className="w-full p-2 border border-gray-300 rounded"
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
                required={field.required}
                placeholder={field.placeholder}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            ) : (
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}
          </div>
        ))}
        
        <div className="field">
          <label className="block font-medium mb-1">Bericht</label>
          <textarea 
            name="bericht" 
            rows={5} 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        
        {showFileUpload && (
          <div className="field">
            <label className="block font-medium mb-1">Upload bestanden</label>
            <input
              type="hidden"
              role="uploadcare-uploader"
              name="tekening_link"
              data-tabs="file url"
              data-multiple="false"
              data-clearable
              data-preview-step
              data-button-text="Upload bestanden"
            />
            <p className="text-xs text-gray-500 mt-1">Max. 10 MB – PDF, JPG, PNG. De link wordt automatisch toegevoegd.</p>
          </div>
        )}

        {/* Terms and Conditions Checkbox */}
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
            <label htmlFor="terms" className={`text-sm ${termsError ? 'text-red-600' : 'text-gray-700'}`}>
              Ik ga akkoord met de <Link to="/voorwaarden" className="text-brand-lightGreen hover:underline">algemene voorwaarden</Link>
            </label>
          </div>
          {termsError && <p className="text-red-600 text-xs mt-1">U dient akkoord te gaan met onze voorwaarden</p>}
        </div>
        
        <div className="field">
          <button 
            type="submit" 
            className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
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
