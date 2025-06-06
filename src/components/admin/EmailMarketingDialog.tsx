
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Eye, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  preview: string;
  category: 'promotional' | 'seasonal' | 'informational' | 'followup';
}

const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Lente Renovatie Actie',
    subject: '🌸 Lente Renovatie Actie - 15% korting op dakkapellen!',
    preview: 'Maak van de lente het perfecte moment voor uw dakkapel renovatie',
    category: 'seasonal',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🌸 Lente Renovatie Actie</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">15% korting op dakkapellen!</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            De lente is het perfecte moment voor renovaties! Profiteer nu van onze exclusieve lente-actie:
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin: 0 0 10px 0;">✨ Lente Voordelen:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>15% korting op alle dakkapel projecten</li>
              <li>Gratis dakonderzoek ter waarde van €150</li>
              <li>Snelle realisatie in het voorjaar</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            <strong>Actie geldig tot 31 mei 2024</strong>
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://refurbishtotaalnederland.nl/dakkapel" 
               style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Bekijk Onze Dakkapellen
            </a>
          </div>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">Met vriendelijke groet,<br>Het team van Refurbish Totaal Nederland</p>
        </div>
      </div>
    `
  },
  {
    id: '2',
    name: 'Zonnepanelen Promotie',
    subject: '☀️ Bespaar nu op uw energierekening met refurbished zonnepanelen',
    preview: 'Ontdek onze hoogwaardige refurbished zonnepanelen tegen scherpe prijzen',
    category: 'promotional',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">☀️ Zonnepanelen Actie</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Refurbished kwaliteit, nieuwe prestaties</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Maak de overstap naar duurzame energie met onze hoogwaardige refurbished zonnepanelen!
          </p>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">🌟 Waarom kiezen voor onze zonnepanelen?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Tot 40% goedkoper dan nieuwe panelen</li>
              <li>Volledige garantie en certificering</li>
              <li>Professionele installatie door experts</li>
              <li>Directe besparing op uw energierekening</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://refurbishtotaalnederland.nl/zonnepanelen" 
               style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Bekijk Zonnepanelen
            </a>
          </div>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">Met vriendelijke groet,<br>Het team van Refurbish Totaal Nederland</p>
        </div>
      </div>
    `
  }
];

interface EmailMarketingDialogProps {
  onCampaignSent: () => void;
}

const EmailMarketingDialog: React.FC<EmailMarketingDialogProps> = ({ onCampaignSent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [campaign, setCampaign] = useState({
    subject: '',
    content: '',
    recipientType: 'all',
    customEmails: '',
    templateId: ''
  });

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setCampaign({
      ...campaign,
      subject: template.subject,
      content: template.html,
      templateId: template.id
    });
    setActiveTab('compose');
  };

  const handlePreviewTemplate = (template: EmailTemplate) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleSendCampaign = async () => {
    if (!campaign.subject.trim() || !campaign.content.trim()) {
      toast.error('Vul alle vereiste velden in');
      return;
    }

    setLoading(true);
    try {
      const campaignData = {
        ...campaign,
        customEmails: campaign.recipientType === 'custom' 
          ? campaign.customEmails.split(',').map(email => email.trim()).filter(email => email)
          : []
      };

      const { data, error } = await supabase.functions.invoke('email-marketing', {
        body: {
          campaign: campaignData,
          action: 'send_campaign'
        }
      });

      if (error) {
        toast.error('Fout bij versturen campagne: ' + error.message);
        return;
      }

      if (data.success) {
        toast.success(`✅ ${data.message}`);
        setIsOpen(false);
        setCampaign({
          subject: '',
          content: '',
          recipientType: 'all',
          customEmails: '',
          templateId: ''
        });
        setSelectedTemplate(null);
        onCampaignSent();
      } else {
        toast.error('Fout bij versturen campagne: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error('Onverwachte fout bij versturen campagne');
    } finally {
      setLoading(false);
    }
  };

  const categoryLabels = {
    promotional: '🎯 Promotioneel',
    seasonal: '🌤️ Seizoensgebonden',
    informational: 'ℹ️ Informatief',
    followup: '💫 Follow-up'
  };

  const categoryColors = {
    promotional: 'bg-red-100 text-red-800',
    seasonal: 'bg-blue-100 text-blue-800',
    informational: 'bg-green-100 text-green-800',
    followup: 'bg-purple-100 text-purple-800'
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Mail className="w-4 h-4 mr-2" />
            E-mail Marketing
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              E-mail Marketing Campagne
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">📧 Templates</TabsTrigger>
              <TabsTrigger value="compose">✍️ Samenstellen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Kies een professionele template</h3>
                <p className="text-sm text-gray-600">
                  Onze templates zijn geoptimaliseerd voor hoge conversies en engagement
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {emailTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base mb-2">{template.name}</CardTitle>
                            <Badge className={`${categoryColors[template.category]} text-xs`}>
                              {categoryLabels[template.category]}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 mb-3">{template.preview}</p>
                        <p className="text-xs text-gray-500 mb-4 font-mono bg-gray-50 p-2 rounded">
                          {template.subject}
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePreviewTemplate(template)}
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleTemplateSelect(template)}
                            className="flex-1"
                          >
                            <Send className="w-4 h-4 mr-1" />
                            Gebruiken
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compose" className="space-y-4">
              {selectedTemplate && (
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-700">
                    ✨ <strong>Template geselecteerd:</strong> {selectedTemplate.name}
                  </p>
                </div>
              )}
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="subject">Onderwerp</Label>
                  <Input
                    id="subject"
                    value={campaign.subject}
                    onChange={(e) => setCampaign({...campaign, subject: e.target.value})}
                    placeholder="Onderwerp van de e-mail"
                  />
                </div>
                
                <div>
                  <Label htmlFor="recipientType">Ontvangers</Label>
                  <Select value={campaign.recipientType} onValueChange={(value) => setCampaign({...campaign, recipientType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">📊 Alle klanten</SelectItem>
                      <SelectItem value="dakkapel">🏠 Alleen dakkapel klanten</SelectItem>
                      <SelectItem value="zonnepaneel">☀️ Alleen zonnepaneel klanten</SelectItem>
                      <SelectItem value="custom">📝 Aangepaste lijst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {campaign.recipientType === 'custom' && (
                <div>
                  <Label htmlFor="customEmails">E-mailadressen (gescheiden door komma's)</Label>
                  <Textarea
                    id="customEmails"
                    value={campaign.customEmails}
                    onChange={(e) => setCampaign({...campaign, customEmails: e.target.value})}
                    placeholder="email1@example.com, email2@example.com"
                    rows={3}
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="content">Inhoud</Label>
                <Textarea
                  id="content"
                  value={campaign.content}
                  onChange={(e) => setCampaign({...campaign, content: e.target.value})}
                  placeholder="Inhoud van de e-mail (HTML toegestaan)"
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSendCampaign} disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Versturen...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Verstuur Campagne
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
                  Annuleren
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📧 Template Preview: {previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          
          {previewTemplate && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2"><strong>Onderwerp:</strong></p>
                <p className="font-mono bg-white p-2 rounded border">{previewTemplate.subject}</p>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div 
                  dangerouslySetInnerHTML={{ __html: previewTemplate.html }}
                  className="max-h-96 overflow-y-auto"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => handleTemplateSelect(previewTemplate)} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Deze template gebruiken
                </Button>
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Sluiten
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailMarketingDialog;
