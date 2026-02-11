"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

interface HeroSlide {
  title: string;
  subtitle?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  active?: boolean;
}

interface Community {
  _id: string;
  name: string;
  area: string;
}

interface HeroProps {
  slides: HeroSlide[];
  ctaText: string;
  communities: Community[];
}

const goldenColor = "#C9A227";
const PLACEHOLDER_IMAGE = "/images/placeholder.png";

/* ================= COMPONENT ================= */

export default function Hero({
  slides = [],
  ctaText,
  communities = [],
}: HeroProps) {
  /* 🔥 SAFEST SLIDE SELECTION */
  const validSlides =
    slides.filter((s) => s?.image?.asset?.url) || [];

  const activeSlides =
    validSlides.filter((s) => s.active) ||
    validSlides;

  const slidesToUse =
    activeSlides.length > 0 ? activeSlides : validSlides;

  /* 🛑 FINAL SAFETY */
  if (!slidesToUse || slidesToUse.length === 0) {
    return (
      <section className="h-[80vh] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Hero content loading…
        </p>
      </section>
    );
  }

  /* ================= STATE ================= */

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [buyType, setBuyType] = useState<"BUY" | "RENT">("BUY");
  const [showBuyMenu, setShowBuyMenu] = useState(false);

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ================= SLIDER ================= */

  const changeSlide = (newIndex: number) => {
    if (isAnimating || slidesToUse.length < 2) return;
    setPrevIndex(index);
    setIsAnimating(true);
    setIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(
      `/properties?community=${encodeURIComponent(query)}&purpose=${buyType}`
    );

    setShowSuggestions(false);
  };


  useEffect(() => {
    if (slidesToUse.length < 2) return;
    const timer = setInterval(() => {
      changeSlide((index + 1) % slidesToUse.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [index, slidesToUse.length, isAnimating]);

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setShowBuyMenu(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= FILTER ================= */

  const filtered = query.trim()
    ? communities.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.area.toLowerCase().includes(query.toLowerCase())
    )
    : communities.slice(0, 6);

  /* ================= JSX ================= */

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* IMAGE SLIDER */}
      <div className="absolute inset-0">
        {slidesToUse.map((slide, i) => {
          const imageUrl =
            slide?.image?.asset?.url || PLACEHOLDER_IMAGE;

          return (
            <div
              key={i}
              className={`absolute inset-0 transition-transform duration-700 ${i === index
                  ? "translate-x-0 z-[1]"
                  : i === prevIndex
                    ? "-translate-x-full"
                    : "translate-x-full"
                }`}
            >
              <img
                src={imageUrl}
                alt={slide.title || "Hero Image"}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl text-white px-4 md:ml-36">
          <h1 className="text-5xl font-serif">
            {slidesToUse[index].title}
          </h1>

          {slidesToUse[index].subtitle && (
            <p className="mt-2">
              {slidesToUse[index].subtitle}
            </p>
          )}

          <button className="mt-6 border px-6 py-3">
            {ctaText}
          </button>

          {/* SEARCH */}
          <div ref={searchRef} className="relative mt-10 w-full max-w-xl px-2 sm:px-0">
            <div className="bg-white flex items-center w-full p-2 rounded-lg text-gray-900 overflow-hidden">
              {/* BUY / RENT */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowBuyMenu((p) => !p);
                    setShowSuggestions(false);
                  }}
                  style={{ backgroundColor: goldenColor }}
                  className="px-3 py-2 rounded text-white font-medium whitespace-nowrap text-sm flex-shrink-0"
                >
                  {buyType} ▼
                </button>

                {showBuyMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-md z-[10000]">
                    {["BUY", "RENT"].map((t) => (
                      <div
                        key={t}
                        onClick={() => {
                          setBuyType(t as "BUY" | "RENT");
                          setShowBuyMenu(false);
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-amber-50"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Community or Building"
                className="flex-1 min-w-0 px-0 outline-none bg-transparent text-sm"
              />

              <button
                onClick={() => {
                  if (!query.trim()) return;

                  router.push(
                    `/properties?community=${encodeURIComponent(
                      query
                    )}&purpose=${buyType}`
                  );
                }}
                className="mr-3 text-gray-700 hover:text-black"
              >
                Search
              </button>



            </div>

            {showSuggestions && filtered.length > 0 && (
              <div className="absolute left-0 top-full w-full bg-white shadow-2xl z-[9999] text-black">

                {filtered.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => {
                      window.location.href = `/properties?search=${encodeURIComponent(c.name)}&mode=${buyType}`;
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-amber-50 text-black"
                  >
                    <p className="font-medium text-black">{c.name}</p>
                    <p className="text-sm text-black">{c.area}</p>
                  </div>

                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={() =>
          changeSlide(
            (index - 1 + slidesToUse.length) % slidesToUse.length
          )
        }
        className="absolute left-6 top-1/2 z-20 bg-black/40 p-3 rounded-full text-white"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() =>
          changeSlide((index + 1) % slidesToUse.length)
        }
        className="absolute right-6 top-1/2 z-20 bg-black/40 p-3 rounded-full text-white"
      >
        <ChevronRight />
      </button>
    </section>
  );
}
