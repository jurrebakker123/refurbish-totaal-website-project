
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ManualAutoQuoteTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const testAutoQuoteFunction = async () => {
    setIsLoading(true);
    setLastResult(null);
    
    try {
      const response = await fetch('/functions/v1/auto-send-quote-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ manual_test: true })
      });

      const result = await response.json();
      setLastResult(result);
      
      if (result.success) {
        toast.success(`Test succesvol! ${result.processed?.total || 0} aanvragen verwerkt`);
      } else {
        toast.error(`Test gefaald: ${result.error}`);
      }
    } catch (error) {
      console.error('Test error:', error);
      toast.error(`Test error: ${error.message}`);
      setLastResult({ success: false, error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Automatische Quote Systeem Testen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Test de automatische quote functie handmatig om te controleren of deze werkt.
          </p>
          
          <Button 
            onClick={testAutoQuoteFunction}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Testen...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Test Auto-Quote Functie
              </>
            )}
          </Button>

          {lastResult && (
            <div className={`p-4 rounded-lg border ${
              lastResult.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {lastResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <strong>
                  {lastResult.success ? 'Test Succesvol' : 'Test Gefaald'}
                </strong>
              </div>
              
              <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                {JSON.stringify(lastResult, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>Troubleshooting tips:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Controleer of RESEND_API_KEY is ingesteld in Supabase secrets</li>
              <li>Controleer of er nieuwe dakkapel aanvragen zijn (status: 'nieuw')</li>
              <li>Controleer de function logs in Supabase dashboard</li>
              <li>Controleer of pg_cron extensie is ingeschakeld</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualAutoQuoteTest;
