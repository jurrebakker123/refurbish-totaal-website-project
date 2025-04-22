
/**
 * EmailJS configuratie
 * 
 * Voor deze configuratie heeft u een EmailJS account nodig.
 * 1. Ga naar https://www.emailjs.com/ en maak een account aan
 * 2. Maak een nieuwe service aan (bijv. Gmail, Outlook, etc.)
 * 3. Maak een nieuw template aan
 * 4. Vul hieronder uw Service ID, Template ID en Public Key in
 */

export const emailConfig = {
  serviceId: 'YOUR_SERVICE_ID', // Vervang met uw EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID', // Vervang met uw EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY', // Vervang met uw EmailJS public key
  contactEmail: 'info@jbe-commerce.com', // Dit is het e-mailadres waar berichten naartoe worden gestuurd
};

/**
 * INSTRUCTIES VOOR GEBRUIK:
 * 
 * 1. Maak een EmailJS account aan op https://www.emailjs.com/
 * 2. In uw dashboard, maak een nieuwe service aan (Gmail, Outlook, etc.)
 * 3. Ga naar "Email Templates" en maak een nieuw template
 * 4. In het template, gebruik de volgende parameters:
 *    - {{from_name}} - de naam van de persoon die het formulier verstuurt
 *    - {{from_email}} - het e-mailadres van de persoon
 *    - {{message}} - het bericht
 *    - {{subject}} - het onderwerp
 *    - {{phone}} - het telefoonnummer
 * 5. Kopieer uw Service ID, Template ID en Public Key hierboven
 */
