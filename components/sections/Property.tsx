

import { sanityClient } from "@/lib/sanity.client";
import { featuredPropertiesQuery } from "@/lib/sanity.queries";
import PropertyClient from "./PropertyClient";

export default async function Property() {
  const properties = await sanityClient.fetch(featuredPropertiesQuery);

  return <PropertyClient properties={properties} />;
}
