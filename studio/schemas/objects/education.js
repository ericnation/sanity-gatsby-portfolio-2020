export default {
  name: 'education',
  type: 'object',
  options: {
    collapsible: true
  },
  fieldsets: [
    {
      name: 'education',
      title: 'Education'
    }
  ],
  fields: [
    {
      title: 'Name of School',
      name: 'schoolName',
      type: 'string'
    },
    {
      title: 'Degree Type',
      name: 'degreeType',
      type: 'string'
    },
    {
      title: 'Graduation Date',
      name: 'graduationDate',
      type: 'date',
      dateFormat: 'MMMM YYYY'
    }
  ]
}
