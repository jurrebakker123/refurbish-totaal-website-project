
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

// Deze functie helpt bij het debuggen van EmailJS verzendproblemen
export const sendEmail = async (templateParams: Record<string, any>) => {
  console.log('EmailJS verzendpoging met parameters:', templateParams);
  
  try {
    // Direct emailjs gebruiken in plaats van het dynamisch te importeren
    const result = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams,
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
