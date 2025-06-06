
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Send, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'quote' | 'follow_up' | 'confirmation' | 'reminder';
}

const EmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Offerte Bevestiging',
      subject: 'Uw offerte aanvraag voor {project_type}',
      content: 'Beste {klant_naam},\n\nBedankt voor uw interesse in onze {project_type} diensten. We hebben uw aanvraag ontvangen en zullen binnen 24 uur contact met u opnemen.\n\nMet vriendelijke groet,\nRefurbish Totaal Nederland',
      type: 'confirmation'
    },
    {
      id: '2',
      name: 'Follow-up na Offerte',
      subject: 'Follow-up: Uw {project_type} offerte',
      content: 'Beste {klant_naam},\n\nEnkele dagen geleden hebben wij u een offerte gestuurd voor uw {project_type} project. Heeft u nog vragen of kunnen wij u ergens mee helpen?\n\nWij horen graag van u!\n\nMet vriendelijke groet,\nRefurbish Totaal Nederland',
      type: 'follow_up'
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!selectedTemplate) return;
    
    setTemplates(prev => 
      prev.map(t => t.id === selectedTemplate.id ? selectedTemplate : t)
    );
    
    toast.success('Template opgeslagen!');
    setIsEditing(false);
  };

  const handleSendTest = () => {
    if (!selectedTemplate) return;
    
    // In een echte implementatie zou dit een test email versturen
    toast.success('Test email zou worden verstuurd!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Templates Beheer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Template List */}
            <div className="space-y-4">
              <h3 className="font-semibold">Beschikbare Templates</h3>
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsEditing(false);
                    }}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Template Editor */}
            {selectedTemplate && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Template Editor</h3>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        Bewerken
                      </Button>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                          Annuleren
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Opslaan
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Template Naam</Label>
                    <Input
                      value={selectedTemplate.name}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        name: e.target.value
                      })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label>Onderwerp</Label>
                    <Input
                      value={selectedTemplate.subject}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        subject: e.target.value
                      })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label>Email Inhoud</Label>
                    <Textarea
                      value={selectedTemplate.content}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        content: e.target.value
                      })}
                      disabled={!isEditing}
                      rows={8}
                    />
                  </div>

                  <div>
                    <Label>Template Type</Label>
                    <Select
                      value={selectedTemplate.type}
                      onValueChange={(value: any) => setSelectedTemplate({
                        ...selectedTemplate,
                        type: value
                      })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote">Offerte</SelectItem>
                        <SelectItem value="follow_up">Follow-up</SelectItem>
                        <SelectItem value="confirmation">Bevestiging</SelectItem>
                        <SelectItem value="reminder">Herinnering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSendTest} variant="outline" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Test Email Versturen
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Template Variabelen</h4>
            <p className="text-sm text-blue-700 mb-2">
              Gebruik deze variabelen in uw templates (worden automatisch vervangen):
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
              <div>• {'{klant_naam}'} - Naam van de klant</div>
              <div>• {'{project_type}'} - Type project (dakkapel/zonnepanelen)</div>
              <div>• {'{bedrijf_naam}'} - Refurbish Totaal Nederland</div>
              <div>• {'{datum}'} - Huidige datum</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplates;
