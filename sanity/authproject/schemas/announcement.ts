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
  ],
});
