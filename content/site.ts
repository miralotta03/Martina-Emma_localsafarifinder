import type {
  FaqItem,
  FooterLinkColumn,
  NavDropdownLink,
  WhyLocalFeature,
} from "@/lib/types";

export const nav: NavDropdownLink[] = [
  { label: "Hem", href: "/" },
  {
    label: "Upplevelser",
    href: "/upplevelser",
    children: [
      { label: "För Två", href: "/for-tva" },
      { label: "Med Barn", href: "/med-barn" },
      { label: "På Egen Hand", href: "/pa-egen-hand" },
      { label: "Dela Upplevelsen", href: "/dela-upplevelsen" },
    ],
  },
  { label: "Om oss", href: "/om-oss" },
];

export const hero = {
  eyebrow: "Lokala företag. Genuina resor.",
  heading: [
    { text: "Hitta en " },
    { text: "lokal", highlight: true },
    { text: " safari och res med människorna som lever där" },
  ],
  body: "Vi kopplar dig direkt till små, oberoende safariföretag i Afrika. Inga mellanhänder, inga bokningsavgifter och en mycket större del av det du betalar stannar i landet du besöker.",
  cta: { label: "Utforska upplevelser", href: "/upplevelser" },
  image: "/images/hero/hero-background.svg",
};

export const travelerTypesSection = {
  eyebrow: "Vem reser du med?",
  heading: "Safari, anpassad efter din berättelse.",
  body: "Från romantiska resor till familjeäventyr och soloresor – hitta upplevelser som passar just ditt sätt att resa.",
  cta: { label: "Se alla upplevelser", href: "/upplevelser" },
};

export const whyLocalSection = {
  eyebrow: "Därför lokalt",
  heading: "När du väljer lokalt, stannar mer kvar.",
};

export const whyLocalFeatures: WhyLocalFeature[] = [
  {
    icon: "handshake",
    title: "Pengarna stannar lokalt",
    description:
      "Att boka med ett lokalt företag innebär att en mycket större del av det du betalar går till lokala guider, chaufförer, kockar, lodger och samhällena runt dem.",
  },
  {
    icon: "pin",
    title: "Genuina, personliga upplevelser",
    description:
      "Små företag visar dig sitt hem inte ett polerat färdigprogram. Du möter ägaren, lär av lokala guider och reser på ett sätt som känns äkta.",
  },
  {
    icon: "star",
    title: "Noggrant utvalda partners",
    description:
      "Vi handplockar varje företag utifrån kvalitet, säkerhet och etik. Inget marknadsplatsbrus bara små bolag vi själva skulle rekommendera till våra vänner.",
  },
];

export const localFavoritesSection = {
  eyebrow: "Lokala favoriter",
  heading: "Små företag. Resor med stort hjärta",
  body: "Vi samlar små, lokalt drivna safariföretag som känner sina destinationer bättre än någon annan. Genom att resa direkt med dem får du en mer personlig upplevelse och bidrar samtidigt till att mer av resans värde stannar kvar i lokalsamhället.",
};

export const faqSection = {
  eyebrow: "Bra att veta",
  heading: "Frågor & Svar",
  body: "Här hittar du svar på de vanligaste frågorna om Local Safari Finder, hur plattformen fungerar och varför vi brinner för att lyfta lokala safariföretag.",
};

export const faqItems: FaqItem[] = [
  {
    question: "Vilka är vi som ligger bakom Local Safari Finders?",
    answer:
      "Vi heter Martina och Emma och delar en passion för resor, människor och genuina upplevelser. Vi tror att de bästa safariupplevelserna skapas av människorna som lever och arbetar på destinationen. Därför startade vi Local Safari Finder – en plattform där resenärer enkelt kan hitta lokala safariföretag och ta direkt kontakt med dem. För oss handlar det om att skapa mer personliga resor och samtidigt bidra till att en större del av resans värde stannar kvar i landet.",
  },
  {
    question: "Hur fungerar Local Safari Finder?",
    answer:
      "Det är enkelt! Börja med att välja vilken typ av resa du letar efter – till exempel om du reser som par, familj, ensam eller i grupp. Därefter kan du utforska olika safariupplevelser och företag som passar dina önskemål. När du hittar ett företag som känns rätt skickar du en intresseanmälan direkt till dem. Sedan fortsätter ni dialogen tillsammans.",
  },
  {
    question: "Bokar eller betalar jag via er?",
    answer:
      "Nej. Vi tar inte emot bokningar eller betalningar och fungerar inte som en researrangör. Vår uppgift är att hjälpa dig hitta lokala safariföretag och skapa en direkt kontakt mellan dig och företaget. Det innebär att du får personlig kontakt redan från början och bokar direkt med arrangören.",
  },
  {
    question: "Varför ska jag använda Local Safari Finder?",
    answer:
      "Vi gör det enklare att hitta lokala safariarrangörer utan att behöva leta på flera olika webbplatser. Genom att kontakta företagen direkt slipper du onödiga mellanhänder och får möjlighet att ställa frågor, diskutera upplägg och skapa en resa som passar just dig.",
  },
  {
    question: "Varför fokuserar ni på lokala safariföretag?",
    answer:
      "Vi tror att lokal kunskap skapar de bästa reseupplevelserna. När fler väljer att boka direkt med lokala företag får entreprenörerna större möjligheter att utveckla sina verksamheter, samtidigt som en större del av intäkterna stannar kvar i landet och bidrar till lokala jobb, familjer och samhällen. Det är en av anledningarna till att vi skapade Local Safari Finder.",
  },
  {
    question: "Kostar det något att använda plattformen?",
    answer:
      "Det är helt kostnadsfritt att använda Local Safari Finder. Du kan utforska olika safariupplevelser och skicka intresseanmälningar direkt till företagen utan kostnad. Vårt uppdrag är att hjälpa små, lokala safariföretag att nå fler resenärer. Därför fungerar vi som en plattform som skapar direkt kontakt mellan dig och företagen – utan mellanhänder.",
  },
];

export const partnerCta = {
  eyebrow: "For local safari companies",
  heading: "Do you run a local safari company?",
  body: "Connect with travelers who are looking specifically for local, independent safari companies. No booking commissions. Just direct inquiries sent straight to your inbox.",
  cta: { label: "Apply for partnership", href: "/bli-partner" },
};

export const footer = {
  brand: "Local Safari Finder",
  about:
    "Vi kopplar samman resenärer med lokala, oberoende safariföretag i Afrika så att mer av varje bokning stannar i de samhällen som gör resorna möjliga. Förfrågningar går direkt till företaget. Inga mellanhänder, inga bokningsavgifter.",
  tagline:
    "Vi stödjer lokala företag. Förfrågningar går direkt till dem - vi hanterar inga bokningar.",
  copyright: "Copyright 2026. Local Safari Finder. All Rights Reserved.",
};

export const footerColumns: FooterLinkColumn[] = [
  {
    heading: "Utforska",
    links: [
      { label: "För Två", href: "/for-tva" },
      { label: "Med Barn", href: "/med-barn" },
      { label: "På Egen Hand", href: "/pa-egen-hand" },
      { label: "Dela Upplevelsen", href: "/dela-upplevelsen" },
    ],
  },
  {
    heading: "Kundservice",
    links: [
      { label: "Om oss", href: "/om-oss" },
      { label: "Kontakta oss", href: "/kontakt" },
      { label: "Bli Partner", href: "/bli-partner" },
      { label: "Användarvillkor", href: "/anvandarvillkor" },
      { label: "Integritetspolicy", href: "/integritetspolicy" },
      { label: "Cookiepolicy", href: "/cookiepolicy" },
    ],
  },
];

export const headerCta = { label: "Utforska", href: "/upplevelser" };
