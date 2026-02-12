"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, CalendarDays, Download } from "lucide-react";
import BrochureModal from "@/components/ui/BrochureModal";

const goldenColor = "#C9A227";
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

  const brochureUrl = property?.brochure?.asset?.url;
console.log("Brochure URL:", brochureUrl);

  const [index, setIndex] = useState(0);
  const [openBrochure, setOpenBrochure] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  const locationText =
    typeof property?.location === "string"
      ? property.location
      : property?.location?.name || "";

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-[#101827] text-black dark:text-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300"
      >
        <div className="relative h-[240px] w-full">
          <Image
            src={images[index] || PLACEHOLDER}
            alt={property?.title || "Property"}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-1">{property?.title}</h3>

          {locationText && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {locationText}
            </p>
          )}

          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
            {property?.units?.slice(0, 2).map((unit: any, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <BedDouble size={16} />
                <span>
                  <strong>{unit?.beds}</strong> Bed • {unit?.size} Sq Ft •{" "}
                  <strong>AED {unit?.price}</strong>
                </span>
              </div>
            ))}
          </div>

          {property?.handover && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <CalendarDays size={16} />
              <span>Handover: {property.handover}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setOpenBrochure(true)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Brochure
            </button>

            <button
              onClick={() => onEnquire?.(property)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-black transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: goldenColor }}
            >
              Enquire
            </button>
          </div>
        </div>
      </motion.div>

      <BrochureModal
        open={openBrochure}
        onClose={() => setOpenBrochure(false)}
        pdfUrl={brochureUrl}
        propertyName={property?.title}
      />
    </>
  );
}
