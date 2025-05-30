
import React from 'react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Eye, Clock, Mail, CheckCircle, ThumbsUp, X, MapPin, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DakkapelConfiguratie, RefurbishedZonnepaneel } from '@/types/admin';
import StatusBadge from './StatusBadge';
import { updateRequestStatus } from '@/utils/adminUtils';

interface ConfiguratorRequestsTableProps {
  configuraties?: DakkapelConfiguratie[];
  zonnepanelen?: RefurbishedZonnepaneel[];
  onViewDetails: (item: DakkapelConfiguratie | RefurbishedZonnepaneel) => void;
  onOpenQuoteDialog: (item: DakkapelConfiguratie | RefurbishedZonnepaneel) => void;
  onDataChange: () => void;
  sendingQuote: string | null;
  selectedIds?: string[];
  onSelectItem?: (id: string, checked: boolean) => void;
  type?: 'dakkapel' | 'zonnepaneel';
}

const ConfiguratorRequestsTable: React.FC<ConfiguratorRequestsTableProps> = ({ 
  configuraties = [],
  zonnepanelen = [],
  onViewDetails,
  onOpenQuoteDialog,
  onDataChange,
  sendingQuote,
  selectedIds = [],
  onSelectItem,
  type = 'dakkapel'
}) => {
  const data = type === 'zonnepaneel' ? zonnepanelen : configuraties;
  const tableName = type === 'zonnepaneel' ? 'refurbished_zonnepanelen' : 'dakkapel_configuraties';
  
  const handleStatusChange = async (id: string, status: string) => {
    const success = await updateRequestStatus(id, status, tableName);
    if (success) {
      onDataChange();
    }
  };

  const showCheckboxes = Boolean(onSelectItem);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckboxes && <TableHead className="w-12"></TableHead>}
            <TableHead>Datum</TableHead>
            <TableHead>Naam</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefoon</TableHead>
            <TableHead>{type === 'zonnepaneel' ? 'Type Paneel' : 'Model'}</TableHead>
            {type === 'zonnepaneel' && <TableHead>Aantal</TableHead>}
            {type === 'zonnepaneel' && <TableHead>Vermogen</TableHead>}
            <TableHead>Prijs</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showCheckboxes ? (type === 'zonnepaneel' ? 11 : 9) : (type === 'zonnepaneel' ? 10 : 8)} className="text-center py-4">
                Geen aanvragen gevonden
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                {showCheckboxes && (
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onCheckedChange={(checked) => onSelectItem!(item.id, checked as boolean)}
                    />
                  </TableCell>
                )}
                <TableCell>
                  {format(new Date(item.created_at), 'dd MMM yyyy HH:mm', { locale: nl })}
                </TableCell>
                <TableCell>{item.naam}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.telefoon}</TableCell>
                <TableCell>
                  {type === 'zonnepaneel' && 'type_paneel' in item ? item.type_paneel : 
                   type === 'dakkapel' && 'model' in item ? item.model : '-'}
                </TableCell>
                {type === 'zonnepaneel' && (
                  <TableCell>
                    {'aantal_panelen' in item ? item.aantal_panelen : '-'}
                  </TableCell>
                )}
                {type === 'zonnepaneel' && (
                  <TableCell>
                    {'vermogen' in item ? `${item.vermogen}W` : '-'}
                  </TableCell>
                )}
                <TableCell>
                  {item.totaal_prijs ? `€${item.totaal_prijs}` : '-'}
                </TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onViewDetails(item)}
                      title="Details bekijken"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(item.id, 'in_behandeling')}
                      title="In behandeling"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-blue-50 hover:bg-blue-100"
                      onClick={() => onOpenQuoteDialog(item)}
                      title="Offerte verzenden"
                      disabled={sendingQuote === item.id}
                    >
                      {sendingQuote === item.id ? (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(item.id, 'akkoord')}
                      title="Akkoord"
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(item.id, 'niet_akkoord')}
                      title="Niet Akkoord"
                      className="bg-red-50 hover:bg-red-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(item.id, 'op_locatie')}
                      title="Op Locatie"
                      className="bg-blue-50 hover:bg-blue-100"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(item.id, 'in_aanbouw')}
                      title="In Aanbouw"
                      className="bg-orange-50 hover:bg-orange-100"
                    >
                      <Wrench className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(item.id, 'afgehandeld')}
                      title="Afgehandeld"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConfiguratorRequestsTable;
