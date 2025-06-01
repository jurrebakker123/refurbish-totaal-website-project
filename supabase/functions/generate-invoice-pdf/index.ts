
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
  projectId: string;
  projectType: 'dakkapel' | 'zonnepaneel';
}

const generateInvoiceHTML = (data: InvoiceData): string => {
  const today = new Date().toLocaleDateString('nl-NL');
  const formattedDueDate = data.dueDate ? new Date(data.dueDate).toLocaleDateString('nl-NL') : 'Op aanvraag';
  
  return `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Factuur ${data.invoiceNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        
        .invoice-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
          animation: float 20s infinite linear;
        }
        
        @keyframes float {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-50px) translateY(-50px); }
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        
        .company-info h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .company-info p {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 8px;
        }
        
        .invoice-badge {
          background: rgba(255,255,255,0.2);
          padding: 20px 30px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          text-align: center;
          border: 1px solid rgba(255,255,255,0.3);
        }
        
        .invoice-badge h2 {
          font-size: 24px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .invoice-number {
          font-size: 20px;
          font-weight: 700;
          color: #fbbf24;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        .main-content {
          padding: 40px;
        }
        
        .customer-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 40px;
          border-left: 5px solid #2563eb;
        }
        
        .customer-section h3 {
          color: #2563eb;
          font-size: 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }
        
        .customer-section h3::before {
          content: '👤';
          margin-right: 10px;
          font-size: 24px;
        }
        
        .customer-details {
          display: grid;
          gap: 12px;
        }
        
        .customer-details p {
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .customer-details strong {
          min-width: 120px;
          color: #374151;
        }
        
        .project-info {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          border-left: 5px solid #10b981;
        }
        
        .project-info h4 {
          color: #10b981;
          font-size: 18px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }
        
        .project-info h4::before {
          content: '🏗️';
          margin-right: 10px;
        }
        
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .invoice-table th {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          padding: 20px;
          text-align: left;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .invoice-table td {
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 16px;
        }
        
        .invoice-table tbody tr:hover {
          background-color: #f9fafb;
          transition: background-color 0.3s ease;
        }
        
        .amount {
          font-weight: 700;
          color: #059669;
          font-size: 18px;
        }
        
        .total-row {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          font-weight: 700;
          font-size: 18px;
        }
        
        .total-row td {
          border-bottom: none;
          padding: 25px 20px;
        }
        
        .payment-section {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
          border-left: 5px solid #ef4444;
        }
        
        .payment-section h4 {
          color: #ef4444;
          font-size: 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }
        
        .payment-section h4::before {
          content: '💳';
          margin-right: 10px;
        }
        
        .payment-details {
          display: grid;
          gap: 15px;
        }
        
        .payment-details p {
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .payment-details strong {
          min-width: 140px;
          color: #374151;
        }
        
        .footer {
          background: #f8fafc;
          padding: 30px 40px;
          border-top: 3px solid #e5e7eb;
          margin-top: 40px;
        }
        
        .footer-content {
          display: grid;
          gap: 25px;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.8;
        }
        
        .company-details {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        
        .thank-you {
          text-align: center;
          font-style: italic;
          color: #059669;
          font-size: 16px;
          font-weight: 600;
          padding: 20px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .dates-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 15px 0;
        }
        
        .date-item {
          background: rgba(255,255,255,0.1);
          padding: 10px 15px;
          border-radius: 6px;
          backdrop-filter: blur(5px);
        }
        
        .date-label {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 5px;
        }
        
        .date-value {
          font-size: 16px;
          font-weight: 600;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
          
          .invoice-container {
            box-shadow: none;
            border-radius: 0;
          }
          
          .header::before {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="header-content">
            <div class="company-info">
              <h1>🏠 Refurbish Totaal Nederland</h1>
              <p><strong>📍 Adres:</strong> Bedrijfsadres Nederland</p>
              <p><strong>📞 Telefoon:</strong> 085 4444 255</p>
              <p><strong>📧 Email:</strong> info@refurbishtotaalnederland.nl</p>
              <p><strong>🌐 Website:</strong> www.refurbishtotaalnederland.nl</p>
            </div>
            <div class="invoice-badge">
              <h2>FACTUUR</h2>
              <div class="invoice-number">${data.invoiceNumber}</div>
              <div class="dates-grid">
                <div class="date-item">
                  <div class="date-label">Factuurdatum</div>
                  <div class="date-value">${today}</div>
                </div>
                <div class="date-item">
                  <div class="date-label">Vervaldatum</div>
                  <div class="date-value">${formattedDueDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="main-content">
          <div class="customer-section">
            <h3>${data.type === 'customer' ? 'Factuuradres Klant' : 'Factuuradres Vakspecialist'}</h3>
            <div class="customer-details">
              <p><strong>Naam:</strong> ${data.customerName}</p>
              <p><strong>Adres:</strong> ${data.customerAddress}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
            </div>
          </div>
          
          ${data.projectDetails ? `
          <div class="project-info">
            <h4>Project Details</h4>
            <p>${data.projectDetails}</p>
          </div>
          ` : ''}
          
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Beschrijving</th>
                <th style="width: 100px; text-align: center;">Aantal</th>
                <th style="width: 150px; text-align: right;">Prijs per stuk</th>
                <th style="width: 150px; text-align: right;">Totaal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.description}</td>
                <td style="text-align: center;">1</td>
                <td class="amount" style="text-align: right;">€${data.amount.toFixed(2)}</td>
                <td class="amount" style="text-align: right;">€${data.amount.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3"><strong>🧾 Totaal (incl. 21% BTW)</strong></td>
                <td class="amount" style="text-align: right;"><strong>€${data.amount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div class="payment-section">
            <h4>Betalingsinstructies</h4>
            <div class="payment-details">
              <p><strong>Rekeningnummer:</strong> NL00 BANK 0000 0000 00</p>
              <p><strong>Ten name van:</strong> Refurbish Totaal Nederland</p>
              <p><strong>Betalingstermijn:</strong> ${formattedDueDate === 'Op aanvraag' ? '30 dagen' : formattedDueDate}</p>
              <p><strong>Referentie:</strong> ${data.invoiceNumber}</p>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-content">
            <div class="company-details">
              <p><strong>📋 Bedrijfsgegevens:</strong></p>
              <p>BTW-nummer: NL000000000B00 | KvK-nummer: 00000000</p>
              <p>Refurbish Totaal Nederland - Uw betrouwbare partner voor duurzame renovaties</p>
            </div>
            
            <div class="thank-you">
              🙏 Hartelijk dank voor uw vertrouwen in Refurbish Totaal Nederland!<br>
              Voor vragen over deze factuur kunt u contact opnemen via 085 4444 255
            </div>
          </div>
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

    const { invoiceData, type, projectId, projectType } = await req.json();
    
    console.log('Generating and sending PDF invoice for:', invoiceData);

    // Generate unique invoice number with prefix
    const prefix = type === 'specialist' ? 'SPEC' : 'KLANT';
    const invoiceNumber = `${prefix}-${Date.now()}`;
    
    // Create HTML content
    const htmlContent = generateInvoiceHTML({
      ...invoiceData,
      invoiceNumber,
      type,
      projectId,
      projectType
    });

    const emailSubject = type === 'specialist' 
      ? `🔧 Factuur ${invoiceNumber} - Vakspecialist werkzaamheden`
      : `🏠 Factuur ${invoiceNumber} - Refurbish Totaal Nederland`;

    const emailHtml = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">🏠 Refurbish Totaal Nederland</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Uw factuur is klaar!</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-top: 0; font-size: 22px;">👋 Beste ${invoiceData.customerName},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              ${type === 'specialist' 
                ? 'Hierbij ontvangt u de factuur voor de uitgevoerde vakspecialist werkzaamheden. Wij waarderen uw professionele samenwerking!'
                : 'Hierbij ontvangt u uw factuur voor de uitgevoerde werkzaamheden. Het was een plezier om voor u te mogen werken!'
              }
            </p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #f59e0b;">
            <h3 style="margin-top: 0; color: #92400e; font-size: 18px;">📋 Factuurgegevens</h3>
            <div style="display: grid; gap: 12px;">
              <p style="margin: 0; font-size: 16px;"><strong>Factuurnummer:</strong> ${invoiceNumber}</p>
              <p style="margin: 0; font-size: 16px;"><strong>💰 Bedrag:</strong> <span style="color: #059669; font-weight: 700; font-size: 18px;">€${invoiceData.amount.toFixed(2)}</span></p>
              <p style="margin: 0; font-size: 16px;"><strong>📅 Vervaldatum:</strong> ${invoiceData.dueDate || 'Op aanvraag'}</p>
            </div>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #ef4444;">
            <h3 style="margin-top: 0; color: #dc2626; font-size: 18px;">💳 Betaalinformatie</h3>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px; color: #374151;">
              U kunt het factuurbedrag overmaken naar:
            </p>
            <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace;">
              <p style="margin: 5px 0;"><strong>IBAN:</strong> NL00 BANK 0000 0000 00</p>
              <p style="margin: 5px 0;"><strong>Ten name van:</strong> Refurbish Totaal Nederland</p>
              <p style="margin: 5px 0;"><strong>Referentie:</strong> ${invoiceNumber}</p>
            </div>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            📎 De gedetailleerde factuur vindt u in de bijlage van deze email.
          </p>
          
          <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 20px; border-radius: 10px; margin: 25px 0; text-align: center;">
            <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px;">
              💬 Vragen over deze factuur?
            </p>
            <p style="margin: 10px 0 0 0; color: #374151;">
              📞 085 4444 255 | 📧 info@refurbishtotaalnederland.nl
            </p>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 25px; text-align: center;">
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            🏠 <strong>Refurbish Totaal Nederland</strong> - Uw partner voor duurzame renovaties<br>
            📞 085 4444 255 | 📧 info@refurbishtotaalnederland.nl | 🌐 www.refurbishtotaalnederland.nl
          </p>
        </div>
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

    // Save invoice to database
    const { error: dbError } = await supabase
      .from('facturen')
      .insert({
        factuur_nummer: invoiceNumber,
        klant_naam: invoiceData.customerName,
        klant_email: invoiceData.customerEmail,
        klant_adres: invoiceData.customerAddress,
        bedrag: invoiceData.amount,
        beschrijving: invoiceData.description,
        vervaldatum: invoiceData.dueDate || null,
        status: 'verstuurd',
        type: type,
        project_id: projectId,
        project_type: projectType,
        email_verzonden_op: new Date().toISOString()
      });

    if (dbError) {
      console.error('Database error saving invoice:', dbError);
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
