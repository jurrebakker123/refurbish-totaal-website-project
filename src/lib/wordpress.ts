
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// WordPress GraphQL endpoint - vervang dit door je eigen WordPress URL
const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL || 'https://your-wordpress-site.com/graphql';

const httpLink = createHttpLink({
  uri: WORDPRESS_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Voeg hier eventuele authenticatie headers toe als nodig
    }
  };
});

export const wordpressClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// WordPress GraphQL queries
export const GET_PAGES = gql`
  query GetPages {
    pages {
      nodes {
        id
        title
        content
        slug
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pageBy(slug: $slug) {
      id
      title
      content
      slug
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_SERVICES = gql`
  query GetServices {
    services {
      nodes {
        id
        title
        content
        slug
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        serviceFields {
          prijs
          beschrijving
          voordelen
          proces
        }
      }
    }
  }
`;
