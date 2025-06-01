
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, X } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show prompt on admin pages
      if (window.location.pathname.includes('/admin')) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('RTN Admin app wordt geïnstalleerd!');
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || 
      sessionStorage.getItem('pwa-prompt-dismissed') === 'true' || 
      !showPrompt || 
      !deferredPrompt) {
    return null;
  }

  return (
    <Card className={`fixed ${isMobile ? 'bottom-2 left-2 right-2' : 'bottom-4 right-4 w-80'} z-50 shadow-lg border-green-200 bg-green-50`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} flex items-center gap-2`}>
            <Smartphone className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            RTN Admin App
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={dismissPrompt}
            className={`${isMobile ? 'h-5 w-5 p-0' : 'h-6 w-6 p-0'}`}
          >
            <X className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600 mb-3`}>
          Installeer de RTN Admin app voor snelle toegang tot je dashboard
        </p>
        <Button 
          onClick={handleInstall}
          size="sm"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Download className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-3 w-3 mr-2'}`} />
          <span className={isMobile ? 'text-xs' : ''}>Installeer App</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PWAInstallPrompt;
