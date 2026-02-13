import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            },
            {
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "active",
              title: "Active Slide",
              type: "boolean",
              initialValue: true,
            },

            // ✅ NEW FIELD ADDED (Property Link)
            {
              name: "linkedProperty",
              title: "Linked Property",
              type: "reference",
              to: [{ type: "property" }],
            },
          ],
        },
      ],
    }),

    defineField({
      name: "heroCTA",
      title: "Hero CTA Text",
      type: "string",
      initialValue: "Explore Properties",
    }),
  ],
});
