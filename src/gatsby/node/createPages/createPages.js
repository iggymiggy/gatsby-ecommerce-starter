// // const createCategoryPages = require('./createCategoryPages')
// // const createSkuDetailPages = require('./createSkuDetailPages')
// const path = require('path')

// module.exports = async function createPages({ actions, graphql }) {
//   const { createPage } = actions
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
//               templateKey
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (errors) {
//     Promise.reject(errors)
//   }

//   data.all.edges.forEach(({ node: edge }) => {
//     console.log("id: " + edge.node.i)

//     createPage({
//       path: edge.node.fields.slug,
//       component: path.resolve('src/components/templates/${String(edge.node.frontmatter.templateKey)}.js'),
//       context: { id: edge.node.id },
//     })
//   })
// }

// module.exports = async function createTemplates({ graphql, actions }) {
//   const { createPages } = actions

//   // await createCategoryPages({ graphql, createPage })
//   // await createSkuDetailPages({ graphql, createPage })
//   await createPages({ graphql, createPage })
// }

const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

module.exports = async function createPages({ actions, graphql }) {
  const { createPage } = actions

  return graphql(`
    query {
      all:
        allMarkdownRemark(limit: 1000) {
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

    const posts = result.data.all.edges

    posts.forEach((edge) => {
      const id = edge.node.id
      console.log("Path: " + edge.node.fields.slug)
      createPage({

        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          // `src/components/templates/${String(edge.node.frontmatter.templateKey)}.js`
          `src/components/templates/SkuDetailTemplate/SkuDetailTemplate.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Create sportCategories:
    let sportCategories = []

    // Iterate through each product, putting all found sport/category into `sportCategories`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.sportKey`)) {
        console.log("Page: " + edge.node.frontmatter.sportKey)
        console.log("sportCategories: " + sportCategories)



        if (_.get(edge, `node.frontmatter.product_category`)) {
          if (!(edge.node.frontmatter.sportKey in sportCategories)) {
            sportCategories[edge.node.frontmatter.sportKey] = [edge.node.frontmatter.product_category];
            // sportCategories.push({
            //     key:   edge.node.frontmatter.sportKey,
            //     value: [edge.node.frontmatter.product_category]
            // });
            console.log("if1 sportCategories: " + sportCategories)
            console.log("if1 sportCategories: " + sportCategories[edge.node.frontmatter.sportKey][0])
          } else {
            console.log("if2 sportCategories: " + sportCategories)
            console.log("if2 sportCategories: " + sportCategories[edge.node.frontmatter.sportKey])
            console.log(sportCategories[edge.node.frontmatter.sportKey])
            sportCategories[edge.node.frontmatter.sportKey].push(edge.node.frontmatter.product_category);
            // sportCategories.push({
            //     key:   edge.node.frontmatter.sportKey,
            //     value: edge.node.frontmatter.product_category
            // });
            // sportCategories = sportCategories.concat(edge.node.frontmatter.sportKey + "/" + edge.node.frontmatter.product_category)
            console.log("Page: " + edge.node.frontmatter.sportKey + "/" + edge.node.frontmatter.product_category)
            console.log(sportCategories)
          }

          }
        // sportCategories = sportCategories.concat(edge.node.frontmatter.sportKey+"/mikko")
      }
    })

    for (sportCategory in sportCategories) {
      console.log(sportCategory, sportCategories[sportCategory]);

      // Eliminate duplicate sportCategories
      sportCategories[sportCategory] = _.uniq(sportCategories[sportCategory])
      console.log(sportCategory, sportCategories[sportCategory]);

      // Make category pages
      sportCategories[sportCategory] .forEach((productCategory) => {
        const categoryPath = `/${sportCategory}/product/${productCategory}/`
        console.log("SportCategory: " + sportCategory);
        console.log("productCategory: " + productCategory);

        // TODO: enable:
        // createPage({
        //   path: categoryPath,
        //   component: path.resolve(`src/components/templates/product-category.js`),
        //   context: {
        //     sportCategory,
        //     productCategory,
        //   },
        // })
      })

    }


  })
}
