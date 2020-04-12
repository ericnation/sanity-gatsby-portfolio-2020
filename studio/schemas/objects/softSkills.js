export default {
  name: 'softSkills',
  title: 'Soft Skills',
  type: 'object',
  fields: [
    {
      name: 'softSkills',
      type: 'array',
      title: 'Soft Skills',
      of: [{type: 'softSkill'}]
    }
  ]
}
