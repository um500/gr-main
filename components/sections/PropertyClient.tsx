"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HomePropertyCard from "../cards/HomePropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";
import Link from "next/link";


const goldenColor = "#C9A227";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function PropertyClient({
  properties,
}: {
  properties: any[];
}) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  /* ✅ SAFE + STABLE HANDLER */
  const handleEnquire = useCallback((prop: any) => {
    if (!prop?.title) return;          // 🛡️ safety
    setSelectedProperty(prop.title);
    setOpenEnquiry(true);
  }, []);

  return (
    <>
      <motion.section
        className="bg-gray-200 py-20 px-4 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">

          {/* HEADING */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p
              className="text-sm tracking-widest font-semibold uppercase mb-3"
              style={{ color: goldenColor }}
            >
              Projects
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Properties
            </h2>

            <p className="text-gray-600 text-base">
              Discover our handpicked selection of premium real estate projects
              designed for luxury living and smart investment.
            </p>
          </div>

          {/* PROPERTY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((p) => (
              <HomePropertyCard
                key={p._id}
                property={p}
                onEnquire={handleEnquire} // ✅ clean & safe
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
  <Link href="/properties">
    <button
      className="px-10 py-3 rounded-full border-2 font-semibold
                 hover:bg-black hover:text-white transition cursor-pointer"
      style={{ borderColor: goldenColor }}
    >
      View All Properties →
    </button>
  </Link>
</div>

        </div>
      </motion.section>

      {/* ✅ ENQUIRY MODAL */}
      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        propertyName={selectedProperty}
      />
    </>
  );
}
