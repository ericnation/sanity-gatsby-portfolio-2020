export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e7058ed6ca3082acf210a86',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-2020-studio',
                  apiId: '342e7685-b498-4655-9302-cd4720b2b41f'
                },
                {
                  buildHookId: '5e7058eded86a1e817b02ee9',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-2020',
                  apiId: 'ee0085d2-5266-4ab0-b8df-97eefa359ef9'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ericnation/sanity-gatsby-portfolio-2020',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-2020.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
