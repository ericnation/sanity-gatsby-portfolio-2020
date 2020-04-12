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
      name: 'job',
      type: 'array',
      title: 'Job',
      of: [{type: 'reference', to: {type: 'job'}}]
    }
  ]
}
