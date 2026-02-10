import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

interface BlogCardProps {
  blog: {
    title: string;
    subtitle?: string;
    excerpt: string;
    slug: string;
    mainImage: any;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col">
      
      {/* Image */}
      <div className="relative w-full aspect-[4/3]">
        <img
          src={urlFor(blog.mainImage).width(800).height(600).url()}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
          {blog.title}
        </h3>

        {blog.subtitle && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            {blog.subtitle}
          </p>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-6">
          {blog.excerpt}
        </p>

        {/* Button fixed at bottom */}
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-auto inline-flex items-center justify-center text-sm font-medium
                     text-white bg-[#C9A127] px-5 py-2 rounded-md
                     hover:bg-gray-900 transition"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
