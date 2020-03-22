export default {
  name: 'skill',
  type: 'object',
  title: 'Skill',
  fields: [
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [ {type: 'string'} ],
      options: {
        layout: 'tags'
      }
    },
    {
      type: 'string',
      name: 'strengthLevel',
      title: 'Percentage of Skill Level'
    }
  ],
  preview: {
    select: {
      title: 'skills.0'
    }
  }
}
