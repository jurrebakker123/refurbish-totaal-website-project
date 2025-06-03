
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, X } from 'lucide-react';

interface ContentSection {
  id: string;
  page_name: string;
  section_name: string;
  content_type: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ContentSectionEditorProps {
  section: ContentSection;
  onSave: (section: Partial<ContentSection>) => void;
  onCancel: () => void;
}

const ContentSectionEditor: React.FC<ContentSectionEditorProps> = ({
  section,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState(section);

  const handleSave = () => {
    onSave(formData);
  };

  const contentTypes = [
    { value: 'text', label: 'Tekst' },
    { value: 'hero', label: 'Hero Sectie' },
    { value: 'button', label: 'Button' },
    { value: 'image', label: 'Afbeelding' },
    { value: 'cta', label: 'Call to Action' }
  ];

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? 'Content Bewerken' : 'Nieuwe Content'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="section_name">Sectie Naam</Label>
            <Input
              id="section_name"
              value={formData.section_name}
              onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
              placeholder="bijv. hero_title, services_description"
            />
          </div>

          <div>
            <Label htmlFor="content_type">Content Type</Label>
            <Select
              value={formData.content_type}
              onValueChange={(value) => setFormData({ ...formData, content_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Hoofdtitel (optioneel)"
            />
          </div>

          <div>
            <Label htmlFor="content">Inhoud</Label>
            <Textarea
              id="content"
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Beschrijvende tekst"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="button_text">Button Tekst</Label>
            <Input
              id="button_text"
              value={formData.button_text || ''}
              onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
              placeholder="bijv. Meer info, Contact opnemen"
            />
          </div>

          <div>
            <Label htmlFor="button_link">Button Link</Label>
            <Input
              id="button_link"
              value={formData.button_link || ''}
              onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
              placeholder="bijv. /contact, /diensten"
            />
          </div>

          <div>
            <Label htmlFor="image_url">Afbeelding URL</Label>
            <Input
              id="image_url"
              value={formData.image_url || ''}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="URL naar afbeelding"
            />
          </div>

          <div>
            <Label htmlFor="order_index">Volgorde</Label>
            <Input
              id="order_index"
              type="number"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label htmlFor="is_active">Actief</Label>
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

export default ContentSectionEditor;
