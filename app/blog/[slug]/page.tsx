import { sanityClient } from "@/lib/sanity.client";
import { getSingleBlogQuery } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  // ✅ Next.js 16 fix
  const { slug } = await params;

  const blog = await sanityClient.fetch(
    getSingleBlogQuery(slug)
  );

  if (!blog) {
    return (
      <div className="py-32 text-center text-2xl font-semibold">
        Blog not found
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[420px] md:h-[520px] flex items-center justify-center text-white text-center">
        {/* Background Image */}
        {blog.mainImage && (
          <img
            src={urlFor(blog.mainImage).width(1800).url()}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        

        {/* Hero Content */}
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
      <section className="max-w-5xl mx-auto py-2 px-6">
        <div className="prose prose-lg max-w-none">
          <PortableText
            value={blog.content}
            components={{
              block: {
                h2: ({ children }) => (
                  <h2 className="mt-14 mb-5 border-b pb-2 text-2xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-10 mb-4 underline text-xl">
                    {children}
                  </h3>
                ),
                normal: ({ children }) => (
                  <p className="mb-6 leading-relaxed">
                    {children}
                  </p>
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
    </main>
  );
}
