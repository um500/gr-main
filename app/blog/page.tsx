import { sanityClient } from "@/lib/sanity.client";
import { allBlogsQuery } from "@/lib/sanity.queries";
import BlogCard from "@/components/cards/BlogCard";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await sanityClient.fetch(allBlogsQuery);

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative h-[320px] md:h-[420px] flex items-center justify-center text-center text-white">
        {/* Background Image */}
        <img
          src="/assets/hero-1.jpg"
          alt="Blog Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Blog</h1>
          <p className="mt-4 text-gray-200">
            Latest insights, updates & real estate stories
          </p>
        </div>
      </section>

      {/* ================= BLOG LIST ================= */}
      <section className="py-20 bg-[#F9FAFB]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog: any) => (
        <BlogCard
          key={blog._id}
          blog={{
            title: blog.title,
            subtitle: blog.subtitle,
            excerpt: blog.excerpt,
            slug: blog.slug,
            mainImage: blog.mainImage,
          }}
        />
      ))}
    </div>
  </div>
</section>

      <CTA />
      <Footer />
    </main>
  );
}
