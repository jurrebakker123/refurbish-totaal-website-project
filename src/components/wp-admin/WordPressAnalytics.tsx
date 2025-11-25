import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Eye, Package, Euro, Calendar, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { nl } from 'date-fns/locale';

interface AnalyticsData {
  totalRequests: number;
  thisMonthRequests: number;
  thisWeekRequests: number;
  offertesVerzonden: number;
  akkoordRequests: number;
  afgehandeldeRequests: number;
  totalRevenue: number;
  averagePrice: number;
  conversionRate: number;
  requestsByService: { name: string; value: number; color: string }[];
  requestsByDay: { date: string; aanvragen: number }[];
  statusBreakdown: { status: string; count: number }[];
}

const COLORS = {
  dakkapel: '#0B4619',
  schilder: '#3B82F6',
  stukadoor: '#8B5CF6',
  zonnepanelen: '#F59E0B'
};

const WordPressAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    totalRequests: 0,
    thisMonthRequests: 0,
    thisWeekRequests: 0,
    offertesVerzonden: 0,
    akkoordRequests: 0,
    afgehandeldeRequests: 0,
    totalRevenue: 0,
    averagePrice: 0,
    conversionRate: 0,
    requestsByService: [],
    requestsByDay: [],
    statusBreakdown: []
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      const now = new Date();
      const startOfThisMonth = startOfMonth(now);
      const sevenDaysAgo = subDays(now, 7);

      // Fetch all data
      const [dakkapelRes, schilderRes, stukadoorRes, zonnepanelenRes] = await Promise.all([
        supabase.from('dakkapel_configuraties').select('*'),
        supabase.from('schilder_aanvragen').select('*'),
        supabase.from('stukadoor_aanvragen').select('*'),
        supabase.from('refurbished_zonnepanelen').select('*')
      ]);

      const allRequests = [
        ...(dakkapelRes.data || []).map(r => ({ ...r, service: 'dakkapel' })),
        ...(schilderRes.data || []).map(r => ({ ...r, service: 'schilder' })),
        ...(stukadoorRes.data || []).map(r => ({ ...r, service: 'stukadoor' })),
        ...(zonnepanelenRes.data || []).map(r => ({ ...r, service: 'zonnepanelen' }))
      ];

      // Calculate stats
      const totalRequests = allRequests.length;
      const thisMonthRequests = allRequests.filter(r => new Date(r.created_at) >= startOfThisMonth).length;
      const thisWeekRequests = allRequests.filter(r => new Date(r.created_at) >= sevenDaysAgo).length;
      const offertesVerzonden = allRequests.filter(r => r.offerte_verzonden_op).length;
      const akkoordRequests = allRequests.filter(r => r.status === 'akkoord' || r.status === 'op_locatie' || r.status === 'in_aanbouw' || r.status === 'afgehandeld').length;
      const afgehandeldeRequests = allRequests.filter(r => r.status === 'afgehandeld').length;
      
      const totalRevenue = allRequests
        .filter(r => r.totaal_prijs && r.status === 'afgehandeld')
        .reduce((sum, r) => sum + (r.totaal_prijs || 0), 0);
      
      const requestsWithPrice = allRequests.filter(r => r.totaal_prijs);
      const averagePrice = requestsWithPrice.length > 0 
        ? requestsWithPrice.reduce((sum, r) => sum + (r.totaal_prijs || 0), 0) / requestsWithPrice.length 
        : 0;

      const conversionRate = totalRequests > 0 ? (akkoordRequests / totalRequests) * 100 : 0;

      // Requests by service
      const requestsByService = [
        { name: 'Dakkapel', value: dakkapelRes.data?.length || 0, color: COLORS.dakkapel },
        { name: 'Schilderwerk', value: schilderRes.data?.length || 0, color: COLORS.schilder },
        { name: 'Stucwerk', value: stukadoorRes.data?.length || 0, color: COLORS.stukadoor },
        { name: 'Zonnepanelen', value: zonnepanelenRes.data?.length || 0, color: COLORS.zonnepanelen }
      ].filter(s => s.value > 0);

      // Requests by day (last 30 days)
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = subDays(now, 29 - i);
        const dateStr = format(date, 'yyyy-MM-dd');
        const count = allRequests.filter(r => 
          format(new Date(r.created_at), 'yyyy-MM-dd') === dateStr
        ).length;
        return { date: format(date, 'd MMM', { locale: nl }), aanvragen: count };
      });

      // Status breakdown
      const statusCounts = allRequests.reduce((acc, r) => {
        const status = r.status || 'nieuw';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const statusBreakdown = Object.entries(statusCounts).map(([status, count]) => ({
        status: status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        count
      }));

      setData({
        totalRequests,
        thisMonthRequests,
        thisWeekRequests,
        offertesVerzonden,
        akkoordRequests,
        afgehandeldeRequests,
        totalRevenue,
        averagePrice,
        conversionRate,
        requestsByService,
        requestsByDay: last30Days,
        statusBreakdown
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <button 
          onClick={loadAnalytics}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Ververs
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Totaal Aanvragen</p>
                <p className="text-3xl font-bold">{data.totalRequests}</p>
                <p className="text-xs text-muted-foreground mt-1">Deze week: {data.thisWeekRequests}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offertes Verzonden</p>
                <p className="text-3xl font-bold">{data.offertesVerzonden}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.totalRequests > 0 ? Math.round((data.offertesVerzonden / data.totalRequests) * 100) : 0}% van totaal
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Akkoord</p>
                <p className="text-3xl font-bold">{data.akkoordRequests}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.conversionRate.toFixed(1)}% conversie
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Totale Omzet</p>
                <p className="text-3xl font-bold">€{Math.round(data.totalRevenue).toLocaleString('nl-NL')}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Gem. €{Math.round(data.averagePrice).toLocaleString('nl-NL')}
                </p>
              </div>
              <Euro className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests over time */}
        <Card>
          <CardHeader>
            <CardTitle>Aanvragen Afgelopen 30 Dagen</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.requestsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="aanvragen" stroke="#0B4619" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Requests by service */}
        <Card>
          <CardHeader>
            <CardTitle>Aanvragen per Dienst</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.requestsByService}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.requestsByService.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Status Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.statusBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0B4619" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick stats table */}
        <Card>
          <CardHeader>
            <CardTitle>Snelle Statistieken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Deze maand</span>
                <span className="font-bold">{data.thisMonthRequests} aanvragen</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Afgehandeld</span>
                <span className="font-bold">{data.afgehandeldeRequests} projecten</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Conversieratio</span>
                <span className="font-bold text-green-600">{data.conversionRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Gemiddelde prijs</span>
                <span className="font-bold">€{Math.round(data.averagePrice).toLocaleString('nl-NL')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WordPressAnalytics;