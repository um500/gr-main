import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { announcementQuery } from "@/lib/sanity.queries";

export default async function AnnouncementBar() {
  const announcements =
    (await sanityClient.fetch(announcementQuery)) ?? [];

  if (!announcements.length) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#D4AF37] text-black text-sm py-2 z-[2000] overflow-hidden">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {announcements.map((item: any, index: number) => (
            <span key={index} className="mx-8 inline-flex items-center gap-4">
              📅 {item.eventDate} – {item.city} 🔥 {item.title}
              {item.slug && (
                <Link
                  href={`/announcement/${item.slug}`}
                  className="bg-black text-white px-3 py-1 rounded text-xs font-semibold"
                >
                  View Details
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
