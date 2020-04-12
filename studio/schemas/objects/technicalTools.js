export default {
  name: 'tools',
  title: 'Tools',
  type: 'object',
  fields: [
    {
      name: 'tools',
      type: 'array',
      title: 'Tools',
      of: [{type: 'tool'}]
    }
  ]
}
