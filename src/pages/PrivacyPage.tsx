
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Privacybeleid</h1>
              <p className="text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Laatste update: 20 april 2025
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">1. Wie zijn wij?</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland B.V. (hierna: Refurbish) is gespecialiseerd in bouwkundige renovaties, isolatie en verduurzamingsoplossingen voor woningen en kleinzakelijk vastgoed. Wij verwerken persoonsgegevens in het kader van onze dienstverlening.<br /><br />
                  Vestigingsadres: Postbus 61, 6650 AB Druten<br />
                  KvK-nummer: 94040001<br />
                  E-mailadres: info@refurbishtotaalnederland.nl<br />
                  Telefoon: 085 4444 255
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">2. Welke gegevens verzamelen wij?</h2>
                <p className="mb-4">Wij verwerken de volgende categorieën persoonsgegevens:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Naam, adres, woonplaats (NAW-gegevens)</li>
                  <li>Contactgegevens (telefoonnummer, e-mailadres)</li>
                  <li>Financiële gegevens (rekeningnummer, factuuradres)</li>
                  <li>Gegevens over het projectadres of de woning</li>
                  <li>Zakelijke gegevens (voor B2B-opdrachtgevers)</li>
                  <li>Correspondentie en afspraken</li>
                  <li>IP-adres en gebruik van onze website (bij online contact)</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">3. Waarom verwerken wij persoonsgegevens?</h2>
                <p className="mb-4">Wij gebruiken persoonsgegevens uitsluitend voor:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Het uitvoeren van opdrachten en overeenkomsten</li>
                  <li>Het opstellen van offertes en facturen</li>
                  <li>Communicatie over werkzaamheden, afspraken en planning</li>
                  <li>Het voldoen aan wettelijke verplichtingen (zoals fiscale bewaarplicht)</li>
                  <li>Marketingactiviteiten (alleen met toestemming)</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">4. Hoe lang bewaren wij gegevens?</h2>
                <p className="mb-4">Wij bewaren persoonsgegevens niet langer dan nodig is:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Administratieve gegevens: 7 jaar (wettelijke bewaartermijn)</li>
                  <li>Projectinformatie: max. 5 jaar na oplevering</li>
                  <li>Contactgegevens: zolang nodig voor communicatie of totdat u verzoekt deze te verwijderen</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">5. Delen wij gegevens met derden?</h2>
                <p className="mb-4">Wij delen persoonsgegevens alleen als dat noodzakelijk is, bijvoorbeeld met:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Partners of onderaannemers die bij de uitvoering betrokken zijn</li>
                  <li>De boekhouder of belastingadviseur</li>
                  <li>Softwareleveranciers (zoals projectadministratie)</li>
                  <li>Overheidsinstanties, als dit wettelijk verplicht is</li>
                </ul>
                <p className="mb-6">Met verwerkers sluiten wij een verwerkersovereenkomst conform de AVG.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">6. Beveiliging</h2>
                <p className="mb-6">
                  Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies of onrechtmatig gebruik. Alleen bevoegde medewerkers hebben toegang tot de gegevens.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">7. Rechten van betrokkenen</h2>
                <p className="mb-4">U heeft recht op:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Inzage in uw gegevens</li>
                  <li>Correctie of verwijdering van uw gegevens</li>
                  <li>Beperking of bezwaar tegen de verwerking</li>
                  <li>Overdraagbaarheid van gegevens (dataportabiliteit)</li>
                  <li>Intrekking van toestemming (indien van toepassing)</li>
                </ul>
                <p className="mb-6">U kunt hiervoor contact met ons opnemen via info@refurbishtotaalnederland.nl.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">8. Cookies en websitegebruik</h2>
                <p className="mb-6">
                  Op onze website gebruiken wij alleen functionele cookies en (indien van toepassing) analytische cookies voor het verbeteren van de gebruikerservaring. Wij plaatsen geen trackingcookies zonder uw toestemming.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">9. Vragen of klachten</h2>
                <p className="mb-6">
                  Voor vragen over dit privacybeleid kunt u contact opnemen via info@refurbishtotaalnederland.nl.<br /><br />
                  Heeft u een klacht over de manier waarop wij met uw gegevens omgaan? Dan kunt u ook terecht bij de Autoriteit Persoonsgegevens via www.autoriteitpersoonsgegevens.nl.
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

export default PrivacyPage;
