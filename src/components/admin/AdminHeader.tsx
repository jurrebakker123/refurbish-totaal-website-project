import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
type AdminHeaderProps = {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onDataChange: () => void;
};
const AdminHeader: React.FC<AdminHeaderProps> = ({
  showMobileMenu,
  setShowMobileMenu,
  activeView,
  setActiveView,
  onDataChange
}) => {
  return <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-gray-700" />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-brand-darkGreen">Refurbish Totaal Nederland</h1>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Admin Dashboard</span>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminHeader;