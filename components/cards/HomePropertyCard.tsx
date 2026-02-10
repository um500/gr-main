"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BedDouble, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const goldenColor = "#D4AF37";

export default function HomePropertyCard({
  property,
  onEnquire,
}: {
  property: any;
  onEnquire?: (p: any) => void;
}) {
  const images =
    property.images?.map((i: any) => i.asset?.url).filter(Boolean) || [];

  const [index, setIndex] = useState(0);

  /* auto slider */
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(t);
  }, [images.length]);

  // ✅ SAFE LOCATION TEXT
  const locationText =
    typeof property.location === "string"
      ? property.location
      : property.location?.name || "";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden
                 w-full max-w-[380px] mx-auto"
    >
      {/* IMAGE */}
      <div className="relative h-[220px] w-full">
        {images[index] && (
          <Image
            src={images[index]}
            alt={property.title}
            fill
            className="object-cover"
          />
        )}

        {property.featured && (
          <span
            className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full text-black"
            style={{ backgroundColor: goldenColor }}
          >
            Featured
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* TITLE */}
        <h3 className="text-lg font-semibold mb-1">
          {property.title}
        </h3>

        {/* ✅ FIXED LOCATION */}
        {locationText && (
          <p className="text-sm text-gray-500 mb-4">
            {locationText}
          </p>
        )}

        {/* UNITS */}
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          {property.units?.slice(0, 2).map((u: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <BedDouble size={15} className="text-gray-400" />
              <span>
                {u.beds} Bed • {u.size} Sq Ft •{" "}
                <strong>AED {u.price}</strong>
              </span>
            </div>
          ))}
        </div>

        {/* HANDOVER */}
        {property.handover && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <CalendarDays size={15} />
            <span>Handover: {property.handover}</span>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onEnquire?.(property)}
          className="relative z-40 pointer-events-auto
                     w-full py-3 rounded-xl font-semibold text-black cursor-pointer
                     transition hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: goldenColor }}
        >
          Enquire Now
        </button>
      </div>
    </motion.div>
  );
}
