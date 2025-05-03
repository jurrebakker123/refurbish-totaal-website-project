
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Coffee } from 'lucide-react';

const LeaveSiteNotification = () => {
  const [hasShown, setHasShown] = useState(true);
  
  useEffect(() => {
    // No initial toast will be shown
  }, [hasShown]);

  return null;
};

export default LeaveSiteNotification;
