import { sanityClient } from "@/lib/sanity.client";
import { allBlogsQuery } from "@/lib/sanity.queries";
import BlogCard from "@/components/cards/BlogCard";

export default async function FeaturedBlogs() {
  const blogs = await sanityClient.fetch(allBlogsQuery);

  return (
    // 🔥 FORCE FULL WIDTH (parent flex override)
    <section className="w-full py-20 bg-[#E5E7EB]">
      {/* Inner full-width wrapper */}
      <div className="w-full px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <p className="text-gray-500 mt-2">
            Insights, news & real estate updates
          </p>
        </div>

        {/* 🔥 GRID – FORCE STRETCH */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog: any) => (
              <div key={blog._id} className="w-full">
                <BlogCard
                  blog={{
                    title: blog.title,
                    subtitle: blog.subtitle,
                    excerpt: blog.excerpt,
                    slug: blog.slug,
                    mainImage: blog.mainImage,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
