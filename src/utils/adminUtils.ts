import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DakkapelConfiguratie, QuoteItem, RefurbishedZonnepaneel, ZonnepaneelQuoteItem, GenericQuoteItem } from '@/types/admin';

export const loadUnifiedAdminData = async (): Promise<{ 
  configuraties: DakkapelConfiguratie[],
  schilderAanvragen: any[],
  stukadoorAanvragen: any[],
  success: boolean 
}> => {
  console.log('Starting to load unified admin dashboard data...');
  const result = {
    configuraties: [] as DakkapelConfiguratie[],
    schilderAanvragen: [] as any[],
    stukadoorAanvragen: [] as any[],
    success: false
  };
  
  try {
    // Load dakkapel data
    console.log('Loading dakkapel calculator aanvragen data...');
    const { data: configData, error: configError } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('*')
      .order('created_at', { ascending: false });

    if (configError) {
      console.error('Config error:', configError);
      toast.error("Fout bij laden dakkapel aanvragen: " + configError.message);
    } else {
      result.configuraties = (configData || []).map(item => ({
        id: item.id,
        created_at: item.created_at,
        naam: `${item.voornaam} ${item.achternaam}`.trim(),
        email: item.emailadres,
        telefoon: item.telefoon,
        adres: `${item.straatnaam} ${item.huisnummer}`,
        postcode: item.postcode,
        plaats: item.plaats,
        opmerkingen: item.bericht || '',
        model: item.type,
        breedte: item.breedte,
        materiaal: item.materiaal,
        kleur_kozijn: item.kleurkozijnen,
        kleur_zijkanten: item.kleurzijkanten,
        kleur_draaikiepramen: item.kleurdraaikiepramen,
        dakhelling: item.dakhelling,
        dakhelling_type: item.dakhellingtype,
        levertijd: 'Standaard',
        ventilationgrids: false,
        sunshade: false,
        insectscreens: false,
        airconditioning: false,
        status: item.status,
        offerte_verzonden_op: item.offerte_verzonden_op,
        op_locatie_op: null,
        in_aanbouw_op: null,
        afgehandeld_op: item.afgehandeld_op,
        notities: item.notities,
        totaal_prijs: item.totaal_prijs
      }));
      console.log(`Loaded ${configData?.length || 0} dakkapel aanvragen`);
    }

    // Load schilder data
    console.log('Loading schilder aanvragen data...');
    const { data: schilderData, error: schilderError } = await supabase
      .from('schilder_aanvragen')
      .select('*')
      .order('created_at', { ascending: false });

    if (schilderError) {
      console.error('Schilder error:', schilderError);
      toast.error("Fout bij laden schilder aanvragen: " + schilderError.message);
    } else {
      result.schilderAanvragen = schilderData || [];
      console.log(`Loaded ${schilderData?.length || 0} schilder aanvragen`);
    }

    // Load stukadoor data
    console.log('Loading stukadoor aanvragen data...');
    const { data: stukadoorData, error: stukadoorError } = await supabase
      .from('stukadoor_aanvragen')
      .select('*')
      .order('created_at', { ascending: false });

    if (stukadoorError) {
      console.error('Stukadoor error:', stukadoorError);
      toast.error("Fout bij laden stukadoor aanvragen: " + stukadoorError.message);
    } else {
      result.stukadoorAanvragen = stukadoorData || [];
      console.log(`Loaded ${stukadoorData?.length || 0} stukadoor aanvragen`);
    }

    result.success = true;
    toast.success(`Dashboard geladen! ${configData?.length || 0} dakkapel, ${schilderData?.length || 0} schilder en ${stukadoorData?.length || 0} stukadoor aanvragen gevonden`);
  } catch (error) {
    console.error('Error loading unified data:', error);
    toast.error("Onverwachte fout bij het laden van gegevens");
  }
  
  return result;
};

export const updateRequestStatus = async (
  id: string, 
  status: string,
  table: 'dakkapel_calculator_aanvragen' | 'refurbished_zonnepanelen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen'
): Promise<boolean> => {
  console.log(`Updating status for ${table} ${id} to ${status}`);
  
  const updateData: any = { 
    status,
    updated_at: new Date().toISOString()
  };
  
  if (status === 'offerte_verzonden') {
    updateData.offerte_verzonden_op = new Date().toISOString();
  }
  if (status === 'op_locatie') {
    updateData.op_locatie_op = new Date().toISOString();
  }
  if (status === 'in_aanbouw') {
    updateData.in_aanbouw_op = new Date().toISOString();
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
  item: DakkapelConfiguratie | RefurbishedZonnepaneel | GenericQuoteItem | any,
  notes: string,
  price: string,
  table: 'dakkapel_calculator_aanvragen' | 'refurbished_zonnepanelen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen'
): Promise<boolean> => {
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
  item: QuoteItem | ZonnepaneelQuoteItem | GenericQuoteItem | any, 
  customMessage?: string
): Promise<boolean> => {
  try {
    console.log('Sending quote email for:', item.id);
    
    // Check if item exists
    if (!item || !item.id) {
      toast.error("Kan offerte niet verzenden: ongeldige gegevens");
      return false;
    }
    
    const isZonnepaneel = 'isZonnepaneel' in item;
    
    const body = {
      requestId: item.id,
      type: isZonnepaneel ? 'zonnepaneel' : 'dakkapel',
      customMessage: customMessage
    };
    
    console.log("Sending request with body:", body);
    
    const { data, error } = await supabase.functions.invoke('send-quote', {
      body: body
    });

    console.log('Quote function response:', data, 'Error:', error);

    if (error) {
      console.error('Error calling function:', error);
      toast.error(`Fout bij het verzenden van offerte: ${error.message || 'API Error'}`);
      return false;
    }

    if (!data || !data.success) {
      console.error('Function returned error:', data);
      
      let errorMessage = 'Onbekende fout';
      if (data?.error === "Email service not configured. Please add the RESEND_API_KEY in Supabase secrets.") {
        errorMessage = "De RESEND_API_KEY is niet geconfigureerd in Supabase";
      } else if (data?.error) {
        errorMessage = data.error;
      }
      
      toast.error(`Fout bij het verzenden van offerte: ${errorMessage}`);
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

export const deleteQuote = async (
  id: string, 
  table: 'dakkapel_calculator_aanvragen' | 'refurbished_zonnepanelen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen'
): Promise<boolean> => {
  console.log(`Deleting from ${table} with id ${id}`);
  
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete error:', error);
    toast.error("Fout bij het verwijderen: " + error.message);
    return false;
  }

  toast.success("Item succesvol verwijderd");
  return true;
};
