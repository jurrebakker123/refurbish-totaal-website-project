
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AutoQuoteTestButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const testAutoQuote = async () => {
    setIsLoading(true);
    
    try {
      console.log('🧪 Testing automatic quote system...');
      
      const { data, error } = await supabase.functions.invoke('auto-send-quote-simple', {
        body: {}
      });

      console.log('Response:', data);

      if (error) {
        console.error('Edge function error:', error);
        toast.error(`Fout bij testen: ${error.message}`);
        return;
      }

      if (data?.success) {
        toast.success(`Test succesvol! ${data.processed?.dakkapel || 0} dakkapel offertes verzonden`);
      } else {
        toast.error(`Test gefaald: ${data?.error || 'Onbekende fout'}`);
      }
    } catch (error: any) {
      console.error('Test error:', error);
      toast.error(`Fout bij testen: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={testAutoQuote}
      disabled={isLoading}
      variant="outline"
      className="bg-yellow-50 hover:bg-yellow-100 border-yellow-300"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-2" />
          Testen...
        </>
      ) : (
        <>
          🧪 Test Auto Quote
        </>
      )}
    </Button>
  );
};

export default AutoQuoteTestButton;
