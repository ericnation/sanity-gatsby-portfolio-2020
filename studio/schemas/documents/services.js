import {MdComputer} from 'react-icons/md'

export default {
  name: 'services',
  icon: MdComputer,
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title'
    },
    {
      name: 'subHeader',
      type: 'string',
      title: 'Sub Header'
    },
    {
      name: 'services',
      type: 'array',
      title: 'Services',
      of: [{type: 'service'}]
    },
    {
      name: 'skillsHeader',
      type: 'string',
      title: 'Skills Header'
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{type: 'skill'}]
    },
    {
      name: 'toolsHeader',
      type: 'string',
      title: 'Tools Header'
    },
    {
      name: 'tools',
      type: 'array',
      title: 'Tools',
      of: [{type: 'tool'}]
    }
  ]
}
