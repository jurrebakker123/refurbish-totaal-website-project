import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

const WordPressAnalytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Pageviews</p>
                <p className="text-2xl font-bold">12,543</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Bezoekers</p>
                <p className="text-2xl font-bold">3,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Conversies</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold">32%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WordPressAnalytics;