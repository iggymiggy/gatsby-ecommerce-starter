import React from 'react'
import PropTypes from 'prop-types'

// import useFetchProducts from './useFetchProducts'
// TODO:
import useFetchProductsFromGatsby from './useFetchProductsFromGatsby'

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

function findProductElementById(array, id) {
  // TODO: error handling!!!!
  // console.log('array:')
  // console.log(array)
  // console.log('id:')
  // console.log(id)
  return array.find((element) => {
    // console.log('element:')
    // console.log(element)
    // console.log('element.node:')
    // console.log(element.node)
    // console.log('element.node.id:')
    // console.log(element.node.id)
    return element.node.id === id
  })
}

export { useProductsContext, ProductsContextProvider, findProductElementById }
