
import emailjs from '@emailjs/browser';

export interface EmailData {
  from_name: string;
  from_email: string;
  to_name: string;
  to_email: string;
  subject: string;
  message: string;
  phone?: string;
  location?: string;
  preferred_date?: string;
  terms_accepted?: string;
  templateId?: string;
  [key: string]: any;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('📧 Preparing to send email with data:', data);
    
    const templateId = data.templateId || 'template_ezfzaao';
    const serviceId = 'service_4zk5z58';
    const publicKey = 'BaGJz5Pd3vN_qdfHd';

    console.log('📧 Using template:', templateId);
    console.log('📧 Using service:', serviceId);

    // Initialize EmailJS with public key
    if (!emailjs) {
      throw new Error('EmailJS not loaded');
    }

    // Prepare email data with all required fields
    const emailPayload = {
      from_name: data.from_name,
      from_email: data.from_email,
      to_name: data.to_name || 'Refurbish Totaal Nederland',
      to_email: data.to_email || 'info@refurbishtotaalnederland.nl',
      subject: data.subject,
      message: data.message,
      phone: data.phone || 'Niet opgegeven',
      location: data.location || 'Niet opgegeven',
      preferred_date: data.preferred_date || 'Niet opgegeven',
      terms_accepted: data.terms_accepted || 'Ja',
      service: data.service || 'Algemene aanvraag',
      ...data
    };

    // Send the email
    const response = await emailjs.send(
      serviceId,
      templateId,
      emailPayload,
      publicKey
    );

    console.log('✅ Email sent successfully:', response);
    return { success: true };

  } catch (error: any) {
    console.error('❌ Email sending failed:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error occurred' 
    };
  }
};
