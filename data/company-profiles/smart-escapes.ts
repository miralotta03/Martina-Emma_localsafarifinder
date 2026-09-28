import type { CompanyProfile } from "./types";

// Texterna är avskrivna ordagrant från originalsidan (svenska), inklusive
// avvikelser som verkar vara fel i originalet (se kommentarer vid upplevelserna).
// Inga bilder än: sätt `src` (och `alt`) på respektive ImageRef när bilderna
// finns, se public/companies/README.md.
export const smartEscapesProfile: CompanyProfile = {
  pageName: "Smart Escapes Limited",
  region: { sv: "Morogoro, Tanzania" },
  specialityLabel: { sv: "Dela upplevelsen" },
  heroImage: {},
  heroIntro: {
    sv: "För oss handlar resor om mer än att se Tanzanias fantastiska djurliv. Det handlar om att upptäcka platser bortom de vanliga turiststråken, möta människorna som kallar landet sitt hem och skapa minnen som lever kvar långt efter att resan är över. Scrolla vidare och lär känna vår historia, vårt team och passionen som driver Smart Escapes varje dag.",
  },
  history: {
    paragraphs: {
      sv: [
        "Smart Escapes grundades med en tydlig vision, att skapa ett lokalt safariföretag som resenärer verkligen kan lita på. Idén föddes när grundaren Patrick hjälpte en nära vän som blivit lurad av en falsk researrangör inför sin drömresa till Tanzania. Patrick såg behovet av ett ärligt, personligt och pålitligt alternativ där gäster kunde känna sig trygga från första kontakten till sista dagen på resan.",
        "Det som började med att hjälpa en vän har idag vuxit till ett företag som hjälper resenärer från hela världen att upptäcka Tanzanias orörda södra safarikrets genom genuina upplevelser, lokal kunskap och ett personligt bemötande.",
      ],
    },
    image: {},
  },
  quote: {
    sv: '"Att resa med oss innebär att uppleva det verkliga Tanzania, vilt, orört och långt bort från de stora turiststråken."',
  },
  founder: {
    name: "Patrick Kawogo",
    displayName: { sv: "Patrick" },
    paragraphs: {
      sv: [
        "Patrick Kawogo grundade Smart Escapes med en passion för att visa upp ett annat Tanzania, ett Tanzania där naturen fortfarande är orörd och där varje resa präglas av personliga möten och genuina upplevelser.",
        "För Patrick är höjdpunkten att möta sina gäster för första gången på flygplatsen, lära känna dem och hjälpa dem skapa minnen för livet.",
      ],
    },
    image: {},
  },
  team: {
    heading: { sv: "Möt människorna bakom Smart Escapes" },
    paragraphs: {
      sv: [
        "Bakom varje resa finns ett engagerat team av lokala guider och reseexperter som delar samma passion för Tanzania och dess fantastiska natur. Tillsammans arbetar vi för att skapa trygga, personliga och minnesvärda upplevelser där varje gäst känner sig välkommen från första stund.",
      ],
    },
    image: {},
  },
  experiences: {
    heading: { sv: "Safari, vildmark och Zanzibar" },
    intro: {
      sv: "Upptäck Tanzanias södra krets tillsammans med andra resenärer – från orörda nationalparker och storslagen vildmark till vita stränder och Swahilikultur på Zanzibar.",
    },
    closing: {
      sv: "Dela upplevelsen, möt andra resenärer och upptäck Tanzanias vildare sida tillsammans.",
    },
    items: [
      {
        tag: { sv: "BUSH TO BEACH" },
        title: { sv: "Bush to Beach Adventure" },
        description: { sv: "Från Mikumis vildmark till Zanzibars stränder." },
        duration: { sv: "7 dagar · 6 nätter" },
        image: {},
      },
      {
        tag: { sv: "SOUTHERN CIRCUIT" },
        title: { sv: "Southern Circuit Escapes" },
        description: {
          sv: "Utforska orörd natur och Tanzanias unika ekosystem.",
        },
        duration: { sv: "8 dagar · 7 nätter" },
        image: {},
      },
      {
        tag: { sv: "MIKUMI, UDZUNGWA & NYERERE" },
        // Originalet verkar sakna titel här och beskrivningen börjar med liten
        // bokstav. Lämnas som i originalet tills kunden bekräftar.
        title: { sv: "" },
        description: {
          sv: "vilda djur, grönskande skogar och levande landskap.",
        },
        duration: { sv: "6 dagar · 5 nätter" },
        image: {},
      },
      {
        tag: { sv: "RUAHA" },
        title: { sv: "The Best of Ruaha" },
        description: {
          sv: "Upplev Afrikas vilda och autentiska sida i en av Tanzanias mest orörda parker.",
        },
        duration: { sv: "3 dagar · 2 nätter" },
        image: {},
      },
      {
        tag: { sv: "MIKUMI" },
        title: { sv: "Mikumi NP Escapes" },
        description: {
          sv: "En oförglömlig safariupplevelse i hjärtat av södra Tanzania.",
        },
        duration: { sv: "3 dagar · 2 nätter" },
        image: {},
      },
      {
        // Taggen är samma som på den första upplevelsen i originalet, och
        // beskrivningen börjar med liten bokstav. Lämnas som i originalet.
        tag: { sv: "BUSH TO BEACH" },
        title: { sv: "Luxury Escapes" },
        description: {
          sv: "vildmark i Mikumi och Ruaha kombinerat med avkoppling på Zanzibars stränder.",
        },
        duration: { sv: "12 dagar · 11 nätter" },
        image: {},
      },
    ],
  },
  gallery: {
    intro: {
      sv: "Varje bild berättar en del av vår historia. Här delar vi ögonblick som fångats av vårt team och våra gäster, från safariäventyr och möten med människor till den storslagna natur som gör Tanzanias södra safarikrets så unik.",
    },
    slots: Array.from({ length: 8 }, () => ({})),
  },
  unique: {
    paragraphs: {
      sv: [
        "Vi kombinerar lokal kunskap, personlig service och skräddarsydda resor för att ge dig en upplevelse utöver det vanliga. Hos oss får du upptäcka ett Tanzania som fortfarande är vilt, genuint och långt ifrån de mest besökta turistområdena.",
        "Smart Escapes är ett 100 % tanzaniskt företag som tror på att turismen ska gynna de människor och samhällen som gör upplevelserna möjliga. Genom att anlita lokala guider, samarbeta med lokala företag och stötta samhällsinitiativ bidrar vi till en mer hållbar framtid för både människor och destinationer.",
      ],
    },
    image: {},
  },
  reviews: {
    intro: {
      sv: "Det finns inget som betyder mer för oss än att våra gäster lämnar Tanzania med minnen för livet. Här delar några av dem med sig av sina upplevelser från sina resor med Smart Escapes.",
    },
    items: [
      {
        rating: 5,
        author: "Isack W",
        text: {
          sv: "Min upplevelse med Smart Escapes var verkligen fantastisk! Teamet arrangerade välplanerade äventyr som var både roliga, minnesvärda och fyllda med fantastiska upplevelser. Från den första kontakten inför resan till själva äventyret sköttes allt på ett professionellt och personligt sätt. Resorna till Choma Waterfalls och Pugu Kazimzumbwi bjöd på en perfekt kombination av natur, äventyr, upptäckarglädje och trevligt sällskap. Aktiviteterna, guiderna och den genomtänkta planeringen visade verkligen på deras engagemang och passion för att skapa unika reseupplevelser. Smart Escapes handlar inte bara om att besöka nya platser, det handlar om att skapa oförglömliga minnen och hjälpa människor att upptäcka Tanzanias fantastiska skönhet på ett genuint och personligt sätt. Jag rekommenderar varmt Smart Escapes till alla som söker trygga, spännande och välorganiserade äventyr. Jag ser redan fram emot att följa med på fler resor i framtiden!",
        },
      },
      {
        rating: 5,
        author: "Jacqueline B",
        text: {
          sv: "Vi tillbringade julen på Zanzibar mellan den 24 och 26 december 2025, och det var den perfekta kombinationen av avkoppling, kultur och äventyr. 🥰 Stone Town var fantastiskt vackert under julhelgen, betydligt lugnare än det förmodligen är vid nyår, men ändå fullt av liv. Att promenera genom de smala gränderna med julstämningen i luften och doften av kryddor omkring oss var en upplevelse vi sent kommer att glömma. Vi gjorde också en dagsutflykt till Nungwi och Paje. De vita sandstränderna och det turkosa havet var helt magiska. Maten på Zanzibar gjorde oss inte besvikna, skaldjur, pilau-ris, urojo-soppa, chapati och färsk sockerrörsjuice var en riktig fullträff! Servicen var dessutom fantastisk, särskilt med tanke på att vi reste under julhelgen. Teamet var vänligt, tålmodigt och såg verkligen till att vi fick en fin upplevelse. Tre dagar kändes alldeles för kort, och vi ser redan fram emot att boka vår nästa resa med Smart Escapes inför nästa semester! 🥰💕",
        },
      },
      {
        rating: 5,
        author: "Rashid G",
        text: {
          sv: "Fantastisk service och ett genuint engagemang genom hela resan. Guiden var mycket kunnig och svarade snabbt på alla frågor, vilket gjorde att vi alltid kände oss trygga och väl omhändertagna. Vi fick se många olika djur och uppleva en oförglömlig safari. Jag kan varmt rekommendera Smart Escapes till alla som söker en välorganiserad och minnesvärd upplevelse.",
        },
      },
    ],
  },
  closing: {
    label: { sv: "PRISVÄRT • PERSONLIGT • ÄVENTYRLIGT" },
    text: {
      sv: "...att uppleva det verkliga Tanzania, orört, genuint och fullt av oförglömliga äventyr.",
    },
    image: {},
  },
  contact: {
    intro: {
      sv: [
        "Oavsett om du drömmer om en safari i Tanzanias orörda södra safarikrets, en avkopplande vistelse på Zanzibar eller en skräddarsydd rundresa, hjälper vi dig gärna att planera ditt nästa äventyr.",
        "Berätta lite om dina planer i formuläret nedan, så återkommer vi personligen och hjälper dig att ta nästa steg.",
      ],
    },
  },
};
