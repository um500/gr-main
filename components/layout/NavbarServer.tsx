import { sanityClient } from "@/lib/sanity.client";
import { announcementQuery } from "@/lib/sanity.queries";
import NavbarClient from "./NavbarClient";   // ✅ Correct file

export default async function NavbarServer() {
  const announcements = await sanityClient.fetch(announcementQuery);

  

  return <NavbarClient announcements={announcements || []} />;
}
