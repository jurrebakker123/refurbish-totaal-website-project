
import { z } from "zod";

export const offerteFormSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  phone: z.string().min(10, "Voer een geldig telefoonnummer in"),
  location: z.string().min(2, "Locatie is verplicht"),
  preferredDate: z.string().optional(),
  service: z.string().min(1, "Selecteer een dienst"),
  message: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "U dient akkoord te gaan met onze voorwaarden",
  }),
});

export type OfferteFormData = z.infer<typeof offerteFormSchema>;

