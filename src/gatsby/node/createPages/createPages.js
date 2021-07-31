const _ = require('lodash')
const path = require('path')

module.exports = async function createPages({ actions, graphql }) {
  const { createPage } = actions

  return graphql(`
    query {
      all: allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              sportKey
              product_category
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const products = result.data.all.edges

    products.forEach((edge) => {
      const { id } = edge.node
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve('src/components/templates/SkuDetailTemplate/SkuDetailTemplate.js'),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    const sportCategories = []

    // Iterate through each product, putting all found sport/category into `sportCategories`
    products.forEach((edge) => {
      if (_.get(edge, 'node.frontmatter.sportKey')) {
        if (_.get(edge, 'node.frontmatter.product_category')) {
          if (!(edge.node.frontmatter.sportKey in sportCategories)) {
            sportCategories[edge.node.frontmatter.sportKey] = [edge.node.frontmatter.product_category]
          } else {
            sportCategories[edge.node.frontmatter.sportKey].push(edge.node.frontmatter.product_category)
          }
        }
      }
    })

    for (sportCategory in sportCategories) {
      // Eliminate duplicate sportCategories
      sportCategories[sportCategory] = _.uniq(sportCategories[sportCategory])

      // Make category pages
      sportCategories[sportCategory].forEach((productCategory) => {
        const categoryPath = `/${sportCategory}/product/${productCategory}/`
        console.log('CREATE CATEGORY PAGE!!!!!!!!!!')
        createPage({
          path: categoryPath,
          component: path.resolve('src/components/templates/CategoryTemplate/CategoryTemplate.js'),
          context: {
            sportCategory,
            productCategory,
          },
        })
      })
    }
  })
}
