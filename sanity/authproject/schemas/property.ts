import { defineType, defineField } from "sanity";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    // ================= BASIC =================
    defineField({
      name: "title",
      title: "Property Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

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

    // ================= DEVELOPER =================
    defineField({
      name: "developer",
      title: "Developer",
      type: "reference",
      to: [{ type: "developer" }],
      validation: (Rule) => Rule.required(),
    }),

    // ================= LOCATION =================
    defineField({
      name: "location",
      title: "Community",
      type: "reference",
      to: [{ type: "community" }],
      validation: (Rule) => Rule.required(),
    }),

    // ================= IMAGES =================
    defineField({
      name: "images",
      title: "Property Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    // ================= BROCHURE PDF (NEW) =================
    defineField({
      name: "brochure",
      title: "Brochure PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description: "Upload property brochure PDF here",
    }),

    // ================= AVAILABLE UNITS =================
    defineField({
      name: "units",
      title: "Available Units",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "beds",
              title: "Bedrooms",
              type: "string",
            },
            {
              name: "size",
              title: "Size (Sq Ft)",
              type: "string",
            },
            {
              name: "price",
              title: "Starting Price",
              type: "string",
            },
          ],
        },
      ],
    }),

    // ================= HANDOVER =================
    defineField({
      name: "handover",
      title: "Handover Date",
      type: "string",
      description: "Example: September 2029",
    }),

    // ================= FLAGS =================
    defineField({
      name: "featured",
      title: "Featured Property",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
