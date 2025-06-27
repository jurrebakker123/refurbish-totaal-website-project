import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Construction, Search, Filter, Eye, Mail, Phone, FileText, Calendar, Euro, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { updateRequestStatus, updateRequestDetails, sendQuoteEmail, deleteQuote } from '@/utils/adminUtils';
import QuoteDialog from './QuoteDialog';
import RequestDetailDialog from './RequestDetailDialog';

interface StukadoorRequest {
  id: string;
  created_at: string;
  updated_at?: string;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  telefoon: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  bericht?: string;
  werk_type: string;
  oppervlakte: number;
  aantal_kamers?: number;
  afwerking: string;
  huidige_staat?: string;
  voorbewerking?: string;
  isolatie_gewenst: boolean;
  totaal_prijs?: number;
  status: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
  notities?: string;
}

const StukadoorDashboard = () => {
  const [requests, setRequests] = useState<StukadoorRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<StukadoorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('alle');
  const [selectedRequest, setSelectedRequest] = useState<StukadoorRequest | null>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const loadRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('stukadoor_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
      setFilteredRequests(data || []);
    } catch (error) {
      console.error('Error loading requests:', error);
      toast.error('Fout bij het laden van aanvragen');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(req => 
        `${req.voornaam} ${req.achternaam}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.emailadres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.postcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.plaats.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'alle') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-500';
      case 'contact_opgenomen': return 'bg-yellow-500';
      case 'offerte_verzonden': return 'bg-green-500';
      case 'op_locatie': return 'bg-purple-500';
      case 'in_aanbouw': return 'bg-orange-500';
      case 'afgehandeld': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'nieuw': return 'Nieuw';
      case 'contact_opgenomen': return 'Contact opgenomen';
      case 'offerte_verzonden': return 'Offerte verzonden';
      case 'op_locatie': return 'Op locatie';
      case 'in_aanbouw': return 'In aanbouw';
      case 'afgehandeld': return 'Afgehandeld';
      default: return status;
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const success = await updateRequestStatus(id, newStatus, 'stukadoor_aanvragen');
    if (success) {
      loadRequests();
    }
  };

  const handleDetailsUpdate = async (request: StukadoorRequest, notes: string, price: string) => {
    const success = await updateRequestDetails(request, notes, price, 'stukadoor_aanvragen');
    if (success) {
      loadRequests();
    }
  };

  const handleSendQuote = async (request: StukadoorRequest, customMessage?: string) => {
    const quoteItem = {
      id: request.id,
      naam: `${request.voornaam} ${request.achternaam}`,
      email: request.emailadres,
      telefoon: request.telefoon,
      adres: `${request.straatnaam} ${request.huisnummer}`,
      postcode: request.postcode,
      plaats: request.plaats,
      projectDetails: `${request.werk_type} - ${request.oppervlakte}m² - ${request.afwerking}`,
      totaal_prijs: request.totaal_prijs,
      opmerkingen: request.bericht,
      created_at: request.created_at,
      updated_at: request.updated_at || request.created_at,
      status: request.status,
      offerte_verzonden_op: request.offerte_verzonden_op,
      op_locatie_op: request.op_locatie_op,
      in_aanbouw_op: request.in_aanbouw_op,
      afgehandeld_op: request.afgehandeld_op,
      notities: request.notities
    };

    const success = await sendQuoteEmail(quoteItem as any, customMessage);
    if (success) {
      await handleStatusUpdate(request.id, 'offerte_verzonden');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Weet je zeker dat je deze aanvraag wilt verwijderen?')) {
      const success = await deleteQuote(id, 'stukadoor_aanvragen');
      if (success) {
        loadRequests();
      }
    }
  };

  // Stats calculations
  const stats = {
    nieuw: requests.filter(r => r.status === 'nieuw').length,
    inBehandeling: requests.filter(r => ['contact_opgenomen', 'offerte_verzonden', 'op_locatie'].includes(r.status)).length,
    inAanbouw: requests.filter(r => r.status === 'in_aanbouw').length,
    totaleWaarde: requests.reduce((sum, r) => sum + (r.totaal_prijs || 0), 0),
    afgehandeld: requests.filter(r => r.status === 'afgehandeld').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Construction className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Stucwerk Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.nieuw}</div>
                <div className="text-sm text-gray-600">Nieuwe aanvragen</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.inBehandeling}</div>
                <div className="text-sm text-gray-600">In behandeling</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Construction className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.inAanbouw}</div>
                <div className="text-sm text-gray-600">In uitvoering</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.afgehandeld}</div>
                <div className="text-sm text-gray-600">Afgehandeld</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Euro className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">€{stats.totaleWaarde.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Totale waarde</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input 
                placeholder="Zoek op naam, email, postcode..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="alle">Alle statussen</option>
              <option value="nieuw">Nieuw</option>
              <option value="contact_opgenomen">Contact opgenomen</option>
              <option value="offerte_verzonden">Offerte verzonden</option>
              <option value="op_locatie">Op locatie</option>
              <option value="in_aanbouw">In aanbouw</option>
              <option value="afgehandeld">Afgehandeld</option>
            </select>
            <Button variant="outline" onClick={loadRequests}>
              <Search className="h-4 w-4 mr-2" />
              Verversen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="alle" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alle">Alle aanvragen ({filteredRequests.length})</TabsTrigger>
          <TabsTrigger value="nieuw">Nieuw ({requests.filter(r => r.status === 'nieuw').length})</TabsTrigger>
          <TabsTrigger value="actief">Actief ({requests.filter(r => ['contact_opgenomen', 'offerte_verzonden', 'op_locatie', 'in_aanbouw'].includes(r.status)).length})</TabsTrigger>
          <TabsTrigger value="afgehandeld">Afgehandeld ({stats.afgehandeld})</TabsTrigger>
        </TabsList>

        <TabsContent value="alle">
          <Card>
            <CardHeader>
              <CardTitle>Alle Stucwerk Aanvragen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Klant</TableHead>
                      <TableHead>Werktype</TableHead>
                      <TableHead>Oppervlakte</TableHead>
                      <TableHead>Geschatte kosten</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.voornaam} {request.achternaam}</div>
                            <div className="text-sm text-gray-600">{request.emailadres}</div>
                            <div className="text-sm text-gray-600">{request.telefoon}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.werk_type}</div>
                            <div className="text-sm text-gray-600">{request.afwerking}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.oppervlakte} m²</TableCell>
                        <TableCell>
                          {request.totaal_prijs ? `€${request.totaal_prijs.toLocaleString()}` : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(request.status)} text-white`}>
                            {getStatusText(request.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(request.created_at).toLocaleDateString('nl-NL')}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowDetailDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowQuoteDialog(true);
                              }}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`tel:${request.telefoon}`, '_self')}
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nieuw">
          <Card>
            <CardHeader>
              <CardTitle>Nieuwe Aanvragen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Klant</TableHead>
                      <TableHead>Werktype</TableHead>
                      <TableHead>Oppervlakte</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.filter(r => r.status === 'nieuw').map((request) => (
                      <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.voornaam} {request.achternaam}</div>
                            <div className="text-sm text-gray-600">{request.emailadres}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.werk_type}</div>
                            <div className="text-sm text-gray-600">{request.afwerking}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.oppervlakte} m²</TableCell>
                        <TableCell>{new Date(request.created_at).toLocaleDateString('nl-NL')}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleStatusUpdate(request.id, 'contact_opgenomen')}
                            >
                              Contact opnemen
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actief">
          <Card>
            <CardHeader>
              <CardTitle>Actieve Projecten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Klant</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Volgende actie</TableHead>
                      <TableHead>Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.filter(r => ['contact_opgenomen', 'offerte_verzonden', 'op_locatie', 'in_aanbouw'].includes(r.status)).map((request) => (
                      <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.voornaam} {request.achternaam}</div>
                            <div className="text-sm text-gray-600">{request.plaats}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.werk_type}</div>
                            <div className="text-sm text-gray-600">{request.oppervlakte} m²</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(request.status)} text-white`}>
                            {getStatusText(request.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === 'contact_opgenomen' && 'Offerte versturen'}
                          {request.status === 'offerte_verzonden' && 'Afspraak plannen'}
                          {request.status === 'op_locatie' && 'Project starten'}
                          {request.status === 'in_aanbouw' && 'Project afronden'}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {request.status === 'contact_opgenomen' && (
                              <Button size="sm" onClick={() => handleStatusUpdate(request.id, 'offerte_verzonden')}>
                                Offerte verzonden
                              </Button>
                            )}
                            {request.status === 'offerte_verzonden' && (
                              <Button size="sm" onClick={() => handleStatusUpdate(request.id, 'op_locatie')}>
                                Op locatie
                              </Button>
                            )}
                            {request.status === 'op_locatie' && (
                              <Button size="sm" onClick={() => handleStatusUpdate(request.id, 'in_aanbouw')}>
                                In aanbouw
                              </Button>
                            )}
                            {request.status === 'in_aanbouw' && (
                              <Button size="sm" onClick={() => handleStatusUpdate(request.id, 'afgehandeld')}>
                                Afgerond
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="afgehandeld">
          <Card>
            <CardHeader>
              <CardTitle>Afgehandelde Projecten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Klant</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Waarde</TableHead>
                      <TableHead>Afgerond op</TableHead>
                      <TableHead>Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.filter(r => r.status === 'afgehandeld').map((request) => (
                      <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.voornaam} {request.achternaam}</div>
                            <div className="text-sm text-gray-600">{request.plaats}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.werk_type}</div>
                            <div className="text-sm text-gray-600">{request.oppervlakte} m²</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.totaal_prijs ? `€${request.totaal_prijs.toLocaleString()}` : '-'}
                        </TableCell>
                        <TableCell>
                          {request.afgehandeld_op ? new Date(request.afgehandeld_op).toLocaleDateString('nl-NL') : '-'}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowDetailDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {selectedRequest && (
        <>
          <QuoteDialog
            isOpen={showQuoteDialog}
            onClose={() => {
              setShowQuoteDialog(false);
              setSelectedRequest(null);
            }}
            request={{
              id: selectedRequest.id,
              naam: `${selectedRequest.voornaam} ${selectedRequest.achternaam}`,
              email: selectedRequest.emailadres,
              telefoon: selectedRequest.telefoon,
              adres: `${selectedRequest.straatnaam} ${selectedRequest.huisnummer}`,
              postcode: selectedRequest.postcode,
              plaats: selectedRequest.plaats,
              projectDetails: `${selectedRequest.werk_type} - ${selectedRequest.oppervlakte}m² - ${selectedRequest.afwerking}`,
              totaal_prijs: selectedRequest.totaal_prijs,
              opmerkingen: selectedRequest.bericht
            }}
            onSendQuote={(customMessage) => handleSendQuote(selectedRequest, customMessage)}
            onUpdateDetails={(notes, price) => handleDetailsUpdate(selectedRequest, notes, price)}
            onStatusUpdate={(status) => handleStatusUpdate(selectedRequest.id, status)}
            onDelete={() => handleDelete(selectedRequest.id)}
          />

          <RequestDetailDialog
            isOpen={showDetailDialog}
            onClose={() => {
              setShowDetailDialog(false);
              setSelectedRequest(null);
            }}
            request={{
              id: selectedRequest.id,
              naam: `${selectedRequest.voornaam} ${selectedRequest.achternaam}`,
              email: selectedRequest.emailadres,
              telefoon: selectedRequest.telefoon,
              adres: `${selectedRequest.straatnaam} ${selectedRequest.huisnummer}`,
              postcode: selectedRequest.postcode,
              plaats: selectedRequest.plaats,
              projectDetails: `${selectedRequest.werk_type} - ${selectedRequest.oppervlakte}m² - ${selectedRequest.afwerking}`,
              extraDetails: [
                ...(selectedRequest.aantal_kamers ? [`Aantal kamers: ${selectedRequest.aantal_kamers}`] : []),
                ...(selectedRequest.huidige_staat ? [`Huidige staat: ${selectedRequest.huidige_staat}`] : []),
                ...(selectedRequest.voorbewerking ? [`Voorbewerking: ${selectedRequest.voorbewerking}`] : []),
                ...(selectedRequest.isolatie_gewenst ? ['Isolatie gewenst'] : [])
              ],
              totaal_prijs: selectedRequest.totaal_prijs,
              opmerkingen: selectedRequest.bericht,
              notities: selectedRequest.notities,
              status: selectedRequest.status,
              created_at: selectedRequest.created_at,
              offerte_verzonden_op: selectedRequest.offerte_verzonden_op,
              op_locatie_op: selectedRequest.op_locatie_op,
              in_aanbouw_op: selectedRequest.in_aanbouw_op,
              afgehandeld_op: selectedRequest.afgehandeld_op
            }}
            onDataChange={loadRequests}
          />
        </>
      )}
    </div>
  );
};

export default StukadoorDashboard;
