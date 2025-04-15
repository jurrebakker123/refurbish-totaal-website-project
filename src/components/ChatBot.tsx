import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Phone, Mail, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';
type Message = {
  type: 'bot' | 'user';
  text: string;
};
type Option = {
  text: string;
  action: () => void;
};

// Define the service data for the enhanced chatbot
const diensten = [{
  id: 'schilderwerk',
  name: 'Schilderwerk',
  questions: [{
    question: 'Is het binnen- of buitenschilderwerk?',
    options: ['Binnen', 'Buiten', 'Beide']
  }, {
    question: 'Wat is ongeveer de omvang van het project?',
    options: ['Klein (1-2 kamers)', 'Middelgroot (3-5 kamers)', 'Groot (volledig pand)', 'Anders']
  }, {
    question: 'Heeft u een specifieke tijdplanning in gedachten?',
    options: ['Zo snel mogelijk', 'Binnen 1-2 maanden', 'Later dit jaar', 'Flexibel']
  }]
}, {
  id: 'dakrenovatie',
  name: 'Dakrenovatie',
  questions: [{
    question: 'Wat is het type dak?',
    options: ['Plat dak', 'Schuin dak', 'Weet ik niet zeker']
  }, {
    question: 'Wat is de reden voor renovatie?',
    options: ['Lekkage', 'Isolatie verbeteren', 'Vervanging dakpannen', 'Compleet nieuwe dakconstructie', 'Anders']
  }, {
    question: 'Wanneer wilt u het project laten uitvoeren?',
    options: ['Zo snel mogelijk', 'Binnen 1-2 maanden', 'Later dit jaar', 'Flexibel']
  }]
}, {
  id: 'stucadoren',
  name: 'Stucadoren',
  questions: [{
    question: 'Welke ruimtes wilt u laten stucen?',
    options: ['Woonkamer', 'Slaapkamer(s)', 'Keuken', 'Badkamer', 'Hele woning', 'Anders']
  }, {
    question: 'Gaat het om wanden, plafonds of beide?',
    options: ['Alleen wanden', 'Alleen plafonds', 'Beide']
  }, {
    question: 'Is er sprake van bestaand stucwerk dat gerepareerd moet worden?',
    options: ['Ja, reparatie nodig', 'Nee, nieuw stucwerk', 'Beide']
  }]
}, {
  id: 'installatietechniek',
  name: 'Installatietechniek',
  questions: [{
    question: 'Om welk type installatie gaat het?',
    options: ['Elektra', 'Loodgieterswerk', 'Verwarming', 'Ventilatie', 'Duurzame energie', 'Anders']
  }, {
    question: 'Is het voor een nieuwbouw of renovatie?',
    options: ['Nieuwbouw', 'Renovatie', 'Uitbreiding bestaand systeem']
  }, {
    question: 'Heeft u specifieke wensen op het gebied van duurzaamheid?',
    options: ['Ja, energiebesparend', 'Ja, duurzame materialen', 'Nee, geen specifieke wensen', 'Anders']
  }]
}, {
  id: 'aan-en-verbouw',
  name: 'Aan- en verbouw',
  questions: [{
    question: 'Wat voor type verbouwing plant u?',
    options: ['Uitbouw', 'Dakkapel', 'Interne verbouwing', 'Compleet huis', 'Anders']
  }, {
    question: 'In welke fase bevindt uw project zich?',
    options: ['Ideeënfase', 'Ontwerpfase', 'Vergunning aangevraagd', 'Klaar om te starten']
  }, {
    question: 'Heeft u al een bouwvergunning of moet deze nog aangevraagd worden?',
    options: ['Ja, vergunning is aanwezig', 'Nee, moet nog aangevraagd worden', 'Weet ik niet / ben niet zeker']
  }]
}, {
  id: 'pvc-vloeren',
  name: 'PVC Vloeren',
  questions: [{
    question: 'In welke ruimtes wilt u PVC vloer laten plaatsen?',
    options: ['Woonkamer', 'Keuken', 'Slaapkamer(s)', 'Badkamer', 'Hele woning', 'Anders']
  }, {
    question: 'Heeft u al een specifiek type/stijl PVC vloer in gedachten?',
    options: ['Houtlook', 'Steenlook', 'Effen', 'Nog niet bekend']
  }, {
    question: 'Moet de oude vloerbedekking nog verwijderd worden?',
    options: ['Ja', 'Nee, ruimte is al leeg', 'Gedeeltelijk']
  }]
}, {
  id: 'anders',
  name: 'Anders',
  questions: [{
    question: 'Kunt u omschrijven wat voor werkzaamheden u wilt laten uitvoeren?',
    options: ['Ik wil graag een persoonlijk gesprek', 'Ik stuur liever een e-mail met details', 'Ik vul het offerteformulier in']
  }]
}];
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [showInitialDelay, setShowInitialDelay] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, string[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatisch welkomstbericht sturen na een korte vertraging
  useEffect(() => {
    // Wacht 3 seconden en toon dan de chatbot popup met een toast melding
    const timer = setTimeout(() => {
      setShowInitialDelay(false);
      if (!isOpen) {
        toast.info(<div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            
          </div>, {
          action: {
            label: 'Open chat',
            onClick: () => setIsOpen(true)
          },
          duration: 10000,
          position: 'bottom-center' // Position the toast at the bottom center so it doesn't overlap the chatbot icon
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Bij het laden van de pagina, de chatbot automatisch openen
  useEffect(() => {
    const hasSeenChatbot = sessionStorage.getItem('hasSeenChatbot');
    if (!hasSeenChatbot) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenChatbot', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
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
        setOptions([{
          text: 'Offerte aanvragen',
          action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
        }, {
          text: 'Meer info over diensten',
          action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
        }, {
          text: 'Contact opnemen',
          action: () => handleOptionClick('Ik wil contact opnemen.')
        }, {
          text: 'Afspraak maken',
          action: () => handleOptionClick('Ik wil een afspraak maken.')
        }]);
      }, 1000);
    }
  }, [isOpen, showInitialDelay, messages.length]);

  // Scroll naar beneden wanneer er nieuwe berichten zijn
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  // Bepaal de begroeting op basis van tijd van de dag
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Goedemorgen!';
    if (hour < 18) return 'Goedemiddag!';
    return 'Goedenavond!';
  };

  // Stel vervolgvragen op basis van geselecteerde dienst
  const handleServiceSelection = (serviceId: string) => {
    const selectedService = diensten.find(dienst => dienst.id === serviceId);
    if (selectedService) {
      setCurrentService(serviceId);
      setCurrentQuestionIndex(0);
      setUserResponses({
        ...userResponses,
        [serviceId]: []
      });

      // Voeg bericht toe dat de dienst is geselecteerd
      setMessages(prev => [...prev, {
        type: 'user',
        text: `Ik ben geïnteresseerd in ${selectedService.name}.`
      }, {
        type: 'bot',
        text: `Bedankt voor uw interesse in ${selectedService.name}. Ik stel u graag een paar vragen om u beter te kunnen helpen.`
      }]);

      // Toon de eerste vraag
      if (selectedService.questions && selectedService.questions.length > 0) {
        setTimeout(() => {
          const firstQuestion = selectedService.questions[0];
          setMessages(prev => [...prev, {
            type: 'bot',
            text: firstQuestion.question
          }]);

          // Toon opties voor de eerste vraag
          setOptions(firstQuestion.options.map(option => ({
            text: option,
            action: () => handleQuestionResponse(option)
          })));
          setShowOptions(true);
        }, 1000);
      }
    }
  };

  // Verwerk het antwoord op een vraag
  const handleQuestionResponse = (response: string) => {
    if (!currentService) return;
    const selectedService = diensten.find(dienst => dienst.id === currentService);
    if (!selectedService) return;

    // Voeg het antwoord toe aan de gebruikersreacties
    setUserResponses(prev => {
      const serviceResponses = prev[currentService] || [];
      return {
        ...prev,
        [currentService]: [...serviceResponses, response]
      };
    });

    // Voeg het antwoord toe als gebruikersbericht
    setMessages(prev => [...prev, {
      type: 'user',
      text: response
    }]);

    // Controleer of er nog meer vragen zijn
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (selectedService.questions && nextQuestionIndex < selectedService.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);

      // Toon de volgende vraag na een korte pauze
      setTimeout(() => {
        const nextQuestion = selectedService.questions[nextQuestionIndex];
        setMessages(prev => [...prev, {
          type: 'bot',
          text: nextQuestion.question
        }]);

        // Toon opties voor de volgende vraag
        setOptions(nextQuestion.options.map(option => ({
          text: option,
          action: () => handleQuestionResponse(option)
        })));
        setShowOptions(true);
      }, 1000);
    } else {
      // Geen vragen meer, rond af
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: `Hartelijk dank voor uw informatie over ${selectedService.name}. Op basis hiervan kunnen wij een passende offerte voor u maken. Hoe wilt u verder gaan?`
        }]);
        setOptions([{
          text: 'Offerte aanvragen',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil graag een offerte aanvragen.'
            }, {
              type: 'bot',
              text: 'Perfect! Ik verwijs u door naar ons offerteformulier, waar uw gegevens alvast zijn ingevuld op basis van onze conversatie.'
            }]);
            setTimeout(() => {
              setIsOpen(false);
              window.location.href = '/offerte';
            }, 2000);
          }
        }, {
          text: 'Liever telefonisch contact',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik heb liever telefonisch contact.'
            }, {
              type: 'bot',
              text: 'Natuurlijk! U kunt ons bereiken op +31 6 30136079. We staan u graag te woord op werkdagen tussen 08:00 en 17:00 uur.'
            }]);
            setShowOptions(false);
          }
        }, {
          text: 'Later beslissen',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil er nog over nadenken.'
            }, {
              type: 'bot',
              text: 'Geen probleem! Neem gerust de tijd om erover na te denken. Heeft u nog andere vragen waar ik u mee kan helpen?'
            }]);

            // Reset naar hoofdmenu
            setTimeout(() => {
              setOptions([{
                text: 'Terug naar hoofdmenu',
                action: () => resetChat()
              }]);
              setShowOptions(true);
            }, 1000);
          }
        }]);
        setShowOptions(true);
        setCurrentService(null);
        setCurrentQuestionIndex(0);
      }, 1000);
    }
  };

  // Reset de chat naar het begin
  const resetChat = () => {
    const greeting = getGreeting();
    setMessages([{
      type: 'bot',
      text: `${greeting} Welkom bij Refurbish Totaal Nederland. Hoe kan ik u vandaag helpen?`
    }]);
    setTimeout(() => {
      setShowOptions(true);
      setOptions([{
        text: 'Offerte aanvragen',
        action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
      }, {
        text: 'Meer info over diensten',
        action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
      }, {
        text: 'Contact opnemen',
        action: () => handleOptionClick('Ik wil contact opnemen.')
      }, {
        text: 'Afspraak maken',
        action: () => handleOptionClick('Ik wil een afspraak maken.')
      }]);
    }, 500);
    setCurrentService(null);
    setCurrentQuestionIndex(0);
    setUserResponses({});
  };

  // Verwerk de gekozen optie
  const handleOptionClick = (optionText: string) => {
    // Voeg het gekozen optie toe als gebruikersbericht
    setMessages(prev => [...prev, {
      type: 'user',
      text: optionText
    }]);

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
          text: 'Natuurlijk! Voor welke van onze diensten wilt u graag een offerte aanvragen?'
        };
        newOptions = diensten.map(dienst => ({
          text: dienst.name,
          action: () => handleServiceSelection(dienst.id)
        }));
      } else if (optionText.includes('diensten')) {
        botReply = {
          type: 'bot',
          text: 'We bieden verschillende diensten aan. Over welke dienst wilt u meer informatie?'
        };
        newOptions = diensten.map(dienst => ({
          text: dienst.name,
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: `Ik wil meer weten over ${dienst.name}.`
            }, {
              type: 'bot',
              text: `Ik verwijs u door naar onze pagina over ${dienst.name.toLowerCase()} waar u alle details kunt vinden.`
            }]);
            setTimeout(() => {
              setIsOpen(false);
              window.location.href = `/diensten/${dienst.id}`;
            }, 2000);
          }
        }));
      } else if (optionText.includes('contact')) {
        botReply = {
          type: 'bot',
          text: 'U kunt op verschillende manieren contact met ons opnemen. Wat heeft uw voorkeur?'
        };
        newOptions = [{
          text: 'Telefonisch',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil graag telefonisch contact.'
            }, {
              type: 'bot',
              text: 'U kunt ons bereiken op +31 6 30136079. Wij zijn beschikbaar op werkdagen tussen 08:00 en 17:00 uur en helpen u graag verder.'
            }]);
            setOptions([]);
            setShowOptions(false);
          }
        }, {
          text: 'WhatsApp',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil graag via WhatsApp contact.'
            }, {
              type: 'bot',
              text: 'U kunt ons een bericht sturen via WhatsApp op nummer +31 6 30136079. We reageren doorgaans binnen enkele uren.'
            }]);
            setOptions([]);
            setShowOptions(false);
          }
        }, {
          text: 'E-mail',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil graag via e-mail contact.'
            }, {
              type: 'bot',
              text: 'U kunt een e-mail sturen naar info@refurbishtotaal.nl en we nemen binnen 24 uur contact met u op.'
            }]);
            setOptions([]);
            setShowOptions(false);
          }
        }, {
          text: 'Contactformulier',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil het contactformulier gebruiken.'
            }, {
              type: 'bot',
              text: 'Ik verwijs u door naar ons contactformulier.'
            }]);
            setTimeout(() => {
              setIsOpen(false);
              window.location.href = '/contact';
            }, 2000);
          }
        }];
      } else if (optionText.includes('afspraak')) {
        botReply = {
          type: 'bot',
          text: 'Wilt u een vrijblijvend gesprek inplannen met één van onze adviseurs op locatie of liever telefonisch?'
        };
        newOptions = [{
          text: 'Op locatie',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil graag een afspraak op locatie.'
            }, {
              type: 'bot',
              text: 'Kunt u aangeven wat voor project het betreft, zodat we de juiste expert kunnen sturen?'
            }]);
            setTimeout(() => {
              setShowOptions(true);
              setOptions(diensten.map(dienst => ({
                text: dienst.name,
                action: () => handleServiceSelection(dienst.id)
              })));
            }, 1000);
          }
        }, {
          text: 'Telefonisch',
          action: () => {
            setMessages(prev => [...prev, {
              type: 'user',
              text: 'Ik wil graag telefonisch contact.'
            }, {
              type: 'bot',
              text: 'Vult u alstublieft hieronder uw telefoonnummer in, dan bellen wij u op een moment dat het u schikt.'
            }]);
            setTimeout(() => {
              setMessages(prev => [...prev, {
                type: 'bot',
                text: 'Dank u wel! We nemen binnen 24 uur contact met u op om een afspraak in te plannen.'
              }]);
              setOptions([]);
              setShowOptions(false);
            }, 5000);
          }
        }];
      } else {
        botReply = {
          type: 'bot',
          text: 'Excuses, ik begrijp uw vraag niet helemaal. Kunt u specifieker zijn?'
        };
        newOptions = [{
          text: 'Offerte aanvragen',
          action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
        }, {
          text: 'Meer info over diensten',
          action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
        }, {
          text: 'Contact opnemen',
          action: () => handleOptionClick('Ik wil contact opnemen.')
        }];
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
            action: () => resetChat()
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
    setMessages(prev => [...prev, {
      type: 'user',
      text: userInput
    }]);
    const inputText = userInput;
    setUserInput('');

    // Simuleer een korte denkpauze
    setTimeout(() => {
      // Eenvoudige keyword matching voor de bot response
      const input = inputText.toLowerCase();
      let hasMatched = false;

      // Check voor diensten
      for (const dienst of diensten) {
        if (input.includes(dienst.id) || input.includes(dienst.name.toLowerCase())) {
          hasMatched = true;
          setMessages(prev => [...prev, {
            type: 'bot',
            text: `U heeft interesse getoond in ${dienst.name}. Wilt u hier meer informatie over of direct een offerte aanvragen?`
          }]);
          setOptions([{
            text: `Meer over ${dienst.name}`,
            action: () => {
              setMessages(prev => [...prev, {
                type: 'user',
                text: `Ik wil meer informatie over ${dienst.name}.`
              }, {
                type: 'bot',
                text: `Ik verwijs u door naar onze pagina over ${dienst.name.toLowerCase()}.`
              }]);
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = `/diensten/${dienst.id}`;
              }, 2000);
            }
          }, {
            text: `Offerte voor ${dienst.name}`,
            action: () => handleServiceSelection(dienst.id)
          }]);
          setShowOptions(true);
          break;
        }
      }

      // Check voor offerte, prijs, kosten
      if (!hasMatched && (input.includes('offerte') || input.includes('prijs') || input.includes('kosten') || input.includes('hoeveel'))) {
        hasMatched = true;
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Voor een vrijblijvende offerte kunt u aangeven in welke dienst u geïnteresseerd bent:"
        }]);
        setOptions(diensten.map(dienst => ({
          text: dienst.name,
          action: () => handleServiceSelection(dienst.id)
        })));
        setShowOptions(true);
      }

      // Check voor contactgegevens
      if (!hasMatched && (input.includes('contact') || input.includes('bellen') || input.includes('telefoon') || input.includes('mail') || input.includes('nummer') || input.includes('adres'))) {
        hasMatched = true;
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "U kunt contact met ons opnemen via:"
        }]);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: "📞 Telefoon: +31 6 30136079\n📧 E-mail: info@refurbishtotaal.nl\n📍 Adres: Niersweg 27, 6591 CT Gennep\n\nWij zijn bereikbaar op werkdagen van 08:00 tot 17:00 uur."
          }]);
          setOptions([{
            text: 'Telefonisch contact',
            action: () => {
              window.location.href = 'tel:+31630136079';
            }
          }, {
            text: 'E-mail sturen',
            action: () => {
              window.location.href = 'mailto:info@refurbishtotaal.nl';
            }
          }, {
            text: 'Route plannen',
            action: () => {
              window.open('https://maps.google.com/?q=Niersweg+27,+6591+CT+Gennep', '_blank');
            }
          }]);
          setShowOptions(true);
        }, 500);
      }

      // Algemeen antwoord als geen specifieke match
      if (!hasMatched) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Bedankt voor uw bericht. Waarmee kan ik u helpen? U kunt kiezen uit onderstaande opties of uw vraag specifieker stellen."
        }]);

        // Toon standaard opties
        setOptions([{
          text: 'Offerte aanvragen',
          action: () => handleOptionClick('Ik wil graag een offerte aanvragen.')
        }, {
          text: 'Meer info over diensten',
          action: () => handleOptionClick('Ik wil meer informatie over jullie diensten.')
        }, {
          text: 'Contact opnemen',
          action: () => handleOptionClick('Ik wil contact opnemen.')
        }]);
        setShowOptions(true);
      }
    }, 1000);
  };

  // Animatie varianten
  const chatAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };
  const buttonAnimation = {
    hover: {
      scale: 1.1
    },
    tap: {
      scale: 0.95
    }
  };
  return <>
      {/* Chat Icon */}
      <motion.button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-brand-darkGreen text-white flex items-center justify-center shadow-lg z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} initial={{
      scale: 0.8,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} whileHover={buttonAnimation.hover} whileTap={buttonAnimation.tap} transition={{
      type: "spring",
      stiffness: 400,
      damping: 10
    }}>
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-brand-lightGreen animate-pulse"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && <motion.div className="fixed bottom-6 right-6 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50" variants={chatAnimation} initial="hidden" animate="visible" exit="exit">
            {/* Header */}
            <div className="bg-brand-darkGreen text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-brand-lightGreen/20 flex items-center justify-center mr-3">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Refurbish Totaal Nederland</h3>
                  <p className="text-xs text-gray-200">Online | Wij reageren direct</p>
                </div>
              </div>
              <motion.button onClick={() => setIsOpen(false)} className="hover:bg-brand-darkGreen/50 p-1 rounded-full transition-colors" whileHover={{
            rotate: 90
          }} transition={{
            duration: 0.2
          }}>
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <AnimatePresence>
                {messages.map((message, index) => <motion.div key={index} className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`} initial={{
              opacity: 0,
              y: 10,
              scale: 0.95
            }} animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }} transition={{
              duration: 0.3,
              delay: 0.1 * index % 0.5
            }}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${message.type === 'user' ? 'bg-brand-lightGreen text-white rounded-br-none' : 'bg-white shadow-sm text-gray-800 rounded-bl-none'}`}>
                      {message.text.split('\n').map((text, i) => <React.Fragment key={i}>
                          {text}
                          {i !== message.text.split('\n').length - 1 && <br />}
                        </React.Fragment>)}
                    </div>
                  </motion.div>)}
              </AnimatePresence>
              <div ref={messagesEndRef} />

              {/* Options */}
              <AnimatePresence>
                {showOptions && options.length > 0 && <motion.div className="mt-4 space-y-2" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -10
            }}>
                    {options.map((option, index) => <motion.button key={index} onClick={option.action} className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors" whileHover={{
                backgroundColor: "#f8f8f8",
                x: 2
              }} whileTap={{
                scale: 0.98
              }} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.05 * index
              }}>
                        <span>{option.text}</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </motion.button>)}
                  </motion.div>}
              </AnimatePresence>
            </div>

            {/* Quick Contact */}
            <div className="p-2 border-t border-gray-200 bg-gray-50 flex justify-center space-x-4">
              <motion.a href="tel:+31630136079" className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-darkGreen/10 text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition-colors" whileHover={{
            scale: 1.1,
            backgroundColor: "#1B5E20",
            color: "#ffffff"
          }} whileTap={{
            scale: 0.9
          }}>
                <Phone size={18} />
              </motion.a>
              <motion.a href="mailto:info@refurbishtotaal.nl" className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-darkGreen/10 text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition-colors" whileHover={{
            scale: 1.1,
            backgroundColor: "#1B5E20",
            color: "#ffffff"
          }} whileTap={{
            scale: 0.9
          }}>
                <Mail size={18} />
              </motion.a>
              <motion.a href="https://maps.google.com/?q=Niersweg+27,+6591+CT+Gennep" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-darkGreen/10 text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition-colors" whileHover={{
            scale: 1.1,
            backgroundColor: "#1B5E20",
            color: "#ffffff"
          }} whileTap={{
            scale: 0.9
          }}>
                <MapPin size={18} />
              </motion.a>
              <motion.a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-darkGreen/10 text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition-colors" whileHover={{
            scale: 1.1,
            backgroundColor: "#1B5E20",
            color: "#ffffff"
          }} whileTap={{
            scale: 0.9
          }}>
                <Clock size={18} />
              </motion.a>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white rounded-b-lg flex items-center">
              <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Typ uw bericht hier..." className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-darkGreen focus:border-transparent" />
              <motion.button type="submit" className="bg-brand-darkGreen text-white p-2 rounded-r-md hover:bg-opacity-90" whileHover={{
            backgroundColor: "rgba(27, 94, 32, 0.9)"
          }} whileTap={{
            scale: 0.95
          }}>
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default ChatBot;