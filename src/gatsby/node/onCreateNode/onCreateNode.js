const slug = require('slug')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  // attach an slug to each sku
  if (node.internal.type === 'StripeSku') {
    createNodeField({
      node,
      name: 'slug',
      value: slug(node.attributes.name, slug.defaults.modes.rfc3986),
    })
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

module.exports = onCreateNode
