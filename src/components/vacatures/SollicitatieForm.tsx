
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

interface Vacature {
  id: string;
  title: string;
  location: string;
  type: string;
  salary_range: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
  icon_name: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface SollicitatieFormProps {
  vacatures: Vacature[];
}

const SollicitatieForm: React.FC<SollicitatieFormProps> = ({ vacatures }) => {
  const [formData, setFormData] = useState({
    vacature_id: '',
    naam: '',
    email: '',
    telefoon: '',
    motivatie: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('sollicitaties')
        .insert([{
          ...formData,
          status: 'nieuw'
        }]);

      if (error) throw error;

      toast.success('Sollicitatie succesvol verzonden!');
      setFormData({
        vacature_id: '',
        naam: '',
        email: '',
        telefoon: '',
        motivatie: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Fout bij verzenden van sollicitatie');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-brand-darkGreen">
          Solliciteer Nu
        </CardTitle>
        <p className="text-center text-gray-600">
          Vul het formulier in en wij nemen zo snel mogelijk contact met je op
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="vacature_id">Vacature *</Label>
            <Select 
              value={formData.vacature_id} 
              onValueChange={(value) => setFormData({ ...formData, vacature_id: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een vacature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open sollicitatie</SelectItem>
                {vacatures.map((vacature) => (
                  <SelectItem key={vacature.id} value={vacature.id}>
                    {vacature.title} - {vacature.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="naam">Volledige naam *</Label>
            <Input
              id="naam"
              type="text"
              value={formData.naam}
              onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">E-mailadres *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefoon">Telefoonnummer *</Label>
            <Input
              id="telefoon"
              type="tel"
              value={formData.telefoon}
              onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="motivatie">Motivatie</Label>
            <Textarea
              id="motivatie"
              value={formData.motivatie}
              onChange={(e) => setFormData({ ...formData, motivatie: e.target.value })}
              placeholder="Vertel ons waarom je bij Refurbish Totaal Nederland wilt werken..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-brand-green hover:bg-brand-darkGreen"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Versturen...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Sollicitatie Versturen
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SollicitatieForm;
