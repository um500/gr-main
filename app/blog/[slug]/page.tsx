import { sanityClient } from "@/lib/sanity.client";
import { getSingleBlogQuery } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const slug = params.slug;

  // ✅ Correct Sanity fetch with parameter
  const blog = await sanityClient.fetch(
    getSingleBlogQuery,
    { slug }
  );

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[420px] md:h-[520px] flex items-center justify-center text-white text-center overflow-hidden">
        
        {blog.mainImage?.asset?.url && (
          <img
            src={blog.mainImage.asset.url}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {blog.title}
          </h1>

          {blog.subtitle && (
            <p className="text-lg md:text-xl text-gray-200">
              {blog.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* ================= BLOG CONTENT ================= */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div
          className="prose prose-lg max-w-none
          prose-headings:text-black
          dark:prose-headings:text-white
          prose-p:text-gray-700
          dark:prose-p:text-gray-300
          prose-strong:text-black
          dark:prose-strong:text-white"
        >
          <PortableText
            value={blog.content}
            components={{
              types: {
                image: ({ value }) => (
                  <img
                    src={urlFor(value).width(1000).url()}
                    alt=""
                    className="rounded-xl my-12"
                  />
                ),
              },
            }}
          />
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
