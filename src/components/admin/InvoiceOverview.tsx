import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Euro, Mail, Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

// Use the database type from Supabase
type Factuur = Tables<'facturen'>;

const InvoiceOverview = () => {
  const [facturen, setFacturen] = useState<Factuur[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Factuur | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  useEffect(() => {
    loadFacturen();
  }, []);

  const loadFacturen = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('facturen')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading invoices:', error);
        toast.error('Fout bij laden facturen: ' + error.message);
        return;
      }

      setFacturen(data || []);
      console.log('Loaded invoices:', data?.length || 0);
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast.error('Onverwachte fout bij laden facturen');
    } finally {
      setLoading(false);
    }
  };

  const updateInvoiceStatus = async (id: string, newStatus: string, additionalFields?: Record<string, any>) => {
    console.log('Updating invoice status:', { id, newStatus, additionalFields });
    setProcessingAction(id);
    
    try {
      const updateData: any = { 
        status: newStatus,
        updated_at: new Date().toISOString()
      };
      
      // Add timestamp fields based on status
      if (newStatus === 'betaald') {
        updateData.betaald_op = new Date().toISOString();
      } else if (newStatus === 'herinnering_1') {
        updateData.herinnering_1_verzonden_op = new Date().toISOString();
      } else if (newStatus === 'herinnering_2') {
        updateData.herinnering_2_verzonden_op = new Date().toISOString();
      } else if (newStatus === 'herinnering_3') {
        updateData.herinnering_3_verzonden_op = new Date().toISOString();
      } else if (newStatus === 'te_laat') {
        // Keep existing timestamps but mark as overdue
        updateData.status = 'te_laat';
      }

      // Add any additional fields
      if (additionalFields) {
        Object.assign(updateData, additionalFields);
      }

      console.log('Update data:', updateData);

      const { error } = await supabase
        .from('facturen')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Update error:', error);
        toast.error('Fout bij bijwerken status: ' + error.message);
        return false;
      }

      console.log('Invoice status updated successfully');
      toast.success('Factuurstatus succesvol bijgewerkt');
      await loadFacturen();
      return true;
    } catch (error) {
      console.error('Error updating invoice status:', error);
      toast.error('Onverwachte fout bij bijwerken status');
      return false;
    } finally {
      setProcessingAction(null);
    }
  };

  const markAsPaid = async (id: string) => {
    console.log('Marking invoice as paid:', id);
    await updateInvoiceStatus(id, 'betaald');
  };

  const sendReminder = async (id: string, reminderLevel: number) => {
    console.log('Sending reminder:', { id, reminderLevel });
    const statusMap = {
      1: 'herinnering_1',
      2: 'herinnering_2',
      3: 'herinnering_3'
    };
    
    const newStatus = statusMap[reminderLevel as keyof typeof statusMap];
    if (newStatus) {
      await updateInvoiceStatus(id, newStatus);
    }
  };

  const markAsOverdue = async (id: string) => {
    console.log('Marking invoice as overdue:', id);
    await updateInvoiceStatus(id, 'te_laat');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verstuurd':
        return <Badge className="bg-blue-100 text-blue-800"><Mail className="w-3 h-3 mr-1" />Verstuurd</Badge>;
      case 'betaald':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Betaald</Badge>;
      case 'openstaand':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Openstaand</Badge>;
      case 'herinnering_1':
        return <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="w-3 h-3 mr-1" />1e Herinnering</Badge>;
      case 'herinnering_2':
        return <Badge className="bg-orange-200 text-orange-900"><AlertTriangle className="w-3 h-3 mr-1" />2e Herinnering</Badge>;
      case 'herinnering_3':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />3e Herinnering</Badge>;
      case 'te_laat':
        return <Badge className="bg-red-200 text-red-900"><AlertTriangle className="w-3 h-3 mr-1" />Te Laat</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const isOverdue = (vervaldatum: string | null) => {
    if (!vervaldatum) return false;
    const today = new Date();
    const dueDate = new Date(vervaldatum);
    return dueDate < today;
  };

  const getAvailableActions = (factuur: Factuur) => {
    const actions = [];
    
    if (factuur.status !== 'betaald') {
      actions.push({
        label: 'Markeer Betaald',
        action: () => markAsPaid(factuur.id),
        variant: 'default' as const,
        className: 'bg-green-600 hover:bg-green-700 text-white'
      });
    }
    
    if (factuur.status === 'verstuurd' || factuur.status === 'openstaand') {
      actions.push({
        label: '1e Herinnering',
        action: () => sendReminder(factuur.id, 1),
        variant: 'outline' as const,
        className: 'bg-orange-50 text-orange-700 border-orange-200'
      });
    }
    
    if (factuur.status === 'herinnering_1') {
      actions.push({
        label: '2e Herinnering',
        action: () => sendReminder(factuur.id, 2),
        variant: 'outline' as const,
        className: 'bg-orange-100 text-orange-800 border-orange-300'
      });
    }
    
    if (factuur.status === 'herinnering_2') {
      actions.push({
        label: '3e Herinnering',
        action: () => sendReminder(factuur.id, 3),
        variant: 'outline' as const,
        className: 'bg-red-50 text-red-700 border-red-200'
      });
    }
    
    if (factuur.status !== 'betaald' && factuur.status !== 'te_laat' && isOverdue(factuur.vervaldatum)) {
      actions.push({
        label: 'Markeer Te Laat',
        action: () => markAsOverdue(factuur.id),
        variant: 'outline' as const,
        className: 'bg-red-100 text-red-800 border-red-300'
      });
    }
    
    return actions;
  };

  const filteredFacturen = facturen.filter(factuur => {
    const matchesStatus = statusFilter === 'all' || factuur.status === statusFilter;
    const matchesType = typeFilter === 'all' || factuur.type === typeFilter;
    const matchesSearch = !searchTerm || 
      factuur.klant_naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factuur.factuur_nummer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factuur.klant_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const openDetails = (factuur: Factuur) => {
    setSelectedInvoice(factuur);
    setIsDetailOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Factuur Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Zoeken</Label>
              <Input
                id="search"
                placeholder="Klant, factuurnummer of email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Alle statussen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle statussen</SelectItem>
                  <SelectItem value="verstuurd">Verstuurd</SelectItem>
                  <SelectItem value="openstaand">Openstaand</SelectItem>
                  <SelectItem value="herinnering_1">1e Herinnering</SelectItem>
                  <SelectItem value="herinnering_2">2e Herinnering</SelectItem>
                  <SelectItem value="herinnering_3">3e Herinnering</SelectItem>
                  <SelectItem value="betaald">Betaald</SelectItem>
                  <SelectItem value="te_laat">Te Laat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Alle types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle types</SelectItem>
                  <SelectItem value="customer">Klant facturen</SelectItem>
                  <SelectItem value="specialist">Specialist facturen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factuur overzicht */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="w-5 h-5" />
            Facturen Overzicht ({filteredFacturen.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFacturen.map((factuur) => (
              <Card key={factuur.id} className={`p-4 ${isOverdue(factuur.vervaldatum) && factuur.status !== 'betaald' ? 'border-red-200 bg-red-50' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{factuur.factuur_nummer}</h3>
                      {getStatusBadge(factuur.status)}
                      <Badge variant="outline" className="text-xs">
                        {factuur.type === 'customer' ? 'Klant' : 'Specialist'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {factuur.project_type === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{factuur.klant_naam} • {factuur.klant_email}</p>
                    <p className="text-sm text-gray-500">{factuur.beschrijving}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>€{factuur.bedrag.toFixed(2)}</span>
                      {factuur.vervaldatum && (
                        <span className={isOverdue(factuur.vervaldatum) && factuur.status !== 'betaald' ? 'text-red-600 font-semibold' : ''}>
                          Vervalt: {new Date(factuur.vervaldatum).toLocaleDateString('nl-NL')}
                        </span>
                      )}
                      {factuur.email_verzonden_op && (
                        <span>Verstuurd: {new Date(factuur.email_verzonden_op).toLocaleDateString('nl-NL')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDetails(factuur)}
                    >
                      Details
                    </Button>
                    {getAvailableActions(factuur).map((actionItem, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant={actionItem.variant}
                        className={actionItem.className}
                        onClick={actionItem.action}
                        disabled={processingAction === factuur.id}
                      >
                        {processingAction === factuur.id ? 'Bezig...' : actionItem.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredFacturen.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Geen facturen gevonden
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Factuur Details - {selectedInvoice?.factuur_nummer}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                </div>
                <div>
                  <Label>Bedrag</Label>
                  <div className="mt-1 font-semibold text-lg">€{selectedInvoice.bedrag.toFixed(2)}</div>
                </div>
                <div>
                  <Label>Klant</Label>
                  <div className="mt-1">{selectedInvoice.klant_naam}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div className="mt-1">{selectedInvoice.klant_email}</div>
                </div>
                <div>
                  <Label>Factuurdatum</Label>
                  <div className="mt-1">{new Date(selectedInvoice.factuurdatum).toLocaleDateString('nl-NL')}</div>
                </div>
                <div>
                  <Label>Vervaldatum</Label>
                  <div className="mt-1">
                    {selectedInvoice.vervaldatum ? new Date(selectedInvoice.vervaldatum).toLocaleDateString('nl-NL') : 'Op aanvraag'}
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Beschrijving</Label>
                <div className="mt-1 p-2 bg-gray-50 rounded">{selectedInvoice.beschrijving}</div>
              </div>
              
              <div>
                <Label>Adres</Label>
                <div className="mt-1 p-2 bg-gray-50 rounded">{selectedInvoice.klant_adres}</div>
              </div>

              {selectedInvoice.notities && (
                <div>
                  <Label>Notities</Label>
                  <div className="mt-1 p-2 bg-gray-50 rounded">{selectedInvoice.notities}</div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                {getAvailableActions(selectedInvoice).map((actionItem, index) => (
                  <Button
                    key={index}
                    variant={actionItem.variant}
                    className={actionItem.className}
                    onClick={() => {
                      actionItem.action();
                      setIsDetailOpen(false);
                    }}
                    disabled={processingAction === selectedInvoice.id}
                  >
                    {processingAction === selectedInvoice.id ? 'Bezig...' : actionItem.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceOverview;
