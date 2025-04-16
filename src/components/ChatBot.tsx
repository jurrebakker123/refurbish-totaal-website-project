
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    {type: 'bot', content: 'Hallo! Ik ben de assistent van Refurbish Totaal Nederland. Waarmee kan ik u helpen?'}
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {type: 'user', content: message}]);
    
    // Bot response logic based on keywords
    setTimeout(() => {
      const lowerMsg = message.toLowerCase();
      let response = '';
      
      // Comprehensive response logic for different service inquiries
      if (lowerMsg.includes('schilder') || lowerMsg.includes('verf')) {
        response = 'Onze schilderdiensten omvatten zowel binnen- als buitenschilderwerk met hoogwaardige materialen. We kunnen u adviseren over de beste verfsoorten voor uw specifieke situatie, of het nu gaat om houtwerk, muren of speciale oppervlakken. Wilt u meer weten over onze binnen- of buitenschilderwerken?';
      } else if (lowerMsg.includes('dak') || lowerMsg.includes('renovatie')) {
        response = 'Onze dakrenovatie diensten bieden complete oplossingen voor lekkages, isolatie en vernieuwing van uw dak. We werken met verschillende dakbedekkingsmaterialen zoals pannen, leien en bitumen. Heeft u een specifieke vraag over dakrenovatie?';
      } else if (lowerMsg.includes('stucadoor') || lowerMsg.includes('stuc')) {
        response = 'Onze stucadoors zorgen voor perfect afgewerkte wanden en plafonds. We bieden diverse technieken aan, van gladpleisterwerk tot sierlijsten en decoratieve toepassingen. Bent u geïnteresseerd in een bepaalde stuctechniek?';
      } else if (lowerMsg.includes('installatie') || lowerMsg.includes('elektra') || lowerMsg.includes('loodgieter')) {
        response = 'Onze installatietechniek omvat elektra, loodgieterswerk en klimaatbeheersing. We kunnen complete installaties verzorgen voor nieuwbouw of renovatie. Welk type installatiewerk heeft uw interesse?';
      } else if (lowerMsg.includes('verbouw') || lowerMsg.includes('aanbouw')) {
        response = 'Voor aan- en verbouwprojecten bieden we complete oplossingen, van kleine verbouwingen tot complete uitbreidingen. Onze ervaren vaklieden verzorgen het gehele traject. Heeft u specifieke wensen voor uw verbouwing?';
      } else if (lowerMsg.includes('pvc') || lowerMsg.includes('vloer')) {
        response = 'Wij leveren en installeren hoogwaardige PVC vloeren in diverse dessins en kwaliteiten. Onze vloeren zijn duurzaam, waterbestendig en onderhoudsvriendelijk. Wilt u meer informatie over een specifiek type PVC vloer?';
      } else if (lowerMsg.includes('binnen')) {
        response = 'Voor binnenwerkzaamheden verzorgen we onder andere schilderwerk, stucwerk, vloeren leggen en complete verbouwingen. We werken altijd netjes en met minimale overlast. Welke specifieke binnenwerkzaamheden heeft u in gedachten?';
      } else if (lowerMsg.includes('buiten')) {
        response = 'Onze buitenwerkzaamheden omvatten buitenschilderwerk, dakrenovatie, gevelbekleding en aanbouw. Al onze materialen zijn weerbestendig en duurzaam. Heeft u een specifiek buitenproject in gedachten?';
      } else if (lowerMsg.includes('offerte')) {
        response = 'U kunt eenvoudig een vrijblijvende offerte aanvragen via onze offerteformulier op de website, per e-mail naar info@refurbishtotaalnederland.nl of telefonisch via 085 4444 255. We reageren binnen 1 werkdag. Welke specifieke dienst heeft u interesse in voor een offerte?';
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('telefoon') || lowerMsg.includes('mail')) {
        response = 'U kunt contact met ons opnemen via telefoonnummer 085 4444 255 of per e-mail op info@refurbishtotaalnederland.nl. Ons adres is Niersweg 27, 6591 CT Gennep. We zijn bereikbaar op werkdagen van 8:00 tot 17:00 uur. Hoe kunnen we u het beste helpen?';
      } else if (lowerMsg.includes('prijs') || lowerMsg.includes('kosten') || lowerMsg.includes('tarief')) {
        response = 'De kosten voor onze diensten zijn afhankelijk van de specifieke wensen en situatie. We maken graag een vrijblijvende offerte op maat voor u. Wilt u meer informatie over de prijsindicatie voor een specifieke dienst?';
      } else if (lowerMsg.includes('garantie') || lowerMsg.includes('kwaliteit')) {
        response = 'Wij geven garantie op al onze werkzaamheden en gebruiken uitsluitend kwaliteitsmaterialen. De exacte garantietermijn verschilt per type werkzaamheid en wordt vooraf duidelijk met u gecommuniceerd. Heeft u een vraag over garantie op een specifieke dienst?';
      } else if (lowerMsg.includes('dank') || lowerMsg.includes('bedankt')) {
        response = 'Graag gedaan! Als u nog andere vragen heeft, hoor ik het graag. Wij staan voor u klaar.';
      } else if (lowerMsg.includes('hallo') || lowerMsg.includes('hoi') || lowerMsg.includes('goedemorgen') || lowerMsg.includes('goedemiddag')) {
        response = 'Hallo! Fijn dat u contact opneemt. Waarmee kan ik u helpen? U kunt me vragen stellen over onze diensten zoals schilderwerk, dakrenovatie, stucadoren, installatietechniek, aan- en verbouw of PVC vloeren.';
      } else {
        response = 'Bedankt voor uw bericht. Ik kan u informatie geven over onze diensten zoals schilderwerk, dakrenovatie, stucadoren, installatietechniek, aan- en verbouw en PVC vloeren. Of wilt u weten hoe u contact met ons kunt opnemen of een offerte kunt aanvragen?';
      }
      
      setMessages(prev => [...prev, {type: 'bot', content: response}]);
    }, 800);
    
    setMessage('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 md:right-8 w-[340px] md:w-[380px] h-[480px] bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
          >
            <div className="bg-brand-darkGreen text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Refurbish Totaal Nederland</h3>
              <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "mb-3 p-3 rounded-lg max-w-[85%]",
                    msg.type === 'user' ? "bg-brand-lightGreen text-white ml-auto" : "bg-gray-100 text-gray-800"
                  )}
                >
                  {msg.content}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSend} className="border-t p-4 flex gap-2">
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type uw vraag..."
                className="resize-none h-10 min-h-0 py-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
              <Button type="submit" size="icon" className="bg-brand-lightGreen hover:bg-brand-lightGreen/90 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:right-8 bg-brand-lightGreen text-white p-3 rounded-full shadow-lg z-40"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </>
  );
};

export default ChatBot;
