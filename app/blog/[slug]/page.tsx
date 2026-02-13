import { sanityClient } from "@/lib/sanity.client";
import { getSingleBlogQuery } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {

  const { slug } = await params;   // ✅ IMPORTANT FIX

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
              block: {
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mt-10 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-semibold mt-8 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold mt-6 mb-2">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
                    {children}
                  </h4>
                ),
                normal: ({ children }) => (
                  <p className="mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 mb-6">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 mb-6">
                    {children}
                  </ol>
                ),
              },
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
