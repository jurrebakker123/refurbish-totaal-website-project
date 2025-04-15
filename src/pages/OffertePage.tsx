
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Check, Phone, Mail, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";
import CallToActionSection from '@/components/CallToActionSection';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Dienst-specifieke vragen
const dienstVragen = {
  'schilderwerk': [
    { 
      id: 'schilderwerk_type',
      label: 'Is het binnen- of buitenschilderwerk?',
      type: 'select',
      options: ['Binnen', 'Buiten', 'Beide']
    },
    { 
      id: 'schilderwerk_oppervlakte',
      label: 'Wat is ongeveer de oppervlakte (in m²)?',
      type: 'text',
      placeholder: 'Bijv. 100 m²'
    },
    { 
      id: 'schilderwerk_huidige_staat',
      label: 'Wat is de huidige staat van het oppervlak?',
      type: 'select',
      options: ['Goed', 'Redelijk', 'Slecht (extra voorbehandeling nodig)']
    }
  ],
  'dakrenovatie': [
    { 
      id: 'dakrenovatie_type',
      label: 'Wat is het type dak?',
      type: 'select',
      options: ['Plat dak', 'Schuin dak', 'Combinatie']
    },
    { 
      id: 'dakrenovatie_reden',
      label: 'Wat is de reden voor renovatie?',
      type: 'select',
      options: ['Lekkage', 'Isolatie verbeteren', 'Vervanging dakbedekking', 'Complete renovatie', 'Anders']
    },
    { 
      id: 'dakrenovatie_oppervlakte',
      label: 'Wat is ongeveer de oppervlakte van het dak (in m²)?',
      type: 'text',
      placeholder: 'Bijv. 80 m²'
    }
  ],
  'stucadoren': [
    { 
      id: 'stucadoren_ruimtes',
      label: 'Welke ruimtes moeten gestuct worden?',
      type: 'multiselect',
      options: ['Woonkamer', 'Keuken', 'Slaapkamer(s)', 'Badkamer', 'Hal', 'Anders']
    },
    { 
      id: 'stucadoren_oppervlakte',
      label: 'Wat is ongeveer de totale oppervlakte (in m²)?',
      type: 'text',
      placeholder: 'Bijv. 120 m²'
    },
    { 
      id: 'stucadoren_type',
      label: 'Welk type stucwerk wenst u?',
      type: 'select',
      options: ['Glad/fijn', 'Grof/structuur', 'Sierpleister', 'Nog niet bekend/advies gewenst']
    }
  ],
  'installatietechniek': [
    { 
      id: 'installatietechniek_type',
      label: 'Om welk type installatie gaat het?',
      type: 'select',
      options: ['Elektra', 'Loodgieterswerk', 'Verwarming', 'Ventilatie', 'Zonnepanelen', 'Anders']
    },
    { 
      id: 'installatietechniek_bestaand',
      label: 'Gaat het om vervanging/renovatie of een nieuwe installatie?',
      type: 'select',
      options: ['Vervanging/renovatie bestaande installatie', 'Volledig nieuwe installatie', 'Uitbreiding van bestaande installatie']
    }
  ],
  'aan-en-verbouw': [
    { 
      id: 'verbouw_type',
      label: 'Wat voor type verbouwing plant u?',
      type: 'select',
      options: ['Uitbouw', 'Dakkapel', 'Interne verbouwing', 'Aanbouw', 'Anders']
    },
    { 
      id: 'verbouw_fase',
      label: 'In welke fase bevindt uw project zich?',
      type: 'select',
      options: ['Ideeënfase', 'Ontwerpfase', 'Vergunning aangevraagd', 'Klaar om te starten']
    },
    { 
      id: 'verbouw_oppervlakte',
      label: 'Wat is ongeveer de oppervlakte van de verbouwing (in m²)?',
      type: 'text',
      placeholder: 'Bijv. 30 m²'
    }
  ],
  'pvc-vloeren': [
    { 
      id: 'pvc_ruimtes',
      label: 'In welke ruimtes wilt u PVC vloer laten plaatsen?',
      type: 'multiselect',
      options: ['Woonkamer', 'Keuken', 'Slaapkamer(s)', 'Badkamer', 'Hal', 'Anders']
    },
    { 
      id: 'pvc_oppervlakte',
      label: 'Wat is ongeveer de totale oppervlakte (in m²)?',
      type: 'text',
      placeholder: 'Bijv. 60 m²'
    },
    { 
      id: 'pvc_ondervloer',
      label: 'Is er al een geschikte ondervloer aanwezig?',
      type: 'select',
      options: ['Ja', 'Nee', 'Weet ik niet']
    }
  ],
  'anders': [
    { 
      id: 'anders_omschrijving',
      label: 'Kunt u gedetailleerd omschrijven om wat voor werkzaamheden het gaat?',
      type: 'textarea',
      placeholder: 'Beschrijf zo specifiek mogelijk welke werkzaamheden u wilt laten uitvoeren...'
    }
  ]
};

const OffertePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    service: '',
    description: '',
    startDate: '',
    budget: '',
    contactPreference: 'email',
    termsAccepted: false
  });

  const [dienstSpecifiekeVelden, setDienstSpecifiekeVelden] = useState<Record<string, any>>({});
  const [multiselectValues, setMultiselectValues] = useState<Record<string, string[]>>({});
  const [sectieOpen, setSectieOpen] = useState({
    persoonlijk: true,
    project: true,
    dienstSpecifiek: true,
    contact: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, termsAccepted: checked }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, contactPreference: e.target.value }));
  };

  const handleDienstSpecifiekeVeldenChange = (id: string, value: string) => {
    setDienstSpecifiekeVelden(prev => ({ ...prev, [id]: value }));
  };

  const handleMultiselectChange = (id: string, value: string) => {
    setMultiselectValues(prev => {
      const currentValues = prev[id] || [];
      if (currentValues.includes(value)) {
        // If already selected, remove it
        return { ...prev, [id]: currentValues.filter(v => v !== value) };
      } else {
        // If not selected, add it
        return { ...prev, [id]: [...currentValues, value] };
      }
    });
  };

  const handleDienstChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDienst = e.target.value;
    setFormData(prev => ({ ...prev, service: newDienst }));
    
    // Reset dienst-specifieke velden bij wijziging dienst
    setDienstSpecifiekeVelden({});
    setMultiselectValues({});
    
    // Open dienst-specifiek sectie bij selectie dienst
    if (newDienst) {
      setSectieOpen(prev => ({ ...prev, dienstSpecifiek: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', {
      ...formData, 
      dienstSpecifiekeVelden,
      multiselectValues
    });
    
    // Toon bevestigingstoast
    toast.success('Uw offerte aanvraag is succesvol verzonden! Wij nemen zo spoedig mogelijk contact met u op.', {
      duration: 6000,
    });
    
    // Reset form na succesvolle verzending
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      service: '',
      description: '',
      startDate: '',
      budget: '',
      contactPreference: 'email',
      termsAccepted: false
    });
    setDienstSpecifiekeVelden({});
    setMultiselectValues({});
  };

  const toggleSectie = (sectie: keyof typeof sectieOpen) => {
    setSectieOpen(prev => ({ ...prev, [sectie]: !prev[sectie] }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-16">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
            }}
          ></div>
          <div className="container relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Vrijblijvende Offerte Aanvragen</h1>
              <p className="text-xl">
                Vul het onderstaande formulier in en wij nemen binnen 24 uur contact met u op om uw wensen te bespreken.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Offerte Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <form onSubmit={handleSubmit}>
                  {/* Persoonlijke gegevens */}
                  <div className="mb-8">
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSectie('persoonlijk')}
                    >
                      <h2 className="text-2xl font-bold mb-2 text-brand-darkGreen">Persoonlijke gegevens</h2>
                      {sectieOpen.persoonlijk ? 
                        <ChevronUp className="text-brand-darkGreen" /> : 
                        <ChevronDown className="text-brand-darkGreen" />
                      }
                    </div>
                    
                    {sectieOpen.persoonlijk && (
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                      >
                        <motion.div variants={fadeInUp}>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                          <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Uw volledige naam"
                            required
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
                          <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="uw@email.nl"
                            required
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer *</label>
                          <input 
                            type="tel" 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="+31 6 30136079"
                            required
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adres *</label>
                          <input 
                            type="text" 
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Straatnaam en huisnummer"
                            required
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                          <input 
                            type="text" 
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="1234 AB"
                            required
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Plaats *</label>
                          <input 
                            type="text" 
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Uw woonplaats"
                            required
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Project details */}
                  <div className="mb-8">
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSectie('project')}
                    >
                      <h2 className="text-2xl font-bold mb-2 text-brand-darkGreen">Project details</h2>
                      {sectieOpen.project ? 
                        <ChevronUp className="text-brand-darkGreen" /> : 
                        <ChevronDown className="text-brand-darkGreen" />
                      }
                    </div>
                    
                    {sectieOpen.project && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                          <motion.div variants={fadeInUp}>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Dienst *</label>
                            <select 
                              id="service"
                              name="service"
                              value={formData.service}
                              onChange={handleDienstChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                              required
                            >
                              <option value="">Selecteer een dienst</option>
                              <option value="schilderwerk">Schilderwerk</option>
                              <option value="dakrenovatie">Dakrenovatie</option>
                              <option value="stucadoren">Stucadoren</option>
                              <option value="installatietechniek">Installatietechniek</option>
                              <option value="aan-en-verbouw">Aan- en verbouw</option>
                              <option value="pvc-vloeren">PVC Vloeren</option>
                              <option value="anders">Anders</option>
                            </select>
                          </motion.div>
                          <motion.div variants={fadeInUp}>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Gewenste startdatum</label>
                            <input 
                              type="date" 
                              id="startDate"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            />
                          </motion.div>
                        </div>
                        <motion.div variants={fadeInUp}>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Omschrijving van het project *</label>
                          <textarea 
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Beschrijf uw project zo gedetailleerd mogelijk..."
                            required
                          ></textarea>
                        </motion.div>
                        <motion.div className="mt-6" variants={fadeInUp}>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (optioneel)</label>
                          <input 
                            type="text" 
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                            placeholder="Uw budget voor dit project"
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Dienst-specifieke vragen */}
                  {formData.service && (
                    <div className="mb-8">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSectie('dienstSpecifiek')}
                      >
                        <h2 className="text-2xl font-bold mb-2 text-brand-darkGreen">
                          Specifieke vragen over {
                            formData.service === 'schilderwerk' ? 'schilderwerk' :
                            formData.service === 'dakrenovatie' ? 'dakrenovatie' :
                            formData.service === 'stucadoren' ? 'stucadoren' :
                            formData.service === 'installatietechniek' ? 'installatietechniek' :
                            formData.service === 'aan-en-verbouw' ? 'aan- en verbouw' :
                            formData.service === 'pvc-vloeren' ? 'PVC vloeren' : 'uw dienst'
                          }
                        </h2>
                        {sectieOpen.dienstSpecifiek ? 
                          <ChevronUp className="text-brand-darkGreen" /> : 
                          <ChevronDown className="text-brand-darkGreen" />
                        }
                      </div>
                      
                      {sectieOpen.dienstSpecifiek && dienstVragen[formData.service as keyof typeof dienstVragen] && (
                        <motion.div 
                          className="space-y-6 mt-4"
                          initial="hidden"
                          animate="visible"
                          variants={staggerContainer}
                        >
                          {dienstVragen[formData.service as keyof typeof dienstVragen].map((vraag, index) => (
                            <motion.div key={vraag.id} variants={fadeInUp}>
                              <label htmlFor={vraag.id} className="block text-sm font-medium text-gray-700 mb-1">{vraag.label}</label>
                              
                              {vraag.type === 'select' && (
                                <select
                                  id={vraag.id}
                                  value={dienstSpecifiekeVelden[vraag.id] || ''}
                                  onChange={(e) => handleDienstSpecifiekeVeldenChange(vraag.id, e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                                >
                                  <option value="">Selecteer een optie</option>
                                  {vraag.options.map((option: string) => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              )}
                              
                              {vraag.type === 'text' && (
                                <input
                                  type="text"
                                  id={vraag.id}
                                  value={dienstSpecifiekeVelden[vraag.id] || ''}
                                  onChange={(e) => handleDienstSpecifiekeVeldenChange(vraag.id, e.target.value)}
                                  placeholder={vraag.placeholder}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                                />
                              )}
                              
                              {vraag.type === 'textarea' && (
                                <textarea
                                  id={vraag.id}
                                  value={dienstSpecifiekeVelden[vraag.id] || ''}
                                  onChange={(e) => handleDienstSpecifiekeVeldenChange(vraag.id, e.target.value)}
                                  placeholder={vraag.placeholder}
                                  rows={4}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                                />
                              )}
                              
                              {vraag.type === 'multiselect' && (
                                <div className="space-y-2">
                                  {vraag.options.map((option: string) => (
                                    <div key={option} className="flex items-center">
                                      <Checkbox 
                                        id={`${vraag.id}-${option}`}
                                        checked={(multiselectValues[vraag.id] || []).includes(option)}
                                        onCheckedChange={() => handleMultiselectChange(vraag.id, option)}
                                        className="mr-2" 
                                      />
                                      <label 
                                        htmlFor={`${vraag.id}-${option}`}
                                        className="text-sm text-gray-700 cursor-pointer"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          ))}
                          <motion.div 
                            variants={fadeInUp}
                            className="flex items-center p-4 bg-blue-50 text-blue-700 rounded-md"
                          >
                            <Info size={20} className="mr-2 flex-shrink-0" />
                            <p className="text-sm">
                              Deze aanvullende informatie helpt ons om een nauwkeurigere offerte voor u op te stellen. 
                              Hoe meer details u verstrekt, hoe beter we kunnen inspelen op uw specifieke wensen.
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Contact preference */}
                  <div className="mb-8">
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSectie('contact')}
                    >
                      <h2 className="text-2xl font-bold mb-2 text-brand-darkGreen">Contactvoorkeur</h2>
                      {sectieOpen.contact ? 
                        <ChevronUp className="text-brand-darkGreen" /> : 
                        <ChevronDown className="text-brand-darkGreen" />
                      }
                    </div>
                    
                    {sectieOpen.contact && (
                      <motion.div 
                        className="space-y-4 mt-4"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                      >
                        <p className="text-gray-700 mb-4">Hoe wilt u dat wij contact met u opnemen?</p>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="contactEmail" 
                            name="contactPreference" 
                            value="email"
                            checked={formData.contactPreference === 'email'}
                            onChange={handleRadioChange}
                            className="h-4 w-4 text-brand-darkGreen focus:ring-brand-lightGreen"
                          />
                          <label htmlFor="contactEmail" className="ml-2 block text-sm text-gray-700">
                            <span className="font-medium">E-mail</span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="contactPhone" 
                            name="contactPreference" 
                            value="phone"
                            checked={formData.contactPreference === 'phone'}
                            onChange={handleRadioChange}
                            className="h-4 w-4 text-brand-darkGreen focus:ring-brand-lightGreen"
                          />
                          <label htmlFor="contactPhone" className="ml-2 block text-sm text-gray-700">
                            <span className="font-medium">Telefoon</span>
                          </label>
                        </div>

                        {/* Terms and conditions */}
                        <div className="mt-6">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <Checkbox 
                                id="terms" 
                                checked={formData.termsAccepted}
                                onCheckedChange={handleCheckboxChange}
                                required
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="text-gray-700">
                                Ik ga akkoord met de <Link to="/voorwaarden" className="text-brand-darkGreen hover:underline">algemene voorwaarden</Link> en het <Link to="/privacy" className="text-brand-darkGreen hover:underline">privacybeleid</Link> *
                              </label>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Submit button */}
                  <motion.button 
                    type="submit" 
                    className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Offerte Aanvragen
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                className="text-3xl font-bold mb-6 text-brand-darkGreen"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Waarom kiezen voor Refurbish Totaal Nederland?
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Wij staan voor kwaliteit, betrouwbaarheid en vakmanschap. Onze ervaren professionals zorgen voor een zorgeloze uitvoering van uw project.
              </motion.p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={fadeInUp}
              >
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Check className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Vrijblijvende offerte</h3>
                <p className="text-gray-700">
                  Wij maken een gedetailleerde en transparante offerte zonder verplichtingen. Zo weet u precies waar u aan toe bent.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={fadeInUp}
              >
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Phone className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Persoonlijk contact</h3>
                <p className="text-gray-700">
                  Eén vast aanspreekpunt gedurende het hele project. Wij hechten waarde aan duidelijke communicatie.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={fadeInUp}
              >
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Snelle respons</h3>
                <p className="text-gray-700">
                  Wij reageren binnen 24 uur op uw aanvraag en streven ernaar om binnen een week een gedetailleerde offerte te maken.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call To Action */}
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default OffertePage;
