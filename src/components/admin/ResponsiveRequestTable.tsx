
import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Mail } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useIsMobile } from '@/hooks/use-mobile';
import AutoQuoteButton from './AutoQuoteButton';

interface ResponsiveRequestTableProps {
  configuraties?: any[];
  zonnepanelen?: any[];
  onViewDetails: (item: any) => void;
  onOpenQuoteDialog: (item: any) => void;
  onDataChange: () => void;
  sendingQuote: string | null;
  type: 'dakkapel' | 'zonnepaneel';
}

const ResponsiveRequestTable: React.FC<ResponsiveRequestTableProps> = ({
  configuraties = [],
  zonnepanelen = [],
  onViewDetails,
  onOpenQuoteDialog,
  onDataChange,
  sendingQuote,
  type
}) => {
  const isMobile = useIsMobile();

  // Use either configuraties or zonnepanelen data
  const data = configuraties.length > 0 ? configuraties : zonnepanelen;

  const filteredConfigurations = useMemo(() => {
    return data.filter(config => {
      if (config.status === 'afgehandeld') return false;
      return true;
    });
  }, [data]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-100 text-blue-800';
      case 'offerte_verzonden': return 'bg-green-100 text-green-800';
      case 'interesse': return 'bg-purple-100 text-purple-800';
      case 'geen_interesse': return 'bg-red-100 text-red-800';
      case 'op_locatie': return 'bg-orange-100 text-orange-800';
      case 'in_aanbouw': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canSendAutoQuote = (config: any) => {
    return config.status === 'nieuw' && !config.offerte_verzonden_op;
  };

  if (isMobile) {
    return (
      <div className="space-y-3">
        {filteredConfigurations.map((config) => (
          <div key={config.id} className="border rounded-lg p-3 bg-white">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">
                  {config.naam || `${config.voornaam} ${config.achternaam}`}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {config.email || config.emailadres}
                </p>
              </div>
              <Badge className={`text-xs ${getStatusColor(config.status)}`}>
                {config.status}
              </Badge>
            </div>
            
            <div className="text-xs text-gray-600 space-y-1">
              <p>{config.plaats}</p>
              {config.totaal_prijs && (
                <p className="font-medium text-green-600">
                  {formatCurrency(config.totaal_prijs)}
                </p>
              )}
              <p>{formatDate(config.created_at)}</p>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button 
                onClick={() => onViewDetails(config)} 
                size="sm" 
                variant="outline"
                className="flex-1"
              >
                <Eye className="h-3 w-3 mr-1" />
                Bekijk
              </Button>
              
              {canSendAutoQuote(config) ? (
                <AutoQuoteButton
                  requestId={config.id}
                  type={type}
                  customerEmail={config.email || config.emailadres}
                  onSuccess={onDataChange}
                  disabled={sendingQuote === config.id}
                />
              ) : (
                <Button
                  onClick={() => onOpenQuoteDialog(config)}
                  size="sm"
                  disabled={sendingQuote === config.id}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Custom
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Klant</TableHead>
            <TableHead>Locatie</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredConfigurations.map((config) => (
            <TableRow key={config.id}>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {config.naam || `${config.voornaam} ${config.achternaam}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {config.email || config.emailadres}
                  </div>
                </div>
              </TableCell>
              <TableCell>{config.plaats}</TableCell>
              <TableCell>
                {config.totaal_prijs ? (
                  <span className="font-medium text-green-600">
                    {formatCurrency(config.totaal_prijs)}
                  </span>
                ) : (
                  <span className="text-gray-400">Nog niet ingesteld</span>
                )}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(config.status)}>
                  {config.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(config.created_at)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => onViewDetails(config)} 
                    size="sm" 
                    variant="outline"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {canSendAutoQuote(config) ? (
                    <AutoQuoteButton
                      requestId={config.id}
                      type={type}
                      customerEmail={config.email || config.emailadres}
                      onSuccess={onDataChange}
                      disabled={sendingQuote === config.id}
                    />
                  ) : (
                    <Button
                      onClick={() => onOpenQuoteDialog(config)}
                      size="sm"
                      disabled={sendingQuote === config.id}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResponsiveRequestTable;
