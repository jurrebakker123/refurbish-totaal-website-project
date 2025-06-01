
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface EmailMarketingDialogProps {
  onCampaignSent: () => void;
}

const EmailMarketingDialog: React.FC<EmailMarketingDialogProps> = ({ onCampaignSent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState({
    subject: '',
    content: '',
    recipientType: 'all',
    customEmails: ''
  });

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
        toast.success(data.message);
        setIsOpen(false);
        setCampaign({
          subject: '',
          content: '',
          recipientType: 'all',
          customEmails: ''
        });
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Mail className="w-4 h-4 mr-2" />
          E-mail Marketing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>E-mail Marketing Campagne</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
                <SelectItem value="all">Alle klanten</SelectItem>
                <SelectItem value="dakkapel">Alleen dakkapel klanten</SelectItem>
                <SelectItem value="zonnepaneel">Alleen zonnepaneel klanten</SelectItem>
                <SelectItem value="custom">Aangepaste lijst</SelectItem>
              </SelectContent>
            </Select>
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
              rows={8}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSendCampaign} disabled={loading} className="flex-1">
              {loading ? 'Versturen...' : 'Verstuur Campagne'}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
              Annuleren
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailMarketingDialog;
