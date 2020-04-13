export default {
  name: 'technicalSkills',
  title: 'Technical Skills',
  options: {
    collapsible: true
  },
  type: 'object',
  fieldsets: [
    {
      name: 'technicalSkills',
      title: 'Technical Skills'
    }
  ],
  fields: [
    {
      name: 'professionalSkills',
      title: 'Professsional Skills',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'softSkills',
      title: 'Soft Skills',
      type: 'array',
      of: [{type: 'string'}]
    }
  ]
}
