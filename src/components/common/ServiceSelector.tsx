
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PaintBucket, Hammer } from 'lucide-react';

const ServiceSelector = () => {
  const navigate = useNavigate();

  const handleServiceSelect = (service: 'schilderwerk' | 'stucwerk') => {
    if (service === 'schilderwerk') {
      navigate('/schilderwerk-configurator');
    } else {
      navigate('/stucwerk-configurator');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center mb-4">Waar bent u naar op zoek?</CardTitle>
          <p className="text-center text-gray-600">
            Kies de dienst waar u interesse in heeft
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300" 
                  onClick={() => handleServiceSelect('schilderwerk')}>
              <CardContent className="p-8 text-center">
                <PaintBucket className="w-20 h-20 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-semibold mb-3">Schilderwerk</h3>
                <p className="text-gray-600 mb-6">
                  Binnen- en buitenschilderwerk, kozijnen, en meer
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceSelect('schilderwerk');
                  }}
                >
                  Kies Schilderwerk
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300" 
                  onClick={() => handleServiceSelect('stucwerk')}>
              <CardContent className="p-8 text-center">
                <Hammer className="w-20 h-20 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-semibold mb-3">Stukadoorswerk</h3>
                <p className="text-gray-600 mb-6">
                  Stucwerk, spachtelputz, decoratief stucwerk en meer
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceSelect('stucwerk');
                  }}
                >
                  Kies Stukadoorswerk
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceSelector;
