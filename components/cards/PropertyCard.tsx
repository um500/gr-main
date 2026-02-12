"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, CalendarDays } from "lucide-react";

const goldenColor = "#D4AF37";
const PLACEHOLDER = "/images/placeholder.jpg";

export default function PropertyCard({
  property,
  onEnquire,
}: {
  property: any;
  onEnquire?: (p: any) => void;
}) {
  const images =
    property?.images?.map((img: any) => img?.asset?.url).filter(Boolean) || [];

  const [index, setIndex] = useState(0);

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);

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
        bg-white dark:bg-[#101827]
        text-black dark:text-white
        rounded-3xl
        shadow-lg hover:shadow-2xl
        overflow-hidden
        transition-all duration-300
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-[240px] w-full">
        <Image
          src={images[index] || PLACEHOLDER}
          alt={property?.title || "Property"}
          fill
          className="object-cover"
        />

        {property?.featured && (
          <span
            className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-semibold text-black"
            style={{ backgroundColor: goldenColor }}
          >
            Featured
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6">
        {/* TITLE */}
        <h3 className="text-xl font-bold mb-1">
          {property?.title}
        </h3>

        {/* LOCATION */}
        {locationText && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {locationText}
          </p>
        )}

        {/* ================= UNITS ================= */}
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {property?.units?.slice(0, 3).map((unit: any, i: number) => (
            <div key={i} className="flex items-start gap-2">
              <BedDouble size={16} className="mt-0.5 text-gray-500 dark:text-gray-400" />
              <span>
                <strong>{unit?.beds}</strong> Bed • {unit?.size} Sq Ft •{" "}
                <strong className="text-black dark:text-white">
                  AED {unit?.price}
                </strong>
              </span>
            </div>
          ))}
        </div>

        {/* ================= HANDOVER ================= */}
        {property?.handover && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <CalendarDays size={16} />
            <span>Handover: {property.handover}</span>
          </div>
        )}

        {/* ================= CTA BUTTON ================= */}
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
