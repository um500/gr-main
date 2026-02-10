import { defineType, defineField } from "sanity";

export default defineType({
  name: "developer",
  title: "Developers",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Developer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Developer Logo",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Large image for developer hero section",
    }),

    // 🔥 CARD DESCRIPTION (Homepage)
    defineField({
      name: "shortDescription",
      title: "Short Description (Card)",
      type: "text",
      rows: 3,
      description: "This short text will appear on developer cards",
      validation: (Rule) => Rule.required().max(200),
    }),

    // 🔥 FULL ABOUT (Developer Page)
    defineField({
      name: "about",
      title: "About Developer",
      type: "text",
      rows: 5,
    }),

    // 🔥 STATS SECTION
    defineField({
      name: "stats",
      title: "Developer Stats",
      type: "object",
      fields: [
        {
          name: "experience",
          title: "Years Experience",
          type: "string",
          description: "e.g. 40+",
        },
        {
          name: "projects",
          title: "Projects Delivered",
          type: "string",
          description: "e.g. 120+",
        },
        {
          name: "homes",
          title: "Homes Sold",
          type: "string",
          description: "e.g. 50K+",
        },
        {
          name: "locations",
          title: "Prime Locations",
          type: "string",
          description: "e.g. Dubai",
        },
      ],
    }),

    // 🔥 FEATURED (TOP 4 ON HOME)
    defineField({
      name: "featured",
      title: "Featured Developer",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
