
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AutoQuoteButtonProps {
  requestId: string;
  type: 'dakkapel' | 'zonnepaneel';
  customerEmail: string;
  onSuccess?: () => void;
  disabled?: boolean;
}

const AutoQuoteButton: React.FC<AutoQuoteButtonProps> = ({
  requestId,
  type,
  customerEmail,
  onSuccess,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendAutoQuote = async () => {
    setIsLoading(true);
    
    try {
      console.log('Sending automatic quote for:', { requestId, type, customerEmail });
      
      const { data, error } = await supabase.functions.invoke('auto-send-quote', {
        body: {
          requestId,
          type
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error('Er ging iets mis bij het verzenden van de offerte');
        return;
      }

      if (data?.success) {
        toast.success(`Automatische offerte verzonden naar ${customerEmail}!`);
        onSuccess?.();
      } else {
        toast.error(data?.error || 'Onbekende fout bij verzenden offerte');
      }
    } catch (error: any) {
      console.error('Auto quote error:', error);
      toast.error('Er ging iets mis bij het verzenden van de offerte');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSendAutoQuote}
      disabled={disabled || isLoading}
      size="sm"
      className="bg-green-600 hover:bg-green-700"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Verzenden...
        </>
      ) : (
        <>
          <Mail className="h-4 w-4 mr-2" />
          Auto Offerte
        </>
      )}
    </Button>
  );
};

export default AutoQuoteButton;
