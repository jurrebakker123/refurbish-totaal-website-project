
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
    
    // BELANGRIJK: Outlook vereist een geldig e-mailadres voor de reply_to parameter
    // We controleren of er een geldig e-mailadres is opgegeven, zo niet, dan gebruiken we het standaard contactadres
    
    // Standaard e-mailparameters met vaste waarden voor kritieke velden
    const params = {
      // Afzender informatie
      from_name: templateParams.from_name || "Niet opgegeven",
      from_email: emailConfig.contactEmail, // Begin met een gegarandeerd geldig e-mailadres
      
      // Ontvanger informatie (vast)
      to_name: "Refurbish Totaal Nederland",
      to_email: emailConfig.contactEmail,
      
      // E-mail inhoud
      subject: templateParams.subject || "Contact via website",
      message: templateParams.message || "",
      phone: templateParams.phone || "",
      location: templateParams.location || "",
      service: templateParams.service || "",
      preferred_date: templateParams.preferred_date || "",
      tekening: templateParams.tekening || "",
      
      // Reply-to instelling - KRITIEK voor Outlook
      reply_to: emailConfig.contactEmail, // Begin met een gegarandeerd geldig e-mailadres
    };
    
    // Als er een geldig e-mailadres is opgegeven, gebruiken we dat voor from_email en reply_to
    if (templateParams.from_email && isValidEmail(templateParams.from_email)) {
      params.from_email = templateParams.from_email;
      params.reply_to = templateParams.from_email;
      console.log('Geldig e-mailadres opgegeven:', templateParams.from_email);
    } else {
      console.log('Geen geldig e-mailadres opgegeven, gebruik standaard:', emailConfig.contactEmail);
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
