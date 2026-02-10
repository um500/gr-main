"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, CalendarDays } from "lucide-react";

const goldenColor = "#D4AF37";

export default function PropertyCard({
  property,
  onEnquire,
}: {
  property: any;
  onEnquire?: (p: any) => void;
}) {
  const images =
    property.images?.map((img: any) => img.asset?.url).filter(Boolean) || [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  // ✅ SAFE LOCATION TEXT (STRING ONLY)
  const locationText =
    typeof property.location === "string"
      ? property.location
      : property.location?.name || "";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden max-w-[360px]"
    >
      {/* IMAGE */}
      <div className="relative h-[240px] w-full">
        {images[index] && (
          <Image
            src={images[index]}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        )}

        {property.featured && (
          <span
            className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-semibold text-black"
            style={{ backgroundColor: goldenColor }}
          >
            Featured
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">
          {property.title}
        </h3>

        {/* ✅ FIXED LOCATION */}
        {locationText && (
          <p className="text-sm text-gray-500">
            {locationText}
          </p>
        )}

        {/* UNITS */}
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          {property.units?.map((unit: any, i: number) => (
            <div key={i} className="flex items-start gap-2">
              <BedDouble size={16} className="mt-0.5 text-gray-500" />
              <span>
                <strong>{unit.beds}</strong> • {unit.size} Sq Ft •{" "}
                <strong>AED {unit.price}</strong>
              </span>
            </div>
          ))}
        </div>

        {property.handover && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <CalendarDays size={16} />
            <span>Handover: {property.handover}</span>
          </div>
        )}

        <button
          onClick={() => onEnquire?.(property)}
          className="w-full py-3 rounded-xl font-semibold text-black hover:opacity-90"
          style={{ backgroundColor: goldenColor }}
        >
          Enquire Now
        </button>
      </div>
    </motion.div>
  );
}
