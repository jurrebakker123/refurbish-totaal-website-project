
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const VoorwaardenPage = () => {
  // Function to handle direct PDF download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/documents/algemene-voorwaarden-refurbish-totaal-nederland.pdf';
    link.download = 'Algemene-Voorwaarden-Refurbish-Totaal-Nederland.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Algemene Voorwaarden</h1>
              <p className="text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Laatste update: 20 april 2025
              </p>
            </div>
          </div>
        </section>

        {/* Voorwaarden Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">1. Definities</h2>
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Opdrachtnemer:</strong> Refurbish Totaal Nederland B.V., gevestigd te Gennep, ingeschreven bij de KvK onder nummer 94040001.</li>
                  <li><strong>Opdrachtgever:</strong> iedere natuurlijke of rechtspersoon die met Refurbish Totaal Nederland een overeenkomst sluit.</li>
                  <li><strong>Werkzaamheden:</strong> alle door Refurbish Totaal Nederland te leveren diensten en/of producten in het kader van bouwkundige afbouw, isolatietechniek en installatietechniek.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">2. Toepasselijkheid</h2>
                <p className="mb-4">2.1 Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes, overeenkomsten en werkzaamheden van Refurbish Totaal Nederland.</p>
                <p className="mb-6">2.2 Afwijkingen zijn slechts bindend indien schriftelijk overeengekomen.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">3. Offertes en Overeenkomsten</h2>
                <p className="mb-4">3.1 Alle offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld.</p>
                <p className="mb-6">3.2 Een overeenkomst komt tot stand na schriftelijke bevestiging door Refurbish Totaal Nederland of zodra feitelijk met de uitvoering is begonnen.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">4. Uitvoering van de Werkzaamheden</h2>
                <p className="mb-4">4.1 Refurbish Totaal Nederland voert de werkzaamheden naar beste inzicht en vermogen uit.</p>
                <p className="mb-4">4.2 Termijnen zijn indicatief, tenzij schriftelijk anders is overeengekomen.</p>
                <p className="mb-6">4.3 De opdrachtgever zorgt voor tijdige en juiste informatie en vrije toegang tot de locatie.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">5. Meerwerk</h2>
                <p className="mb-6">5.1 Meerwerk wordt alleen uitgevoerd na akkoord van de opdrachtgever en wordt afzonderlijk gefactureerd.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">6. Betaling</h2>
                <p className="mb-4">6.1 Facturen dienen te worden voldaan binnen 14 dagen na factuurdatum.</p>
                <p className="mb-6">6.2 Bij niet-tijdige betaling is de opdrachtgever van rechtswege in verzuim en is wettelijke rente verschuldigd.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">7. Aansprakelijkheid</h2>
                <p className="mb-4">7.1 Refurbish Totaal Nederland is alleen aansprakelijk voor directe schade die het gevolg is van grove nalatigheid of opzet.</p>
                <p className="mb-4">7.2 Aansprakelijkheid is beperkt tot het factuurbedrag van de betreffende opdracht.</p>
                <p className="mb-6">7.3 Indirecte schade, gevolgschade of gederfde winst wordt uitgesloten.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">8. Garantie</h2>
                <p className="mb-4">8.1 Refurbish Totaal Nederland garandeert deugdelijk werk volgens de geldende normen.</p>
                <p className="mb-6">8.2 Garantie op materialen wordt verleend volgens de voorwaarden van de fabrikant/leverancier.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">9. Overmacht</h2>
                <p className="mb-6">9.1 In geval van overmacht (bijv. extreme weersomstandigheden, leveringsproblemen, ziekte) heeft Refurbish Totaal Nederland het recht om de uitvoering van de overeenkomst op te schorten of te ontbinden.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">10. Beëindiging</h2>
                <p className="mb-6">10.1 Opdrachtgever kan de overeenkomst alleen schriftelijk annuleren. Bij annulering kunnen gemaakte kosten en reeds verrichte werkzaamheden in rekening worden gebracht.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">11. Samenwerking met Onderaannemers en Wet Ketenaansprakelijkheid</h2>
                <p className="mb-4">11.1 Refurbish Totaal Nederland maakt voor de uitvoering van haar werkzaamheden gebruik van vaste partners en/of onderaannemers.</p>
                <p className="mb-4">11.2 In het kader van de Wet ketenaansprakelijkheid (WKa) draagt Refurbish Totaal Nederland zorg voor een correcte afdracht van loonheffingen door de ingeschakelde onderaannemers.</p>
                <p className="mb-4">11.3 Indien en voor zover opdrachtgever onder de WKa medeaansprakelijk kan worden gehouden voor de betaling van loonheffingen, verklaart Refurbish Totaal Nederland dat:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>onderaannemers zorgvuldig worden geselecteerd op betrouwbaarheid en correcte afdracht van belastingen;</li>
                  <li>indien vereist, een deel van het factuurbedrag wordt gestort op een G-rekening van de betreffende onderaannemer;</li>
                  <li>relevante documentatie (zoals verklaringen betalingsgedrag van de Belastingdienst) op verzoek beschikbaar wordt gesteld.</li>
                </ul>
                <p className="mb-4">11.4 Opdrachtgever vrijwaart Refurbish Totaal Nederland voor aanspraken van de Belastingdienst voortvloeiend uit onjuiste of onvolledige informatieverstrekking door opdrachtgever die van invloed is op de toepassing van de WKa.</p>
                <p className="mb-4">11.5 In het geval Refurbish Totaal Nederland gebruik maakt van zelfstandige opdrachtnemers (zzp'ers), wordt gewerkt op basis van een overeenkomst van opdracht. Refurbish Totaal Nederland houdt hierbij rekening met de geldende wet- en regelgeving uit de Wet Deregulering Beoordeling Arbeidsrelaties (Wet DBA).</p>
                <p className="mb-4">11.6 Refurbish Totaal Nederland ziet er op toe dat de arbeidsverhouding met ingehuurde zelfstandigen voldoet aan de criteria voor zelfstandig ondernemerschap. Indien nodig wordt gebruikgemaakt van door de Belastingdienst goedgekeurde modelovereenkomsten.</p>
                <p className="mb-6">11.7 Opdrachtgever vrijwaart Refurbish Totaal Nederland voor eventuele aanspraken die voortvloeien uit een onjuiste kwalificatie van de arbeidsrelatie, voor zover deze niet het gevolg zijn van onzorgvuldig handelen door Refurbish Totaal Nederland.</p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">12. Geschillen en Toepasselijk Recht</h2>
                <p className="mb-4">12.1 Op alle overeenkomsten is uitsluitend Nederlands recht van toepassing.</p>
                <p className="mb-6">12.2 Geschillen worden in eerste instantie in onderling overleg opgelost. Indien dit niet mogelijk blijkt, wordt het geschil voorgelegd aan de bevoegde rechter in het arrondissement van de opdrachtnemer.</p>

                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Datum: 20 April 2025<br />
                    Auteur: Gerard Groeneveld
                  </p>
                </div>

                <div className="text-center mt-8 mb-8">
                  <Button 
                    variant="outline" 
                    className="flex items-center" 
                    onClick={handleDownload}
                  >
                    <Download className="mr-2" />
                    Download Algemene Voorwaarden
                  </Button>
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

export default VoorwaardenPage;
