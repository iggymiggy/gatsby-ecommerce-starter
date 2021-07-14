import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'

import { useCartContext } from 'context/CartContext'

import { useProductsContext, findProductElementById } from 'context/ProductsContext'
// import { ProductsContextProvider } from 'context/ProductsContext'
import ImageLocal from 'components/foundations/ImageLocal/ImageLocal'
import { useThemeContext } from 'context/ThemeContext'
// import useFetchProductsFromGatsby from 'context/ProductsContext/useFetchProductsFromGatsby'
import { PageContent, ProductImage, ProductDetails } from './SkuDetailTemplate.styles'

import ProductColors from './ProductColors'
import SkuPrice from './SkuPrice'
import ProductName from './ProductName'
import AddToCartButton from './AddToCartButton'
import ProductSizes from './ProductSizes'
import Description from './Description'
import Delivery from './Delivery'

export default function SkuDetailPage({ pageContext: { id } }) {
  const [{ skuSizeSelected }] = useCartContext()
  // const { data } = useFetchProductsFromGatsby()
  // const { context } = useProductsContext()
  const { node } = findProductElementById(useProductsContext(), id)
  console.log('products')
  console.log(node)
  console.log(findProductElementById(useProductsContext(), 'fdsjflkdjsfkds'))
  const { isMobile } = useThemeContext()

  // this sku does not contain the right size
  // the size is handle in the local state
  // const skuSelected = skus[id]
  // const productSelected = products['noe']

  // const [sizeSelected, setSizeSelected] = useState(skuSizeSelected || productSelected.metadata.defaultSize)
  // const skuIdSelectedWithSize = productSelected.skuIds[skuSelected.attributes.color][sizeSelected]

  return <PageContent>peelo</PageContent>
}

SkuDetailPage.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}
