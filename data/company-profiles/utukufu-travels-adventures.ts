import type { CompanyProfile } from "./types";

// Texterna kommer från företagets ansökan (svenska), inklistrade ordagrant.
// Texter märkta TODO är utkast som ska godkännas av kunden. Bilderna ligger i
// public/companies/utukufu-travels-adventures/. Upplevelsekorten saknar
// bilder, dagar och pris (se TODO vid upplevelserna).
const dir = "/companies/utukufu-travels-adventures";

export const utukufuTravelsAdventuresProfile: CompanyProfile = {
  pageName: "Utukufu Travels & Adventures",
  region: { sv: "Arusha, Tanzania" },
  specialityLabel: { sv: "Med Barn" },
  heroImage: {
    src: `${dir}/hero/hero.JPG`,
    alt: {
      sv: "En safaribil bland gnuer på den gröna savannen",
    },
  },
  heroIntro: {
    sv: "För oss handlar resor om mer än att se Tanzanias vilda djurliv. Det handlar om skräddarsydda safarier, Kilimanjaro-vandringar, kulturella möten och strandsemestrar på Zanzibar, byggda kring lokal kunskap, personlig uppmärksamhet och ärliga råd. Scrolla vidare och lär känna vår historia, vårt team och passionen som driver Utukufu Travels & Adventures varje dag.",
  },
  history: {
    paragraphs: {
      sv: [
        "Utukufu Travels & Adventures föddes ur en enkel idé: att skapa meningsfulla Tanzaniaresor byggda på verklig lokal kunskap, personlig uppmärksamhet och ärliga råd. Företaget grundades av Exaudy Samuel, en tanzanisk safariprofessionell med en stark koppling till platserna, människorna, djurlivet och samhällena som gör Tanzania speciellt.",
        "Vi är ett tanzaniskt ägt företag baserat i Arusha, porten till några av Afrikas mest kända safaridestinationer. Vi specialiserar oss på skräddarsydda safarier, djurlivsupplevelser, Kilimanjaro-vandringar, kulturella upplevelser och semestrar på Zanzibar, med resrutter utformade kring varje resenär snarare än ett fast paket.",
        "Det som gör våra resor annorlunda är hur vi planerar dem. Vi tar oss tid att lyssna på vad du vill ha ut av din resa och kombinerar dina intressen med vår lokala kunskap. Utukufu betyder 'Ära' på swahili, det representerar vår koppling till Tanzania och stoltheten i att dela vårt hem med människor från hela världen.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/hur-allt-borjade.JPG`,
      alt: {
        sv: "Resenärer och guider blickar ut över en sjö från en utsiktsplats",
      },
    },
  },
  quote: {
    sv: '"Att resa med oss innebär att ha ett lokalt team som lyssnar på dig, ger ärliga råd och tar hand om detaljerna från första samtalet till resans slut."',
  },
  founder: {
    name: "Exaudy",
    // Rubriken blir "Möt Exaudy".
    displayName: { sv: "Exaudy" },
    paragraphs: {
      sv: [
        "Utukufu Travels & Adventures grundades av Exaudy Samuel, en tanzanisk safariprofessionell med djup lokal kunskap om Tanzanias parker, rutter, säsonger och boenden.",
        "Exaudy tror på ärlig rådgivning och personlig planering, där varje resrutt anpassas efter resenärens intressen, tempo och förväntningar snarare än att följa ett standardpaket.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/mot-exaudy.JPG`,
      alt: { sv: "Exaudy Samuel sitter på en safaribil" },
    },
  },
  team: {
    heading: { sv: "Möt människorna bakom Utukufu Travels & Adventures" },
    paragraphs: {
      sv: [
        "Bakom varje resa med Utukufu Travels & Adventures finns ett team med djup lokal kunskap om Tanzanias parker, kultur och djurliv. Tillsammans arbetar de för att skapa resor där varje detalj, från flygplatstransfer till boende och tempo, är genomtänkt.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/mot-manniskorna-bakom-utukufu.jpg`,
      alt: { sv: "Utukufus team framför en safaribil" },
    },
  },
  experiences: {
    // TODO: utkast, ska godkännas av kunden. Sektionen visas inte för
    // tillfället (se components/company/CompanyPage.tsx).
    heading: { sv: "Safari, Kilimanjaro och Zanzibar" },
    intro: {
      sv: "Resrutter utformade kring varje resenär, där antal dagar, destinationer, boende och tempo anpassas efter dina planer.",
    },
    closing: {
      sv: "Berätta vad du drömmer om, så hjälper vi dig att hitta rätt resa.",
    },
    // Riktiga paket från underlaget. Dagar och pris är inte angivna än.
    items: [
      {
        title: { sv: "Classic Tanzania Safari" },
        description: {
          sv: "Tarangire, Ngorongorokratern och Serengeti för en första safariupplevelse.",
        },
        image: {},
      },
      {
        title: { sv: "Great Migration Safari" },
        description: {
          sv: "Följ den årliga gnuvandringen i Serengeti, inklusive kalvningssäsong och flodkorsningarna i norra Serengeti.",
        },
        image: {},
      },
      {
        title: { sv: "Big Five Safari" },
        description: {
          sv: "Fokus på att se lejon, elefant, buffel, leopard och noshörning i Tanzanias ledande djurparker.",
        },
        image: {},
      },
      {
        title: { sv: "Family Safari" },
        description: {
          sv: "Flexibla privata safarier anpassade för familjer, med lämpligt boende, aktiviteter och körtider.",
        },
        image: {},
      },
      {
        title: { sv: "Safari & Zanzibar Holiday" },
        description: {
          sv: "Kombinera en Tanzaniasafari med tid på Zanzibars stränder.",
        },
        image: {},
      },
      {
        title: { sv: "Kilimanjaro & Safari Combination" },
        description: {
          sv: "Bestig Kilimanjaro och följ upp med en djurlivssafari.",
        },
        image: {},
      },
    ],
  },
  gallery: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: "Varje bild berättar en del av vår historia. Här delar vi ögonblick från våra resor, från safarier och Kilimanjaro till kulturella möten och Zanzibars stränder.",
    },
    slots: [
      {
        src: `${dir}/rullande-bilder/1.JPG`,
        alt: { sv: "En guide tillsammans med två resenärer på savannen" },
      },
      {
        src: `${dir}/rullande-bilder/2.JPG`,
        alt: { sv: "Elefanter går förbi safaribilar längs en grusväg" },
      },
      {
        src: `${dir}/rullande-bilder/3.JPG`,
        alt: { sv: "Resenärer äter lunch vid ett dukat bord på savannen" },
      },
      {
        src: `${dir}/rullande-bilder/4.JPG`,
        alt: { sv: "En safaribil bland gnuer på den gröna savannen" },
      },
      {
        src: `${dir}/rullande-bilder/5.JPG`,
        alt: { sv: "Resenärer i röda massajtyg besöker en massajby" },
      },
      {
        src: `${dir}/rullande-bilder/6.JPG`,
        alt: {
          sv: "En grupp resenärer framför safaribilar under blommande buskar",
        },
      },
      {
        src: `${dir}/rullande-bilder/7.JPG`,
        alt: {
          sv: "Resenärer och guider vid ett picknickbord, en spanar med kikare",
        },
      },
      {
        src: `${dir}/rullande-bilder/8.jpg`,
        alt: { sv: "Fem guider i Utukufus uniformer framför en safaribil" },
      },
    ],
  },
  unique: {
    paragraphs: {
      sv: [
        "Vi tror inte att alla resenärer ska följa samma resrutt. Vi kan anpassa antal dagar, destinationer, boende, aktiviteter och tempo efter dina planer. Du kommunicerar direkt med vårt team, och vi berättar ärligt vad vi rekommenderar, även när det innebär att något inte är värt den extra kostnaden.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/en-resa-skapad-med-omtanke.jpg`,
      alt: { sv: "Resenärer vinkar från safaribilens tak bland akaciaträd" },
    },
  },
  reviews: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: "Det finns inget som betyder mer för oss än att våra gäster lämnar Tanzania med minnen för livet. Här delar några av dem med sig av sina upplevelser från sina resor med Utukufu Travels & Adventures.",
    },
    items: [
      {
        rating: 5,
        author: "Emily Hirst",
        text: {
          sv: "Vi hade en fantastisk upplevelse när vi bokade vår Tanzaniaresa med Exaudy. Från första stund var allt organiserat smidigt och enkelt, vilket gjorde vår semester helt stressfri. Trots att vårt flyg till Kilimanjaro var kraftigt försenat väntade Exaudy ändå på oss med ett varmt leende.",
        },
      },
      {
        rating: 5,
        author: "Anja",
        text: {
          sv: "Vi berättade vad vi önskade och de hittade en lösning, mycket lätt att samarbeta med. Väl planerad resa, massor av kunskap om djurlivet, god mat och mycket välkomnande.",
        },
      },
      {
        rating: 5,
        author: "Steven Shaw",
        text: {
          sv: "Utmärkt researrangör, kommer definitivt boka med dem igen. Guiderna var fantastiska på att lära oss om historien, kulturen och djurlivet, och ett nöje att tillbringa tid med även utanför safaritiderna.",
        },
      },
    ],
  },
  closing: {
    label: { sv: "LOKALT • PERSONLIGT • ÄRLIGT" },
    text: {
      sv: "...att ha ett lokalt team som lyssnar, ger ärliga råd och tar hand om detaljerna, från första samtalet till resans slut.",
    },
    image: {
      src: `${dir}/runda-bilder/att-resa-med-oss-innebar.JPG`,
      alt: { sv: "Resenärer i massajtyg tillsammans med sina guider" },
    },
  },
  contact: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: [
        "Oavsett om du drömmer om en safari, en bestigning av Kilimanjaro eller några dagar på Zanzibar, hjälper vi dig gärna att planera en resa anpassad efter dina intressen och ditt tempo.",
        "Berätta lite om dina planer i formuläret nedan, så återkommer vi personligen och hjälper dig att ta nästa steg.",
      ],
    },
  },
};
