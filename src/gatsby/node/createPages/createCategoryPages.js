// const path = require('path')

// module.exports = async function createCategoryPages({ graphql, createPage }) {
//   const { errors, data } = await graphql(`
//     query {
//       all: allMarkdownRemark(limit: 1000) {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//             frontmatter {
//               tags
//               templateKey
//               sportKey
//               product_category
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (errors) {
//     Promise.reject(errors)
//   }
//   // Create sportCategories:
//   const products = result.data.all.edges
//   const sportCategories = []

//   // Iterate through each product, putting all found sport/category into `sportCategories`
//   products.forEach((edge) => {
//     if (_.get(edge, 'node.frontmatter.sportKey')) {
//       if (_.get(edge, 'node.frontmatter.product_category')) {
//         if (!(edge.node.frontmatter.sportKey in sportCategories)) {
//           sportCategories[edge.node.frontmatter.sportKey] = [edge.node.frontmatter.product_category]
//         } else {
//           sportCategories[edge.node.frontmatter.sportKey].push(edge.node.frontmatter.product_category)
//         }
//       }
//     }
//   })

//   for (sportKey in sportCategories) {
//     // Eliminate duplicate sportCategories
//     sportCategories[sportKey] = _.uniq(sportCategories[sportKey])

//     // Make category pages
//     sportCategories[sportKey].forEach((product_category) => {
//       const categoryPath = `/${sportKey}/product/${product_category}/`
//       // console.log('CREATE CATEGORY PAGE!!!!!!!!!!')
//       createPage({
//         path: categoryPath,
//         component: path.resolve('src/components/templates/CategoryTemplate/CategoryTemplate.js'),
//         context: {
//           sportKey,
//           product_category,
//         },
//       })
//     })
//   }
// }
