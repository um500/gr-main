import { sanityClient } from "@/lib/sanity.client";
import {
  communitiesQuery,
  propertiesQuery,
} from "@/lib/sanity.queries";

import PropertyFilter from "@/components/sections/PropertyFilter";
import PropertiesClient from "@/components/sections/PropertiesClient";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

type SearchParams = Promise<{
  community?: string;
  type?: string;
  min?: string;
  max?: string;
  purpose?: string;
}>;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // ✅ VERY IMPORTANT (Next.js 16)
  const params = await searchParams;

  const communities = await sanityClient.fetch(communitiesQuery);

  const properties = await sanityClient.fetch(propertiesQuery, {
    community: params.community ?? null,
    type: params.type ?? null,
    min: params.min ? Number(params.min) : null,
    max: params.max ? Number(params.max) : null,
  });

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <img
          src="/assets/hero-1.jpg"
          alt="Luxury Properties Dubai"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-white text-4xl md:text-6xl font-bold">
              Find Your Dream Property
            </h1>
            <p className="text-gray-200 mt-4 text-lg">
              Luxury homes & premium investments in Dubai
            </p>
          </div>
        </div>
      </section>

      {/* ================= FILTER ================= */}
      <PropertyFilter communities={communities} />

      {/* ================= PROPERTIES ================= */}
      <PropertiesClient properties={properties} />

      <CTA />
      <Footer />
    </main>
  );
}
