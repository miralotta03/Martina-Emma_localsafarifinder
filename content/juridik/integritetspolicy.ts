import type { LegalPageContent } from "./types";

export const integritetspolicy: LegalPageContent = {
  title: "Integritetspolicy",
  updated: "2026-06-28",
  description:
    "Så samlar Local Safari Finder in, använder och skyddar dina personuppgifter.",
  sections: [
    {
      heading: "1. Om denna integritetspolicy",
      blocks: [
        {
          p: [
            "På Local Safari Finder värnar vi om din integritet och behandlar dina personuppgifter med omsorg.",
          ],
        },
        {
          p: [
            "Denna integritetspolicy beskriver vilka personuppgifter vi samlar in, varför vi samlar in dem och hur de behandlas när du använder vår webbplats.",
          ],
        },
        {
          p: [
            "Local Safari Finder drivs av ",
            { strong: "Market with Malisa AB" },
            ".",
          ],
        },
      ],
    },
    {
      heading: "2. Vilka personuppgifter vi samlar in",
      blocks: [
        {
          p: [
            "När du använder vår webbplats kan vi samla in följande uppgifter:",
          ],
        },
        {
          list: [
            "Namn",
            "E-postadress",
            "Telefonnummer (om du väljer att ange det)",
            "Land eller annan information du lämnar i formuläret",
            "Meddelanden eller önskemål som du själv skriver",
          ],
        },
        {
          p: [
            "Vi kan även samla in teknisk information om ditt besök, exempelvis:",
          ],
        },
        {
          list: [
            "IP-adress",
            "Webbläsare",
            "Enhetstyp",
            "Besökta sidor",
            "Information från cookies",
          ],
        },
      ],
    },
    {
      heading: "3. Hur vi använder dina uppgifter",
      blocks: [
        { p: ["Vi behandlar dina personuppgifter för att:"] },
        {
          list: [
            "vidarebefordra din intresseanmälan till det företag du själv valt",
            "kunna besvara frågor du skickar till oss",
            "förbättra webbplatsen och användarupplevelsen",
            "analysera besöksstatistik",
            "visa relevanta annonser via Meta",
          ],
        },
      ],
    },
    {
      // TODO: stäm av med kunden. "Vidarebefodran" ska troligen vara
      // "Vidarebefordran". Kopierat exakt som i originalet.
      heading: "4. Vidarebefodran till safariföretag",
      blocks: [
        {
          p: [
            "När du skickar en intresseanmälan via Local Safari Finder skickas dina uppgifter direkt till det företag du valt.",
          ],
        },
        {
          p: [
            "Efter att uppgifterna skickats ansvarar det aktuella företaget för den fortsatta behandlingen av dina personuppgifter i samband med offert, bokning eller annan kontakt.",
          ],
        },
      ],
    },
    {
      heading: "5. Hur länge vi sparar dina uppgifter",
      blocks: [
        {
          p: [
            "Vi sparar endast dina personuppgifter så länge det är nödvändigt för de ändamål de samlats in för eller så länge vi är skyldiga enligt lag.",
          ],
        },
      ],
    },
    {
      heading: "6. Cookies",
      blocks: [
        {
          p: [
            "Vi använder cookies och liknande tekniker för att förbättra webbplatsen, analysera trafik och visa relevant marknadsföring.",
          ],
        },
        {
          p: [
            "Mer information finns i vår ",
            { link: "Cookiepolicy", href: "/cookiepolicy" },
            ".",
          ],
        },
      ],
    },
    {
      heading: "7. Dina rättigheter",
      blocks: [
        { p: ["Du har rätt att:"] },
        {
          list: [
            "begära information om vilka personuppgifter vi behandlar",
            "begära rättelse av felaktiga uppgifter",
            "begära att dina uppgifter raderas när det är möjligt",
            "invända mot viss behandling",
            "begära begränsning av behandlingen",
            "begära att få ut dina uppgifter i ett strukturerat format",
          ],
        },
      ],
    },
    {
      heading: "8. Ändringar",
      blocks: [
        { p: ["Vi kan uppdatera denna integritetspolicy vid behov."] },
        { p: ["Den senaste versionen finns alltid publicerad på denna sida."] },
      ],
    },
    {
      heading: "Kontakt",
      blocks: [
        {
          p: [
            "Har du frågor om hur vi behandlar personuppgifter är du välkommen att kontakta oss via vårt ",
            { link: "kontaktformulär", href: "/kontakta-oss" },
            ".",
          ],
        },
      ],
    },
  ],
};
