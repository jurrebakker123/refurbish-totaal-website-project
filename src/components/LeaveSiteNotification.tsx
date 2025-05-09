
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Coffee } from 'lucide-react';

const LeaveSiteNotification = () => {
  const [hasShown, setHasShown] = useState(false);
  
  useEffect(() => {
    // This component is empty on purpose - we're not showing notifications currently
  }, []);

  return null;
};

export default LeaveSiteNotification;
