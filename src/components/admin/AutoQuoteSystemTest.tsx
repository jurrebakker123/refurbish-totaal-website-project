
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, Play, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AutoQuoteSystemTest = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runCompleteTest = async () => {
    setTesting(true);
    setResults(null);
    
    const testResults: any = {
      timestamp: new Date().toISOString(),
      tests: {}
    };

    try {
      // Test 1: Check RESEND_API_KEY
      console.log('🔍 Testing RESEND_API_KEY...');
      try {
        const response = await fetch('/functions/v1/auto-send-quote-simple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ test: 'resend_key_check' })
        });
        
        if (response.ok) {
          testResults.tests.resendKey = { status: 'success', message: 'RESEND_API_KEY is ingesteld' };
        } else {
          testResults.tests.resendKey = { status: 'error', message: 'RESEND_API_KEY ontbreekt of is onjuist' };
        }
      } catch (error) {
        testResults.tests.resendKey = { status: 'error', message: `Resend test fout: ${error}` };
      }

      // Test 2: Check for new dakkapel requests
      console.log('🔍 Checking for new dakkapel requests...');
      const { data: newRequests, error: requestsError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('id, status, created_at, offerte_verzonden_op, naam, email')
        .eq('status', 'nieuw')
        .is('offerte_verzonden_op', null)
        .gte('created_at', new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString());

      if (requestsError) {
        testResults.tests.newRequests = { 
          status: 'error', 
          message: `Database fout: ${requestsError.message}`,
          count: 0
        };
      } else {
        testResults.tests.newRequests = { 
          status: newRequests.length > 0 ? 'success' : 'warning', 
          message: `${newRequests.length} nieuwe aanvragen gevonden`,
          count: newRequests.length,
          requests: newRequests
        };
      }

      // Test 3: Test auto-send-quote-simple function
      console.log('🔍 Testing auto-send-quote-simple function...');
      try {
        const functionResponse = await fetch('/functions/v1/auto-send-quote-simple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scheduled: true, test_mode: true })
        });

        const functionResult = await functionResponse.json();
        
        if (functionResponse.ok) {
          testResults.tests.autoFunction = { 
            status: 'success', 
            message: 'Auto-send functie werkt correct',
            result: functionResult
          };
        } else {
          testResults.tests.autoFunction = { 
            status: 'error', 
            message: `Functie fout: ${functionResult.error || 'Onbekende fout'}`,
            result: functionResult
          };
        }
      } catch (error) {
        testResults.tests.autoFunction = { 
          status: 'error', 
          message: `Functie test fout: ${error}`,
          result: null
        };
      }

      // Test 4: Check cron job status
      console.log('🔍 Checking cron job...');
      try {
        const { data: cronJobs, error: cronError } = await supabase.rpc('get_cron_jobs');
        
        if (cronError) {
          testResults.tests.cronJob = { 
            status: 'error', 
            message: `Cron check fout: ${cronError.message}`
          };
        } else {
          const autoQuoteJob = cronJobs?.find((job: any) => 
            job.jobname?.includes('auto-send-quotes') || 
            job.command?.includes('auto-send-quote')
          );
          
          testResults.tests.cronJob = { 
            status: autoQuoteJob ? 'success' : 'warning',
            message: autoQuoteJob ? 'Cron job actief gevonden' : 'Geen actieve cron job gevonden',
            job: autoQuoteJob
          };
        }
      } catch (error) {
        testResults.tests.cronJob = { 
          status: 'warning', 
          message: 'Kon cron status niet controleren - mogelijk geen toegang'
        };
      }

      // Test 5: Manual trigger test
      console.log('🔍 Testing manual trigger...');
      if (testResults.tests.newRequests.count > 0) {
        try {
          const manualResponse = await fetch('/functions/v1/auto-send-quote-simple', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scheduled: true, manual_trigger: true })
          });

          const manualResult = await manualResponse.json();
          
          testResults.tests.manualTrigger = { 
            status: manualResponse.ok ? 'success' : 'error',
            message: manualResponse.ok ? 'Handmatige trigger werkt' : 'Handmatige trigger gefaald',
            result: manualResult
          };
        } catch (error) {
          testResults.tests.manualTrigger = { 
            status: 'error', 
            message: `Handmatige trigger fout: ${error}`
          };
        }
      } else {
        testResults.tests.manualTrigger = { 
          status: 'skipped', 
          message: 'Geen nieuwe aanvragen om te testen'
        };
      }

      setResults(testResults);
      
      // Show summary toast
      const successCount = Object.values(testResults.tests).filter((test: any) => test.status === 'success').length;
      const totalTests = Object.keys(testResults.tests).length;
      
      if (successCount === totalTests) {
        toast.success(`Alle ${totalTests} tests geslaagd! 🎉`);
      } else {
        toast.warning(`${successCount}/${totalTests} tests geslaagd`);
      }

    } catch (error) {
      console.error('Complete test fout:', error);
      toast.error(`Test fout: ${error}`);
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Automatisch Quote Systeem Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runCompleteTest} 
          disabled={testing}
          className="w-full"
        >
          {testing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Testen...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Complete Systeem Test
            </>
          )}
        </Button>

        {results && (
          <div className="space-y-3 mt-4">
            <div className="text-sm text-gray-600">
              Test uitgevoerd: {new Date(results.timestamp).toLocaleString('nl-NL')}
            </div>
            
            {Object.entries(results.tests).map(([testName, test]: [string, any]) => (
              <div key={testName} className="flex items-start gap-3 p-3 border rounded-lg">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <div className="font-medium">
                    {testName === 'resendKey' && 'RESEND_API_KEY Check'}
                    {testName === 'newRequests' && 'Nieuwe Aanvragen Check'}
                    {testName === 'autoFunction' && 'Auto-Send Functie Test'}
                    {testName === 'cronJob' && 'Cron Job Status'}
                    {testName === 'manualTrigger' && 'Handmatige Trigger Test'}
                  </div>
                  <div className="text-sm text-gray-600">{test.message}</div>
                  
                  {test.count !== undefined && (
                    <div className="text-xs text-blue-600 mt-1">
                      Aantal: {test.count}
                    </div>
                  )}
                  
                  {test.requests && test.requests.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Laatste: {test.requests[0].naam} ({test.requests[0].email})
                    </div>
                  )}
                  
                  {test.result && (
                    <details className="text-xs text-gray-500 mt-1">
                      <summary className="cursor-pointer">Details</summary>
                      <pre className="mt-1 p-2 bg-gray-50 rounded">
                        {JSON.stringify(test.result, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-800">Aanbevelingen:</div>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                {results.tests.resendKey?.status === 'error' && (
                  <li>• Stel RESEND_API_KEY in via Supabase secrets</li>
                )}
                {results.tests.newRequests?.count === 0 && (
                  <li>• Maak een test dakkapel aanvraag om het systeem te testen</li>
                )}
                {results.tests.cronJob?.status !== 'success' && (
                  <li>• Controleer of de cron job correct is ingesteld in de database</li>
                )}
                {results.tests.autoFunction?.status === 'error' && (
                  <li>• Controleer de function logs in Supabase dashboard</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoQuoteSystemTest;
