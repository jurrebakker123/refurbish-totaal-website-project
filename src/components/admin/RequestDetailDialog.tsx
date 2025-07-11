
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RequestDetailDialogProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  onDataChange: () => void;
}

const RequestDetailDialog: React.FC<RequestDetailDialogProps> = ({
  item,
  isOpen,
  onClose,
  onDataChange
}) => {
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item && isOpen) {
      setCurrentItem({ ...item });
    }
  }, [item, isOpen]);

  const handleSave = async () => {
    if (!currentItem) return;

    setLoading(true);
    try {
      const isZonnepaneel = 'aantal_panelen' in currentItem;
      const isSchilder = 'project_type' in currentItem && 'verf_type' in currentItem;
      const isStukadoor = 'werk_type' in currentItem && 'afwerking' in currentItem;
      
      let tableName: 'dakkapel_calculator_aanvragen' | 'refurbished_zonnepanelen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen';
      if (isZonnepaneel) tableName = 'refurbished_zonnepanelen';
      else if (isSchilder) tableName = 'schilder_aanvragen';
      else if (isStukadoor) tableName = 'stukadoor_aanvragen';

      const { error } = await supabase
        .from(tableName)
        .update(currentItem)
        .eq('id', currentItem.id);

      if (error) throw error;

      toast.success('Aanvraag succesvol bijgewerkt');
      onDataChange();
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Er is een fout opgetreden bij het bijwerken van de aanvraag');
    } finally {
      setLoading(false);
    }
  };

  if (!currentItem) return null;

  const itemName = currentItem.naam || `${currentItem.voornaam || ''} ${currentItem.achternaam || ''}`.trim() || 'Onbekend';
  const itemEmail = currentItem.email || currentItem.emailadres || '';
  const itemAddress = `${currentItem.straatnaam || ''} ${currentItem.huisnummer || ''}, ${currentItem.postcode || ''} ${currentItem.plaats || ''}`.trim();

  const statusOptions = [
    'nieuw',
    'in_behandeling',
    'offerte_verzonden',
    'interesse_bevestigd',
    'akkoord',
    'niet_akkoord',
    'op_locatie',
    'in_aanbouw',
    'afgehandeld'
  ];

  // Service-specific rendering
  const renderServiceSpecificFields = () => {
    if ('project_type' in currentItem && 'verf_type' in currentItem) {
      // Schilder service
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project Type</Label>
              <div className="p-2 bg-gray-50 rounded">{String(currentItem.project_type || '')}</div>
            </div>
            <div>
              <Label>Verf Type</Label>
              <div className="p-2 bg-gray-50 rounded">{String(currentItem.verf_type || '')}</div>
            </div>
            <div>
              <Label>Oppervlakte (m²)</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.oppervlakte || ''}</div>
            </div>
            <div>
              <Label>Aantal Kamers</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.aantal_kamers ? String(currentItem.aantal_kamers) : 'N.v.t.'}</div>
            </div>
          </div>
          <div>
            <Label>Gewenste Kleur</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.gewenste_kleur ? String(currentItem.gewenste_kleur) : 'N.v.t.'}</div>
          </div>
        </div>
      );
    }

    if ('werk_type' in currentItem && 'afwerking' in currentItem) {
      // Stukadoor service
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Werk Type</Label>
              <div className="p-2 bg-gray-50 rounded">{String(currentItem.werk_type || '')}</div>
            </div>
            <div>
              <Label>Afwerking</Label>
              <div className="p-2 bg-gray-50 rounded">{String(currentItem.afwerking || '')}</div>
            </div>
            <div>
              <Label>Oppervlakte (m²)</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.oppervlakte || ''}</div>
            </div>
            <div>
              <Label>Aantal Kamers</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.aantal_kamers ? String(currentItem.aantal_kamers) : 'N.v.t.'}</div>
            </div>
          </div>
          <div>
            <Label>Voorbewerking</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.voorbewerking ? String(currentItem.voorbewerking) : 'N.v.t.'}</div>
          </div>
        </div>
      );
    }

    if ('aantal_panelen' in currentItem) {
      // Zonnepaneel service
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Aantal Panelen</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.aantal_panelen || ''}</div>
            </div>
            <div>
              <Label>Vermogen (W)</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.vermogen || ''}</div>
            </div>
            <div>
              <Label>Merk</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.merk || ''}</div>
            </div>
            <div>
              <Label>Type Paneel</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.type_paneel || ''}</div>
            </div>
            <div>
              <Label>Conditie</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.conditie || ''}</div>
            </div>
            <div>
              <Label>Dak Type</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.dak_type || ''}</div>
            </div>
          </div>
        </div>
      );
    }

    // Dakkapel service - show all configurator details
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.type || ''}</div>
          </div>
          <div>
            <Label>Model</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.model || ''}</div>
          </div>
          <div>
            <Label>Materiaal</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.materiaal || ''}</div>
          </div>
          <div>
            <Label>Breedte (cm)</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.breedte || ''}</div>
          </div>
          <div>
            <Label>Hoogte (cm)</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.hoogte || ''}</div>
          </div>
          <div>
            <Label>Aantal Ramen</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.aantalramen || ''}</div>
          </div>
          <div>
            <Label>Dakhelling (°)</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.dakhelling || ''}</div>
          </div>
          <div>
            <Label>Dakhelling Type</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.dakhellingtype || ''}</div>
          </div>
          <div>
            <Label>Kozijn Hoogte</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.kozijnhoogte || ''}</div>
          </div>
          <div>
            <Label>RC Waarde</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.rcwaarde || ''}</div>
          </div>
          <div>
            <Label>Woning Zijde</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.woningzijde || ''}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Kleur Kozijnen</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.kleurkozijnen || currentItem.kleur_kozijn || ''}</div>
          </div>
          <div>
            <Label>Kleur Zijkanten</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.kleurzijkanten || currentItem.kleur_zijkanten || ''}</div>
          </div>
          <div>
            <Label>Kleur Draaikiepramen</Label>
            <div className="p-2 bg-gray-50 rounded">{currentItem.kleurdraaikiepramen || currentItem.kleur_draaikiepramen || ''}</div>
          </div>
        </div>
        {/* Show extras if available */}
        {(currentItem.ventilationgrids || currentItem.sunshade || currentItem.insectscreens || currentItem.airconditioning) && (
          <div>
            <Label>Extra Opties</Label>
            <div className="p-2 bg-gray-50 rounded space-y-1">
              {currentItem.ventilationgrids && <div>✓ Ventilatie roosters</div>}
              {currentItem.sunshade && <div>✓ Zonwering</div>}
              {currentItem.insectscreens && <div>✓ Insectenschermen</div>}
              {currentItem.airconditioning && <div>✓ Airconditioning</div>}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aanvraag Details - {itemName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Naam</Label>
              <div className="p-2 bg-gray-50 rounded">{itemName}</div>
            </div>
            <div>
              <Label>Email</Label>
              <div className="p-2 bg-gray-50 rounded">{itemEmail}</div>
            </div>
            <div>
              <Label>Telefoon</Label>
              <div className="p-2 bg-gray-50 rounded">{currentItem.telefoon || 'N.v.t.'}</div>
            </div>
            <div>
              <Label>Adres</Label>
              <div className="p-2 bg-gray-50 rounded">{itemAddress}</div>
            </div>
          </div>

          {renderServiceSpecificFields()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={currentItem.status || 'nieuw'} 
                onValueChange={(value) => setCurrentItem({...currentItem, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="totaal_prijs">Totaal Prijs (€)</Label>
              <Input
                id="totaal_prijs"
                type="number"
                value={currentItem.totaal_prijs || ''}
                onChange={(e) => setCurrentItem({...currentItem, totaal_prijs: parseFloat(e.target.value) || null})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notities">Notities</Label>
            <Textarea
              id="notities"
              value={currentItem.notities || ''}
              onChange={(e) => setCurrentItem({...currentItem, notities: e.target.value})}
              rows={4}
            />
          </div>

          {(currentItem.bericht || currentItem.opmerkingen) && (
            <div>
              <Label>Klant Bericht/Opmerkingen</Label>
              <div className="p-3 bg-gray-50 rounded">
                {currentItem.bericht || currentItem.opmerkingen || 'Geen bericht'}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuleren
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Opslaan...' : 'Opslaan'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailDialog;
