import type { CompanyProfile } from "./types";

// Texterna kommer från företagets ansökan (svenska), inklistrade ordagrant.
// Texter märkta TODO är utkast som ska godkännas av kunden. Bilderna ligger i
// public/companies/safari-jens/. Upplevelsekorten saknar bilder, dagar och
// pris (se TODO vid upplevelserna).
const dir = "/companies/safari-jens";

// TODO: riktiga paket, dagar och pris saknas, invänta underlag från Safari
// Jens. Ett platshållarkort per aktivitetstyp, utan längd och pris.
const draftExperience = (title: string) => ({
  draft: true,
  tag: { sv: "TANZANIA" },
  title: { sv: title },
  image: {},
});

export const safariJensProfile: CompanyProfile = {
  pageName: "Safari Jens",
  region: { sv: "Arusha, Tanzania" },
  specialityLabel: { sv: "Med Barn" },
  heroImage: {
    src: `${dir}/hero/hero.jpeg`,
    alt: {
      sv: "Elefanter går förbi en safaribil med Safari Jens logotyp",
    },
  },
  heroIntro: {
    sv: "För oss handlar resor om mer än att se Afrikas vilda djurliv. Det handlar om skräddarsydda safariäventyr, bergsvandringar, strandsemestrar och kulturella möten som kopplar samman resenärer med Tanzanias skönhet, djurliv och människor. Scrolla vidare och lär känna vår historia, vårt team och passionen som driver Safari Jens varje dag.",
  },
  history: {
    paragraphs: {
      sv: [
        "Safari Jens är ett tanzaniskt ägt reseföretag som sedan starten 2013 har skapat skräddarsydda safariäventyr, bergsvandringar, strandsemestrar och kulturella upplevelser i Östafrika. Vi har alltid varit engagerade i att skapa genuina och minnesvärda resor som kopplar samman resenärer med Tanzanias skönhet, djurliv och människor.",
        "Företaget grundades av Jens Højmark Sylvestersen och Amelile Jacqueline Ngajilo. Tillsammans delade de en vision om personliga reseupplevelser som går bortom traditionell turism. Genom att kombinera Jens internationella perspektiv och passion för Tanzania med Ameliles lokala kunskap, operativa erfarenhet och djupa koppling till tanzanisk kultur byggde de ett företag grundat på kvalitet, förtroende och genuin gästfrihet.",
        "Idag drivs Safari Jens fortfarande som ett familjeägt och tanzaniskt lett företag. Efter Jens bortgång 2026 tog Amelile Jacqueline Ngajilo, som redan under många år varit företagets operativa och ekonomiska chef, över rollen som verkställande direktör. Tillsammans med ett engagerat team av researrangörer, guider, koordinatorer och supportpersonal för hon vidare företagets uppdrag och värderingar.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/hur-allt-borjade.jpeg`,
      alt: {
        sv: "En resenär i massajtyg tillsammans med massajer och en åsna på savannen",
      },
    },
  },
  quote: {
    sv: '"Att resa med oss innebär att uppleva Tanzania genom lokala experters ögon som bryr sig om varje detalj i din resa."',
  },
  founder: {
    name: "Jens och Amelile",
    // Rubriken blir "Möt Jens och Amelile".
    displayName: { sv: "Jens och Amelile" },
    paragraphs: {
      sv: [
        "Safari Jens grundades av Jens Højmark Sylvestersen och Amelile Jacqueline Ngajilo, som tillsammans byggde ett företag grundat på lokal kunskap, förtroende och genuin gästfrihet.",
        "Efter Jens bortgång 2026 leder Amelile, som i många år varit företagets operativa och ekonomiska chef, verksamheten vidare som verkställande direktör, med samma engagemang för kvalitet och personlig service som en gång grundade företaget.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/mot-amelile.jpeg`,
      alt: { sv: "Porträtt av Amelile Jacqueline Ngajilo" },
      position: "50% 0%",
    },
  },
  team: {
    heading: { sv: "Möt människorna bakom Safari Jens" },
    paragraphs: {
      sv: [
        "Bakom varje resa med Safari Jens finns ett dedikerat team av researrangörer, guider, koordinatorer och supportpersonal. Tillsammans arbetar de för att varje gäst ska känna sig välkommen, trygg och omhändertagen genom hela sin resa.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/mot-manniskorna-bakom-safari-jens.jpeg`,
      alt: {
        sv: "En guide i uniform vid en safaribil med Safari Jens logotyp",
      },
    },
  },
  experiences: {
    // TODO: utkast, ska godkännas av kunden. Sektionen visas inte för
    // tillfället (se components/company/CompanyPage.tsx).
    heading: { sv: "Safari, berg och strand" },
    intro: {
      sv: "Skräddarsydda resor i Tanzania, utformade efter dina intressen, din resestil och dina förväntningar.",
    },
    closing: {
      sv: "Upplev Tanzania genom ett lokalt team som bryr sig om varje detalj i din resa.",
    },
    items: [
      draftExperience("Bergsvandring"),
      draftExperience("Safariäventyr"),
      draftExperience("Strandsemester"),
    ],
  },
  gallery: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: "Varje bild berättar en del av vår historia. Här delar vi ögonblick från våra resor, från safariäventyr och bergsvandringar till stränder och kulturella möten i Tanzania.",
    },
    slots: [
      {
        src: `${dir}/rullande-bilder/1.jpeg`,
        alt: { sv: "En guide står vid en safaribil i gryningen" },
      },
      {
        src: `${dir}/rullande-bilder/2.jpeg`,
        alt: {
          sv: "En leende resenär i förarsätet på en safaribil med Safari Jens logotyp",
        },
      },
      {
        src: `${dir}/rullande-bilder/3.jpeg`,
        alt: { sv: "En luftballong fylls inför en ballongtur över savannen" },
      },
      {
        src: `${dir}/rullande-bilder/4.jpeg`,
        alt: { sv: "Resenärer vid toppskylten på Kilimanjaro" },
      },
      {
        src: `${dir}/rullande-bilder/5.jpeg`,
        alt: { sv: "En leopard vilar i ett träd" },
      },
      {
        src: `${dir}/rullande-bilder/6.jpeg`,
        alt: { sv: "Elefanter går förbi en safaribil med Safari Jens logotyp" },
      },
      {
        src: `${dir}/rullande-bilder/7.jpeg`,
        alt: { sv: "En elefant betar framför det snöklädda Kilimanjaro" },
      },
      {
        src: `${dir}/rullande-bilder/8.jpeg`,
        alt: {
          sv: "En resenär i massajtyg tillsammans med massajer och en åsna på savannen",
        },
      },
    ],
  },
  unique: {
    paragraphs: {
      sv: [
        "Vi tror inte på standardiserade resrutter. Varje resa utformas noggrant utifrån våra gästers intressen, resestil och förväntningar. Vår starka lokala närvaro, erfarna guider och långvariga relationer i hela Tanzania gör att vi kan skapa sömlösa och meningsfulla reseupplevelser.",
      ],
    },
    image: {
      src: `${dir}/runda-bilder/en-resa-skapad-med-omtanke.jpeg`,
      alt: {
        sv: "Resenärer och ballongpiloter vid en luftballongkorg i gryningen",
      },
    },
  },
  reviews: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: "Det finns inget som betyder mer för oss än att våra gäster lämnar Tanzania med minnen för livet. Här delar några av dem med sig av sina upplevelser från sina resor med Safari Jens.",
    },
    items: [
      {
        rating: 5,
        author: "Cathrin Tromborg Bræstrup",
        text: {
          sv: "Äntligen kom vi iväg på vår safariresa, och den var värd hela väntetiden. Vi fick se de stora fem, den stora migrationen med tiotusentals djur och massor av fåglar vi önskat oss. Vi bodde dessutom på fantastiska lodger och satt på terrassen och såg elefanterna gå och lägga sig om kvällen. Tusen tack till Safari Jens för att ha ordnat allt och kopplat ihop oss med vår kunniga och fantastiska chaufför Nico.",
        },
      },
      {
        rating: 5,
        author: "Helene Su-Min Ting Danielsen",
        text: {
          sv: "Vi var åtta personer, tre generationer, som skulle på safari med avslutande badsemester. Vi hade tittat på många vanliga researrangörer men hittade inte riktigt det rätta förrän vi pratade med Jens. Safari Jens lyssnade verkligen på vad vi ville ha och hittade precis rätt platser och kombination av upplevelser och avkoppling. Vi kom hem med en upplevelse vi aldrig kommer att glömma.",
        },
      },
      {
        rating: 5,
        author: "Lisbeth Bygsø-Petersen",
        text: {
          sv: "Vår varmaste rekommendation av Safari Jens. Allt var helt perfekt på vår nio dagar långa safariresa, med underbara lodger längs hela vägen och de vackraste utsikterna. Viktigast av allt var en kunnig och trevlig guide, och här kunde vi inte önskat oss en bättre reseledsagare än Walter.",
        },
      },
    ],
  },
  closing: {
    label: { sv: "LOKALT • PERSONLIGT • OFÖRGLÖMLIGT" },
    text: {
      sv: "...att uppleva Tanzania genom ett lokalt team som verkligen älskar och förstår detta fantastiska land.",
    },
    image: {
      src: `${dir}/runda-bilder/att-resa-med-oss-innebar.jpeg`,
      alt: { sv: "En resenär med en namnskylt utanför flygplatsen" },
    },
  },
  contact: {
    // TODO: utkast, ska godkännas av kunden.
    intro: {
      sv: [
        "Oavsett om du drömmer om en safari, en bergsvandring, en strandsemester eller en kombination av allt, hjälper vi dig gärna att planera en resa utformad efter dina intressen.",
        "Berätta lite om dina planer i formuläret nedan, så återkommer vi personligen och hjälper dig att ta nästa steg.",
      ],
    },
  },
};
