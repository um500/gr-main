"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Golden color
const goldenColor = "#C9A227";

// ================= TYPES =================
type Developer = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  shortDescription: string;
  logo?: string;
  heroImage?: string;
};

// ================= ANIMATIONS =================
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ================= CARD =================
const DeveloperCard = ({ developer }: { developer: Developer }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg p-4 hover:shadow-2xl transition"
    >
      {/* Image */}
      <div className="h-56 overflow-hidden rounded-xl mb-4">
        <motion.img
          src={developer.heroImage || developer.logo || "/placeholder.jpg"}
          alt={developer.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="pt-2">
        <h3 className="text-xl font-bold mb-2 text-[#1a3a5c]">
          {developer.name}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {developer.shortDescription}
        </p>

        <Link href={`/developers/${developer.slug.current}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 rounded-lg text-white font-semibold cursor-pointer"
            style={{ backgroundColor: goldenColor }}
          >
            View Projects
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

// ================= MAIN SECTION =================
export default function Developers({
  developers,
}: {
  developers: Developer[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gray-50 py-16 px-4 md:py-24"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Label */}
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: goldenColor }}
        >
          Developers
        </h2>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dubai's Premier Real Estate Developers
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-4xl mx-auto">
            We are partnered with the top developers shaping Dubai&apos;s skyline.
            Explore our trusted network of UAE&apos;s most respected names in real
            estate.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {developers.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No featured developers found.
            </p>
          ) : (
            developers.map((developer) => (
              <DeveloperCard
                key={developer._id}
                developer={developer}
              />
            ))
          )}
        </motion.div>

        {/* View All */}
        <div className="text-center">
          <Link href="/developers">
            <button className="inline-flex cursor-pointer items-center gap-2 px-8 py-3 border-2 rounded-full font-semibold text-gray-700">
              View All Developers →
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
