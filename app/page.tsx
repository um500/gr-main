import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Property from "@/components/sections/Property";
import Developer from "@/components/sections/developer";
import Blog from "@/components/sections/FeaturedBlogs";
import Terminology from "@/components/sections/Terminology";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

import { sanityClient } from "@/lib/sanity.client";
import {
  homepageHeroQuery,
  communitiesQuery,
  featuredDevelopersQuery,
} from "@/lib/sanity.queries";
import { HomepageData } from "@/types/homepage";

export default async function Home() {
  // 🔹 HERO DATA
  const homepage: HomepageData = await sanityClient.fetch(homepageHeroQuery);

  // 🔹 FEATURED DEVELOPERS
  const developers = await sanityClient.fetch(featuredDevelopersQuery);

  // 🔹 COMMUNITIES
  const communities = await sanityClient.fetch(communitiesQuery);

  // ✅ ✅ ✅ MOST IMPORTANT FIX
  const safeHeroSlides =
    homepage?.heroSlides?.filter(
      (s) => s.active && s.image?.asset?.url
    ) || [];

  return (
    <>
      <Navbar />

      <Hero
        slides={safeHeroSlides}
        ctaText={homepage.heroCTA}
        communities={communities}
      />

      <About />
      <Property />

      <Developer developers={developers} />

      <Blog />
      <Terminology />
      <CTA />
      <Footer />
    </>
  );
}
