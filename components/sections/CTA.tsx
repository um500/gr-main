"use client";

import { useState, useEffect } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function CtaSection() {
  const [open, setOpen] = useState(false);

  // Optional: scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* ================= CTA SECTION ================= */}
      <section className="relative py-14 md:py-22 text-white text-center">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/Emar.png')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1E2837]/80" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] leading-tight mb-5 max-w-xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            Ready to Find Your Dream Property?
          </h2>

          <p
            className="text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed text-white/80"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Let our experts guide you to the perfect investment opportunity in
            Dubai&apos;s thriving real estate market.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-3 font-semibold text-sm rounded-md transition hover:opacity-90"
            style={{
              backgroundColor: "#D4A843",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Schedule a Consultation
          </button>
        </div>
      </section>

      {/* ================= REAL MODAL ================= */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
