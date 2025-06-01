
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Send, Plus } from 'lucide-react';
import { toast } from 'sonner';

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
    beschrijving: '',
    vervaldatum: ''
  });
  
  const [specialistInvoice, setSpecialistInvoice] = useState({
    bedrijfsnaam: '',
    email: '',
    bedrag: '',
    beschrijving: '',
    vervaldatum: ''
  });

  const handleCustomerInvoice = async () => {
    setLoading(true);
    try {
      // Hier zou de factuur logica komen - bijvoorbeeld via een edge function
      console.log('Verstuur factuur naar klant:', {
        klant: item.naam,
        email: item.email,
        ...customerInvoice
      });
      
      toast.success('Factuur succesvol verzonden naar klant!');
      setIsCustomerInvoiceOpen(false);
      onInvoiceSent();
    } catch (error) {
      toast.error('Fout bij versturen factuur');
    } finally {
      setLoading(false);
    }
  };

  const handleSpecialistInvoice = async () => {
    setLoading(true);
    try {
      // Hier zou de factuur logica komen - bijvoorbeeld via een edge function
      console.log('Verstuur factuur naar specialist:', {
        project: `${item.naam} - ${item.adres}`,
        ...specialistInvoice
      });
      
      toast.success('Factuur succesvol verzonden naar vakspecialist!');
      setIsSpecialistInvoiceOpen(false);
      onInvoiceSent();
    } catch (error) {
      toast.error('Fout bij versturen factuur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Factuur naar klant */}
      <Dialog open={isCustomerInvoiceOpen} onOpenChange={setIsCustomerInvoiceOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="bg-green-50 hover:bg-green-100">
            <FileText className="w-4 h-4 mr-1" />
            Factuur Klant
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Factuur naar Klant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p><strong>Klant:</strong> {item.naam}</p>
              <p><strong>Email:</strong> {item.email}</p>
            </div>
            
            <div>
              <Label htmlFor="bedrag">Bedrag (€)</Label>
              <Input
                id="bedrag"
                type="number"
                value={customerInvoice.bedrag}
                onChange={(e) => setCustomerInvoice({...customerInvoice, bedrag: e.target.value})}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="beschrijving">Beschrijving</Label>
              <Textarea
                id="beschrijving"
                value={customerInvoice.beschrijving}
                onChange={(e) => setCustomerInvoice({...customerInvoice, beschrijving: e.target.value})}
                placeholder="Beschrijving van de werkzaamheden..."
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
            </div>
            
            <Button onClick={handleCustomerInvoice} disabled={loading} className="w-full">
              {loading ? 'Versturen...' : 'Verstuur Factuur'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Factuur naar vakspecialist */}
      <Dialog open={isSpecialistInvoiceOpen} onOpenChange={setIsSpecialistInvoiceOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="bg-blue-50 hover:bg-blue-100">
            <Send className="w-4 h-4 mr-1" />
            Factuur Specialist
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Factuur naar Vakspecialist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p><strong>Project:</strong> {item.naam} - {item.adres}</p>
            </div>
            
            <div>
              <Label htmlFor="bedrijfsnaam">Bedrijfsnaam</Label>
              <Input
                id="bedrijfsnaam"
                value={specialistInvoice.bedrijfsnaam}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, bedrijfsnaam: e.target.value})}
                placeholder="Naam van het bedrijf"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-email">Email</Label>
              <Input
                id="specialist-email"
                type="email"
                value={specialistInvoice.email}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, email: e.target.value})}
                placeholder="email@bedrijf.nl"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-bedrag">Bedrag (€)</Label>
              <Input
                id="specialist-bedrag"
                type="number"
                value={specialistInvoice.bedrag}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, bedrag: e.target.value})}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="specialist-beschrijving">Beschrijving</Label>
              <Textarea
                id="specialist-beschrijving"
                value={specialistInvoice.beschrijving}
                onChange={(e) => setSpecialistInvoice({...specialistInvoice, beschrijving: e.target.value})}
                placeholder="Beschrijving van de werkzaamheden..."
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
            </div>
            
            <Button onClick={handleSpecialistInvoice} disabled={loading} className="w-full">
              {loading ? 'Versturen...' : 'Verstuur Factuur'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceActions;
