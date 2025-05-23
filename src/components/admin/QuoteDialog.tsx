
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
import { Mail, Check, X } from 'lucide-react';
import { QuoteItem } from '@/types/admin';
import { sendQuoteEmail } from '@/utils/adminUtils';

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: QuoteItem | null;
  onDataChange: () => void;
}

const QuoteDialog: React.FC<QuoteDialogProps> = ({
  isOpen,
  onClose,
  selectedItem,
  onDataChange
}) => {
  const [quoteMessage, setQuoteMessage] = useState('');
  const [sendingQuote, setSendingQuote] = useState(false);
  const [useDefaultTemplate, setUseDefaultTemplate] = useState(true);
  
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
    
    setSendingQuote(true);
    const messageToSend = useDefaultTemplate ? quoteMessage || defaultTemplate : quoteMessage;
    
    const success = await sendQuoteEmail(
      selectedItem, 
      selectedItem.isCalculator, 
      messageToSend
    );
    
    if (success) {
      onDataChange();
      onClose();
    }
    setSendingQuote(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      setQuoteMessage(useDefaultTemplate ? defaultTemplate : '');
    }
  }, [isOpen, useDefaultTemplate]);

  const getCustomerName = () => {
    if (!selectedItem) return '';
    
    return selectedItem.isCalculator ? 
      `${selectedItem.voornaam} ${selectedItem.achternaam}` : 
      selectedItem.naam;
  };

  const getCustomerEmail = () => {
    if (!selectedItem) return '';
    
    return selectedItem.isCalculator ? 
      selectedItem.emailadres : 
      selectedItem.email;
  };

  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Offerte Verzenden</DialogTitle>
          <DialogDescription>
            Verstuur een automatische offerte naar {getCustomerName()}
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
            disabled={sendingQuote}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {sendingQuote ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Verzenden...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Offerte Verzenden
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
