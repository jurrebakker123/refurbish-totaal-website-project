
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
import { DakkapelConfiguratie } from '@/types/admin';
import StatusBadge from './StatusBadge';
import { updateRequestStatus } from '@/utils/adminUtils';

interface ProcessedRequestsTableProps {
  configuraties: DakkapelConfiguratie[];
  onViewDetails: (item: DakkapelConfiguratie) => void;
  onDataChange: () => void;
}

const ProcessedRequestsTable: React.FC<ProcessedRequestsTableProps> = ({ 
  configuraties,
  onViewDetails,
  onDataChange
}) => {
  const handleMoveBackToActive = async (id: string) => {
    const success = await updateRequestStatus(id, 'in_behandeling');
    if (success) {
      onDataChange();
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Naam</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefoon</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Afgehandeld op</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configuraties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                Geen verwerkte aanvragen gevonden
              </TableCell>
            </TableRow>
          ) : (
            configuraties.map((config) => (
              <TableRow key={config.id}>
                <TableCell>
                  {format(new Date(config.created_at), 'dd MMM yyyy HH:mm', { locale: nl })}
                </TableCell>
                <TableCell>{config.naam}</TableCell>
                <TableCell>{config.email}</TableCell>
                <TableCell>{config.telefoon}</TableCell>
                <TableCell>{config.model}</TableCell>
                <TableCell>
                  {config.totaal_prijs ? `€${config.totaal_prijs}` : '-'}
                </TableCell>
                <TableCell>
                  {config.afgehandeld_op ? 
                    format(new Date(config.afgehandeld_op), 'dd MMM yyyy HH:mm', { locale: nl }) : 
                    '-'
                  }
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onViewDetails(config)}
                      title="Details bekijken"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleMoveBackToActive(config.id)}
                      title="Terug naar actieve aanvragen"
                      className="bg-yellow-50 hover:bg-yellow-100"
                    >
                      <RotateCcw className="h-4 w-4" />
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

export default ProcessedRequestsTable;
