import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Edit, Shield } from 'lucide-react';

const WordPressUserManager = () => {
  const [users] = useState([
    { id: '1', name: 'Admin', email: 'admin@refurbishtotaalnederland.nl', role: 'Administrator', status: 'active' },
    { id: '2', name: 'Editor', email: 'editor@refurbishtotaalnederland.nl', role: 'Editor', status: 'active' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gebruikers Beheer</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Gebruiker
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Alle Gebruikers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{user.role}</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost"><Shield className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordPressUserManager;