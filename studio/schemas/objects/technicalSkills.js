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
      name: 'professionalSkillset',
      title: 'Professsional Skillset',
      type: 'professionalSkillset'
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'tools'
    },
    {
      name: 'softSkills',
      title: 'Soft Skills',
      type: 'softSkills'
    }
  ]
}
