
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
    console.log('EmailJS verzendpoging met parameters:', {
      ...templateParams,
      tekening: templateParams.tekening ? "Bestand aanwezig (base64 string)" : "Geen bestand",
      tekening_naam: templateParams.tekening_naam || "Geen bestand"
    });
    
    // KRITIEKE VALIDATIE voor Outlook compatibiliteit:
    // --------------------------------------------
    // 1. from_email en reply_to moeten altijd geldige e-mailadressen zijn
    // 2. We gebruiken een gevalideerd e-mailadres of een betrouwbaar fallback
    
    // Standaard e-mailparameters met gegarandeerd geldige waarden
    const params = {
      // Afzender informatie (begin met betrouwbare standaardwaarden)
      from_name: templateParams.from_name || "Niet opgegeven",
      from_email: emailConfig.contactEmail, 
      
      // Ontvanger informatie (altijd vast)
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
      tekening_naam: templateParams.tekening_naam || "Geen bestand",
      
      // KRITIEK voor Outlook - begin met een gegarandeerd geldig e-mailadres
      reply_to: emailConfig.contactEmail, 
    };
    
    // Validatie en overschrijven met gebruikersgegevens indien geldig
    if (templateParams.from_email && isValidEmail(templateParams.from_email)) {
      params.from_email = templateParams.from_email;
      params.reply_to = templateParams.from_email;
      console.log('Geldig e-mailadres gebruikt voor reply_to:', templateParams.from_email);
    } else {
      console.log('Geen geldig e-mailadres opgegeven, standaard gebruikt:', emailConfig.contactEmail);
    }
    
    console.log('EmailJS verzenden met definitieve parameters:', {
      ...params,
      tekening: params.tekening ? "Bestand aanwezig (base64 string)" : "Geen bestand"
    });
    
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
