
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Construction, Search, Filter, Eye, Mail, Phone } from 'lucide-react';

const StukadoorDashboard = () => {
  const [requests] = useState([
    {
      id: 1,
      naam: 'Peter Bruegel',
      email: 'peter@example.com',
      telefoon: '06-11111111',
      werkType: 'Nieuw stucwerk',
      oppervlakte: 80,
      afwerking: 'Glad stucwerk',
      geschatteKosten: 2800,
      status: 'nieuw',
      datum: '2024-01-15'
    },
    {
      id: 2,
      naam: 'Els Rubens',
      email: 'els@example.com',
      telefoon: '06-22222222',
      werkType: 'Decoratief stucwerk',
      oppervlakte: 45,
      afwerking: 'Betonlook',
      geschatteKosten: 3200,
      status: 'offerte_verzonden',
      datum: '2024-01-13'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-500';
      case 'contact_opgenomen': return 'bg-yellow-500';
      case 'offerte_verzonden': return 'bg-green-500';
      case 'afgesloten': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'nieuw': return 'Nieuw';
      case 'contact_opgenomen': return 'Contact opgenomen';
      case 'offerte_verzonden': return 'Offerte verzonden';
      case 'afgesloten': return 'Afgesloten';
      default: return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Construction className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Stucwerk Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Nieuwe aanvragen</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <div className="text-sm text-gray-600">In behandeling</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-gray-600">Offertes verzonden</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-500">€32.650</div>
            <div className="text-sm text-gray-600">Totale waarde</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input placeholder="Zoek op naam of email..." />
            </div>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Zoeken
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stucwerk Aanvragen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Klant</th>
                  <th className="text-left p-2">Werktype</th>
                  <th className="text-left p-2">Oppervlakte</th>
                  <th className="text-left p-2">Geschatte kosten</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Datum</th>
                  <th className="text-left p-2">Acties</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{request.naam}</div>
                        <div className="text-sm text-gray-600">{request.email}</div>
                        <div className="text-sm text-gray-600">{request.telefoon}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{request.werkType}</div>
                        <div className="text-sm text-gray-600">{request.afwerking}</div>
                      </div>
                    </td>
                    <td className="p-2">{request.oppervlakte} m²</td>
                    <td className="p-2">€{request.geschatteKosten.toLocaleString()}</td>
                    <td className="p-2">
                      <Badge className={`${getStatusColor(request.status)} text-white`}>
                        {getStatusText(request.status)}
                      </Badge>
                    </td>
                    <td className="p-2">{new Date(request.datum).toLocaleDateString('nl-NL')}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StukadoorDashboard;
