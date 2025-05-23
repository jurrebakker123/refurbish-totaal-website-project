
import React from 'react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Eye, Clock, Mail, CheckCircle } from 'lucide-react';
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

interface ConfiguratorRequestsTableProps {
  configuraties: DakkapelConfiguratie[];
  onViewDetails: (item: DakkapelConfiguratie) => void;
  onOpenQuoteDialog: (item: DakkapelConfiguratie) => void;
  onDataChange: () => void;
  sendingQuote: string | null;
}

const ConfiguratorRequestsTable: React.FC<ConfiguratorRequestsTableProps> = ({ 
  configuraties,
  onViewDetails,
  onOpenQuoteDialog,
  onDataChange,
  sendingQuote
}) => {
  const handleStatusChange = async (id: string, status: string) => {
    const success = await updateRequestStatus(id, status);
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
            <TableHead>Status</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configuraties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                Geen configurator aanvragen gevonden
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
                <TableCell><StatusBadge status={config.status} /></TableCell>
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
                      onClick={() => handleStatusChange(config.id, 'in_behandeling')}
                      title="In behandeling"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-blue-50 hover:bg-blue-100"
                      onClick={() => onOpenQuoteDialog(config)}
                      title="Offerte verzenden"
                      disabled={sendingQuote === config.id}
                    >
                      {sendingQuote === config.id ? (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(config.id, 'afgehandeld')}
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
