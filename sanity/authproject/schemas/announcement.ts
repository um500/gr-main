import { defineType, defineField } from "sanity";

export default defineType({
  name: "announcement",
  title: "Top Announcement",
  type: "document",
  fields: [

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "date",
    }),

    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),

    // ✅ VERY IMPORTANT (For View Details Page)
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ✅ Optional (For detail page content)
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

  ],
});
