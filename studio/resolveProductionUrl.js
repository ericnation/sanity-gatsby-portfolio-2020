export default function resolveProductionUrl(document) {
  return `https://sanity-gatsby-portfolio-2020.netlify.app/blog/${document.slug.current}`
}