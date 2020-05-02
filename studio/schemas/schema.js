// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import category from './documents/category'
import contact from './documents/contact'
import carousel from './documents/carousel'
import person from './documents/person'
import siteSettings from './documents/siteSettings'

// Object types
import bioPortableText from './objects/bioPortableText'
import figure from './objects/figure'
import projectMember from './objects/projectMember'
import projectPortableText from './objects/projectPortableText'
import simplePortableText from './objects/simplePortableText'
import slide from './objects/slide'
import navMenu from './documents/navMenu'
import nav from './objects/nav'
import about from './documents/about'
import services from './documents/services'
import service from './objects/service'
import skill from './objects/skill'
import tool from './objects/tool'
import job from './documents/job'
import resume from './documents/resume'
import softSkill from './objects/softSkill'
import workExperience from './objects/workExperience'
import education from './objects/education'
import technicalSkills from './objects/technicalSkills'
import country from './documents/country'
import city from './objects/city'
import projects from './documents/projects'
import post from './documents/post'
import bodyPortableText from './objects/bodyPortableText'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    bioPortableText,
    bodyPortableText,
    city,
    education,
    figure,
    nav,
    projectMember,
    projectPortableText,
    service,
    simplePortableText,
    skill,
    slide,
    softSkill,
    technicalSkills,
    tool,
    workExperience,
    // The following are document types which will appear
    // in the studio.
    about,
    carousel,
    category,
    contact,
    country,
    job,
    navMenu,
    person,
    post,
    projects,
    resume,
    services,
    siteSettings
  ])
})
