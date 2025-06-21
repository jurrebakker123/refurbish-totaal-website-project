
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CombinedQuoteButtonProps {
  requestId: string;
  type: 'dakkapel' | 'zonnepaneel';
  customerEmail?: string;
  customerPhone?: string;
  customerName: string;
  onSuccess?: () => void;
  disabled?: boolean;
}

const CombinedQuoteButton: React.FC<CombinedQuoteButtonProps> = ({
  requestId,
  type,
  customerEmail,
  customerPhone,
  customerName,
  onSuccess,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCombinedQuote = async () => {
    if (!customerEmail && !customerPhone) {
      toast.error('Geen email of telefoonnummer beschikbaar');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Sending combined quote for:', { requestId, type, customerEmail, customerPhone });
      
      const { data, error } = await supabase.functions.invoke('send-quote-combined', {
        body: {
          requestId,
          type,
          sendEmail: !!customerEmail,
          sendWhatsApp: !!customerPhone
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error('Er ging iets mis bij het verzenden van de offertes');
        return;
      }

      if (data?.success) {
        const methods = [];
        if (customerEmail) methods.push('email');
        if (customerPhone) methods.push('WhatsApp');
        
        toast.success(`Offertes succesvol verzonden via ${methods.join(' en ')} naar ${customerName}!`);
        onSuccess?.();
      } else {
        // Show partial success/failure details
        const { results } = data;
        let message = 'Resultaten: ';
        
        if (results?.email?.success) message += '✅ Email verzonden ';
        else if (results?.email?.error) message += '❌ Email mislukt ';
        
        if (results?.whatsapp?.success) message += '✅ WhatsApp verzonden';
        else if (results?.whatsapp?.error) message += '❌ WhatsApp mislukt';
        
        toast.warning(message);
      }
    } catch (error: any) {
      console.error('Combined quote error:', error);
      toast.error('Er ging iets mis bij het verzenden van de offertes');
    } finally {
      setIsLoading(false);
    }
  };

  const availableMethods = [];
  if (customerEmail) availableMethods.push('Email');
  if (customerPhone) availableMethods.push('WhatsApp');

  return (
    <Button
      onClick={handleSendCombinedQuote}
      disabled={disabled || isLoading || availableMethods.length === 0}
      size="sm"
      className="bg-blue-600 hover:bg-blue-700"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Verzenden...
        </>
      ) : (
        <>
          <Send className="h-4 w-4 mr-2" />
          {availableMethods.join(' + ')}
        </>
      )}
    </Button>
  );
};

export default CombinedQuoteButton;
