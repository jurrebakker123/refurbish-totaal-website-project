
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OfferteHero } from '@/components/offerte/OfferteHero';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { emailConfig } from '@/config/email';

const OffertePage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  // Initialize Uploadcare and EmailJS when component mounts
  useEffect(() => {
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
  }, []);

  // Initialize Uploadcare widget when it's available
  const initializeUploadcareWidget = () => {
    if (window.uploadcare && document.querySelector('[role=uploadcare-uploader]')) {
      const widget = window.uploadcare.Widget('[role=uploadcare-uploader]');
      
      // Listen for file changes
      widget.onChange(function(file) {
        if (file) {
          file.done(function(fileInfo) {
            console.log("Uploadcare file info:", fileInfo);
            const hiddenInput = document.querySelector('input[name="tekening_link"]') as HTMLInputElement;
            if (hiddenInput) {
              hiddenInput.value = fileInfo.cdnUrl;
              toast.success("Tekening geupload!", {
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
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Get the tekening_link value
    const teekeningLink = formData.get('tekening_link') as string;
    console.log("Form submission - tekening_link:", teekeningLink);
    
    // Prepare email data
    const emailData = {
      from_name: formData.get('naam') as string,
      from_email: formData.get('email') as string,
      to_name: "Refurbish Totaal Nederland",
      to_email: emailConfig.contactEmail,
      subject: `Nieuwe offerte aanvraag: ${formData.get('dienst')}`,
      message: formData.get('bericht') as string,
      phone: formData.get('telefoon') as string,
      location: formData.get('woonplaats') as string,
      service: formData.get('dienst') as string,
      preferred_date: formData.get('datum') as string || "Niet opgegeven",
      tekening_link: teekeningLink || "",
      tekening_beschikbaar: teekeningLink ? "Ja" : "Nee"
    };

    console.log("Sending email with data:", emailData);
    
    // Send the email
    emailjs.send(
      emailConfig.serviceId,
      'template_ezfzaao', // Sjabloon ID voor offerteaanvragen
      emailData,
      { publicKey: emailConfig.publicKey }
    ).then(
      () => {
        console.log('Email sent successfully');
        toast.success("Bedankt voor uw aanvraag! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
          position: 'top-center',
        });
        form.reset();
        
        // Reset Uploadcare widget if it exists
        if (window.uploadcare) {
          const widget = window.uploadcare.Widget('[role=uploadcare-uploader]');
          widget.value(null);
        }
      },
      (error) => {
        console.error('Email sending failed:', error);
        toast.error("Er is iets misgegaan bij het verzenden van uw aanvraag. Probeer het later opnieuw of neem direct contact met ons op.", {
          duration: 5000,
          position: 'top-center',
        });
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Offerte Aanvraag - Refurbish Totaal Nederland</title>
        <meta name="description" content="Vraag een vrijblijvende offerte aan voor uw bouw- of renovatieproject bij Refurbish Totaal Nederland." />
      </Helmet>
      <Header />
      <main className="flex-grow pt-32">
        <OfferteHero />
        
        {/* Simpel Offerte Formulier */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-darkGreen mb-4">Offerte Aanvraagformulier</h2>
              <p className="mb-6 text-gray-600">
                Wij nemen zo snel mogelijk contact met u op om uw wensen te bespreken.
              </p>
              
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
                
                <div className="field">
                  <label className="block font-medium mb-1">Woonplaats</label>
                  <input 
                    type="text" 
                    name="woonplaats" 
                    required 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="field">
                  <label className="block font-medium mb-1">Gewenste datum</label>
                  <input 
                    type="date" 
                    name="datum" 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="field">
                  <label className="block font-medium mb-1">Bericht</label>
                  <textarea 
                    name="bericht" 
                    rows={5} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                
                <div className="field">
                  <label className="block font-medium mb-1">Upload tekeningen</label>
                  <input
                    type="hidden"
                    role="uploadcare-uploader"
                    name="tekening_link"
                    data-tabs="file url"
                    data-multiple="false"
                    data-clearable
                    data-preview-step
                    data-button-text="Upload tekeningen"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max. 10 MB – PDF, JPG, PNG. De link wordt automatisch toegevoegd.</p>
                </div>
                
                <div className="field">
                  <button 
                    type="submit" 
                    className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Verstuur aanvraag
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffertePage;
