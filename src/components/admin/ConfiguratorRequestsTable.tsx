
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Send, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { DakkapelConfiguratie, RefurbishedZonnepaneel } from '@/types/admin';
import { updateRequestStatus, deleteQuote } from '@/utils/adminUtils';
import { toast } from 'sonner';
import StatusBadge from './StatusBadge';

interface SchilderAanvraag {
  id: string;
  created_at: string;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  telefoon: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  project_type: string;
  oppervlakte: number;
  verf_type: string;
  status: string;
  totaal_prijs?: number;
}

interface StukadoorAanvraag {
  id: string;
  created_at: string;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  telefoon: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  werk_type: string;
  oppervlakte: number;
  afwerking: string;
  status: string;
  totaal_prijs?: number;
}

interface ConfiguratorRequestsTableProps {
  configuraties?: DakkapelConfiguratie[];
  zonnepanelen?: RefurbishedZonnepaneel[];
  schilderAanvragen?: SchilderAanvraag[];
  stukadoorAanvragen?: StukadoorAanvraag[];
  onViewDetails: (item: any) => void;
  onOpenQuoteDialog: (item: any) => void;
  onDataChange: () => void;
  sendingQuote?: string | null;
  selectedIds?: string[];
  onSelectItem?: (id: string, checked: boolean) => void;
  type: 'dakkapel' | 'zonnepaneel' | 'schilder' | 'stukadoor';
}

const ConfiguratorRequestsTable: React.FC<ConfiguratorRequestsTableProps> = ({
  configuraties = [],
  zonnepanelen = [],
  schilderAanvragen = [],
  stukadoorAanvragen = [],
  onViewDetails,
  onOpenQuoteDialog,
  onDataChange,
  sendingQuote,
  selectedIds = [],
  onSelectItem,
  type
}) => {
  const handleStatusChange = async (id: string, newStatus: string) => {
    const tableMap = {
      dakkapel: 'dakkapel_calculator_aanvragen' as const,
      zonnepaneel: 'refurbished_zonnepanelen' as const,
      schilder: 'schilder_aanvragen' as const,
      stukadoor: 'stukadoor_aanvragen' as const
    };
    
    const success = await updateRequestStatus(id, newStatus, tableMap[type]);
    if (success) {
      onDataChange();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit item wilt verwijderen?')) return;
    
    const tableMap = {
      dakkapel: 'dakkapel_calculator_aanvragen' as const,
      zonnepaneel: 'refurbished_zonnepanelen' as const,
      schilder: 'schilder_aanvragen' as const,
      stukadoor: 'stukadoor_aanvragen' as const
    };
    
    const success = await deleteQuote(id, tableMap[type]);
    if (success) {
      onDataChange();
    }
  };

  const renderDakkapelRow = (config: DakkapelConfiguratie) => (
    <tr key={config.id} className="border-b hover:bg-gray-50">
      {onSelectItem && (
        <td className="p-4">
          <Checkbox
            checked={selectedIds.includes(config.id)}
            onCheckedChange={(checked) => onSelectItem(config.id, checked as boolean)}
          />
        </td>
      )}
      <td className="p-4">
        <div>
          <p className="font-medium">{config.naam}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {config.email}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {config.telefoon}
          </p>
        </div>
      </td>
      <td className="p-4">
        <p className="text-sm flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {config.postcode} {config.plaats}
        </p>
      </td>
      <td className="p-4">
        <p className="text-sm font-medium">{config.model}</p>
        <p className="text-xs text-gray-500">{config.breedte}cm breed</p>
      </td>
      <td className="p-4">
        <p className="text-sm">€{config.totaal_prijs?.toLocaleString() || 'N/A'}</p>
      </td>
      <td className="p-4">
        <StatusBadge status={config.status} />
      </td>
      <td className="p-4">
        <p className="text-sm">{new Date(config.created_at).toLocaleDateString('nl-NL')}</p>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onViewDetails(config)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={() => onOpenQuoteDialog(config)}
            disabled={sendingQuote === config.id}
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(config.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  const renderSchilderRow = (aanvraag: SchilderAanvraag) => (
    <tr key={aanvraag.id} className="border-b hover:bg-gray-50">
      {onSelectItem && (
        <td className="p-4">
          <Checkbox
            checked={selectedIds.includes(aanvraag.id)}
            onCheckedChange={(checked) => onSelectItem(aanvraag.id, checked as boolean)}
          />
        </td>
      )}
      <td className="p-4">
        <div>
          <p className="font-medium">{aanvraag.voornaam} {aanvraag.achternaam}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {aanvraag.emailadres}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {aanvraag.telefoon}
          </p>
        </div>
      </td>
      <td className="p-4">
        <p className="text-sm flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {aanvraag.postcode} {aanvraag.plaats}
        </p>
      </td>
      <td className="p-4">
        <p className="text-sm font-medium">{aanvraag.project_type}</p>
        <p className="text-xs text-gray-500">{aanvraag.oppervlakte}m² - {aanvraag.verf_type}</p>
      </td>
      <td className="p-4">
        <p className="text-sm">€{aanvraag.totaal_prijs?.toLocaleString() || 'N/A'}</p>
      </td>
      <td className="p-4">
        <StatusBadge status={aanvraag.status} />
      </td>
      <td className="p-4">
        <p className="text-sm">{new Date(aanvraag.created_at).toLocaleDateString('nl-NL')}</p>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onViewDetails(aanvraag)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={() => onOpenQuoteDialog(aanvraag)}
            disabled={sendingQuote === aanvraag.id}
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(aanvraag.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  const renderStukadoorRow = (aanvraag: StukadoorAanvraag) => (
    <tr key={aanvraag.id} className="border-b hover:bg-gray-50">
      {onSelectItem && (
        <td className="p-4">
          <Checkbox
            checked={selectedIds.includes(aanvraag.id)}
            onCheckedChange={(checked) => onSelectItem(aanvraag.id, checked as boolean)}
          />
        </td>
      )}
      <td className="p-4">
        <div>
          <p className="font-medium">{aanvraag.voornaam} {aanvraag.achternaam}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {aanvraag.emailadres}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {aanvraag.telefoon}
          </p>
        </div>
      </td>
      <td className="p-4">
        <p className="text-sm flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {aanvraag.postcode} {aanvraag.plaats}
        </p>
      </td>
      <td className="p-4">
        <p className="text-sm font-medium">{aanvraag.werk_type}</p>
        <p className="text-xs text-gray-500">{aanvraag.oppervlakte}m² - {aanvraag.afwerking}</p>
      </td>
      <td className="p-4">
        <p className="text-sm">€{aanvraag.totaal_prijs?.toLocaleString() || 'N/A'}</p>
      </td>
      <td className="p-4">
        <StatusBadge status={aanvraag.status} />
      </td>
      <td className="p-4">
        <p className="text-sm">{new Date(aanvraag.created_at).toLocaleDateString('nl-NL')}</p>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onViewDetails(aanvraag)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={() => onOpenQuoteDialog(aanvraag)}
            disabled={sendingQuote === aanvraag.id}
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(aanvraag.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  const getCurrentData = () => {
    switch (type) {
      case 'dakkapel':
        return configuraties;
      case 'zonnepaneel':
        return zonnepanelen;
      case 'schilder':
        return schilderAanvragen;
      case 'stukadoor':
        return stukadoorAanvragen;
      default:
        return [];
    }
  };

  const currentData = getCurrentData();

  if (currentData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Geen aanvragen gevonden voor dit type
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {onSelectItem && <th className="p-4 text-left"></th>}
            <th className="p-4 text-left font-medium">Klant</th>
            <th className="p-4 text-left font-medium">Locatie</th>
            <th className="p-4 text-left font-medium">Project Details</th>
            <th className="p-4 text-left font-medium">Prijs</th>
            <th className="p-4 text-left font-medium">Status</th>
            <th className="p-4 text-left font-medium">Datum</th>
            <th className="p-4 text-left font-medium">Acties</th>
          </tr>
        </thead>
        <tbody>
          {type === 'dakkapel' && configuraties.map(renderDakkapelRow)}
          {type === 'schilder' && schilderAanvragen.map(renderSchilderRow)}
          {type === 'stukadoor' && stukadoorAanvragen.map(renderStukadoorRow)}
          {type === 'zonnepaneel' && zonnepanelen.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              {onSelectItem && (
                <td className="p-4">
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={(checked) => onSelectItem(item.id, checked as boolean)}
                  />
                </td>
              )}
              <td className="p-4">
                <div>
                  <p className="font-medium">{item.naam}</p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                  <p className="text-sm text-gray-500">{item.telefoon}</p>
                </div>
              </td>
              <td className="p-4">
                <p className="text-sm">{item.postcode} {item.plaats}</p>
              </td>
              <td className="p-4">
                <p className="text-sm font-medium">{item.aantal_panelen} panelen</p>
                <p className="text-xs text-gray-500">{item.vermogen}W - {item.merk}</p>
              </td>
              <td className="p-4">
                <p className="text-sm">€{item.totaal_prijs?.toLocaleString() || 'N/A'}</p>
              </td>
              <td className="p-4">
                <StatusBadge status={item.status} />
              </td>
              <td className="p-4">
                <p className="text-sm">{new Date(item.created_at).toLocaleDateString('nl-NL')}</p>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onViewDetails(item)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => onOpenQuoteDialog(item)}
                    disabled={sendingQuote === item.id}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfiguratorRequestsTable;
