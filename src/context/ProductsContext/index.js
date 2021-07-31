import React from 'react'
import PropTypes from 'prop-types'

// import useFetchProducts from './useFetchProducts'
// TODO:
import useFetchProductsFromGatsby from './useFetchProductsFromGatsby'
import { getImage } from 'gatsby-plugin-image'
import getThumb from '../../functions/videoThumbnailUrl'


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
  const video_items = []

  // Add videos:
  product.frontmatter.product_videos.map(element => {
    const thumbUrl = getThumb(element.product_video_url)
    const item = {
      original: thumbUrl,
      thumbnail: thumbUrl,
      embedUrl: element.product_video_url,
    }
    video_items.push(item)
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

  return [...items, ...video_items]
}

export { useProductsContext, ProductsContextProvider, findProductNodeById, createProductImageCarouselItems }



