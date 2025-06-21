
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface WhatsAppQuoteButtonProps {
  requestId: string;
  type: 'dakkapel' | 'zonnepaneel';
  customerPhone: string;
  customerName: string;
  onSuccess?: () => void;
  disabled?: boolean;
}

const WhatsAppQuoteButton: React.FC<WhatsAppQuoteButtonProps> = ({
  requestId,
  type,
  customerPhone,
  customerName,
  onSuccess,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendWhatsAppQuote = async () => {
    if (!customerPhone) {
      toast.error('Geen telefoonnummer beschikbaar voor WhatsApp');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Sending WhatsApp quote for:', { requestId, type, customerPhone });
      
      const { data, error } = await supabase.functions.invoke('send-quote-whatsapp', {
        body: {
          requestId,
          type
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error('Er ging iets mis bij het verzenden van de WhatsApp offerte');
        return;
      }

      if (data?.success) {
        toast.success(`WhatsApp offerte verzonden naar ${customerName}!`);
        onSuccess?.();
      } else {
        toast.error(data?.error || 'Onbekende fout bij verzenden WhatsApp offerte');
      }
    } catch (error: any) {
      console.error('WhatsApp quote error:', error);
      toast.error('Er ging iets mis bij het verzenden van de WhatsApp offerte');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSendWhatsAppQuote}
      disabled={disabled || isLoading || !customerPhone}
      size="sm"
      className="bg-green-500 hover:bg-green-600"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Verzenden...
        </>
      ) : (
        <>
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </>
      )}
    </Button>
  );
};

export default WhatsAppQuoteButton;
