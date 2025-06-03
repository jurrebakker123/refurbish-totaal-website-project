
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { seedAllContent } from '@/utils/seedContent';
import { toast } from 'sonner';
import { Database, Loader2 } from 'lucide-react';

const ContentSeeder = () => {
  const [seeding, setSeeding] = useState(false);

  const handleSeedContent = async () => {
    setSeeding(true);
    try {
      const result = await seedAllContent();
      if (result.success) {
        toast.success('Alle content succesvol toegevoegd!');
      } else {
        toast.error('Fout bij toevoegen van content');
      }
    } catch (error) {
      console.error('Error seeding content:', error);
      toast.error('Fout bij toevoegen van content');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Content Database Initialisatie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Klik op de knop hieronder om alle pagina's te voorzien van standaard content die direct bewerkt kan worden.
          Dit voegt content toe voor Homepage, Diensten, Contact, Over Ons, Vacatures, Dakkapel, Zonnepanelen, en alle andere pagina's.
        </p>
        <Button 
          onClick={handleSeedContent} 
          disabled={seeding}
          className="w-full"
        >
          {seeding ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Content Wordt Toegevoegd...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Alle Pagina's Voorzien van Content
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentSeeder;
