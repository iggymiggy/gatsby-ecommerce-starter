const path = require('path')
const categories = require('../../../constants/categories')

module.exports = async function createCategoryPages({ graphql, createPage }) {
  const { errors, data } = await graphql(`
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
  `)

  if (errors) {
    Promise.reject(errors)
  }
  // Create sportCategories:
  const sportCategories = []

  // Iterate through each product, putting all found sport/category into `sportCategories`
  posts.forEach((edge) => {
    if (_.get(edge, `node.frontmatter.sportKey`)) {
      console.log(`Page: ${edge.node.frontmatter.sportKey}`)
      console.log(`sportCategories: ${sportCategories}`)

      if (_.get(edge, `node.frontmatter.product_category`)) {
        if (!(edge.node.frontmatter.sportKey in sportCategories)) {
          sportCategories[edge.node.frontmatter.sportKey] = [edge.node.frontmatter.product_category]
          // sportCategories.push({
          //     key:   edge.node.frontmatter.sportKey,
          //     value: [edge.node.frontmatter.product_category]
          // });
          console.log(`if1 sportCategories: ${sportCategories}`)
          console.log(`if1 sportCategories: ${sportCategories[edge.node.frontmatter.sportKey][0]}`)
        } else {
          console.log(`if2 sportCategories: ${sportCategories}`)
          console.log(`if2 sportCategories: ${sportCategories[edge.node.frontmatter.sportKey]}`)
          console.log(sportCategories[edge.node.frontmatter.sportKey])
          sportCategories[edge.node.frontmatter.sportKey].push(edge.node.frontmatter.product_category)
          // sportCategories.push({
          //     key:   edge.node.frontmatter.sportKey,
          //     value: edge.node.frontmatter.product_category
          // });
          // sportCategories = sportCategories.concat(edge.node.frontmatter.sportKey + "/" + edge.node.frontmatter.product_category)
          console.log(`Page: ${edge.node.frontmatter.sportKey}/${edge.node.frontmatter.product_category}`)
          console.log(sportCategories)
        }
      }
      // sportCategories = sportCategories.concat(edge.node.frontmatter.sportKey+"/mikko")
    }
  })

  for (sportCategory in sportCategories) {
    console.log(sportCategory, sportCategories[sportCategory])

    // Eliminate duplicate sportCategories
    sportCategories[sportCategory] = _.uniq(sportCategories[sportCategory])
    console.log(sportCategory, sportCategories[sportCategory])

    // Make category pages
    sportCategories[sportCategory].forEach((productCategory) => {
      const categoryPath = `/${sportCategory}/product/${productCategory}/`
      console.log(`SportCategory: ${sportCategory}`)
      console.log(`productCategory: ${productCategory}`)

      createPage({
        path: categoryPath,
        component: path.resolve(`src/components/templates/CategoryTemplate/CategoryTemplate.js`),
        context: {
          sportCategory,
          productCategory,
        },
      })
    })
  }

  // const categoriesIds = data.allStripeSku.distinct.reduce(
  //   (accumulator, categoryId) => (categoryId === categories.UNISEX.id ? [...accumulator, 'WOMEN', 'MEN'] : [...accumulator, categoryId]),
  //   [],
  // )

  // const categoriesIdsUnique = [...new Set(categoriesIds)]

  // categoriesIdsUnique.forEach((categoryId) => {
  //   createPage({
  //     path: categories[categoryId].slug,
  //     component: path.resolve('src/components/templates/CategoryTemplate/CategoryTemplate.js'),
  //     context: { categoryId },
  //   })
  // })
}
// const path = require('path')
// const categories = require('../../../constants/categories')

// module.exports = async function createCategoryPages({ graphql, createPage }) {
//   const { errors, data } = await graphql(`
//     query categoryList {
//       allStripeSku(filter: { product: { active: { eq: true } } }) {
//         distinct(field: attributes___category)
//       }
//     }
//   `)

//   if (errors) {
//     Promise.reject(errors)
//   }

//   const categoriesIds = data.allStripeSku.distinct.reduce(
//     (accumulator, categoryId) => (categoryId === categories.UNISEX.id ? [...accumulator, 'WOMEN', 'MEN'] : [...accumulator, categoryId]),
//     [],
//   )

//   const categoriesIdsUnique = [...new Set(categoriesIds)]

//   categoriesIdsUnique.forEach((categoryId) => {
//     createPage({
//       path: categories[categoryId].slug,
//       component: path.resolve('src/components/templates/CategoryTemplate/CategoryTemplate.js'),
//       context: { categoryId },
//     })
//   })
// }
