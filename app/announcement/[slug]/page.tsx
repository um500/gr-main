
import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";


const singleAnnouncementQuery = groq`
*[_type == "announcement" && slug.current == $slug][0]{
  title,
  eventDate,
  city,
  description
}
`;

type Params = Promise<{
  slug: string;
}>;

export default async function AnnouncementDetail({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const announcement = await sanityClient.fetch(
    singleAnnouncementQuery,
    { slug }
  );

  if (!announcement) return notFound();

  return (
    <main className="pt-[80px] bg-gradient-to-b from-gray-50 to-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="/assets/hero-1.jpg"
          alt="Announcements"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="bg-[#D4AF37] text-black px-5 py-1 rounded-full text-sm font-semibold mb-6 shadow-lg">
            📢 Latest Announcement
          </span>

          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
            All Announcements
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="relative bg-white shadow-xl rounded-3xl p-12 border border-gray-100">

          {/* Gold Accent Line */}
          <div className="absolute -top-2 left-10 w-24 h-1 bg-[#D4AF37] rounded-full" />

          {/* Title */}
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {announcement.title}
          </h2>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8">
            <span>📅 {announcement.eventDate}</span>
            <span>📍 {announcement.city}</span>
          </div>

          {/* Description */}
          <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-line text-lg">
            {announcement.description}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4">
        

            <Link
              href="/"
              className="border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-full font-semibold hover:bg-[#D4AF37] hover:text-black transition"
            >
              Back to All
            </Link>
          </div>

        </div>
      </section>

      <CTA />
      <Footer />

    </main>


  );
}
