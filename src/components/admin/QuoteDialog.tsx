
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
import { Mail } from 'lucide-react';
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

  const handleSendQuote = async () => {
    if (!selectedItem) return;
    
    setSendingQuote(true);
    const success = await sendQuoteEmail(
      selectedItem, 
      selectedItem.isCalculator, 
      quoteMessage
    );
    
    if (success) {
      onDataChange();
      onClose();
    }
    setSendingQuote(false);
  };

  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Offerte Verzenden</DialogTitle>
          <DialogDescription>
            Verstuur een automatische offerte naar {
              selectedItem.isCalculator ? 
              `${selectedItem.voornaam} ${selectedItem.achternaam}` : 
              selectedItem.naam
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Klantgegevens:</h4>
            <p><strong>Naam:</strong> {selectedItem.isCalculator ? 
              `${selectedItem.voornaam} ${selectedItem.achternaam}` : 
              selectedItem.naam}</p>
            <p><strong>Email:</strong> {selectedItem.isCalculator ? 
              selectedItem.emailadres : 
              selectedItem.email}</p>
            <p><strong>Prijs:</strong> {selectedItem.totaal_prijs ? 
              `€${selectedItem.totaal_prijs}` : 
              'Nog niet ingesteld'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Persoonlijk bericht (optioneel)
            </label>
            <Textarea
              value={quoteMessage}
              onChange={(e) => setQuoteMessage(e.target.value)}
              placeholder="Voeg een persoonlijk bericht toe aan de offerte..."
              rows={4}
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
