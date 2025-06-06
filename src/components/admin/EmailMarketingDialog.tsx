
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
import { Mail, Eye, Send, Sparkles, Clock, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  preview: string;
  category: 'welkomst' | 'followup_3d' | 'followup_10d' | 'seizoen' | 'testimonial' | 'laatste_kans' | 'roi_calculator' | 'subsidie' | 'referentie';
  projectType: 'dakkapel' | 'zonnepanelen' | 'both';
  trigger?: 'manual' | 'auto_3d' | 'auto_10d' | 'auto_30d';
}

const emailTemplates: EmailTemplate[] = [
  // DAKKAPEL TEMPLATES
  {
    id: 'dakkapel_welkomst',
    name: 'Dakkapel - Welkomst Email',
    subject: '🏠 Welkom! Uw dakkapel aanvraag is ontvangen',
    preview: 'Bedankt voor uw interesse in onze dakkapel diensten',
    projectType: 'dakkapel',
    category: 'welkomst',
    trigger: 'manual',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🏠 Welkom bij Refurbish Totaal</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Uw dakkapel aanvraag is ontvangen!</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hartelijk dank voor uw interesse in onze dakkapel diensten! We hebben uw aanvraag ontvangen en gaan er direct mee aan de slag.
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin: 0 0 10px 0;">📋 Wat gebeurt er nu?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Binnen 24 uur nemen we contact met u op</li>
              <li>We bespreken uw wensen en mogelijkheden</li>
              <li>U ontvangt binnen 48 uur een vrijblijvende offerte</li>
              <li>Op locatie bezoek voor exacte maten en advies</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Heeft u vragen? Bel ons op <strong>085 4444 255</strong> of stuur een email naar info@refurbishtotaalnederland.nl
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
    id: 'dakkapel_followup_10d',
    name: 'Dakkapel - Follow-up na 10 dagen',
    subject: '🏠 Nog interesse in uw dakkapel? 15% korting deze maand!',
    preview: 'We willen u graag helpen met uw dakkapel project + speciale aanbieding',
    projectType: 'dakkapel',
    category: 'followup_10d',
    trigger: 'auto_10d',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🏠 Uw Dakkapel Droom</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">15% korting deze maand!</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Enkele dagen geleden heeft u interesse getoond in onze dakkapel diensten. We begrijpen dat het een belangrijke beslissing is en willen u graag verder helpen.
          </p>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">🎯 Exclusieve Aanbieding</h3>
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #92400e;">15% korting op uw dakkapel project</p>
            <p style="margin: 5px 0 0 0; color: #92400e;">Geldig t/m einde van deze maand</p>
          </div>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin: 0 0 10px 0;">✅ Waarom kiezen voor ons?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #065f46;">
              <li>15+ jaar ervaring in dakkapel bouw</li>
              <li>Eigen werkploeg, geen onderaannemers</li>
              <li>Volledige garantie op alle werkzaamheden</li>
              <li>Gratis advies en offerte op maat</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            <strong>Bel ons vandaag nog:</strong> 085 4444 255 voor een vrijblijvend gesprek!
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://refurbishtotaalnederland.nl/contact" 
               style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px;">
              Plan Gratis Adviesgesprek
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
    id: 'dakkapel_testimonial',
    name: 'Dakkapel - Klantervaringen',
    subject: '⭐ Bekijk wat onze dakkapel klanten zeggen',
    preview: 'Succesverhalen van tevreden dakkapel klanten',
    projectType: 'dakkapel',
    category: 'testimonial',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">⭐ Klantervaringen</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Dakkapel projecten die een verschil maken</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Ontdek wat onze tevreden klanten zeggen over hun dakkapel project:
          </p>
          
          <!-- Testimonial 1 -->
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
            <p style="margin: 0 0 10px 0; font-style: italic; color: #374151;">
              "Onze dakkapel heeft ons huis compleet getransformeerd! Meer ruimte, meer licht en een prachtig resultaat. Het team was professioneel en netjes."
            </p>
            <p style="margin: 0; font-weight: bold; color: #8b5cf6;">- Familie Van Der Berg, Utrecht</p>
          </div>
          
          <!-- Testimonial 2 -->
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0 0 10px 0; font-style: italic; color: #374151;">
              "Vanaf eerste contact tot oplevering alles perfect geregeld. De dakkapel is prachtig geworden en exact zoals beloofd."
            </p>
            <p style="margin: 0; font-weight: bold; color: #10b981;">- Meneer Jansen, Amsterdam</p>
          </div>
          
          <!-- Testimonial 3 -->
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0 0 10px 0; font-style: italic; color: #374151;">
              "Dankzij de dakkapel hebben we een extra slaapkamer gekregen. De kinderen zijn er dol op! Aanrader!"
            </p>
            <p style="margin: 0; font-weight: bold; color: #f59e0b;">- Familie Bakker, Rotterdam</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://refurbishtotaalnederland.nl/contact" 
               style="background: #8b5cf6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Start Uw Dakkapel Project
            </a>
          </div>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">Met vriendelijke groet,<br>Het team van Refurbish Totaal Nederland</p>
        </div>
      </div>
    `
  },

  // ZONNEPANELEN TEMPLATES
  {
    id: 'zonnepanelen_welkomst',
    name: 'Zonnepanelen - Welkomst Email',
    subject: '☀️ Welkom! Uw zonnepanelen aanvraag is ontvangen',
    preview: 'Start uw weg naar duurzame energie en besparing',
    projectType: 'zonnepanelen',
    category: 'welkomst',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">☀️ Welkom bij Duurzame Energie</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Uw zonnepanelen aanvraag is ontvangen!</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Fantastisch dat u kiest voor duurzame energie! We gaan u helpen om maximaal te besparen op uw energierekening.
          </p>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">💡 Uw Voordelen</h3>
            <ul style="margin: 0; padding-left: 20px; color: #92400e;">
              <li>Tot 70% besparing op uw energierekening</li>
              <li>Verhoogde waarde van uw woning</li>
              <li>25 jaar garantie op prestaties</li>
              <li>Bijdrage aan een schonere planeet</li>
            </ul>
          </div>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin: 0 0 10px 0;">📋 Volgende Stappen</h3>
            <ul style="margin: 0; padding-left: 20px; color: #065f46;">
              <li>Dakonderzoek en maatwerk advies</li>
              <li>Persoonlijke offerte binnen 24 uur</li>
              <li>Professionele installatie door gecertificeerde monteurs</li>
              <li>Begeleiding bij subsidie aanvragen</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://refurbishtotaalnederland.nl/zonnepanelen" 
               style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Bekijk Onze Zonnepanelen
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
    id: 'zonnepanelen_roi_calculator',
    name: 'Zonnepanelen - ROI Calculator',
    subject: '💰 Bereken uw besparing met zonnepanelen',
    preview: 'Ontdek hoeveel u kunt besparen en wanneer ze zichzelf terugverdienen',
    projectType: 'zonnepanelen',
    category: 'roi_calculator',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">💰 Besparing Calculator</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Ontdek uw terugverdientijd</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Benieuwd naar uw exacte besparing? Onze rekenvoorbeeld voor een gemiddeld huishouden:
          </p>
          
          <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981;">
            <h3 style="color: #065f46; margin: 0 0 15px 0; text-align: center;">📊 Voorbeeld Berekening</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #374151;">Jaarlijks energieverbruik:</span>
              <strong style="color: #065f46;">3.500 kWh</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #374151;">Huidige energiekosten per jaar:</span>
              <strong style="color: #065f46;">€1.400</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #374151;">Besparing met zonnepanelen:</span>
              <strong style="color: #10b981;">€980 per jaar</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span style="color: #374171;">Terugverdientijd:</span>
              <strong style="color: #10b981; font-size: 18px;">7,5 jaar</strong>
            </div>
            <div style="background: #f0fdf4; padding: 15px; border-radius: 5px; text-align: center;">
              <strong style="color: #065f46; font-size: 16px;">25 jaar besparing totaal: €24.500</strong>
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">🎯 Extra Voordelen</h3>
            <ul style="margin: 0; padding-left: 20px; color: #92400e;">
              <li>Bescherming tegen stijgende energieprijzen</li>
              <li>Subsidies en belastingvoordelen</li>
              <li>Verhoogde woningwaarde (€8.000-€15.000)</li>
              <li>CO2 reductie van 1.400 kg per jaar</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://refurbishtotaalnederland.nl/contact" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Persoonlijke Berekening Aanvragen
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
    id: 'zonnepanelen_followup_10d',
    name: 'Zonnepanelen - Follow-up na 10 dagen',
    subject: '☀️ Energieprijzen stijgen weer! Vergelijk uw besparing',
    preview: 'Bescherm uzelf tegen stijgende energiekosten met zonnepanelen',
    projectType: 'zonnepanelen',
    category: 'followup_10d',
    trigger: 'auto_10d',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">⚡ Energieprijzen Stijgen</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Bescherm uzelf nu met zonnepanelen</p>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Beste {klant_naam},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            De energieprijzen blijven stijgen! Terwijl anderen steeds meer betalen, kunt u juist besparen met zonnepanelen.
          </p>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3 style="color: #991b1b; margin: 0 0 10px 0;">📈 Recente Ontwikkelingen</h3>
            <ul style="margin: 0; padding-left: 20px; color: #991b1b;">
              <li>Energierekening stijgt gemiddeld €200 per jaar</li>
              <li>Gasprijzen blijven volatiel en onvoorspelbaar</li>
              <li>Experts voorspellen verdere stijgingen</li>
            </ul>
          </div>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #065f46; margin: 0 0 10px 0;">🛡️ Uw Bescherming</h3>
            <ul style="margin: 0; padding-left: 20px; color: #065f46;">
              <li>Vaste, lage energiekosten voor 25+ jaar</li>
              <li>Onafhankelijkheid van energieleveranciers</li>
              <li>Eigen groene stroom vanaf dag 1</li>
              <li>Verhoogde waarde van uw woning</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">⏰ Beperkte Tijd Actie</h3>
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #92400e;">Gratis dakonderzoek + 5% extra korting</p>
            <p style="margin: 5px 0 0 0; color: #92400e;">Bij aanvraag deze maand</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://refurbishtotaalnederland.nl/contact" 
               style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Claim Uw Voordeel Nu
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
  const [templateFilter, setTemplateFilter] = useState<'all' | 'dakkapel' | 'zonnepanelen'>('all');
  
  const [campaign, setCampaign] = useState({
    subject: '',
    content: '',
    recipientType: 'all',
    customEmails: '',
    templateId: ''
  });

  // Filter templates based on selected filter
  const filteredTemplates = emailTemplates.filter(template => 
    templateFilter === 'all' || 
    template.projectType === templateFilter || 
    template.projectType === 'both'
  );

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
    welkomst: '👋 Welkomst',
    followup_3d: '📅 Follow-up 3 dagen',
    followup_10d: '⏰ Follow-up 10 dagen',
    seizoen: '🌤️ Seizoensgebonden',
    testimonial: '⭐ Testimonials',
    laatste_kans: '🚨 Laatste kans',
    roi_calculator: '💰 ROI Calculator',
    subsidie: '🏛️ Subsidie info',
    referentie: '📸 Referenties'
  };

  const categoryColors = {
    welkomst: 'bg-blue-100 text-blue-800',
    followup_3d: 'bg-yellow-100 text-yellow-800',
    followup_10d: 'bg-orange-100 text-orange-800',
    seizoen: 'bg-green-100 text-green-800',
    testimonial: 'bg-purple-100 text-purple-800',
    laatste_kans: 'bg-red-100 text-red-800',
    roi_calculator: 'bg-emerald-100 text-emerald-800',
    subsidie: 'bg-indigo-100 text-indigo-800',
    referentie: 'bg-pink-100 text-pink-800'
  };

  const getTriggerBadge = (trigger?: string) => {
    if (!trigger || trigger === 'manual') return null;
    
    const triggerLabels = {
      auto_3d: '🤖 Auto 3d',
      auto_10d: '🤖 Auto 10d', 
      auto_30d: '🤖 Auto 30d'
    };
    
    return (
      <Badge variant="outline" className="ml-2 text-xs">
        {triggerLabels[trigger as keyof typeof triggerLabels]}
      </Badge>
    );
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              E-mail Marketing Campagne
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">📧 Templates</TabsTrigger>
              <TabsTrigger value="compose">✍️ Samenstellen</TabsTrigger>
              <TabsTrigger value="automation">🤖 Automatisering</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Professionele Email Templates</h3>
                  <Select value={templateFilter} onValueChange={(value: any) => setTemplateFilter(value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🔍 Alle templates</SelectItem>
                      <SelectItem value="dakkapel">🏠 Dakkapel</SelectItem>
                      <SelectItem value="zonnepanelen">☀️ Zonnepanelen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-600">
                  Geoptimaliseerd voor hoge conversies en klantbetrokkenheid
                </p>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base mb-2 flex items-center">
                              {template.projectType === 'dakkapel' ? '🏠' : 
                               template.projectType === 'zonnepanelen' ? '☀️' : '🔧'} {template.name}
                              {getTriggerBadge(template.trigger)}
                            </CardTitle>
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

            <TabsContent value="automation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Automatische Follow-up Regels
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">🤖 Geplande Automatie (In Ontwikkeling)</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Na 3 dagen:</strong> Vriendelijke follow-up email</li>
                      <li>• <strong>Na 10 dagen:</strong> Speciale aanbieding en urgentie</li>
                      <li>• <strong>Na 30 dagen:</strong> Laatste kans email</li>
                      <li>• <strong>Seizoensgebonden:</strong> Automatische campagnes in voor/najaar</li>
                    </ul>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="flex items-center gap-2 font-medium mb-2">
                        <Users className="w-4 h-4 text-green-600" />
                        Dakkapel Leads (10+ dagen)
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">Klanten die langer dan 10 dagen geen reactie hebben gegeven</p>
                      <Badge variant="outline" className="text-orange-600">5 leads gevonden</Badge>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="flex items-center gap-2 font-medium mb-2">
                        <TrendingUp className="w-4 h-4 text-yellow-600" />
                        Zonnepaneel Leads (10+ dagen)
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">Klanten die baat hebben bij urgentie email</p>
                      <Badge variant="outline" className="text-orange-600">3 leads gevonden</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">💡 Suggestie</h4>
                    <p className="text-sm text-yellow-700">
                      Stuur vandaag een follow-up email naar alle leads die langer dan 10 dagen wachten. 
                      Gebruik de "Follow-up na 10 dagen" templates voor beste resultaten.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
