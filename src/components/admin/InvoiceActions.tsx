
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Send, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface InvoiceActionsProps {
  item: any;
  onInvoiceSent: () => void;
}

const InvoiceActions: React.FC<InvoiceActionsProps> = ({ item, onInvoiceSent }) => {
  const [isCustomerInvoiceOpen, setIsCustomerInvoiceOpen] = useState(false);
  const [isSpecialistInvoiceOpen, setIsSpecialistInvoiceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [customerInvoice, setCustomerInvoice] = useState({
    bedrag: item.totaal_prijs || '',
    beschrijving: 'Dakkapel werkzaamheden uitgevoerd conform offerte',
    vervaldatum: ''
  });
  
  const [specialistInvoice, setSpecialistInvoice] = useState({
    bedrijfsnaam: '',
    email: '',
    bedrag: '',
    beschrijving: 'Vakspecialist werkzaamheden voor dakkapel project',
    vervaldatum: ''
  });

  const handleCustomerInvoice = async () => {
    if (!customerInvoice.bedrag || !customerInvoice.beschrijving) {
      toast.error('Vul alle vereiste velden in');
      return;
    }

    setLoading(true);
    try {
      const invoiceData = {
        customerName: item.naam,
        customerEmail: item.email,
        customerAddress: `${item.adres}, ${item.postcode} ${item.plaats}`,
        description: customerInvoice.beschrijving,
        amount: parseFloat(customerInvoice.bedrag.toString().replace(',', '.')),
        dueDate: customerInvoice.vervaldatum,
        projectDetails: item.model ? `Dakkapel Model: ${item.model}` : `${item.aantal_panelen}x ${item.type_paneel}`,
        type: 'customer'
      };

      const { data, error } = await supabase.functions.invoke('generate-invoice-pdf', {
        body: {
          invoiceData,
          type: 'customer'
        }
      });

      if (error) {
        toast.error('Fout bij genereren factuur: ' + error.message);
        return;
      }

      if (data.success) {
        toast.success(`✅ ${data.message}`);
        setIsCustomerInvoiceOpen(false);
        setCustomerInvoice({
          bedrag: item.totaal_prijs || '',
          beschrijving: 'Dakkapel werkzaamheden uitgevoerd conform offerte',
          vervaldatum: ''
        });
        onInvoiceSent();
      } else {
        toast.error('Fout bij genereren factuur: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating customer invoice:', error);
      toast.error('Onverwachte fout bij genereren factuur');
    } finally {
      setLoading(false);
    }
  };

  const handleSpecialistInvoice = async () => {
    if (!specialistInvoice.bedrijfsnaam || !specialistInvoice.email || !specialistInvoice.bedrag || !specialistInvoice.beschrijving) {
      toast.error('Vul alle vereiste velden in');
      return;
    }

    setLoading(true);
    try {
      const invoiceData = {
        customerName: specialistInvoice.bedrijfsnaam,
        customerEmail: specialistInvoice.email,
        customerAddress: 'Vakspecialist adres',
        description: specialistInvoice.beschrijving,
        amount: parseFloat(specialistInvoice.bedrag.toString().replace(',', '.')),
        dueDate: specialistInvoice.vervaldatum,
        projectDetails: `Dakkapel Project: ${item.naam} - ${item.adres}`,
        type: 'specialist'
      };

      const { data, error } = await supabase.functions.invoke('generate-invoice-pdf', {
        body: {
          invoiceData,
          type: 'specialist'
        }
      });

      if (error) {
        toast.error('Fout bij genereren factuur: ' + error.message);
        return;
      }

      if (data.success) {
        toast.success(`✅ ${data.message}`);
        setIsSpecialistInvoiceOpen(false);
        setSpecialistInvoice({
          bedrijfsnaam: '',
          email: '',
          bedrag: '',
          beschrijving: 'Vakspecialist werkzaamheden voor dakkapel project',
          vervaldatum: ''
        });
        onInvoiceSent();
      } else {
        toast.error('Fout bij genereren factuur: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating specialist invoice:', error);
      toast.error('Onverwachte fout bij genereren factuur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Factuur naar klant */}
      <Dialog open={isCustomerInvoiceOpen} onOpenChange={setIsCustomerInvoiceOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
            <Mail className="w-4 h-4 mr-1" />
            Factuur Klant
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-700">💰 Factuur naar Klant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p><strong>Klant:</strong> {item.naam}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Project:</strong> Dakkapel {item.model}</p>
            </div>
            
            <div>
              <Label htmlFor="bedrag">Factuurbedrag (€) *</Label>
              <Input
                id="bedrag"
                type="number"
                step="0.01"
                value={customerInvoice.bedrag}
                onChange={(e) => setCustomerInvoice({...customerInvoice, bedrag: e.target.value})}
                placeholder="0.00"
                className="text-lg font-semibold"
              />
            </div>
            
            <div>
              <Label htmlFor="beschrijving">Beschrijving werkzaamheden *</Label>
              <Textarea
                id="beschrijving"
                value={customerInvoice.beschrijving}
                onChange={(e) => setCustomerInvoice({...customerInvoice, beschrijving: e.target.value})}
                placeholder="Beschrijving van de uitgevoerde werkzaamheden..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="vervaldatum">Vervaldatum</Label>
              <Input
                id="vervaldatum"
                type="date"
                value={customerInvoice.vervaldatum}
                onChange={(e) => setCustomerInvoice({...customerInvoice, vervaldatum: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Laat leeg voor "Op aanvraag"</p>
            </div>
            
            <Button 
              onClick={handleCustomerInvoice} 
              disabled={loading || !customerInvoice.bedrag || !customerInvoice.beschrijving} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? '📧 Versturen...' : '📧 Genereer & Verstuur PDF Factuur'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Factuur naar vakspecialist */}
      <Dialog open={isSpecialistInvoiceOpen} onOpenChange={setIsSpecialistInvoiceOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
            <Send className="w-4 h-4 mr-1" />
            Factuur Specialist
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-blue-700">🔧 Factuur naar Vakspecialist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p><strong>Dakkapel Project:</strong> {item.naam}</p>
              <p><strong>Locatie:</strong> {item.adres}</p>
              <p><strong>Model:</strong> {item.model}</p>
            </div>
            
            <div>
              <Label htmlFor="bedrijfsnaam">Bedrijfsnaam Vakspecialist *</Label>
              <Input
                id="bedrijfsnaam"
                value={specialistInvoice.bedrijfsnaam}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, bedrijfsnaam: e.target.value})}
                placeholder="Naam van het vakspecialist bedrijf"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-email">Email Vakspecialist *</Label>
              <Input
                id="specialist-email"
                type="email"
                value={specialistInvoice.email}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, email: e.target.value})}
                placeholder="email@vakspecialist.nl"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-bedrag">Factuurbedrag (€) *</Label>
              <Input
                id="specialist-bedrag"
                type="number"
                step="0.01"
                value={specialistInvoice.bedrag}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, bedrag: e.target.value})}
                placeholder="0.00"
                className="text-lg font-semibold"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-beschrijving">Beschrijving werkzaamheden *</Label>
              <Textarea
                id="specialist-beschrijving"
                value={specialistInvoice.beschrijving}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, beschrijving: e.target.value})}
                placeholder="Beschrijving van de vakspecialist werkzaamheden..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-vervaldatum">Vervaldatum</Label>
              <Input
                id="specialist-vervaldatum"
                type="date"
                value={specialistInvoice.vervaldatum}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, vervaldatum: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Laat leeg voor "Op aanvraag"</p>
            </div>
            
            <Button 
              onClick={handleSpecialistInvoice} 
              disabled={loading || !specialistInvoice.bedrijfsnaam || !specialistInvoice.email || !specialistInvoice.bedrag || !specialistInvoice.beschrijving} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? '📧 Versturen...' : '📧 Genereer & Verstuur PDF Factuur'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceActions;
