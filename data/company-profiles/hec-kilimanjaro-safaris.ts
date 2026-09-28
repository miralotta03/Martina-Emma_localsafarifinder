import type { CompanyProfile } from "./types";

// Texterna är avskrivna ordagrant från originalsidan (svenska). Inga bilder än:
// sätt `src` (och `alt`) på respektive ImageRef när bilderna finns, se
// public/companies/README.md.
export const hecKilimanjaroSafarisProfile: CompanyProfile = {
  pageName: "HEC Kilimanjaro Safaris",
  region: { sv: "Moshi, Tanzania" },
  specialityLabel: { sv: "Dela upplevelsen" },
  heroImage: {},
  heroIntro: {
    sv: "För oss handlar resor om mer än att nå toppen av Kilimanjaro eller se The Big Five. Det handlar om människorna du möter, berättelserna du tar med dig hem och känslan av att upptäcka Tanzania tillsammans med dem som känner landet bäst. Scrolla vidare och lär känna vår historia, vårt team och passionen som driver HEC Kilimanjaro Safaris varje dag.",
  },
  history: {
    paragraphs: {
      sv: [
        "HEC Kilimanjaro Safaris började med en enkel idé - att ge resenärer möjlighet att uppleva Tanzania genom människorna som känner landet allra bäst.",
        "Det som började som en gemensam dröm växte fram ur en kärlek till naturen, kulturen och de människor som gör Tanzania så speciellt. Från början har vårt mål varit att skapa mer än bara resor. Vi vill skapa upplevelser där varje gäst känner sig välkommen, sedd och omhändertagen från första stund.",
        "För oss handlar en resa inte bara om att nå toppen av Kilimanjaro eller uppleva The Big Five. Det handlar om möten mellan människor, om att skapa minnen som lever kvar långt efter att resan tagit slut och om att dela vårt hem med dem som vill upptäcka det på riktigt.",
        "Idag drivs HEC med samma värderingar som företaget en gång grundades på, personlig omtanke, lokal kunskap och en genuin passion för att visa Tanzania genom lokala ögon.",
      ],
    },
    image: {},
  },
  quote: {
    sv: '"De bästa resorna handlar inte bara om platserna vi besöker, utan om människorna vi möter och minnena vi tar med oss hem."',
  },
  founder: {
    name: "Emma",
    displayName: { sv: "Emma" },
    paragraphs: {
      sv: [
        "För Emma började resan långt innan HEC Kilimanjaro Safaris grundades.",
        "Hon växte upp i Marangu, vid foten av Kilimanjaro, där berget alltid varit en naturlig del av vardagen. Det som en gång var en barndomsdröm om att själv nå toppen utvecklades med tiden till en passion för att hjälpa andra att uppleva Tanzania på ett personligt och genuint sätt.",
        "Tillsammans med sin man, en erfaren bergsguide, grundade hon HEC Kilimanjaro Safaris 2017. Företaget bygger på deras gemensamma vision om att skapa resor där varje gäst blir bemött med omtanke, lokal kunskap och äkta engagemang.",
        "Efter sin makes bortgång valde Emma att fortsätta det de byggt upp tillsammans. Idag driver hon företaget vidare tillsammans med ett lokalt team som delar samma värderingar – att varje resa ska kännas personlig, trygg och minnesvärd.",
      ],
    },
    image: {},
  },
  team: {
    heading: { sv: "Möt människorna bakom HEC" },
    paragraphs: {
      sv: [
        "HEC är mer än ett företag - vi är ett team som älskar att dela vårt hem med människor från hela världen. Från guider och chaufförer till våra lokala experter arbetar vi tillsammans för att skapa personliga upplevelser där du alltid känner dig välkommen, omhändertagen och i trygga händer.",
      ],
    },
    image: {},
  },
  experiences: {
    heading: { sv: "Äventyr, djurliv och mycket mer" },
    intro: {
      sv: "Upplev Tanzania tillsammans med andra resenärer – från mäktiga berg och storslagna safarier till oförglömliga landskap, alltid med erfarna lokala guider vid din sida.",
    },
    closing: {
      sv: "Dela upplevelsen, möt andra resenärer och upptäck Tanzania tillsammans.",
    },
    items: [
      {
        tag: { sv: "KILIMANJARO" },
        title: { sv: "Bestigning av Kilimanjaro" },
        duration: { sv: "6–9 dagar" },
        priceFromUsd: 2750,
        image: {},
      },
      {
        tag: { sv: "MOUNT MERU" },
        title: { sv: "Vandring på Mount Meru" },
        duration: { sv: "3–4 dagar" },
        priceFromUsd: 1700,
        image: {},
      },
      {
        tag: { sv: "OLDONYO LENGAI" },
        title: { sv: "Vandring på heliga Oldonyo Lengai" },
        duration: { sv: "2–3 dagar" },
        priceFromUsd: 1550,
        image: {},
      },
      {
        tag: { sv: "GREAT MIGRATION" },
        title: { sv: "Lyxsafari under den stora migrationen" },
        duration: { sv: "5–8 dagar" },
        priceFromUsd: 4700,
        image: {},
      },
      {
        tag: { sv: "SÖDRA TANZANIA" },
        title: { sv: "Safari i Tanzanias vildmark" },
        duration: { sv: "4–8 dagar" },
        priceFromUsd: 3900,
        image: {},
      },
      {
        tag: { sv: "SAFARI & ZANZIBAR" },
        title: { sv: "Safari och strandsemester" },
        duration: { sv: "8–12 dagar" },
        priceFromUsd: 5500,
        image: {},
      },
    ],
  },
  gallery: {
    intro: {
      sv: "Varje bild berättar en del av vår historia. Här delar vi ögonblick som fångats av vårt team och våra gäster – från safari och Kilimanjaro till vardagen, människorna och de små stunderna som gör varje resa med HEC personlig och minnesvärd.",
    },
    slots: Array.from({ length: 8 }, () => ({})),
  },
  unique: {
    paragraphs: {
      sv: [
        "Vi tror att de bästa resorna bygger på människor, inte bara destinationer. Med lokal kunskap, personligt engagemang och en genuin kärlek till Tanzania skapar vi upplevelser där varje gäst känner sig välkommen, trygg och som en del av vår HEC-familj.",
      ],
    },
    image: {},
  },
  reviews: {
    intro: {
      sv: "Det finns inget som betyder mer för oss än att våra gäster lämnar Tanzania med minnen för livet. Här delar några av dem med sig av sina upplevelser från resor med HEC.",
    },
    items: [
      {
        rating: 5,
        author: "Noriah R.",
        text: {
          sv: "Vilken fantastisk resa ni tog med oss på! Jag hade inte kunnat önska mig ett bättre team som hjälpte oss hela vägen upp till Uhuru Peak. 😍😍😍 Jag är övertygad om att jag inte hade klarat det utan er. Ert tålamod med oss var helt fantastiskt – verkligen enastående. 🙏🏽 Tack Emma och hela teamet! ❤️ Hälsa alla så gott, och ge ett extra stort hej till Kaka Nesto. 😍😍😍😍 Jag saknar honom så mycket! 🙏🏽",
        },
      },
      {
        rating: 5,
        author: "Karen H.",
        text: {
          sv: "Emma och hennes fantastiska HEC-team är så ödmjuka och otroligt vänliga. 💖 Jag kände mig välkommen från första stund och möttes alltid av ett leende. 😃 Hela vägen upp till toppen av Kilimanjaro kände jag mig trygg, omhändertagen och väl stöttad. Ett särskilt tack till Davis, som tog min hand och hjälpte mig hela vägen till toppen. Utan hans stöd, tålamod och uppmuntran hade jag aldrig klarat det. Alla guider i teamet var fantastiska och spred ständig motivation och positiv energi. Du kan verkligen känna dig trygg med Emma och hennes team – du är i de allra bästa händer. 🙌 Jag skulle göra resan igen utan att tveka, men bara tillsammans med HEC-teamet. Asante sana – tusen tack!❤️",
        },
      },
      {
        rating: 5,
        author: "Helena C.",
        text: {
          sv: "Emma och hennes team var helt fantastiska och hade alltid vårt bästa i fokus. Vi möttes ständigt av varma leenden och en omtanke som märktes i varje liten detalj – från en kopp te på morgonen och varmt tvättvatten till näringsrik mat och erfarna guider som såg till att vi höll ett lugnt och jämnt tempo hela vägen upp. På toppnatten hade vi det bästa tänkbara teamet vid vår sida. Deras stöd, uppmuntran och engagemang gjorde hela skillnaden. Det är svårt att sätta ord på hur tacksam jag är för allt ni gjorde för att hjälpa oss nå toppen av Kilimanjaro. Stort tack till Emma och hela HEC-teamet för en oförglömlig upplevelse!",
        },
      },
    ],
  },
  closing: {
    label: { sv: "GEMENSKAP • OMTANKE • ÄKTHET" },
    text: {
      sv: "...att känna sig välkommen, omhändertagen och som en del av vår familj. Vi vill att varje resa ska präglas av genuina möten, personlig omtanke och minnen som följer med dig långt efter att du lämnat Tanzania.",
    },
    image: {},
  },
  contact: {
    intro: {
      sv: [
        "Oavsett om du drömmer om att bestiga Kilimanjaro, uppleva Tanzanias fantastiska djurliv eller bara vill veta mer om våra resor, hjälper vi dig gärna.",
        "Berätta lite om dina planer i formuläret nedan, så återkommer vi personligen och hjälper dig att ta nästa steg.",
      ],
    },
  },
};
