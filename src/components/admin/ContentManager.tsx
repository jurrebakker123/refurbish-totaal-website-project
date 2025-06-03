
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Edit2, Plus, Trash2, RefreshCw } from 'lucide-react';
import ContentSectionEditor from './ContentSectionEditor';
import VacaturesManager from './VacaturesManager';
import ContentSeeder from './ContentSeeder';

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

const ContentManager = () => {
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [allContent, setAllContent] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [selectedPage, setSelectedPage] = useState('homepage');
  const [searchTerm, setSearchTerm] = useState('');

  const pages = [
    { value: 'homepage', label: 'Homepage', icon: '🏠' },
    { value: 'diensten', label: 'Diensten', icon: '🔧' },
    { value: 'dienst-detail', label: 'Dienst Details', icon: '📋' },
    { value: 'vacatures', label: 'Vacatures', icon: '💼' },
    { value: 'over-ons', label: 'Over Ons', icon: '👥' },
    { value: 'contact', label: 'Contact', icon: '📞' },
    { value: 'projecten', label: 'Projecten', icon: '🏗️' },
    { value: 'offerte', label: 'Offerte', icon: '💰' },
    { value: 'dakkapel', label: 'Dakkapel', icon: '🏠' },
    { value: 'dakkapel-calculator', label: 'Dakkapel Calculator', icon: '🧮' },
    { value: 'zonnepanelen', label: 'Zonnepanelen', icon: '☀️' },
    { value: 'tuinhuizen', label: 'Tuinhuizen', icon: '🏡' },
    { value: 'isolatie', label: 'Isolatie', icon: '🧱' },
    { value: 'isolatietechniek', label: 'Isolatietechniek', icon: '🔧' },
    { value: 'kozijntechniek', label: 'Kozijntechniek', icon: '🪟' },
    { value: 'bouwhulp', label: 'Bouwhulp', icon: '🔨' },
    { value: 'footer', label: 'Footer', icon: '⬇️' },
    { value: 'header', label: 'Header & Navigatie', icon: '⬆️' }
  ];

  useEffect(() => {
    loadAllContent();
  }, []);

  useEffect(() => {
    filterContentByPage();
  }, [selectedPage, allContent, searchTerm]);

  const loadAllContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .order('page_name, order_index');

      if (error) throw error;
      setAllContent(data || []);
    } catch (error) {
      console.error('Error loading content sections:', error);
      toast.error('Fout bij laden van content');
    } finally {
      setLoading(false);
    }
  };

  const filterContentByPage = () => {
    let filtered = allContent.filter(section => section.page_name === selectedPage);
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(section => 
        section.section_name.toLowerCase().includes(search) ||
        (section.title && section.title.toLowerCase().includes(search)) ||
        (section.content && section.content.toLowerCase().includes(search)) ||
        (section.button_text && section.button_text.toLowerCase().includes(search))
      );
    }
    
    setContentSections(filtered);
  };

  const saveContentSection = async (section: Partial<ContentSection>) => {
    try {
      const sectionData = {
        ...section,
        page_name: section.page_name || selectedPage,
        section_name: section.section_name || '',
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('content_sections')
        .upsert(sectionData);

      if (error) throw error;
      
      toast.success('Content succesvol opgeslagen!');
      loadAllContent();
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving content section:', error);
      toast.error('Fout bij opslaan van content');
    }
  };

  const toggleSectionActive = async (section: ContentSection) => {
    try {
      const { error } = await supabase
        .from('content_sections')
        .update({ is_active: !section.is_active, updated_at: new Date().toISOString() })
        .eq('id', section.id);

      if (error) throw error;
      
      toast.success(`Content ${!section.is_active ? 'geactiveerd' : 'gedeactiveerd'}!`);
      loadAllContent();
    } catch (error) {
      console.error('Error toggling section:', error);
      toast.error('Fout bij wijzigen van content status');
    }
  };

  const deleteContentSection = async (id: string) => {
    if (!confirm('Weet je zeker dat je deze content wilt verwijderen?')) return;

    try {
      const { error } = await supabase
        .from('content_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Content verwijderd!');
      loadAllContent();
    } catch (error) {
      console.error('Error deleting content section:', error);
      toast.error('Fout bij verwijderen van content');
    }
  };

  const createNewSection = () => {
    setEditingSection({
      id: '',
      page_name: selectedPage,
      section_name: '',
      content_type: 'text',
      title: '',
      content: '',
      image_url: '',
      button_text: '',
      button_link: '',
      order_index: contentSections.length,
      is_active: true,
      created_at: '',
      updated_at: ''
    });
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return '📝';
      case 'hero': return '🌟';
      case 'button': return '🔘';
      case 'image': return '🖼️';
      case 'cta': return '📢';
      default: return '📄';
    }
  };

  const getPageStats = () => {
    const totalSections = allContent.length;
    const activeSections = allContent.filter(s => s.is_active).length;
    const pagesWithContent = [...new Set(allContent.map(s => s.page_name))].length;
    
    return { totalSections, activeSections, pagesWithContent };
  };

  const stats = getPageStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Content wordt geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Website Content Beheer</h2>
          <p className="text-gray-600 mt-1">Beheer alle teksten, afbeeldingen en content van je website</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {stats.totalSections} secties • {stats.activeSections} actief • {stats.pagesWithContent} pagina's
          </div>
          <Button onClick={loadAllContent} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Vernieuwen
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <span>📝</span>
            Website Content
          </TabsTrigger>
          <TabsTrigger value="vacatures" className="flex items-center gap-2">
            <span>💼</span>
            Vacatures Beheer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <ContentSeeder />
          
          {/* Page Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>🎯</span>
                Selecteer Pagina om te Bewerken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {pages.map((page) => {
                  const pageContentCount = allContent.filter(s => s.page_name === page.value).length;
                  const activeContentCount = allContent.filter(s => s.page_name === page.value && s.is_active).length;
                  
                  return (
                    <Button
                      key={page.value}
                      variant={selectedPage === page.value ? "default" : "outline"}
                      onClick={() => setSelectedPage(page.value)}
                      className="h-auto p-3 flex flex-col items-center gap-2 relative"
                    >
                      <span className="text-lg">{page.icon}</span>
                      <span className="text-xs font-medium">{page.label}</span>
                      {pageContentCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {activeContentCount}
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Search and Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Zoek in content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button onClick={createNewSection} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nieuwe Content Toevoegen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span>{pages.find(p => p.value === selectedPage)?.icon}</span>
                Content voor: {pages.find(p => p.value === selectedPage)?.label}
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {contentSections.length} content secties
              </span>
            </div>

            {contentSections.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <div className="text-4xl">📝</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Geen content gevonden voor deze pagina
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ? 
                        `Geen content gevonden voor "${searchTerm}"` : 
                        'Deze pagina heeft nog geen content secties.'
                      }
                    </p>
                    {!searchTerm && (
                      <p className="text-sm text-gray-500 mb-4">
                        Gebruik de "Alle Pagina's Voorzien van Content" knop hierboven om standaard content toe te voegen.
                      </p>
                    )}
                    <Button onClick={createNewSection} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Eerste Content Sectie Toevoegen
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {contentSections.map((section) => (
                  <Card key={section.id} className={`transition-all ${section.is_active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getContentTypeIcon(section.content_type)}</span>
                        <div>
                          <CardTitle className="text-base font-medium">
                            {section.section_name || 'Naamloze sectie'}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {section.content_type}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${section.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                              {section.is_active ? 'Actief' : 'Inactief'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={section.is_active}
                          onCheckedChange={() => toggleSectionActive(section)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSection(section)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteContentSection(section.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {section.title && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Titel</span>
                            <p className="font-medium text-gray-900">{section.title}</p>
                          </div>
                        )}
                        {section.content && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Inhoud</span>
                            <p className="text-sm text-gray-700 line-clamp-3">{section.content}</p>
                          </div>
                        )}
                        {section.button_text && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Button</span>
                            <p className="text-sm text-blue-600 font-medium">
                              {section.button_text} {section.button_link && `→ ${section.button_link}`}
                            </p>
                          </div>
                        )}
                        {section.image_url && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Afbeelding</span>
                            <p className="text-sm text-green-600">{section.image_url}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="vacatures">
          <VacaturesManager />
        </TabsContent>
      </Tabs>

      {/* Content Section Editor */}
      {editingSection && (
        <ContentSectionEditor
          section={editingSection}
          onSave={saveContentSection}
          onCancel={() => setEditingSection(null)}
        />
      )}
    </div>
  );
};

export default ContentManager;
