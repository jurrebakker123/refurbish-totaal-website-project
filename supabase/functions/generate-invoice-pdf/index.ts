
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceData {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  description: string;
  amount: number;
  dueDate: string;
  companyName?: string;
  projectDetails?: string;
  type: 'customer' | 'specialist';
}

const generateInvoiceHTML = (data: InvoiceData): string => {
  const today = new Date().toLocaleDateString('nl-NL');
  const formattedDueDate = data.dueDate ? new Date(data.dueDate).toLocaleDateString('nl-NL') : 'Op aanvraag';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 20px; 
          background: white;
          color: #333;
        }
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
        }
        .header { 
          display: flex; 
          justify-content: space-between; 
          margin-bottom: 40px;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
        }
        .company-info { 
          text-align: left; 
        }
        .company-info h2 {
          color: #2563eb;
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        .invoice-info { 
          text-align: right; 
        }
        .invoice-info h2 {
          color: #2563eb;
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        .customer-info { 
          margin: 30px 0;
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
        }
        .customer-info h3 {
          margin-top: 0;
          color: #2563eb;
        }
        .invoice-details { 
          margin: 40px 0; 
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td { 
          border: 1px solid #e2e8f0; 
          padding: 16px; 
          text-align: left; 
        }
        th { 
          background-color: #2563eb; 
          color: white;
          font-weight: bold;
        }
        .total-row { 
          font-weight: bold; 
          background-color: #f1f5f9;
          font-size: 16px;
        }
        .footer { 
          margin-top: 50px; 
          font-size: 12px; 
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
        }
        .amount {
          font-size: 18px;
          font-weight: bold;
          color: #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="company-info">
            <h2>Refurbish Totaal Nederland</h2>
            <p><strong>Adres:</strong> Bedrijfsadres<br>
            <strong>Telefoon:</strong> 085 4444 255<br>
            <strong>Email:</strong> info@refurbishtotaalnederland.nl<br>
            <strong>Website:</strong> www.refurbishtotaalnederland.nl</p>
          </div>
          <div class="invoice-info">
            <h2>FACTUUR</h2>
            <p><strong>Factuurnummer:</strong> ${data.invoiceNumber}<br>
            <strong>Factuurdatum:</strong> ${today}<br>
            <strong>Vervaldatum:</strong> ${formattedDueDate}</p>
          </div>
        </div>
        
        <div class="customer-info">
          <h3>${data.type === 'customer' ? 'Factuuradres Klant' : 'Factuuradres Vakspecialist'}:</h3>
          <p><strong>${data.customerName}</strong><br>
          ${data.customerAddress}<br>
          <strong>Email:</strong> ${data.customerEmail}</p>
        </div>
        
        <div class="invoice-details">
          ${data.projectDetails ? `<p><strong>Project:</strong> ${data.projectDetails}</p>` : ''}
          
          <table>
            <thead>
              <tr>
                <th>Beschrijving</th>
                <th>Aantal</th>
                <th>Prijs per stuk</th>
                <th>Totaal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.description}</td>
                <td>1</td>
                <td class="amount">€${data.amount.toFixed(2)}</td>
                <td class="amount">€${data.amount.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3"><strong>Totaal (incl. 21% BTW)</strong></td>
                <td class="amount"><strong>€${data.amount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="footer">
          <p><strong>Betalingsinstructies:</strong><br>
          Gelieve het factuurbedrag binnen de vervaldatum te voldoen via bankoverschrijving.<br>
          <strong>Rekeningnummer:</strong> NL00 BANK 0000 0000 00<br>
          <strong>Ten name van:</strong> Refurbish Totaal Nederland</p>
          
          <p><strong>Bedrijfsgegevens:</strong><br>
          BTW-nummer: NL000000000B00 | KvK-nummer: 00000000<br>
          Refurbish Totaal Nederland - Uw partner voor duurzame renovaties</p>
          
          <p style="margin-top: 20px; font-style: italic;">
          Bedankt voor uw vertrouwen in Refurbish Totaal Nederland!
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { invoiceData, type } = await req.json();
    
    console.log('Generating and sending PDF invoice for:', invoiceData);

    // Generate unique invoice number with prefix
    const prefix = type === 'specialist' ? 'SPEC' : 'KLANT';
    const invoiceNumber = `${prefix}-${Date.now()}`;
    
    // Create HTML content
    const htmlContent = generateInvoiceHTML({
      ...invoiceData,
      invoiceNumber,
      type
    });

    // Convert HTML to PDF using a simple HTML to PDF conversion
    // For now we'll send the HTML as attachment, but in production you'd use a proper PDF library
    
    const emailSubject = type === 'specialist' 
      ? `Factuur ${invoiceNumber} - Vakspecialist werkzaamheden`
      : `Factuur ${invoiceNumber} - Refurbish Totaal Nederland`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Factuur ${invoiceNumber}</h2>
        
        <p>Beste ${invoiceData.customerName},</p>
        
        <p>${type === 'specialist' 
          ? 'Hierbij ontvangt u de factuur voor de uitgevoerde vakspecialist werkzaamheden.'
          : 'Hierbij ontvangt u uw factuur voor de uitgevoerde werkzaamheden door Refurbish Totaal Nederland.'
        }</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2563eb;">Factuurgegevens:</h3>
          <p><strong>Factuurnummer:</strong> ${invoiceNumber}<br>
          <strong>Bedrag:</strong> €${invoiceData.amount.toFixed(2)}<br>
          <strong>Vervaldatum:</strong> ${invoiceData.dueDate || 'Op aanvraag'}</p>
        </div>
        
        <p>De gedetailleerde factuur vindt u in de bijlage van deze email.</p>
        
        <p><strong>Betaling:</strong><br>
        U kunt het factuurbedrag overmaken naar rekeningnummer NL00 BANK 0000 0000 00 
        ten name van Refurbish Totaal Nederland, onder vermelding van factuurnummer ${invoiceNumber}.</p>
        
        <p>Voor vragen over deze factuur kunt u contact opnemen via:<br>
        📞 085 4444 255<br>
        📧 info@refurbishtotaalnederland.nl</p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          Met vriendelijke groet,<br>
          <strong>Refurbish Totaal Nederland</strong><br>
          Telefoon: 085 4444 255 | Email: info@refurbishtotaalnederland.nl
        </p>
      </div>
    `;

    // Send email with HTML attachment (simulating PDF)
    const emailResult = await resend.emails.send({
      from: "Refurbish Totaal Nederland <info@refurbishtotaalnederland.nl>",
      to: [invoiceData.customerEmail],
      subject: emailSubject,
      html: emailHtml,
      attachments: [
        {
          filename: `Factuur_${invoiceNumber}.html`,
          content: htmlContent,
        },
      ],
    });

    if (emailResult.error) {
      throw new Error(`Email sending failed: ${emailResult.error.message}`);
    }

    console.log('Invoice email sent successfully:', emailResult.data);

    return new Response(JSON.stringify({ 
      success: true, 
      invoiceNumber,
      emailId: emailResult.data?.id,
      message: `Factuur ${invoiceNumber} succesvol gegenereerd en verzonden naar ${invoiceData.customerEmail}`
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error generating and sending invoice:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
};

serve(handler);
