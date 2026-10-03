import type { LegalPageContent } from "./types";

export const cookiepolicy: LegalPageContent = {
  title: "Cookiepolicy",
  updated: "2026-06-28",
  description:
    "Så använder Local Safari Finder cookies och hur du hanterar dem.",
  sections: [
    {
      heading: "1. Vad är cookies",
      blocks: [
        {
          p: [
            "Cookies är små textfiler som sparas på din enhet när du besöker en webbplats.",
          ],
        },
        {
          p: [
            "De hjälper webbplatsen att fungera korrekt och gör det möjligt att förbättra användarupplevelsen.",
          ],
        },
      ],
    },
    {
      heading: "2. Hur vi använder cookies",
      blocks: [
        { p: ["Local Safari Finder använder cookies för att:"] },
        {
          list: [
            "säkerställa att webbplatsen fungerar korrekt",
            "komma ihåg dina inställningar",
            "analysera hur webbplatsen används",
            "förbättra innehåll och användarupplevelse",
            "mäta effekten av vår marknadsföring",
          ],
        },
      ],
    },
    {
      heading: "3. Tredjepartscookies",
      blocks: [
        { p: ["Vi kan använda cookies från tredje part, exempelvis:"] },
        {
          list: [
            "Meta Pixel – för att analysera och förbättra annonsering på Meta-plattformar.",
          ],
        },
        {
          p: [
            "Vi kan även använda andra analysverktyg om det behövs för att förbättra webbplatsens funktion och användarupplevelse.",
          ],
        },
      ],
    },
    {
      heading: "4. Hantera cookies",
      blocks: [
        {
          p: [
            "När du besöker webbplatsen får du möjlighet att acceptera eller neka användningen av cookies via vår cookie-banner.",
          ],
        },
        {
          p: [
            "Du kan även ändra eller ta bort cookies via inställningarna i din webbläsare.",
          ],
        },
        {
          p: [
            "Observera att vissa funktioner på webbplatsen kan påverkas om du väljer att blockera cookies.",
          ],
        },
      ],
    },
    {
      heading: "5. Ändringar",
      blocks: [
        {
          p: [
            "Vi kan uppdatera denna cookiepolicy när vår användning av cookies förändras eller när lagstiftningen kräver det.",
          ],
        },
        { p: ["Den senaste versionen finns alltid publicerad på denna sida."] },
      ],
    },
    {
      heading: "Kontakt",
      blocks: [
        {
          p: [
            "Har du frågor om vår användning av cookies är du välkommen att kontakta oss via vårt ",
            { link: "kontaktformulär", href: "/kontakta-oss" },
            ".",
          ],
        },
      ],
    },
  ],
};
