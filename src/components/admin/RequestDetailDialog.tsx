
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { updateRequestStatus, updateRequestDetails, sendQuoteEmail, deleteQuote } from '@/utils/adminUtils';
import { Mail, Phone, MapPin, Calendar, Euro, FileText, Edit, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface RequestDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onDataChange: () => void;
}

const RequestDetailDialog: React.FC<RequestDetailDialogProps> = ({
  isOpen,
  onClose,
  item,
  onDataChange
}) => {
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState(item?.notities || '');
  const [price, setPrice] = useState(item?.totaal_prijs?.toString() || '');
  const [loading, setLoading] = useState(false);

  if (!item) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE dd MMMM yyyy, HH:mm', { locale: nl });
    } catch (error) {
      return 'Ongeldige datum';
    }
  };

  const getStatusLabel = (status: string) => {
    if (!status) return 'Onbekend';
    
    switch (status.toLowerCase()) {
      case 'nieuw': return 'Nieuw';
      case 'in_behandeling': return 'In Behandeling';
      case 'offerte_verzonden': return 'Offerte Verzonden';
      case 'interesse_bevestigd': return 'Interesse Bevestigd';
      case 'akkoord': return 'Akkoord';
      case 'niet_akkoord': return 'Niet Akkoord';
      case 'op_locatie': return 'Op Locatie';
      case 'in_aanbouw': return 'In Aanbouw';
      case 'afgehandeld': return 'Afgehandeld';
      default: return status;
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);
    try {
      const isDakkapel = 'breedte' in item || 'aantalramen' in item;
      const isSchilder = 'project_type' in item && 'verf_type' in item;
      const isStukadoor = 'werk_type' in item && 'afwerking' in item;
      
      let tableName: 'dakkapel_calculator_aanvragen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen';
      if (isSchilder) tableName = 'schilder_aanvragen';
      else if (isStukadoor) tableName = 'stukadoor_aanvragen';
      
      const success = await updateRequestStatus(item.id, newStatus, tableName);
      if (success) {
        onDataChange();
        toast.success(`Status bijgewerkt naar: ${getStatusLabel(newStatus)}`);
      }
    } catch (error) {
      toast.error('Fout bij bijwerken van status');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const isDakkapel = 'breedte' in item || 'aantalramen' in item;
      const isSchilder = 'project_type' in item && 'verf_type' in item;
      const isStukadoor = 'werk_type' in item && 'afwerking' in item;
      
      let tableName: 'dakkapel_calculator_aanvragen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen';
      if (isSchilder) tableName = 'schilder_aanvragen';
      else if (isStukadoor) tableName = 'stukadoor_aanvragen';
      
      const success = await updateRequestDetails(item, notes, price, tableName);
      if (success) {
        setEditMode(false);
        onDataChange();
        toast.success('Gegevens opgeslagen');
      }
    } catch (error) {
      toast.error('Fout bij opslaan');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Weet je zeker dat je deze aanvraag wilt verwijderen?')) return;
    
    setLoading(true);
    try {
      const isDakkapel = 'breedte' in item || 'aantalramen' in item;
      const isSchilder = 'project_type' in item && 'verf_type' in item;
      const isStukadoor = 'werk_type' in item && 'afwerking' in item;
      
      let tableName: 'dakkapel_calculator_aanvragen' | 'schilder_aanvragen' | 'stukadoor_aanvragen' = 'dakkapel_calculator_aanvragen';
      if (isSchilder) tableName = 'schilder_aanvragen';
      else if (isStukadoor) tableName = 'stukadoor_aanvragen';
      
      const success = await deleteQuote(item.id, tableName);
      if (success) {
        onClose();
        onDataChange();
        toast.success('Aanvraag verwijderd');
      }
    } catch (error) {
      toast.error('Fout bij verwijderen');
    } finally {
      setLoading(false);
    }
  };

  const renderConfiguratorDetails = () => {
    const isDakkapel = 'breedte' in item || 'aantalramen' in item;
    const isSchilder = 'project_type' in item && 'verf_type' in item;
    const isStukadoor = 'werk_type' in item && 'afwerking' in item;

    if (isDakkapel) {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Afmetingen & Type</h4>
            {item.type && <p><span className="font-medium">Type:</span> {item.type}</p>}
            {item.breedte && <p><span className="font-medium">Breedte:</span> {item.breedte}cm</p>}
            {item.hoogte && <p><span className="font-medium">Hoogte:</span> {item.hoogte}cm</p>}
            {item.aantalramen && <p><span className="font-medium">Aantal ramen:</span> {item.aantalramen}</p>}
            {item.dakhelling && <p><span className="font-medium">Dakhelling:</span> {item.dakhelling}°</p>}
            {item.dakhellingtype && <p><span className="font-medium">Dakhelling type:</span> {item.dakhellingtype}</p>}
            {item.woningzijde && <p><span className="font-medium">Woningzijde:</span> {item.woningzijde}</p>}
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Materiaal & Kleuren</h4>
            {item.materiaal && <p><span className="font-medium">Materiaal:</span> {item.materiaal}</p>}
            {item.kozijnhoogte && <p><span className="font-medium">Kozijn hoogte:</span> {item.kozijnhoogte}</p>}
            {item.kleurkozijnen && <p><span className="font-medium">Kleur kozijnen:</span> {item.kleurkozijnen}</p>}
            {item.kleurzijkanten && <p><span className="font-medium">Kleur zijkanten:</span> {item.kleurzijkanten}</p>}
            {item.kleurdraaikiepramen && <p><span className="font-medium">Kleur draaikiepramen:</span> {item.kleurdraaikiepramen}</p>}
            {item.rcwaarde && <p><span className="font-medium">RC waarde:</span> {item.rcwaarde}</p>}
          </div>
          {item.opties && Object.keys(item.opties).length > 0 && (
            <div className="md:col-span-2 space-y-2">
              <h4 className="font-semibold text-gray-700">Extra Opties</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(item.opties).map(([key, value]) => 
                  value && (
                    <Badge key={key} variant="secondary">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (isSchilder) {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Project Details</h4>
            <p><span className="font-medium">Project type:</span> {item.project_type}</p>
            <p><span className="font-medium">Oppervlakte:</span> {item.oppervlakte} m²</p>
            {item.aantal_kamers && <p><span className="font-medium">Aantal kamers:</span> {item.aantal_kamers}</p>}
            <p><span className="font-medium">Verf type:</span> {item.verf_type}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Kleuren & Extra's</h4>
            {item.huidige_kleur && <p><span className="font-medium">Huidige kleur:</span> {item.huidige_kleur}</p>}
            {item.gewenste_kleur && <p><span className="font-medium">Gewenste kleur:</span> {item.gewenste_kleur}</p>}
            <div className="space-y-1">
              {item.voorbewerking_nodig && <Badge variant="secondary">Voorbewerking nodig</Badge>}
              {item.plafond_meeverven && <Badge variant="secondary">Plafond meeverven</Badge>}
              {item.kozijnen_meeverven && <Badge variant="secondary">Kozijnen meeverven</Badge>}
            </div>
          </div>
        </div>
      );
    }

    if (isStukadoor) {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Werk Details</h4>
            <p><span className="font-medium">Werk type:</span> {item.werk_type}</p>
            <p><span className="font-medium">Oppervlakte:</span> {item.oppervlakte} m²</p>
            {item.aantal_kamers && <p><span className="font-medium">Aantal kamers:</span> {item.aantal_kamers}</p>}
            <p><span className="font-medium">Afwerking:</span> {item.afwerking}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Staat & Extra's</h4>
            {item.huidige_staat && <p><span className="font-medium">Huidige staat:</span> {item.huidige_staat}</p>}
            {item.voorbewerking && <p><span className="font-medium">Voorbewerking:</span> {item.voorbewerking}</p>}
            <div className="space-y-1">
              {item.isolatie_gewenst && <Badge variant="secondary">Isolatie gewenst</Badge>}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

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

  const customerName = item.naam || `${item.voornaam} ${item.achternaam}` || 'Onbekend';
  const customerEmail = item.email || item.emailadres || '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Aanvraag Details - {customerName}</span>
            <Badge variant="outline" className="ml-2">
              {getStatusLabel(item.status || 'nieuw')}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Klant Informatie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Klant Informatie
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{customerEmail}</span>
                </div>
                {item.telefoon && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{item.telefoon}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
              <div className="space-y-2">
                {(item.adres || (item.straatnaam && item.huisnummer)) && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <div>{item.adres || `${item.straatnaam} ${item.huisnummer}`}</div>
                      <div>{item.postcode} {item.plaats}</div>
                    </div>
                  </div>
                )}
                {item.totaal_prijs && (
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-gray-500" />
                    <span>€{item.totaal_prijs.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Configurator Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              {renderConfiguratorDetails()}
              {(item.bericht || item.opmerkingen) && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-gray-700 mb-2">Opmerkingen</h4>
                  <p className="text-gray-600">{item.bericht || item.opmerkingen}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Wijzigen */}
          <Card>
            <CardHeader>
              <CardTitle>Status Wijzigen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    variant={item.status === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusUpdate(status)}
                    disabled={loading || item.status === status}
                    className="text-xs"
                  >
                    {getStatusLabel(status)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notities en Prijs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Admin Notities & Prijs
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {editMode ? 'Annuleren' : 'Bewerken'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Notities</Label>
                {editMode ? (
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Voeg notities toe..."
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-600 min-h-[60px] p-2 border rounded">
                    {notes || 'Geen notities toegevoegd'}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="price">Totaalprijs (€)</Label>
                {editMode ? (
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                  />
                ) : (
                  <p className="text-gray-600 p-2 border rounded">
                    {price ? `€${Number(price).toLocaleString()}` : 'Geen prijs ingesteld'}
                  </p>
                )}
              </div>
              {editMode && (
                <Button onClick={handleSave} disabled={loading} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Opslaan
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Acties */}
          <div className="flex justify-between">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Verwijderen
            </Button>
            <Button onClick={onClose} variant="outline">
              Sluiten
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailDialog;
