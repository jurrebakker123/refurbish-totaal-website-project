
import { z } from "zod";

export const offerteFormSchema = z.object({
  naam: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  telefoon: z.string().min(10, "Voer een geldig telefoonnummer in"),
  woonplaats: z.string().min(2, "Woonplaats is verplicht"),
  datum: z.string().optional(),
  diensten: z.array(z.string()).min(1, "Selecteer minimaal één dienst"),
  bericht: z.string().optional(),
  tekening_link: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "U dient akkoord te gaan met onze voorwaarden",
  }),
});

export type OfferteFormData = z.infer<typeof offerteFormSchema>;
