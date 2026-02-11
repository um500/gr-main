// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Search, ChevronDown } from "lucide-react";
// import { communities } from "@/lib/communities";

// export default function HeroSearch() {
//   const router = useRouter();
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   const [query, setQuery] = useState("");
//   const [mode, setMode] = useState<"BUY" | "RENT">("BUY");
//   const [showMode, setShowMode] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   /* 🔍 FILTER */
//   const filtered = query
//     ? communities.filter((c) =>
//         c.name.toLowerCase().includes(query.toLowerCase())
//       )
//     : communities.slice(0, 6);

//   /* ❌ CLICK OUTSIDE CLOSE (FIXED) */
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(e.target as Node)
//       ) {
//         setShowSuggestions(false);
//         setShowMode(false);
//       }
//     }
//     document.addEventListener("click", handleClickOutside);
//     return () =>
//       document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const handleSearch = () => {
//     if (!query) return;
//     router.push(`/properties?search=${query}&mode=${mode}`);
//     setShowSuggestions(false);
//   };

//   return (
//     <div
//       ref={wrapperRef}
//       className="
//         relative 
//         w-full 
//         max-w-full sm:max-w-3xl 
//         mt-6 
//         px-4 sm:px-0
//         z-[200]
//       "
//     >
//       {/* ================= SEARCH BAR ================= */}
//       <div className="flex items-stretch bg-white rounded-xl shadow-xl overflow-visible mx-auto">

//         {/* BUY / RENT */}
//         <div className="relative shrink-0">
//           <button
//             type="button"
//             onClick={() => setShowMode((p) => !p)}
//             className="
//               h-full 
//               bg-yellow-500 
//               px-4 sm:px-5 
//               text-sm sm:text-base 
//               font-semibold 
//               flex items-center gap-1
//               rounded-l-xl
//               text-white
//             "
//           >
//             {mode}
//             <ChevronDown size={16} />
//           </button>

//           {showMode && (
//             <div className="absolute top-full left-0 bg-white shadow-lg w-full z-[300] border rounded-lg mt-2 text-gray-900">
//               {["BUY", "RENT"].map((item) => (
//                 <div
//                   key={item}
//                   onClick={() => {
//                     setMode(item as "BUY" | "RENT");
//                     setShowMode(false);
//                   }}
//                   className="px-4 py-2 text-sm hover:bg-yellow-100 cursor-pointer"
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* INPUT */}
//         <input
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             setShowSuggestions(true);
//           }}
//           onFocus={() => setShowSuggestions(true)}
//           placeholder="Community or Building"
//           className="
//             flex-1 
//             px-3 sm:px-4 
//             py-2 sm:py-3 
//             text-sm sm:text-base 
//             outline-none
//             text-
//           "
//         />

//         {/* SEARCH ICON */}
//         <button
//           onClick={handleSearch}
//           className="
//             px-3 sm:px-4 
//             flex items-center 
//             text-gray-600 
//             hover:text-black
//             rounded-r-xl
//           "
//         >
//           <Search size={20} />
//         </button>
//       </div>

//       {/* ================= SUGGESTIONS ================= */}
//       {showSuggestions && (
//         <div
//           className="
//             absolute 
//             left-0 right-0 
//             top-full 
//             mt-3 
//             bg-white 
//             shadow-2xl 
//             rounded-xl 
//             z-[300] 
//             max-h-72 
//             overflow-y-auto
//             border
//             text-gray-900
//           "
//         >
//           {filtered.length ? (
//             filtered.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => {
//                   setQuery(item.name);
//                   setShowSuggestions(false);
//                 }}
//                 className="px-4 py-3 cursor-pointer hover:bg-yellow-100 transition"
//               >
//                 <p className="font-medium text-gray-900">
//                   {item.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {item.area}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="px-4 py-3 text-gray-500">
//               No results found
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



