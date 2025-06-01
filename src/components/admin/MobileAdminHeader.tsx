import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, RefreshCw, LogOut, Home, Calculator, Sun } from 'lucide-react';
import EmailMarketingDialog from '@/components/admin/EmailMarketingDialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileAdminHeaderProps {
  title: string;
  onRefresh: () => void;
  onDataChange?: () => void;
  showEmailMarketing?: boolean;
}

const MobileAdminHeader = ({ 
  title, 
  onRefresh, 
  onDataChange, 
  showEmailMarketing = true 
}: MobileAdminHeaderProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const navigationItems = [
    { href: '/admin-dashboard', icon: Home, label: 'Hoofddashboard' },
    { href: '/admin-dakkapel', icon: Calculator, label: 'Dakkapel Dashboard' },
    { href: '/admin-zonnepanelen', icon: Sun, label: 'Zonnepanelen Dashboard' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/admin';
  };

  if (!isMobile) {
    // Desktop header - keep existing design
    return (
      <header className="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-brand-darkGreen">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {showEmailMarketing && onDataChange && (
            <EmailMarketingDialog onCampaignSent={onDataChange} />
          )}
          <Button onClick={onRefresh} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Vernieuwen
          </Button>
          <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Uitloggen</span>
          </Button>
        </div>
      </header>
    );
  }

  // Mobile header with hamburger menu
  return (
    <header className="bg-white border-b border-gray-200 h-14 px-4 flex items-center justify-between sticky top-0 z-50">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-brand-darkGreen">RTN Admin</h2>
            </div>
            
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-brand-darkGreen" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ))}
              </div>
            </nav>
            
            <div className="p-4 border-t space-y-2">
              {showEmailMarketing && onDataChange && (
                <EmailMarketingDialog onCampaignSent={onDataChange} />
              )}
              <Button 
                onClick={onRefresh} 
                variant="outline" 
                className="w-full flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Vernieuwen
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Uitloggen
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold text-brand-darkGreen truncate">{title}</h1>
      
      <Button onClick={onRefresh} variant="ghost" size="sm" className="p-2">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </header>
  );
};

export default MobileAdminHeader;
