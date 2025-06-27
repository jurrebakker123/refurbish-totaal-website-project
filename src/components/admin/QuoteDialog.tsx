
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
import { Mail, Check, X, AlertTriangle, ExternalLink, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { QuoteItem, ZonnepaneelQuoteItem, GenericQuoteItem } from '@/types/admin';
import { sendQuoteEmail } from '@/utils/adminUtils';

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: QuoteItem | ZonnepaneelQuoteItem | null;
  request?: GenericQuoteItem | null;
  onDataChange?: () => void;
  setSendingQuote?: (id: string | null) => void;
  onSendQuote?: (customMessage?: string) => Promise<void>;
  onUpdateDetails?: (notes: string, price: string) => Promise<void>;
  onStatusUpdate?: (status: string) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const QuoteDialog: React.FC<QuoteDialogProps> = ({
  isOpen,
  onClose,
  selectedItem,
  request,
  onDataChange,
  setSendingQuote,
  onSendQuote,
  onUpdateDetails,
  onStatusUpdate,
  onDelete
}) => {
  const [quoteMessage, setQuoteMessage] = useState('');
  const [useDefaultTemplate, setUseDefaultTemplate] = useState(true);
  const [includePdfAttachment, setIncludePdfAttachment] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const item = selectedItem || request;
  const isZonnepaneel = selectedItem && 'isZonnepaneel' in selectedItem;
  
  const defaultTemplate = isZonnepaneel ? `Beste klant,

Hartelijk dank voor uw interesse in onze refurbished zonnepanelen. Wij zijn verheugd u hierbij een offerte te kunnen aanbieden voor het leveren en monteren van zonnepanelen volgens uw specificaties.

De prijs is inclusief:
- Transport naar locatie  
- Montage van de zonnepanelen
- Bekabeling en aansluiting
- Garantie van 5 jaar op de refurbished panelen
- 2 jaar garantie op de montage

Wij hanteren een levertijd van 4-6 weken na definitieve opdracht.

Voor vragen of aanpassingen aan deze offerte kunt u altijd contact met ons opnemen.

Met vriendelijke groet,

Gerard Groeneveld
Refurbish Totaal Nederland
085-1301578
info@refurbishtotaalnederland.nl` : `Beste klant,

Hartelijk dank voor uw interesse in onze diensten. Wij zijn verheugd u hierbij een offerte te kunnen aanbieden volgens uw specificaties.

De prijs is inclusief:
- Transport naar locatie
- Uitvoering van de werkzaamheden
- Afwerking volgens afspraak
- Garantie op uitgevoerde werkzaamheden
- Opruimen na voltooiing

Wij hanteren een levertijd van 2-4 weken na definitieve opdracht.

Voor vragen of aanpassingen aan deze offerte kunt u altijd contact met ons opnemen.

Met vriendelijke groet,

Gerard Groeneveld
Refurbish Totaal Nederland
085-1301578
info@refurbishtotaalnederland.nl`;

  const handleSendQuote = async () => {
    if (!item) {
      toast.error("Geen item geselecteerd");
      return;
    }
    
    if (!item.email) {
      toast.error("Geen email adres gevonden voor deze klant");
      return;
    }
    
    if (onSendQuote) {
      const messageToSend = useDefaultTemplate ? quoteMessage || defaultTemplate : quoteMessage;
      await onSendQuote(messageToSend);
      return;
    }
    
    console.log('Starten met verzenden offerte naar:', item.email);
    console.log('Voor aanvraag:', item.id);
    
    setErrorMessage(null);
    setIsLoading(true);
    if (setSendingQuote) setSendingQuote(item.id);
    
    const messageToSend = useDefaultTemplate ? quoteMessage || defaultTemplate : quoteMessage;
    
    if (!messageToSend.trim()) {
      setErrorMessage("Voeg eerst een bericht toe voordat u de offerte verstuurt.");
      setIsLoading(false);
      if (setSendingQuote) setSendingQuote(null);
      return;
    }
    
    try {
      console.log('Verzenden offerte met bericht lengte:', messageToSend.length);
      console.log('PDF bijlage inbegrepen:', includePdfAttachment);
      
      const success = await sendQuoteEmail(item as any, messageToSend);
      
      if (success) {
        toast.success(`Offerte succesvol verzonden naar ${item.email}!`);
        if (onDataChange) onDataChange();
        onClose();
      } else {
        setErrorMessage("Er is een fout opgetreden bij het verzenden van de offerte. Controleer de edge function logs voor meer details.");
      }
    } catch (error) {
      console.error("Error in handleSendQuote:", error);
      setErrorMessage(`Er is een onverwachte fout opgetreden: ${error instanceof Error ? error.message : 'Onbekende fout'}`);
    } finally {
      setIsLoading(false);
      if (setSendingQuote) setSendingQuote(null);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setQuoteMessage(useDefaultTemplate ? defaultTemplate : '');
      setErrorMessage(null);
      setIsLoading(false);
      setIncludePdfAttachment(true);
    }
  }, [isOpen, useDefaultTemplate, defaultTemplate]);

  const getCustomerName = () => {
    if (!item) return '';
    return item.naam;
  };

  const getCustomerEmail = () => {
    if (!item) return '';
    return item.email;
  };

  if (!item) return null;

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
            <p><strong>Prijs:</strong> {item.totaal_prijs ? 
              `€${item.totaal_prijs}` : 
              'Nog niet ingesteld'}</p>
            {'projectDetails' in item && (
              <p><strong>Project:</strong> {item.projectDetails}</p>
            )}
            {isZonnepaneel && 'aantal_panelen' in item && (
              <p><strong>Aantal panelen:</strong> {item.aantal_panelen}</p>
            )}
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
          
          <div className="flex items-center space-x-2">
            <Button 
              type="button" 
              variant={includePdfAttachment ? "default" : "outline"} 
              onClick={() => setIncludePdfAttachment(!includePdfAttachment)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              {includePdfAttachment ? 'PDF bijlage inbegrepen' : 'Geen PDF bijlage'}
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
              rows={12}
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
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
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
