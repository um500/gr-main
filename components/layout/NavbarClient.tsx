"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import EnquiryModal from "@/components/ui/EnquiryModal";

/* 🌐 LANGUAGES */
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" }
];

export default function NavbarClient({
  announcements = [],
}: {
  announcements?: any[];
}) {

  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const [openEnquiry, setOpenEnquiry] = useState(false);

  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const langRef = useRef<HTMLDivElement>(null);

  /* BODY LOCK */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* CLOSE LANGUAGE ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <>
      {/* ================= TOP SCROLLING BAR ================= */}
      <div className="marquee-container bg-yellow-500 text-black text-sm py-2 z-[1500]">
        {announcements?.length > 0 && (
  <div className="marquee-content font-medium px-4">
    {announcements.map((item, index) => (
      <span key={index} className="mx-6">
        {item.eventDate && (
          <>📅 {new Date(item.eventDate).toLocaleDateString("en-IN")} </>
        )}
        {item.city && <>– {item.city} </>}
        {item.title} |
      </span>
    ))}
  </div>
)}

      </div>

      {/* ================= HEADER ================= */}
      <header className="fixed top-[32px] left-0 w-full z-[1000] bg-black/40 backdrop-blur">
        <nav className="flex items-center px-6 lg:px-14 py-2 text-white">
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/logo.png"
              alt="GR Premium Properties"
              width={90}
              height={30}
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-6 ml-auto text-sm uppercase tracking-wider">
            <li><Link href="/" className={isActive("/") ? "text-yellow-400" : ""}>Home</Link></li>
            <li><Link href="/about" className={isActive("/about") ? "text-yellow-400" : ""}>About Us</Link></li>
            <li><Link href="/properties" className={isActive("/properties") ? "text-yellow-400" : ""}>Properties</Link></li>
            <li><Link href="/blog" className={isActive("/blog") ? "text-yellow-400" : ""}>Blog</Link></li>

            <li className="relative group">
              <span className="cursor-pointer hover:text-yellow-400">
                Feature Plan ▾
              </span>
              <div className="absolute top-full left-0 hidden group-hover:block bg-black rounded shadow-lg">
                <Link
                  href="/developers"
                  className="block px-4 py-2 hover:bg-white/10"
                >
                  Developers
                </Link>
              </div>
            </li>

            <li><Link href="/contact" className={isActive("/contact") ? "text-yellow-400" : ""}>Contact Us</Link></li>
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="ml-auto lg:ml-6 flex items-center gap-4">
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-yellow-400 text-sm"
              >
                🌐 {currentLang.toUpperCase()} ▾
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-xl overflow-hidden z-[2000]">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setDrawerOpen(true)}
              className="text-xl border border-white/40 rounded px-3 py-1"
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* ================= DRAWER ================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/50">
          <div className="absolute right-0 top-0 h-full w-[320px] bg-white text-black p-6 shadow-2xl overflow-y-auto z-[3100]">
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-2xl absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-6">
              GR Premium Properties
            </h2>

            <ul className="space-y-5 text-sm uppercase tracking-wider font-medium">
              <li><Link href="/" onClick={() => setDrawerOpen(false)}>Home</Link></li>
              <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Us</Link></li>
              <li><Link href="/properties" onClick={() => setDrawerOpen(false)}>Properties</Link></li>
              <li><Link href="/blog" onClick={() => setDrawerOpen(false)}>Blog</Link></li>

              <li>
                <button
                  onClick={() => setFeatureOpen(!featureOpen)}
                  className="flex justify-between w-full"
                >
                  Feature Plan
                  <span>{featureOpen ? "−" : "+"}</span>
                </button>

                {featureOpen && (
                  <ul className="ml-4 mt-3 space-y-3 text-xs">
                    <li>
                      <Link
                        href="/developers"
                        onClick={() => setDrawerOpen(false)}
                      >
                        Developers
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li><Link href="/how-it-works" onClick={() => setDrawerOpen(false)}>How It Works</Link></li>
              <li><Link href="/Media" onClick={() => setDrawerOpen(false)}>Media</Link></li>
              <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact Us</Link></li>

              <li>
                <button
                  onClick={() => {
                    setOpenEnquiry(true);
                    setDrawerOpen(false);
                  }}
                  className="w-full bg-yellow-500 text-black py-2 rounded font-semibold"
                >
                  Enquire Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <EnquiryModal open={openEnquiry} onClose={() => setOpenEnquiry(false)} />
    </>
  );
}
