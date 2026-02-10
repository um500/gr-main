"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

/* ================= TYPES ================= */

interface HeroSlide {
  title: string;
  subtitle?: string;
  image: string;
  active: boolean;
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

/* ================= COMPONENT ================= */

export default function Hero({
  slides,
  ctaText,
  communities,
}: HeroProps) {
  const activeSlides = slides.filter((s) => s.active);

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [buyType, setBuyType] = useState<"BUY" | "RENT">("BUY");
  const [showBuyMenu, setShowBuyMenu] = useState(false);

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  /* ================= SLIDER LOGIC ================= */

  const changeSlide = (newIndex: number) => {
    if (isAnimating || activeSlides.length < 2) return;
    setPrevIndex(index);
    setIsAnimating(true);
    setIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    if (activeSlides.length < 2) return;
    const timer = setInterval(() => {
      changeSlide((index + 1) % activeSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [index, activeSlides.length, isAnimating]);

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setShowBuyMenu(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= FILTER ================= */

  const filtered = query.trim()
    ? communities.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.area.toLowerCase().includes(query.toLowerCase())
      )
    : communities.slice(0, 6);

  if (!activeSlides.length) return null;

  /* ================= JSX ================= */

  return (
    <section className="relative h-[90vh] w-full">
      {/* IMAGE SLIDER */}
      <div className="absolute inset-0 overflow-hidden">
        {activeSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-transform duration-700 ${
              i === index
                ? "translate-x-0 z-[1]"
                : i === prevIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl text-white px-4 md:ml-36">
          <h1 className="text-5xl font-serif">
            {activeSlides[index].title}
          </h1>
          <p className="mt-2">
            {activeSlides[index].subtitle}
          </p>

          <button className="mt-6 border px-6 py-3">
            {ctaText}
          </button>

          {/* SEARCH */}
          <div ref={searchRef} className="relative mt-10 max-w-xl">
            <div className="bg-white flex items-center p-2 rounded-lg text-gray-900">

              {/* BUY / RENT */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowBuyMenu((p) => !p);
                    setShowSuggestions(false);
                  }}
                  style={{ backgroundColor: goldenColor }}
                  className="px-4 py-2 rounded text-white font-medium flex items-center gap-1"
                >
                  {buyType} ▼
                </button>

                {showBuyMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 shadow-xl rounded-md z-[10000]">
                    {["BUY", "RENT"].map((t) => (
                      <div
                        key={t}
                        onClick={() => {
                          setBuyType(t as "BUY" | "RENT");
                          setShowBuyMenu(false);
                        }}
                        className={`px-4 py-2 cursor-pointer hover:bg-amber-50 ${
                          buyType === t
                            ? "bg-amber-100 font-semibold"
                            : ""
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* INPUT */}
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Community or Building"
                className="flex-1 px-4 outline-none bg-transparent text-gray-800"
              />

              <Search className="mr-3 text-gray-500" />
            </div>

            {/* SUGGESTIONS */}
            {showSuggestions && filtered.length > 0 && (
              <div className="absolute left-0 top-full w-full bg-white text-gray-900 shadow-2xl z-[9999] max-h-64 overflow-y-auto">
                {filtered.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => {
                      setQuery(c.name);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-amber-50"
                  >
                    <p className="font-medium text-gray-900">
                      {c.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {c.area}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LEFT ARROW */}
<button
  onClick={() => changeSlide((index - 1 + activeSlides.length) % activeSlides.length)}
  className="
    absolute 
    left-6 
    top-1/2 
    -translate-y-1/2 
    z-20 
    bg-black/40 
    hover:bg-black/60
    p-3 
    rounded-full 
    text-white 
    transition
  "
>
  <ChevronLeft size={24} />
</button>

{/* RIGHT ARROW */}
<button
  onClick={() => changeSlide((index + 1) % activeSlides.length)}
  className="
    absolute 
    right-6 
    top-1/2 
    -translate-y-1/2 
    z-20 
    bg-black/40 
    hover:bg-black/60
    p-3 
    rounded-full 
    text-white 
    transition
  "
>
  <ChevronRight size={24} />
</button>
{/* SLIDER DOTS */}
<div
  className="
    absolute 
    bottom-8 
    left-1/2 
    -translate-x-1/2 
    z-20 
    flex 
    gap-3
  "
>
  {activeSlides.map((_, i) => (
    <button
      key={i}
      onClick={() => changeSlide(i)}
      className={`
        transition-all 
        duration-300
        rounded-full
        ${
          i === index
            ? "w-8 h-2 bg-white"
            : "w-2 h-2 bg-white/50 hover:bg-white"
        }
      `}
    />
  ))}
</div>

    </section>
  );
}
