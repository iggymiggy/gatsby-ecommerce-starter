import React from 'react'
import PropTypes from 'prop-types'
// TODO:
import useFetchProductsFromGatsby from './useFetchProductsFromGatsby'
import { getImage } from 'gatsby-plugin-image'
import getThumb from '../../functions/videoThumbnailUrl'

const ProductsContext = React.createContext()

/**
 * Wrapper to give Provider access to Sku nodes from Gatsby's GraphQL store.
 */
const ProductsContextProvider = ({ children }) => {
  const { data } = useFetchProductsFromGatsby()

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

function fetchProductListItems(allProducts, sportKey, product_category) {
  const items = []

  console.log('CATEGORIES:  ')
  console.log(sportKey)
  console.log(product_category)
  allProducts.forEach((element) => {
    if (
      element.node.frontmatter.sportKey === sportKey &&
      element.node.frontmatter.product_category === product_category
    ) {
      let updatedElement = {
        ...element,
        productListImage: getImage(element.node.frontmatter.product_images[0].product_image),
      }
      console.log('PUSH updatedElement: ')
      console.log(updatedElement)
      items.push(updatedElement)
    }
  })
  console.log(items)
  return items
}

function createProductImageCarouselItems(product) {
  const items = []
  const video_items = []

  // Add videos:
  product.frontmatter.product_videos.map((element) => {
    const thumbUrl = getThumb(element.product_video_url)
    const item = {
      original: thumbUrl,
      thumbnail: thumbUrl,
      embedUrl: element.product_video_url,
    }
    video_items.push(item)
  })

  // Add images:
  product.frontmatter.product_images.forEach((element) => {
    const gatsbyImage = getImage(element.product_image)
    const item = {
      gatsbyImage: gatsbyImage,
      thumbnail: gatsbyImage,
    }
    items.push(item)
  })

  return [...items, ...video_items]
}

export {
  useProductsContext,
  ProductsContextProvider,
  findProductNodeById,
  fetchProductListItems,
  createProductImageCarouselItems,
}
