const createPages = require('./src/gatsby/node/createPages/createPages')
const onCreateNode = require('./src/gatsby/node/onCreateNode/onCreateNode')

exports.onCreateNode = onCreateNode
exports.createPages = createPages

// Errors: "Can't resolve 'net'.If you're trying to use a package make sure that 'net' is installed." etc.
// Issue: https://github.com/gatsbyjs/gatsby/issues/564
// https://github.com/diegomura/react-pdf/issues/1029
exports.onCreateWebpackConfig = ({ actions, stage, plugins }) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({ process: 'process/browser' }),
        plugins.provide({ Buffer: ['buffer', 'Buffer'] })
      ]
    })
  }


  actions.setWebpackConfig({
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        os: require.resolve("os-browserify/browser"),
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
        // util: require.resolve("util/"),
        fs: false,
        net: false,
        tls: false,
      }
    },
  })
}


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
