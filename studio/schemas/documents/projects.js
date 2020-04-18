import {format} from 'date-fns'

export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'projectName',
      title: 'Project Name',
      type: 'string'
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string'
    },
    {
      name: 'employerName',
      title: 'Employer Name',
      type: 'string'
    },
    {
      name: 'launchDate',
      title: 'Launch Date',
      type: 'date'
    },
    {
      name: 'video',
      title: 'Video Demo',
      type: 'file'
    },
    {
      name: 'youtubeId',
      title: 'Video Youtube Demo ID',
      type: 'string'
    },
    {
      name: 'projectTags',
      title: 'Tech used on project',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'projectUrl',
      title: 'Project Url',
      type: 'url'
    },
    {
      name: 'videoPoster',
      title: 'Video Demo Poster Image',
      type: 'figure'
    },
    {
      name: 'background',
      title: 'Background',
      type: 'projectPortableText'
    },
    {
      name: 'process',
      title: 'Process and Solution',
      type: 'projectPortableText'
    },
    {
      name: 'projectImage',
      title: 'Project image',
      type: 'figure'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      launchDate: 'launchDate',
      slug: 'slug',
      media: 'projectImage'
    },
    prepare ({title = 'No title', launchDate, slug = {}, media}) {
      const dateSegment = format(launchDate, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: launchDate ? path : 'Missing launch date'
      }
    }
  }
}
