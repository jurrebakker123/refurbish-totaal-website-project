
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DakkapelConfiguratie, DakkapelCalculatorAanvraag, QuoteItem } from '@/types/admin';

export const loadAdminData = async (): Promise<{ 
  configuraties: DakkapelConfiguratie[],
  calculatorAanvragen: DakkapelCalculatorAanvraag[],
  success: boolean 
}> => {
  console.log('Starting to load admin dashboard data...');
  const result = {
    configuraties: [] as DakkapelConfiguratie[],
    calculatorAanvragen: [] as DakkapelCalculatorAanvraag[],
    success: false
  };
  
  try {
    // Load configurator data
    console.log('Loading configurator data...');
    const { data: configData, error: configError } = await supabase
      .from('dakkapel_configuraties')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Configurator data:', configData, 'Error:', configError);
    if (configError) {
      console.error('Config error:', configError);
      toast.error("Fout bij laden configuraties: " + configError.message);
    } else {
      result.configuraties = configData || [];
      console.log(`Loaded ${configData?.length || 0} configurations`);
    }

    // Load calculator data
    console.log('Loading calculator data...');
    const { data: calcData, error: calcError } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Calculator data:', calcData, 'Error:', calcError);
    if (calcError) {
      console.error('Calculator error:', calcError);
      toast.error("Fout bij laden calculator aanvragen: " + calcError.message);
    } else {
      result.calculatorAanvragen = calcData || [];
      console.log(`Loaded ${calcData?.length || 0} calculator requests`);
    }

    result.success = true;
    toast.success(`Dashboard geladen! ${(configData?.length || 0) + (calcData?.length || 0)} aanvragen gevonden`);
  } catch (error) {
    console.error('Error loading data:', error);
    toast.error("Onverwachte fout bij het laden van gegevens");
  }
  
  return result;
};

export const updateRequestStatus = async (
  table: 'dakkapel_configuraties' | 'dakkapel_calculator_aanvragen', 
  id: string, 
  status: string
): Promise<boolean> => {
  console.log(`Updating status for ${table} ${id} to ${status}`);
  
  const updateData: any = { 
    status,
    updated_at: new Date().toISOString()
  };
  
  if (status === 'offerte_verzonden') {
    updateData.offerte_verzonden_op = new Date().toISOString();
  }
  if (status === 'afgehandeld') {
    updateData.afgehandeld_op = new Date().toISOString();
  }

  const { error } = await supabase
    .from(table)
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Update error:', error);
    toast.error("Fout bij het bijwerken van status: " + error.message);
    return false;
  }

  toast.success("Status succesvol bijgewerkt");
  return true;
};

export const updateRequestDetails = async (
  item: DakkapelConfiguratie | DakkapelCalculatorAanvraag,
  notes: string,
  price: string
): Promise<boolean> => {
  const isCalculator = 'emailadres' in item;
  const table = isCalculator ? 'dakkapel_calculator_aanvragen' : 'dakkapel_configuraties';
  
  const updateData: any = {};
  
  if (notes.trim()) {
    updateData.notities = notes;
  }
  
  if (price.trim()) {
    const priceValue = parseFloat(price.replace(',', '.'));
    if (!isNaN(priceValue)) {
      updateData.totaal_prijs = priceValue;
    }
  }
  
  if (Object.keys(updateData).length === 0) {
    return true;
  }
  
  const { error } = await supabase
    .from(table)
    .update(updateData)
    .eq('id', item.id);
  
  if (error) {
    console.error('Update error:', error);
    toast.error("Fout bij het bijwerken van gegevens: " + error.message);
    return false;
  }
  
  toast.success("Gegevens succesvol bijgewerkt");
  return true;
};

export const sendQuoteEmail = async (
  item: QuoteItem, 
  isCalculator: boolean, 
  customMessage?: string
): Promise<boolean> => {
  try {
    console.log('Sending quote email for:', item.id);
    
    const { data, error } = await supabase.functions.invoke('send-quote', {
      body: {
        requestId: item.id,
        type: isCalculator ? 'calculator' : 'configurator',
        customMessage: customMessage
      }
    });

    if (error) {
      console.error('Error sending quote:', error);
      toast.error(`Fout bij het verzenden van offerte: ${error.message || 'API Error'}`);
      return false;
    }

    console.log('Quote sent successfully:', data);
    
    if (!data.success) {
      toast.error(`Fout bij het verzenden van offerte: ${data.error || 'Onbekende fout'}`);
      return false;
    }
    
    toast.success("Offerte succesvol verzonden naar de klant!");
    return true;
  } catch (error: any) {
    console.error('Error sending quote:', error);
    toast.error("Fout bij het verzenden van offerte: " + (error.message || 'Onbekende fout'));
    return false;
  }
};
