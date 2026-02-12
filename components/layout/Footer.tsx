"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiLinkedin } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import EnquiryModal from "@/components/ui/EnquiryModal";

const goldenColor = "#D4A843";

export default function Footer() {
  const [open, setOpen] = useState(false);

  /* ===== Scroll Lock Fix ===== */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <footer className="w-full bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* ================= COMPANY ================= */}
            <div>
              <div className="flex items-center gap-3 mb-6">
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
                  <p className="text-[10px] tracking-[0.15em] uppercase text-gray-500">
                    Properties LLC
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Your trusted partner in finding luxury properties in Dubai and beyond.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[SiFacebook, SiInstagram, SiX, SiLinkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center
                               border border-gray-600
                               hover:border-[#D4A843]
                               hover:text-white
                               transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about" },
                  { name: "Properties", path: "/properties" },
                  { name: "Blog", path: "/blog" },
                  { name: "Contact Us", path: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= PROPERTIES ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Properties
              </h4>
              <ul className="space-y-3">
                {["Apartments", "Villas", "Penthouses", "Townhouses"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="/properties"
                        className="text-sm hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* ================= CONTACT ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Contact Info
              </h4>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#D4A843]" />
                  Business Bay, Dubai, UAE
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4A843]" />
                  +971 50 123 4567
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4A843]" />
                  info@grpremium.com
                </li>
              </ul>

              {/* Enquiry Button */}
              <button
                onClick={() => setOpen(true)}
                className="mt-8 w-full px-6 py-3 font-semibold text-black text-sm rounded-md
                           transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{ backgroundColor: goldenColor }}
              >
                Enquire Now
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a3a4a] py-6 text-center">
          <p className="text-xs text-gray-500">
            © 2026 GR Premium Properties. All rights reserved.
          </p>
        </div>
      </footer>

      {/* GLOBAL ENQUIRY MODAL */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
