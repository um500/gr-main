"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Community = {
  _id: string;
  name: string;
  area: string;
  slug: {
    current: string;
  };
};
interface Props {
  communities: any[];
  initialCommunity?: string;
  initialPurpose?: string;
}


export default function PropertyFilter({
  communities,
  initialCommunity = "",
  initialPurpose = "BUY",
}: Props) {
  const router = useRouter();

  // ================= STATE =================
  const [community, setCommunity] = useState(initialCommunity);
  const [purpose, setPurpose] = useState(initialPurpose);
  const [query, setQuery] = useState("");                 // UI text
  const [communitySlug, setCommunitySlug] = useState(""); // ✅ actual filter value
  const [open, setOpen] = useState(false);

  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ================= FILTERED COMMUNITIES =================
  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.area.toLowerCase().includes(query.toLowerCase())
  );


  const resetFilters = () => {
    setQuery("");
    setCommunitySlug("");
    setPurpose("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setOpen(false);

    router.push("/properties"); // 🔥 URL reset
  };

  // ================= AUTO APPLY FILTER =================
  useEffect(() => {
    const params = new URLSearchParams();

    if (communitySlug) params.set("community", communitySlug); // ✅ SLUG
    if (purpose) params.set("purpose", purpose);
    if (type) params.set("type", type);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);

    router.push(`/properties?${params.toString()}`);
  }, [communitySlug, purpose, type, minPrice, maxPrice, router]);

  return (
    <section className="bg-[#FAF9F7] py-6 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">

          {/* ================= COMMUNITY SEARCH ================= */}
          <div className="relative w-full lg:w-[280px] z-50">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A24D]">
              🔍
            </span>

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCommunitySlug(""); // reset slug while typing
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Community or Area"
              className="w-full bg-white border border-[#E6D3A3] rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none"
            />

            {/* ================= SUGGESTIONS ================= */}
            {open && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border max-h-64 overflow-y-auto z-[9999]">

                {(query ? filteredCommunities : communities)
                  .slice(0, 6)
                  .map((item) => (
                    <button
                      key={item._id}
                      onClick={() => {
                        setQuery(item.name);                           // UI
                        setCommunitySlug(item.slug?.current || "");   // SAFE
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#FAF9F7]"
                    >
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.area}</p>
                    </button>

                  ))}

                {query && filteredCommunities.length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-500">
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ================= BUY / RENT ================= */}
          <select
            className="luxury-filter"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="" disabled>
              Buy / Rent
            </option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          {/* ================= PROPERTY TYPE ================= */}
          <select
            className="luxury-filter"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Property Type
            </option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="penthouse">Penthouse</option>
            <option value="townhouse">Townhouse</option>
            <option value="studio">Studio</option>
          </select>

          {/* ================= MIN PRICE ================= */}
          <select
            className="luxury-filter"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          >
            <option value="" disabled>
              Min Price
            </option>
            <option value="500000">AED 500K</option>
            <option value="1000000">AED 1M</option>
            <option value="2000000">AED 2M</option>
          </select>

          {/* ================= MAX PRICE ================= */}
          <select
            className="luxury-filter"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="" disabled>
              Max Price
            </option>
            <option value="5000000">AED 5M</option>
            <option value="10000000">AED 10M</option>
            <option value="20000000">AED 20M+</option>
          </select>




          {/* ================= FIND (OPTIONAL) ================= */}
          <button
            onClick={() => {
              router.push(
                `/properties?community=${encodeURIComponent(
                  community
                )}&purpose=${purpose}`
              );
            }}
          >
            Find
          </button>

          {/* ================= RESET FILTER ================= */}
          <button
            onClick={resetFilters}
            className="border border-[#D4AF37] text-white px-6 py-3 rounded-full font-semibold bg-[#D4AF37] hover:text-black transition"
          >
            Reset
          </button>

        </div>
      </div>
    </section>
  );
}
