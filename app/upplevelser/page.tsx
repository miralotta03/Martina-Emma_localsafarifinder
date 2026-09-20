import type { Metadata } from "next";
import { experiencesHero } from "@/content/upplevelser";
import { PageHero } from "@/components/sections/PageHero";
import { ExperienceCategories } from "@/components/sections/ExperienceCategories";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";

export const metadata: Metadata = {
  title: "Upplevelser – Local Safari Finder",
  description: experiencesHero.body,
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero {...experiencesHero} />
      <ExperienceCategories />
      <PartnerMarquee />
    </>
  );
}
