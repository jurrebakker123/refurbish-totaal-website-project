
import { supabase } from '@/integrations/supabase/client';

export interface WebhookEventData {
  event: string;
  requestId: string;
  customerData?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  configurationData?: any;
  timestamp: string;
  immediate?: boolean;
}

export const dispatchWebhookEvent = async (eventData: WebhookEventData) => {
  console.log('🚀 Dispatching webhook event:', eventData.event);
  
  try {
    const response = await supabase.functions.invoke('dakkapel-webhook-handler', {
      body: eventData
    });

    if (response.error) {
      console.error('❌ Webhook dispatch error:', response.error);
      throw response.error;
    }

    console.log('✅ Webhook dispatched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to dispatch webhook:', error);
    throw error;
  }
};

// Event types
export const WEBHOOK_EVENTS = {
  CONFIGURATOR_COMPLETE: 'ConfiguratorComplete',
  QUOTE_REQUESTED: 'QuoteRequested',
  FORM_SUBMITTED: 'FormSubmitted'
} as const;
