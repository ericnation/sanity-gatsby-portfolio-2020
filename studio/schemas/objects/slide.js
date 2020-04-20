export default {
  name: 'slide',
  type: 'object',
  title: 'Slide',
  fields: [
    {
      type: 'string',
      name: 'smallItalicText',
      title: 'Small Italic Text'
    },
    {
      type: 'string',
      name: 'bigText',
      title: 'Big Text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    }
  ]
}
