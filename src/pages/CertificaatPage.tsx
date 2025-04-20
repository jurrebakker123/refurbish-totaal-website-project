
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const CertificaatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Certificering en Kwaliteitssysteem</h1>
              <p className="text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Laatste update: 20 april 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">1. Inleiding</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland is actief in de bouwkundige afbouw, isolatietechniek en installatietechniek met een focus op verduurzaming. We werken met zelfstandige professionals (ZZP'ers) die mede-aandeelhouder zijn binnen de samenwerkende BV-structuur.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">2. Kwaliteitssystemen en Certificeringen</h2>
                <p className="mb-4">Voor de uitvoering van onze werkzaamheden streven wij naar hoge kwaliteit en veiligheid. Hieronder een overzicht van de relevante kwaliteitssystemen en certificeringen:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>VCA (Basis en VOL) – veiligheid voor uitvoerenden en leidinggevenden</li>
                  <li>ISO 9001 – kwaliteitsmanagement</li>
                  <li>ISO 14001 – milieumanagement (optioneel)</li>
                  <li>KOMO/BRL-certificeringen – voor isolatie- en installatiewerkzaamheden</li>
                  <li>BouwGarant of Woningborg – kwaliteitswaarborg bij particuliere projecten</li>
                  <li>Modelovereenkomsten DBA – correcte inzet van zelfstandigen</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">3. Status en werkwijze tijdens opstartfase</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland bevindt zich momenteel in de opstartfase van de BV-structuur en wordt hierbij begeleid door een vakdeskundige op het gebied van kwaliteitssystemen.<br /><br />
                  Totdat het kwaliteitssysteem formeel is ingericht en certificeringen zijn verkregen, zullen wij per opdracht of project in overleg met opdrachtgever en onderaannemer afspraken maken over de vereiste certificering of kwaliteitsborging. Deze afspraken maken integraal deel uit van de projectovereenkomst.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">4. Verzekeringen</h2>
                <p className="mb-4">Naast certificeringen zorgen wij voor passende dekking door middel van:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Bedrijfsaansprakelijkheidsverzekering (AVB)</li>
                  <li>Construction All Risk-verzekering (CAR) bij grotere projecten</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">5. Conclusie</h2>
                <p className="mb-6">
                  Wij geloven in samenwerken op basis van vertrouwen, vakmanschap en transparantie. De formele borging via kwaliteitssystemen en certificeringen zal worden afgerond in lijn met onze groei en professionalisering.
                </p>

                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Datum: 20 April 2025<br />
                    Auteur: Gerard Groeneveld
                  </p>
                </div>

                <div className="text-center mt-12">
                  <Link to="/contact" className="btn-primary">
                    Contact Opnemen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CertificaatPage;
