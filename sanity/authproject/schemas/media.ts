import { defineType, defineField } from "sanity";

export default defineType({
  name: "media",
  title: "Media",
  type: "document",
  fields: [
    // 1️⃣ TITLE (FIRST)
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // 2️⃣ MEDIA TYPE (SECOND)
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "YouTube Video", value: "youtube" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    // 3️⃣ IMAGES (ONLY IF IMAGE SELECTED)
    defineField({
      name: "images",
      title: "Images (Upload 2–4)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(4)
          .error("Please upload between 1 and 4 images"),
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),

    // 4️⃣ YOUTUBE LINK (ONLY IF VIDEO SELECTED)
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description:
        "Use standard YouTube link (e.g. https://www.youtube.com/watch?v=VIDEO_ID)",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
      hidden: ({ parent }) => parent?.mediaType !== "youtube",
    }),

    // 5️⃣ LOCATION (SHOW AFTER MEDIA TYPE SELECTED)
    defineField({
      name: "location",
      title: "Location / Address",
      type: "string",
      hidden: ({ parent }) => !parent?.mediaType,
    }),
  ],
});
