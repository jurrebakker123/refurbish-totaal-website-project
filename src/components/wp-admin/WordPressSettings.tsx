import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save } from 'lucide-react';

const WordPressSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Instellingen</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Instellingen Opslaan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Algemene Instellingen</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="site_title">Website Titel</Label>
              <Input id="site_title" defaultValue="RefurbishTotaalNederland" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_url">Website URL</Label>
              <Input id="site_url" defaultValue="https://refurbishtotaalnederland.nl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_email">Admin Email</Label>
              <Input id="admin_email" type="email" defaultValue="admin@refurbishtotaalnederland.nl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Tijdzone</Label>
              <select id="timezone" className="w-full p-2 border border-gray-300 rounded-md">
                <option>Europe/Amsterdam</option>
                <option>Europe/Brussels</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordPressSettings;