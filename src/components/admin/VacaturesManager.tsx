
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Save, X, Users } from 'lucide-react';

interface Vacature {
  id: string;
  title: string;
  location: string;
  type: string;
  salary_range: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
  icon_name: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface Sollicitatie {
  id: string;
  vacature_id: string;
  naam: string;
  email: string;
  telefoon: string;
  motivatie: string | null;
  cv_url: string | null;
  status: string;
  notities: string | null;
  created_at: string;
  updated_at: string;
}

const VacaturesManager = () => {
  const [vacatures, setVacatures] = useState<Vacature[]>([]);
  const [sollicitaties, setSollicitaties] = useState<Sollicitatie[]>([]);
  const [editingVacature, setEditingVacature] = useState<Vacature | null>(null);
  const [formData, setFormData] = useState<Partial<Vacature>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vacatures' | 'sollicitaties'>('vacatures');

  useEffect(() => {
    loadVacatures();
    loadSollicitaties();
  }, []);

  const loadVacatures = async () => {
    try {
      const { data, error } = await supabase
        .from('vacatures')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setVacatures(data || []);
    } catch (error) {
      console.error('Error loading vacatures:', error);
      toast.error('Fout bij laden van vacatures');
    } finally {
      setLoading(false);
    }
  };

  const loadSollicitaties = async () => {
    try {
      const { data, error } = await supabase
        .from('sollicitaties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSollicitaties(data || []);
    } catch (error) {
      console.error('Error loading sollicitaties:', error);
    }
  };

  const saveVacature = async () => {
    try {
      // Ensure required fields are present with defaults
      const vacatureData = {
        ...formData,
        title: formData.title || '',
        location: formData.location || '',
        description: formData.description || '',
        type: formData.type || 'Fulltime',
        requirements: formData.requirements || [],
        benefits: formData.benefits || [],
        icon_name: formData.icon_name || 'briefcase',
        is_active: formData.is_active !== undefined ? formData.is_active : true,
        order_index: formData.order_index !== undefined ? formData.order_index : 0,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('vacatures')
        .upsert(vacatureData);

      if (error) throw error;
      
      toast.success('Vacature opgeslagen!');
      loadVacatures();
      setEditingVacature(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving vacature:', error);
      toast.error('Fout bij opslaan van vacature');
    }
  };

  const deleteVacature = async (id: string) => {
    if (!confirm('Weet je zeker dat je deze vacature wilt verwijderen?')) return;

    try {
      const { error } = await supabase
        .from('vacatures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Vacature verwijderd!');
      loadVacatures();
    } catch (error) {
      console.error('Error deleting vacature:', error);
      toast.error('Fout bij verwijderen van vacature');
    }
  };

  const updateSollicitatieStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('sollicitaties')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Status bijgewerkt!');
      loadSollicitaties();
    } catch (error) {
      console.error('Error updating sollicitatie status:', error);
      toast.error('Fout bij bijwerken van status');
    }
  };

  const startEditing = (vacature?: Vacature) => {
    if (vacature) {
      setEditingVacature(vacature);
      setFormData(vacature);
    } else {
      setEditingVacature({
        id: '',
        title: '',
        location: '',
        type: 'Fulltime',
        salary_range: '',
        description: '',
        requirements: [],
        benefits: [],
        icon_name: 'briefcase',
        is_active: true,
        order_index: vacatures.length,
        created_at: '',
        updated_at: ''
      });
      setFormData({
        title: '',
        location: '',
        type: 'Fulltime',
        salary_range: '',
        description: '',
        requirements: [],
        benefits: [],
        icon_name: 'briefcase',
        is_active: true,
        order_index: vacatures.length
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Laden...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vacatures Beheer</h2>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'vacatures' ? 'default' : 'outline'}
            onClick={() => setActiveTab('vacatures')}
          >
            Vacatures ({vacatures.length})
          </Button>
          <Button
            variant={activeTab === 'sollicitaties' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sollicitaties')}
          >
            <Users className="h-4 w-4 mr-2" />
            Sollicitaties ({sollicitaties.length})
          </Button>
        </div>
      </div>

      {activeTab === 'vacatures' && (
        <div className="space-y-6">
          <Button onClick={() => startEditing()}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Vacature
          </Button>

          <div className="grid grid-cols-1 gap-4">
            {vacatures.map((vacature) => (
              <Card key={vacature.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {vacature.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={vacature.is_active}
                      onCheckedChange={async (checked) => {
                        const updateData = {
                          ...vacature,
                          is_active: checked,
                          updated_at: new Date().toISOString()
                        };
                        
                        const { error } = await supabase
                          .from('vacatures')
                          .update({ is_active: checked, updated_at: updateData.updated_at })
                          .eq('id', vacature.id);

                        if (error) {
                          toast.error('Fout bij bijwerken');
                        } else {
                          toast.success('Status bijgewerkt!');
                          loadVacatures();
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(vacature)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteVacature(vacature.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{vacature.location} • {vacature.type}</p>
                  {vacature.salary_range && (
                    <p className="text-sm text-green-600 mb-2">{vacature.salary_range}</p>
                  )}
                  <p className="text-xs text-gray-500">{vacature.description.substring(0, 100)}...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sollicitaties' && (
        <div className="space-y-4">
          {sollicitaties.map((sollicitatie) => {
            const vacature = vacatures.find(v => v.id === sollicitatie.vacature_id);
            return (
              <Card key={sollicitatie.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{sollicitatie.naam}</CardTitle>
                      <p className="text-sm text-gray-600">{sollicitatie.email} • {sollicitatie.telefoon}</p>
                      <p className="text-sm font-medium text-blue-600">{vacature?.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={sollicitatie.status === 'nieuw' ? 'default' : 'secondary'}>
                        {sollicitatie.status}
                      </Badge>
                      <Select value={sollicitatie.status} onValueChange={(value) => updateSollicitatieStatus(sollicitatie.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nieuw">Nieuw</SelectItem>
                          <SelectItem value="bekeken">Bekeken</SelectItem>
                          <SelectItem value="uitgenodigd">Uitgenodigd</SelectItem>
                          <SelectItem value="afgewezen">Afgewezen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {sollicitatie.motivatie && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Motivatie:</h4>
                      <p className="text-sm text-gray-600">{sollicitatie.motivatie}</p>
                    </div>
                  )}
                  {sollicitatie.cv_url && (
                    <div className="mb-2">
                      <a href={sollicitatie.cv_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        CV bekijken
                      </a>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Ontvangen: {new Date(sollicitatie.created_at).toLocaleDateString('nl-NL')}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Vacature Editor Dialog */}
      {editingVacature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingVacature.id ? 'Vacature Bewerken' : 'Nieuwe Vacature'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titel</label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Bijv. Senior Developer"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Locatie</label>
                <Input
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Bijv. Amsterdam"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={formData.type || 'Fulltime'} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fulltime">Fulltime</SelectItem>
                    <SelectItem value="Parttime">Parttime</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Salaris Range</label>
                <Input
                  value={formData.salary_range || ''}
                  onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                  placeholder="Bijv. €3.000 - €4.000"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Beschrijving</label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Beschrijf de functie..."
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Eisen (één per regel)</label>
                <Textarea
                  value={formData.requirements?.join('\n') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    requirements: e.target.value.split('\n').filter(line => line.trim()) 
                  })}
                  placeholder="Bijv.&#10;3+ jaar ervaring&#10;HBO/WO diploma"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Voordelen (één per regel)</label>
                <Textarea
                  value={formData.benefits?.join('\n') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    benefits: e.target.value.split('\n').filter(line => line.trim()) 
                  })}
                  placeholder="Bijv.&#10;Goede pensioenregeling&#10;Flexibele werktijden"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_active !== false}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <label className="text-sm font-medium">Actief</label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingVacature(null)}>
                  <X className="h-4 w-4 mr-2" />
                  Annuleren
                </Button>
                <Button onClick={saveVacature}>
                  <Save className="h-4 w-4 mr-2" />
                  Opslaan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VacaturesManager;
