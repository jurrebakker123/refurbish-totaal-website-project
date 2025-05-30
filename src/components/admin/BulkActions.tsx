
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DakkapelConfiguratie, RefurbishedZonnepaneel } from '@/types/admin';

interface BulkActionsProps {
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (id: string, checked: boolean) => void;
  onBulkAction: (action: string, ids: string[]) => void;
  allIds: string[];
  configurations: DakkapelConfiguratie[] | RefurbishedZonnepaneel[];
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedIds,
  onSelectAll,
  onSelectItem,
  onBulkAction,
  allIds,
  configurations
}) => {
  const [bulkAction, setBulkAction] = React.useState<string>('');

  const handleBulkAction = () => {
    if (bulkAction && selectedIds.length > 0) {
      onBulkAction(bulkAction, selectedIds);
      setBulkAction('');
    }
  };

  const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < allIds.length;

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={onSelectAll}
          ref={(el) => {
            if (el) {
              el.indeterminate = isIndeterminate;
            }
          }}
        />
        <span className="text-sm">
          {selectedIds.length > 0 
            ? `${selectedIds.length} geselecteerd` 
            : 'Selecteer alle'
          }
        </span>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2">
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Kies actie..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_behandeling">In Behandeling</SelectItem>
              <SelectItem value="offerte_verzonden">Offerte Verzonden</SelectItem>
              <SelectItem value="akkoord">Akkoord</SelectItem>
              <SelectItem value="niet_akkoord">Niet Akkoord</SelectItem>
              <SelectItem value="op_locatie">Op Locatie</SelectItem>
              <SelectItem value="in_aanbouw">In Aanbouw</SelectItem>
              <SelectItem value="afgehandeld">Afgehandeld</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleBulkAction} 
            disabled={!bulkAction}
            variant="default"
          >
            Toepassen
          </Button>
        </div>
      )}
    </div>
  );
};

export default BulkActions;
