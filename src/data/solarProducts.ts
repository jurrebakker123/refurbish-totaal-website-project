

export interface SolarProduct {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  price: string;
  imageUrl: string;
  additionalImages?: string[];
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  warranty: string;
  delivery: string;
  installation: string;
  roofType?: string; // Added optional roofType property
}

export const solarProducts: SolarProduct[] = [
  {
    id: 1,
    slug: "complete-installatie-10-zonnepanelen-4kw",
    title: "Complete installatie - 10 Zonnepanelen - 4kW",
    shortDescription: "Complete zonnepaneelinstallatie met 10 panelen, 4kW vermogen, inclusief montage.",
    fullDescription: [
      "Wilt u uw eigen stroom gaan produceren, maar weet u niet welke panelen en omvormer het meest geschikt zijn voor uw situatie? Wij helpen u graag bij het maken van de juiste keuze voor uw woning.",
      "Wij verzorgen de volledige installatie van uw zonnepanelen, van het opstellen van een advies tot en met de montage en aansluiting van het complete systeem.",
      "Deze installatieset met 10 zonnepanelen is ideaal voor huishoudens met een gemiddeld elektriciteitsverbruik en biedt een uitstekende balans tussen investering en opbrengst."
    ],
    price: "€ 1.445,00",
    imageUrl: "public/lovable-uploads/65376561-53c2-4dd6-bec2-df8e66a4be99.png",
    additionalImages: [
      "public/lovable-uploads/eaa01620-492a-4794-b2c6-ad2b92dc3603.png",
      "public/lovable-uploads/b080c873-1f58-400e-8855-b4cc787a6859.png",
      "public/lovable-uploads/fb97d4bf-a1e7-428b-bd5b-37fc1b54729b.png"
    ],
    features: [
      "10x zonnepanelen",
      "4kW totaal vermogen",
      "Inclusief omvormer en montagesysteem",
      "Complete installatie"
    ],
    specifications: [
      { label: "Aantal panelen", value: "10 stuks" },
      { label: "Type panelen", value: "Refurbished A-merk" },
      { label: "Vermogen per paneel", value: "400 Wp" },
      { label: "Totaal vermogen", value: "4 kWp" },
      { label: "Omvormer", value: "SMA / Growatt / Goodwe" },
      { label: "Montagesysteem", value: "Esdec ClickFit EVO" }
    ],
    warranty: "12 jaar op de panelen, 10 jaar op de omvormer, 5 jaar installatiegarantie",
    delivery: "Binnen 2-3 weken na goedkeuring offerte",
    installation: "Inclusief complete installatie door gecertificeerde monteurs"
  },
  {
    id: 2,
    slug: "complete-oost-west-installatie-10-zonnepanelen",
    title: "Complete installatie - 10 zonnepanelen - Oost/West - 4kW",
    shortDescription: "Speciaal ontworpen installatie voor daken met een oost-west oriëntatie.",
    fullDescription: [
      "Heeft uw dak een oost-west oriëntatie? Dan is deze speciale installatie perfect voor u. Door de panelen optimaal te verdelen over beide dakvlakken, kunt u gedurende een langere periode van de dag stroom opwekken.",
      "Deze installatie is speciaal ontworpen om het maximale rendement te halen uit daken die niet op het zuiden liggen. Met 10 zonnepanelen verdeeld over de oost- en westzijde van uw dak krijgt u een optimale energieopbrengst gedurende de hele dag.",
      "Wij verzorgen het volledige traject, van advies tot en met de installatie, afgestemd op uw specifieke daksituatie."
    ],
    price: "€ 1.045,00",
    imageUrl: "public/lovable-uploads/65376561-53c2-4dd6-bec2-df8e66a4be99.png",
    additionalImages: [
      "public/lovable-uploads/10e4891f-b115-4650-9c85-6f78b1e53888.png",
      "public/lovable-uploads/8745f4c4-960d-4da5-b5f5-59564c7cdd33.png",
      "public/lovable-uploads/5da5d680-5b13-440b-9aae-20e52a50a501.png",
      "public/lovable-uploads/ab4fe583-5611-4401-93c9-7fb7d38fd340.png",
      "public/lovable-uploads/dc6d5fa1-8797-4d60-9de0-5493bc6fe9b3.png"
    ],
    features: [
      "10x zonnepanelen geoptimaliseerd voor Oost/West oriëntatie",
      "4kW totaal vermogen",
      "Inclusief omvormer en montagesysteem",
      "Complete installatie"
    ],
    specifications: [
      { label: "Aantal panelen", value: "10 stuks" },
      { label: "Type panelen", value: "Refurbished A-merk" },
      { label: "Verdeling", value: "5 panelen oost, 5 panelen west (aanpasbaar)" },
      { label: "Vermogen per paneel", value: "400 Wp" },
      { label: "Totaal vermogen", value: "4 kWp" },
      { label: "Omvormer", value: "SMA / Growatt / Goodwe met twee MPP-trackers" },
      { label: "Montagesysteem", value: "Esdec ClickFit EVO" }
    ],
    warranty: "12 jaar op de panelen, 10 jaar op de omvormer, 5 jaar installatiegarantie",
    delivery: "Binnen 2-3 weken na goedkeuring offerte",
    installation: "Inclusief complete installatie door gecertificeerde monteurs"
  },
  {
    id: 3,
    slug: "complete-installatie-38-zonnepanelen-15kw-platdak",
    title: "Complete installatie - 38 Zonnepanelen - 15kW - Platdak",
    shortDescription: "Krachtige installatie voor platdak situaties met hoge energieproductie.",
    fullDescription: [
      "Deze installatie is speciaal ontworpen voor grotere platte daken, zoals op bedrijfsgebouwen of grotere woningen. Met 38 zonnepanelen en een totaal vermogen van 15kW is dit een krachtige oplossing voor situaties met een hoog energieverbruik.",
      "Het speciale montagesysteem voor platte daken zorgt ervoor dat de panelen onder de optimale hoek geplaatst worden, zonder het dak te beschadigen. Hiermee haalt u het maximale rendement uit uw zonne-installatie.",
      "Ideaal voor bedrijven of grote huishoudens die hun energiekosten drastisch willen verlagen en willen bijdragen aan een duurzamere toekomst."
    ],
    price: "€ 3.715,00",
    imageUrl: "public/lovable-uploads/65376561-53c2-4dd6-bec2-df8e66a4be99.png",
    features: [
      "38x zonnepanelen",
      "15kW totaal vermogen",
      "Speciaal voor platdak montage",
      "Inclusief omvormer en montagesysteem",
      "Complete installatie"
    ],
    specifications: [
      { label: "Aantal panelen", value: "38 stuks" },
      { label: "Type panelen", value: "Refurbished A-merk" },
      { label: "Vermogen per paneel", value: "395 Wp" },
      { label: "Totaal vermogen", value: "15 kWp" },
      { label: "Omvormer", value: "SMA / Huawei / Growatt" },
      { label: "Montagesysteem", value: "Flatfix ballastsysteem" },
      { label: "Daktype", value: "Geschikt voor platte daken" }
    ],
    warranty: "12 jaar op de panelen, 10 jaar op de omvormer, 5 jaar installatiegarantie",
    delivery: "Binnen 3-4 weken na goedkeuring offerte",
    installation: "Inclusief complete installatie door gecertificeerde monteurs"
  },
  {
    id: 4,
    slug: "complete-installatie-5-zonnepanelen-2kw",
    title: "Complete installatie - 5 zonnepanelen - 2kW",
    shortDescription: "Compacte installatie, ideaal voor kleinere daken en huishoudens.",
    fullDescription: [
      "Deze compacte installatie met 5 zonnepanelen is perfect voor kleinere huishoudens of woningen met beperkte dakruimte. Ondanks het bescheiden formaat levert deze installatie toch een significante bijdrage aan het verlagen van uw energierekening.",
      "Met een totaal vermogen van 2kW is deze set ideaal voor huishoudens met een lager energieverbruik of als aanvulling op een bestaand energiesysteem.",
      "Wij zorgen voor een snelle en professionele installatie, afgestemd op uw specifieke daksituatie, voor een optimale energieopbrengst."
    ],
    price: "€ 525,00",
    imageUrl: "public/lovable-uploads/65376561-53c2-4dd6-bec2-df8e66a4be99.png",
    features: [
      "5x zonnepanelen",
      "2kW totaal vermogen",
      "Inclusief omvormer en montagesysteem",
      "Ideaal voor kleinere daken",
      "Complete installatie"
    ],
    specifications: [
      { label: "Aantal panelen", value: "5 stuks" },
      { label: "Type panelen", value: "Refurbished A-merk" },
      { label: "Vermogen per paneel", value: "400 Wp" },
      { label: "Totaal vermogen", value: "2 kWp" },
      { label: "Omvormer", value: "SMA / Growatt / Goodwe" },
      { label: "Montagesysteem", value: "Esdec ClickFit EVO" }
    ],
    warranty: "12 jaar op de panelen, 10 jaar op de omvormer, 5 jaar installatiegarantie",
    delivery: "Binnen 1-2 weken na goedkeuring offerte",
    installation: "Inclusief complete installatie door gecertificeerde monteurs"
  },
  {
    id: 5,
    slug: "complete-installatie-8-zonnepanelen",
    title: "Complete installatie - 8 Zonnepanelen",
    shortDescription: "Optimale installatie voor middelgrote huishoudens met gemiddeld energieverbruik.",
    fullDescription: [
      "Deze installatie met 8 zonnepanelen is een populaire keuze voor middelgrote huishoudens. De set biedt een goede balans tussen aanschafkosten en opbrengst.",
      "Wij adviseren u graag over de juiste opstelling op uw dak, zodat u het maximale rendement uit uw zonnepanelen kunt halen. Onze ervaren installateurs zorgen voor een vakkundige montage en aansluiting.",
      "Deze installatie is geschikt voor verschillende daktypen en kan worden aangepast aan uw specifieke situatie en wensen."
    ],
    price: "Op aanvraag",
    imageUrl: "public/lovable-uploads/65376561-53c2-4dd6-bec2-df8e66a4be99.png",
    features: [
      "8x zonnepanelen",
      "Inclusief omvormer en montagesysteem",
      "Complete installatie",
      "Prijs op aanvraag"
    ],
    specifications: [
      { label: "Aantal panelen", value: "8 stuks" },
      { label: "Type panelen", value: "Refurbished A-merk" },
      { label: "Vermogen per paneel", value: "395-410 Wp" },
      { label: "Totaal vermogen", value: "3.2 kWp" },
      { label: "Omvormer", value: "SMA / Growatt / Goodwe" },
      { label: "Montagesysteem", value: "Esdec ClickFit EVO" }
    ],
    warranty: "12 jaar op de panelen, 10 jaar op de omvormer, 5 jaar installatiegarantie",
    delivery: "Binnen 2-3 weken na goedkeuring offerte",
    installation: "Inclusief complete installatie door gecertificeerde monteurs"
  },
  {
    id: 6,
    slug: "complete-installatie-48-zonnepanelen",
    title: "Complete installatie - 48 Zonnepanelen",
    shortDescription: "Grootschalige installatie voor bedrijven en grote woningen met hoog energieverbruik.",
    fullDescription: [
      "Deze grootschalige installatie met 48 zonnepanelen is ideaal voor grote daken van bedrijfspanden of grote woningen. Met deze installatie kunt u een substantieel deel van uw energiebehoefte dekken en uw energiekosten drastisch verlagen.",
      "Onze specialisten maken een gedetailleerd ontwerp voor uw dak, rekening houdend met factoren zoals schaduwvorming en optimale oriëntatie, om het maximale rendement te behalen.",
      "Naast de financiële voordelen draagt deze installatie bij aan een aanzienlijke CO2-reductie en helpt u uw bedrijf te verduurzamen."
    ],
    price: "Op aanvraag",
    imageUrl: "public/lovable-uploads/65376561-53c2-4dd6-bec2-df8e66a4be99.png",
    features: [
      "48x zonnepanelen",
      "Geschikt voor grote daken",
      "Inclusief omvormer en montagesysteem",
      "Complete installatie",
      "Prijs op aanvraag"
    ],
    specifications: [
      { label: "Aantal panelen", value: "48 stuks" },
      { label: "Type panelen", value: "Refurbished A-merk" },
      { label: "Vermogen per paneel", value: "400 Wp" },
      { label: "Totaal vermogen", value: "19.2 kWp" },
      { label: "Omvormer", value: "SMA / Huawei / Growatt" },
      { label: "Montagesysteem", value: "Aangepast aan daktype" },
      { label: "Extra's", value: "Monitoring systeem inbegrepen" }
    ],
    warranty: "12 jaar op de panelen, 10 jaar op de omvormer, 5 jaar installatiegarantie",
    delivery: "In overleg na sitescan en offerte",
    installation: "Inclusief professionele installatie en inbedrijfstelling"
  }
];

export const getProductBySlug = (slug: string): SolarProduct | undefined => {
  return solarProducts.find(product => product.slug === slug);
};

export const getProductById = (id: number): SolarProduct | undefined => {
  return solarProducts.find(product => product.id === id);
};

