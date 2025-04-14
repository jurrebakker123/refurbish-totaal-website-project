import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Check, Phone, Mail } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Bedankt voor uw aanvraag! Wij nemen zo spoedig mogelijk contact met u op.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Vrijblijvende Offerte Aanvragen</h1>
              <p className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Vul het onderstaande formulier in en wij nemen binnen 24 uur contact met u op om uw wensen te bespreken.
              </p>
            </div>
          </div>
        </section>

        {/* Offerte Form Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <form onSubmit={handleSubmit}>
                  {/* Persoonlijke gegevens */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Persoonlijke gegevens</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
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
                      </div>
                      <div>
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
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer *</label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                          placeholder="06-12345678"
                          required
                        />
                      </div>
                      <div>
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
                      </div>
                      <div>
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
                      </div>
                      <div>
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
                      </div>
                    </div>
                  </div>

                  {/* Project details */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Project details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Dienst *</label>
                        <select 
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
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
                      </div>
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Gewenste startdatum</label>
                        <input 
                          type="date" 
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-darkGreen focus:border-brand-darkGreen"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
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
                    </div>
                    <div>
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
                    </div>
                  </div>

                  {/* Contact preference */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Contactvoorkeur</h2>
                    <p className="text-gray-700 mb-4">Hoe wilt u dat wij contact met u opnemen?</p>
                    <div className="space-y-4">
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
                    </div>
                  </div>

                  {/* Terms and conditions */}
                  <div className="mb-8">
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

                  {/* Submit button */}
                  <button 
                    type="submit" 
                    className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Offerte Aanvragen
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen animate-fade-in">Waarom kiezen voor Refurbish Totaal Nederland?</h2>
              <p className="text-lg text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Wij staan voor kwaliteit, betrouwbaarheid en vakmanschap. Onze ervaren professionals zorgen voor een zorgeloze uitvoering van uw project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Check className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Vrijblijvende offerte</h3>
                <p className="text-gray-700">
                  Wij maken een gedetailleerde en transparante offerte zonder verplichtingen. Zo weet u precies waar u aan toe bent.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Phone className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Persoonlijk contact</h3>
                <p className="text-gray-700">
                  Eén vast aanspreekpunt gedurende het hele project. Wij hechten waarde aan duidelijke communicatie.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">Snelle respons</h3>
                <p className="text-gray-700">
                  Wij reageren binnen 24 uur op uw aanvraag en streven ernaar om binnen een week een gedetailleerde offerte te maken.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffertePage;
