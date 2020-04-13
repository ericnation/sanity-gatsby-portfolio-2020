export default {
  name: 'workExperience',
  type: 'object',
  title: 'Work Experience',
  options: {
    collapsible: true
  },
  fieldsets: [
    {
      name: 'workExperience',
      title: 'Work Experience'
    }
  ],
  fields: [
    {
      name: 'jobs',
      type: 'array',
      title: 'Jobs',
      of: [{type: 'reference', to: {type: 'job'}}]
    }
  ]
}
