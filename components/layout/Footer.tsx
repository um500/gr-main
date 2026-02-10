import { MapPin, Phone, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiLinkedin } from "react-icons/si";
import Image from "next/image";


export default function Footer() {

  return (
    <footer
      className="w-full"
      style={{ backgroundColor: "#1E2A38", color: "#ccc" }}
      data-testid="section-footer"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center">
  <img
    src="/assets/logo.png"
    alt="GR Premium Logo"
    className="w-12 h-12 object-contain"
  />
</div>


              <div>
                <h3
                  className="text-white text-sm font-bold leading-tight"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                  data-testid="text-company-name"
                >
                  GR Premium
                </h3>
                <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "#aaa" }}>
                  Properties LLC
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }}
              data-testid="text-company-desc"
            >
              Your trusted partner in finding luxury properties in Dubai and beyond. We offer exclusive access to premium real estate opportunities.
            </p>
            <div className="flex items-center gap-3" data-testid="social-icons">
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors" data-testid="link-facebook">
                <SiFacebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors" data-testid="link-instagram">
                <SiInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors" data-testid="link-twitter">
                <SiX className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors" data-testid="link-linkedin">
                <SiLinkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-[0.12em] mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              data-testid="text-quick-links-title"
            >
              Quick Links
            </h4>
            <ul className="space-y-3" data-testid="list-quick-links">
              {["Home", "About Us", "Properties", "How It Works", "Gallery", "Contact Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }}
                    data-testid={`link-${link.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-[0.12em] mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              data-testid="text-properties-title"
            >
              Properties
            </h4>
            <ul className="space-y-3" data-testid="list-properties">
              {["Apartments", "Villas", "Penthouses", "Townhouses", "Off-Plan Projects"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }}
                    data-testid={`link-${link.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-[0.12em] mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              data-testid="text-contact-title"
            >
              Contact Info
            </h4>
            <ul className="space-y-4" data-testid="list-contact">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C4A265" }} />
                <span className="text-sm" style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }} data-testid="text-address">
                  Business Bay, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#C4A265" }} />
                <span className="text-sm" style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }} data-testid="text-phone">
                  +971 50 123 4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#C4A265" }} />
                <span className="text-sm" style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }} data-testid="text-email">
                  info@grpremium.com
                </span>
              </li>
            </ul>
            <button
              className="mt-6 w-full px-6 py-3 font-semibold text-sm rounded-md transition-colors duration-300"
              style={{
                backgroundColor: "#D4A843",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
              }}
              data-testid="button-enquire-now"
            >
              Enquire Now
            </button>
          </div>

        </div>
      </div>

      <div
        className="border-t py-5 text-center"
        style={{ borderColor: "#2a3a4a" }}
      >
        <p
          className="text-xs"
          style={{ color: "#777", fontFamily: "'DM Sans', sans-serif" }}
          data-testid="text-copyright"
        >
          &copy; 2026 GR Premium Properties. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
