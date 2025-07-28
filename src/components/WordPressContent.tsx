
import React from 'react';
import { useWordPressPage } from '@/hooks/useWordPressContent';
import { Skeleton } from '@/components/ui/skeleton';

interface WordPressContentProps {
  slug: string;
  fallback?: React.ReactNode;
}

const WordPressContent: React.FC<WordPressContentProps> = ({ slug, fallback }) => {
  const { page, loading, error } = useWordPressPage(slug);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error || !page) {
    return fallback || (
      <div className="text-center py-8">
        <p className="text-gray-600">Content kon niet worden geladen.</p>
      </div>
    );
  }

  return (
    <div className="wordpress-content">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{page.title}</h1>
      {page.featuredImage && (
        <img
          src={page.featuredImage.node.sourceUrl}
          alt={page.featuredImage.node.altText}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
};

export default WordPressContent;
