import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Mail, 
  Eye, 
  MessageSquare,
  DollarSign,
  Calendar,
  Activity,
  Plus,
  ArrowRight,
  Settings
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  totalRevenue: number;
  monthlyRequests: number;
  conversionRate: number;
  recentActivity: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: Date;
  }>;
}

const WordPressAdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRequests: 0,
    pendingRequests: 0,
    totalRevenue: 0,
    monthlyRequests: 0,
    conversionRate: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      // Load dakkapel requests
      const { data: dakkapelRequests } = await supabase
        .from('dakkapel_configuraties')
        .select('*');

      // Load schilder requests  
      const { data: schilderRequests } = await supabase
        .from('schilder_aanvragen')
        .select('*');

      // Load stukadoor requests
      const { data: stukadoorRequests } = await supabase
        .from('stukadoor_aanvragen')
        .select('*');
      
      // Load zonnepanelen requests
      const { data: zonnepanelenRequests } = await supabase
        .from('refurbished_zonnepanelen')
        .select('*');

      const allRequests = [
        ...(dakkapelRequests || []),
        ...(schilderRequests || []),
        ...(stukadoorRequests || []),
        ...(zonnepanelenRequests || [])
      ];
      
      const totalRequests = allRequests.length;
      
      // Calculate monthly requests
      const monthlyRequests = allRequests.filter(r => 
        new Date(r.created_at) >= firstDayOfMonth
      ).length;

      const pendingRequests = allRequests.filter(r => 
        r.status === 'offerte_verzonden'
      ).length;

      // Calculate total revenue from completed projects
      const completedRequests = allRequests.filter(r => r.status === 'afgehandeld');
      const totalRevenue = completedRequests.reduce((sum, request) => 
        sum + (Number(request.totaal_prijs) || 0), 0
      );
      
      // Calculate conversion rate (akkoord + in_aanbouw + afgehandeld / total)
      const convertedRequests = allRequests.filter(r => 
        r.status === 'akkoord' || r.status === 'op_locatie' || 
        r.status === 'in_aanbouw' || r.status === 'afgehandeld'
      ).length;
      const conversionRate = totalRequests > 0 
        ? (convertedRequests / totalRequests) * 100 
        : 0;

      // Create recent activity
      const recentActivity = [
        ...(dakkapelRequests?.slice(-5).map(r => ({
          id: r.id,
          type: 'dakkapel',
          message: `Nieuwe dakkapel aanvraag van ${r.naam}`,
          timestamp: new Date(r.created_at)
        })) || []),
        ...(schilderRequests?.slice(-5).map(r => ({
          id: r.id,
          type: 'schilder',
          message: `Nieuwe schilderwerk aanvraag van ${r.voornaam} ${r.achternaam}`,
          timestamp: new Date(r.created_at)
        })) || []),
        ...(stukadoorRequests?.slice(-5).map(r => ({
          id: r.id,
          type: 'stukadoor',
          message: `Nieuwe stukadoor aanvraag van ${r.voornaam} ${r.achternaam}`,
          timestamp: new Date(r.created_at)
        })) || [])
      ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

      setStats({
        totalRequests,
        pendingRequests,
        totalRevenue,
        monthlyRequests,
        conversionRate,
        recentActivity
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Nieuwe Pagina',
      description: 'Voeg nieuwe content toe',
      icon: FileText,
      link: '/wp-admin/content/pages/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Prijzen Beheren',
      description: 'Pas service prijzen aan',
      icon: DollarSign,
      link: '/wp-admin/prices',
      color: 'bg-green-500'
    },
    {
      title: 'Media Toevoegen',
      description: 'Upload nieuwe afbeeldingen',
      icon: Eye,
      link: '/wp-admin/media',
      color: 'bg-purple-500'
    },
    {
      title: 'Gebruikers Beheren',
      description: 'Beheer gebruikerstoegang',
      icon: Users,
      link: '/wp-admin/users',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welkom terug! Hier is een overzicht van je website.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Aanvragen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              Alle aanvragen sinds start
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lopende Projecten</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Wachten op reactie
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Omzet</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString('nl-NL')}</div>
            <p className="text-xs text-muted-foreground">
              Van afgehandelde projecten
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversieratio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.monthlyRequests} aanvragen deze maand
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Link key={action.title} to={action.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity & At a Glance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recente Activiteit</CardTitle>
            <CardDescription>Laatste activiteiten op je website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'dakkapel' ? 'bg-blue-500' :
                    activity.type === 'schilder' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">
                      {activity.timestamp.toLocaleDateString('nl-NL')} om {activity.timestamp.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/wp-admin/content" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                Bekijk alle activiteit
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* At a Glance */}
        <Card>
          <CardHeader>
            <CardTitle>Snelle Blik</CardTitle>
            <CardDescription>Je website in een oogopslag</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Website Status</span>
                <Badge className="bg-green-500">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">WordPress Versie</span>
                <span className="text-sm font-medium">RefurbishCMS v1.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Thema</span>
                <span className="text-sm font-medium">RefurbishTheme</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Laatste Backup</span>
                <span className="text-sm font-medium">Vandaag</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/wp-admin/settings" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                Ga naar instellingen
                <Settings className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WordPressAdminDashboard;