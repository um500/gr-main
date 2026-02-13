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
      asset->{ url }
    },

    linkedProperty->{
      _id,
      title,
      "slug": slug.current,

      developer->{
        name,
        "slug": slug.current
      }
    }
  }
}
`;



/* ======================================================
   FEATURED PROPERTIES (HOME – TOP 4)
====================================================== */

export const featuredPropertiesQuery = groq`
*[_type == "property"]
| order(_createdAt desc)
[0..3]{
  _id,
  title,
  "slug": slug.current,
  handover,
  featured,

  location->{
    name,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;

/* ======================================================
   ALL PROPERTIES (FILTER PAGE)
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
  (!defined($bed) || count(units[beds == $bed]) > 0) &&
  (!defined($min) || count(units[price >= $min]) > 0) &&
  (!defined($max) || count(units[price <= $max]) > 0)
]
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  featured,
  handover,
  purpose,
  type,

  location->{
    name,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;

/* ======================================================
   SINGLE PROPERTY
====================================================== */

export const propertyBySlugQuery = groq`
*[_type == "property" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  handover,
  featured,
  purpose,
  type,

  developer->{
    name,
    "slug": slug.current
  },

  location->{
    name,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;

/* ======================================================
   ✅ PROPERTIES BY DEVELOPER (MISSING FIX)
====================================================== */

export const propertiesByDeveloperQuery = groq`
*[_type == "property" && developer->slug.current == $slug]
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  handover,
  featured,

  location->{
    name,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;

/* ======================================================
   DEVELOPERS
====================================================== */

export const featuredDevelopersQuery = groq`
*[_type == "developer" && featured == true]
| order(_createdAt asc)
[0...3]{
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;

export const allDevelopersQuery = groq`
*[_type == "developer"]
| order(name asc){
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;

/* ======================================================
   COMMUNITIES
====================================================== */

export const communitiesQuery = groq`
*[_type == "community"]{
  _id,
  name,
  area,
  "slug": slug.current
}
`;

export const searchSuggestionQuery = groq`
*[_type == "community"]
| order(name asc){
  _id,
  name,
  area,
  "slug": slug.current
}
`;

/* ======================================================
   BLOGS
====================================================== */

export const allBlogsQuery = groq`
*[_type == "blog"]{
  _id,
  title,
  subtitle,
  excerpt,
  "slug": slug.current,
  mainImage{
    asset->{ url }
  }
}
`;

export const getSingleBlogQuery = groq`
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  subtitle,
  content,
  mainImage{
    asset->{ url }
  }
}
`;

/* ======================================================
   MEDIA
====================================================== */

export const mediaQuery = groq`
*[_type == "media"] 
| order(_createdAt desc){
  _id,
  title,
  mediaType,
  location,
  images[]{ asset->{ url } },
  youtubeUrl
}
`;

/* ======================================================
   ANNOUNCEMENTS
====================================================== */

export const announcementQuery = groq`
*[_type == "announcement"]
| order(_createdAt desc){
  title,
  eventDate,
  city,
  "slug": slug.current
}
`;
