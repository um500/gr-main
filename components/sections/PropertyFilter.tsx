"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  communities: any[];
}

export default function PropertyFilter({ communities }: Props) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [communitySlug, setCommunitySlug] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Close suggestion when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCommunities = communities.filter(
    (c) =>
      c.name?.toLowerCase().includes(query.toLowerCase()) ||
      c.area?.toLowerCase().includes(query.toLowerCase())
  );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (communitySlug) {
      params.set("community", communitySlug);
    } else if (query.trim()) {
      params.set("search", query.trim());
    }

    if (purpose) params.set("purpose", purpose);
    if (bedroom) params.set("bed", bedroom);
    if (type) params.set("type", type);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };


  const resetFilters = () => {
    setQuery("");
    setCommunitySlug("");
    setPurpose("");
    setBedroom("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/properties");
  };

  return (
    <section className="sticky top-[80px] z-50 bg-white dark:bg-black border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 overflow-visible">
        <div className="flex flex-wrap items-center gap-3">

          {/* SEARCH */}
          <div
            ref={containerRef}
            className="relative flex-1 min-w-[260px]"
          >
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCommunitySlug("");
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Community or Area"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-full px-5 py-3 focus:outline-none"
            />

            {searchOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-y-auto z-[9999]">

                {(query ? filteredCommunities : communities)
                  .slice(0, 6)
                  .map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => {
                        setQuery(item.name);
                        setCommunitySlug(item.slug?.current || "");
                        setSearchOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <p className="text-sm font-semibold text-black dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.area}
                      </p>
                    </button>
                  ))}

                {query && filteredCommunities.length === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCommunitySlug("");
                      setSearchOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Search for "<strong>{query}</strong>"
                  </button>
                )}
              </div>
            )}
          </div>

          {/* SELECTS */}
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="filter-select">
            <option value="">Buy / Rent</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          <select value={bedroom} onChange={(e) => setBedroom(e.target.value)} className="filter-select">
            <option value="">Bedrooms</option>
            <option value="studio">Studio</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Bed</option>
            <option value="3">3 Bed</option>
            <option value="4">4+ Bed</option>
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)} className="filter-select">
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="penthouse">Penthouse</option>
            <option value="townhouse">Townhouse</option>
          </select>

          <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="filter-select">
            <option value="">Min Price</option>
            <option value="500000">AED 500K</option>
            <option value="1000000">AED 1M</option>
          </select>

          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="filter-select">
            <option value="">Max Price</option>
            <option value="5000000">AED 5M</option>
            <option value="10000000">AED 10M</option>
          </select>

          {/* BUTTONS */}
          <button
            onClick={applyFilters}
            className="bg-[#D4AF37] text-white px-6 py-3 rounded-full whitespace-nowrap"
          >
            Find
          </button>

          <button
            onClick={resetFilters}
            className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-full whitespace-nowrap"
          >
            Reset
          </button>

        </div>
      </div>
    </section>
  );
}
