
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelHero } from '@/components/dakkapel/DakkapelHero';
import { DakkapelVoordelen } from '@/components/dakkapel/DakkapelVoordelen';
import { DakkapelProcess } from '@/components/dakkapel/DakkapelProcess';
import { DakkapelTypes } from '@/components/dakkapel/DakkapelTypes';
import { DakkapelGallery } from '@/components/dakkapel/DakkapelGallery';
import { DakkapelFAQ } from '@/components/dakkapel/DakkapelFAQ';
import { DakkapelCTA } from '@/components/dakkapel/DakkapelCTA';
import { Helmet } from 'react-helmet';
import { CommandDialog, CommandInput } from '@/components/ui/command';
import { Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DakkapelLandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const handleSearchNotification = (event: CustomEvent) => {
      setNotification(event.detail.message);
    };

    // Add event listener for the custom notification event
    window.addEventListener('search-notification', handleSearchNotification as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('search-notification', handleSearchNotification as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Refurbish Dakkapel | Professionele Dakkapellen op Maat</title>
        <meta name="description" content="Vergroot uw woonruimte met een kwalitatieve dakkapel. Compleet verzorgd met 10 jaar garantie door Refurbish Totaal Nederland." />
        <meta name="keywords" content="dakkapel, dakkapel op maat, prefab dakkapel, dakkapel plaatsen, dakkapel kosten, dakkapel renoveren" />
        <link rel="canonical" href="https://www.refurbishtotaalnederland.nl/refurbishdakkapel/" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Refurbish Dakkapel",
            "url": "https://www.refurbishtotaalnederland.nl/refurbishdakkapel/",
            "provider": {
              "@type": "Organization",
              "name": "Refurbish Totaal Nederland",
              "url": "https://www.refurbishtotaalnederland.nl"
            },
            "description": "Professionele dakkapellen op maat, prefab dakkapellen en renovatie van bestaande dakkapellen. Compleet verzorgd met 10 jaar garantie.",
            "areaServed": "Nederland"
          })}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-4 relative z-10">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="relative w-full sm:w-64 justify-start text-sm text-muted-foreground bg-white"
              onClick={() => setOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Zoeken...</span>
              {notification && (
                <div className="absolute right-2 flex items-center text-brand-lightGreen font-medium gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  <span className="animate-pulse">{notification}</span>
                </div>
              )}
            </Button>
          </div>
          
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Zoek op onze website..." />
          </CommandDialog>
        </div>

        <DakkapelHero />
        <DakkapelVoordelen />
        <DakkapelTypes />
        <DakkapelProcess />
        <DakkapelGallery />
        <DakkapelFAQ />
        <DakkapelCTA />
      </main>
      <Footer />
    </div>
  );
};

export default DakkapelLandingPage;
