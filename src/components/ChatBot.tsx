
import React, { useState } from 'react';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hallo! Ik ben de Refurbish Totaal chatbot. Hoe kan ik u helpen?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");

    // Add bot response after a small delay
    setTimeout(() => {
      const botResponse: Message = {
        text: "Bedankt voor uw bericht. Voor de beste service kunt u direct contact opnemen via WhatsApp. Klik op 'Ga naar WhatsApp' om verder te gaan.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:right-8 z-40 transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <img 
          src="/lovable-uploads/f267d8c4-13cc-4af9-9a44-ff406caa4b4c.png"
          alt="WhatsApp"
          className="w-14 h-14"
        />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chat met Refurbish Totaal</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] w-full pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
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

          <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type uw bericht..."
              className="flex-1"
            />
            <Button type="submit">Verstuur</Button>
          </form>

          <div className="mt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-green-500 hover:bg-green-600">
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

