import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'

import { useCartContext } from 'context/CartContext'

import { useProductsContext, findProductElementById } from 'context/ProductsContext'
// import { ProductsContextProvider } from 'context/ProductsContext'
import ImageLocal from 'components/foundations/ImageLocal/ImageLocal'
import PhotoGallery from 'components/foundations/PhotoGallery/PhotoGallery'
import { useThemeContext } from 'context/ThemeContext'
// import useFetchProductsFromGatsby from 'context/ProductsContext/useFetchProductsFromGatsby'
import ImageGallery from 'react-image-gallery'
// import './image-gallery.css'
import { useLocation } from '@reach/router'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'

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
  const image = productSelected.frontmatter.product_images[0].product_image
  console.log('image')
  console.log(image)
  const location = useLocation()
  console.log(location)
  // const src = getSrc(image)
  const src = getSrc(image)
  console.log('src')
  console.log(src)
  const url = location.origin + src
  console.log('url')
  console.log(url)

  const thumbnail_src = 'require(' + src + ')'
  const images = [
    {
      // original: 'http://localhost:8000/static/277733984de58dd6d27eed18b510250d/33698/coffee.webp',
      original: url,
      thumbnail: thumbnail_src,
      embedUrl: 'https://www.youtube.com/embed/q13EUUsIsFE',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
      embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ]

  return (
    <PageContent>
      <ProductImage $isMobile={isMobile}>
        <PhotoGallery images={images}/>
        {/* <ImageLocal localFiles={productSelected.frontmatter.product_images} alt={productSelected.product_brand} /> */}
      </ProductImage>
      <ProductDetails>
        <ProductName productSelected={productSelected} />
        <Divider />
        {/* <ImageGallery items={images}/> */}
        {/* <PhotoGallery /> */}
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
  