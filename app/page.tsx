import { Hero } from "@/components/sections/Hero";
import { TravelerTypes } from "@/components/sections/TravelerTypes";
import { WhyLocal } from "@/components/sections/WhyLocal";
import { LocalFavorites } from "@/components/sections/LocalFavorites";
import { Faq } from "@/components/sections/Faq";
import { PartnerCta } from "@/components/sections/PartnerCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TravelerTypes />
      <WhyLocal />
      <LocalFavorites />
      <Faq />
      <PartnerCta />
    </>
  );
}
