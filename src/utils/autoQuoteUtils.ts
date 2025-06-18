
import { supabase } from '@/integrations/supabase/client';

export interface AutoQuoteRequest {
  requestId: string;
  type: 'dakkapel' | 'zonnepaneel';
}

export const sendAutomaticQuote = async (requestId: string, type: 'dakkapel' | 'zonnepaneel'): Promise<boolean> => {
  try {
    console.log('Sending automatic quote for:', { requestId, type });
    
    const response = await fetch('/functions/v1/auto-send-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId,
        type
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Automatic quote sent successfully:', result);
      return true;
    } else {
      console.error('Automatic quote failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Error sending automatic quote:', error);
    return false;
  }
};

export const triggerAutoQuoteForNewRequests = async () => {
  try {
    // Check for new dakkapel requests without quotes sent
    const { data: dakkapelRequests, error: dakkapelError } = await supabase
      .from('dakkapel_calculator_aanvragen')
      .select('id, status, created_at')
      .eq('status', 'nieuw')
      .is('offerte_verzonden_op', null)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()); // Last 24 hours

    if (!dakkapelError && dakkapelRequests && dakkapelRequests.length > 0) {
      console.log(`Found ${dakkapelRequests.length} new dakkapel requests for auto-quote`);
      
      for (const request of dakkapelRequests) {
        await sendAutomaticQuote(request.id, 'dakkapel');
        // Small delay between requests to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Check for new zonnepaneel requests without quotes sent
    const { data: zonnepaneelRequests, error: zonnepaneelError } = await supabase
      .from('refurbished_zonnepanelen')
      .select('id, status, created_at')
      .eq('status', 'nieuw')
      .is('offerte_verzonden_op', null)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()); // Last 24 hours

    if (!zonnepaneelError && zonnepaneelRequests && zonnepaneelRequests.length > 0) {
      console.log(`Found ${zonnepaneelRequests.length} new zonnepaneel requests for auto-quote`);
      
      for (const request of zonnepaneelRequests) {
        await sendAutomaticQuote(request.id, 'zonnepaneel');
        // Small delay between requests to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return true;
  } catch (error) {
    console.error('Error triggering auto-quotes:', error);
    return false;
  }
};
