import {MdMenu} from 'react-icons/md'

export default {
  name: 'navMenu',
  type: 'document',
  title: 'Nav Menu',
  icon: MdMenu,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Menu Name'
    },
    {
      name: 'navItems',
      type: 'array',
      title: 'Nav Items',
      of: [{type: 'nav'}]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
