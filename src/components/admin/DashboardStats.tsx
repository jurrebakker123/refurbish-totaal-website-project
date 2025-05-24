
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, Mail, CheckCircle, TrendingUp } from 'lucide-react';
import { DakkapelConfiguratie } from '@/types/admin';

interface DashboardStatsProps {
  configuraties: DakkapelConfiguratie[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ configuraties }) => {
  const today = new Date();
  const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const stats = {
    total: configuraties.length,
    todayCount: configuraties.filter(c => 
      new Date(c.created_at).toDateString() === today.toDateString()
    ).length,
    thisWeekCount: configuraties.filter(c => 
      new Date(c.created_at) >= thisWeek
    ).length,
    nieuw: configuraties.filter(c => c.status === 'nieuw').length,
    inBehandeling: configuraties.filter(c => c.status === 'in_behandeling').length,
    offerteVerzonden: configuraties.filter(c => c.status === 'offerte_verzonden').length,
    afgehandeld: configuraties.filter(c => c.status === 'afgehandeld').length,
    gemiddeldePrijs: configuraties
      .filter(c => c.totaal_prijs)
      .reduce((sum, c) => sum + (c.totaal_prijs || 0), 0) / 
      (configuraties.filter(c => c.totaal_prijs).length || 1)
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vandaag</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayCount}</div>
          <p className="text-xs text-muted-foreground">
            Nieuwe aanvragen
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Deze Week</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.thisWeekCount}</div>
          <p className="text-xs text-muted-foreground">
            Totaal aanvragen
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Te Verwerken</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.nieuw + stats.inBehandeling}</div>
          <p className="text-xs text-muted-foreground">
            Nieuw + In behandeling
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gem. Prijs</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{Math.round(stats.gemiddeldePrijs).toLocaleString('nl-NL')}</div>
          <p className="text-xs text-muted-foreground">
            Per dakkapel
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
