// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// // 🔶 Golden Brand Color
// const goldenColor = "#C9A227";

// // 🔶 Property Data (public/assets)
// const properties = [
//   {
//     id: 1,
//     name: "Siniya Island",
//     location: "Umm Al Quwain",
//     type: "Coral Beach Villas",
//     images: ["/assets/siniya1.png", "/assets/siniya2.png", "/assets/siniya3.png"],
//     units: [
//       { beds: 1, sqft: 550, price: "1.38M" },
//       { beds: 2, sqft: 650, price: "1.75M" },
//     ],
//     handover: "June 2028",
//   },
//   {
//     id: 2,
//     name: "Sobha Central",
//     location: "Sheikh Zayed Road",
//     type: "Luxury Apartments",
//     images: ["/assets/sobbha1.png", "/assets/sobbha2.png", "/assets/sobbha3.png"],
//     units: [
//       { beds: 1, sqft: 781, price: "2.21M" },
//       { beds: 2, sqft: 1552, price: "4.58M" },
//     ],
//     handover: "Sept 2029",
//   },
//   {
//     id: 3,
//     name: "Montiva by Vida",
//     location: "Dubai Creek Harbour",
//     type: "Branded Tower",
//     images: [
//       "/assets/montiva1.png",
//       "/assets/montiva2.png",
//       "/assets/montiva3.png",
//     ],
//     units: [
//       { beds: 1, sqft: 765, price: "1.92M" },
//       { beds: 2, sqft: 1143, price: "2.85M" },
//     ],
//     handover: "Sept 2029",
//   },
//   {
//     id: 4,
//     name: "Silva – View Collection",
//     location: "Dubai Creek Harbour",
//     type: "Golf Course Views",
//     images: ["/assets/silva1.png", "/assets/sliva2.png", "/assets/sliva3.png"],
//     units: [
//       { beds: 1, sqft: 744, price: "1.81M" },
//       { beds: 2, sqft: 1154, price: "2.83M" },
//     ],
//     handover: "Sept 2029",
//   },
// ];

// // 🔶 Animation Variants
// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

// // ================= PROPERTY CARD =================
// const PropertyCard = ({ property }: { property: (typeof properties)[0] }) => {
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) =>
//         prev === property.images.length - 1 ? 0 : prev + 1
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [property.images.length]);

//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{ y: -8 }}
//       className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
//     >
//       {/* IMAGE */}
//       <div className="relative h-56 w-full overflow-hidden">
//         <motion.div
//           key={currentImage}
//           initial={{ opacity: 0.5, scale: 1.05 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="absolute inset-0"
//         >
//           <Image
//             src={property.images[currentImage]}
//             alt={property.name}
//             fill
//             className="object-cover"
//           />
//         </motion.div>

//         {/* LOCATION BADGE */}
//         <span
//           className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm text-white font-medium z-10"
//           style={{ backgroundColor: goldenColor }}
//         >
//           {property.location}
//         </span>

//         {/* DOTS */}
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//           {property.images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentImage(index)}
//               className={`w-2.5 h-2.5 rounded-full transition ${
//                 currentImage === index ? "bg-white" : "bg-white/50"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-5">
//         <h3 className="text-xl font-bold mb-2" style={{ color: goldenColor }}>
//           {property.name}
//         </h3>

//         <span
//           className="inline-block px-3 py-1 rounded-full text-sm mb-4"
//           style={{
//             color: goldenColor,
//             border: `1px solid ${goldenColor}`,
//             backgroundColor: `${goldenColor}15`,
//           }}
//         >
//           {property.type}
//         </span>

//         <div className="space-y-1 mb-4">
//           {property.units.map((unit, index) => (
//             <p key={index} className="text-sm text-gray-600">
//               {unit.beds} Bed • {unit.sqft} Sq Ft • AED {unit.price}
//             </p>
//           ))}
//         </div>

//         <p className="text-sm text-gray-500 mb-5">
//           Handover: {property.handover}
//         </p>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           className="w-full py-3 rounded-lg text-white font-semibold"
//           style={{ backgroundColor: goldenColor }}
//         >
//           Enquire Now
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// // ================= MAIN SECTION =================
// export default function Property() {
//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8 }}
//       className="bg-gray-200 py-16 px-4 md:py-24"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <span
//             className="text-sm font-semibold tracking-widest uppercase"
//             style={{ color: goldenColor }}
//           >
//             OUR COLLECTION
//           </span>

//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
//             Featured Properties
//           </h2>

//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Discover our handpicked selection of premium properties in Dubai's
//             most prestigious locations.
//           </p>
//         </motion.div>

//         {/* GRID */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {properties.map((property) => (
//             <PropertyCard key={property.id} property={property} />
//           ))}
//         </motion.div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mt-12"
//         >
//           <motion.button
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.96 }}
//             className="px-8 py-3 border-2 rounded-full font-semibold"
//           >
//             View All Properties →
//           </motion.button>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }

import { sanityClient } from "@/lib/sanity.client";
import { featuredPropertiesQuery } from "@/lib/sanity.queries";
import PropertyClient from "./PropertyClient";

export default async function Property() {
  const properties = await sanityClient.fetch(featuredPropertiesQuery);

  return <PropertyClient properties={properties} />;
}
