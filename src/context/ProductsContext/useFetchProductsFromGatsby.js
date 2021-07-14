import { useStaticQuery, graphql } from 'gatsby'

// import getProducts from './getProducts'

/** Normalize structure of data sourced from Gatsby's GraphQL store */
const useFetchProductsFromGatsby = () => {
  const { allProductQuery } = useStaticQuery(graphql`
    {
      allProductQuery: allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              sportKey
              product_category
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
      }
    }
  `)

  return {
    loading: false,
    data: allProductQuery.edges,
  }
}

export default useFetchProductsFromGatsby
