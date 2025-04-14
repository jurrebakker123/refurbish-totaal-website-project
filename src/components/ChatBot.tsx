
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

type Message = {
  type: 'bot' | 'user';
  text: string;
};

type Option = {
  text: string;
  action: () => void;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [showInitialDelay, setShowInitialDelay] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatisch welkomstbericht sturen na een korte vertraging
  useEffect(() => {
    // Wacht 5 seconden en toon dan de chatbot popup met een toast melding
    const timer = setTimeout(() => {
      setShowInitialDelay(false);
      if (!isOpen) {
        toast.info('Hallo! Kan ik u ergens mee helpen?', {
          action: {
            label: 'Open chat',
            onClick: () => setIsOpen(true)
          },
          duration: 10000
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Wanneer de chat opent, toon het welkomstbericht
  useEffect(() => {
    if (isOpen && messages.length === 0 && !showInitialDelay) {
      const greeting = getGreeting();
      const initialMessage: Message = {
        type: 'bot',
        text: `${greeting} Welkom bij Refurbish Totaal Nederland. Hoe kan ik u vandaag helpen?`
      };
      
      setMessages([initialMessage]);
      
      // Toon opties na een korte vertraging
      setTimeout(() => {
        setShowOptions(true);
        setOptions([
          {
            text: 'Offerte aanvragen',
            action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
          },
          {
            text: 'Meer info over diensten',
            action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
          },
          {
            text: 'Contact opnemen',
            action: () => handleOptionClick('Ik wil contact opnemen.')
          },
          {
            text: 'Afspraak maken',
            action: () => handleOptionClick('Ik wil een afspraak maken.')
          }
        ]);
      }, 1000);
    }
  }, [isOpen, showInitialDelay, messages.length]);

  // Scroll naar beneden wanneer er nieuwe berichten zijn
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Bepaal de begroeting op basis van tijd van de dag
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Goedemorgen!';
    if (hour < 18) return 'Goedemiddag!';
    return 'Goedenavond!';
  };

  // Verwerk de gekozen optie
  const handleOptionClick = (optionText: string) => {
    // Voeg het gekozen optie toe als gebruikersbericht
    setMessages(prev => [...prev, { type: 'user', text: optionText }]);
    
    // Verwijder de opties
    setOptions([]);
    setShowOptions(false);
    
    // Simuleer een korte denkpauze voordat de bot antwoordt
    setTimeout(() => {
      let botReply: Message;
      let newOptions: Option[] = [];
      
      // Verschillende antwoorden op basis van de gekozen optie
      if (optionText.includes('offerte')) {
        botReply = {
          type: 'bot',
          text: 'Natuurlijk! U kunt op verschillende manieren een offerte aanvragen. Wat heeft uw voorkeur?'
        };
        newOptions = [
          {
            text: 'Online formulier',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil graag het online formulier invullen.' },
                { type: 'bot', text: 'Ik verwijs u door naar ons offerteformulier waar u alle details kunt invullen.' }
              ]);
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = '/offerte';
              }, 2000);
            }
          },
          {
            text: 'Telefonisch',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil graag telefonisch contact.' },
                { type: 'bot', text: 'U kunt ons bereiken op 020-123 4567. We staan u graag te woord op werkdagen tussen 08:00 en 17:00.' }
              ]);
              setOptions([]);
              setShowOptions(false);
            }
          },
          {
            text: 'E-mail',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil graag via e-mail contact.' },
                { type: 'bot', text: 'U kunt een e-mail sturen naar info@refurbishtotaal.nl en we nemen binnen 24 uur contact met u op.' }
              ]);
              setOptions([]);
              setShowOptions(false);
            }
          }
        ];
      } else if (optionText.includes('diensten')) {
        botReply = {
          type: 'bot',
          text: 'We bieden verschillende diensten aan. Over welke dienst wilt u meer informatie?'
        };
        newOptions = [
          {
            text: 'Schilderwerk',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil meer weten over schilderwerk.' },
                { type: 'bot', text: 'Ik verwijs u door naar onze pagina over schilderwerk waar u alle details kunt vinden.' }
              ]);
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = '/diensten/schilderwerk';
              }, 2000);
            }
          },
          {
            text: 'Dakrenovatie',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil meer weten over dakrenovatie.' },
                { type: 'bot', text: 'Ik verwijs u door naar onze pagina over dakrenovatie waar u alle details kunt vinden.' }
              ]);
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = '/diensten/dakrenovatie';
              }, 2000);
            }
          },
          {
            text: 'Alle diensten bekijken',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil alle diensten bekijken.' },
                { type: 'bot', text: 'Ik verwijs u door naar ons dienstenoverzicht.' }
              ]);
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = '/diensten';
              }, 2000);
            }
          }
        ];
      } else if (optionText.includes('contact')) {
        botReply = {
          type: 'bot',
          text: 'U kunt op verschillende manieren contact met ons opnemen. Wat heeft uw voorkeur?'
        };
        newOptions = [
          {
            text: 'Telefonisch',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil graag telefonisch contact.' },
                { type: 'bot', text: 'U kunt ons bereiken op 020-123 4567. We staan u graag te woord op werkdagen tussen 08:00 en 17:00.' }
              ]);
              setOptions([]);
              setShowOptions(false);
            }
          },
          {
            text: 'WhatsApp',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil graag via WhatsApp contact.' },
                { type: 'bot', text: 'U kunt ons een bericht sturen via WhatsApp op nummer 06-12345678.' }
              ]);
              setOptions([]);
              setShowOptions(false);
            }
          },
          {
            text: 'E-mail',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil graag via e-mail contact.' },
                { type: 'bot', text: 'U kunt een e-mail sturen naar info@refurbishtotaal.nl en we nemen binnen 24 uur contact met u op.' }
              ]);
              setOptions([]);
              setShowOptions(false);
            }
          },
          {
            text: 'Contactformulier',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik wil het contactformulier gebruiken.' },
                { type: 'bot', text: 'Ik verwijs u door naar ons contactformulier.' }
              ]);
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = '/contact';
              }, 2000);
            }
          }
        ];
      } else if (optionText.includes('afspraak')) {
        botReply = {
          type: 'bot',
          text: 'Wilt u een vrijblijvend gesprek inplannen met één van onze adviseurs?'
        };
        newOptions = [
          {
            text: 'Ja, bel mij terug',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ja, ik wil graag teruggebeld worden.' },
                { type: 'bot', text: 'Vul hier uw telefoonnummer in, dan nemen wij zo spoedig mogelijk contact met u op.' }
              ]);
              setTimeout(() => {
                setMessages(prev => [...prev, 
                  { type: 'bot', text: 'Dank u wel! We nemen binnen 24 uur contact met u op om een afspraak in te plannen.' }
                ]);
                setOptions([]);
                setShowOptions(false);
              }, 5000);
            }
          },
          {
            text: 'Nee, ik bel zelf',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Nee, ik bel zelf wel.' },
                { type: 'bot', text: 'Geen probleem! U kunt ons bereiken op 020-123 4567, op werkdagen tussen 08:00 en 17:00 uur.' }
              ]);
              setOptions([]);
              setShowOptions(false);
            }
          }
        ];
      } else {
        botReply = {
          type: 'bot',
          text: 'Excuses, ik begrijp uw vraag niet helemaal. Kunt u specifieker zijn?'
        };
        newOptions = [
          {
            text: 'Offerte aanvragen',
            action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
          },
          {
            text: 'Meer info over diensten',
            action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
          },
          {
            text: 'Contact opnemen',
            action: () => handleOptionClick('Ik wil contact opnemen.')
          }
        ];
      }

      // Voeg het antwoord van de bot toe
      setMessages(prev => [...prev, botReply]);
      
      // Toon nieuwe opties indien aanwezig
      if (newOptions.length > 0) {
        setTimeout(() => {
          setOptions(newOptions);
          setShowOptions(true);
        }, 500);
      } else {
        // Als er geen nieuwe opties zijn, bied aan om terug te gaan naar het hoofdmenu
        setTimeout(() => {
          setOptions([{
            text: 'Terug naar hoofdmenu',
            action: () => {
              setMessages([{
                type: 'bot',
                text: `${getGreeting()} Welkom bij Refurbish Totaal Nederland. Hoe kan ik u vandaag helpen?`
              }]);
              setTimeout(() => {
                setShowOptions(true);
                setOptions([
                  {
                    text: 'Offerte aanvragen',
                    action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
                  },
                  {
                    text: 'Meer info over diensten',
                    action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
                  },
                  {
                    text: 'Contact opnemen',
                    action: () => handleOptionClick('Ik wil contact opnemen.')
                  },
                  {
                    text: 'Afspraak maken',
                    action: () => handleOptionClick('Ik wil een afspraak maken.')
                  }
                ]);
              }, 500);
            }
          }]);
          setShowOptions(true);
        }, 2000);
      }
    }, 1000);
  };

  // Verwerk ingevoerde tekst
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Voeg het bericht van de gebruiker toe
    setMessages(prev => [...prev, { type: 'user', text: userInput }]);
    setUserInput('');
    
    // Simuleer een korte denkpauze
    setTimeout(() => {
      // Eenvoudige keyword matching voor de bot response
      let botResponse = "Excuses, ik begrijp uw vraag niet helemaal. Kunt u één van de bovenstaande opties kiezen?";
      
      const input = userInput.toLowerCase();
      if (input.includes('offerte') || input.includes('prijs') || input.includes('kosten')) {
        botResponse = "Voor een vrijblijvende offerte kunt u het beste ons offerteformulier invullen. Zou u dat willen?";
        setOptions([
          {
            text: 'Ja, naar offerteformulier',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ja, ik wil het offerteformulier invullen.' },
                { type: 'bot', text: 'Ik verwijs u door naar ons offerteformulier.' }
              ]);
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = '/offerte';
              }, 2000);
            }
          },
          {
            text: 'Nee, ik wil liever bellen',
            action: () => {
              setMessages(prev => [...prev, 
                { type: 'user', text: 'Ik bel liever.' },
                { type: 'bot', text: 'Dat kan ook! U kunt ons bereiken op 020-123 4567, op werkdagen tussen 08:00 en 17:00 uur.' }
              ]);
              setOptions([]);
              setShowOptions(false);
            }
          }
        ]);
        setShowOptions(true);
      } else if (input.includes('dienst') || input.includes('service') || input.includes('product')) {
        botResponse = "We bieden verschillende diensten aan zoals schilderwerk, dakrenovatie, stucadoren en meer. Over welke dienst wilt u specifiek meer informatie?";
        setOptions([
          {
            text: 'Schilderwerk',
            action: () => handleOptionClick('Ik wil meer weten over schilderwerk.')
          },
          {
            text: 'Dakrenovatie',
            action: () => handleOptionClick('Ik wil meer weten over dakrenovatie.')
          },
          {
            text: 'Alle diensten bekijken',
            action: () => handleOptionClick('Ik wil alle diensten bekijken.')
          }
        ]);
        setShowOptions(true);
      } else if (input.includes('contact') || input.includes('bellen') || input.includes('mail')) {
        botResponse = "U kunt op verschillende manieren contact met ons opnemen. Wat heeft uw voorkeur?";
        setOptions([
          {
            text: 'Telefonisch',
            action: () => handleOptionClick('Ik wil graag telefonisch contact.')
          },
          {
            text: 'WhatsApp',
            action: () => handleOptionClick('Ik wil graag via WhatsApp contact.')
          },
          {
            text: 'E-mail',
            action: () => handleOptionClick('Ik wil graag via e-mail contact.')
          }
        ]);
        setShowOptions(true);
      } else {
        // Toon standaard opties
        setOptions([
          {
            text: 'Offerte aanvragen',
            action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
          },
          {
            text: 'Meer info over diensten',
            action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
          },
          {
            text: 'Contact opnemen',
            action: () => handleOptionClick('Ik wil contact opnemen.')
          }
        ]);
        setShowOptions(true);
      }

      // Voeg het antwoord van de bot toe
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Icon */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-brand-darkGreen text-white flex items-center justify-center shadow-lg z-30 hover:scale-110 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-brand-lightGreen animate-pulse"></span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-40 transition-all duration-300 ${isOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 pointer-events-none transform translate-y-10'}`}
      >
        {/* Header */}
        <div className="bg-brand-darkGreen text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-brand-lightGreen/20 flex items-center justify-center mr-3">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold">Refurbish Chat</h3>
              <p className="text-xs text-gray-200">Online | Wij reageren direct</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-brand-darkGreen/50 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 animate-fade-in ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${message.type === 'user' 
                  ? 'bg-brand-lightGreen text-white rounded-br-none' 
                  : 'bg-white shadow-sm text-gray-800 rounded-bl-none'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {/* Options */}
          {showOptions && options.length > 0 && (
            <div className="mt-4 space-y-2 animate-fade-in">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors"
                >
                  <span>{option.text}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Contact */}
        <div className="p-2 border-t border-gray-200 bg-gray-50 flex justify-center space-x-4">
          <a 
            href="tel:0201234567" 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-darkGreen/10 text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition-colors"
          >
            <Phone size={18} />
          </a>
          <a 
            href="mailto:info@refurbishtotaal.nl" 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-darkGreen/10 text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white rounded-b-lg flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Typ uw bericht hier..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-darkGreen focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-brand-darkGreen text-white p-2 rounded-r-md hover:bg-opacity-90"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
