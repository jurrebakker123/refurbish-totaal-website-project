
import { DienstenRecord } from './types/dienst';
import schilderwerk from './diensten/schilderwerk';
import dakrenovatie from './diensten/dakrenovatie';
import stukadoren from './diensten/stukadoren';
import installatietechniek from './diensten/installatietechniek';
import aanEnVerbouw from './diensten/aan-en-verbouw';
import behangen from './diensten/behangen';
import pvcVloeren from './diensten/pvc-vloeren';
import dakkapel from './diensten/dakkapel';
import kozijntechniek from './diensten/kozijntechniek';
import isolatietechniek from './diensten/isolatietechniek';

// Toggle om alle diensten beschikbaar te maken of alleen de gefocuste diensten
const SHOW_ALL_SERVICES = false; // Blijft op false om alleen de drie hoofddiensten te tonen

const allDiensten: DienstenRecord = {
  'kozijntechniek': kozijntechniek,
  'isolatietechniek': isolatietechniek,
  'dakkapel': dakkapel,
  'schilderwerk': schilderwerk,
  'dakrenovatie': dakrenovatie,
  'stukadoren': stukadoren,
  'installatietechniek': installatietechniek,
  'aan-en-verbouw': aanEnVerbouw,
  'behangen': behangen,
  'pvc-vloeren': pvcVloeren
};

// Gefocuste diensten die altijd beschikbaar zijn
const focusedServices = ['dakkapel', 'schilderwerk', 'stukadoren'];

// Filter diensten op basis van de toggle
const diensten: DienstenRecord = SHOW_ALL_SERVICES 
  ? allDiensten 
  : Object.fromEntries(
      Object.entries(allDiensten).filter(([key]) => focusedServices.includes(key))
    );

export default diensten;
