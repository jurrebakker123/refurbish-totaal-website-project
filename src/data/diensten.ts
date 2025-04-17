
import { DienstenRecord } from './types/dienst';
import schilderwerk from './diensten/schilderwerk';
import dakrenovatie from './diensten/dakrenovatie';
import stukadoren from './diensten/stukadoren';
import installatietechniek from './diensten/installatietechniek';
import aanEnVerbouw from './diensten/aan-en-verbouw';
import behangen from './diensten/behangen';
import pvcVloeren from './diensten/pvc-vloeren';

const diensten: DienstenRecord = {
  'schilderwerk': schilderwerk,
  'dakrenovatie': dakrenovatie,
  'stukadoren': stukadoren,
  'installatietechniek': installatietechniek,
  'aan-en-verbouw': aanEnVerbouw,
  'behangen': behangen,
  'pvc-vloeren': pvcVloeren
};

export default diensten;
