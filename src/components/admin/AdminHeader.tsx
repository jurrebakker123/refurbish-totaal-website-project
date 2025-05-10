
import React from 'react';
import { LogOut, ChevronRight } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

type AdminHeaderProps = {
  onLogout: () => void;
};

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-gray-700" />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-brand-darkGreen">Refurbish Dakkapel</h1>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Admin Dashboard</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        <span>Uitloggen</span>
      </Button>
    </header>
  );
};

export default AdminHeader;
