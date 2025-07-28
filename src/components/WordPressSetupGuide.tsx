
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Download, Settings, Globe, Database } from 'lucide-react';

const WordPressSetupGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">WordPress CMS Koppeling - Setup Handleiding</h1>
        <p className="text-gray-600">Volg deze stappen om WordPress als CMS te koppelen aan je website</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Stap 1: WordPress Installatie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Benodigdheden:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>WordPress hosting (bijv. SiteGround, Kinsta, of lokale installatie)</li>
                <li>WordPress versie 5.0 of hoger</li>
                <li>PHP 7.4 of hoger</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Download WordPress van wordpress.org</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Installeer WordPress op je hosting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Voltooi de WordPress setup</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Stap 2: Benodigde Plugins Installeren
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Verplichte Plugins:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>WPGraphQL</strong> - Voor API toegang</li>
                <li><strong>Advanced Custom Fields (ACF)</strong> - Voor extra velden</li>
                <li><strong>Custom Post Type UI</strong> - Voor aangepaste content types</li>
                <li><strong>WPGraphQL for Advanced Custom Fields</strong> - ACF GraphQL integratie</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Installatie instructies:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ga naar WordPress Admin → Plugins → Add New</li>
                <li>Zoek naar elke plugin en installeer ze</li>
                <li>Activeer alle plugins</li>
                <li>Ga naar GraphQL → Settings om de GraphQL endpoint te controleren</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Stap 3: Content Types Configureren
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Diensten Content Type:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ga naar CPT UI → Add/Edit Post Types</li>
                <li>Maak een nieuwe post type aan: "services"</li>
                <li>Stel de labels in (enkelvoud: "Dienst", meervoud: "Diensten")</li>
                <li>Zorg dat "Show in GraphQL" is ingeschakeld</li>
                <li>GraphQL Single Name: "service"</li>
                <li>GraphQL Plural Name: "services"</li>
              </ol>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Custom Fields met ACF:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ga naar Custom Fields → Field Groups</li>
                <li>Maak een nieuwe field group: "Service Fields"</li>
                <li>Voeg velden toe: prijs, beschrijving, voordelen, proces</li>
                <li>Stel Location Rules in voor "Post Type is equal to services"</li>
                <li>Zorg dat "Show in GraphQL" is ingeschakeld voor elk veld</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Stap 4: Website Configuratie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Environment Variables:</h3>
              <p className="text-sm mb-2">Voeg het volgende toe aan je .env bestand:</p>
              <code className="bg-gray-100 p-2 rounded text-sm block">
                REACT_APP_WORDPRESS_URL=https://jouw-wordpress-site.com/graphql
              </code>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">GraphQL Endpoint Testen:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ga naar: https://jouw-wordpress-site.com/graphql</li>
                <li>Je zou een GraphQL interface moeten zien</li>
                <li>Test een simpele query om te controleren of alles werkt</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Stap 5: Content Migratie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Bestaande Content Overzetten:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Maak pagina's aan in WordPress voor elke belangrijke pagina</li>
                <li>Voeg je diensten toe als "Services" post type</li>
                <li>Vul alle custom fields in</li>
                <li>Test of de content correct wordt opgehaald</li>
              </ol>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Belangrijke Pagina's:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Homepage content</li>
                <li>Over Ons</li>
                <li>Contact informatie</li>
                <li>Diensten (als custom post type)</li>
                <li>Testimonials</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-6">
          <Button className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="mr-2 h-4 w-4" />
            Ik heb WordPress geconfigureerd
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordPressSetupGuide;
