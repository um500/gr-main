import CTA from "@/components/sections/CTA";
import { sanityClient } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import { urlFor } from "@/lib/sanity.image";
import DeveloperProjectsClient from "@/components/sections/DeveloperProjectsClient";

/* ================= SANITY QUERY ================= */
const developerWithProjectsQuery = `
*[_type == "developer" && slug.current == $slug][0]{
  _id,
  name,
  about,
  heroImage,
  stats,
  "properties": *[
    _type == "property" &&
    developer._ref == ^._id
  ] | order(_createdAt desc){
    _id,
    title,
    slug,
    location,
    handover,
    images[]{
      asset->{url}
    },
    units[]{
      beds,
      size,
      price
    }
  }
}
`;

export default async function DeveloperPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // ✅ SAFEST WAY (THIS FIXES THE ERROR)
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  if (!slug) return notFound();

  const developer = await sanityClient.fetch(
    developerWithProjectsQuery,
    { slug }
  );

  if (!developer) return notFound();

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] w-full">
        {developer.heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${urlFor(developer.heroImage)
                .width(2000)
                .height(1000)
                .quality(85)
                .url()})`,
            }}
          />
        )}

        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <p className="text-yellow-400 tracking-widest uppercase mb-4">
              Our Partner
            </p>

            <h1 className="text-white text-4xl md:text-6xl font-bold">
              {developer.name}
            </h1>

            <p className="text-gray-200 mt-6 text-lg">
              Premium real estate developer shaping Dubai’s skyline
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a
                href="#projects"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold"
              >
                View Projects
              </a>

              <a
                href="/contact"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      {developer.stats && (
        <section className="py-12 bg-[#FAF9F7] dark:bg-black transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {developer.stats.experience && (
              <div>
                <p className="text-3xl font-semibold text-[#C9A227]">
                  {developer.stats.experience}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                  Years Experience
                </p>
              </div>
            )}

            {developer.stats.projects && (
              <div>
                <p className="text-3xl font-semibold text-[#C9A227]">
                  {developer.stats.projects}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                  Projects Delivered
                </p>
              </div>
            )}

            {developer.stats.homes && (
              <div>
                <p className="text-3xl font-semibold text-[#C9A227]">
                  {developer.stats.homes}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                  Homes Sold
                </p>
              </div>
            )}

            {developer.stats.locations && (
              <div>
                <p className="text-sm text-gray-700">
                  {developer.stats.locations}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                  Prime Locations
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= ABOUT ================= */}
     <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            About {developer.name}
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-4xl">
            {developer.about}
          </p>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
    <section id="projects" className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">
            Projects by {developer.name}
          </h2>

          {developer.properties?.length === 0 ? (
            <p className="text-gray-500">No projects added yet.</p>
          ) : (
            <DeveloperProjectsClient
              properties={developer.properties}
            />
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <CTA />
    </main>
  );
}
