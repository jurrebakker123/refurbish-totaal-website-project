
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
import { MessageCircle, Send, Star, CheckCircle, Smartphone, Mail, AlertCircle } from 'lucide-react';
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
    message: 'Beste {klant_naam},\n\nUw project heeft een nieuwe status: {nieuwe_status}.\n\nWe houden u op de hoogte van de voortgang.\n\nMet vriendelijke groet,\nRefurbish Totaal Nederland'
  });

  const [reviewRequestTemplate, setReviewRequestTemplate] = useState({
    subject: 'Uw ervaring met ons {project_type} project',
    message: 'Beste {klant_naam},\n\nUw {project_type} project is succesvol afgerond! We hopen dat u tevreden bent met het resultaat.\n\nWilt u een korte review achterlaten? Dit helpt ons enorm om onze service te verbeteren!\n\nMet vriendelijke groet,\nRefurbish Totaal Nederland'
  });

  const statusTemplates = [
    { status: 'offerte_verzonden', title: 'Offerte verzonden', enabled: true },
    { status: 'interesse_bevestigd', title: 'Interesse bevestigd', enabled: true },
    { status: 'akkoord', title: 'Project akkoord', enabled: true },
    { status: 'op_locatie', title: 'Locatiebezoek gepland', enabled: true },
    { status: 'in_aanbouw', title: 'Project in uitvoering', enabled: true },
    { status: 'afgehandeld', title: 'Project afgerond', enabled: true }
  ];

  const sendTestMessage = async (type: string, medium: string) => {
    console.log('Sending test message:', { type, medium });
    setLoading(true);
    
    try {
      let testData = {};
      
      if (type === 'status update') {
        testData = {
          type: 'status_update',
          customerName: 'Test Klant',
          customerEmail: 'test@example.com',
          projectType: 'dakkapel',
          newStatus: 'in_behandeling',
          medium: medium
        };
      } else if (type === 'review request') {
        testData = {
          type: 'review_request',
          customerName: 'Test Klant',
          customerEmail: 'test@example.com',
          projectType: 'dakkapel',
          medium: medium
        };
      }

      // Simulate API call to communication service
      console.log('Test message data:', testData);
      
      // In a real implementation, this would call an edge function
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`✅ Test ${type} via ${medium} succesvol verzonden!`);
      onSendMessage({ 
        type: 'test_message', 
        messageType: type, 
        medium: medium,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending test message:', error);
      toast.error(`❌ Fout bij verzenden test ${type} via ${medium}`);
    } finally {
      setLoading(false);
    }
  };

  const sendAutomaticStatusUpdate = async (customerData: any, newStatus: string) => {
    console.log('Sending automatic status update:', { customerData, newStatus });
    setLoading(true);
    
    try {
      if (!automationSettings.autoStatusUpdates) {
        console.log('Auto status updates are disabled');
        return;
      }

      const message = statusUpdateTemplate.message
        .replace('{klant_naam}', customerData.naam || customerData.name)
        .replace('{project_type}', customerData.model ? 'dakkapel' : 'zonnepanelen')
        .replace('{nieuwe_status}', getStatusDisplayName(newStatus));

      const subject = statusUpdateTemplate.subject
        .replace('{project_type}', customerData.model ? 'dakkapel' : 'zonnepanelen');

      console.log('Status update details:', { 
        to: customerData.email, 
        subject, 
        message,
        status: newStatus 
      });
      
      // In a real implementation, this would call the send-quote edge function or similar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`✅ Status update verzonden naar ${customerData.naam || customerData.name}`);
      onSendMessage({ 
        type: 'status_update', 
        customer: customerData.naam || customerData.name, 
        status: newStatus,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending status update:', error);
      toast.error('❌ Fout bij verzenden status update');
    } finally {
      setLoading(false);
    }
  };

  const sendReviewRequest = async (customerData: any) => {
    console.log('Sending review request:', customerData);
    setLoading(true);
    
    try {
      if (!automationSettings.autoReviewRequests) {
        console.log('Auto review requests are disabled');
        return;
      }

      const message = reviewRequestTemplate.message
        .replace('{klant_naam}', customerData.naam || customerData.name)
        .replace('{project_type}', customerData.model ? 'dakkapel' : 'zonnepanelen');

      const subject = reviewRequestTemplate.subject
        .replace('{project_type}', customerData.model ? 'dakkapel' : 'zonnepanelen');

      console.log('Review request details:', { 
        to: customerData.email, 
        subject,
        message 
      });
      
      // In a real implementation, this would call an edge function
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`✅ Review aanvraag verzonden naar ${customerData.naam || customerData.name}`);
      onSendMessage({ 
        type: 'review_request', 
        customer: customerData.naam || customerData.name,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending review request:', error);
      toast.error('❌ Fout bij verzenden review aanvraag');
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplayName = (status: string) => {
    const statusMap: Record<string, string> = {
      'nieuw': 'Nieuw',
      'in_behandeling': 'In behandeling',
      'offerte_verzonden': 'Offerte verzonden',
      'interesse_bevestigd': 'Interesse bevestigd',
      'akkoord': 'Akkoord gegeven',
      'op_locatie': 'Locatiebezoek gepland',
      'in_aanbouw': 'In uitvoering',
      'afgehandeld': 'Afgerond',
      'niet_akkoord': 'Niet akkoord',
      'geen_interesse': 'Geen interesse'
    };
    return statusMap[status] || status;
  };

  const saveTemplate = async () => {
    console.log('Saving templates and settings:', { statusUpdateTemplate, reviewRequestTemplate, automationSettings });
    
    try {
      // In a real implementation, this would save to the database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('✅ Templates en instellingen succesvol opgeslagen!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving templates:', error);
      toast.error('❌ Fout bij opslaan templates');
    }
  };

  const triggerAutomatedFlow = async (trigger: string) => {
    console.log('Triggering automated flow:', trigger);
    setLoading(true);

    try {
      switch (trigger) {
        case 'status_change':
          // Simulate status change automation
          await sendAutomaticStatusUpdate({
            naam: 'Demo Klant',
            email: 'demo@example.com',
            model: 'Rechthoekig'
          }, 'in_behandeling');
          break;
          
        case 'project_completed':
          // Simulate project completion automation
          await sendReviewRequest({
            naam: 'Demo Klant',
            email: 'demo@example.com',
            model: 'Rechthoekig'
          });
          break;
          
        default:
          toast.info('✨ Geautomatiseerde flow geactiveerd!');
      }
    } catch (error) {
      console.error('Error triggering automated flow:', error);
      toast.error('❌ Fout bij activeren geautomatiseerde flow');
    } finally {
      setLoading(false);
    }
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
              variant={activeTab === 'automation' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('automation')}
              size="sm"
            >
              Automatisering
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

          {/* Automation Tab */}
          {activeTab === 'automation' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Live Automatisering</CardTitle>
                  <p className="text-sm text-gray-600">
                    Test en activeer geautomatiseerde communicatie flows
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 border-green-200 bg-green-50">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-green-600" />
                          <h4 className="font-medium text-green-800">Status Wijziging Flow</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          Test automatische communicatie bij status wijzigingen
                        </p>
                        <Button 
                          onClick={() => triggerAutomatedFlow('status_change')}
                          disabled={loading}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          {loading ? 'Activeren...' : 'Test Status Update Flow'}
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 border-blue-200 bg-blue-50">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium text-blue-800">Project Afronding Flow</h4>
                        </div>
                        <p className="text-sm text-blue-700">
                          Test automatische review aanvraag bij project afronding
                        </p>
                        <Button 
                          onClick={() => triggerAutomatedFlow('project_completed')}
                          disabled={loading}
                          variant="outline"
                          className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                        >
                          {loading ? 'Activeren...' : 'Test Review Flow'}
                        </Button>
                      </div>
                    </Card>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Automatisering Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status Updates:</span>
                        <Badge variant={automationSettings.autoStatusUpdates ? "default" : "secondary"}>
                          {automationSettings.autoStatusUpdates ? "Actief" : "Inactief"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Review Aanvragen:</span>
                        <Badge variant={automationSettings.autoReviewRequests ? "default" : "secondary"}>
                          {automationSettings.autoReviewRequests ? "Actief" : "Inactief"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Follow-up Reminders:</span>
                        <Badge variant={automationSettings.followupReminders ? "default" : "secondary"}>
                          {automationSettings.followupReminders ? "Actief" : "Inactief"}
                        </Badge>
                      </div>
                    </div>
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
            <Button onClick={saveTemplate} disabled={loading}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {loading ? 'Opslaan...' : 'Opslaan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutomatedCommunication;
