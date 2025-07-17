import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormInput, Plus, Edit } from 'lucide-react';

const WordPressFormBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Formulieren Beheer</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nieuw Formulier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FormInput className="h-5 w-5" />
            <span>Bestaande Formulieren</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FormInput className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nog geen formulieren</h3>
            <p className="text-gray-600 mb-4">Maak je eerste formulier aan</p>
            <Button><Plus className="h-4 w-4 mr-2" />Formulier Aanmaken</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordPressFormBuilder;