import type { Metadata } from "next";
import { aboutHero } from "@/content/om-oss";
import { PageHero } from "@/components/sections/PageHero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { AboutBeliefs } from "@/components/sections/AboutBeliefs";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutSteps } from "@/components/sections/AboutSteps";

export const metadata: Metadata = {
  title: "Om oss – Local Safari Finder",
  description: aboutHero.body,
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...aboutHero} align="center" />
      <AboutIntro />
      <AboutBeliefs />
      <AboutMission />
      <AboutSteps />
    </>
  );
}
