import {IoMdConstruct} from 'react-icons/io'

export default {
  name: 'job',
  icon: IoMdConstruct,
  title: 'Jobs',
  type: 'document',
  orderings: [
    {
      title: 'Job Start Date Asc',
      name: 'jobDateAsc',
      by: [
        {
          field: 'startDate',
          direction: 'asc'
        }
      ]
    },
    {
      title: 'Job Start Date Desc',
      name: 'jobDateDesc',
      by: [
        {
          field: 'startDate',
          direction: 'desc'
        }
      ]
    }
  ],
  fields: [
    {
      name: 'companyName',
      type: 'string',
      title: 'Company Name'
    },
    {
      name: 'jobTitle',
      type: 'string',
      title: 'Job Title'
    },
    {
      name: 'companyWebsite',
      type: 'url',
      title: 'Company Website URL'
    },
    {
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
      dateFormat: 'MMMM YYYY'
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End Date',
      dateFormat: 'MMMM YYYY'
    },
    {
      name: 'jobBullets',
      type: 'projectPortableText',
      title: 'Job Bullets'
    }
  ]
}
