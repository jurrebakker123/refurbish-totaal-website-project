
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Users, CheckCircle } from 'lucide-react';

interface ConversieStatsProps {
  configuraties: any[];
  type: 'dakkapel' | 'zonnepaneel';
}

const ConversieStats: React.FC<ConversieStatsProps> = ({ configuraties, type }) => {
  const totaalAanvragen = configuraties.length;
  const offerteVerzonden = configuraties.filter(c => 
    c.status === 'offerte_verzonden' || 
    c.status === 'akkoord' || 
    c.status === 'interesse_bevestigd' ||
    c.status === 'op_locatie' ||
    c.status === 'in_aanbouw' ||
    c.status === 'afgehandeld'
  ).length;
  
  const akkoord = configuraties.filter(c => 
    c.status === 'akkoord' || 
    c.status === 'op_locatie' ||
    c.status === 'in_aanbouw' ||
    c.status === 'afgehandeld'
  ).length;
  
  const afgehandeld = configuraties.filter(c => c.status === 'afgehandeld').length;
  
  const conversieOfferteNaarAkkoord = offerteVerzonden > 0 ? Math.round((akkoord / offerteVerzonden) * 100) : 0;
  const conversieAanvraagNaarAkkoord = totaalAanvragen > 0 ? Math.round((akkoord / totaalAanvragen) * 100) : 0;
  const conversieNaarAfgehandeld = totaalAanvragen > 0 ? Math.round((afgehandeld / totaalAanvragen) * 100) : 0;

  const stats = [
    {
      title: 'Totaal Aanvragen',
      value: totaalAanvragen,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Offertes Verzonden',
      value: offerteVerzonden,
      icon: Target,
      color: 'bg-orange-500'
    },
    {
      title: 'Akkoord',
      value: akkoord,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Afgehandeld',
      value: afgehandeld,
      icon: CheckCircle,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Conversie Statistieken
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Offerte → Akkoord</span>
                <Badge variant="secondary">{conversieOfferteNaarAkkoord}%</Badge>
              </div>
              <Progress value={conversieOfferteNaarAkkoord} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {akkoord} van {offerteVerzonden} offertes worden akkoord
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Aanvraag → Akkoord</span>
                <Badge variant="secondary">{conversieAanvraagNaarAkkoord}%</Badge>
              </div>
              <Progress value={conversieAanvraagNaarAkkoord} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {akkoord} van {totaalAanvragen} aanvragen worden akkoord
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Aanvraag → Afgehandeld</span>
                <Badge variant="secondary">{conversieNaarAfgehandeld}%</Badge>
              </div>
              <Progress value={conversieNaarAfgehandeld} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {afgehandeld} van {totaalAanvragen} aanvragen worden volledig afgehandeld
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversieStats;
