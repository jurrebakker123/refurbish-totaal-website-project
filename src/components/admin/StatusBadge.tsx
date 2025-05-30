
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, Mail, CheckCircle, ThumbsUp, X, MapPin, Wrench } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'nieuw':
      return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Nieuw</Badge>;
    case 'in_behandeling':
      return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />In behandeling</Badge>;
    case 'offerte_verzonden':
      return <Badge variant="default"><Mail className="w-3 h-3 mr-1" />Offerte verzonden</Badge>;
    case 'akkoord':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200"><ThumbsUp className="w-3 h-3 mr-1" />Akkoord</Badge>;
    case 'niet_akkoord':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200"><X className="w-3 h-3 mr-1" />Niet Akkoord</Badge>;
    case 'op_locatie':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200"><MapPin className="w-3 h-3 mr-1" />Op Locatie</Badge>;
    case 'in_aanbouw':
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200"><Wrench className="w-3 h-3 mr-1" />In Aanbouw</Badge>;
    case 'afgehandeld':
      return <Badge variant="outline"><CheckCircle className="w-3 h-3 mr-1" />Afgehandeld</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default StatusBadge;
