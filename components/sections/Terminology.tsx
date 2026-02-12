"use client";

import { useState, useEffect, useRef } from "react";

interface TestimonialItem {
  id: number;
  name: string;
  text: string;
  rating: number;
  meta: string;
  avatarInitial: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Anzu Chaudhary",
    text: "I had a truly excellent experience with them. From the very beginning, the team was professional, transparent, and extremely supportive. All of them are very hard workers and carrying with very positive attitude.",
    rating: 5,
    meta: "5 reviews · 4 months ago",
    avatarInitial: "A",
  },
  {
    id: 2,
    name: "Parul Singh",
    text: "Cordial people and seamless investment services. Appreciate it.",
    rating: 5,
    meta: "1 review · 4 months ago",
    avatarInitial: "P",
  },
  {
    id: 3,
    name: "Sirine Zaghdoudi",
    text: "A professional and welcoming environment provides excellent service and goes the extra mile for clients.",
    rating: 5,
    meta: "2 reviews · 4 months ago",
    avatarInitial: "S",
  },
];

const goldenColor = "#C9A227";

/* ================= ICONS ================= */

function QuoteIcon() {
  return (
    <svg width="36" height="30" viewBox="0 0 40 32" fill="none">
      <path
        d="M0 32V19.2C0 15.7 0.6 12.5 1.7 9.6C2.9 6.6 4.7 3.9 7.2 1.6L12.8 5.6C10.9 7.5 9.6 9.5 8.7 11.6C7.9 13.7 7.5 15.9 7.5 18.2H14V32H0ZM22 32V19.2C22 15.7 22.6 12.5 23.7 9.6C24.9 6.6 26.7 3.9 29.2 1.6L34.8 5.6C32.9 7.5 31.6 9.5 30.7 11.6C29.9 13.7 29.5 15.9 29.5 18.2H36V32H22Z"
        fill={goldenColor}
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={goldenColor}>
      <path d="M12 2L15 8.3L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L8.9 8.3L12 2Z" />
    </svg>
  );
}

/* ================= COMPONENT ================= */

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <section className="w-full py-20 bg-[#FAF8F5] dark:bg-[#0F172A] transition-colors duration-300 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.2em] uppercase font-semibold mb-4"
            style={{ color: goldenColor }}
          >
            Client Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 dark:text-white">
            What Our Clients Say
          </h2>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="min-w-full flex justify-center px-4">
                <div className="bg-white dark:bg-[#101827] rounded-2xl p-10 shadow-lg max-w-2xl w-full transition-all duration-300">

                  <QuoteIcon />

                  <p className="mt-6 italic text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
                    “{item.text}”
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1 mt-6">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  {/* User */}
                  <div className="flex items-center gap-3 mt-6">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm"
                      style={{
                        backgroundColor: "#E8E0D4",
                        color: "#8B7355",
                      }}
                    >
                      {item.avatarInitial}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.meta}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-[10px] rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8"
                  : "w-3"
              }`}
              style={{
                backgroundColor:
                  i === index ? goldenColor : "#D1D5DB",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
