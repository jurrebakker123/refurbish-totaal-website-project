
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Save, X, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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
}

const VacaturesManager = () => {
  const [vacatures, setVacatures] = useState<Vacature[]>([]);
  const [sollicitaties, setSollicitaties] = useState<Sollicitatie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVacature, setEditingVacature] = useState<Vacature | null>(null);
  const [viewingSollicitaties, setViewingSollicitaties] = useState<string | null>(null);

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

  const saveVacature = async (vacature: Partial<Vacature>) => {
    try {
      const { error } = await supabase
        .from('vacatures')
        .upsert({
          ...vacature,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast.success('Vacature opgeslagen!');
      loadVacatures();
      setEditingVacature(null);
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

  const getSollicitatiesForVacature = (vacatureId: string) => {
    return sollicitaties.filter(s => s.vacature_id === vacatureId);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Laden...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Vacatures Beheer</h3>
        <Button onClick={() => setEditingVacature({
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
        })}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Vacature
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {vacatures.map((vacature) => {
          const sollicitatiesCount = getSollicitatiesForVacature(vacature.id).length;
          
          return (
            <Card key={vacature.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-lg">{vacature.title}</CardTitle>
                  {!vacature.is_active && (
                    <Badge variant="secondary">Inactief</Badge>
                  )}
                  {sollicitatiesCount > 0 && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {sollicitatiesCount} sollicitaties
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={vacature.is_active}
                    onCheckedChange={async (checked) => {
                      await saveVacature({
                        ...vacature,
                        is_active: checked
                      });
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingSollicitaties(vacature.id)}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingVacature(vacature)}
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
                  <p className="text-sm text-gray-600 mb-2">{vacature.salary_range}</p>
                )}
                <p className="text-sm">{vacature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Vacature Editor */}
      {editingVacature && (
        <VacatureEditor
          vacature={editingVacature}
          onSave={saveVacature}
          onCancel={() => setEditingVacature(null)}
        />
      )}

      {/* Sollicitaties Viewer */}
      {viewingSollicitaties && (
        <SollicitatiesViewer
          vacatureId={viewingSollicitaties}
          sollicitaties={getSollicitatiesForVacature(viewingSollicitaties)}
          onClose={() => setViewingSollicitaties(null)}
        />
      )}
    </div>
  );
};

const VacatureEditor: React.FC<{
  vacature: Vacature;
  onSave: (vacature: Partial<Vacature>) => void;
  onCancel: () => void;
}> = ({ vacature, onSave, onCancel }) => {
  const [formData, setFormData] = useState(vacature);
  const [requirementsText, setRequirementsText] = useState(vacature.requirements.join('\n'));
  const [benefitsText, setBenefitsText] = useState(vacature.benefits.join('\n'));

  const handleSave = () => {
    onSave({
      ...formData,
      requirements: requirementsText.split('\n').filter(line => line.trim()),
      benefits: benefitsText.split('\n').filter(line => line.trim())
    });
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? 'Vacature Bewerken' : 'Nieuwe Vacature'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Functietitel</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="location">Locatie</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="salary_range">Salaris</Label>
            <Input
              id="salary_range"
              value={formData.salary_range || ''}
              onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="description">Beschrijving</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="requirements">Eisen (één per regel)</Label>
            <Textarea
              id="requirements"
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="benefits">Wat wij bieden (één per regel)</Label>
            <Textarea
              id="benefits"
              value={benefitsText}
              onChange={(e) => setBenefitsText(e.target.value)}
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="icon_name">Icoon</Label>
            <Input
              id="icon_name"
              value={formData.icon_name}
              onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label>Actief</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Annuleren
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Opslaan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SollicitatiesViewer: React.FC<{
  vacatureId: string;
  sollicitaties: Sollicitatie[];
  onClose: () => void;
}> = ({ vacatureId, sollicitaties, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sollicitaties ({sollicitaties.length})</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {sollicitaties.map((sollicitatie) => (
            <Card key={sollicitatie.id}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">{sollicitatie.naam}</p>
                    <p className="text-sm text-gray-600">{sollicitatie.email}</p>
                    <p className="text-sm text-gray-600">{sollicitatie.telefoon}</p>
                  </div>
                  <div>
                    <Badge>{sollicitatie.status}</Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(sollicitatie.created_at).toLocaleDateString('nl-NL')}
                    </p>
                  </div>
                  {sollicitatie.motivatie && (
                    <div className="col-span-2">
                      <Label>Motivatie:</Label>
                      <p className="text-sm mt-1">{sollicitatie.motivatie}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {sollicitaties.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nog geen sollicitaties ontvangen voor deze vacature.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Sluiten</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VacaturesManager;
