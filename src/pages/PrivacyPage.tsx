
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
                Laatste update: 14 april 2025
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">1. Inleiding</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland, gevestigd aan Exempelstraat 123, 1234 AB Amsterdam, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">2. Contactgegevens</h2>
                <p className="mb-6">
                  Website: www.refurbishtotaal.nl<br />
                  Adres: Exempelstraat 123, 1234 AB Amsterdam<br />
                  Telefoon: 020-123 4567<br />
                  E-mail: info@refurbishtotaal.nl
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">3. Persoonsgegevens die wij verwerken</h2>
                <p className="mb-4">
                  Refurbish Totaal Nederland verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Voor- en achternaam</li>
                  <li>Adresgegevens</li>
                  <li>Telefoonnummer</li>
                  <li>E-mailadres</li>
                  <li>Bankrekeningnummer (indien van toepassing)</li>
                  <li>Overige persoonsgegevens die u actief verstrekt in correspondentie en telefonisch</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">4. Bijzondere en/of gevoelige persoonsgegevens</h2>
                <p className="mb-6">
                  Onze website en diensten hebben niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar, tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">5. Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken</h2>
                <p className="mb-4">
                  Refurbish Totaal Nederland verwerkt uw persoonsgegevens voor de volgende doelen:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Het afhandelen van uw betaling</li>
                  <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
                  <li>U te informeren over wijzigingen van onze diensten en producten</li>
                  <li>Om goederen en diensten bij u af te leveren</li>
                  <li>Het versturen van onze nieuwsbrief (alleen indien u hiervoor expliciet toestemming heeft gegeven)</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">6. Hoe lang we persoonsgegevens bewaren</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen voor de volgende (categorieën) van persoonsgegevens:
                  <br /><br />
                  Klantgegevens: 7 jaar (wettelijke bewaartermijn belastingdienst)<br />
                  Gegevens van potentiële klanten: 1 jaar na laatste contact
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">7. Delen van persoonsgegevens met derden</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland deelt uw persoonsgegevens met verschillende derden als dit noodzakelijk is voor het uitvoeren van de overeenkomst en om te voldoen aan een eventuele wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">8. Cookies, of vergelijkbare technieken, die wij gebruiken</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland gebruikt alleen technische en functionele cookies, en analytische cookies die geen inbreuk maken op uw privacy. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen op uw computer, tablet of smartphone. De cookies die wij gebruiken zijn noodzakelijk voor de technische werking van de website en uw gebruiksgemak.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">9. Gegevens inzien, aanpassen of verwijderen</h2>
                <p className="mb-6">
                  U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door Refurbish Totaal Nederland en heeft u het recht op gegevensoverdraagbaarheid.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">10. Hoe wij persoonsgegevens beveiligen</h2>
                <p className="mb-6">
                  Refurbish Totaal Nederland neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via info@refurbishtotaal.nl.
                </p>

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
