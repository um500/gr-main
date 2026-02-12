import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Link from "next/link";
import Image from "next/image";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

/* ================= SANITY QUERY ================= */
const query = `
*[_type == "developer"] | order(name asc){
  _id,
  name,
  shortDescription,
  "slug": slug.current,
  logo
}
`;

/* ================= TYPES ================= */
type Developer = {
  _id: string;
  name: string;
  shortDescription?: string;
  slug: string;
  logo?: any;
};

export default async function DevelopersPage() {
  const developers: Developer[] = await sanityClient.fetch(query);

  return (
    <main className="bg-white dark:bg-[#0f172a] transition-colors duration-300">

      {/* ================= DEVELOPERS HERO ================= */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/assets/hero-2.jpg"
          alt="Top Developers in Dubai"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <p className="text-yellow-400 tracking-widest uppercase mb-4 text-sm md:text-base">
              Our Partners
            </p>

            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
              Top Real Estate Developers in Dubai
            </h1>

            <p className="text-gray-200 mt-6 text-base md:text-lg">
              We collaborate with Dubai’s most trusted developers to bring you
              world-class residential and commercial properties designed for
              luxury living and high investment returns.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DEVELOPERS SECTION ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">
          <p className="text-[#C9A227] uppercase tracking-widest text-sm">
            Our Developers
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Top Real Estate Developers in Dubai
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            We work with Dubai’s most trusted and reputed developers to bring you
            premium residential and commercial projects.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {developers.map((dev) => (
            <div
              key={dev._id}
              className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                {dev.logo ? (
                  <Image
                    src={urlFor(dev.logo).width(600).quality(85).url()}
                    alt={dev.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {dev.name}
                </h3>

                {dev.shortDescription && (
                  <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                    {dev.shortDescription}
                  </p>
                )}

                <Link
                  href={`/developers/${dev.slug}`}
                  className="inline-flex items-center mt-5 text-[#C9A227] font-medium hover:underline"
                >
                  View Projects →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <CTA />
      <Footer />

    </main>
  );
}
