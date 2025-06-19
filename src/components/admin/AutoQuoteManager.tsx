
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Settings, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { triggerAutoQuoteForNewRequests } from '@/utils/autoQuoteUtils';

const AutoQuoteManager: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState<Date | null>(null);

  const handleRunAutoQuotes = async () => {
    setIsRunning(true);
    
    try {
      console.log('Starting auto-quote process...');
      const success = await triggerAutoQuoteForNewRequests();
      
      if (success) {
        toast.success('Auto-quote proces succesvol uitgevoerd!');
        setLastRun(new Date());
      } else {
        toast.error('Er ging iets mis bij het auto-quote proces');
      }
    } catch (error) {
      console.error('Auto quote manager error:', error);
      toast.error('Fout bij uitvoeren auto-quote proces');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Automatische Offertes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Verzend automatisch offertes naar nieuwe aanvragen
            </p>
            {lastRun && (
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                Laatst uitgevoerd: {lastRun.toLocaleString('nl-NL')}
              </p>
            )}
          </div>
          <Badge variant="outline" className="text-green-600">
            Actief
          </Badge>
        </div>

        <Button
          onClick={handleRunAutoQuotes}
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Bezig met verzenden...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Verzend Nieuwe Offertes Nu
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Controleert nieuwe aanvragen van de laatste 24 uur</p>
          <p>• Verstuurt automatisch offerte per email</p>
          <p>• Werkt voor zowel dakkapel als zonnepaneel aanvragen</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoQuoteManager;
