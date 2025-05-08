
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
  templateId: 'template_ix4mdjh', // Standaard Template ID van EmailJS
  publicKey: 'tqJDJUY1QjRWXLIiF', // Uw Public Key van EmailJS
  contactEmail: 'info@refurbishtotaalnederland.nl',
};

// Definieer het type voor de email parameters inclusief _attachments
// Belangrijk: Met indexsignatuur om aan Record<string, unknown> te voldoen
interface EmailParams extends Record<string, unknown> {
  // Basisgegevens
  from_name: string;
  from_email: string;
  to_name: string;
  to_email: string;
  subject: string;
  message: string;
  
  // Aanvullende informatie
  phone?: string;
  location?: string;
  service?: string;
  preferred_date?: string;
  
  // Tekening link voor Uploadcare
  tekening_link?: string;
  tekening_beschikbaar?: string;
  
  // Bijlagen gerelateerd
  has_attachment?: boolean; // Boolean voor betere compatibiliteit
  tekening_naam?: string;
  
  // Kritiek voor email clients
  reply_to?: string;
  
  // Template selectie
  templateId?: string;
  
  // Bijlage object voor EmailJS
  _attachments?: Array<{
    name: string;
    data: string;
  }>;
}

/**
 * Functie voor het verzenden van e-mails via EmailJS
 * 
 * @param templateParams Parameters die nodig zijn voor het template
 * @returns Object met succes status en resultaat of fout
 */
export const sendEmail = async (templateParams: Record<string, any>) => {
  try {
    // Log all parameters for debugging
    console.log('EmailJS verzendpoging met parameters:', {
      ...templateParams,
      tekening: templateParams.tekening ? "Bestand aanwezig" : "Geen bestand",
      tekening_naam: templateParams.tekening_naam || "Geen bestand",
      tekening_link: templateParams.tekening_link || "Geen tekening link"
    });
    
    // KRITIEKE VALIDATIE voor Outlook compatibiliteit:
    // --------------------------------------------
    // 1. from_email en reply_to moeten altijd geldige e-mailadressen zijn
    // 2. We gebruiken een gevalideerd e-mailadres of een betrouwbaar fallback
    
    // Gebruik de specifieke template ID als die is meegegeven, anders gebruik de standaard
    const templateId = templateParams.templateId || emailConfig.templateId;
    
    // Standaard e-mailparameters met gegarandeerd geldige waarden
    const params: EmailParams = {
      // Afzender informatie (begin met betrouwbare standaardwaarden)
      from_name: templateParams.from_name || "Niet opgegeven",
      from_email: emailConfig.contactEmail, 
      
      // Ontvanger informatie (altijd vast)
      to_name: "Refurbish Totaal Nederland",
      to_email: emailConfig.contactEmail,
      
      // E-mail inhoud
      subject: templateParams.subject || "Contact via website",
      message: templateParams.message || "",
      
      // Extra velden - alles kopieren uit templateParams
      // Dit zorgt ervoor dat alle form velden worden meegestuurd naar EmailJS
      ...templateParams,
      
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
    
    // Add file as a proper attachment if provided
    if (templateParams.tekening) {
      params._attachments = [{
        name: templateParams.tekening_naam || "Upload",
        data: templateParams.tekening
      }];
      params.has_attachment = true;
    }
    
    // Use tekening_link if provided
    if (templateParams.tekening_link) {
      params.tekening_link = templateParams.tekening_link;
      params.has_attachment = true;
    }
    
    console.log('EmailJS verzenden met definitieve parameters:', {
      serviceId: emailConfig.serviceId,
      templateId: templateId,
      params: {
        ...params,
        _attachments: params._attachments ? "Bestand bijgevoegd als echte bijlage" : "Geen bijlage",
        has_attachment: params.has_attachment, 
        tekening_link: params.tekening_link 
      }
    });
    
    // Direct emailjs gebruiken met expliciete options parameter
    const result = await emailjs.send(
      emailConfig.serviceId,
      templateId, // Gebruik de mogelijk aangepaste template ID
      params as Record<string, unknown>,
      {
        publicKey: emailConfig.publicKey,
      }
    );
    
    console.log('EmailJS success:', result);
    return { success: true, result };
  } catch (error: any) {
    console.error('EmailJS error:', error);
    // Log more details about the error
    if (error.text) console.error('EmailJS error message:', error.text);
    return { success: false, error };
  }
};

/**
 * Helper function to check if an email address is valid
 */
function isValidEmail(email: any): boolean {
  if (!email || typeof email !== 'string') return false;
  // Basic email validation with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
