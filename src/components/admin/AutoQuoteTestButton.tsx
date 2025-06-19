
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AutoQuoteTestButton = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const runTest = async () => {
    setIsRunning(true);
    setLastResult(null);

    try {
      console.log('Testing auto-quote function...');
      
      const { data, error } = await supabase.functions.invoke('auto-send-quote-simple', {
        body: { 
          test: true,
          timestamp: new Date().toISOString()
        }
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Function error:', error);
        setLastResult({ success: false, error: error.message });
        toast.error('Test mislukt: ' + error.message);
      } else {
        setLastResult(data);
        if (data?.success) {
          toast.success('Test succesvol uitgevoerd!');
        } else {
          toast.error('Test mislukt: ' + (data?.error || 'Onbekende fout'));
        }
      }
    } catch (error: any) {
      console.error('Test error:', error);
      setLastResult({ success: false, error: error.message });
      toast.error('Test fout: ' + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Auto Quote Systeem Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={runTest} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Test wordt uitgevoerd...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Test Auto Quote Functie
              </>
            )}
          </Button>
        </div>

        {lastResult && (
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {lastResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="font-medium">
                {lastResult.success ? 'Test Succesvol' : 'Test Mislukt'}
              </span>
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>Bericht:</strong> {lastResult.message || lastResult.error}</p>
              {lastResult.processed && (
                <div className="mt-2">
                  <p><strong>Verwerkt:</strong> {lastResult.processed.total} aanvragen</p>
                  {lastResult.processed.dakkapel > 0 && (
                    <p><strong>Dakkapel offertes verzonden:</strong> {lastResult.processed.dakkapel}</p>
                  )}
                  {lastResult.processed.errors > 0 && (
                    <p><strong>Fouten:</strong> {lastResult.processed.errors}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>Deze test controleert:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Resend API verbinding</li>
            <li>Database toegang</li>
            <li>Nieuwe aanvragen ophalen</li>
            <li>Email verzending (indien nieuwe aanvragen)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoQuoteTestButton;
