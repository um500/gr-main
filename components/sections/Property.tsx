"use client";

import { motion } from "framer-motion";
import HomePropertyCard from "../cards/HomePropertyCard";

type PropertyProps = {
  properties: any[];
};

export default function Property({ properties }: PropertyProps) {
  return (
    <section className="py-24 px-6 bg-[#E5E7EB] dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm tracking-[0.2em] font-semibold uppercase mb-4 text-[#C9A227]">
            Projects
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white">
            Featured Properties
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            Discover our handpicked selection of premium real estate projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {properties?.map((p: any) => (
            <HomePropertyCard
              key={p._id}
              property={p}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
