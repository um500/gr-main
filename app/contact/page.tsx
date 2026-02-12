"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    emailjs
      .sendForm(
        "service_uyrhwx8",
        "template_yimkgyn",
        e.target,
        "lVPUd6uuppl88FX8U"
      )
      .then(() => {
        setSuccess("Enquiry sent successfully ✅");
        e.target.reset();
      })
      .catch(() => {
        setError("Something went wrong. Please try again ❌");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full overflow-hidden bg-[#FBF6E9] dark:bg-[#0f172a] transition-colors duration-300">

      {/* HERO */}
      <section className="relative h-[320px] sm:h-[420px] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 max-w-3xl">
          <p className="tracking-widest text-yellow-400 mb-2">GET IN TOUCH</p>
          <h1 className="text-4xl sm:text-5xl font-serif mb-4">Contact Us</h1>
          <p className="text-gray-200 text-sm sm:text-base">
            Start your property journey with confidence.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">

        {/* LEFT INFO */}
        <div>
          <p className="text-yellow-500 tracking-widest mb-2">
            CONTACT INFORMATION
          </p>
          <h2 className="text-3xl font-serif mb-8 dark:text-white">
            Get in Touch
          </h2>

          <div className="space-y-6">
            <Info icon={<MapPin />} title="Office Address"
              text={`Business Bay, Churchill Towers\nDubai, United Arab Emirates`} />
            <Info icon={<Phone />} title="Phone" text="+971 50 123 4567" />
            <Info icon={<Mail />} title="Email" text="info@grpremium.com" />
            <Info icon={<Clock />} title="Working Hours"
              text={`Mon – Sat: 9:00 AM – 6:00 PM\nSunday: By Appointment`} />
          </div>

          <div className="mt-10 rounded-xl overflow-hidden border-2 border-[#C9A227] h-[300px] sm:h-[360px] w-full">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Churchill+Towers+Business+Bay+Dubai&output=embed"
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white dark:bg-[#111827] border-2 border-[#C9A227] rounded-2xl p-6 sm:p-8 shadow-sm self-start transition-colors duration-300">
          <h3 className="text-2xl font-serif mb-6 dark:text-white">
            Send Us an Enquiry
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Input name="name" label="Full Name" placeholder="Enter your full name" />
            <Input name="email" label="Email" type="email" placeholder="your@email.com" />
            <Input name="phone" label="Phone Number" placeholder="+971 XX XXX XXXX" />

            <InputSelect
              name="country"
              label="Country of Residence"
              options={[
                "United Arab Emirates",
                "India",
                "United Kingdom",
                "United States",
                "Saudi Arabia",
                "Other",
              ]}
            />

            {/* INTERESTED PROPERTY */}
            <div className="sm:col-span-2 relative">
              <label className="text-sm font-medium dark:text-gray-200">
                Interested Property <span className="text-red-500">*</span>
              </label>

              <select
                name="interested_property"
                required
                className="mt-2 w-full rounded-xl border-2 border-[#C9A227]
                           bg-white dark:bg-[#1f2937]
                           text-gray-900 dark:text-white
                           px-4 py-3 appearance-none
                           focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              >
                <option value="">Select a property</option>
                <option>Emaar</option>
                <option>Damac</option>
                <option>Danube</option>
                <option>Sobha</option>
                <option>Binghatti</option>
                <option>Ellington</option>
                <option>Nakheel</option>
                <option>Meraas</option>
                <option>Azizi Developments</option>
                <option>Dubai Properties</option>
                <option>Other</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                ▼
              </div>
            </div>

            {/* CONSENT */}
            <div className="sm:col-span-2 flex items-start gap-3 mt-2">
              <input type="checkbox" required className="mt-1" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                I authorize company representatives to contact me about its products and offers.
              </p>
            </div>

            {/* BUTTON */}
            <div className="sm:col-span-2 mt-3">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-[#C9A227] hover:bg-[#b8961f]
                           text-white py-3 rounded-xl
                           flex items-center justify-center gap-2
                           transition font-medium"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Enquiry"}
              </button>

              {success && (
                <p className="mt-3 text-green-600 text-sm font-medium text-center">
                  {success}
                </p>
              )}

              {error && (
                <p className="mt-3 text-red-600 text-sm font-medium text-center">
                  {error}
                </p>
              )}
            </div>

          </form>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Info({ icon, title, text }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold dark:text-white">{title}</h4>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function Input({ label, placeholder, type = "text", name }: any) {
  return (
    <div>
      <label className="text-sm font-medium dark:text-gray-200">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border-2 border-[#C9A227]
                   bg-white dark:bg-[#1f2937]
                   text-gray-900 dark:text-white
                   px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
      />
    </div>
  );
}

function InputSelect({ label, name, options }: any) {
  return (
    <div>
      <label className="text-sm font-medium dark:text-gray-200">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        required
        className="mt-2 w-full rounded-xl border-2 border-[#C9A227]
                   bg-white dark:bg-[#1f2937]
                   text-gray-900 dark:text-white
                   px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
      >
        <option value="">{label}</option>
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
