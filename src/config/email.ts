
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
  service?: string;
  [key: string]: any;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('📧 Preparing to send email with Resend API:', data);
    
    const emailPayload = {
      from: `${data.from_name} <noreply@refurbishtotaalnederland.nl>`,
      to: [data.to_email],
      subject: data.subject,
      html: data.message,
      reply_to: data.from_email
    };

    // Use Resend API directly via fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || 're_123456789'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Email sent successfully via Resend:', result);
    return { success: true };

  } catch (error: any) {
    console.error('❌ Email sending failed:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error occurred' 
    };
  }
};
