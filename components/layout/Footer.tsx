"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiLinkedin } from "react-icons/si";
import Image from "next/image";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer
        className="w-full"
        style={{ backgroundColor: "#1E2A38", color: "#ccc" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* ================= COMPANY ================= */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Image
                  src="/assets/logo.png"
                  alt="GR Premium Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-white text-sm font-bold leading-tight">
                    GR Premium
                  </h3>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400">
                    Properties LLC
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-6">
                Your trusted partner in finding luxury properties in Dubai and beyond.
              </p>

              <div className="flex items-center gap-3">
                {[SiFacebook, SiInstagram, SiX, SiLinkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["Home", "About Us", "Properties", "Gallery", "Contact Us"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= PROPERTIES ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-5">
                Properties
              </h4>
              <ul className="space-y-3">
                {["Apartments", "Villas", "Penthouses", "Townhouses"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= CONTACT ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-5">
                Contact Info
              </h4>

              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#C4A265]" />
                  Business Bay, Dubai, UAE
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C4A265]" />
                  +971 50 123 4567
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C4A265]" />
                  info@grpremium.com
                </li>
              </ul>

              {/* 🔥 Enquiry Button Connected */}
              <button
                onClick={() => setOpen(true)}
                className="mt-6 w-full px-6 py-3 font-semibold text-sm rounded-md bg-[#D4A843] hover:opacity-90 transition"
              >
                Enquire Now
              </button>
            </div>

          </div>
        </div>

        <div className="border-t border-[#2a3a4a] py-5 text-center">
          <p className="text-xs text-gray-500">
            © 2026 GR Premium Properties. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 🔥 GLOBAL MODAL */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
