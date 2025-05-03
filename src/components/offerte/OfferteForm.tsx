
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { OfferteFormData, offerteFormSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { sendEmail } from "@/config/email";
import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from "./constants";

declare global {
  interface Window {
    uploadcare: any;
  }
}

export function OfferteForm() {
  const form = useForm<OfferteFormData>({
    resolver: zodResolver(offerteFormSchema),
    defaultValues: {
      naam: '',
      email: '',
      telefoon: '',
      woonplaats: '',
      datum: '',
      diensten: [],
      bericht: '',
      tekening_link: '',
      terms: false
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadcareInputRef = useRef<HTMLInputElement>(null);
  const [uploadcareLoaded, setUploadcareLoaded] = useState(false);

  // Wait for the Uploadcare widget to load and initialize
  useEffect(() => {
    const checkUploadcare = () => {
      if (window.uploadcare) {
        setUploadcareLoaded(true);
      } else {
        setTimeout(checkUploadcare, 100);
      }
    };
    
    checkUploadcare();
  }, []);

  // Initialize Uploadcare widget when it's loaded
  useEffect(() => {
    if (uploadcareLoaded && uploadcareInputRef.current) {
      const widget = window.uploadcare.Widget(uploadcareInputRef.current);
      
      // Listen for file changes
      widget.onChange(function(file: any) {
        if (file) {
          file.done(function(fileInfo: any) {
            form.setValue('tekening_link', fileInfo.cdnUrl);
            toast.success("Tekening geupload!", {
              duration: 3000,
              position: 'top-center',
            });
          });
        } else {
          form.setValue('tekening_link', '');
        }
      });
    }
  }, [uploadcareLoaded, form]);

  const handleSubmit = async (data: OfferteFormData) => {
    if (!data.terms) {
      toast.error("U dient akkoord te gaan met onze voorwaarden.", {
        duration: 5000,
        position: 'top-center',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Offerte Form Submission:', { 
        ...data,
        tekeningLink: data.tekening_link || "Geen tekening"
      });

      // Formatteer geselecteerde diensten als string
      const selectedServices = data.diensten.join(", ");

      const result = await sendEmail({
        from_name: data.naam,
        from_email: data.email,
        to_name: "Refurbish Totaal Nederland",
        to_email: "info@refurbishtotaalnederland.nl",
        subject: `Nieuwe offerte aanvraag: ${selectedServices}`,
        message: data.bericht || "Geen bericht",
        phone: data.telefoon,
        location: data.woonplaats,
        service: selectedServices,
        preferred_date: data.datum || "Niet opgegeven",
        tekening_link: data.tekening_link || "Geen tekening",
        templateId: "template_ezfzaao" // Sjabloon ID voor offerteaanvragen
      });

      if (result.success) {
        toast.success("Bedankt voor uw aanvraag! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
          position: 'top-center',
        });
        
        form.reset();
        
        // Reset Uploadcare widget if it exists
        if (window.uploadcare && uploadcareInputRef.current) {
          const widget = window.uploadcare.Widget(uploadcareInputRef.current);
          widget.value(null);
        }
      } else {
        throw new Error("EmailJS verzending mislukt");
      }
    } catch (error) {
      console.error('Offerte Form Email Error:', error);
      toast.error("Er is iets misgegaan bij het verzenden van uw aanvraag. Probeer het later opnieuw of neem direct contact met ons op.", {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="naam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naam</FormLabel>
                <FormControl>
                  <Input placeholder="Uw naam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mailadres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="uw@email.nl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="telefoon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefoonnummer</FormLabel>
              <FormControl>
                <Input placeholder="+31 6 30136079" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diensten"
          render={() => (
            <FormItem>
              <FormLabel>Dienst(en)</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {SERVICES.map((service) => (
                  <FormField
                    key={service}
                    control={form.control}
                    name="diensten"
                    render={({ field }) => {
                      return (
                        <FormItem key={service} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, service])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== service
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {service}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="woonplaats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Woonplaats</FormLabel>
              <FormControl>
                <Input placeholder="Uw woonplaats" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gewenste datum (optioneel)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bericht"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bericht</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Vertel ons over uw project..." 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Uploadcare widget */}
        <FormField
          control={form.control}
          name="tekening_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload tekeningen</FormLabel>
              <div className="flex flex-col space-y-1">
                <input
                  ref={uploadcareInputRef}
                  type="hidden"
                  role="uploadcare-uploader"
                  data-tabs="file url"
                  data-multiple="false"
                  data-clearable
                  data-preview-step
                  data-button-text="Upload tekeningen"
                  {...field}
                />
                <p className="text-xs text-gray-500">Max. 10 MB – PDF, JPG, PNG</p>
                {field.value && (
                  <p className="text-xs text-green-600">Bestand succesvol geupload!</p>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Ik ga akkoord met de <a href="/voorwaarden" className="text-brand-lightGreen hover:underline">algemene voorwaarden</a>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}
        </button>
      </form>
    </Form>
  );
}
