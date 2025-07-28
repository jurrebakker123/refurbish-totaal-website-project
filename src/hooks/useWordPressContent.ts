import { useState, useEffect } from 'react';
import { wordpressClient, GET_PAGES, GET_PAGE_BY_SLUG, GET_POSTS } from '@/lib/wordpress';

interface WordPressPage {
  id: string;
  title: string;
  content: string;
  slug: string;
  modified: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface WordPressPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export const useWordPressPages = () => {
  const [pages, setPages] = useState<WordPressPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const result = await wordpressClient.query({
          query: GET_PAGES,
        });
        setPages(result.data.pages.nodes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Er ging iets mis');
        console.error('WordPress pages error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { pages, loading, error };
};

export const useWordPressPage = (slug: string) => {
  const [page, setPage] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const result = await wordpressClient.query({
          query: GET_PAGE_BY_SLUG,
          variables: { slug },
        });
        setPage(result.data.pageBy);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Er ging iets mis');
        console.error('WordPress page error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  return { page, loading, error };
};

export const useWordPressPosts = () => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await wordpressClient.query({
          query: GET_POSTS,
        });
        setPosts(result.data.posts.nodes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Er ging iets mis');
        console.error('WordPress posts error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
