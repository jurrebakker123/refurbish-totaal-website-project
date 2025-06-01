
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Home, Sun, Construction, ThermometerSun } from 'lucide-react';

const DashboardSelector = () => {
  const navigate = useNavigate();

  const dashboards = [
    {
      id: 'dakkapel',
      title: 'Dakkapel Dashboard',
      description: 'Beheer dakkapel configuraties, offertes en klantverzoeken',
      icon: Home,
      color: 'bg-blue-500',
      route: '/admin-dakkapel',
      stats: 'Configuraties, Calculator aanvragen'
    },
    {
      id: 'zonnepanelen',
      title: 'Zonnepanelen Dashboard',
      description: 'Beheer zonnepanelen bestellingen en klantgegevens',
      icon: Sun,
      color: 'bg-yellow-500',
      route: '/admin-zonnepanelen',
      stats: 'Refurbished panelen, Klanten'
    },
    {
      id: 'bouwhulp',
      title: 'Bouwhulp Dashboard',
      description: 'Beheer bouwhulp diensten en projecten',
      icon: Construction,
      color: 'bg-orange-500',
      route: '/admin-bouwhulp',
      stats: 'Diensten, Projecten'
    },
    {
      id: 'isolatie',
      title: 'Isolatie Dashboard',
      description: 'Beheer isolatie projecten en selecties',
      icon: ThermometerSun,
      color: 'bg-green-500',
      route: '/admin-isolatie',
      stats: 'Isolatie selecties, Offertes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard Selectie
          </h1>
          <p className="text-gray-600">
            Kies het dashboard dat je wilt beheren
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboards.map((dashboard) => {
            const IconComponent = dashboard.icon;
            
            return (
              <Card 
                key={dashboard.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(dashboard.route)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${dashboard.color} p-3 rounded-lg text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{dashboard.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {dashboard.stats}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {dashboard.description}
                  </p>
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(dashboard.route);
                    }}
                  >
                    Dashboard Openen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Card className="inline-block p-4">
            <p className="text-sm text-gray-500">
              💡 <strong>Tip:</strong> Elk dashboard is geoptimaliseerd voor het specifieke type project
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;
