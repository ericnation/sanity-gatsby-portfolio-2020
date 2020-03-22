export default {
  name: 'service',
  type: 'object',
  title: 'Service',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Service Label'
    },
    {
      type: 'string',
      name: 'deviconName',
      title: 'Devicon Name'
    },
    {
      name: 'serviceSpecialties',
      type: 'array',
      title: 'Service Specialties',
      of: [ {type: 'string'} ],
      options: {
        layout: 'tags'
      }
    }
  ]
}
