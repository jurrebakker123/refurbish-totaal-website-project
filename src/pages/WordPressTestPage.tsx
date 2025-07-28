
import React from 'react';
import WordPressContent from '@/components/WordPressContent';
import WordPressServices from '@/components/WordPressServices';
import WordPressSetupGuide from '@/components/WordPressSetupGuide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WordPressTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">WordPress CMS Integratie</h1>
        
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Setup Handleiding</TabsTrigger>
            <TabsTrigger value="content">Content Test</TabsTrigger>
            <TabsTrigger value="services">Diensten Test</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="mt-6">
            <WordPressSetupGuide />
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Homepage Content Test</h2>
                <WordPressContent 
                  slug="homepage" 
                  fallback={
                    <div className="text-center py-8">
                      <p className="text-gray-600">Maak een pagina aan in WordPress met slug "homepage"</p>
                    </div>
                  }
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Over Ons Content Test</h2>
                <WordPressContent 
                  slug="over-ons" 
                  fallback={
                    <div className="text-center py-8">
                      <p className="text-gray-600">Maak een pagina aan in WordPress met slug "over-ons"</p>
                    </div>
                  }
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="mt-6">
            <div className="bg-white rounded-lg shadow">
              <WordPressServices />
            </div>
          </TabsContent>
          
          <TabsContent value="admin" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">WordPress Admin Links</h2>
              <div className="space-y-4">
                <a
                  href="#"
                  className="block p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => window.open(process.env.REACT_APP_WORDPRESS_URL?.replace('/graphql', '/wp-admin'), '_blank')}
                >
                  <h3 className="font-semibold">WordPress Admin Dashboard</h3>
                  <p className="text-sm text-gray-600">Beheer je WordPress content</p>
                </a>
                
                <a
                  href="#"
                  className="block p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => window.open(process.env.REACT_APP_WORDPRESS_URL, '_blank')}
                >
                  <h3 className="font-semibold">GraphQL Endpoint</h3>
                  <p className="text-sm text-gray-600">Test je GraphQL queries</p>
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WordPressTestPage;
