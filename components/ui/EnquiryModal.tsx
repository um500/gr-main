"use client";

import { X } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";

export default function EnquiryModal({
  open,
  onClose,
  propertyName = "",
}: {
  open: boolean;
  onClose: () => void;
  propertyName?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-xl mx-4 rounded-2xl p-6 sm:p-8 shadow-xl animate-fadeIn">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-serif mb-6 text-center cursor-pointer">
          Send Your Enquiry
        </h2>

        {/* FORM */}
        <EnquiryForm defaultProperty={propertyName} />
      </div>
    </div>
  );
}
