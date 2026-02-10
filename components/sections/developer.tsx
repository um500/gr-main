"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

/* ================= TYPES ================= */

interface Developer {
  _id: string;
  name: string;
  logo?: {
    asset?: {
      url?: string;
    };
  };
  description?: string;
}

/* ================= ANIMATION ================= */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/* ================= COMPONENT ================= */

export default function DeveloperSection({
  developers,
}: {
  developers: Developer[];
}) {
  if (!developers?.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-serif text-gray-900">
            Trusted Developers
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            We partner with reputed developers known for quality,
            transparency, and timely delivery.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {developers.map((dev) => (
            <motion.div
              key={dev._id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center"
            >
              <div className="relative w-28 h-28 mb-4">
                <Image
                  src={dev.logo?.asset?.url || "/images/placeholder.jpg"}
                  alt={dev.name}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {dev.name}
              </h3>

              {dev.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {dev.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
