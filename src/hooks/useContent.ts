
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
}

export const useContent = (pageName: string) => {
  const [content, setContent] = useState<{ [key: string]: ContentSection }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('content_sections')
          .select('*')
          .eq('page_name', pageName)
          .eq('is_active', true);

        if (error) throw error;

        const contentMap = (data || []).reduce((acc, section) => {
          acc[section.section_name] = section;
          return acc;
        }, {} as { [key: string]: ContentSection });

        setContent(contentMap);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [pageName]);

  const getContent = (sectionName: string, field: 'title' | 'content' | 'button_text' | 'button_link' = 'content') => {
    const section = content[sectionName];
    return section ? section[field] : null;
  };

  const getTitle = (sectionName: string) => getContent(sectionName, 'title');
  const getText = (sectionName: string) => getContent(sectionName, 'content');
  const getButtonText = (sectionName: string) => getContent(sectionName, 'button_text');
  const getButtonLink = (sectionName: string) => getContent(sectionName, 'button_link');

  return {
    content,
    loading,
    getContent,
    getTitle,
    getText,
    getButtonText,
    getButtonLink
  };
};
