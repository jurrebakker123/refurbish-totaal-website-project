
/**
 * EmailJS configuratie
 * 
 * Voor deze configuratie heeft u een EmailJS account nodig.
 * 1. Ga naar https://www.emailjs.com/ en maak een account aan
 * 2. Maak een nieuwe service aan (bijv. Gmail, Outlook, etc.)
 * 3. Maak een nieuw template aan
 * 4. Vul hieronder uw Service ID, Template ID en Public Key in
 */

import emailjs from '@emailjs/browser';

// EmailJS configuratie initialiseren
emailjs.init("tqJDJUY1QjRWXLIiF");

export const emailConfig = {
  serviceId: 'service_mp8y6zo', // Uw Service ID van EmailJS
  templateId: 'template_ix4mdjh', // Uw Template ID van EmailJS
  publicKey: 'tqJDJUY1QjRWXLIiF', // Uw Public Key van EmailJS
  contactEmail: 'info@refurbishtotaalnederland.nl',
};

/**
 * Functie voor het verzenden van e-mails via EmailJS
 * 
 * @param templateParams Parameters die nodig zijn voor het template
 * @returns Object met succes status en resultaat of fout
 */
export const sendEmail = async (templateParams: Record<string, any>) => {
  try {
    console.log('EmailJS verzendpoging met parameters:', templateParams);
    
    // Verzeker dat alle vereiste velden aanwezig zijn
    const params = {
      ...templateParams,
      from_name: templateParams.from_name || "Niet opgegeven",
      from_email: templateParams.from_email || "noreply@refurbishtotaalnederland.nl",
      to_name: templateParams.to_name || "Refurbish Totaal Nederland",
      to_email: templateParams.to_email || emailConfig.contactEmail,
      subject: templateParams.subject || "Contact via website",
      reply_to: "" // Initialize reply_to property to avoid TypeScript errors
    };
    
    // Zorg ervoor dat reply_to correct is ingesteld
    // Dit is een kritiek veld dat vaak problemen veroorzaakt in EmailJS
    if (!templateParams.reply_to || !isValidEmail(templateParams.reply_to)) {
      if (isValidEmail(templateParams.from_email)) {
        params.reply_to = templateParams.from_email;
      } else if (isValidEmail(templateParams.email)) {
        params.reply_to = templateParams.email;
      } else {
        // Als er geen geldig e-mailadres is, gebruik dan de noreply
        params.reply_to = "noreply@refurbishtotaalnederland.nl";
      }
    }
    
    console.log('EmailJS verzenden met definitieve parameters:', params);
    
    // Direct emailjs gebruiken met expliciete options parameter
    const result = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      params,
      {
        publicKey: emailConfig.publicKey,
      }
    );
    
    console.log('EmailJS succes:', result);
    return { success: true, result };
  } catch (error: any) {
    console.error('EmailJS fout:', error);
    // Log meer details over de fout
    if (error.text) console.error('EmailJS foutmelding:', error.text);
    return { success: false, error };
  }
};

/**
 * Helper functie om te controleren of een e-mailadres geldig is
 */
function isValidEmail(email: any): boolean {
  if (!email || typeof email !== 'string') return false;
  // Basic e-mail validatie met regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
