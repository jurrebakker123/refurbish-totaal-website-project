
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Mail, CheckCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DakkapelConfiguratie } from '@/types/admin';
import { updateRequestDetails, updateRequestStatus } from '@/utils/adminUtils';

interface RequestDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: DakkapelConfiguratie | null;
  onDataChange: () => void;
}

const RequestDetailDialog: React.FC<RequestDetailDialogProps> = ({
  isOpen,
  onClose,
  item,
  onDataChange
}) => {
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('');

  React.useEffect(() => {
    if (item) {
      setNotes(item.notities || '');
      setPrice(item.totaal_prijs ? item.totaal_prijs.toString() : '');
    }
  }, [item]);

  if (!item) return null;
  
  const handleUpdateDetails = async () => {
    const success = await updateRequestDetails(item, notes, price);
    if (success) {
      onDataChange();
      onClose();
    }
  };

  const handleStatusChange = async (status: string) => {
    const success = await updateRequestStatus(item.id, status);
    if (success) {
      onDataChange();
      onClose();
    }
  };

  const contactInfo = (
    <div>
      <p><strong>Naam:</strong> {item.naam}</p>
      <p><strong>Email:</strong> {item.email}</p>
      <p><strong>Telefoon:</strong> {item.telefoon}</p>
      <p><strong>Adres:</strong> {item.adres}, {item.postcode} {item.plaats}</p>
    </div>
  );
  
  const productInfo = (
    <div>
      <p><strong>Model:</strong> {item.model}</p>
      <p><strong>Breedte:</strong> {item.breedte}cm</p>
      <p><strong>Materiaal:</strong> {item.materiaal}</p>
      <p><strong>Dakhelling:</strong> {item.dakhelling ? `${item.dakhelling}° (${item.dakhelling_type})` : 'Niet opgegeven'}</p>
      <p><strong>Kleuren:</strong> Kozijn: {item.kleur_kozijn}, Zijkanten: {item.kleur_zijkanten}, Draaikiepramen: {item.kleur_draaikiepramen}</p>
      <p><strong>Opties:</strong></p>
      <ul>
        <li>Ventilatierooster: {item.ventilationgrids ? 'Ja' : 'Nee'}</li>
        <li>Zonwering: {item.sunshade ? 'Ja' : 'Nee'}</li>
        <li>Insectenhorren: {item.insectscreens ? 'Ja' : 'Nee'}</li>
        <li>Airconditioning: {item.airconditioning ? 'Ja' : 'Nee'}</li>
      </ul>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aanvraag Details</DialogTitle>
          <DialogDescription>
            Bekijk en bewerk de details van deze aanvraag
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Contactgegevens</CardTitle>
            </CardHeader>
            <CardContent>
              {contactInfo}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              {productInfo}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Opmerkingen</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.opmerkingen || 'Geen opmerkingen'}</p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Notities voor intern gebruik</label>
            <Textarea 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Interne notities..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Prijs (€)</label>
            <Input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0,00"
              className="mb-4"
            />
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm"><strong>Status:</strong> {item.status}</p>
                {item.offerte_verzonden_op && (
                  <p className="text-sm"><strong>Offerte verzonden:</strong> {format(new Date(item.offerte_verzonden_op), 'dd MMM yyyy')}</p>
                )}
                {item.afgehandeld_op && (
                  <p className="text-sm"><strong>Afgehandeld op:</strong> {format(new Date(item.afgehandeld_op), 'dd MMM yyyy')}</p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  title="In behandeling"
                  onClick={() => handleStatusChange('in_behandeling')}
                >
                  <Clock className="h-4 w-4 mr-1" /> In behandeling
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  title="Offerte verzonden"
                  onClick={() => handleStatusChange('offerte_verzonden')}
                >
                  <Mail className="h-4 w-4 mr-1" /> Offerte verzonden
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  title="Akkoord"
                  onClick={() => handleStatusChange('akkoord')}
                  className="bg-green-50 hover:bg-green-100"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" /> Akkoord
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  title="Afgehandeld"
                  onClick={() => handleStatusChange('afgehandeld')}
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> Afgehandeld
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuleren</Button>
          <Button onClick={handleUpdateDetails}>Opslaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailDialog;
