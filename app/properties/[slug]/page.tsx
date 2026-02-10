import { sanityClient } from "@/lib/sanity.client";
import { propertiesByDeveloperQuery } from "@/lib/sanity.queries";
import PropertyCard from "@/components/cards/PropertyCard";

export default async function DeveloperPage({
  params,
}: {
  params: { slug: string };
}) {
  const properties = await sanityClient.fetch(
    propertiesByDeveloperQuery,
    { slug: params.slug }
  );

  return (
    <main className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-12 capitalize">
          Projects by {params.slug.replace(/-/g, " ")}
        </h1>

        {properties.length === 0 ? (
          <p className="text-gray-500">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {properties.map((property: any) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
