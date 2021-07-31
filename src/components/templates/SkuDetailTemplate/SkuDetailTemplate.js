import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import { useProductsContext, findProductNodeById, createProductImageCarouselItems } from 'context/ProductsContext'
import ProductImageCarousel from 'components/foundations/ProductImageCarousel/ProductImageCarousel'
import { useThemeContext } from 'context/ThemeContext'
import { PageContent, ProductImage, ProductDetails } from './SkuDetailTemplate.styles'
import ProductName from './ProductName'
import Description from './Description'

export default function SkuDetailPage({ pageContext: { id } }) {
  const { isMobile } = useThemeContext()
  const productSelected = findProductNodeById(useProductsContext(), id).node
  const items = createProductImageCarouselItems(productSelected)

  return (
    <PageContent>
      <ProductImage $isMobile={isMobile}>
        <ProductImageCarousel items={items} />
      </ProductImage>
      <ProductDetails>
        <ProductName productSelected={productSelected} />
        <Divider />
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
