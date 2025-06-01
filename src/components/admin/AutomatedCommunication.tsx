
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Star, CheckCircle, Smartphone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AutomatedCommunicationProps {
  onSendMessage: (message: any) => void;
}

const AutomatedCommunication: React.FC<AutomatedCommunicationProps> = ({ onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('status-updates');
  const [loading, setLoading] = useState(false);
  
  const [automationSettings, setAutomationSettings] = useState({
    autoStatusUpdates: true,
    autoReviewRequests: true,
    followupReminders: true
  });

  const [statusUpdateTemplate, setStatusUpdateTemplate] = useState({
    subject: 'Update over uw {project_type} project',
    message: 'Beste {klant_naam},\n\nUw project heeft een nieuwe status: {nieuwe_status}.\n\nMet vriendelijke groet,\nRefurbish Totaal Nederland'
  });

  const [reviewRequestTemplate, setReviewRequestTemplate] = useState({
    subject: 'Uw ervaring met ons project',
    message: 'Beste {klant_naam},\n\nUw {project_type} project is afgerond! We hopen dat u tevreden bent met het resultaat.\n\nWilt u een korte review achterlaten? Dit helpt ons enorm!\n\nMet vriendelijke groet,\nRefurbish Totaal Nederland'
  });

  const statusTemplates = [
    { status: 'offerte_verzonden', title: 'Offerte verzonden', enabled: true },
    { status: 'akkoord', title: 'Project akkoord', enabled: true },
    { status: 'op_locatie', title: 'Locatiebezoek gepland', enabled: true },
    { status: 'in_aanbouw', title: 'Project in uitvoering', enabled: true },
    { status: 'afgehandeld', title: 'Project afgerond', enabled: true }
  ];

  const sendTestMessage = async (type: string, medium: string) => {
    setLoading(true);
    try {
      // Simulate sending test message
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`✅ Test ${type} via ${medium} verzonden naar info@refurbishtotaalnederland.nl`);
    } catch (error) {
      toast.error(`Fout bij verzenden test ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const sendAutomaticStatusUpdate = async (customerData: any, newStatus: string) => {
    setLoading(true);
    try {
      const message = statusUpdateTemplate.message
        .replace('{klant_naam}', customerData.naam)
        .replace('{project_type}', customerData.model ? 'dakkapel' : 'zonnepanelen')
        .replace('{nieuwe_status}', newStatus);

      const subject = statusUpdateTemplate.subject
        .replace('{project_type}', customerData.model ? 'dakkapel' : 'zonnepanelen');

      // Here you would integrate with your email service
      console.log('Sending status update:', { to: customerData.email, subject, message });
      
      toast.success(`✅ Status update verzonden naar ${customerData.naam}`);
      onSendMessage({ type: 'status_update', customer: customerData.naam, status: newStatus });
    } catch (error) {
      toast.error('Fout bij verzenden status update');
    } finally {
      setLoading(false);
    }
  };

  const sendReviewRequest = async (customerData: any) => {
    setLoading(true);
    try {
      const message = reviewRequestTemplate.message
        .replace('{klant_naam}', customerData.naam)
        .replace('{project_type}', customerData.model ? 'dakkapel' : 'zonnepanelen');

      // Here you would integrate with your email service
      console.log('Sending review request:', { to: customerData.email, message });
      
      toast.success(`✅ Review aanvraag verzonden naar ${customerData.naam}`);
      onSendMessage({ type: 'review_request', customer: customerData.naam });
    } catch (error) {
      toast.error('Fout bij verzenden review aanvraag');
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = () => {
    toast.success('✅ Templates en instellingen opgeslagen!');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Automatische Communicatie
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Automatische Klantcommunicatie
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Navigation */}
          <div className="flex gap-2 border-b">
            <Button
              variant={activeTab === 'status-updates' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('status-updates')}
              size="sm"
            >
              Status Updates
            </Button>
            <Button
              variant={activeTab === 'review-requests' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('review-requests')}
              size="sm"
            >
              Review Aanvragen
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('settings')}
              size="sm"
            >
              Instellingen
            </Button>
          </div>

          {/* Status Updates Tab */}
          {activeTab === 'status-updates' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Automatische Status Updates</CardTitle>
                  <p className="text-sm text-gray-600">
                    Verstuur automatisch berichten wanneer een project van status verandert
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Automatische updates inschakelen</Label>
                    <Switch
                      checked={automationSettings.autoStatusUpdates}
                      onCheckedChange={(checked) => 
                        setAutomationSettings(prev => ({ ...prev, autoStatusUpdates: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email Sjabloon</Label>
                    <Input
                      placeholder="Onderwerp"
                      value={statusUpdateTemplate.subject}
                      onChange={(e) => 
                        setStatusUpdateTemplate(prev => ({ ...prev, subject: e.target.value }))
                      }
                    />
                    <Textarea
                      placeholder="Bericht"
                      rows={6}
                      value={statusUpdateTemplate.message}
                      onChange={(e) => 
                        setStatusUpdateTemplate(prev => ({ ...prev, message: e.target.value }))
                      }
                    />
                    <p className="text-xs text-gray-500">
                      Gebruik {'{klant_naam}'}, {'{project_type}'}, {'{nieuwe_status}'} voor dynamische content
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {statusTemplates.map((template) => (
                      <div key={template.status} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{template.title}</p>
                          <p className="text-sm text-gray-500">Status: {template.status}</p>
                        </div>
                        <Badge variant={template.enabled ? "default" : "secondary"}>
                          {template.enabled ? "Actief" : "Inactief"}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => sendTestMessage('status update', 'email')}
                      disabled={loading}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {loading ? 'Verzenden...' : 'Test Email'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => sendTestMessage('status update', 'SMS')}
                      disabled={loading}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Test SMS
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => sendTestMessage('status update', 'WhatsApp')}
                      disabled={loading}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Test WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Review Requests Tab */}
          {activeTab === 'review-requests' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Automatische Review Aanvragen
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Vraag automatisch om reviews wanneer projecten worden afgerond
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Automatische review aanvragen</Label>
                    <Switch
                      checked={automationSettings.autoReviewRequests}
                      onCheckedChange={(checked) => 
                        setAutomationSettings(prev => ({ ...prev, autoReviewRequests: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Review Aanvraag Sjabloon</Label>
                    <Input
                      placeholder="Onderwerp"
                      value={reviewRequestTemplate.subject}
                      onChange={(e) => 
                        setReviewRequestTemplate(prev => ({ ...prev, subject: e.target.value }))
                      }
                    />
                    <Textarea
                      placeholder="Bericht"
                      rows={6}
                      value={reviewRequestTemplate.message}
                      onChange={(e) => 
                        setReviewRequestTemplate(prev => ({ ...prev, message: e.target.value }))
                      }
                    />
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Review Platforms</h4>
                    <div className="space-y-2 text-sm text-yellow-700">
                      <p>• Google My Business - Lokale zichtbaarheid</p>
                      <p>• Trustpilot - Vertrouwensscore</p>
                      <p>• Eigen website - Testimonials</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => sendTestMessage('review request', 'email')}
                      disabled={loading}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      {loading ? 'Verzenden...' : 'Test Review Email'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => sendTestMessage('review request', 'SMS')}
                      disabled={loading}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Test Review SMS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Algemene Instellingen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Follow-up reminders</Label>
                        <p className="text-sm text-gray-500">Stuur reminders voor openstaande offertes</p>
                      </div>
                      <Switch
                        checked={automationSettings.followupReminders}
                        onCheckedChange={(checked) => 
                          setAutomationSettings(prev => ({ ...prev, followupReminders: checked }))
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Follow-up na (dagen)</Label>
                        <Select defaultValue="3">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 dag</SelectItem>
                            <SelectItem value="3">3 dagen</SelectItem>
                            <SelectItem value="7">7 dagen</SelectItem>
                            <SelectItem value="14">14 dagen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Review aanvraag na (dagen)</Label>
                        <Select defaultValue="1">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 dag</SelectItem>
                            <SelectItem value="3">3 dagen</SelectItem>
                            <SelectItem value="7">7 dagen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuleren
            </Button>
            <Button onClick={saveTemplate}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Opslaan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutomatedCommunication;
