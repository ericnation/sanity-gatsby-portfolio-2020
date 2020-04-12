export default {
  name: 'professionalSkillset',
  title: 'Professsional Skillset',
  type: 'object',
  fields: [
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'skill'}]
    }
  ]
}
