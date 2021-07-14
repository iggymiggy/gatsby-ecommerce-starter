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
  const { isMobile } = useThemeContext()
  const node = findProductElementById(useProductsContext(), id)
  const productSelected = node.node

  return (
    <PageContent>
      <ProductImage $isMobile={isMobile}>
        <ImageLocal localFiles={productSelected.frontmatter.product_images} alt={productSelected.product_brand} />
      </ProductImage>
      <ProductDetails>
        <ProductName productSelected={productSelected} />
        <Divider />
        {/* <SkuPrice skuSelected={skuSelected} /> */}
        {/* <ProductColors productSelected={productSelected} skus={skus} skuSelected={skuSelected} /> */}
        {/* <ProductSizes
          productSelected={productSelected}
          skuSelected={skuSelected}
          sizeSelected={sizeSelected}
          setSizeSelected={setSizeSelected}
        /> */}
        {/* <AddToCartButton skuIdSelectedWithSize={skuIdSelectedWithSize} /> */}
        <Delivery />
        <hr />
        <Description />
      </ProductDetails>
    </PageContent>
  )
}

SkuDetailPage.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}
