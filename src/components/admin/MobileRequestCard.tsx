
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Send, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface MobileRequestCardProps {
  item: any;
  onViewDetails: (item: any) => void;
  onOpenQuoteDialog: (item: any) => void;
  type: 'dakkapel' | 'zonnepaneel';
  sendingQuote?: string | null;
}

const MobileRequestCard = ({ 
  item, 
  onViewDetails, 
  onOpenQuoteDialog, 
  type,
  sendingQuote 
}: MobileRequestCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_behandeling': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offerte_verstuurd': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'afgehandeld': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nieuw': return 'Nieuw';
      case 'in_behandeling': return 'In behandeling';
      case 'offerte_verstuurd': return 'Offerte verstuurd';
      case 'afgehandeld': return 'Afgehandeld';
      default: return status;
    }
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-gray-900 truncate">
              {item.contactInfo?.name || item.name || 'Onbekende naam'}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {item.contactInfo?.email || item.email || 'Geen email'}
            </p>
          </div>
          <Badge className={`text-xs px-2 py-1 ${getStatusColor(item.status)}`}>
            {getStatusLabel(item.status)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div>
            <span className="text-gray-500">Datum:</span>
            <div className="font-medium">
              {format(new Date(item.created_at), 'dd MMM yyyy', { locale: nl })}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Type:</span>
            <div className="font-medium capitalize">
              {type === 'dakkapel' ? (item.type || 'Dakkapel') : 'Zonnepanelen'}
            </div>
          </div>
        </div>

        {type === 'dakkapel' && item.dimensions && (
          <div className="mb-3 text-xs">
            <span className="text-gray-500">Afmetingen:</span>
            <div className="font-medium">
              {item.dimensions.width}m × {item.dimensions.height}m
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(item)}
            className="flex-1 text-xs h-8"
          >
            <Eye className="h-3 w-3 mr-1" />
            Details
          </Button>
          
          {item.status !== 'afgehandeld' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onOpenQuoteDialog(item)}
              disabled={sendingQuote === item.id}
              className="flex-1 text-xs h-8 bg-green-600 hover:bg-green-700"
            >
              {sendingQuote === item.id ? (
                <>
                  <Clock className="h-3 w-3 mr-1 animate-spin" />
                  Versturen...
                </>
              ) : (
                <>
                  <Send className="h-3 w-3 mr-1" />
                  Offerte
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileRequestCard;
