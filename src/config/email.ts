
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
  serviceId: 'service_noxuhr5', // Uw Service ID van EmailJS
  templateId: 'template_ezfzaao', // Uw Template ID van EmailJS
  publicKey: 'tqJDJUY1QjRWXLIiF', // Uw Public Key van EmailJS
  contactEmail: 'info@refurbishtotaalnederland.nl',
};

// Deze functie helpt bij het debuggen van EmailJS verzendproblemen
export const sendEmail = async (templateParams: Record<string, any>) => {
  console.log('EmailJS verzendpoging met parameters:', templateParams);
  
  try {
    const emailjs = await import('@emailjs/browser');
    const result = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams,
      emailConfig.publicKey
    );
    
    console.log('EmailJS succes:', result);
    return { success: true, result };
  } catch (error) {
    console.error('EmailJS fout:', error);
    return { success: false, error };
  }
};
