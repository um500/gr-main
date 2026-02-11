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
  const homepage: HomepageData = await sanityClient.fetch(homepageHeroQuery);
  const developers = await sanityClient.fetch(featuredDevelopersQuery);
  const communities = await sanityClient.fetch(communitiesQuery);

  const heroSlides =
    homepage?.heroSlides?.filter((slide) => slide?.image?.asset?.url) || [];

  return (
    <>
      {/* ❌ Navbar REMOVE from here */}

      <Hero
        slides={heroSlides}
        ctaText={homepage?.heroCTA || "Explore Properties"}
        communities={communities || []}
      />

      <About />
      <Property />
      <Developer developers={developers || []} />
      <Blog />
      <Terminology />
      <CTA />
      <Footer />
    </>
  );
}
