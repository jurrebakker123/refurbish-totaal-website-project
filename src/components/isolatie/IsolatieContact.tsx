
import React from 'react';
import ReusableForm from '@/components/common/ReusableForm';

const IsolatieContact = () => {
  const additionalFields = [
    {
      name: 'isolatie_type',
      label: 'Type isolatie',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'spouwmuur', label: 'Spouwmuur isolatie' },
        { value: 'dakisolatie', label: 'Dakisolatie' },
        { value: 'vloerisolatie', label: 'Vloerisolatie' },
        { value: 'gevelisolatie', label: 'Gevelisolatie' },
        { value: 'HR++_glas', label: 'HR++ Glas' },
        { value: 'alles', label: 'Alles' }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vraag een gratis offerte aan
            </h2>
            <p className="text-lg text-gray-600">
              Bespaar tot 30% op uw energierekening met professionele isolatie
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Waarom kiezen voor isolatie?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Lagere energiekosten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Betere woningwaarde</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Comfortabeler woonklimaat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Milieuvriendelijk</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Onze service</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Gratis advies en inspectie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Professionele installatie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Garantie op alle werkzaamheden</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Hulp bij subsidieaanvragen</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <ReusableForm
                title="Isolatie Offerte Aanvragen"
                showFileUpload={true}
                templateId="isolatie_offerte"
                buttonText="Verstuur Aanvraag"
                showServiceInput={true}
                additionalFields={additionalFields}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsolatieContact;
