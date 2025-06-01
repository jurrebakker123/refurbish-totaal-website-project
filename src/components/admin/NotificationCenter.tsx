
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, MessageSquare, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationCenterProps {
  configuraties: any[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ configuraties }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    deadlineAlerts: true,
    followupReminders: true
  });

  // Calculate alerts
  const newRequests = configuraties.filter(c => c.status === 'nieuw').length;
  const overdue = configuraties.filter(c => {
    const created = new Date(c.created_at);
    const daysDiff = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff > 7 && ['nieuw', 'in_behandeling'].includes(c.status);
  }).length;

  const pendingFollowups = configuraties.filter(c => {
    if (c.status !== 'offerte_verzonden') return false;
    const sentDate = new Date(c.offerte_verzonden_op || c.created_at);
    const daysDiff = Math.floor((Date.now() - sentDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff >= 3;
  }).length;

  const totalAlerts = newRequests + overdue + pendingFollowups;

  const handleSettingChange = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.success('Notificatie instellingen bijgewerkt');
  };

  const sendTestNotification = (type: string) => {
    toast.success(`Test ${type} notificatie verzonden!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell className="h-4 w-4" />
          {totalAlerts > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {totalAlerts}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificatie Center
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actieve Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {newRequests > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>Nieuwe aanvragen</span>
                  </div>
                  <Badge variant="secondary">{newRequests}</Badge>
                </div>
              )}
              
              {overdue > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Te lang in behandeling</span>
                  </div>
                  <Badge variant="destructive">{overdue}</Badge>
                </div>
              )}
              
              {pendingFollowups > 0 && (
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>Follow-up nodig</span>
                  </div>
                  <Badge variant="secondary">{pendingFollowups}</Badge>
                </div>
              )}
              
              {totalAlerts === 0 && (
                <p className="text-gray-500 text-center py-4">Geen actieve alerts</p>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notificatie Instellingen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <Label htmlFor="email-notifications">Email notificaties</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleSettingChange('emailNotifications')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendTestNotification('email')}
                  >
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                  <Label htmlFor="sms-notifications">SMS notificaties</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="sms-notifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={() => handleSettingChange('smsNotifications')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendTestNotification('SMS')}
                  >
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <Label htmlFor="whatsapp-notifications">WhatsApp notificaties</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="whatsapp-notifications"
                    checked={settings.whatsappNotifications}
                    onCheckedChange={() => handleSettingChange('whatsappNotifications')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendTestNotification('WhatsApp')}
                  >
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <Label htmlFor="deadline-alerts">Deadline alerts</Label>
                </div>
                <Switch
                  id="deadline-alerts"
                  checked={settings.deadlineAlerts}
                  onCheckedChange={() => handleSettingChange('deadlineAlerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="followup-reminders">Follow-up reminders</Label>
                </div>
                <Switch
                  id="followup-reminders"
                  checked={settings.followupReminders}
                  onCheckedChange={() => handleSettingChange('followupReminders')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCenter;
