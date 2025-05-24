
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Mail, CheckCircle, X, ThumbsUp } from 'lucide-react';
import { DakkapelConfiguratie } from '@/types/admin';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

interface BulkActionsProps {
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (id: string, checked: boolean) => void;
  onBulkAction: (action: string, ids: string[]) => void;
  allIds: string[];
  configurations: DakkapelConfiguratie[];
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedIds,
  onSelectAll,
  onSelectItem,
  onBulkAction,
  allIds,
  configurations
}) => {
  const [bulkAction, setBulkAction] = React.useState('');
  const checkboxRef = React.useRef<React.ElementRef<typeof CheckboxPrimitive.Root>>(null);
  const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
  const isPartialSelected = selectedIds.length > 0 && selectedIds.length < allIds.length;

  React.useEffect(() => {
    if (checkboxRef.current) {
      // Cast to HTMLInputElement to access the indeterminate property
      const checkboxElement = checkboxRef.current as HTMLInputElement;
      checkboxElement.indeterminate = isPartialSelected;
    }
  }, [isPartialSelected]);

  const handleBulkAction = () => {
    if (bulkAction && selectedIds.length > 0) {
      onBulkAction(bulkAction, selectedIds);
      setBulkAction('');
    }
  };

  const clearSelection = () => {
    selectedIds.forEach(id => onSelectItem(id, false));
  };

  if (selectedIds.length === 0) {
    return (
      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg mb-4">
        <Checkbox
          ref={checkboxRef}
          checked={isAllSelected}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm text-gray-600">Selecteer items voor bulk acties</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg mb-4">
      <Checkbox
        ref={checkboxRef}
        checked={isAllSelected}
        onCheckedChange={onSelectAll}
      />
      
      <span className="text-sm font-medium text-blue-900">
        {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} geselecteerd
      </span>

      <div className="flex items-center gap-2 ml-auto">
        <Select value={bulkAction} onValueChange={setBulkAction}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kies actie..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in_behandeling">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                In behandeling
              </div>
            </SelectItem>
            <SelectItem value="offerte_verzonden">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Offerte verzonden
              </div>
            </SelectItem>
            <SelectItem value="akkoord">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                Akkoord
              </div>
            </SelectItem>
            <SelectItem value="afgehandeld">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Afgehandeld
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={handleBulkAction}
          disabled={!bulkAction}
          size="sm"
        >
          Toepassen
        </Button>

        <Button 
          variant="outline" 
          size="sm"
          onClick={clearSelection}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;
