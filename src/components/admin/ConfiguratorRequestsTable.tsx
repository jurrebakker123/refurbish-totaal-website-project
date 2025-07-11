
import React from 'react';
import ResponsiveRequestTable from './ResponsiveRequestTable';
import { DakkapelConfiguratie } from '@/types/admin';

interface ConfiguratorRequestsTableProps {
  configuraties: DakkapelConfiguratie[];
  onViewDetails: (item: any) => void;
  onOpenQuoteDialog: (item: any) => void;
  onDataChange: () => void;
  sendingQuote: string | null;
  selectedIds?: string[];
  onSelectItem?: (id: string, checked: boolean) => void;
  type?: 'dakkapel' | 'zonnepaneel' | 'schilder' | 'stukadoor';
  onStatusFilter?: (status: string) => void;
}

const ConfiguratorRequestsTable: React.FC<ConfiguratorRequestsTableProps> = ({
  configuraties,
  onViewDetails,
  onOpenQuoteDialog,
  onDataChange,
  sendingQuote,
  selectedIds = [],
  onSelectItem,
  type = 'dakkapel',
  onStatusFilter
}) => {
  return (
    <ResponsiveRequestTable
      items={configuraties}
      searchTerm=""
      selectedStatus="all"
      onEdit={onViewDetails}
      onDataChange={onDataChange}
      sendingQuote={sendingQuote}
      setSendingQuote={() => {}}
      onStatusFilter={onStatusFilter}
    />
  );
};

export default ConfiguratorRequestsTable;
