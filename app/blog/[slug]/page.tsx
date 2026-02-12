import { sanityClient } from "@/lib/sanity.client";
import { getSingleBlogQuery } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // ✅ FIXED HERE
  const blog = await sanityClient.fetch(
    getSingleBlogQuery,
    { slug }
  );

  if (!blog) {
    return (
      <main className="py-32 text-center text-2xl font-semibold bg-white dark:bg-[#0F172A] text-black dark:text-white">
        Blog not found
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[420px] md:h-[520px] flex items-center justify-center text-white text-center overflow-hidden">
        
        {blog.mainImage && (
          <img
            src={urlFor(blog.mainImage).width(1800).url()}
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
        <div className="prose prose-lg max-w-none 
                        prose-headings:text-black 
                        dark:prose-headings:text-white
                        prose-p:text-gray-700 
                        dark:prose-p:text-gray-300
                        prose-strong:text-black 
                        dark:prose-strong:text-white">

          <PortableText
            value={blog.content}
            components={{
              block: {
                h2: ({ children }) => (
                  <h2 className="mt-14 mb-6 border-b border-gray-300 dark:border-gray-700 pb-3 text-2xl font-semibold">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-10 mb-4 text-xl font-semibold">
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
      <Footer />
    </main>
  );
}
