export default {
  name: "community",
  title: "Community",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Location",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "area",
      title: "Area",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
