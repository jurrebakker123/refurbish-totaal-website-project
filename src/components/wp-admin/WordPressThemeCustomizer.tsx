import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Save } from 'lucide-react';

const WordPressThemeCustomizer = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Vormgeving</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Wijzigingen Opslaan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Theme Aanpassingen</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Kleuren</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                  <span>Primaire kleur</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded border"></div>
                  <span>Accent kleur</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Logo</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-600">Sleep logo hier of klik om te uploaden</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordPressThemeCustomizer;