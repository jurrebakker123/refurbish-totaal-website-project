
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
  console.log('EmailJS verzendpoging met parameters:', templateParams);
  
  // Zorg ervoor dat we alle vereiste parameters hebben
  const params = {
    ...templateParams,
    // Voeg standaardwaarden toe als ze ontbreken
    from_name: templateParams.from_name || "Niet opgegeven",
    from_email: templateParams.from_email || templateParams.email || "Niet opgegeven", // Accepteer beide namen
    to_name: templateParams.to_name || "Refurbish Totaal Nederland",
    to_email: templateParams.to_email || emailConfig.contactEmail,
    subject: templateParams.subject || "Contact via website",
    // Zorg ervoor dat reply_to altijd een geldig e-mailadres heeft
    reply_to: templateParams.from_email || templateParams.email || emailConfig.contactEmail
  };
  
  try {
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
  } catch (error) {
    console.error('EmailJS fout:', error);
    return { success: false, error };
  }
};
