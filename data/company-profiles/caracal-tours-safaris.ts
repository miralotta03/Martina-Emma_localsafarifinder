import type { CompanyProfile } from "./types";

// Texterna kommer från företagets ansökan (svenska), inklistrade ordagrant.
// Texter märkta TODO är utkast som ska godkännas av kunden. Bilderna ligger i
// public/companies/caracal-tours-safaris/. Upplevelsekorten saknar bilder,
// dagar och pris (se TODO vid upplevelserna).
const dir = "/companies/caracal-tours-safaris";

// TODO: riktiga paket, dagar och pris saknas, invänta underlag från
// Marion/Ben. Ett platshållarkort per aktivitetstyp, utan längd och pris.
const draftExperience = (title: string) => ({
  draft: true,
  tag: { sv: "TANZANIA" },
  title: { sv: title },
  image: {},
});

export const caracalToursSafarisProfile: CompanyProfile = {
  pageName: "Caracal Tours & Safaris",
  region: { sv: "Moshi, Tanzania" },
  specialityLabel: { sv: "Med Barn" },
  heroImage: {
    src: `${dir}/hero/hero.JPG`,
    alt: {
      sv: "Resenärer i fältstolar blickar ut över savannen i solnedgången",
    },
  },
  heroIntro: {
    sv: "För oss handlar resor om mer än att se Tanzanias vilda djurliv. Det handlar om att upptäcka landet i sin egen takt, bortom de stora turiststråken, och lära känna människorna och platserna som gör varje resa unik. Scrolla vidare och lär känna vår historia, vårt team och passionen som driver Caracal Tours & Safaris varje dag.",
  },
  history: {
    paragraphs: {
      sv: [
        "Caracal Tours & Safaris grundades av ett genuint engagemang för att visa upp Tanzanias skönhet och mångfald. Företaget startades av Ben Sumari från Tanzania och Marion Sumari från Nederländerna, med en enkel vision: att skapa oförglömliga safariupplevelser där resenärer får möta naturen, djurlivet och människorna som gör Tanzania så speciellt. Som familjeföretag är vi stolta över vår varma gästfrihet och att behandla varje gäst som en del av familjen.",
        "Vår inspiration kommer ur en kärlek till äventyr och en vilja att dela de platser vi kallar hem. Från Serengetis oändliga slätter till den hisnande Ngorongorokratern tror vi att varje resa ska vara mer än en semester, den ska vara en upplevelse som lämnar minnen för livet. Vi tror också på att de bästa upplevelserna ofta finns bortom folkmassorna, därför väljer vi gärna dolda pärlor, lugnare platser och genuina möten med lokalbefolkningen.",
        "Det som gör våra safarier unika är vårt personliga förhållningssätt. Vi tar oss tid att förstå varje resenärs intressen och skapar noggrant planerade resor ledda av erfarna lokala guider med en passion för Tanzanias djurliv, kultur och bevarande.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/hur-det-borjade.jpeg`,
      alt: { sv: "Ben och Marion i fältstolar med utsikt över savannen" },
    },
  },
  quote: {
    sv: '"Att resa med oss innebär att utforska Tanzania i din egen takt, bortom folkmassorna, på ett ansvarsfullt sätt som skapar minnen för livet."',
  },
  founder: {
    name: "Ben och Marion",
    // Rubriken blir "Möt Ben och Marion".
    displayName: { sv: "Ben och Marion" },
    paragraphs: {
      sv: [
        "Caracal Tours & Safaris grundades av Ben Sumari, uppvuxen i Tanzania, och Marion Sumari, från Nederländerna. Tillsammans förenar de lokal kunskap med ett internationellt perspektiv för att skapa safarier som känns genomtänkta och personliga från start till mål.",
        "Ben har vuxit upp med Tanzanias natur och djurliv och känner landets nationalparker väl. Marion ser till att varje resa planeras med omsorg utifrån gästens egna önskemål, med regelbunden kontakt genom hela resan.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/mot-ben-och-marion.jpg`,
      alt: { sv: "Ben och Marion framför sina safaribilar" },
    },
  },
  team: {
    heading: { sv: "Möt människorna bakom Caracal Tours & Safaris" },
    paragraphs: {
      sv: [
        "Bakom varje resa med Caracal Tours & Safaris finns ett team av erfarna lokala guider som delar samma passion för Tanzanias djurliv, kultur och natur. Tillsammans arbetar de för att skapa trygga och minnesvärda upplevelser där varje gäst möts med kunskap, engagemang och ett leende.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/mot-manniskorna-bakom-caracal.jpg`,
      alt: { sv: "En leende guide sedd genom fönstret på en safaribil" },
    },
  },
  experiences: {
    // TODO: utkast, ska godkännas av kunden. Sektionen visas inte för
    // tillfället (se components/company/CompanyPage.tsx).
    heading: { sv: "Safari, berg och strand" },
    intro: {
      sv: "Upptäck Tanzania i din egen takt, bortom folkmassorna, med erfarna lokala guider vid din sida.",
    },
    closing: {
      sv: "Utforska Tanzania på ett personligt och hållbart sätt som skapar minnen för livet.",
    },
    items: [
      draftExperience("Bergsvandring"),
      draftExperience("Safariäventyr"),
      draftExperience("Strandsemester"),
      draftExperience("Paketresor"),
    ],
  },
  gallery: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: "Varje bild berättar en del av vår historia. Här delar vi ögonblick från våra resor, från safariäventyr och möten med lokalbefolkningen till Tanzanias storslagna natur.",
    },
    // I samma ordning som filerna är numrerade (1–8).
    slots: [
      {
        src: `${dir}/rullande-bilder/1.JPG`,
        alt: { sv: "En kvinna med ett barn på höften pekar ut över en sjö" },
      },
      {
        src: `${dir}/rullande-bilder/2.jpg`,
        alt: { sv: "En resenär fotograferar en elefant från safaribilen" },
      },
      {
        src: `${dir}/rullande-bilder/3.JPG`,
        alt: { sv: "Resenärer och massajer tittar ut över landskapet" },
      },
      {
        src: `${dir}/rullande-bilder/4.JPG`,
        alt: { sv: "Picknick vid en safaribil på savannen" },
      },
      {
        src: `${dir}/rullande-bilder/5.JPG`,
        alt: { sv: "Ett lejon går förbi en safaribil i högt gräs" },
      },
      {
        src: `${dir}/rullande-bilder/6.JPG`,
        alt: { sv: "En guide tar en selfie vid safaribilen i solnedgången" },
      },
      {
        src: `${dir}/rullande-bilder/7.jpg`,
        alt: { sv: "Ett barn spanar med kikare från safaribilen" },
      },
      {
        src: `${dir}/rullande-bilder/8.jpg`,
        alt: { sv: "En safaribil med Caracals logotyp bland zebror" },
      },
    ],
  },
  unique: {
    paragraphs: {
      sv: [
        "Vi erbjuder mer än en safari, vi skapar personliga och genuina upplevelser kring varje gäst. Som familjeföretag kombinerar vi lokal expertis med ett internationellt perspektiv, så att varje resa planeras och guidas med omsorg. Vi tror på att komma bort från folkmassorna, stödja lokalsamhällen och främja ett hållbart, etiskt resande som respekterar både djurliv och natur.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/en-resa-skapad-med-omtanke.jpg`,
      alt: { sv: "Resenärer firar vid toppskylten på Kilimanjaro" },
    },
  },
  reviews: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: "Det finns inget som betyder mer för oss än att våra gäster lämnar Tanzania med minnen för livet. Här delar några av dem med sig av sina upplevelser från sina resor med Caracal Tours & Safaris.",
    },
    items: [
      {
        rating: 5,
        author: "Maaike",
        text: {
          sv: "Vilken fantastisk organisation vår resa hade! Ben mötte upp oss på flygplatsen med ett leende och var vår guide under en oförglömlig safari. Vi imponerades av hans kunskap om djurvärlden och hur han utan navigering hittade vägarna genom Serengeti. Med Marion blev övergången lika smidig, hon gav fina tips och skapade ett resprogram som verkligen mötte våra önskemål.",
        },
      },
      {
        rating: 5,
        author: "Marieke",
        text: {
          sv: "Resan till Tanzania i september var fantastisk. Allt var mycket väl ordnat av Marion, och vi hade regelbunden kontakt med henne under hela resan. Genom vår guide Anthony fick vi se mycket djurliv och kom till platser dit andra jeepar inte nådde. Boendet var i absolut toppklass.",
        },
      },
      {
        rating: 5,
        author: "Chanel",
        text: {
          sv: "Redan vid ankomsten till Tanzania väntade vår Kilimanjaro-guide James på oss på flygplatsen. Hela resan var så väl organiserad av Marion. Den sjudagars vandringen upp på Kilimanjaro gick mycket smidigt, och safarin till Tarangire, Serengeti och Ngorongorokratern var lika genomtänkt.",
        },
      },
    ],
  },
  closing: {
    label: { sv: "ÄKTA • PERSONLIGT • HÅLLBART" },
    text: {
      sv: "...att utforska Tanzania bortom folkmassorna, på ett personligt och hållbart sätt som skapar minnen för livet.",
    },
    image: {
      src: `${dir}/runda-bilder/att-resa-med-oss-innebar.jpg`,
      alt: { sv: "En elefant sedd från en öppen safaribil" },
    },
  },
  contact: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: [
        "Oavsett om du drömmer om en safari i Serengeti, en bestigning av Kilimanjaro eller en resa i din egen takt bortom folkmassorna, hjälper vi dig gärna att planera ditt nästa äventyr.",
        "Berätta lite om dina planer i formuläret nedan, så återkommer vi personligen och hjälper dig att ta nästa steg.",
      ],
    },
  },
};
