
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const NurtureFlowButton: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const runNurtureFlow = async () => {
    console.log('Starting manual nurture flow...');
    setIsRunning(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('nurture-flow', {
        body: { trigger: 'manual' }
      });

      if (error) {
        console.error('Nurture flow error:', error);
        toast.error('Fout bij uitvoeren nurture flow: ' + error.message);
        return;
      }

      console.log('Nurture flow completed:', data);
      toast.success('Nurture flow succesvol uitgevoerd!');
    } catch (error: any) {
      console.error('Error running nurture flow:', error);
      toast.error('Onverwachte fout bij nurture flow');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Button 
      onClick={runNurtureFlow}
      disabled={isRunning}
      className="bg-purple-600 hover:bg-purple-700"
    >
      {isRunning ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Uitvoeren...
        </>
      ) : (
        <>
          <Clock className="h-4 w-4 mr-2" />
          Nurture Flow Uitvoeren
        </>
      )}
    </Button>
  );
};

export default NurtureFlowButton;
