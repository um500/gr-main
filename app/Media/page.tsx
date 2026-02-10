import { sanityClient } from "@/lib/sanity.client";
import ImageCard from "./image-card";
import VideoCard from "./video-card";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";

const query = `
*[_type == "media"] | order(_createdAt desc){
  _id,
  title,
  location,
  mediaType,

  // image type
  images[]{
    asset->{
      _id,
      url
    }
  },

  // video type
  youtubeUrl
}
`;

export default async function MediaPage() {
  const media = await sanityClient.fetch(query);

  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[50vh] w-full">
        <img
          src="/assets/hero-1.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Media Hero"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Media
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              Images & Videos
            </p>
          </div>
        </div>
      </section>

      {/* ================= MEDIA GRID ================= */}
      <section className="px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {media.map((item: any) => (
            <div key={item._id} className="space-y-3">

              {/* CARD HEADING */}
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {item.mediaType === "image" ? "Image" : "Video"}
              </h3>

              {/* ================= IMAGE CARD ================= */}
              {item.mediaType === "image" && item.images?.length > 0 && (
                <ImageCard
                  images={item.images}
                  title={item.title}
                  location={item.location}
                />
              )}

              {/* ================= VIDEO CARD ================= */}
              {item.mediaType === "youtube" && item.youtubeUrl && (
                <VideoCard youtubeUrl={item.youtubeUrl} />
              )}

            </div>
          ))}
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
