"use client";

import { useState, useEffect } from "react";

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
    text: "I had a truly excellent experience with them. From the very beginning, the team was professional, transparent, and extremely supportive. All of them are very hard workers and carrying with very positive attitude. They have very tight follow up with clients and trust they have build with their client is remarkable.",
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
    meta: "2 reviews · 1 photo · 4 months ago",
    avatarInitial: "S",
  },
];

function QuoteIcon() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
      <path
        d="M0 32V19.2C0 15.7 0.6 12.5 1.7 9.6C2.9 6.6 4.7 3.9 7.2 1.6L12.8 5.6C10.9 7.5 9.6 9.5 8.7 11.6C7.9 13.7 7.5 15.9 7.5 18.2H14V32H0ZM22 32V19.2C22 15.7 22.6 12.5 23.7 9.6C24.9 6.6 26.7 3.9 29.2 1.6L34.8 5.6C32.9 7.5 31.6 9.5 30.7 11.6C29.9 13.7 29.5 15.9 29.5 18.2H36V32H22Z"
        fill="#C4A265"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4A843">
      <path d="M12 2L15 8.3L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L8.9 8.3L12 2Z" />
    </svg>
  );
}

export default function Terminology() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B8943E] mb-4 font-semibold">
            Client Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1a1a1a]">
            What Our Clients Say
          </h2>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="min-w-full flex justify-center">
                {/* CARD (auto height) */}
                <div className="bg-white rounded-xl p-10 border shadow-sm max-w-2xl w-full">
                  <QuoteIcon />

                  <p className="mt-6 italic text-[#444] leading-relaxed font-serif">
                    “{item.text}”
                  </p>

                  <div className="flex gap-1 mt-6">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-9 h-9 rounded-full bg-[#E8E0D4] text-[#8B7355] flex items-center justify-center font-semibold">
                      {item.avatarInitial}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.meta}</p>
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
              className={`h-[10px] rounded-full transition-all duration-300
              ${i === index ? "w-7 bg-[#C4A44A]" : "w-2.5 bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
