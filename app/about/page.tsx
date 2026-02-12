import { motion, Variants } from "framer-motion";
import Navbar from "@/components/layout/NavbarServer";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Building2, Users, Award, ShieldCheck } from "lucide-react";
import { Target, Eye, Heart, Globe } from "lucide-react";
import CTA from "@/components/sections/CTA";

const goldenColor = "#C9A227";

/* ================= DATA ================= */

const values = [
  {
    title: "Client-First Approach",
    desc: "Your goals and satisfaction are at the heart of everything we do.",
    icon: Heart,
  },
  {
    title: "Excellence",
    desc: "We maintain the highest standards in service and property selection.",
    icon: Award,
  },
  {
    title: "Global Reach",
    desc: "Serving clients worldwide with multilingual support.",
    icon: Globe,
  },
];

const stats = [
  { icon: Building2, value: "500+", label: "PROPERTIES" },
  { icon: Users, value: "2000+", label: "HAPPY CLIENTS" },
  { icon: Award, value: "15+", label: "YEARS EXPERIENCE" },
  { icon: ShieldCheck, value: "100%", label: "TRUSTED SERVICE" },
];

/* ================= PAGE ================= */

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative h-[70vh] w-full">
          <Image
            src="/assets/hero-2.jpg"
            alt="About GR Premium Properties"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 h-full flex items-center justify-center text-center">
            <div className="max-w-4xl px-6 text-white">
              <p className="text-sm tracking-widest text-yellow-400">
                WHO WE ARE
              </p>

              <h1 className="text-4xl md:text-5xl font-serif mt-3">
                About GR Premium Properties
              </h1>

              <p className="mt-4 text-gray-200 mx-auto">
                For over 15 years, we’ve been helping investors and homebuyers
                find their perfect property in Dubai and the UAE.
              </p>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-16 bg-gray-200 dark:bg-[#111827] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {stats.map((item, index) => (
                <div key={index} className="space-y-3">
                  <item.icon
                    className="w-10 h-10 mx-auto"
                    style={{ color: goldenColor }}
                  />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </h3>
                  <p className="text-sm tracking-widest text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY SECTION ================= */}
        <section className="py-20 px-6 md:px-24 bg-[#FAF9F7] dark:bg-[#0F172A] transition-colors duration-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="order-1 lg:order-2 relative">
              <Image
                src="/aboutmulti1.jpg"
                alt="Luxury Villa Dubai"
                width={620}
                height={460}
                className="rounded-xl shadow-xl object-cover w-full"
              />

              <div
                className="absolute -bottom-8 left-[-10px] md:left-[-14px] px-4 py-4 rounded-lg text-white shadow-lg"
                style={{ backgroundColor: goldenColor }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-1">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-yellow-600">
                WHY GR PREMIUM
              </p>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
                Why Choose GR <br /> Premium?
              </h2>

              <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
                With over 15 years of experience in Dubai's real estate market,
                we provide unparalleled service and access to exclusive properties.
              </p>

              <ul className="mt-8 space-y-4 text-gray-700 dark:text-gray-300">
                {[
                  "Exclusive access to off-plan and ready properties",
                  "Expert guidance throughout your buying journey",
                  "Transparent pricing with no hidden costs",
                  "Post-purchase support and property management",
                  "Multilingual team serving clients worldwide",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-yellow-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-10 px-8 py-3 rounded-md font-semibold text-black bg-yellow-500 hover:bg-yellow-600 transition">
                Get Started Today
              </button>
            </div>
          </div>
        </section>

        {/* ================= MISSION / VISION ================= */}
        <section className="py-20 bg-gray-200 dark:bg-[#111827] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

            {[{
              title: "Our Mission",
              desc: "To provide exceptional real estate services that exceed expectations.",
              icon: Target,
            },{
              title: "Our Vision",
              desc: "To become the most trusted and respected real estate advisory brand.",
              icon: Eye,
            }].map((item, i) => (
              <div
                key={i}
                className="relative group rounded-2xl bg-white dark:bg-[#1E293B] p-10 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span
                  className="absolute top-0 left-0 h-full w-1"
                  style={{ backgroundColor: goldenColor }}
                />

                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full mb-6"
                  style={{ backgroundColor: `${goldenColor}1A` }}
                >
                  <item.icon size={26} style={{ color: goldenColor }} />
                </div>

                <h3 className="text-2xl font-serif mb-4 text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* ================= CORE VALUES ================= */}
        <section className="py-24 bg-[#faf9f7] dark:bg-[#0F172A] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-16">
              <p
                className="text-sm tracking-widest uppercase mb-2"
                style={{ color: goldenColor }}
              >
                What We Stand For
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white">
                Our Core Values
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {values.map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#1E293B] rounded-2xl p-10 shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-full mb-6"
                    style={{ backgroundColor: `${goldenColor}1A` }}
                  >
                    <item.icon size={26} style={{ color: goldenColor }} />
                  </div>

                  <h3 className="text-xl font-serif mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* ================= TEAM ================= */}
<section className="py-24 px-6 md:px-24 bg-[#E5E7EB] dark:bg-[#111827] transition-colors duration-300">

  {/* ===== Heading ===== */}
  <div className="text-center max-w-2xl mx-auto">
    <p
      className="text-sm tracking-widest uppercase"
      style={{ color: goldenColor }}
    >
      Our People
    </p>

    <h2 className="text-3xl md:text-4xl font-serif mt-2 text-gray-900 dark:text-white">
      Meet Our Team
    </h2>

    <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
      Professionals committed to excellence, integrity, and results.
    </p>
  </div>

  {/* ================= LEADERSHIP ================= */}
  <div className="mt-20">
    <h3 className="text-center text-xl font-serif mb-12 text-gray-900 dark:text-white">
      Leadership
    </h3>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl mx-auto place-items-center">
      {[
        {
          name: "Ahmed Al Rashid",
          role: "Founder & CEO",
          image: "/assets/about1.png",
        },
        {
          name: "Sarah Johnson",
          role: "Managing Director",
          image: "/assets/about1.png",
        },
        {
          name: "Michael Chen",
          role: "Investment Director",
          image: "/assets/about1.png",
        },
      ].map((person) => (
        <div
          key={person.name}
          className="w-full max-w-[300px] 
                     bg-white dark:bg-[#1E293B] 
                     rounded-2xl p-8 text-center 
                     shadow-md hover:shadow-xl 
                     transition-all duration-300"
        >
          <img
            src={person.image}
            alt={person.name}
            className="w-32 h-32 mx-auto rounded-full object-cover mb-6"
          />

          <h4 className="font-serif text-lg text-gray-900 dark:text-white">
            {person.name}
          </h4>

          <p
            className="text-sm mt-1"
            style={{ color: goldenColor }}
          >
            {person.role}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* ================= TEAM MEMBERS ================= */}
  <div className="mt-28">
    <h3 className="text-center text-xl font-serif mb-12 text-gray-900 dark:text-white">
      Our Team
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto place-items-center">
      {[
        {
          name: "Priya Sharma",
          role: "Client Relations Manager",
          image: "/assets/about1.png",
        },
        {
          name: "Omar Khalid",
          role: "Property Consultant",
          image: "/assets/about1.png",
        },
        {
          name: "Emily Brown",
          role: "Sales Executive",
          image: "/assets/about1.png",
        },
        {
          name: "Arjun Mehta",
          role: "Market Analyst",
          image: "/assets/about1.png",
        },
        {
          name: "Fatima Noor",
          role: "Customer Support",
          image: "/assets/about1.png",
        },
        {
          name: "Daniel Wong",
          role: "Operations Manager",
          image: "/assets/about1.png",
        },
      ].map((member) => (
        <div
          key={member.name}
          className="w-full max-w-[260px] 
                     bg-white dark:bg-[#1E293B] 
                     rounded-xl p-6 text-center 
                     shadow-sm hover:shadow-lg 
                     hover:-translate-y-1 
                     transition-all duration-300"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
          />

          <h4 className="font-medium text-gray-900 dark:text-white">
            {member.name}
          </h4>

          <p
            className="text-sm mt-1"
            style={{ color: goldenColor }}
          >
            {member.role}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


        <CTA />
      </main>

      <Footer />
    </>
  );
}
