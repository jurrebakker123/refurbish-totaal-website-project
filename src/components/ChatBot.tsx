
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const phoneNumber = "31854444255";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "Goedemorgen";
    if (hour >= 12 && hour < 18) return "Goedemiddag";
    if (hour >= 18 && hour < 24) return "Goedenavond";
    return "Goedenacht";
  };

  useEffect(() => {
    // Set initial greeting message
    setMessages([
      {
        text: `${getGreeting()}! Ik ben de Refurbish Totaal chatbot. Hoe kan ik u helpen?`,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, []);

  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");

    // Verbeterde bot responses
    setTimeout(() => {
      let botResponse: Message;
      const lowercaseMessage = currentMessage.toLowerCase();
      
      if (lowercaseMessage.includes('prijs') || lowercaseMessage.includes('kosten') || lowercaseMessage.includes('offerte')) {
        botResponse = {
          text: "Voor een exacte prijsopgave kunt u het beste direct contact met ons opnemen via WhatsApp. We maken graag een offerte op maat voor u.",
          isUser: false,
          timestamp: new Date()
        };
      } else if (lowercaseMessage.includes('tijd') || lowercaseMessage.includes('duur') || lowercaseMessage.includes('wanneer')) {
        botResponse = {
          text: "De exacte planning hangt af van verschillende factoren. Laten we via WhatsApp uw specifieke situatie bespreken om een goede inschatting te kunnen maken.",
          isUser: false,
          timestamp: new Date()
        };
      } else {
        botResponse = {
          text: "Bedankt voor uw bericht. Voor de snelste service kunt u direct contact opnemen via WhatsApp. Klik op de knop hieronder om verder te gaan.",
          isUser: false,
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <img 
          src="/lovable-uploads/f267d8c4-13cc-4af9-9a44-ff406caa4b4c.png"
          alt="WhatsApp"
          className="w-12 h-12 md:w-14 md:h-14"
        />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed bottom-[80px] right-4 w-[350px] p-4 rounded-lg max-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Chat met Refurbish Totaal</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[300px] w-full pr-4">
            <div className="flex flex-col gap-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-lg text-sm ${
                      message.isUser 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="flex gap-2 mt-3">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type uw bericht..."
              className="flex-1 text-sm"
            />
            <Button type="submit" size="sm">Verstuur</Button>
          </form>

          <div className="mt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-green-500 hover:bg-green-600 text-sm">
                Ga naar WhatsApp
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;

