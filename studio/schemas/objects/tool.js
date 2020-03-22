export default {
  name: 'tool',
  type: 'object',
  title: 'Tools',
  fields: [
    {
      name: 'tools',
      type: 'array',
      title: 'Tools',
      of: [ {type: 'string'} ],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'tools.0'
    }
  }
}
