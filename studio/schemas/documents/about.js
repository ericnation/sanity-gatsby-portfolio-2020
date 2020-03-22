import {MdPerson} from 'react-icons/md'

export default {
  name: 'about',
  icon: MdPerson,
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title'
    },
    {
      name: 'hobbies',
      type: 'array',
      title: 'Hobbies',
      description: 'Add your hobbies, specialties, etc',
      of: [ {type: 'string'} ],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'aboutSectionImage',
      title: 'Section Image',
      type: 'figure'
    },
    {
      name: 'profile',
      title: 'About Me Profile',
      type: 'reference',
      to: [{type: 'person'}]
    }
  ]
}
