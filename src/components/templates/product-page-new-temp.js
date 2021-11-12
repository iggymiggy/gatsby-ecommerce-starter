import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Divider from '@material-ui/core/Divider'
import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'
import PreviewCompatibleImage from 'components/PreviewCompatibleImage'

import { PageContent, ProductImage, ProductDetails } from './SkuDetailTemplate/SkuDetailTemplate.styles'
import { useThemeContext } from '../context/ThemeContext'
import ImageLocal from 'components/foundations/ImageLocal/ImageLocal'
import ProductName from './ProductName'
import SkuPrice from './SkuDetailTemplate/SkuPrice'

export const ProductTemplate = ({ content, contentComponent, title, image, helmet, product }) => {
  const ProductContent = contentComponent || Content

  return (
    // <section className="section">
    //   {helmet || ''}
    //   <div className="container content">
    //     <div className="columns">
    //       <div className="column is-7 is-offset-1">
    //         <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
    //           {title}
    //         </h1>
    //         <div className="featured-thumbnail">
    //           <PreviewCompatibleImage
    //             imageInfo={{
    //               image: image,
    //             }}
    //           />
    //         </div>
    //         <ProductContent content={content} />
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="section">
      <PageContent>
        {/* <ProductImage $isMobile={isMobile}> */}
        <ProductImage>
          <ImageLocal image={image} alt={title} />
        </ProductImage>
        <ProductDetails>
          <ProductName product={product.frontmatter} />
          <Divider />
          <SkuPrice skuSelected={title} />
          <Divider />
          <ProductContent content={content} />
          {/* <ProductColors productSelected={productSelected} skus={skus} skuSelected={skuSelected} /> */}
          {/* <ProductSizes
            productSelected={productSelected}
            skuSelected={skuSelected}
            sizeSelected={sizeSelected}
            setSizeSelected={setSizeSelected}
          /> */}
          {/* <AddToCartButton skuIdSelectedWithSize={skuIdSelectedWithSize} /> */}
          {/* <Delivery /> */}
          <hr />
          {/* <Description /> */}
        </ProductDetails>
      </PageContent>
    </section>
  )
}

ProductTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

const Product = ({ data }) => {
  const { markdownRemark: product } = data
  // const { isMobile } = useThemeContext()

  return (
    <Layout>
      <ProductTemplate
        content={product.html}
        contentComponent={HTMLContent}
        // description={product.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Product">
            <title>{`${product.frontmatter.product_brand}`}</title>
            <meta name="description" content={`${product.frontmatter.description}`} />
          </Helmet>
        }
        title={product.frontmatter.product_brand}
        image={product.frontmatter.product_images[0].product_image}
        product={product}
      />
    </Layout>
  )
}

Product.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Product

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        description
        date(formatString: "MMMM DD, YYYY")
        product_brand
        product_brand_model
        product_year_model
        product_size
        product_discount_percentage
        product_images {
          product_image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
        product_video_url
      }
    }
  }
`
