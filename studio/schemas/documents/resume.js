import {TiDocumentText} from 'react-icons/ti'

export default {
  name: 'resume',
  icon: TiDocumentText,
  title: 'Resume Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Resume Title'
    },
    {
      name: 'updateData',
      type: 'date',
      title: 'Last Date Updated',
      dateFormat: 'MMMM YYYY'
    },
    {
      name: 'pdfResume',
      type: 'file',
      title: 'PDF Resume'
    },
    {
      name: 'headerImage',
      title: 'Header Background Image',
      type: 'figure'
    },
    {
      name: 'subHeaderImage',
      title: 'Sub Header Image',
      type: 'figure'
    },
    {
      name: 'profile',
      type: 'text',
      title: 'Profile'
    },
    {
      name: 'workExperience',
      type: 'workExperience',
      title: 'Work Experience'
    },
    {
      name: 'education',
      type: 'education',
      title: 'Education'
    },
    {
      name: 'technicalSkills',
      title: 'Technical Skills',
      type: 'technicalSkills'
    }
  ]
}
