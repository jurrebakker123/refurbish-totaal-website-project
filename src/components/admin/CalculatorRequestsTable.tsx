
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
import { DakkapelCalculatorAanvraag } from '@/types/admin';
import StatusBadge from './StatusBadge';
import { updateRequestStatus } from '@/utils/adminUtils';

interface CalculatorRequestsTableProps {
  calculatorAanvragen: DakkapelCalculatorAanvraag[];
  onViewDetails: (item: DakkapelCalculatorAanvraag) => void;
  onOpenQuoteDialog: (item: DakkapelCalculatorAanvraag, isCalculator: boolean) => void;
  onDataChange: () => void;
  sendingQuote: string | null;
}

const CalculatorRequestsTable: React.FC<CalculatorRequestsTableProps> = ({ 
  calculatorAanvragen,
  onViewDetails,
  onOpenQuoteDialog,
  onDataChange,
  sendingQuote
}) => {
  const handleStatusChange = async (id: string, status: string) => {
    const success = await updateRequestStatus('dakkapel_calculator_aanvragen', id, status);
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
            <TableHead>Type</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calculatorAanvragen.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                Geen calculator aanvragen gevonden
              </TableCell>
            </TableRow>
          ) : (
            calculatorAanvragen.map((aanvraag) => (
              <TableRow key={aanvraag.id}>
                <TableCell>
                  {format(new Date(aanvraag.created_at), 'dd MMM yyyy HH:mm', { locale: nl })}
                </TableCell>
                <TableCell>
                  {aanvraag.voornaam} {aanvraag.achternaam}
                </TableCell>
                <TableCell>{aanvraag.emailadres}</TableCell>
                <TableCell>{aanvraag.telefoon}</TableCell>
                <TableCell>{aanvraag.type}</TableCell>
                <TableCell>
                  {aanvraag.totaal_prijs ? `€${aanvraag.totaal_prijs}` : '-'}
                </TableCell>
                <TableCell><StatusBadge status={aanvraag.status} /></TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onViewDetails(aanvraag)}
                      title="Details bekijken"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(aanvraag.id, 'in_behandeling')}
                      title="In behandeling"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-blue-50 hover:bg-blue-100"
                      onClick={() => onOpenQuoteDialog(aanvraag, true)}
                      title="Offerte verzenden"
                      disabled={sendingQuote === aanvraag.id}
                    >
                      {sendingQuote === aanvraag.id ? (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(aanvraag.id, 'afgehandeld')}
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

export default CalculatorRequestsTable;
