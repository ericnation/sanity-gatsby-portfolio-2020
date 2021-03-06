export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your portfolio for search engines and social media.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your portfolio.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'figure'
    },
    {
      name: 'whiteLogo',
      title: 'White Logo',
      type: 'figure'
    },
    {
      name: 'blackLogo',
      title: 'Black Logo',
      type: 'figure'
    },
    {
      name: 'headerVideo',
      title: 'Header Video URL',
      type: 'string'
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'person'}]
    },
    {
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file'
    },
    {
      name: 'heroImage',
      title: 'Hero Image for Mobile',
      type: 'figure'
    }
  ]
}
