
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import MobileRequestCard from './MobileRequestCard';
import { QuoteItem, ZonnepaneelQuoteItem } from '@/types/admin';
import { toast } from 'sonner';
import AutoQuoteButton from './AutoQuoteButton';
import StatusBadge from './StatusBadge';
import { supabase } from '@/integrations/supabase/client';

type ServiceType = 'dakkapel' | 'zonnepaneel' | 'schilder' | 'stukadoor';

interface ResponsiveRequestTableProps {
  items: any[];
  searchTerm: string;
  selectedStatus: string;
  onEdit: (item: any) => void;
  onDataChange: () => void;
  sendingQuote: string | null;
  setSendingQuote: (id: string | null) => void;
}

const ResponsiveRequestTable: React.FC<ResponsiveRequestTableProps> = ({
  items,
  searchTerm,
  selectedStatus,
  onEdit,
  onDataChange,
  sendingQuote,
  setSendingQuote
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE dd MMMM yyyy, HH:mm', { locale: nl });
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Ongeldige datum';
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Weet je zeker dat je deze aanvraag wilt verwijderen?");
    if (confirmDelete) {
      try {
        const isZonnepaneel = items.length > 0 && 'aantal_panelen' in items[0];
        const isSchilder = items.length > 0 && 'project_type' in items[0] && 'verf_type' in items[0];
        const isStukadoor = items.length > 0 && 'werk_type' in items[0] && 'afwerking' in items[0];
        
        let tableName: 'dakkapel_calculator_aanvragen' | 'refurbished_zonnepanelen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen';
        if (isZonnepaneel) tableName = 'refurbished_zonnepanelen';
        else if (isSchilder) tableName = 'schilder_aanvragen';
        else if (isStukadoor) tableName = 'stukadoor_aanvragen';
        
        const { error } = await supabase.from(tableName).delete().eq('id', id);
        if (error) throw error;
        
        onDataChange();
        toast.success('Aanvraag succesvol verwijderd');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error("Er is een fout opgetreden bij het verwijderen van de aanvraag.");
      }
    }
  };

  const getStatusLabel = (status: string) => {
    if (!status) return 'Onbekend';
    
    switch (status.toLowerCase()) {
      case 'nieuw': return 'Nieuw';
      case 'in_behandeling': return 'In Behandeling';
      case 'offerte_verzonden': return 'Offerte Verzonden';
      case 'interesse_bevestigd': return 'Interesse Bevestigd';
      case 'akkoord': return 'Akkoord';
      case 'niet_akkoord': return 'Niet Akkoord';
      case 'op_locatie': return 'Op Locatie';
      case 'in_aanbouw': return 'In Aanbouw';
      case 'afgehandeld': return 'Afgehandeld';
      default: return status;
    }
  };

  const filteredItems = items.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    const itemName = item.naam || `${item.voornaam} ${item.achternaam}` || '';
    const itemEmail = item.email || item.emailadres || '';
    const itemPhone = item.telefoon || '';
    
    const matchesSearchTerm =
      itemName.toLowerCase().includes(searchTermLower) ||
      itemEmail.toLowerCase().includes(searchTermLower) ||
      itemPhone.toLowerCase().includes(searchTermLower) ||
      item.id.toLowerCase().includes(searchTermLower);

    const matchesStatus = selectedStatus === 'all' || selectedStatus === 'alle' || item.status === selectedStatus;

    return matchesSearchTerm && matchesStatus;
  });

  const isZonnepaneel = items.length > 0 && 'aantal_panelen' in items[0];
  const isSchilder = items.length > 0 && 'project_type' in items[0] && 'verf_type' in items[0];
  const isStukadoor = items.length > 0 && 'werk_type' in items[0] && 'afwerking' in items[0];

  let type: ServiceType = 'dakkapel';
  if (isZonnepaneel) type = 'zonnepaneel';
  else if (isSchilder) type = 'schilder';
  else if (isStukadoor) type = 'stukadoor';

  // Only show quote buttons for dakkapel and zonnepaneel
  const showQuoteButtons = type === 'dakkapel' || type === 'zonnepaneel';

  // Show status overview
  const statusCounts = filteredItems.reduce((acc, item) => {
    const status = item.status || 'nieuw';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const allStatuses = [
    'nieuw',
    'in_behandeling', 
    'offerte_verzonden',
    'interesse_bevestigd',
    'akkoord',
    'niet_akkoord',
    'op_locatie',
    'in_aanbouw',
    'afgehandeld'
  ];

  return (
    <div className="space-y-6">
      {/* Status Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {allStatuses.map((status) => (
          <Card key={status} className="p-3">
            <div className="text-center">
              <Badge variant="outline" className="text-xs mb-1">
                {getStatusLabel(status)}
              </Badge>
              <div className="text-lg font-bold text-gray-900">
                {statusCounts[status] || 0}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredItems.map((item) => (
          <MobileRequestCard
            key={item.id}
            item={item}
            onViewDetails={() => onEdit(item)}
            onOpenQuoteDialog={() => onEdit(item)}
            type={showQuoteButtons ? (type as 'dakkapel' | 'zonnepaneel') : 'dakkapel'}
            sendingQuote={sendingQuote}
          />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Naam</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefoon</TableHead>
              <TableHead>Aanvraag Datum</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => {
              const itemName = item.naam || `${item.voornaam} ${item.achternaam}` || 'Onbekend';
              const itemEmail = item.email || item.emailadres || '';
              
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{itemName}</TableCell>
                  <TableCell>{itemEmail}</TableCell>
                  <TableCell>{item.telefoon || 'N.v.t.'}</TableCell>
                  <TableCell>{formatDate(item.created_at)}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status || 'nieuw'} />
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(item)}
                        disabled={sendingQuote === item.id}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Aanpassen
                      </Button>
                      
                      {showQuoteButtons && (
                        <AutoQuoteButton
                          requestId={item.id}
                          type={type as 'dakkapel' | 'zonnepaneel'}
                          customerEmail={itemEmail}
                          onSuccess={onDataChange}
                          disabled={sendingQuote === item.id}
                        />
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Geen aanvragen gevonden met de huidige filters.</p>
        </div>
      )}
    </div>
  );
};

export default ResponsiveRequestTable;
