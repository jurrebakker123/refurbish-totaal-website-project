
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import MobileRequestCard from '@/components/admin/MobileRequestCard';

interface ResponsiveRequestTableProps {
  configuraties?: any[];
  zonnepanelen?: any[];
  onViewDetails: (item: any) => void;
  onOpenQuoteDialog: (item: any) => void;
  onDataChange: () => void;
  sendingQuote?: string | null;
  type: 'dakkapel' | 'zonnepaneel';
}

const ResponsiveRequestTable = ({
  configuraties,
  zonnepanelen,
  onViewDetails,
  onOpenQuoteDialog,
  onDataChange,
  sendingQuote,
  type
}: ResponsiveRequestTableProps) => {
  const isMobile = useIsMobile();
  const items = configuraties || zonnepanelen || [];

  if (isMobile) {
    return (
      <div className="space-y-1">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Geen aanvragen gevonden</p>
          </div>
        ) : (
          items.map((item) => (
            <MobileRequestCard
              key={item.id}
              item={item}
              onViewDetails={onViewDetails}
              onOpenQuoteDialog={onOpenQuoteDialog}
              type={type}
              sendingQuote={sendingQuote}
            />
          ))
        )}
      </div>
    );
  }

  return (
    <ConfiguratorRequestsTable
      configuraties={configuraties}
      zonnepanelen={zonnepanelen}
      onViewDetails={onViewDetails}
      onOpenQuoteDialog={onOpenQuoteDialog}
      onDataChange={onDataChange}
      sendingQuote={sendingQuote}
      type={type}
    />
  );
};

export default ResponsiveRequestTable;
