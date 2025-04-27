
import { MessageCircle } from 'lucide-react';

const ChatBot = () => {
  const phoneNumber = "31854444255"; // Converting Dutch number to international format
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:right-8 bg-brand-lightGreen text-white p-3 rounded-full shadow-lg z-40 hover:bg-brand-lightGreen/90 transition-colors"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
};

export default ChatBot;
