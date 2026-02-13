"use client";

import { useEffect, useState } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function AutoPopupWrapper() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {open && (
        <EnquiryModal open={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
