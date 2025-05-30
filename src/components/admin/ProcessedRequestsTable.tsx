
import React from 'react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Eye, RotateCcw } from 'lucide-react';
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
import { updateRequestStatus } from '@/utils/adminUtils';

interface ProcessedRequestsTableProps {
  configuraties: (DakkapelConfiguratie | RefurbishedZonnepaneel)[];
  onViewDetails: (item: DakkapelConfiguratie | RefurbishedZonnepaneel) => void;
  onDataChange: () => void;
  type?: 'dakkapel' | 'zonnepaneel';
}

const ProcessedRequestsTable: React.FC<ProcessedRequestsTableProps> = ({ 
  configuraties,
  onViewDetails,
  onDataChange,
  type = 'dakkapel'
}) => {
  const tableName = type === 'zonnepaneel' ? 'refurbished_zonnepanelen' : 'dakkapel_configuraties';
  
  const handleMoveBackToActive = async (id: string) => {
    const success = await updateRequestStatus(id, 'in_behandeling', tableName);
    if (success) {
      onDataChange();
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="py-4 font-semibold">Datum</TableHead>
              <TableHead className="py-4 font-semibold">Naam</TableHead>
              <TableHead className="py-4 font-semibold">Email</TableHead>
              <TableHead className="py-4 font-semibold">Telefoon</TableHead>
              <TableHead className="py-4 font-semibold">{type === 'zonnepaneel' ? 'Type Paneel' : 'Model'}</TableHead>
              {type === 'zonnepaneel' && <TableHead className="py-4 font-semibold">Aantal</TableHead>}
              {type === 'zonnepaneel' && <TableHead className="py-4 font-semibold">Vermogen</TableHead>}
              <TableHead className="py-4 font-semibold">Prijs</TableHead>
              <TableHead className="py-4 font-semibold">Afgehandeld op</TableHead>
              <TableHead className="py-4 font-semibold">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {configuraties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={type === 'zonnepaneel' ? 10 : 8} className="text-center py-8 text-gray-500">
                  Geen verwerkte aanvragen gevonden
                </TableCell>
              </TableRow>
            ) : (
              configuraties.map((config) => (
                <TableRow key={config.id} className="hover:bg-gray-50">
                  <TableCell className="py-4">
                    {format(new Date(config.created_at), 'dd MMM yyyy HH:mm', { locale: nl })}
                  </TableCell>
                  <TableCell className="py-4 font-medium">{config.naam}</TableCell>
                  <TableCell className="py-4">{config.email}</TableCell>
                  <TableCell className="py-4">{config.telefoon}</TableCell>
                  <TableCell className="py-4">
                    {type === 'zonnepaneel' && 'type_paneel' in config ? config.type_paneel : 
                     type === 'dakkapel' && 'model' in config ? config.model : '-'}
                  </TableCell>
                  {type === 'zonnepaneel' && (
                    <TableCell className="py-4">
                      {'aantal_panelen' in config ? config.aantal_panelen : '-'}
                    </TableCell>
                  )}
                  {type === 'zonnepaneel' && (
                    <TableCell className="py-4">
                      {'vermogen' in config ? `${config.vermogen}W` : '-'}
                    </TableCell>
                  )}
                  <TableCell className="py-4 font-medium">
                    {config.totaal_prijs ? `€${config.totaal_prijs}` : '-'}
                  </TableCell>
                  <TableCell className="py-4">
                    {config.afgehandeld_op ? 
                      format(new Date(config.afgehandeld_op), 'dd MMM yyyy HH:mm', { locale: nl }) : 
                      '-'
                    }
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewDetails(config)}
                        title="Details bekijken"
                        className="h-8 px-3"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMoveBackToActive(config.id)}
                        title="Terug naar actieve aanvragen"
                        className="bg-yellow-50 hover:bg-yellow-100 h-8 px-3"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Heractiveren
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

export default ProcessedRequestsTable;
