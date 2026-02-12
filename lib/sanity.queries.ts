import { groq } from "next-sanity";

/* ======================================================
   HOMEPAGE
====================================================== */

export const homepageHeroQuery = groq`
*[_type == "homepage"][0]{
  heroCTA,
  heroSlides[]{
    title,
    subtitle,
    active,
    image{
      asset->{
        url
      }
    }
  }
}
`;


/* 🔥 FEATURED PROPERTIES (HOME PAGE – TOP 4 ONLY) */
export const featuredPropertiesQuery = groq`
*[_type == "property"]
| order(_createdAt desc)
[0..3]{
  _id,
  title,
  slug,
  location,
  type,
  handover,
  images[]{
    asset->{url}
  },
  units[]{
    beds,
    size,
    price
  }
}
`;

/* ======================================================
   PROPERTIES PAGE (ALL PROPERTIES)
====================================================== */

export const propertiesQuery = groq`
*[
  _type == "property" &&

  (!defined($community) || location->slug.current == $community) &&

  (!defined($search) || 
    title match $search + "*" ||
    location->name match $search + "*"
  ) &&

  (!defined($purpose) || purpose == $purpose) &&

  (!defined($type) || type == $type) &&

  (!defined($bed) ||
    count(units[beds == $bed]) > 0
  ) &&

  (!defined($min) ||
    count(units[price >= $min]) > 0
  ) &&

  (!defined($max) ||
    count(units[price <= $max]) > 0
  )

]
| order(_createdAt desc){
  _id,
  title,
  slug,
  featured,
  handover,
  purpose,
  type,

  location->{
    name,
    "slug": slug.current
  },

  images[]{
    asset->{url}
  },

  units[]{
    beds,
    size,
    price
  }
}
`;





/* ======================================================
   DEVELOPER PAGE (PROPERTIES BY DEVELOPER)
====================================================== */

export const propertiesByDeveloperQuery = groq`
*[_type == "property" && developer->slug.current == $slug]
| order(_createdAt desc){
  _id,
  title,
  slug,
  location,
  handover,
  featured,
  images[]{
    asset->{url}
  },
  units[]{
    beds,
    size,
    price
  }
}
`;

/* ======================================================
   SEARCH / COMMUNITY
====================================================== */

export const communitiesQuery = groq`
*[_type == "community"]{
  _id,
  name,
  area,
  slug {
    current
  }
}
`;




/* SEARCH SUGGESTION (COMMUNITY AUTOCOMPLETE) */
export const searchSuggestionQuery = groq`
*[_type == "community"]
| order(name asc){
  _id,
  name,
  area,
  slug{
    current
  }
}
`;

export const featuredDevelopersQuery = groq`
*[_type == "developer" && featured == true]
| order(_createdAt asc)
[0...3]{
  _id,
  name,
  slug,
  shortDescription,
  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;

export const allDevelopersQuery = `
*[_type == "developer"]
| order(name asc){
  _id,
  name,
  slug,
  shortDescription,
  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;

export const allBlogsQuery = `
*[_type == "blog"]{
  _id,
  title,
  subtitle,
  excerpt,
  "slug": slug.current,
  mainImage
}
`;


export const getSingleBlogQuery = (slug: string) => groq`
*[_type == "blog" && slug.current == "${slug}"][0]{
  title,
  subtitle,
  content,
  mainImage
}
`;

// ================= MEDIA PAGE QUERY =================

export const mediaQuery = `
*[_type == "media"] | order(_createdAt desc){
  _id,
  title,
  mediaType,
  location,

  // IMAGE TYPE (ARRAY OF IMAGES)
  images[]{
    asset->{
      _id,
      url
    }
  },

  // VIDEO TYPE (YOUTUBE)
  youtubeUrl
}
`;


export const announcementQuery = groq`
*[_type == "announcement"]
| order(_createdAt desc){
  title,
  eventDate,
  city,
  "slug": slug.current
}
`;


