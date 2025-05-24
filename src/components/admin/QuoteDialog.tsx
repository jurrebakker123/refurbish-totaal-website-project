
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Check, X, AlertTriangle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { QuoteItem } from '@/types/admin';
import { sendQuoteEmail } from '@/utils/adminUtils';

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: QuoteItem | null;
  onDataChange: () => void;
  setSendingQuote: (id: string | null) => void;
}

const QuoteDialog: React.FC<QuoteDialogProps> = ({
  isOpen,
  onClose,
  selectedItem,
  onDataChange,
  setSendingQuote
}) => {
  const [quoteMessage, setQuoteMessage] = useState('');
  const [useDefaultTemplate, setUseDefaultTemplate] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const defaultTemplate = `Beste klant,

Hartelijk dank voor uw interesse in onze dakkapellen. Wij zijn verheugd u hierbij een offerte te kunnen aanbieden voor het leveren en monteren van een dakkapel volgens uw specificaties.

De prijs is inclusief:
- Transport naar locatie
- Montage van de dakkapel
- Afwerking binnen- en buitenzijde
- Garantie van 10 jaar op constructie en waterdichtheid
- 5 jaar garantie op de gebruikte materialen

Wij hanteren een levertijd van 6-8 weken na definitieve opdracht.

Voor vragen of aanpassingen aan deze offerte kunt u altijd contact met ons opnemen.

Met vriendelijke groet,

Het team van Refurbish Totaal Nederland
085-1301578
info@refurbishtotaalnederland.nl`;

  const handleSendQuote = async () => {
    if (!selectedItem) return;
    
    setErrorMessage(null);
    setSendingQuote(selectedItem.id);
    const messageToSend = useDefaultTemplate ? quoteMessage || defaultTemplate : quoteMessage;
    
    try {
      console.log('Verzenden offerte naar:', selectedItem.email);
      console.log('Met bericht:', messageToSend.substring(0, 100) + '...');
      
      const success = await sendQuoteEmail(
        selectedItem, 
        messageToSend
      );
      
      if (success) {
        toast.success("Offerte succesvol verzonden naar " + selectedItem.email + "!");
        onDataChange();
        onClose();
      } else {
        setErrorMessage("Er is een fout opgetreden bij het verzenden van de offerte. Controleer of de RESEND_API_KEY correct is ingesteld in de Supabase edge function secrets.");
      }
    } catch (error) {
      console.error("Error in handleSendQuote:", error);
      setErrorMessage("Er is een onverwachte fout opgetreden. Controleer de console voor meer informatie.");
    } finally {
      setSendingQuote(null);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setQuoteMessage(useDefaultTemplate ? defaultTemplate : '');
      setErrorMessage(null);
    }
  }, [isOpen, useDefaultTemplate]);

  const getCustomerName = () => {
    if (!selectedItem) return '';
    return selectedItem.naam;
  };

  const getCustomerEmail = () => {
    if (!selectedItem) return '';
    return selectedItem.email;
  };

  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Offerte Verzenden</DialogTitle>
          <DialogDescription>
            Verstuur een automatische offerte naar {getCustomerName()} ({getCustomerEmail()})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Klantgegevens:</h4>
            <p><strong>Naam:</strong> {getCustomerName()}</p>
            <p><strong>Email:</strong> {getCustomerEmail()}</p>
            <p><strong>Prijs:</strong> {selectedItem.totaal_prijs ? 
              `€${selectedItem.totaal_prijs}` : 
              'Nog niet ingesteld'}</p>
          </div>
          
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Fout bij verzenden</p>
                <p className="text-sm">{errorMessage}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-xs text-red-600" 
                    onClick={() => window.open("https://supabase.com/dashboard/project/pluhasunoaevfrdugkzg/settings/functions", "_blank")}
                  >
                    Controleer Supabase secrets
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                  <span className="text-xs text-red-600 mx-1">|</span>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-xs text-red-600" 
                    onClick={() => window.open("https://supabase.com/dashboard/project/pluhasunoaevfrdugkzg/functions/send-quote/logs", "_blank")}
                  >
                    Bekijk functie logs
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Button 
              type="button" 
              variant={useDefaultTemplate ? "default" : "outline"} 
              onClick={() => setUseDefaultTemplate(true)}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Gebruik standaard template
            </Button>
            <Button 
              type="button" 
              variant={!useDefaultTemplate ? "default" : "outline"} 
              onClick={() => setUseDefaultTemplate(false)}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Leeg bericht
            </Button>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Bericht voor de offerte
            </label>
            <Textarea
              value={quoteMessage}
              onChange={(e) => setQuoteMessage(e.target.value)}
              placeholder="Voeg een persoonlijk bericht toe aan de offerte..."
              rows={10}
              className="w-full"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuleren
          </Button>
          <Button 
            onClick={handleSendQuote}
            disabled={setSendingQuote !== null}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {setSendingQuote === selectedItem?.id ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Verzenden...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Offerte Verzenden naar {getCustomerEmail()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
