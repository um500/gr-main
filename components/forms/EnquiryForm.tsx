"use client";

import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

/* ---------------- OPTIONS ---------------- */
const PROPERTY_OPTIONS = [
  "Emaar",
  "Damac",
  "Danube",
  "Sobha",
  "Binghatti",
  "Ellington",
  "Nakheel",
  "Meraas",
  "Azizi Developments",
  "Dubai Properties",
];

const COUNTRY_OPTIONS = [
  "United Arab Emirates",
  "India",
  "United Kingdom",
  "United States",
  "Saudi Arabia",
  "Other",
];

export default function EnquiryForm({
  defaultProperty = "",
}: {
  defaultProperty?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [selectedProperty, setSelectedProperty] = useState("");
  const [otherProperty, setOtherProperty] = useState("");

  /* ---------- AUTO PREFILL (FINAL LOGIC) ---------- */
  useEffect(() => {
    if (!defaultProperty) return;

    const match = PROPERTY_OPTIONS.find(
      (p) => p.toLowerCase() === defaultProperty.toLowerCase()
    );

    if (match) {
      // ✅ property exists in dropdown
      setSelectedProperty(match);
      setOtherProperty("");
    } else {
      // ✅ property NOT in dropdown
      setSelectedProperty("Other");
      setOtherProperty(defaultProperty); // 👈 auto-fill here
    }
  }, [defaultProperty]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    emailjs
      .sendForm(
        "service_uyrhwx8",
        "template_66qrmxf",
        e.target,
        "lVPUd6uuppl88FX8U"
      )
      .then(() => {
        setSuccess("Enquiry sent successfully ✅");
        e.target.reset();
        setSelectedProperty("");
        setOtherProperty("");
      })
      .catch(() => {
        setError("Something went wrong. Please try again ❌");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      {/* NAME */}
      <Input name="name" label="Full Name" placeholder="Enter your full name" />

      {/* EMAIL */}
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="your@email.com"
      />

      {/* PHONE */}
      <Input
        name="phone"
        label="Phone Number"
        placeholder="+971 XX XXX XXXX"
      />

      {/* COUNTRY */}
      <Select
        name="country"
        label="Country of Residence"
        options={COUNTRY_OPTIONS}
      />

      {/* INTERESTED PROPERTY */}
<div className="sm:col-span-2">
  <label className="text-sm font-medium">
    Interested Property
  </label>

  <select
    name="interested_property"
    value={selectedProperty}
    onChange={(e) => {
      setSelectedProperty(e.target.value);
      if (e.target.value !== "Other") {
        setOtherProperty("");
      }
    }}
    className="mt-2 w-full rounded-lg border-2 border-yellow-300 px-4 py-3
               focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
  >
    <option value="">Select a property</option>

    {PROPERTY_OPTIONS.map((p) => (
      <option key={p} value={p}>
        {p}
      </option>
    ))}

    <option value="Other">Other</option>
  </select>
</div>


      {/* OTHER PROPERTY NAME (AUTO OPEN + PREFILLED) */}
      {selectedProperty === "Other" && (
        <div className="sm:col-span-2">
          <Input
            name="other_property"
            label="Other Property Name"
            placeholder="Enter property name"
            value={otherProperty}
            onChange={(e: any) => setOtherProperty(e.target.value)}
          />
        </div>
      )}

      {/* CONSENT */}
      <div className="sm:col-span-2 flex items-start gap-3 mt-2">
        <input
          type="checkbox"
          name="consent_status"
          value="Yes"
          required
          className="mt-1"
        />
        <p className="text-sm text-gray-700">
          I authorize company representatives to Call, SMS, Email or WhatsApp me
          about its products and offers.
        </p>
      </div>

      {/* SUBMIT */}
      <div className="sm:col-span-2 mt-3">
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60
                     text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
        >
          <Send size={18} />
          {loading ? "Sending..." : "Send Enquiry"}
        </button>

        {success && (
          <p className="mt-3 text-green-600 text-sm text-center font-medium">
            {success}
          </p>
        )}

        {error && (
          <p className="mt-3 text-red-600 text-sm text-center font-medium">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Input({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}: any) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border-2 border-yellow-300 px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}

function Select({ label, name, options }: any) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        required
        name={name}
        className="mt-2 w-full rounded-lg border-2 border-yellow-300 px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
      >
        <option value="">{label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
