import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContentSection {
  id: string;
  page_name: string;
  section_name: string;
  content_type: string;
  title: string;
  content: string;
  image_url?: string;
  button_text?: string;
  button_link?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const WordPressContentManager = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<ContentSection | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState('all');

  // Form state for new/edit content
  const [formData, setFormData] = useState({
    page_name: '',
    section_name: '',
    content_type: 'text',
    title: '',
    content: '',
    image_url: '',
    button_text: '',
    button_link: '',
    is_active: true,
    order_index: 0
  });

  useEffect(() => {
    loadContentSections();
  }, []);

  useEffect(() => {
    if (id && id !== 'new') {
      loadContentSection(id);
    } else if (id === 'new') {
      setEditingContent({} as ContentSection);
    }
  }, [id]);

  const loadContentSections = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .order('page_name', { ascending: true })
        .order('order_index', { ascending: true });

      if (error) throw error;
      setContentSections(data || []);
    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('Fout bij laden van content');
    } finally {
      setLoading(false);
    }
  };

  const loadContentSection = async (sectionId: string) => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .eq('id', sectionId)
        .single();

      if (error) throw error;
      setEditingContent(data);
      setFormData(data);
    } catch (error) {
      console.error('Error loading content section:', error);
      toast.error('Fout bij laden van content sectie');
    }
  };

  const handleSaveContent = async () => {
    try {
      if (editingContent?.id) {
        // Update existing content
        const { error } = await supabase
          .from('content_sections')
          .update(formData)
          .eq('id', editingContent.id);

        if (error) throw error;
        toast.success('Content succesvol bijgewerkt');
      } else {
        // Create new content
        const { error } = await supabase
          .from('content_sections')
          .insert(formData);

        if (error) throw error;
        toast.success('Content succesvol aangemaakt');
      }

      loadContentSections();
      navigate('/wp-admin/content');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Fout bij opslaan van content');
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!confirm('Weet je zeker dat je deze content wilt verwijderen?')) return;

    try {
      const { error } = await supabase
        .from('content_sections')
        .delete()
        .eq('id', contentId);

      if (error) throw error;
      toast.success('Content succesvol verwijderd');
      loadContentSections();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Fout bij verwijderen van content');
    }
  };

  const toggleContentStatus = async (contentId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('content_sections')
        .update({ is_active: !currentStatus })
        .eq('id', contentId);

      if (error) throw error;
      toast.success(`Content ${!currentStatus ? 'geactiveerd' : 'gedeactiveerd'}`);
      loadContentSections();
    } catch (error) {
      console.error('Error updating content status:', error);
      toast.error('Fout bij wijzigen van content status');
    }
  };

  const uniquePages = [...new Set(contentSections.map(section => section.page_name))];

  const filteredContent = contentSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.page_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage = selectedPage === 'all' || section.page_name === selectedPage;
    return matchesSearch && matchesPage;
  });

  // If editing/creating content
  if (editingContent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => {
                setEditingContent(null);
                navigate('/wp-admin/content');
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar content overzicht
            </Button>
          </div>
          <Button onClick={handleSaveContent} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {editingContent.id ? 'Content Bijwerken' : 'Content Opslaan'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{editingContent.id ? 'Content Bewerken' : 'Nieuwe Content'}</CardTitle>
            <CardDescription>
              Voeg nieuwe content toe of bewerk bestaande content secties
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="page_name">Pagina Naam</Label>
                <Input
                  id="page_name"
                  value={formData.page_name}
                  onChange={(e) => setFormData({ ...formData, page_name: e.target.value })}
                  placeholder="Bijv: home, over-ons, diensten"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section_name">Sectie Naam</Label>
                <Input
                  id="section_name"
                  value={formData.section_name}
                  onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                  placeholder="Bijv: hero, features, testimonials"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_type">Content Type</Label>
                <select
                  id="content_type"
                  value={formData.content_type}
                  onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="text">Tekst</option>
                  <option value="hero">Hero Sectie</option>
                  <option value="feature">Feature</option>
                  <option value="testimonial">Testimonial</option>
                  <option value="cta">Call to Action</option>
                  <option value="image">Afbeelding</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order_index">Volgorde</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Content titel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                placeholder="Voer je content in..."
              />
            </div>

            {formData.content_type !== 'text' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Afbeelding URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="button_text">Button Tekst</Label>
                    <Input
                      id="button_text"
                      value={formData.button_text}
                      onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                      placeholder="Klik hier"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="button_link">Button Link</Label>
                    <Input
                      id="button_link"
                      value={formData.button_link}
                      onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                      placeholder="/contact"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="is_active">Content actief</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main content list view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Beheer</h1>
          <p className="text-gray-600 mt-2">Beheer alle content secties van je website</p>
        </div>
        <Button 
          onClick={() => navigate('/wp-admin/content/pages/new')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Content
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Zoek content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Alle Pagina's</option>
                {uniquePages.map(page => (
                  <option key={page} value={page}>{page}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((section) => (
            <Card key={section.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section.title || 'Geen titel'}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Badge variant={section.is_active ? "default" : "secondary"}>
                      {section.is_active ? 'Actief' : 'Inactief'}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  {section.page_name} • {section.section_name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {section.content_type === 'text' && <FileText className="h-4 w-4" />}
                    {section.content_type === 'image' && <ImageIcon className="h-4 w-4" />}
                    {section.button_link && <LinkIcon className="h-4 w-4" />}
                    <span className="text-sm text-gray-600 capitalize">{section.content_type}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {section.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/wp-admin/content/pages/${section.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleContentStatus(section.id, section.is_active)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteContent(section.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-xs text-gray-500">
                      #{section.order_index}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredContent.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geen content gevonden</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedPage !== 'all' 
                ? 'Geen content gevonden met de huidige filters.' 
                : 'Je hebt nog geen content aangemaakt.'}
            </p>
            <Button onClick={() => navigate('/wp-admin/content/pages/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Eerste Content Aanmaken
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WordPressContentManager;