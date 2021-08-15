import React from 'react'
import PropTypes from 'prop-types'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import { useThemeContext } from 'context/ThemeContext'
import { useProductsContext } from 'context/ProductsContext'
import Link from 'components/foundations/Link/Link'
import ImageLocal from 'components/foundations/ImageLocal/ImageLocal'

import { ProductDetails } from './ProductList.styles'
import ProductPrice from './ProductPrice'
import ProductName from './ProductName'
import filterProductList from './filterProductList'

export default function ProductList({ products }) {
  const { isMobile } = useThemeContext()
  // const { products, skus, productsIdsAll, productsIdsByCategory } = useProductsContext()
  // const { products } = useProductsContext()

  // const productsListFiltered = filterProductList({ productsIdsAll, productsIdsByCategory, filters })

  console.log('Products: ')
  console.log(products)
  return (
    <GridList cols={isMobile ? 2 : 4} cellHeight="auto">
      {/* TODO: fix products.products */}
      {products.products.map((product) => (
        <GridListTile key={product.node.frontmatter.product_brand}>
          <Link to={product.node.fields.slug}>
            <ImageLocal productListImage={product.productListImage} alt={product.node.frontmatter.product_brand} />
            <ProductDetails $isMobile={isMobile}>
              <ProductName productName={product.node.frontmatter.product_brand} />
              <ProductPrice product={'10'} />
            </ProductDetails>
          </Link>
        </GridListTile>
      ))}
    </GridList>
  )
}

ProductList.propTypes = {
  filters: PropTypes.shape({
    categoryIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
}

ProductList.defaultProps = {
  filters: {},
}
