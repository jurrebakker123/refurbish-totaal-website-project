
import React from 'react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface ProcessedRequestsTableProps {
  configuraties?: DakkapelConfiguratie[];
  zonnepanelen?: RefurbishedZonnepaneel[];
  onViewDetails: (item: DakkapelConfiguratie | RefurbishedZonnepaneel) => void;
  onDataChange: () => void;
  type?: 'dakkapel' | 'zonnepaneel';
}

const ProcessedRequestsTable: React.FC<ProcessedRequestsTableProps> = ({ 
  configuraties = [],
  zonnepanelen = [],
  onViewDetails,
  onDataChange,
  type = 'dakkapel'
}) => {
  const data = type === 'zonnepaneel' ? zonnepanelen : configuraties;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Naam</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefoon</TableHead>
            <TableHead>{type === 'zonnepaneel' ? 'Type Paneel' : 'Model'}</TableHead>
            {type === 'zonnepaneel' && <TableHead>Aantal</TableHead>}
            {type === 'zonnepaneel' && <TableHead>Vermogen</TableHead>}
            <TableHead>Prijs</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Afgehandeld</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={type === 'zonnepaneel' ? 11 : 9} className="text-center py-4">
                Geen afgehandelde aanvragen gevonden
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
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
                  {item.afgehandeld_op ? 
                    format(new Date(item.afgehandeld_op), 'dd MMM yyyy', { locale: nl }) : 
                    '-'
                  }
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewDetails(item)}
                    title="Details bekijken"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProcessedRequestsTable;
