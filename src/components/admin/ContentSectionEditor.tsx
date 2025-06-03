
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, X, Eye, EyeOff, Type, Image, MousePointer, Megaphone, Star } from 'lucide-react';

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
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    if (!formData.section_name.trim()) {
      alert('Sectie naam is verplicht!');
      return;
    }
    onSave(formData);
  };

  const contentTypes = [
    { value: 'text', label: 'Gewone Tekst', icon: Type, description: 'Normale tekst content' },
    { value: 'hero', label: 'Hero Sectie', icon: Star, description: 'Grote prominente sectie' },
    { value: 'button', label: 'Button/Link', icon: MousePointer, description: 'Klikbare button of link' },
    { value: 'image', label: 'Afbeelding', icon: Image, description: 'Afbeelding content' },
    { value: 'cta', label: 'Call to Action', icon: Megaphone, description: 'Oproep tot actie sectie' }
  ];

  const currentType = contentTypes.find(type => type.value === formData.content_type);

  const renderPreview = () => {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Voorbeeld van hoe het eruit ziet:
        </h4>
        <div className="bg-white p-4 rounded border space-y-3">
          {formData.title && (
            <h3 className="text-xl font-bold text-gray-900">{formData.title}</h3>
          )}
          {formData.content && (
            <p className="text-gray-700 leading-relaxed">{formData.content}</p>
          )}
          {formData.button_text && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              {formData.button_text}
            </button>
          )}
          {formData.image_url && (
            <div className="text-sm text-gray-600 italic">
              🖼️ Afbeelding: {formData.image_url}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {currentType?.icon && <currentType.icon className="h-5 w-5" />}
            {formData.id ? 'Content Bewerken' : 'Nieuwe Content Toevoegen'}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            {formData.id ? 'Bewerk de content sectie' : 'Voeg een nieuwe content sectie toe aan je website'}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Toggle */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Content Details</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2"
            >
              {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {previewMode ? 'Bewerken' : 'Voorbeeld'}
            </Button>
          </div>

          {previewMode ? (
            renderPreview()
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="section_name" className="text-sm font-medium">
                    Sectie Naam * <span className="text-gray-500">(unieke identifier)</span>
                  </Label>
                  <Input
                    id="section_name"
                    value={formData.section_name}
                    onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                    placeholder="bijv. hero_title, services_description, contact_info"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Gebruik underscore (_) voor spaties. Voorbeeld: hero_title, contact_button
                  </p>
                </div>

                <div>
                  <Label htmlFor="content_type" className="text-sm font-medium">Content Type</Label>
                  <Select
                    value={formData.content_type}
                    onValueChange={(value) => setFormData({ ...formData, content_type: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-gray-500">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="order_index" className="text-sm font-medium">Volgorde</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Bepaalt de volgorde waarin content wordt getoond (0 = eerst)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active" className="text-sm font-medium">
                    Content actief tonen op website
                  </Label>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Titel <span className="text-gray-500">(optioneel)</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Hoofdtitel van deze sectie"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-sm font-medium">
                    Inhoud <span className="text-gray-500">(optioneel)</span>
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="De hoofdtekst van deze sectie..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="button_text" className="text-sm font-medium">
                    Button Tekst <span className="text-gray-500">(optioneel)</span>
                  </Label>
                  <Input
                    id="button_text"
                    value={formData.button_text || ''}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    placeholder="bijv. Meer informatie, Contact opnemen, Offerte aanvragen"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="button_link" className="text-sm font-medium">
                    Button Link <span className="text-gray-500">(optioneel)</span>
                  </Label>
                  <Input
                    id="button_link"
                    value={formData.button_link || ''}
                    onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                    placeholder="bijv. /contact, /diensten, /offerte, https://..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="image_url" className="text-sm font-medium">
                    Afbeelding URL <span className="text-gray-500">(optioneel)</span>
                  </Label>
                  <Input
                    id="image_url"
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="URL naar een afbeelding"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {formData.id ? 'Wijzigingen worden direct opgeslagen' : 'Nieuwe content wordt toegevoegd'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Annuleren
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              {formData.id ? 'Wijzigingen Opslaan' : 'Content Toevoegen'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentSectionEditor;
