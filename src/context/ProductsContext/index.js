import React from 'react'
import PropTypes from 'prop-types'

// import useFetchProducts from './useFetchProducts'
// TODO:
import useFetchProductsFromGatsby from './useFetchProductsFromGatsby'
import { getImage } from 'gatsby-plugin-image'
import getThumb from 'video-thumbnail-url'


const ProductsContext = React.createContext()

/**
 * Wrapper to give Provider access to Sku nodes from Gatsby's GraphQL store.
 */
const ProductsContextProvider = ({ children }) => {
  // const { data } = useFetchProducts()
  const { data } = useFetchProductsFromGatsby()
  console.log('data')
  console.log(data)

  if (!data) {
    return null
  }

  return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
}

ProductsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

function useProductsContext() {
  const context = React.useContext(ProductsContext)

  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsContextProvider')
  }

  return context
}

function findProductNodeById(array, id) {
  // TODO: error handling!!!!
  return array.find((element) => {
    return element.node.id === id
  })
}

function createProductImageCarouselItems(product) {
  const items = []

  // Add videos:
  product.frontmatter.product_videos.forEach(element => {
    let url = ""
    getThumb(element.product_video_url).then(thumb_url => { url = thumb_url });
    const item = {
      original: url,
      thumbnail: url,
      embedUrl: element.product_video_url,
    }
    items.push(item)
  });

  // Add images:
  product.frontmatter.product_images.forEach(element => {
    const gatsbyImage = getImage(element.product_image)
    const item = {
      gatsbyImage: gatsbyImage,
      thumbnail: gatsbyImage,
    }
    items.push(item)
  });

  return items
}

export { useProductsContext, ProductsContextProvider, findProductNodeById, createProductImageCarouselItems }



