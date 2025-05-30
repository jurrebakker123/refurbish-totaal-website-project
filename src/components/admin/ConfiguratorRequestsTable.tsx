
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
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {showCheckboxes && <TableHead className="w-12 py-4"></TableHead>}
              <TableHead className="py-4 font-semibold">Datum</TableHead>
              <TableHead className="py-4 font-semibold">Naam</TableHead>
              <TableHead className="py-4 font-semibold">Email</TableHead>
              <TableHead className="py-4 font-semibold">Telefoon</TableHead>
              <TableHead className="py-4 font-semibold">{type === 'zonnepaneel' ? 'Type Paneel' : 'Model'}</TableHead>
              {type === 'zonnepaneel' && <TableHead className="py-4 font-semibold">Aantal</TableHead>}
              {type === 'zonnepaneel' && <TableHead className="py-4 font-semibold">Vermogen</TableHead>}
              <TableHead className="py-4 font-semibold">Prijs</TableHead>
              <TableHead className="py-4 font-semibold">Status</TableHead>
              <TableHead className="py-4 font-semibold">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showCheckboxes ? (type === 'zonnepaneel' ? 11 : 9) : (type === 'zonnepaneel' ? 10 : 8)} className="text-center py-8 text-gray-500">
                  Geen aanvragen gevonden
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  {showCheckboxes && (
                    <TableCell className="py-4">
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onCheckedChange={(checked) => onSelectItem!(item.id, checked as boolean)}
                      />
                    </TableCell>
                  )}
                  <TableCell className="py-4">
                    {format(new Date(item.created_at), 'dd MMM yyyy HH:mm', { locale: nl })}
                  </TableCell>
                  <TableCell className="py-4 font-medium">{item.naam}</TableCell>
                  <TableCell className="py-4">{item.email}</TableCell>
                  <TableCell className="py-4">{item.telefoon}</TableCell>
                  <TableCell className="py-4">
                    {type === 'zonnepaneel' && 'type_paneel' in item ? item.type_paneel : 
                     type === 'dakkapel' && 'model' in item ? item.model : '-'}
                  </TableCell>
                  {type === 'zonnepaneel' && (
                    <TableCell className="py-4">
                      {'aantal_panelen' in item ? item.aantal_panelen : '-'}
                    </TableCell>
                  )}
                  {type === 'zonnepaneel' && (
                    <TableCell className="py-4">
                      {'vermogen' in item ? `${item.vermogen}W` : '-'}
                    </TableCell>
                  )}
                  <TableCell className="py-4 font-medium">
                    {item.totaal_prijs ? `€${item.totaal_prijs}` : '-'}
                  </TableCell>
                  <TableCell className="py-4"><StatusBadge status={item.status} /></TableCell>
                  <TableCell className="py-4">
                    <div className="flex space-x-2 flex-wrap gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewDetails(item)}
                        title="Details bekijken"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(item.id, 'in_behandeling')}
                        title="In behandeling"
                        className="h-8 w-8 p-0"
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-blue-50 hover:bg-blue-100 h-8 w-8 p-0"
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
                        className="bg-green-50 hover:bg-green-100 h-8 w-8 p-0"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(item.id, 'niet_akkoord')}
                        title="Niet Akkoord"
                        className="bg-red-50 hover:bg-red-100 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(item.id, 'op_locatie')}
                        title="Op Locatie"
                        className="bg-blue-50 hover:bg-blue-100 h-8 w-8 p-0"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(item.id, 'in_aanbouw')}
                        title="In Aanbouw"
                        className="bg-orange-50 hover:bg-orange-100 h-8 w-8 p-0"
                      >
                        <Wrench className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(item.id, 'afgehandeld')}
                        title="Afgehandeld"
                        className="h-8 w-8 p-0"
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
    </div>
  );
};

export default ConfiguratorRequestsTable;
