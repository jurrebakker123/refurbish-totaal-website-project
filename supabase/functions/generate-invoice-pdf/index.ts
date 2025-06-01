
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
}

const generateInvoiceHTML = (data: InvoiceData): string => {
  const today = new Date().toLocaleDateString('nl-NL');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .company-info { text-align: left; }
        .invoice-info { text-align: right; }
        .customer-info { margin: 20px 0; }
        .invoice-details { margin: 40px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f5f5f5; }
        .total-row { font-weight: bold; background-color: #f9f9f9; }
        .footer { margin-top: 40px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <h2>Refurbish Totaal Nederland</h2>
          <p>Adres: Bedrijfsadres<br>
          Telefoon: 085 4444 255<br>
          Email: info@refurbishtotaalnederland.nl</p>
        </div>
        <div class="invoice-info">
          <h2>FACTUUR</h2>
          <p><strong>Factuurnummer:</strong> ${data.invoiceNumber}<br>
          <strong>Datum:</strong> ${today}<br>
          <strong>Vervaldatum:</strong> ${data.dueDate}</p>
        </div>
      </div>
      
      <div class="customer-info">
        <h3>Factuuradres:</h3>
        <p><strong>${data.customerName}</strong><br>
        ${data.customerAddress}<br>
        ${data.customerEmail}</p>
      </div>
      
      <div class="invoice-details">
        <table>
          <thead>
            <tr>
              <th>Beschrijving</th>
              <th>Aantal</th>
              <th>Prijs</th>
              <th>Totaal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.description}</td>
              <td>1</td>
              <td>€${data.amount.toFixed(2)}</td>
              <td>€${data.amount.toFixed(2)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="3"><strong>Totaal (incl. BTW)</strong></td>
              <td><strong>€${data.amount.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="footer">
        <p>Gelieve het factuurbedrag binnen ${data.dueDate} te voldoen op rekeningnummer: NL00 BANK 0000 0000 00</p>
        <p>BTW-nummer: NL000000000B00 | KvK-nummer: 00000000</p>
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
    
    console.log('Generating PDF for invoice:', invoiceData);

    // Generate unique invoice number
    const invoiceNumber = `INV-${Date.now()}`;
    
    // Create HTML content
    const htmlContent = generateInvoiceHTML({
      ...invoiceData,
      invoiceNumber
    });

    // For now, we'll return the HTML. In a production environment, you'd want to:
    // 1. Use a PDF generation service like Puppeteer or similar
    // 2. Store the PDF in Supabase Storage
    // 3. Send the PDF via email using Resend
    
    console.log('PDF generation completed');

    return new Response(JSON.stringify({ 
      success: true, 
      invoiceNumber,
      htmlContent,
      message: 'Factuur succesvol gegenereerd'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error generating invoice PDF:', error);
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
