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
import { deleteQuote } from '@/utils/adminUtils';
import { toast } from 'sonner';
import { AutoQuoteButton } from './AutoQuoteButton';
import WhatsAppQuoteButton from './WhatsAppQuoteButton';
import CombinedQuoteButton from './CombinedQuoteButton';

interface ResponsiveRequestTableProps {
  items: QuoteItem[] | ZonnepaneelQuoteItem[];
  searchTerm: string;
  selectedStatus: string;
  onEdit: (id: string) => void;
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
        await deleteQuote(id);
        toast.success("Aanvraag succesvol verwijderd!");
        onDataChange(); // Refresh data
      } catch (error) {
        toast.error("Er is een fout opgetreden bij het verwijderen van de aanvraag.");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-100 text-blue-800';
      case 'interesse_bevestigd': return 'bg-green-100 text-green-800';
      case 'offerte_verzonden': return 'bg-yellow-100 text-yellow-800';
      case 'niet_akkoord': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = items.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm =
      item.naam.toLowerCase().includes(searchTermLower) ||
      item.email.toLowerCase().includes(searchTermLower) ||
      (item.telefoon && item.telefoon.toLowerCase().includes(searchTermLower)) ||
      item.id.toLowerCase().includes(searchTermLower);

    const matchesStatus = selectedStatus === 'alle' || item.status === selectedStatus;

    return matchesSearchTerm && matchesStatus;
  });

  const isZonnepaneel = items.length > 0 && 'isZonnepaneel' in items[0];

  return (
    <div className="space-y-4">
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredItems.map((item) => (
          <MobileRequestCard
            key={item.id}
            item={item}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
            onEdit={() => onEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
            onDataChange={onDataChange}
            sendingQuote={sendingQuote}
            setSendingQuote={setSendingQuote}
            isZonnepaneel={isZonnepaneel}
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
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.naam}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.telefoon || 'N.v.t.'}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item.id)}
                      disabled={sendingQuote === item.id}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Aanpassen
                    </Button>
                    
                    <AutoQuoteButton
                      requestId={item.id}
                      type={isZonnepaneel ? 'zonnepaneel' : 'dakkapel'}
                      customerEmail={item.email}
                      onSuccess={onDataChange}
                      disabled={sendingQuote === item.id}
                    />
                    
                    {/* WhatsApp Quote Button */}
                    {item.telefoon && (
                      <WhatsAppQuoteButton
                        requestId={item.id}
                        type={isZonnepaneel ? 'zonnepaneel' : 'dakkapel'}
                        customerPhone={item.telefoon}
                        customerName={item.naam}
                        onSuccess={onDataChange}
                        disabled={sendingQuote === item.id}
                      />
                    )}
                    
                    {/* Combined Quote Button */}
                    {(item.email || item.telefoon) && (
                      <CombinedQuoteButton
                        requestId={item.id}
                        type={isZonnepaneel ? 'zonnepaneel' : 'dakkapel'}
                        customerEmail={item.email}
                        customerPhone={item.telefoon}
                        customerName={item.naam}
                        onSuccess={onDataChange}
                        disabled={sendingQuote === item.id}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResponsiveRequestTable;
