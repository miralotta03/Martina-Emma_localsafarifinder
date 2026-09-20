export type Company = {
  slug: string;
  name: string;
  logo: string;
  country: string;
  description: string;
};

export const companies: Company[] = [
  {
    slug: "hec-kilimanjaro-safaris",
    name: "HEC Kilimanjaro Safari LTD",
    logo: "/images/companies/hec-kilimanjaro.svg",
    country: "Tanzania",
    description: "Personliga bergsvandringar för äventyrliga själar.",
  },
  {
    slug: "smart-escapes",
    name: "Smart Escape Limited",
    logo: "/images/companies/smart-escape.svg",
    country: "Tanzania",
    description: "Safariäventyr för dig som vill uppleva det verkliga Tanzania.",
  },
];
