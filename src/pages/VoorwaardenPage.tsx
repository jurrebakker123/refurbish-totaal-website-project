
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const VoorwaardenPage = () => {
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
                Laatste update: 14 april 2025
              </p>
            </div>
          </div>
        </section>

        {/* Voorwaarden Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">1. Algemeen</h2>
                <p className="mb-6">
                  Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, werkzaamheden, offertes en overeenkomsten tussen Refurbish Totaal Nederland, hierna te noemen: "Opdrachtnemer", en opdrachtgevers, hierna te noemen: "Opdrachtgever", respectievelijk hun rechtsopvolgers.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">2. Offertes</h2>
                <p className="mb-6">
                  Alle offertes van Opdrachtnemer zijn vrijblijvend, tenzij uitdrukkelijk anders is vermeld. De offertes zijn geldig gedurende 30 dagen, tenzij anders aangegeven. Opdrachtnemer is slechts aan de offertes gebonden indien de aanvaarding hiervan door de Opdrachtgever schriftelijk binnen 30 dagen wordt bevestigd.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">3. Uitvoering van de overeenkomst</h2>
                <p className="mb-6">
                  3.1 Opdrachtnemer zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van goed vakmanschap uitvoeren.<br/><br/>
                  3.2 Indien en voor zover een goede uitvoering van de overeenkomst dit vereist, heeft Opdrachtnemer het recht bepaalde werkzaamheden te laten verrichten door derden.<br/><br/>
                  3.3 De Opdrachtgever draagt er zorg voor dat alle gegevens, waarvan Opdrachtnemer aangeeft dat deze noodzakelijk zijn of waarvan de Opdrachtgever redelijkerwijs behoort te begrijpen dat deze noodzakelijk zijn voor het uitvoeren van de overeenkomst, tijdig aan Opdrachtnemer worden verstrekt. Indien de voor de uitvoering van de overeenkomst benodigde gegevens niet tijdig aan Opdrachtnemer zijn verstrekt, heeft Opdrachtnemer het recht de uitvoering van de overeenkomst op te schorten.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">4. Contractsduur en uitvoeringstermijn</h2>
                <p className="mb-6">
                  4.1 De overeenkomst tussen Opdrachtnemer en een Opdrachtgever wordt aangegaan voor bepaalde tijd, tenzij uit de aard van de overeenkomst anders voortvloeit of partijen uitdrukkelijk en schriftelijk anders overeenkomen.<br/><br/>
                  4.2 Is binnen de looptijd van de overeenkomst voor de voltooiing van bepaalde werkzaamheden een termijn overeengekomen, dan is dit nimmer een fatale termijn. Bij overschrijding van de uitvoeringstermijn dient de Opdrachtgever Opdrachtnemer derhalve schriftelijk in gebreke te stellen.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">5. Prijzen en betaling</h2>
                <p className="mb-6">
                  5.1 Alle prijzen zijn exclusief BTW, tenzij uitdrukkelijk anders is vermeld.<br/><br/>
                  5.2 Betaling dient te geschieden binnen 14 dagen na factuurdatum, op een door Opdrachtnemer aan te geven wijze in de valuta waarin is gedeclareerd. Bezwaren tegen de hoogte van de declaraties schorten de betalingsverplichting niet op.<br/><br/>
                  5.3 Indien Opdrachtgever in gebreke blijft in de betaling binnen de termijn van 14 dagen dan is de Opdrachtgever van rechtswege in verzuim. Opdrachtgever is alsdan een rente verschuldigd van 1% per maand, tenzij de wettelijke rente hoger is in welk geval de wettelijke rente geldt. De rente over het opeisbaar bedrag zal worden berekend vanaf het moment dat Opdrachtgever in verzuim is tot het moment van voldoening van het volledige bedrag.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">6. Garantie</h2>
                <p className="mb-6">
                  6.1 Opdrachtnemer garandeert dat de te leveren zaken voldoen aan de gebruikelijke eisen en normen die daaraan kunnen worden gesteld.<br/><br/>
                  6.2 De garantietermijn is afhankelijk van het soort werkzaamheden en materialen en wordt vooraf in de offerte vermeld.<br/><br/>
                  6.3 De garantie vervalt indien:<br/>
                  - De Opdrachtgever de geleverde zaken zelf heeft gerepareerd en/of bewerkt of door derden heeft laten repareren en/of bewerken.<br/>
                  - De geleverde zaken aan abnormale omstandigheden zijn blootgesteld of anderszins onzorgvuldig worden behandeld.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">7. Aansprakelijkheid</h2>
                <p className="mb-6">
                  7.1 Indien Opdrachtnemer aansprakelijk mocht zijn, dan is deze aansprakelijkheid beperkt tot hetgeen in deze bepaling is geregeld.<br/><br/>
                  7.2 Opdrachtnemer is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat Opdrachtnemer is uitgegaan van door of namens de Opdrachtgever verstrekte onjuiste en/of onvolledige gegevens.<br/><br/>
                  7.3 Opdrachtnemer is uitsluitend aansprakelijk voor directe schade. Onder directe schade wordt uitsluitend verstaan de redelijke kosten ter vaststelling van de oorzaak en de omvang van de schade, de eventuele redelijke kosten gemaakt om de gebrekkige prestatie van Opdrachtnemer aan de overeenkomst te laten beantwoorden en redelijke kosten, gemaakt ter voorkoming of beperking van schade.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">8. Opschorting en ontbinding</h2>
                <p className="mb-6">
                  8.1 Opdrachtnemer is bevoegd de nakoming van de verplichtingen op te schorten of de overeenkomst te ontbinden, indien:<br/>
                  - Opdrachtgever de verplichtingen uit de overeenkomst niet of niet volledig nakomt.<br/>
                  - Na het sluiten van de overeenkomst Opdrachtnemer ter kennis gekomen omstandigheden goede grond geven te vrezen dat de Opdrachtgever de verplichtingen niet zal nakomen.<br/><br/>
                  8.2 Voorts is Opdrachtnemer bevoegd de overeenkomst te (doen) ontbinden indien zich omstandigheden voordoen welke van dien aard zijn dat nakoming van de overeenkomst onmogelijk of naar maatstaven van redelijkheid en billijkheid niet langer kan worden gevergd.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">9. Overmacht</h2>
                <p className="mb-6">
                  9.1 Opdrachtnemer is niet gehouden tot het nakomen van enige verplichting, indien hij daartoe gehinderd wordt als gevolg van een omstandigheid die niet is te wijten aan schuld, en noch krachtens de wet, een rechtshandeling of in het verkeer geldende opvattingen voor zijn rekening komt.<br/><br/>
                  9.2 Onder overmacht wordt in deze algemene voorwaarden verstaan naast hetgeen daaromtrent in de wet en jurisprudentie wordt begrepen, alle van buiten komende oorzaken, voorzien of niet-voorzien, waarop Opdrachtnemer geen invloed kan uitoefenen, doch waardoor Opdrachtnemer niet in staat is de verplichtingen na te komen.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">10. Geschillen en toepasselijk recht</h2>
                <p className="mb-6">
                  10.1 De rechter in de vestigingsplaats van Opdrachtnemer is bij uitsluiting bevoegd van geschillen kennis te nemen, tenzij de wet dwingend anders voorschrijft.<br/><br/>
                  10.2 Op alle rechtsbetrekkingen waarbij Opdrachtnemer partij is, is uitsluitend het Nederlands recht van toepassing.
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

export default VoorwaardenPage;
