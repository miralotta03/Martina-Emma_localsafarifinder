export type TravelerCategorySlug =
  | "for-tva"
  | "med-barn"
  | "pa-egen-hand"
  | "dela-upplevelsen";

export type NavLink = {
  label: string;
  href: string;
};

export type NavDropdownLink = NavLink & {
  children?: NavLink[];
};

export type TravelerType = {
  slug: TravelerCategorySlug;
  title: string;
  description: string;
  image: string;
};

export type WhyLocalFeature = {
  icon: "handshake" | "pin" | "star";
  title: string;
  description: string;
};

export type Company = {
  slug: string;
  name: string;
  country: string;
  description: string;
  image: string;
  categories: TravelerCategorySlug[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FooterLinkColumn = {
  heading: string;
  links: NavLink[];
};

export type ActivityTypeSlug =
  | "bergsvandring"
  | "safariaventyr"
  | "strandsemester"
  | "paketresor";
