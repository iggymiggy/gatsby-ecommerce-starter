const createPages = require('./src/gatsby/node/createPages/createPages')
const onCreateNode = require('./src/gatsby/node/onCreateNode/onCreateNode')

exports.onCreateNode = onCreateNode
exports.createPages = createPages


// TODO: add all fields
// Handle empty results in a Gatsby source plug-in:
// https://www.antonball.dev/blog/2020-01-02-gatsby-source-plugin/
// Resolve images with @fileByRelativePath
// https://stackoverflow.com/a/61061316
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      id: id
    }
    type Frontmatter {
      tags: [String]
      product_brand: String
      product_brand_model: String
      product_year_model: String
      product_size: String
      gender_category: String
      product_discount_percentage: String
      product_images: [ProductImages]
      product_video_url: String
    }
    type ProductImages {
      product_image: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}
