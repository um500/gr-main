"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BedDouble, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const goldenColor = "#D4AF37";
const PLACEHOLDER = "/images/placeholder.jpg";

export default function HomePropertyCard({
  property,
  onEnquire,
}: {
  property: any;
  onEnquire?: (p: any) => void;
}) {
  const images =
    property?.images?.map((i: any) => i?.asset?.url).filter(Boolean) || [];

  const [index, setIndex] = useState(0);

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  /* ================= SAFE LOCATION ================= */
  const locationText =
    typeof property?.location === "string"
      ? property.location
      : property?.location?.name || "";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="
        bg-white dark:bg-[#111827]
        rounded-3xl
        shadow-md hover:shadow-2xl
        overflow-hidden
        w-full max-w-[380px] mx-auto
        transition-colors duration-300
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-[230px] w-full">
        <Image
          src={images[index] || PLACEHOLDER}
          alt={property?.title || "Property"}
          fill
          className="object-cover"
        />

        {property?.featured && (
          <span
            className="absolute top-4 left-4 px-4 py-1.5 text-xs font-semibold rounded-full text-black"
            style={{ backgroundColor: goldenColor }}
          >
            Featured
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6">

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {property?.title}
        </h3>

        {/* LOCATION */}
        {locationText && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {locationText}
          </p>
        )}

        {/* UNITS */}
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {property?.units?.slice(0, 2).map((u: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <BedDouble size={15} className="text-gray-400" />
              <span>
                <strong>{u?.beds}</strong> Bed • {u?.size} Sq Ft •{" "}
                <strong>AED {u?.price}</strong>
              </span>
            </div>
          ))}
        </div>

        {/* HANDOVER */}
        {property?.handover && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <CalendarDays size={15} />
            <span>Handover: {property.handover}</span>
          </div>
        )}

        {/* CTA BUTTON */}
        <button
          onClick={() => onEnquire?.(property)}
          className="
            w-full py-3 rounded-xl font-semibold
            text-black cursor-pointer
            transition-all duration-300
            hover:opacity-90 active:scale-[0.97]
          "
          style={{ backgroundColor: goldenColor }}
        >
          Enquire Now
        </button>
      </div>
    </motion.div>
  );
}
