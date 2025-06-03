
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Edit2, Plus, Trash2 } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [selectedPage, setSelectedPage] = useState('homepage');

  const pages = [
    { value: 'homepage', label: 'Homepage' },
    { value: 'diensten', label: 'Diensten Overzicht' },
    { value: 'dienst-detail', label: 'Dienst Detail Pagina\'s' },
    { value: 'vacatures', label: 'Vacatures' },
    { value: 'over-ons', label: 'Over Ons' },
    { value: 'contact', label: 'Contact' },
    { value: 'projecten', label: 'Projecten' },
    { value: 'offerte', label: 'Offerte Aanvragen' },
    { value: 'dakkapel', label: 'Dakkapel Landing' },
    { value: 'dakkapel-calculator', label: 'Dakkapel Calculator' },
    { value: 'zonnepanelen', label: 'Zonnepanelen' },
    { value: 'tuinhuizen', label: 'Tuinhuizen' },
    { value: 'isolatie', label: 'Isolatie Selectie' },
    { value: 'isolatietechniek', label: 'Isolatietechniek' },
    { value: 'kozijntechniek', label: 'Kozijntechniek' },
    { value: 'bouwhulp', label: 'Bouwhulp' },
    { value: 'footer', label: 'Footer' },
    { value: 'header', label: 'Header & Navigatie' }
  ];

  useEffect(() => {
    loadContentSections();
  }, [selectedPage]);

  const loadContentSections = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .eq('page_name', selectedPage)
        .order('order_index');

      if (error) throw error;
      setContentSections(data || []);
    } catch (error) {
      console.error('Error loading content sections:', error);
      toast.error('Fout bij laden van content');
    } finally {
      setLoading(false);
    }
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
      
      toast.success('Content opgeslagen!');
      loadContentSections();
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving content section:', error);
      toast.error('Fout bij opslaan van content');
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
      loadContentSections();
    } catch (error) {
      console.error('Error deleting content section:', error);
      toast.error('Fout bij verwijderen van content');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Laden...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management Systeem</h2>
        <Button onClick={() => setEditingSection({
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
        })}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Content
        </Button>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Content Beheer</TabsTrigger>
          <TabsTrigger value="vacatures">Vacatures</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <ContentSeeder />
          
          {/* Page Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mb-6">
            {pages.map((page) => (
              <Button
                key={page.value}
                variant={selectedPage === page.value ? "default" : "outline"}
                onClick={() => setSelectedPage(page.value)}
                size="sm"
                className="text-xs"
              >
                {page.label}
              </Button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Content voor: {pages.find(p => p.value === selectedPage)?.label}
              </h3>
              <span className="text-sm text-gray-500">
                {contentSections.length} content secties
              </span>
            </div>

            {contentSections.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-500 mb-4">
                  Geen content secties gevonden voor deze pagina.
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Gebruik de "Alle Pagina's Voorzien van Content" knop hierboven om alle pagina's te initialiseren.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {contentSections.map((section) => (
                  <Card key={section.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {section.section_name}
                        <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                          {section.content_type}
                        </span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={section.is_active}
                          onCheckedChange={async (checked) => {
                            await saveContentSection({
                              ...section,
                              is_active: checked
                            });
                          }}
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
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {section.title && (
                        <p className="font-medium mb-2">{section.title}</p>
                      )}
                      {section.content && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{section.content}</p>
                      )}
                      {section.button_text && (
                        <p className="text-xs text-blue-600">Button: {section.button_text}</p>
                      )}
                      {section.image_url && (
                        <p className="text-xs text-green-600">Afbeelding: {section.image_url}</p>
                      )}
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
