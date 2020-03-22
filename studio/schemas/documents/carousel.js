export default {
  name: 'carousel',
  type: 'document',
  title: 'Carousels',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Carousel Name'
    },
    {
      name: 'slides',
      type: 'array',
      title: 'Slides',
      of: [{type: 'slide'}]
    },
    {
      name: 'specialties',
      type: 'array',
      title: 'Specialties',
      description: 'Add your specialties',
      of: [ {type: 'string'} ],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
